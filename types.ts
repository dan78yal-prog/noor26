export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  password?: string; // In a real app, this would be hashed
  username?: string; // For teachers/admin
}

export interface AdminConfig {
  username: string;
  password: string;
}

export interface Student extends User {
  nationalId: string; // Key for login
  gradeLevel: string;
  gpa: number;
  attendanceRate: number;
}

export interface Teacher extends User {
  subject: string;
  classes: string[];
}

export interface Course {
  id: string;
  name: string;
  teacherName: string;
  grade: number;
  maxGrade: number;
  schedule: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
  type: 'general' | 'urgent' | 'academic';
}

export interface ScheduleItem {
  day: string;
  periods: { subject: string; time: string }[];
}

export interface AIResponse {
  text: string;
  loading: boolean;
  error?: string;
}