
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getSovereignResult } from '../services/geminiService';
import { LoadingSpinner } from './icons';

const AskAshadu: React.FC = () => {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setResponse('');
    const result = await getSovereignResult(query, language);
    setResponse(result);
    setIsLoading(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-bold text-white font-cinzel mb-4">{t('askAshaduTitle')}</h2>
      <div className="space-y-4">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('askPlaceholder')}
          className="w-full h-20 p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#00FFFF] focus:outline-none resize-none text-white transition-colors"
          disabled={isLoading}
        />
        <button
          onClick={handleAsk}
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-[#FFD700] hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? <><LoadingSpinner /> {t('processingText')}...</> : t('askButton')}
        </button>
        {response && (
           <div className="mt-4 text-left bg-gray-900 border border-gray-700 p-4 rounded-lg">
            <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap">{response}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskAshadu;