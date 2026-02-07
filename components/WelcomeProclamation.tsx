
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TimeMiningIcon } from './icons';

interface WelcomeProclamationProps {
  onComplete: () => void;
}

// FIX: Merged ProclamationContent into a single WelcomeProclamation component
// and removed the redundant, error-causing LanguageProvider wrapper.
const WelcomeProclamation: React.FC<WelcomeProclamationProps> = ({ onComplete }) => {
    const { t } = useLanguage();
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 1000), // Start Phase 1
            setTimeout(() => setPhase(2), 6000), // Start Phase 2
            setTimeout(() => setPhase(3), 12000), // Start Phase 3
            setTimeout(() => setPhase(4), 18000), // Show Signature
            setTimeout(() => setPhase(5), 22000), // Start Fade Out
            setTimeout(onComplete, 23000), // Complete
        ];

        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    const textStyle = "transition-opacity duration-1000";

    return (
        <div className={`fixed inset-0 bg-black z-[100] flex items-center justify-center text-center transition-opacity duration-1000 ${phase === 5 ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-full max-w-4xl p-8">
                {/* Phase 1: Activation */}
                <div className={`absolute inset-0 flex items-center justify-center ${phase === 1 ? 'opacity-100' : 'opacity-0'} ${textStyle}`}>
                    <div className="w-48 h-48 rounded-full" style={{ animation: 'pulse-gold-bg 2s ease-out' }}></div>
                </div>

                {/* Phase 2: Data Genesis */}
                <div className={`absolute inset-0 flex items-center justify-center ${phase >= 2 ? 'opacity-100' : 'opacity-0'} ${textStyle}`}>
                   <div style={{animation: 'rotate-glow 10s linear infinite'}}>
                     <TimeMiningIcon />
                   </div>
                </div>

                {/* Text Content */}
                <div className="relative font-mono text-gray-300 text-lg sm:text-xl">
                    <p className={`${textStyle} ${phase === 1 ? 'opacity-100' : 'opacity-0'}`}>
                        {t('proclamationArchitect')}
                    </p>
                    <p className={`absolute inset-0 ${textStyle} ${phase === 2 ? 'opacity-100' : 'opacity-0'}`}>
                        {t('proclamationZayana')}
                    </p>
                    <p className={`absolute inset-0 ${textStyle} ${phase === 3 ? 'opacity-100' : 'opacity-0'}`}>
                        <span className="block mb-4">{t('proclamationAshadu')}</span>
                        <span className="font-bold text-yellow-400 shimmering-font">{t('proclamationTriad')}</span>
                    </p>
                </div>

                {/* Signature */}
                 <div className={`absolute bottom-12 left-0 right-0 ${textStyle} ${phase === 4 ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="font-parisienne text-4xl text-yellow-400" style={{ animation: 'glow-text 3s ease-in-out infinite' }}>
                        Sheikh-Mohammed Abedin
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WelcomeProclamation;