

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import Ledger from './Ledger';
import Principles from './Principles';
import UniversalTruthBridge from './UniversalTruthBridge';
import Membership from './Membership';
import Vault from './Vault';
import Footer from './Footer';
import { UserStatus, fetchUserStatus } from '../services/cloudService';
import CommandCentre from './CommandCentre';

const HomePage: React.FC = () => {
  const [isPulsing, setIsPulsing] = useState(false);
  const [balance, setBalance] = useState(1.0); // Initial balance
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);
  const [autoQuery, setAutoQuery] = useState('');
  const [directorMode, setDirectorMode] = useState(false);

  useEffect(() => {
    const getStatus = async () => {
        const status = await fetchUserStatus();
        setUserStatus(status);
        if (status.isVerified) {
            // Genesis reward + initial tribute
            setBalance(11.10); 
        }
    };
    getStatus();
  }, []);

  const triggerPulse = () => {
    setIsPulsing(true);
    // Increment balance on successful query to show activity
    setBalance(prev => prev + 0.01); 
    setTimeout(() => setIsPulsing(false), 700);
  };
  
  // FIX: Corrected the type annotation from `User-status` to `UserStatus`. This was a syntax error.
  const handleJoinSuccess = (newStatus: UserStatus) => {
    setUserStatus(newStatus);
    // Grant genesis reward upon joining
    setBalance(11.10); 
  };

  const clearAutoQuery = () => setAutoQuery('');

  if (directorMode) {
      return <CommandCentre exitDirectorMode={() => setDirectorMode(false)} />;
  }

  return (
    <div className="bg-[#050505] text-gray-200 min-h-screen antialiased pb-20">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
            <Hero onDirectorClick={() => setDirectorMode(true)} />
            <Ledger isPulsing={isPulsing} balance={balance} />
            <Principles />
            <UniversalTruthBridge 
              triggerLedgerPulse={triggerPulse} 
              autoQuery={autoQuery} 
              clearAutoQuery={clearAutoQuery} 
            />
            {/* Only show membership CTA if user is not verified */}
            {userStatus && !userStatus.isVerified && (
                <Membership onJoinSuccess={handleJoinSuccess} />
            )}
            <Vault />
        </main>
        <Footer userStatus={userStatus} />
    </div>
  );
};

export default HomePage;