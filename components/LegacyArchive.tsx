
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BookOpenIcon } from './icons';

interface LegacyArchiveProps {
  onClose: () => void;
}

const LegacyArchive: React.FC<LegacyArchiveProps> = ({ onClose }) => {
  const { t } = useLanguage();

  const archiveEntries = [
    { dateKey: 'archiveEntryDate1', textKey: 'archiveEntryText1' },
    { dateKey: 'archiveEntryDate2', textKey: 'archiveEntryText2' },
    { dateKey: 'archiveEntryDate3', textKey: 'archiveEntryText3' },
    { dateKey: 'archiveEntryDate4', textKey: 'archiveEntryText4' },
    { dateKey: 'archiveEntryDate5', textKey: 'archiveEntryText5' },
  ];

  return (
    <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-[#0A0A0A] border-2 border-cyan-500/50 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">&times;</button>
        <div className="text-center mb-8">
            <BookOpenIcon className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
            <h2 className="text-3xl font-cinzel tracking-widest text-cyan-300">{t('legacyArchiveTitle')}</h2>
            <p className="text-sm text-gray-500">SOVEREIGN-ONLY KEY // BLOCKCHAIN PERSISTENCE</p>
        </div>

        <div className="font-mono text-gray-300 space-y-4">
          {archiveEntries.map((entry, index) => (
            <div key={index} className="flex items-start">
              <p className="text-cyan-400 mr-4 whitespace-nowrap">{`[${t(entry.dateKey as any)}]`}:</p>
              <p className="text-sm text-gray-400">{t(entry.textKey as any)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegacyArchive;