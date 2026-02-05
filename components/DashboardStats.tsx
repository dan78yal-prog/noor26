import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { UserRole, Student } from '../types';
import { MOCK_COURSES } from '../constants';

interface StatsProps {
  role: UserRole;
  studentData?: Student;
}

export const DashboardStats: React.FC<StatsProps> = ({ role, studentData }) => {
  if (role === UserRole.TEACHER) {
    // Mock data for teacher stats
    const teacherData = [
      { name: 'ممتاز', count: 15 },
      { name: 'جيد جداً', count: 25 },
      { name: 'جيد', count: 10 },
      { name: 'مقبول', count: 5 },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">تحليل درجات الطلاب</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teacherData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f3f4f6' }}
                />
                <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} barSize={40}>
                   {teacherData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#10b981' : '#34d399'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2 w-full text-right">ملخص اليوم</h3>
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                    <span className="block text-3xl font-bold text-blue-600">3</span>
                    <span className="text-sm text-gray-600">حصص اليوم</span>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl text-center">
                    <span className="block text-3xl font-bold text-orange-600">45</span>
                    <span className="text-sm text-gray-600">طالب</span>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl text-center col-span-2">
                    <span className="block text-xl font-bold text-emerald-600">98%</span>
                    <span className="text-sm text-gray-600">نسبة الحضور</span>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // Student Stats
  const studentGrades = MOCK_COURSES.map(c => ({ name: c.name, grade: c.grade }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* GPA Card */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl text-white shadow-lg lg:col-span-1">
        <h3 className="text-lg font-medium opacity-90 mb-2">المعدل التراكمي</h3>
        <div className="text-5xl font-bold mb-4">{studentData?.gpa}%</div>
        <div className="flex items-center gap-2 text-sm bg-white/20 p-2 rounded-lg w-fit">
          <span>مستوى ممتاز</span>
          <span>⭐</span>
        </div>
        <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm opacity-80">الحضور</span>
                <span className="font-bold">{studentData?.attendanceRate}%</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: `${studentData?.attendanceRate}%` }}></div>
            </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
        <h3 className="text-xl font-bold text-gray-800 mb-6">أدائي في المواد</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={studentGrades}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickMargin={10} />
              <YAxis stroke="#6b7280" domain={[0, 100]} />
              <Tooltip 
                 contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                 cursor={{ fill: '#f3f4f6' }}
              />
              <Bar dataKey="grade" fill="#10b981" radius={[6, 6, 0, 0]} barSize={32}>
                 {studentGrades.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.grade >= 90 ? '#10b981' : entry.grade >= 80 ? '#34d399' : '#f59e0b'} />
                  ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};