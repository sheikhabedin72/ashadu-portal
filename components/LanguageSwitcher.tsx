
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const languages = {
  en: 'English',
  ar: 'العربية',
  zh: '中文',
  es: 'Español',
  hi: 'हिन्दी',
  fr: 'Français',
  pt: 'Português',
  ru: 'Русский',
};

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value as 'en' | 'ar' | 'zh' | 'es' | 'hi' | 'fr' | 'ru' | 'pt');
  };

  return (
    <div className="relative">
      <select
        value={language}
        onChange={handleChange}
        className="bg-transparent text-gray-400 border border-gray-700 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FFFF] appearance-none"
        aria-label="Select language"
      >
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code} className="bg-[#050505] text-white">
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;