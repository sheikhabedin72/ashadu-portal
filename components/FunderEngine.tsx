
import React, { useState } from 'react';

const FunderEngine: React.FC = () => {
    const [fee, setFee] = useState(1.00);

    const btnGoldClasses = "w-full px-4 py-2 border border-yellow-500/50 text-yellow-400 rounded-md hover:bg-yellow-500/10 transition-colors text-sm font-semibold";
    
    return (
        <div className="bg-gray-900/50 border border-cyan-500/50 p-6 sm:p-8 rounded-lg">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl sm:text-3xl tracking-wider text-cyan-400 font-cinzel m-0">
                    💰 Ashadu Funder
                </h2>
                <div className="text-xs text-yellow-400 border border-yellow-400/50 py-1 px-3 rounded-md">
                    STABILITY FEE: 1% ACTIVE
                </div>
            </div>

            <div className="bg-black/20 p-5 rounded-lg mb-8">
                <h4 className="mt-0 text-sm uppercase text-gray-400 tracking-widest">Sovereign Membership Fee</h4>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <span className="text-4xl font-mono text-yellow-400">${fee.toFixed(2)}</span>
                    <input 
                        type="range" 
                        min="0.5" 
                        max="100" 
                        value={fee} 
                        step="0.5" 
                        className="w-full sm:w-52 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                        onChange={(e) => setFee(parseFloat(e.target.value))}
                    />
                    <small className="text-gray-500 text-xs">(Users can adjust their contribution)</small>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-gray-700 rounded-lg bg-cyan-900/20 text-left flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center font-bold">
                            <span>Genesis Reward</span>
                            <span className="text-cyan-400 font-mono">+$1.10</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Auto-minted for First 10,000.</p>
                    </div>
                    <button className={`${btnGoldClasses} mt-3 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10`}>CLAIM TO VAULT</button>
                </div>
                <div className="p-4 border border-gray-700 rounded-lg bg-black/20 text-left flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center font-bold">
                            <span>Noble Act #742</span>
                            <span className="text-yellow-400 font-mono">$10.00</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Community Support Fund: Interest-Free.</p>
                    </div>
                    <button className={`${btnGoldClasses} mt-3`}>CONTRIBUTE</button>
                </div>
            </div>

            <div className="mt-8 border-t border-yellow-500/20 pt-5">
                <h4 className="m-0 text-sm uppercase text-gray-400 tracking-widest">Sovereign Treasury Feed (1% Tribute)</h4>
                <div className="font-mono text-xs h-20 overflow-y-hidden mt-3 text-cyan-400 space-y-1">
                    <div>[01-03-2026] +$0.011 Stability Fee from Member_0001</div>
                    <div>[01-03-2026] +$0.011 Stability Fee from Member_0002</div>
                    <div className="opacity-50">[Awaiting Launch Pulse...]</div>
                </div>
            </div>
        </div>
    );
};

export default FunderEngine;
