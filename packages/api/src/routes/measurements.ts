import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../types';

const router = Router();
const prisma = new PrismaClient();

// Validation middleware
const handleValidationErrors = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validierungsfehler',
        details: errors.array()
      }
    });
  }
  next();
};

// Create measurement
router.post('/', [
  body('clientId').isString(),
  body('weight').optional().isFloat({ min: 30, max: 300 }),
  body('bodyFat').optional().isFloat({ min: 3, max: 60 }),
  body('muscleMass').optional().isFloat({ min: 10, max: 150 }),
  body('waterPercentage').optional().isFloat({ min: 30, max: 80 }),
  body('skinfolds').optional().isObject(),
  body('notes').optional().isString(),
  handleValidationErrors
], async (req: AuthRequest, res) => {
  try {
    // Verify client ownership
    const client = await prisma.client.findFirst({
      where: {
        id: req.body.clientId,
        trainerId: req.user!.userId
      }
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'CLIENT_NOT_FOUND',
          message: 'Kunde nicht gefunden'
        }
      });
    }

    // Calculate BMI if height and weight provided
    let bmi = undefined;
    if (req.body.weight && client.height) {
      bmi = req.body.weight / Math.pow(client.height / 100, 2);
    }

    // Create measurement
    const measurement = await prisma.measurement.create({
      data: {
        ...req.body,
        bmi,
        measuredBy: `${req.user!.email}`,
        measuredAt: new Date()
      }
    });

    // Update client's last measurement date
    await prisma.client.update({
      where: { id: client.id },
      data: { lastMeasurement: new Date() }
    });

    res.status(201).json({
      success: true,
      data: measurement
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: {
        code: 'CREATE_FAILED',
        message: error.message
      }
    });
  }
});

export default router;