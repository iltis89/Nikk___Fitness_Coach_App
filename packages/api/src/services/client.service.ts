import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ClientService {
  static async create(trainerId: string, data: any) {
    return await prisma.client.create({
      data: {
        ...data,
        trainerId,
      } as any,
      include: {
        _count: {
          select: {
            measurements: true,
            trainingPlans: true,
            nutritionPlans: true
          }
        }
      }
    });
  }

  static async findAll(trainerId: string, options?: {
    page?: number;
    limit?: number;
    search?: string;
    isActive?: boolean;
  }) {
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = { trainerId };
    
    if (options?.isActive !== undefined) {
      where.isActive = options.isActive;
    }
    
    if (options?.search) {
      where.OR = [
        { firstName: { contains: options.search, mode: 'insensitive' } },
        { lastName: { contains: options.search, mode: 'insensitive' } },
        { email: { contains: options.search, mode: 'insensitive' } }
      ];
    }

    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        skip,
        take: limit,
        include: {
          _count: {
            select: {
              measurements: true,
              trainingPlans: true,
              nutritionPlans: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.client.count({ where })
    ]);

    return {
      clients,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  static async findById(id: string, trainerId: string) {
    const client = await prisma.client.findFirst({
      where: {
        id,
        trainerId
      },
      include: {
        measurements: {
          orderBy: { measuredAt: 'desc' },
          take: 5
        },
        trainingPlans: {
          where: { isActive: true }
        },
        nutritionPlans: {
          where: { isActive: true }
        },
        _count: {
          select: {
            measurements: true,
            trainingPlans: true,
            nutritionPlans: true
          }
        }
      }
    });

    if (!client) {
      throw new Error('Kunde nicht gefunden');
    }

    return client;
  }

  static async update(id: string, trainerId: string, data: any) {
    // Check ownership
    const client = await prisma.client.findFirst({
      where: { id, trainerId }
    });

    if (!client) {
      throw new Error('Kunde nicht gefunden');
    }

    return await prisma.client.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      },
      include: {
        _count: {
          select: {
            measurements: true,
            trainingPlans: true,
            nutritionPlans: true
          }
        }
      }
    });
  }

  static async delete(id: string, trainerId: string) {
    // Check ownership
    const client = await prisma.client.findFirst({
      where: { id, trainerId }
    });

    if (!client) {
      throw new Error('Kunde nicht gefunden');
    }

    // Soft delete
    return await prisma.client.update({
      where: { id },
      data: {
        isActive: false,
        updatedAt: new Date()
      }
    });
  }

  static async getStats(trainerId: string) {
    const [
      totalClients,
      activeClients,
      measurementsThisMonth,
      clientsWithRecentMeasurement
    ] = await Promise.all([
      prisma.client.count({ where: { trainerId } }),
      prisma.client.count({ where: { trainerId, isActive: true } }),
      prisma.measurement.count({
        where: {
          client: { trainerId },
          measuredAt: {
            gte: new Date(new Date().setDate(1)) // First day of month
          }
        }
      }),
      prisma.client.count({
        where: {
          trainerId,
          lastMeasurement: {
            gte: new Date(new Date().setDate(new Date().getDate() - 30))
          }
        }
      })
    ]);

    return {
      totalClients,
      activeClients,
      inactiveClients: totalClients - activeClients,
      measurementsThisMonth,
      clientsWithRecentMeasurement,
      clientsNeedingMeasurement: activeClients - clientsWithRecentMeasurement
    };
  }
}