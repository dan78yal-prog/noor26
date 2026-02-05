import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Dashboard } from './pages/Dashboard';
import { Grades } from './pages/Grades';
import { AIAssistant } from './pages/AIAssistant';
import { AdminDashboard } from './pages/AdminDashboard';
import { UserRole, User, Student, Teacher, AdminConfig } from './types';
import { INITIAL_STUDENTS, INITIAL_TEACHERS } from './constants';

export default function App() {
  // Database State (Simulated)
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('noor_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });
  
  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem('noor_teachers');
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });

  const [adminConfig, setAdminConfig] = useState<AdminConfig>(() => {
    const saved = localStorage.getItem('noor_admin');
    return saved ? JSON.parse(saved) : { username: '111', password: '111' };
  });

  // App State
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [loginError, setLoginError] = useState('');

  // Persist Data
  useEffect(() => { localStorage.setItem('noor_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('noor_teachers', JSON.stringify(teachers)); }, [teachers]);
  useEffect(() => { localStorage.setItem('noor_admin', JSON.stringify(adminConfig)); }, [adminConfig]);

  const handleLogin = (role: UserRole, creds: any) => {
    setLoginError('');
    
    if (role === UserRole.ADMIN) {
      if (creds.identifier === adminConfig.username && creds.password === adminConfig.password) {
        setUser({ id: 'admin', name: 'المدير العام', role: UserRole.ADMIN });
        setCurrentPage('admin-dashboard');
      } else {
        setLoginError('بيانات الدخول غير صحيحة');
      }
    } 
    else if (role === UserRole.STUDENT) {
      const student = students.find(s => s.nationalId === creds.identifier && s.password === creds.password);
      if (student) {
        setUser(student);
        setCurrentPage('dashboard');
      } else {
        setLoginError('رقم الهوية أو كلمة المرور غير صحيحة');
      }
    } 
    else if (role === UserRole.TEACHER) {
      const teacher = teachers.find(t => t.username === creds.identifier && t.password === creds.password);
      if (teacher) {
        setUser(teacher);
        setCurrentPage('dashboard');
      } else {
        setLoginError('اسم المستخدم أو كلمة المرور غير صحيحة');
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('dashboard');
    setLoginError('');
  };

  // Database Handlers
  const addStudent = (student: Student) => setStudents([...students, student]);
  const deleteStudent = (id: string) => setStudents(students.filter(s => s.id !== id));
  
  const addTeacher = (teacher: Teacher) => setTeachers([...teachers, teacher]);
  const deleteTeacher = (id: string) => setTeachers(teachers.filter(t => t.id !== id));

  if (!user) {
    return <Login onLogin={handleLogin} error={loginError} />;
  }

  // Simple Router Switch
  const renderPage = () => {
    switch(currentPage) {
        case 'dashboard':
            return <Dashboard user={user} />;
        case 'admin-dashboard':
            return (
              <AdminDashboard 
                students={students}
                teachers={teachers}
                adminConfig={adminConfig}
                onUpdateAdminConfig={setAdminConfig}
                onAddStudent={addStudent}
                onDeleteStudent={deleteStudent}
                onAddTeacher={addTeacher}
                onDeleteTeacher={deleteTeacher}
              />
            );
        case 'courses':
        case 'grading': 
            return <Grades />;
        case 'ai-tutor':
        case 'lesson-planner':
            return <AIAssistant role={user.role} />;
        default:
            return <Dashboard user={user} />;
    }
  };

  return (
    <HashRouter>
        <Layout 
            currentUser={user} 
            onLogout={handleLogout}
            currentPage={currentPage}
            onNavigate={setCurrentPage}
        >
            {renderPage()}
        </Layout>
    </HashRouter>
  );
}