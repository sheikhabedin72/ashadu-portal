
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SovereignSealIcon } from './icons';

interface SovereignSealProps {
  onClose: () => void;
}

const SovereignSeal: React.FC<SovereignSealProps> = ({ onClose }) => {
  const { t } = useLanguage();

  const targets = [
    { name: t('targetOpenAI'), status: t('statusNotified'), reaction: t('reactionScraping'), color: 'text-cyan-400' },
    { name: t('targetMeta'), status: t('statusNotified'), reaction: t('reactionAcquisition'), color: 'text-cyan-400' },
    { name: t('targetX'), status: t('statusNotified'), reaction: t('reactionPivot'), color: 'text-cyan-400' },
    { name: t('targetAlphabet'), status: t('statusNotified'), reaction: t('reactionInquiry'), color: 'text-cyan-400' },
    { name: t('targetAbedin'), status: t('statusDominant'), reaction: t('reactionNA'), color: 'text-yellow-400' },
  ];

  return (
    <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-[#0A0A0A] border-2 border-[#D4AF37] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">&times;</button>
        <div className="text-center mb-8">
            <SovereignSealIcon className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
            <h2 className="text-3xl font-cinzel tracking-widest">{t('letterOfSovereigntyTitle')}</h2>
            <p className="text-sm text-gray-500">DATE: 1 MARCH 2026 // FROM: OFFICE OF THE DIRECTOR</p>
        </div>

        {/* Letter Content */}
        <div className="font-mono text-gray-300 space-y-6 border-b-2 border-gray-800 pb-6 mb-6">
            <p className="text-gray-500">{t('letterSubject')}</p>
            <div>
                <h3 className="font-bold text-yellow-400 mb-2">{t('declarationHeader')}</h3>
                <p className="text-sm">{t('declarationBody')}</p>
            </div>
            <div>
                <h3 className="font-bold text-yellow-400 mb-2">{t('logicSetHeader')}</h3>
                <p className="text-sm">{t('logicSetBody')}</p>
            </div>
            <div>
                <h3 className="font-bold text-yellow-400 mb-2">{t('nonInterferenceHeader')}</h3>
                <p className="text-sm">{t('nonInterferenceBody')}</p>
            </div>
        </div>

        {/* Target List */}
        <div>
            <h3 className="text-2xl font-cinzel text-center mb-4">{t('targetListTitle')}</h3>
            <p className="text-center text-sm text-cyan-400 mb-6 animate-pulse">{t('legalGuardProtocol')}</p>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="border-b border-gray-700 text-gray-400 uppercase">
                        <tr>
                            <th scope="col" className="py-3 px-4">{t('targetHeader')}</th>
                            <th scope="col" className="py-3 px-4">{t('statusHeader')}</th>
                            <th scope="col" className="py-3 px-4">{t('reactionHeader')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {targets.map((target, index) => (
                            <tr key={index} className="border-b border-gray-800">
                                <td className="py-3 px-4 font-bold text-white">{target.name}</td>
                                <td className={`py-3 px-4 font-bold ${target.color}`}>{target.status}</td>
                                <td className="py-3 px-4 text-gray-400">{target.reaction}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SovereignSeal;