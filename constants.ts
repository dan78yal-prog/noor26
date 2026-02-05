import { UserRole, Student, Teacher, Course, ScheduleItem, Announcement } from './types';

// Initial Database State
export const INITIAL_STUDENTS: Student[] = [
  {
    id: '1001',
    name: 'أحمد محمد العتيبي',
    role: UserRole.STUDENT,
    nationalId: '1000000001',
    password: '123',
    gradeLevel: 'الاول الثانوي',
    gpa: 96.5,
    attendanceRate: 98
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: '2001',
    name: 'أ. عبدالله الشمري',
    role: UserRole.TEACHER,
    username: 'teacher1',
    password: '123',
    subject: 'الرياضيات',
    classes: ['1/A', '1/B', '2/A']
  }
];

export const MOCK_COURSES: Course[] = [
  { id: 'c1', name: 'الرياضيات', teacherName: 'أ. عبدالله الشمري', grade: 95, maxGrade: 100, schedule: 'الأحد - الحصة الأولى' },
  { id: 'c2', name: 'الفيزياء', teacherName: 'أ. فهد القحطاني', grade: 88, maxGrade: 100, schedule: 'الاثنين - الحصة الثالثة' },
  { id: 'c3', name: 'اللغة العربية', teacherName: 'أ. خالد الزهراني', grade: 98, maxGrade: 100, schedule: 'الثلاثاء - الحصة الثانية' },
  { id: 'c4', name: 'اللغة الإنجليزية', teacherName: 'أ. مايكل سميث', grade: 92, maxGrade: 100, schedule: 'الخميس - الحصة الرابعة' },
  { id: 'c5', name: 'الكيمياء', teacherName: 'أ. سعيد المالكي', grade: 90, maxGrade: 100, schedule: 'الأربعاء - الحصة الأولى' },
];

export const MOCK_SCHEDULE: ScheduleItem[] = [
  { day: 'الأحد', periods: [{ subject: 'رياضيات', time: '08:00' }, { subject: 'فيزياء', time: '09:00' }, { subject: 'فقه', time: '10:30' }] },
  { day: 'الاثنين', periods: [{ subject: 'حديث', time: '08:00' }, { subject: 'رياضيات', time: '09:00' }, { subject: 'كيمياء', time: '10:30' }] },
  { day: 'الثلاثاء', periods: [{ subject: 'انقلش', time: '08:00' }, { subject: 'عربي', time: '09:00' }, { subject: 'بدنية', time: '10:30' }] },
  { day: 'الأربعاء', periods: [{ subject: 'فيزياء', time: '08:00' }, { subject: 'رياضيات', time: '09:00' }, { subject: 'تاريخ', time: '10:30' }] },
  { day: 'الخميس', periods: [{ subject: 'حاسب', time: '08:00' }, { subject: 'انقلش', time: '09:00' }, { subject: 'نشاط', time: '10:30' }] },
];

export const ANNOUNCEMENTS: Announcement[] = [
  { id: 'a1', title: 'موعد اختبارات منتصف الفصل', date: '2024-05-20', content: 'تبدأ الاختبارات يوم الأحد القادم، يرجى مراجعة الجدول.', type: 'urgent' },
  { id: 'a2', title: 'مسابقة القرآن الكريم', date: '2024-05-18', content: 'تم فتح باب التسجيل في مسابقة القرآن الكريم السنوية.', type: 'academic' },
  { id: 'a3', title: 'إجازة مطولة', date: '2024-06-01', content: 'إجازة نهاية أسبوع مطولة تبدأ من يوم الخميس.', type: 'general' },
];