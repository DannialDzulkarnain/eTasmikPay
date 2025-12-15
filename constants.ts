import { PaymentModel, Role, SchoolConfig, Session, Student, User } from './types';

export const DEMO_SCHOOL_CONFIG: SchoolConfig = {
  name: "Madrasah Al-Hikmah",
  paymentModel: PaymentModel.PER_SESSION,
  rates: {
    perSession: 15,
    perPage: 5,
    packagePrice: 150
  }
};

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Ustaz Abdullah',
    role: Role.USTAZ,
    email: 'abdullah@madrasah.com',
    avatar: 'https://picsum.photos/150/150?random=1'
  },
  {
    id: 'p1',
    name: 'Encik Razak',
    role: Role.PARENT,
    email: 'razak@gmail.com',
    avatar: 'https://picsum.photos/150/150?random=2'
  },
  {
    id: 'a1',
    name: 'Admin Hajah Aminah',
    role: Role.ADMIN,
    email: 'admin@madrasah.com',
    avatar: 'https://picsum.photos/150/150?random=3'
  }
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: 's1',
    name: 'Ahmad bin Razak',
    parentId: 'p1',
    currentSurah: 'Al-Baqarah',
    currentPage: 45,
    progress: 15
  },
  {
    id: 's2',
    name: 'Siti binti Razak',
    parentId: 'p1',
    currentSurah: 'Yasin',
    currentPage: 440,
    progress: 75
  },
  {
    id: 's3',
    name: 'Omar Al-Faruq',
    parentId: 'p2',
    currentSurah: 'An-Naba',
    currentPage: 582,
    progress: 95
  }
];

export const MOCK_SESSIONS: Session[] = [
  {
    id: 'sess1',
    ustazId: 'u1',
    studentId: 's1',
    date: '2023-10-25',
    surah: 'Al-Baqarah',
    pagesCompleted: 1,
    durationMinutes: 30,
    rating: 4,
    fee: 15,
    notes: 'Good pronunciation (Tajweed) today.'
  },
  {
    id: 'sess2',
    ustazId: 'u1',
    studentId: 's2',
    date: '2023-10-25',
    surah: 'Yasin',
    pagesCompleted: 2,
    durationMinutes: 45,
    rating: 5,
    fee: 15,
    notes: 'Excellent memorization.'
  },
  {
    id: 'sess3',
    ustazId: 'u1',
    studentId: 's1',
    date: '2023-10-24',
    surah: 'Al-Baqarah',
    pagesCompleted: 1,
    durationMinutes: 30,
    rating: 3,
    fee: 15,
    notes: 'Needs to revise verse 15-20.'
  }
];

export const RECENT_PAYMENTS = [
  { id: 'pay1', studentId: 's1', amount: 60, date: '2023-10-01', status: 'PAID', method: 'FPX' },
  { id: 'pay2', studentId: 's2', amount: 60, date: '2023-10-01', status: 'PAID', method: 'QR' },
  { id: 'pay3', studentId: 's1', amount: 45, date: '2023-10-26', status: 'PENDING', method: undefined },
];

export const MOCK_WITHDRAWALS = [
  { id: 'w1', ustazId: 'u1', amount: 150, date: '2023-09-30', status: 'COMPLETED' },
  { id: 'w2', ustazId: 'u1', amount: 200, date: '2023-10-15', status: 'PENDING' },
];