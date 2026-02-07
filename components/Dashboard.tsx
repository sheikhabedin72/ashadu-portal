

import React, { useState } from 'react';
import AskAshadu from './AskAshadu';
import RamadhanTracker from './RamadhanTracker';
import RamadhanCardGenerator from './RamadhanCardGenerator';
import CommunityHub from './CommunityHub';
import { useLanguage } from '../context/LanguageContext';

type ActiveTab = 'ramadhan' | 'ramadhanCards' | 'ask';

interface DashboardProps {
    triggerPulse: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ triggerPulse }) => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<ActiveTab>('ramadhan');

    const renderContent = () => {
        switch (activeTab) {
            case 'ramadhan': return <RamadhanTracker />;
            case 'ramadhanCards': return <RamadhanCardGenerator triggerPulse={triggerPulse} />;
            case 'ask': return <AskAshadu />;
            default: return <RamadhanTracker />;
        }
    };

    const TabButton = ({ tabName, label }: { tabName: ActiveTab; label: string }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-3 py-2 text-xs sm:px-4 sm:text-sm font-semibold rounded-md transition-colors ${
                activeTab === tabName
                    ? 'bg-cyan-500 text-black'
                    : 'text-gray-400 hover:bg-gray-800'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="bg-[#050505] text-gray-200 min-h-screen antialiased p-4 sm:p-6 lg:p-8">
            <header className="text-center mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-[#FFD700] font-cinzel">
                    {t('dashboardTitle')}
                </h1>
                <p className="text-xs text-gray-500 tracking-widest">{t('director')}: SHEIKH-MOHAMMED ABEDIN</p>
            </header>

            <nav className="mb-6 flex justify-center flex-wrap gap-2">
                <TabButton tabName="ramadhan" label={t('tabRamadhan')} />
                <TabButton tabName="ramadhanCards" label={t('tabRamadhanCards')} />
                <TabButton tabName="ask" label={t('tabAsk')} />
            </nav>

            <main className="max-w-4xl mx-auto">
                {renderContent()}
            </main>
        </div>
    );
};

export default Dashboard;