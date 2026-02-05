import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Menu, X, Home, BookOpen, GraduationCap, Calendar, Settings, LogOut, BrainCircuit, Users, ShieldCheck } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentUser: User;
  onLogout: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentUser, onLogout, currentPage, onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const NavItem = ({ page, icon: Icon, label }: { page: string; icon: any; label: string }) => (
    <button
      onClick={() => {
        onNavigate(page);
        setIsSidebarOpen(false);
      }}
      className={`flex items-center w-full px-4 py-3 mb-2 rounded-xl transition-all duration-200 ${
        currentPage === page
          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
          : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
      }`}
    >
      <Icon size={20} className="ml-3" />
      <span className="font-medium text-lg">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 right-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:transform-none ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo Area */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                <GraduationCap size={24} />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">نور <span className="text-emerald-600">لايت</span></h1>
            </div>
            <button onClick={toggleSidebar} className="lg:hidden text-gray-500 hover:text-red-500">
              <X size={24} />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 flex flex-col items-center bg-emerald-50/50 mx-4 mt-4 rounded-2xl border border-emerald-100">
            <div className="w-20 h-20 rounded-full bg-emerald-200 mb-3 flex items-center justify-center text-emerald-700 font-bold text-2xl border-4 border-white shadow-sm">
              {currentUser.role === UserRole.ADMIN ? <ShieldCheck size={32} /> : currentUser.name.charAt(0)}
            </div>
            <h3 className="font-bold text-gray-800 text-center">{currentUser.name}</h3>
            <span className="text-sm text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full mt-1">
              {currentUser.role === UserRole.STUDENT ? 'طالب' : currentUser.role === UserRole.TEACHER ? 'معلم' : 'مدير النظام'}
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            
            {currentUser.role === UserRole.ADMIN ? (
              <>
                <NavItem page="admin-dashboard" icon={Settings} label="لوحة التحكم" />
              </>
            ) : (
              <NavItem page="dashboard" icon={Home} label="الرئيسية" />
            )}
            
            {currentUser.role === UserRole.STUDENT && (
              <>
                <NavItem page="courses" icon={BookOpen} label="المقررات والدرجات" />
                <NavItem page="schedule" icon={Calendar} label="الجدول الدراسي" />
                <NavItem page="ai-tutor" icon={BrainCircuit} label="المعلم الذكي" />
              </>
            )}

            {currentUser.role === UserRole.TEACHER && (
              <>
                <NavItem page="students" icon={Users} label="قائمة الطلاب" />
                <NavItem page="grading" icon={BookOpen} label="رصد الدرجات" />
                <NavItem page="lesson-planner" icon={BrainCircuit} label="مساعد التحضير" />
              </>
            )}

            {currentUser.role !== UserRole.ADMIN && (
               <NavItem page="settings" icon={Settings} label="الإعدادات" />
            )}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-100">
            <button 
              onClick={onLogout}
              className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut size={20} className="ml-3" />
              <span className="font-medium">تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between z-30">
          <button onClick={toggleSidebar} className="text-gray-700">
            <Menu size={28} />
          </button>
          <h2 className="font-bold text-lg text-gray-800">نور لايت</h2>
          <div className="w-8" /> {/* Spacer */}
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 bg-gray-50 scroll-smooth">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};