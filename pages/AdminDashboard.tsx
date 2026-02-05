import React, { useState } from 'react';
import { Student, Teacher, AdminConfig, UserRole } from '../types';
import { Shield, Users, UserPlus, Save, Trash2, Key, User } from 'lucide-react';

interface AdminDashboardProps {
  students: Student[];
  teachers: Teacher[];
  adminConfig: AdminConfig;
  onUpdateAdminConfig: (config: AdminConfig) => void;
  onAddStudent: (student: Student) => void;
  onDeleteStudent: (id: string) => void;
  onAddTeacher: (teacher: Teacher) => void;
  onDeleteTeacher: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  students,
  teachers,
  adminConfig,
  onUpdateAdminConfig,
  onAddStudent,
  onDeleteStudent,
  onAddTeacher,
  onDeleteTeacher
}) => {
  const [activeTab, setActiveTab] = useState<'students' | 'teachers' | 'settings'>('students');

  // Forms State
  const [newStudent, setNewStudent] = useState({ name: '', nationalId: '', password: '', gradeLevel: '' });
  const [newTeacher, setNewTeacher] = useState({ name: '', username: '', password: '', subject: '' });
  const [adminForm, setAdminForm] = useState(adminConfig);
  const [msg, setMsg] = useState('');

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.nationalId || !newStudent.password) return;
    
    const student: Student = {
      id: Date.now().toString(),
      name: newStudent.name,
      nationalId: newStudent.nationalId,
      password: newStudent.password,
      role: UserRole.STUDENT,
      gradeLevel: newStudent.gradeLevel || 'العام',
      gpa: 100, // Default start
      attendanceRate: 100 // Default start
    };
    onAddStudent(student);
    setNewStudent({ name: '', nationalId: '', password: '', gradeLevel: '' });
    setMsg('تم إضافة الطالب بنجاح');
    setTimeout(() => setMsg(''), 3000);
  };

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.username || !newTeacher.password) return;
    
    const teacher: Teacher = {
      id: Date.now().toString(),
      name: newTeacher.name,
      username: newTeacher.username,
      password: newTeacher.password,
      role: UserRole.TEACHER,
      subject: newTeacher.subject || 'عام',
      classes: []
    };
    onAddTeacher(teacher);
    setNewTeacher({ name: '', username: '', password: '', subject: '' });
    setMsg('تم إضافة المعلم بنجاح');
    setTimeout(() => setMsg(''), 3000);
  };

  const handleUpdateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAdminConfig(adminForm);
    setMsg('تم تحديث بيانات المدير بنجاح');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">لوحة تحكم المدير</h2>
        <p className="text-gray-500">إدارة قواعد البيانات والمستخدمين</p>
      </div>

      {msg && (
        <div className="mb-6 bg-emerald-100 text-emerald-800 p-4 rounded-xl flex items-center animate-bounce">
            <Shield className="ml-2" size={20} />
            {msg}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200 pb-1">
        <button
            onClick={() => setActiveTab('students')}
            className={`pb-3 px-4 font-bold text-lg transition-colors ${activeTab === 'students' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-400'}`}
        >
            الطلاب
        </button>
        <button
            onClick={() => setActiveTab('teachers')}
            className={`pb-3 px-4 font-bold text-lg transition-colors ${activeTab === 'teachers' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-400'}`}
        >
            المعلمين
        </button>
        <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 px-4 font-bold text-lg transition-colors ${activeTab === 'settings' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-400'}`}
        >
            إعدادات الدخول
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        
        {/* STUDENTS TAB */}
        {activeTab === 'students' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl h-fit">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <UserPlus size={20} className="text-emerald-600" />
                        إضافة طالب جديد
                    </h3>
                    <form onSubmit={handleAddStudent} className="space-y-4">
                        <input
                            type="text"
                            placeholder="الاسم الثلاثي"
                            className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500"
                            value={newStudent.name}
                            onChange={e => setNewStudent({...newStudent, name: e.target.value})}
                        />
                        <input
                            type="text"
                            placeholder="رقم السجل المدني (للدخول)"
                            className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500"
                            value={newStudent.nationalId}
                            onChange={e => setNewStudent({...newStudent, nationalId: e.target.value})}
                        />
                        <input
                            type="password"
                            placeholder="كلمة المرور"
                            className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500"
                            value={newStudent.password}
                            onChange={e => setNewStudent({...newStudent, password: e.target.value})}
                        />
                         <input
                            type="text"
                            placeholder="الصف الدراسي"
                            className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500"
                            value={newStudent.gradeLevel}
                            onChange={e => setNewStudent({...newStudent, gradeLevel: e.target.value})}
                        />
                        <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors">
                            إضافة للقاعدة
                        </button>
                    </form>
                </div>

                <div className="lg:col-span-2">
                     <h3 className="font-bold text-gray-800 mb-4">قاعدة بيانات الطلاب ({students.length})</h3>
                     <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead className="bg-gray-50 text-gray-500 text-sm">
                                <tr>
                                    <th className="p-3">الاسم</th>
                                    <th className="p-3">السجل المدني</th>
                                    <th className="p-3">الصف</th>
                                    <th className="p-3">إجراء</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {students.map(student => (
                                    <tr key={student.id} className="group hover:bg-gray-50">
                                        <td className="p-3 font-medium">{student.name}</td>
                                        <td className="p-3 font-mono text-gray-600">{student.nationalId}</td>
                                        <td className="p-3 text-sm">{student.gradeLevel}</td>
                                        <td className="p-3">
                                            <button 
                                                onClick={() => onDeleteStudent(student.id)}
                                                className="text-red-400 hover:text-red-600 p-2"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     </div>
                </div>
            </div>
        )}

        {/* TEACHERS TAB */}
        {activeTab === 'teachers' && (
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl h-fit">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <UserPlus size={20} className="text-emerald-600" />
                        إضافة معلم جديد
                    </h3>
                    <form onSubmit={handleAddTeacher} className="space-y-4">
                        <input
                            type="text"
                            placeholder="اسم المعلم"
                            className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500"
                            value={newTeacher.name}
                            onChange={e => setNewTeacher({...newTeacher, name: e.target.value})}
                        />
                        <input
                            type="text"
                            placeholder="اسم المستخدم"
                            className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500"
                            value={newTeacher.username}
                            onChange={e => setNewTeacher({...newTeacher, username: e.target.value})}
                        />
                        <input
                            type="password"
                            placeholder="كلمة المرور"
                            className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500"
                            value={newTeacher.password}
                            onChange={e => setNewTeacher({...newTeacher, password: e.target.value})}
                        />
                         <input
                            type="text"
                            placeholder="التخصص / المادة"
                            className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500"
                            value={newTeacher.subject}
                            onChange={e => setNewTeacher({...newTeacher, subject: e.target.value})}
                        />
                        <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors">
                            إضافة للقاعدة
                        </button>
                    </form>
                </div>

                <div className="lg:col-span-2">
                     <h3 className="font-bold text-gray-800 mb-4">قاعدة بيانات المعلمين ({teachers.length})</h3>
                     <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead className="bg-gray-50 text-gray-500 text-sm">
                                <tr>
                                    <th className="p-3">الاسم</th>
                                    <th className="p-3">اسم المستخدم</th>
                                    <th className="p-3">المادة</th>
                                    <th className="p-3">إجراء</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {teachers.map(teacher => (
                                    <tr key={teacher.id} className="group hover:bg-gray-50">
                                        <td className="p-3 font-medium">{teacher.name}</td>
                                        <td className="p-3 font-mono text-gray-600">{teacher.username}</td>
                                        <td className="p-3 text-sm">{teacher.subject}</td>
                                        <td className="p-3">
                                            <button 
                                                onClick={() => onDeleteTeacher(teacher.id)}
                                                className="text-red-400 hover:text-red-600 p-2"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     </div>
                </div>
            </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
            <div className="max-w-xl mx-auto">
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 text-center mb-6">
                    <Shield className="mx-auto text-orange-500 mb-2" size={32} />
                    <h3 className="font-bold text-gray-800">بيانات الدخول الإدارية</h3>
                    <p className="text-sm text-gray-600 mt-1">يمكنك تغيير اسم المستخدم وكلمة المرور الخاصة بلوحة التحكم</p>
                </div>
                
                <form onSubmit={handleUpdateAdmin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <User size={16} />
                            اسم المستخدم الجديد
                        </label>
                        <input 
                            type="text" 
                            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                            value={adminForm.username}
                            onChange={(e) => setAdminForm({...adminForm, username: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <Key size={16} />
                            كلمة المرور الجديدة
                        </label>
                        <input 
                            type="text" 
                            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                            value={adminForm.password}
                            onChange={(e) => setAdminForm({...adminForm, password: e.target.value})}
                        />
                    </div>
                    <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2">
                        <Save size={20} />
                        حفظ التغييرات
                    </button>
                </form>
            </div>
        )}

      </div>
    </div>
  );
};