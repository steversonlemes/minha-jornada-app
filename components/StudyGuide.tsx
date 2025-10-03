import React, { useState, useEffect } from 'react';
import type { Lesson, Diary } from '../types';
import { useI18n } from '../lib/i18n';
import { ChevronDownIcon } from './Icons';
import Quiz from './Quiz';
import { useDebounce } from '../hooks/useDebounce';

interface StudyGuideProps {
  lesson: Lesson;
  diaryEntries: Diary;
  onUpdateDiary: (entryId: string, text: string) => void;
  onCompleteQuiz: () => void;
}

const AccordionItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left p-4 hover:bg-gray-700/50"
      >
        <span className="font-semibold">{title}</span>
        <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="p-4 bg-gray-800">{children}</div>}
    </div>
  );
};

const DebouncedTextarea: React.FC<{ entryId: string; initialValue: string; onUpdate: (id: string, text: string) => void }> = ({ entryId, initialValue, onUpdate }) => {
  const { t } = useI18n();
  const [text, setText] = useState(initialValue);
  const debouncedText = useDebounce(text, 1000); // 1-second debounce delay

  useEffect(() => {
    if (debouncedText !== initialValue) {
      onUpdate(entryId, debouncedText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText, entryId, onUpdate]);

  return (
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder={t('sg.your_notes_here')}
      className="w-full h-32 p-2 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
    />
  );
};

const StudyGuide: React.FC<StudyGuideProps> = ({ lesson, diaryEntries, onUpdateDiary, onCompleteQuiz }) => {
  const { t, lang } = useI18n();
  const guide = lesson.studyGuide;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-amber-400 mb-2">{t('sg.short_answer')}</h3>
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          {guide.shortAnswerQuestions.map(item => (
            <AccordionItem key={item.id} title={item.question[lang]}>
              <p className="text-gray-300">{item.answer[lang]}</p>
            </AccordionItem>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-amber-400 mb-2">{t('sg.dissertation')}</h3>
        <div className="space-y-4">
          {guide.dissertationQuestions.map(item => (
            <div key={item.id} className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <p className="font-semibold mb-2">{item.question[lang]}</p>
              <DebouncedTextarea
                entryId={`${lesson.id}_${item.id}`}
                initialValue={diaryEntries[`${lesson.id}_${item.id}`] || ''}
                onUpdate={onUpdateDiary}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-amber-400 mb-2">{t('sg.glossary')}</h3>
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          {guide.glossary.map(item => (
            <AccordionItem key={item.id} title={item.term[lang]}>
              <p className="text-gray-300">{item.definition[lang]}</p>
            </AccordionItem>
          ))}
        </div>
      </div>
      
      <Quiz questions={guide.quiz} onComplete={onCompleteQuiz} />
    </div>
  );
};

export default StudyGuide;