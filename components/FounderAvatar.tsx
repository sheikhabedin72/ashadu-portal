
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FounderSilhouetteIcon } from './icons';

const FounderAvatar: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl"></div>
                <div 
                    className="absolute inset-0 flex items-center justify-center text-cyan-400"
                    style={{ animation: 'pulse-cyan 3s ease-in-out infinite' }}
                >
                    <FounderSilhouetteIcon className="w-24 h-24" />
                </div>
            </div>
            <h2 className="text-xl font-cinzel text-cyan-300 tracking-widest">{t('sovereignPresenceTitle')}</h2>
            <p className="text-xs text-gray-500">DYNAMIC VISUAL IDENTITY // 100% SOVEREIGN</p>
        </div>
    );
};

export default FounderAvatar;