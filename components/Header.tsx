
import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

const Header: React.FC = () => {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="w-1/3"></div> {/* Spacer */}
          <div className="w-1/3 text-center">
            <h1 className="text-xl font-bold tracking-widest text-white font-cinzel">
              ASHADU LINK
            </h1>
            <p className="text-xs text-gray-500 tracking-widest">{t('director')}: SHEIKH-MOHAMMED ABEDIN</p>
          </div>
          <div className="w-1/3 flex justify-end">
             <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;