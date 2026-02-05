import React, { useState } from 'react';
import { UserRole } from '../types';
import { askAITutor, generateLessonPlan } from '../services/geminiService';
import { Send, Sparkles, BookOpen, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AIProps {
  role: UserRole;
}

export const AIAssistant: React.FC<AIProps> = ({ role }) => {
  const [input, setInput] = useState('');
  const [subject, setSubject] = useState('عام');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse('');
    
    try {
      let result = '';
      if (role === UserRole.STUDENT) {
        result = await askAITutor(subject, input);
      } else {
        result = await generateLessonPlan(input, subject); // subject used as grade level for teachers here
      }
      setResponse(result);
    } catch (err) {
      setResponse('حدث خطأ غير متوقع.');
    } finally {
      setLoading(false);
    }
  };

  const isStudent = role === UserRole.STUDENT;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white mb-4 shadow-lg shadow-indigo-200">
            <Sparkles size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isStudent ? 'المعلم الذكي' : 'مساعد التحضير الذكي'}
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
            {isStudent 
                ? 'اسأل عن أي مفهوم دراسي، مسألة رياضية، أو قاعدة نحوية وسأقوم بشرحها لك ببساطة.' 
                : 'اكتب موضوع الدرس وسأقوم بإعداد خطة درس متكاملة تشمل الأهداف والأنشطة.'}
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8 bg-gradient-to-b from-indigo-50/50 to-white">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Configuration Row */}
                <div className="flex gap-4">
                     <div className="w-1/3">
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            {isStudent ? 'المادة الدراسية' : 'الصف الدراسي'}
                        </label>
                        <select 
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        >
                            {isStudent ? (
                                <>
                                    <option value="عام">عام</option>
                                    <option value="الرياضيات">الرياضيات</option>
                                    <option value="الفيزياء">الفيزياء</option>
                                    <option value="الكيمياء">الكيمياء</option>
                                    <option value="اللغة العربية">اللغة العربية</option>
                                    <option value="اللغة الإنجليزية">اللغة الإنجليزية</option>
                                </>
                            ) : (
                                <>
                                    <option value="الأول الثانوي">الأول الثانوي</option>
                                    <option value="الثاني الثانوي">الثاني الثانوي</option>
                                    <option value="الثالث الثانوي">الثالث الثانوي</option>
                                </>
                            )}
                        </select>
                     </div>
                     <div className="flex-1">
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                             {isStudent ? 'سؤالك' : 'عنوان الدرس'}
                        </label>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={isStudent ? "اشرح لي قانون نيوتن الثاني..." : "المتجهات في الفضاء..."}
                            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        />
                     </div>
                </div>
                
                <button 
                    type="submit" 
                    disabled={loading || !input}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" />
                            جاري المعالجة...
                        </>
                    ) : (
                        <>
                            <Send size={20} className={loading ? "" : "ml-1 rtl:ml-0 rtl:mr-1 transform rotate-180"} />
                            {isStudent ? 'اشرح لي' : 'إنشاء الخطة'}
                        </>
                    )}
                </button>
            </form>
        </div>

        {/* Result Area */}
        {(response || loading) && (
            <div className="border-t border-gray-100 bg-gray-50 min-h-[300px] p-8">
                {loading ? (
                     <div className="flex flex-col items-center justify-center h-full pt-10 opacity-60">
                        <div className="w-16 h-16 relative mb-4">
                            <div className="absolute inset-0 bg-indigo-200 rounded-full animate-ping"></div>
                            <div className="absolute inset-2 bg-indigo-500 rounded-full flex items-center justify-center text-white">
                                <Sparkles size={24} />
                            </div>
                        </div>
                        <p className="text-gray-500 font-medium">الذكاء الاصطناعي يفكر...</p>
                     </div>
                ) : (
                    <div className="prose prose-indigo max-w-none text-right" dir="rtl">
                         <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                            <div className="bg-indigo-100 p-2 rounded-lg text-indigo-700">
                                <BookOpen size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 m-0">النتيجة</h3>
                         </div>
                         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-gray-700 leading-relaxed whitespace-pre-line">
                            {response}
                         </div>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};