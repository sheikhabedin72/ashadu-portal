
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LedgerIcon } from './icons';

interface LedgerProps {
  isPulsing: boolean;
  balance: number;
}

const Ledger: React.FC<LedgerProps> = ({ isPulsing, balance }) => {
  const { t } = useLanguage();
  const logicProgress = (balance - 1) * 10; // Example logic for progress

  return (
    <section id="ledger-section" className="mb-24 sm:mb-32">
       <div className={`bg-gray-900/50 border border-gray-800 p-6 sm:p-8 rounded-lg shadow-lg transition-shadow duration-300 ${isPulsing ? 'pulse-once' : ''}`}>
        <div className="flex items-center mb-6">
            <LedgerIcon className="w-8 h-8 text-yellow-400 mr-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-cinzel">
                {t('ledgerTitle')}
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mining Meter */}
            <div className="text-center">
                <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-3">{t('miningMeter')}</h3>
                <div className="h-20 w-full bg-gray-900 rounded-lg overflow-hidden">
                    <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
                        <path d="M 0 10 C 25 2, 25 18, 50 10 S 75 2, 100 10" stroke="#00FFFF" strokeWidth="1" fill="none">
                            <animate attributeName="d" values="M 0 10 C 25 2, 25 18, 50 10 S 75 2, 100 10;M 0 10 C 25 18, 25 2, 50 10 S 75 18, 100 10;M 0 10 C 25 2, 25 18, 50 10 S 75 2, 100 10" dur="4s" repeatCount="indefinite" />
                        </path>
                    </svg>
                </div>
            </div>
            {/* Reward Balance */}
            <div className="text-center border-y-2 md:border-y-0 md:border-x-2 border-gray-700 py-6 md:py-0 px-6">
                <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-2">{t('rewardBalance')}</h3>
                <p className="text-5xl font-mono font-bold text-yellow-400">
                    {balance.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">Ashadu Credits (AC)</p>
            </div>
            {/* Logic Tier */}
            <div className="text-center">
                <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-3">{t('logicTier')}</h3>
                 <div className="w-full bg-gray-800 rounded-full h-2.5">
                    <div className="bg-cyan-400 h-2.5 rounded-full" style={{ width: `${logicProgress}%` }}></div>
                </div>
                <p className="text-xs text-cyan-300 mt-2">{t('tier1')} - {logicProgress.toFixed(0)}%</p>
            </div>
        </div>
       </div>
    </section>
  );
};

export default Ledger;