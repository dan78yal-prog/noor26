import React, { useState } from 'react';
import { UserRole } from '../types';
import { GraduationCap, ShieldCheck, User, Users } from 'lucide-react';

interface LoginProps {
  onLogin: (role: UserRole, credentials: any) => void;
  error?: string;
}

export const Login: React.FC<LoginProps> = ({ onLogin, error }) => {
  const [activeTab, setActiveTab] = useState<UserRole>(UserRole.STUDENT);
  const [formData, setFormData] = useState({ identifier: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(activeTab, formData);
  };

  const getTabLabel = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN: return 'مدير النظام';
      case UserRole.STUDENT: return 'الطالب';
      case UserRole.TEACHER: return 'المعلم';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-600 p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-inner">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-2xl font-bold">نور <span className="text-emerald-200">لايت</span></h1>
          <p className="text-emerald-100 text-sm mt-2">بوابة التعليم الذكي الموحدة</p>
        </div>

        {/* Tabs */}
        <div className="flex p-2 bg-gray-50 border-b border-gray-100">
          {[UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN].map((role) => (
            <button
              key={role}
              onClick={() => {
                setActiveTab(role);
                setFormData({ identifier: '', password: '' });
              }}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
                activeTab === role
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                {role === UserRole.ADMIN && <ShieldCheck size={18} />}
                {role === UserRole.TEACHER && <User size={18} />}
                {role === UserRole.STUDENT && <Users size={18} />}
                {getTabLabel(role)}
              </div>
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700">
                {activeTab === UserRole.STUDENT ? 'رقم السجل المدني' : 'اسم المستخدم'}
              </label>
              <input
                type="text"
                required
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-left dir-ltr"
                placeholder={activeTab === UserRole.STUDENT ? '1XXXXXXXXX' : ''}
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700">كلمة المرور</label>
              <input
                type="password"
                required
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-left dir-ltr"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium animate-pulse">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-1 mt-4"
            >
              تسجيل الدخول
            </button>
          </form>
        </div>
        
        <div className="bg-gray-50 p-4 text-center">
            <p className="text-xs text-gray-400">جميع الحقوق محفوظة © 2024</p>
        </div>
      </div>
    </div>
  );
};