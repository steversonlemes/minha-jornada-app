import React from 'react';
import { COURSE_MODULES } from '../constants';
import type { Progress, Lesson } from '../types';
import { useI18n } from '../lib/i18n';
import { CheckCircleIcon, BookIcon } from './Icons';

interface CourseMapProps {
  progress: Progress;
  onSelectLesson: (lesson: Lesson) => void;
}

const CourseMap: React.FC<CourseMapProps> = ({ progress, onSelectLesson }) => {
  const { t, lang } = useI18n();
  let nextLessonFound = false;

  const getLessonStatus = (lessonId: string) => {
    if (progress[lessonId] === 'completed') {
      return 'completed';
    }
    if (!nextLessonFound) {
      nextLessonFound = true;
      return 'next';
    }
    return 'locked';
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-amber-400 mb-8">{t('map.title')}</h1>
      <div className="relative max-w-2xl mx-auto pl-8">
        <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-700"></div>
        
        {COURSE_MODULES.map((module) => (
          <div key={module.id} className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-500 mb-4 ml-[-2rem]">{module.title[lang]}</h2>
            {module.lessons.map((lesson) => {
              const status = getLessonStatus(lesson.id);
              const isLocked = status === 'locked';
              
              let statusClasses = 'bg-gray-800';
              let icon;
              let pulseClass = '';
              let statusText = '';

              if (status === 'completed') {
                statusClasses = 'bg-green-900/50 border-green-700';
                icon = <CheckCircleIcon className="w-8 h-8 text-green-500" />;
                statusText = t('map.completed');
              } else if (status === 'next') {
                statusClasses = 'bg-amber-900/50 border-amber-600 cursor-pointer hover:bg-amber-900/80';
                icon = <BookIcon className="w-8 h-8 text-amber-400" />;
                pulseClass = 'animate-pulse-slow';
                statusText = t('map.next_lesson');
              } else { // locked
                statusClasses = 'bg-gray-800/50 border-gray-700 text-gray-500';
                icon = <BookIcon className="w-8 h-8 text-gray-600" />;
              }

              return (
                <div key={lesson.id} className="relative mb-6">
                  <div className={`absolute left-[-2rem] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-gray-900 border-2 ${status === 'completed' ? 'border-green-500' : status === 'next' ? 'border-amber-500' : 'border-gray-600'}`}>
                    <div className={`w-3 h-3 rounded-full ${status === 'completed' ? 'bg-green-500' : status === 'next' ? 'bg-amber-500' : 'bg-gray-600'}`}></div>
                  </div>
                  <button
                    onClick={() => !isLocked && onSelectLesson(lesson)}
                    disabled={isLocked}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${statusClasses} ${pulseClass} disabled:cursor-not-allowed`}
                  >
                    <div className="flex items-center space-x-4">
                      <div>{icon}</div>
                      <div>
                        <h3 className={`font-bold text-lg ${isLocked ? 'text-gray-500' : 'text-gray-100'}`}>{lesson.title[lang]}</h3>
                        <p className={`text-sm ${isLocked ? 'text-gray-600' : status === 'completed' ? 'text-green-400' : 'text-amber-300'}`}>{statusText}</p>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(CourseMap);