import React from 'react';
import { User, UserRole, Student } from '../types';
import { DashboardStats } from '../components/DashboardStats';
import { ANNOUNCEMENTS, MOCK_SCHEDULE } from '../constants';
import { Bell, Clock, ChevronLeft } from 'lucide-react';

interface DashboardProps {
  user: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const todaySchedule = MOCK_SCHEDULE[0]; // Assuming Sunday for demo

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <h2 className="text-3xl font-bold text-gray-800">مرحباً بك، {user.name.split(' ')[0]} 👋</h2>
            <p className="text-gray-500 mt-1">إليك نظرة عامة على نشاطك التعليمي اليوم</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 pr-4 rounded-xl shadow-sm border border-gray-100">
            <span className="text-sm font-bold text-gray-600">الفصل الدراسي الثاني 1446</span>
            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                <Clock size={20} />
            </div>
        </div>
      </div>

      <DashboardStats role={user.role} studentData={user.role === UserRole.STUDENT ? (user as Student) : undefined} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Schedule Preview */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Clock className="text-emerald-500" size={24} />
                جدول اليوم
            </h3>
            <span className="text-sm text-gray-400">{todaySchedule.day}</span>
          </div>
          <div className="space-y-4">
            {todaySchedule.periods.map((period, idx) => (
                <div key={idx} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors border-r-4 border-transparent hover:border-emerald-500 group">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center font-bold text-gray-400 group-hover:text-emerald-600 shadow-sm text-sm">
                        {idx + 1}
                    </div>
                    <div className="mr-4 flex-1">
                        <h4 className="font-bold text-gray-800">{period.subject}</h4>
                        <span className="text-xs text-gray-500">{period.time}</span>
                    </div>
                    <button className="text-gray-300 group-hover:text-emerald-500">
                        <ChevronLeft size={20} />
                    </button>
                </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
           <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Bell className="text-orange-500" size={24} />
                الإعلانات والتعاميم
            </h3>
          </div>
          <div className="space-y-4">
            {ANNOUNCEMENTS.map((ann) => (
                <div key={ann.id} className={`p-4 rounded-xl border border-gray-100 ${ann.type === 'urgent' ? 'bg-red-50 border-red-100' : 'bg-white'}`}>
                    <div className="flex justify-between items-start mb-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                            ann.type === 'urgent' ? 'bg-red-200 text-red-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                            {ann.type === 'urgent' ? 'عاجل' : 'عام'}
                        </span>
                        <span className="text-xs text-gray-400">{ann.date}</span>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1">{ann.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{ann.content}</p>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};