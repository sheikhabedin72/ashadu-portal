
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface GatewayProps {
  onEnter: () => void;
}

const Gateway: React.FC<GatewayProps> = ({ onEnter }) => {
  const { t } = useLanguage();

  const handleEnter = () => {
    // The external audio file was causing loading errors. 
    // This functionality has been removed to resolve the console error.
    onEnter();
  };

  return (
    <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center text-center">
      <div className="max-w-md w-full p-8">
        <h1 className="text-4xl font-cinzel text-yellow-400 shimmering-font mb-4">Ashadu Core</h1>
        <div className="text-white mb-8">
          <p className="text-2xl font-cinzel">أشهد أن لا إله إلا الله وأشهد أن محمدا رسول الله</p>
          <p className="text-sm tracking-widest mt-2">I bear witness that there is no god but Allah, and I bear witness that Muhammad is the Messenger of Allah.</p>
        </div>
        <button
          onClick={handleEnter}
          className="px-12 py-4 border border-[#FFD700] text-[#FFD700] text-lg font-semibold rounded-md hover:bg-[#FFD700] hover:text-black transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(255,215,0,0.3)]"
        >
          {t('enterCore')}
        </button>
      </div>
    </div>
  );
};

export default Gateway;