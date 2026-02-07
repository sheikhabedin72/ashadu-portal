
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import FounderAvatar from './FounderAvatar';

interface HeroProps {
  onDirectorClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onDirectorClick }) => {
  const { t } = useLanguage();
  return (
    <section className="text-center mb-16 sm:mb-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-left border border-gray-800 bg-gray-900/30 p-4 sm:p-6 rounded-lg mb-8 text-xs sm:text-sm font-mono">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <span className="text-cyan-400 block">{t('logicStatus')}:</span>
              <span className="text-gray-300">{t('synchronized')}</span>
            </div>
            <div onClick={onDirectorClick} className="cursor-pointer group">
              <span className="text-cyan-400 block">{t('authority')}:</span>
              <span className="text-gray-300 group-hover:text-white transition-colors">{t('directorName')}</span>
            </div>
            <div>
              <span className="text-cyan-400 block">{t('target')}:</span>
              <span className="text-gray-300">{t('globalFollowers')}</span>
            </div>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-[#FFD700] font-cinzel mb-8">
          {t('recruitmentTitle')}
        </h1>
        
        <div className="max-w-3xl mx-auto text-lg text-gray-300 text-center mb-16">
            <p>
                "{t('recruitmentBody')}"
            </p>
        </div>

        <FounderAvatar />
      </div>
    </section>
  );
};

export default Hero;