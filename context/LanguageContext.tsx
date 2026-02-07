import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { translations, TranslationKeys } from '../i18n/translations';

type Language = 'en' | 'ar' | 'zh' | 'es' | 'hi' | 'fr' | 'ru' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  // FIX: Updated the type definition for the `t` function to accept an optional `replacements` object.
  t: (key: TranslationKeys, replacements?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// FIX: An explicit interface for props was defined to ensure type safety and resolve a potential type inference issue.
interface LanguageProviderProps {
  // FIX: Made children optional to resolve a TypeScript error where the compiler incorrectly reports it as missing.
  children?: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // FIX: Updated the `t` function to handle placeholder replacements.
  // It now iterates over the `replacements` object and substitutes placeholders like `{key}` with their corresponding values.
  const t = (key: TranslationKeys, replacements?: { [key: string]: string | number }): string => {
    let translation = translations[language][key] || translations['en'][key];
    if (replacements) {
      Object.keys(replacements).forEach(placeholder => {
        translation = translation.replace(`{${placeholder}}`, String(replacements[placeholder]));
      });
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};