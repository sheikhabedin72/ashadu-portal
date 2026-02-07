
import React from 'react';

const DomainPillar: React.FC<{domain: string, status: string, desc: string, active?: boolean}> = ({ domain, status, desc, active = false }) => (
    <div className={`p-4 border ${active ? 'border-cyan-400' : 'border-gray-800'} rounded-lg bg-gray-900/80 text-center`}>
        <small className="text-xs uppercase text-gray-500 block">{domain}</small>
        <div className={`text-lg font-bold ${active ? 'text-cyan-400' : 'text-gray-300'}`}>{status}</div>
        <p className="text-xs text-gray-600">{desc}</p>
    </div>
);

const DomainEngine: React.FC = () => {
    return (
        <div className="bg-gray-900/50 border border-yellow-500/50 p-6 sm:p-8 rounded-lg">
            <h2 className="text-2xl sm:text-3xl tracking-wider text-yellow-400 font-cinzel mb-2">
                🌐 Global Domain Engine
            </h2>
            <p className="text-sm text-gray-500 mb-8">Traffic Monitoring & DNS Stealth Control</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <DomainPillar domain="ASHADU.ME" status="ACTIVE" desc="Primary Command" active />
                <DomainPillar domain="ASHADU.WORLD" status="STEALTH" desc="Ummah Outpost" />
                <DomainPillar domain="ASHADU.CLOUD" status="SYNCING" desc="Database Hull" />
                <DomainPillar domain="ASHADU.ONLINE" status="STANDBY" desc="Marketplace" />
                <DomainPillar domain="ASHADU.SPACE" status="ENCRYPTED" desc="Sovereign Vault" />
            </div>

            <div className="mt-8 bg-cyan-900/20 border border-cyan-500/50 rounded-lg p-5">
                <h4 className="m-0 text-cyan-300">Inbound Logic Flare Requests</h4>
                <div id="traffic-monitor" className="h-24 flex items-end gap-2 pt-5">
                    <div style={{ background: 'var(--cyan)', width: '10%', height: '20%', animation: 'grow 2s infinite' }}></div>
                    <div style={{ background: 'var(--cyan)', width: '10%', height: '50%', animation: 'grow 3s infinite 0.2s' }}></div>
                    <div style={{ background: 'var(--gold)', width: '10%', height: '80%', animation: 'grow 1.5s infinite 0.4s' }}></div>
                    <div style={{ background: 'var(--cyan)', width: '10%', height: '30%', animation: 'grow 2.5s infinite 0.6s' }}></div>
                    <div style={{ background: 'var(--cyan)', width: '10%', height: '40%', animation: 'grow 2.2s infinite 0.8s' }}></div>
                    <div style={{ background: 'var(--cyan)', width: '10%', height: '60%', animation: 'grow 1.8s infinite 1s' }}></div>
                    <div style={{ background: 'var(--cyan)', width: '10%', height: '25%', animation: 'grow 2.8s infinite 1.2s' }}></div>
                    <div style={{ background: 'var(--cyan)', width: '10%', height: '70%', animation: 'grow 1.9s infinite 1.4s' }}></div>
                </div>
            </div>
        </div>
    );
};

export default DomainEngine;
