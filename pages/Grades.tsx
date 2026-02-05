import React from 'react';
import { MOCK_COURSES } from '../constants';
import { Award, TrendingUp } from 'lucide-react';

export const Grades: React.FC = () => {
  return (
    <div className="animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Award className="text-emerald-500" />
            سجل الدرجات الأكاديمي
        </h2>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-right text-sm font-bold text-gray-600">المادة</th>
                            <th className="px-6 py-4 text-right text-sm font-bold text-gray-600">المعلم</th>
                            <th className="px-6 py-4 text-center text-sm font-bold text-gray-600">الدرجة العظمى</th>
                            <th className="px-6 py-4 text-center text-sm font-bold text-gray-600">الدرجة المكتسبة</th>
                            <th className="px-6 py-4 text-center text-sm font-bold text-gray-600">التقدير</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {MOCK_COURSES.map((course) => {
                            const percentage = (course.grade / course.maxGrade) * 100;
                            let gradeLabel = 'ممتاز';
                            let gradeColor = 'text-emerald-600 bg-emerald-50';
                            
                            if (percentage < 90) { gradeLabel = 'جيد جداً'; gradeColor = 'text-blue-600 bg-blue-50'; }
                            if (percentage < 80) { gradeLabel = 'جيد'; gradeColor = 'text-yellow-600 bg-yellow-50'; }

                            return (
                                <tr key={course.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-800">{course.name}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">
                                        {course.teacherName}
                                    </td>
                                    <td className="px-6 py-4 text-center text-gray-500 font-mono">
                                        {course.maxGrade}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="font-bold text-gray-800 font-mono text-lg">{course.grade}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${gradeColor}`}>
                                            {gradeLabel}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                <div className="text-gray-500 text-sm flex items-center gap-2">
                    <TrendingUp size={16} />
                    <span>آخر تحديث: قبل ساعتين</span>
                </div>
            </div>
        </div>
    </div>
  );
};