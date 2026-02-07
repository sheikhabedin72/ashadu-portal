
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RetinaIcon, VoiceIcon, HeartRateIcon } from './icons';

interface ProtocolZeroLockdownProps {
  onUnlock: () => void;
}

const ProtocolZeroLockdown: React.FC<ProtocolZeroLockdownProps> = ({ onUnlock }) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center text-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl sm:text-5xl font-cinzel text-red-500 tracking-widest animate-pulse">
          {t('protocolZeroActive')}
        </h1>
        <p className="text-gray-400 font-mono mt-4 mb-12">{t('systemLockdown')}</p>
        <div className="flex justify-center space-x-8 sm:space-x-12 mb-12 text-yellow-400">
            <RetinaIcon className="w-12 h-12 sm:w-16 sm:h-16 pulse-gold" style={{animationDelay: '0s'}}/>
            <VoiceIcon className="w-12 h-12 sm:w-16 sm:h-16 pulse-gold" style={{animationDelay: '0.2s'}}/>
            <HeartRateIcon className="w-12 h-12 sm:w-16 sm:h-16 pulse-gold" style={{animationDelay: '0.4s'}}/>
        </div>
        <button 
            onClick={onUnlock}
            className="px-12 py-4 border border-yellow-500 text-yellow-500 font-semibold rounded-md hover:bg-yellow-500 hover:text-black transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(255,215,0,0.3)]"
        >
            {t('reauthorizeButton')}
        </button>
      </div>
    </div>
  );
};

export default ProtocolZeroLockdown;