
import React, { useState, useEffect } from 'react';
import { useI18n } from '../lib/i18n';

interface LoadingSpinnerProps {
    message?: string;
}

const loadingQuotes: Parameters<ReturnType<typeof useI18n>['t']>[0][] = [
    'loading.quote1',
    'loading.quote2',
    'loading.quote3',
    'loading.quote4'
];

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  const { t } = useI18n();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % loadingQuotes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const displayedMessage = message || t(loadingQuotes[currentQuoteIndex]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-center px-4">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-amber-500"></div>
      <p className="mt-6 text-lg text-amber-400 transition-opacity duration-500">{displayedMessage}</p>
    </div>
  );
};

export default LoadingSpinner;