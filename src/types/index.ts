export enum Role {
  ADMIN = 'ADMIN',
  USTAZ = 'USTAZ',
  PARENT = 'PARENT'
}

export enum PaymentModel {
  PER_SESSION = 'PER_SESSION',
  PER_PAGE = 'PER_PAGE',
  PACKAGE = 'PACKAGE'
}

export interface User {
  id: string;
  name: string;
  role: Role;
  avatar: string;
  email: string;
}

export interface Student {
  id: string;
  name: string;
  parentId: string;
  currentSurah: string;
  currentPage: number;
  progress: number; // 0-100
}

export interface Session {
  id: string;
  ustazId: string;
  studentId: string;
  date: string;
  surah: string;
  pagesCompleted: number;
  durationMinutes: number;
  rating: 1 | 2 | 3 | 4 | 5; // Performance
  notes?: string;
  fee: number;
}

export interface Payment {
  id: string;
  studentId: string;
  parentId: string;
  amount: number;
  date: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  method?: 'FPX' | 'QR' | 'CASH';
}

export interface SchoolConfig {
  name: string;
  paymentModel: PaymentModel;
  rates: {
    perSession?: number;
    perPage?: number;
    packagePrice?: number;
  };
}