
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CrownIcon, RetinaIcon, VoiceIcon, HeartRateIcon, FlareIcon, RewardIcon, ScrollIcon, BookOpenIcon } from './icons';
import GlobalReachMap from './GlobalReachMap';
import SovereignSeal from './SovereignSeal';
import LegacyArchive from './LegacyArchive';

type PendingAction = 'flare' | 'reward' | 'killSwitch' | null;

interface SovereignCommandProps {
    vocalAction: PendingAction;
    clearVocalAction: () => void;
}

const SovereignCommand: React.FC<SovereignCommandProps> = ({ vocalAction, clearVocalAction }) => {
  const { t } = useLanguage();
  const [treasury, setTreasury] = useState(137421.57);
  const [killSwitch, setKillSwitch] = useState(false);
  const [membershipFee, setMembershipFee] = useState(1.00);
  const [showBioLock, setShowBioLock] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [isFlaring, setIsFlaring] = useState(false);
  const [rewardDeployed, setRewardDeployed] = useState(false);
  const [actionMessage, setActionMessage] = useState('');
  const [showSovereignSeal, setShowSovereignSeal] = useState(false);
  const [showLegacyArchive, setShowLegacyArchive] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      setTreasury(prev => prev + (Math.random() * 5));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
      if (vocalAction) {
          handleActionInitiation(vocalAction);
          clearVocalAction();
      }
  }, [vocalAction, clearVocalAction]);

  const handleActionInitiation = (action: PendingAction) => {
    if (action === 'reward' && rewardDeployed) return;
    setPendingAction(action);
    setShowBioLock(true);
  };

  const confirmBioLock = () => {
    if (pendingAction === 'flare') {
      setIsFlaring(true);
      setActionMessage(t('flareDeployedMessage'));
      setTimeout(() => {
          setIsFlaring(false);
          setActionMessage('');
      }, 10000);
    } else if (pendingAction === 'reward') {
      setRewardDeployed(true);
      setActionMessage(t('rewardDeployedMessage'));
       setTimeout(() => setActionMessage(''), 5000);
    } else if (pendingAction === 'killSwitch') {
      setKillSwitch(prev => !prev);
    }
    setShowBioLock(false);
    setPendingAction(null);
  }

  const BioLockModal = () => (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
        <div className="bg-[#0A0A0A] border-2 border-[#D4AF37] p-8 rounded-lg text-center max-w-sm">
            <h3 className="text-2xl font-cinzel mb-4">{t('bioLockTitle')}</h3>
            <p className="text-gray-400 mb-6">{t('bioLockDesc')}</p>
            <div className="flex justify-center space-x-8 mb-8 text-[#D4AF37]">
                <RetinaIcon className="w-12 h-12 animate-pulse" />
                <VoiceIcon className="w-12 h-12 animate-pulse" style={{animationDelay: '0.2s'}} />
                <HeartRateIcon className="w-12 h-12 animate-pulse" style={{animationDelay: '0.4s'}}/>
            </div>
            <div className="space-y-3">
                <button onClick={confirmBioLock} className="w-full bg-[#D4AF37] text-black font-bold py-3 rounded-md hover:bg-yellow-300 transition-colors">{t('confirmAction')}</button>
                <button onClick={() => {setShowBioLock(false); setPendingAction(null);}} className="w-full bg-transparent border border-gray-600 text-gray-400 py-2 rounded-md hover:bg-gray-800 transition-colors">{t('cancelAction')}</button>
            </div>
        </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black text-[#D4AF37] z-50 p-4 sm:p-8 font-mono overflow-y-auto">
      {showBioLock && <BioLockModal />}
      {showSovereignSeal && <SovereignSeal onClose={() => setShowSovereignSeal(false)} />}
      {showLegacyArchive && <LegacyArchive onClose={() => setShowLegacyArchive(false)} />}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
            <CrownIcon className="w-12 h-12 mx-auto mb-2" />
            <h1 className="text-4xl font-cinzel tracking-widest">{t('sovereignCommandTitle')}</h1>
            <p className="text-sm text-gray-500">DIRECTOR: SHEIKH-MOHAMMED ABEDIN</p>
        </div>
        
        {actionMessage && (
            <div className="mb-8 text-center bg-cyan-900/50 border border-cyan-500 text-cyan-300 py-3 px-4 rounded-lg animate-pulse">
                {actionMessage}
            </div>
        )}

        {/* Command Deck */}
        <div className="bg-[#0A0A0A] border border-[#D4AF37]/30 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold font-cinzel mb-6">{t('commandDeckTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logic Flare */}
                <button onClick={() => handleActionInitiation('flare')} className="text-left p-4 bg-cyan-900/30 hover:bg-cyan-900/50 border-2 border-cyan-500 rounded-lg transition-all group">
                    <div className="flex items-center mb-2">
                        <FlareIcon className="w-6 h-6 mr-3 text-cyan-400 group-hover:animate-ping" />
                        <h3 className="text-xl font-cinzel text-cyan-300">{t('logicFlare')}</h3>
                    </div>
                    <p className="text-sm text-gray-500">{t('logicFlareDesc')}</p>
                </button>
                {/* Inaugural Reward */}
                <button onClick={() => handleActionInitiation('reward')} disabled={rewardDeployed} className="text-left p-4 bg-yellow-900/30 hover:bg-yellow-900/50 border-2 border-yellow-500 rounded-lg transition-all group disabled:opacity-50 disabled:cursor-not-allowed">
                     <div className="flex items-center mb-2">
                        <RewardIcon className="w-6 h-6 mr-3 text-yellow-400 group-hover:animate-spin" />
                        <h3 className="text-xl font-cinzel text-yellow-300">{rewardDeployed ? t('rewardDepleted') : t('inauguralReward')}</h3>
                    </div>
                    <p className="text-sm text-gray-500">{t('inauguralRewardDesc')}</p>
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* Treasury */}
                <div className="bg-[#0A0A0A] border border-[#D4AF37]/30 p-6 rounded-lg">
                    <h2 className="text-lg font-bold font-cinzel mb-4">{t('tributePulse')}</h2>
                    <p className="text-4xl sm:text-5xl tracking-wider text-white">${treasury.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    <p className="text-sm text-gray-500">{t('masterTreasury')}</p>
                </div>
                {/* Economy Calibration */}
                <div className="bg-[#0A0A0A] border border-[#D4AF37]/30 p-6 rounded-lg">
                    <h2 className="text-lg font-bold font-cinzel mb-4">{t('economyCalibration')}</h2>
                    <label className="text-sm text-gray-500 block mb-2">{t('membershipFee')}: ${membershipFee.toFixed(2)}</label>
                    <input type="range" min="0.50" max="5.00" step="0.25" value={membershipFee} onChange={(e) => setMembershipFee(parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]" />
                </div>
                 {/* Sovereign Seal & Legacy Archive */}
                <div className="md:col-span-2 bg-[#0A0A0A] border border-[#D4AF37]/30 p-6 rounded-lg flex flex-col space-y-4">
                    <button onClick={() => setShowSovereignSeal(true)} className="w-full flex items-center text-left p-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg transition-colors">
                        <ScrollIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                        <div>
                            <span className="font-bold">{t('sovereignSealButton')}</span>
                            <p className="text-xs text-gray-400">View formal declaration & monitor targets.</p>
                        </div>
                    </button>
                     <button onClick={() => setShowLegacyArchive(true)} className="w-full flex items-center text-left p-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg transition-colors">
                        <BookOpenIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                        <div>
                            <span className="font-bold">{t('legacyArchiveButton')}</span>
                            <p className="text-xs text-gray-400">Access the Genesis Scrolls.</p>
                        </div>
                    </button>
                </div>
                {/* Kill Switch */}
                <div className="md:col-span-2 bg-[#0A0A0A] border-2 border-red-900/50 p-6 rounded-lg">
                    <h2 className="text-xl font-bold font-cinzel text-red-500">{t('globalKillSwitch')}</h2>
                    <p className="text-gray-500 mb-4 text-sm">{t('killSwitchDesc')}</p>
                    <div className="flex items-center space-x-4 cursor-pointer" onClick={() => handleActionInitiation('killSwitch')}>
                        <div className={`w-16 h-8 flex items-center rounded-full p-1 duration-300 ease-in-out ${killSwitch ? 'bg-red-600' : 'bg-gray-700'}`}>
                            <div className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${killSwitch ? 'translate-x-8' : ''}`}></div>
                        </div>
                        <span className={`text-xl font-bold ${killSwitch ? 'text-red-500' : 'text-gray-400'}`}>
                            {killSwitch ? t('killSwitchEngaged') : t('killSwitchDisengaged')}
                        </span>
                    </div>
                </div>
            </div>

            {/* Global Reach Map */}
            <div className="bg-[#0A0A0A] border border-[#D4AF37]/30 p-6 rounded-lg">
                <h2 className="text-lg font-bold font-cinzel mb-4">{t('globalReach')}</h2>
                <GlobalReachMap isFlaring={isFlaring} />
            </div>
        </div>
      </div>
      
      {/* Zayana's Feed */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#0A0A0A] border-t border-[#D4AF37]/30 h-10 overflow-hidden">
        <div className="absolute whitespace-nowrap scrolling-text-content flex items-center h-full">
            <p className="text-sm text-cyan-300">
                <span className="font-bold mr-2">{t('zayanaFeed')}:</span>
                Global truth sentiment stable... Entity [X] shows signs of logic-drift... New follower cluster detected in sector 7G... Treasury flux +0.8%... Privacy Shield integrity at 100%...
            </p>
        </div>
      </div>
    </div>
  );
};

export default SovereignCommand;