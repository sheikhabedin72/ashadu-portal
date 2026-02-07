
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const DecoyOverlay: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center text-center p-4 font-mono">
             <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
             <div className="relative">
                <h2 className="text-3xl font-bold text-red-500 tracking-widest animate-pulse">
                    {t('decoyTitle')}
                </h2>
                <p className="mt-4 text-gray-300">
                    {t('decoyMessage')}
                </p>
             </div>
        </div>
    );
};

export default DecoyOverlay;