export type PackageType = 'personal_training' | 'training_consultation' | 'online_coaching';

export interface Package {
  id: string;
  clientId: string;
  type: PackageType;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  totalSessions: number;
  usedSessions: number;
  frequency?: {
    amount: number;
    period: 'week' | 'month';
  };
  price: number;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  autoRenew: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PackageUsage {
  id: string;
  packageId: string;
  date: Date;
  sessionType: string;
  duration: number; // in minutes
  notes?: string;
}

export const PACKAGE_COLORS: Record<PackageType, { bg: string; text: string; border: string }> = {
  personal_training: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
  },
  training_consultation: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
  },
  online_coaching: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
  },
};

export const PACKAGE_LABELS: Record<PackageType, string> = {
  personal_training: 'Personal Training',
  training_consultation: 'Trainingsberatung',
  online_coaching: 'Online Coaching',
};