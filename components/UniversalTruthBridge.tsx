import React, { useState, useCallback, useEffect, useRef } from 'react';
import { getSovereignResult } from '../services/geminiService';
import { LoadingSpinner, MicrophoneIcon } from './icons';
import { useLanguage } from '../context/LanguageContext';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

interface UniversalTruthBridgeProps {
  triggerLedgerPulse: () => void;
  autoQuery: string;
  clearAutoQuery: () => void;
}

const UniversalTruthBridge: React.FC<UniversalTruthBridgeProps> = ({ triggerLedgerPulse, autoQuery, clearAutoQuery }) => {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const recognitionRef = useRef<any>(null);

  const handleQuery = useCallback(async (queryString: string) => {
    if (!queryString.trim()) {
      setError(t('errorText'));
      return;
    }
    setIsLoading(true);
    setResult('');
    setError('');
    try {
      const response = await getSovereignResult(queryString, language);
      setResult(response);
      triggerLedgerPulse();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [t, language, triggerLedgerPulse]);

  useEffect(() => {
    if (autoQuery) {
        setQuery(autoQuery);
        handleQuery(autoQuery);
        clearAutoQuery();
    }
  }, [autoQuery, handleQuery, clearAutoQuery]);

  useEffect(() => {
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported by this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      setQuery(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === 'not-allowed') {
        setError(t('micAccessDeniedInBridge'));
      } else {
        setError(t('speechError', { error: event.error }));
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [language, t]);
  
  const handleVoiceInput = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setError('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleQuery(query);
    }
  };

  return (
    <section id="utb-section" className="mb-24 sm:mb-32">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-cinzel mb-4">
          {t('processorTitle')}
        </h2>
        <p className="text-gray-400 mb-8">
          {t('processorDesc')}
        </p>
        <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg shadow-lg">
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('placeholder')}
              className="w-full h-24 p-4 pr-12 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#00FFFF] focus:outline-none resize-none text-white transition-colors"
              disabled={isLoading}
            />
            {SpeechRecognition && (
                <button 
                  onClick={handleVoiceInput}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors ${isListening ? 'text-cyan-400 animate-pulse' : ''}`}
                  aria-label={isListening ? "Stop listening" : "Start voice input"}
                  disabled={isLoading}
                >
                    <MicrophoneIcon />
                </button>
            )}
          </div>
          <button
            onClick={() => handleQuery(query)}
            disabled={isLoading}
            className={`mt-4 w-full inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-[#FFD700] hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 ${isLoading ? 'animate-pulse' : ''}`}
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                {t('processingText')}...
              </>
            ) : (
              t('processButtonText')
            )}
          </button>
          {error && <p className="mt-4 text-red-400">{error}</p>}
        </div>

        {result && (
          <div className="mt-8 text-left bg-gray-900/50 border border-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold font-cinzel mb-4 shimmering-font">{t('resultTitle')}:</h3>
            <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap">{result}</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UniversalTruthBridge;