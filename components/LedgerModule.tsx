
import React from 'react';

const LedgerModule: React.FC = () => {
    return (
        <div className="bg-gray-900/50 border border-cyan-500/50 p-6 sm:p-8 rounded-lg text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 font-cinzel mb-2">
                ⚖️ Intellectual Property & Share Ledger
            </h2>
            <p className="text-sm text-gray-500 mb-8">Official Record of Entity: ASHADU</p>

            <div className="border-2 border-double border-yellow-400 p-5 bg-black/50 mb-8 rounded-md">
                <h3 className="text-xl m-0 tracking-widest font-cinzel text-center text-white">CERTIFICATE OF SOVEREIGNTY</h3>
                <p className="text-white text-lg my-4 text-center">
                    This certifies that <strong>SHEIKH-MOHAMMED ABEDIN</strong> holds <span className="text-cyan-400">100%</span> of all shares,
                    intellectual property, and decision-making authority for the Ashadu Ecosystem.
                </p>
                <p className="text-xs text-gray-500 text-center font-mono">
                    DIGITAL SIGNATURE: <span className="text-gray-400">0xSH-M-A-2026-SOVEREIGN</span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-4 border border-yellow-500/50 rounded-md bg-gray-900">
                    <small className="text-xs uppercase text-gray-400 tracking-wider">OWNER SHARES</small>
                    <div className="text-3xl font-bold text-white">100%</div>
                </div>
                <div className="p-4 border border-gray-700 rounded-md bg-gray-900">
                    <small className="text-xs uppercase text-gray-400 tracking-wider">EXTERNAL SHARES</small>
                    <div className="text-3xl font-bold text-gray-600">0%</div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-cinzel text-white mb-4">Sovereign Treasury Intake</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="border-b border-yellow-500/50">
                            <tr>
                                <th className="p-3">Source</th>
                                <th className="p-3">Fee (1%)</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800">
                                <td className="p-3">Membership Fees</td>
                                <td className="p-3 text-cyan-400 font-mono">$110.00</td>
                                <td className="p-3 text-gray-500 font-mono">PENDING MAR 1</td>
                            </tr>
                            <tr>
                                <td className="p-3">P2P Marketplace</td>
                                <td className="p-3 text-cyan-400 font-mono">$0.00</td>
                                <td className="p-3 text-gray-500 font-mono">WAITING...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LedgerModule;