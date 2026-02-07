
import React, { useState } from 'react';
import LedgerModule from './LedgerModule';
import VoiceInterface from './VoiceInterface';
import DomainEngine from './DomainEngine';
import FunderEngine from './FunderEngine';
import TaskifyEngine from './TaskifyEngine';

type ActiveModule = 'ledger' | 'domain' | 'funder' | 'taskify' | null;

interface CommandCentreProps {
    exitDirectorMode: () => void;
}

const CommandCentre: React.FC<CommandCentreProps> = ({ exitDirectorMode }) => {
    const [activeModule, setActiveModule] = useState<ActiveModule>(null);
    const [isVoiceOpen, setIsVoiceOpen] = useState(false);

    const Pillar = ({ title, description, onClick, disabled = false }: { title: string, description: string, onClick?: () => void, disabled?: boolean }) => (
        <div 
            onClick={!disabled ? onClick : undefined}
            className={`p-6 border rounded-lg transition-all duration-300 ${disabled ? 'border-gray-700/50 text-gray-600 bg-black/20 cursor-not-allowed' : 'border-yellow-500/30 bg-gray-900/30 hover:border-cyan-400 hover:bg-cyan-500/5 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer'}`}
        >
            <h3 className="text-xl font-cinzel mb-2 text-white">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
        </div>
    );

    const renderContent = () => {
        if (activeModule === 'ledger') {
            return <LedgerModule />;
        }
        if (activeModule === 'domain') {
            return <DomainEngine />;
        }
        if (activeModule === 'funder') {
            return <FunderEngine />;
        }
        if (activeModule === 'taskify') {
            return <TaskifyEngine />;
        }
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Pillar title="🌐 Domain Registry" description="Management of .me, .world, .cloud, .online, .space" onClick={() => setActiveModule('domain')} />
                <Pillar title="⚖️ IP & Share Ledger" description="100% Ownership Control & Copyright Shields" onClick={() => setActiveModule('ledger')} />
                <Pillar title="💰 Funder Engine" description="Sovereign Treasury & Fee Calibration" onClick={() => setActiveModule('funder')} />
                <Pillar title="📋 Taskify AI" description="AI-driven critical path & task management." onClick={() => setActiveModule('taskify')} />
                <Pillar title="🤖 Ashadu Core" description="Main AI Processing & Speech-to-Action" onClick={() => setIsVoiceOpen(true)} />
            </div>
        );
    };

    return (
        <div className="bg-[#050505] text-gray-200 min-h-screen antialiased pb-20">
            {isVoiceOpen && <VoiceInterface onClose={() => setIsVoiceOpen(false)} />}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 text-center">
                <div 
                    onClick={() => setIsVoiceOpen(true)}
                    className="w-20 h-20 bg-yellow-400 rounded-full mx-auto mb-4 shadow-lg shadow-yellow-400/20 cursor-pointer" 
                    style={{ animation: 'pulse-gold 4s infinite ease-in-out' }}>
                </div>
                <h1 className="text-3xl sm:text-4xl font-cinzel font-bold mb-2 text-white">ASHAADU COMMAND CENTRE</h1>
                <p className="text-gray-500 mb-12">Sovereign Infrastructure | Director: SHEIKH-MOHAMMED ABEDIN</p>

                {activeModule && (
                    <button onClick={() => setActiveModule(null)} className="mb-8 px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-800 transition-colors">
                        &larr; Back to Pillars
                    </button>
                )}

                <div className="max-w-4xl mx-auto">
                    {renderContent()}
                </div>

                <button onClick={exitDirectorMode} className="mt-16 px-6 py-2 border border-red-500/50 text-red-400 rounded-md hover:bg-red-500/10 transition-colors">
                    Exit Director Mode
                </button>
            </section>
        </div>
    );
};

export default CommandCentre;
