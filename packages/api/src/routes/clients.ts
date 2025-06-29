import { Router } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { ClientService } from '../services/client.service';
import { AuthRequest } from '../types';

const router = Router();

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

// Get all clients
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('search').optional().isString(),
  query('isActive').optional().isBoolean(),
  handleValidationErrors
], async (req: AuthRequest, res) => {
  try {
    const result = await ClientService.findAll(req.user!.userId, {
      page: req.query.page ? parseInt(req.query.page as string) : undefined,
      limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
      search: req.query.search as string,
      isActive: req.query.isActive === 'true'
    });

    res.json({
      success: true,
      data: result.clients,
      meta: result.meta
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'FETCH_FAILED',
        message: error.message
      }
    });
  }
});

// Get client stats
router.get('/stats', async (req: AuthRequest, res) => {
  try {
    const stats = await ClientService.getStats(req.user!.userId);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'STATS_FAILED',
        message: error.message
      }
    });
  }
});

// Get single client
router.get('/:id', [
  param('id').isString(),
  handleValidationErrors
], async (req: AuthRequest, res) => {
  try {
    const client = await ClientService.findById(req.params.id, req.user!.userId);
    
    res.json({
      success: true,
      data: client
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: error.message
      }
    });
  }
});

// Create client
router.post('/', [
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim(),
  body('email').optional().isEmail().normalizeEmail(),
  body('phoneNumber').optional().isMobilePhone('de-DE'),
  body('birthDate').optional().isISO8601(),
  body('gender').optional().isIn(['male', 'female', 'other']),
  body('height').optional().isFloat({ min: 100, max: 250 }),
  body('currentWeight').optional().isFloat({ min: 30, max: 300 }),
  body('goalWeight').optional().isFloat({ min: 30, max: 300 }),
  body('activityLevel').optional().isIn(['sedentary', 'moderate', 'active', 'very_active']),
  body('fitnessGoals').optional().isArray(),
  body('medicalConditions').optional().isArray(),
  handleValidationErrors
], async (req: AuthRequest, res) => {
  try {
    const client = await ClientService.create(req.user!.userId, req.body);
    
    res.status(201).json({
      success: true,
      data: client
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

// Update client
router.put('/:id', [
  param('id').isString(),
  body('firstName').optional().notEmpty().trim(),
  body('lastName').optional().notEmpty().trim(),
  body('email').optional().isEmail().normalizeEmail(),
  body('phoneNumber').optional().isMobilePhone('de-DE'),
  body('birthDate').optional().isISO8601(),
  body('gender').optional().isIn(['male', 'female', 'other']),
  body('height').optional().isFloat({ min: 100, max: 250 }),
  body('currentWeight').optional().isFloat({ min: 30, max: 300 }),
  body('goalWeight').optional().isFloat({ min: 30, max: 300 }),
  body('activityLevel').optional().isIn(['sedentary', 'moderate', 'active', 'very_active']),
  body('fitnessGoals').optional().isArray(),
  body('medicalConditions').optional().isArray(),
  body('isActive').optional().isBoolean(),
  body('notes').optional().isString(),
  handleValidationErrors
], async (req: AuthRequest, res) => {
  try {
    const client = await ClientService.update(
      req.params.id,
      req.user!.userId,
      req.body
    );
    
    res.json({
      success: true,
      data: client
    });
  } catch (error: any) {
    res.status(error.message === 'Kunde nicht gefunden' ? 404 : 400).json({
      success: false,
      error: {
        code: 'UPDATE_FAILED',
        message: error.message
      }
    });
  }
});

// Delete client (soft delete)
router.delete('/:id', [
  param('id').isString(),
  handleValidationErrors
], async (req: AuthRequest, res) => {
  try {
    await ClientService.delete(req.params.id, req.user!.userId);
    
    res.json({
      success: true,
      data: {
        message: 'Kunde erfolgreich deaktiviert'
      }
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      error: {
        code: 'DELETE_FAILED',
        message: error.message
      }
    });
  }
});

export default router;