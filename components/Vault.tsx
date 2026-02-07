
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LockIcon } from './icons';

const Vault: React.FC = () => {
  const { t } = useLanguage();
  const [isLocked, setIsLocked] = useState(true);

  const renderPitch = (titleKey: any, bodyKey: any) => (
    <div className="border border-gray-800 bg-gray-900/30 p-4 sm:p-6 rounded-lg">
      <h4 className="text-lg font-bold text-cyan-400 font-cinzel mb-2">{t(titleKey)}</h4>
      <p className="text-gray-400 text-sm font-mono">{t(bodyKey)}</p>
    </div>
  );

  return (
    <section className="mt-24 sm:mt-32 pb-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-cinzel mb-4">
          {t('vaultTitle')}
        </h2>
        {isLocked ? (
          <div 
            className="border-2 border-dashed border-gray-700 p-8 rounded-lg cursor-pointer hover:border-yellow-500/50 transition-colors"
            onClick={() => setIsLocked(false)}
            role="button"
            aria-label="Unlock the vault"
          >
            <div className="flex justify-center items-center text-gray-600 mb-4">
              <LockIcon />
            </div>
            <p className="text-gray-500">{t('vaultSealedMessage')}</p>
          </div>
        ) : (
          <div className="text-left space-y-6">
            {renderPitch('pitchTitleEn', 'pitchBodyEn')}
            {renderPitch('pitchTitleAr', 'pitchBodyAr')}
            {renderPitch('pitchTitleZh', 'pitchBodyZh')}
          </div>
        )}
      </div>
    </section>
  );
};

export default Vault;