
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PrivacyPulseIcon } from './icons';
import { UserStatus } from '../services/cloudService';

interface FooterProps {
  userStatus: UserStatus | null;
}

const Footer: React.FC<FooterProps> = ({ userStatus }) => {
  const { t } = useLanguage();
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#050505]/80 backdrop-blur-sm border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10 text-xs text-gray-400 uppercase tracking-widest">
          <div className="flex items-center space-x-2">
            <span>{t('membershipStatus')}:</span>
            <span className={`font-bold ${userStatus?.isVerified ? 'text-[#00FFFF]' : 'text-gray-600'}`}>
              {userStatus?.isVerified ? t('verifiedStatus') : 'UNVERIFIED'}
            </span>
          </div>
          
          {/* GHOST-BRIDGE SYNC INDICATOR */}
          <div id="sync-indicator" className="font-mono transition-colors duration-500 text-center"></div>

          <div className="flex items-center space-x-2">
            <span>{t('shieldStatus')}:</span>
            <PrivacyPulseIcon className="w-4 h-4 text-[#FFD700] pulse-gold" />
            <span className="font-bold text-[#FFD700]">{t('shieldActive')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{t('coreStatus')}:</span>
            <span className={`font-bold ${userStatus?.isAligned ? 'text-[#FFD700]' : 'text-gray-600'}`}>
              {userStatus?.isAligned ? t('alignedStatus') : 'UNALIGNED'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;