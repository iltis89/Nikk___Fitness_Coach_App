// Shared utility functions
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('de-DE');
};

export const calculateBMI = (weight: number, height: number): number => {
  // height in cm, weight in kg
  const heightInM = height / 100;
  return Math.round((weight / (heightInM * heightInM)) * 10) / 10;
};

export const calculateAge = (birthDate: Date | string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};