
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { commitAdvanceReward, UserStatus } from '../services/cloudService';

interface MembershipProps {
  onJoinSuccess: (newStatus: UserStatus) => void;
}

const Membership: React.FC<MembershipProps> = ({ onJoinSuccess }) => {
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleJoin = async () => {
    setIsProcessing(true);
    const result = await commitAdvanceReward();
    if (result.success) {
      onJoinSuccess(result.newStatus);
      setMessage(t('successMessage'));
      setTimeout(() => setMessage(''), 5000);
    }
    setIsProcessing(false);
  };

  return (
    <section className="text-center mb-16 sm:mb-24">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-cinzel mb-4">
          {t('membershipTitle')}
        </h2>
        <p className="text-gray-400 mb-8">
          {t('membershipDesc')}
        </p>
        <button
          onClick={handleJoin}
          disabled={isProcessing}
          className="px-12 py-4 border border-[#FFD700] text-[#FFD700] text-lg font-semibold rounded-md hover:bg-[#FFD700] hover:text-black transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(255,215,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? t('processingText') : t('membershipButtonText')}
        </button>
        {message && <p className="mt-6 text-green-400">{message}</p>}
      </div>
    </section>
  );
};

export default Membership;