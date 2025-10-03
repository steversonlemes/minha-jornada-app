import React, { useState, useMemo, useEffect } from 'react';
import { COURSE_MODULES } from '../constants';
import type { Diary } from '../types';
import { useI18n } from '../lib/i18n';
import { useDebounce } from '../hooks/useDebounce';

interface DiaryProps {
  diary: Diary;
  onUpdateDiary: (entryId: string, text: string) => void;
}

const allLessons = COURSE_MODULES.flatMap(m => m.lessons);

const DebouncedDiaryEditor: React.FC<{ entryId: string; initialValue: string; onUpdate: (id: string, text: string) => void; }> = ({ entryId, initialValue, onUpdate }) => {
  const { t } = useI18n();
  const [text, setText] = useState(initialValue);
  const debouncedText = useDebounce(text, 1000); // 1-second debounce delay

  useEffect(() => {
    if (debouncedText !== initialValue) {
      onUpdate(entryId, debouncedText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText, entryId, onUpdate]);

  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);


  return (
     <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder={t('diary.edit_your_notes')}
      className="w-full h-48 p-3 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
    />
  );
};


const Diary: React.FC<DiaryProps> = ({ diary, onUpdateDiary }) => {
  const { t, lang } = useI18n();
  const [selectedLesson, setSelectedLesson] = useState<string>('all');

  const filteredEntries = useMemo(() => {
    return Object.entries(diary).filter(([key]) => {
      if (selectedLesson === 'all') return true;
      return key.startsWith(selectedLesson);
    });
  }, [diary, selectedLesson]);

  const getQuestionText = (entryId: string): string => {
    const [lessonId, questionId] = entryId.split('_');
    const lesson = allLessons.find(l => l.id === lessonId);
    if (!lesson) return 'Questão desconhecida';
    const question = lesson.studyGuide.dissertationQuestions.find(q => q.id === questionId);
    return question ? question.question[lang] : 'Questão desconhecida';
  };

  return (
    <>
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-400 mb-6">{t('diary.title')}</h1>

        <div className="mb-6">
          <label htmlFor="lesson-filter" className="block text-sm font-medium text-gray-300 mb-1">{t('diary.filter_by_lesson')}</label>
          <select
            id="lesson-filter"
            value={selectedLesson}
            onChange={(e) => setSelectedLesson(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
          >
            <option value="all">{t('diary.all_lessons')}</option>
            {allLessons.map(lesson => (
              <option key={lesson.id} value={lesson.id}>{lesson.title[lang]}</option>
            ))}
          </select>
        </div>

        <div className="space-y-6">
          {filteredEntries.length > 0 ? (
            filteredEntries.map(([entryId, text]) => (
              <div key={entryId} className="bg-gray-800/50 p-4 border border-gray-700 rounded-lg">
                <h3 className="font-semibold text-amber-300 mb-2">{getQuestionText(entryId)}</h3>
                <DebouncedDiaryEditor 
                  entryId={entryId}
                  initialValue={text}
                  onUpdate={onUpdateDiary}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-10 px-4 bg-gray-800/50 rounded-lg">
              <p className="text-gray-400">{t('diary.no_notes')}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(Diary);