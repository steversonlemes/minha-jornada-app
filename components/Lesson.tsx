import React, { useState } from 'react';
import type { Lesson as LessonType, Diary, Progress } from '../types';
import { useI18n } from '../lib/i18n';
import StudyGuide from './StudyGuide';

interface LessonProps {
  lesson: LessonType;
  diary: Diary;
  progress: Progress;
  onUpdateDiary: (entryId: string, text: string) => void;
  onCompleteLesson: (lessonId: string) => void;
  onBackToMap: () => void;
}

type Tab = 'summary' | 'podcast' | 'video' | 'guide';

const Lesson: React.FC<LessonProps> = ({ lesson, diary, progress, onUpdateDiary, onCompleteLesson, onBackToMap }) => {
  const { t, lang } = useI18n();
  const [activeTab, setActiveTab] = useState<Tab>('summary');
  const isCompleted = !!progress[lesson.id];

  const handleCompleteQuiz = () => {
    if (!isCompleted) {
        onCompleteLesson(lesson.id);
    }
  };

  const TabButton: React.FC<{ tabName: Tab; label: string }> = ({ tabName, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
        activeTab === tabName
          ? 'bg-gray-800 border-b-2 border-amber-500 text-amber-400'
          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <button onClick={onBackToMap} className="mb-4 text-amber-400 hover:underline">
        &larr; {t('nav.map')}
      </button>
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-400">{lesson.title[lang]}</h1>
        {isCompleted && <span className="text-green-400 text-sm font-semibold">{t('map.completed')}</span>}
      </header>
      
      <div className="border-b border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-2" aria-label="Tabs">
          <TabButton tabName="summary" label={t('lesson.summary')} />
          <TabButton tabName="podcast" label={t('lesson.podcast')} />
          <TabButton tabName="video" label={t('lesson.video')} />
          <TabButton tabName="guide" label={t('lesson.study_guide')} />
        </nav>
      </div>

      <div>
        {activeTab === 'summary' && (
          <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-h1:text-amber-400 prose-ul:list-disc prose-ul:pl-6" dangerouslySetInnerHTML={{ __html: lesson.summary[lang] }} />
        )}
        {activeTab === 'podcast' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{t('lesson.podcast')}</h2>
            <audio controls className="w-full">
              <source src={lesson.podcastUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        {activeTab === 'video' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{t('lesson.video')}</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={lesson.videoUrl}
                title={lesson.title[lang]}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
          </div>
        )}
        {activeTab === 'guide' && (
          <StudyGuide 
            lesson={lesson} 
            diaryEntries={diary} 
            onUpdateDiary={onUpdateDiary} 
            onCompleteQuiz={handleCompleteQuiz}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(Lesson);