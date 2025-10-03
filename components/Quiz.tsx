import React, { useState } from 'react';
import type { QuizQuestion } from '../types';
import { useI18n } from '../lib/i18n';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

const PASSING_SCORE = 80;

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const { t, lang } = useI18n();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelectAnswer = (questionId: string, answerIndex: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswerIndex) {
        correctAnswers++;
      }
    });
    const calculatedScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(calculatedScore);
    setSubmitted(true);
    if (calculatedScore >= PASSING_SCORE) {
      onComplete();
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const getButtonClass = (questionId: string, optionIndex: number) => {
    if (!submitted) {
      return answers[questionId] === optionIndex
        ? 'bg-amber-600 border-amber-400'
        : 'bg-gray-700 border-gray-600 hover:bg-gray-600';
    }
    
    const isCorrect = optionIndex === questions.find(q => q.id === questionId)?.correctAnswerIndex;
    const isSelected = answers[questionId] === optionIndex;

    if (isCorrect) return 'bg-green-700 border-green-500';
    if (isSelected && !isCorrect) return 'bg-red-700 border-red-500';
    
    return 'bg-gray-800 border-gray-700 text-gray-400';
  };

  return (
    <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/50 mt-4">
      <h3 className="text-xl font-bold text-amber-400 mb-4">{t('sg.quiz')}</h3>
      {questions.map((q, index) => (
        <div key={q.id} className="mb-6">
          <p className="font-semibold mb-2">{`${index + 1}. ${q.question[lang]}`}</p>
          <div className="space-y-2">
            {q.options[lang].map((option, i) => (
              <button
                key={i}
                onClick={() => handleSelectAnswer(q.id, i)}
                disabled={submitted}
                className={`w-full text-left p-3 border rounded-md transition-colors duration-200 ${getButtonClass(q.id, i)}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length !== questions.length}
          className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded transition-colors"
        >
          {t('quiz.submit')}
        </button>
      ) : (
        <div className="text-center p-4 rounded-lg bg-gray-900">
          <p className="text-2xl font-bold mb-2">{t('quiz.score', { score: score.toString() })}</p>
          {score >= PASSING_SCORE ? (
            <p className="text-green-400">{t('quiz.passed')}</p>
          ) : (
            <div>
              <p className="text-red-400">{t('quiz.failed')}</p>
              <p className="text-sm text-gray-400 mb-4">{t('quiz.passing_score')}</p>
              <button
                onClick={handleRetake}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                {t('quiz.retake')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;