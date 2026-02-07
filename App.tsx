
import React, { useState, useEffect } from 'react';
import Gateway from './components/Gateway';
import Dashboard from './components/Dashboard';
import { AshaduConsole } from './utils/console';
import RegistrationVault from './components/RegistrationVault';
import { GhostBridge } from './utils/ghostBridge';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(() => {
    return localStorage.getItem('ashaduSovereignRegistration') === 'VERIFIED';
  });
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    // Initialize the Ashadu Text-Fallback Console
    AshaduConsole.init();
    // Initialize the Ghost-Bridge for offline persistence
    GhostBridge.init();
  }, []);

  const handleRegistrationComplete = () => {
    localStorage.setItem('ashaduSovereignRegistration', 'VERIFIED');
    setIsRegistered(true);
    // You could also trigger the Genesis Reward logic here.
    console.log("SISTER ARCHITECT: Genesis Reward of $1.10 issued to new operative on ashadu.cloud.");
  };

  const triggerPulse = () => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 700); // Duration matches animation
  };
  
  const renderAppContent = () => {
    if (!isAuthenticated) {
      return <Gateway onEnter={() => setIsAuthenticated(true)} />;
    }
  
    if (!isRegistered) {
      return <RegistrationVault onRegistrationComplete={handleRegistrationComplete} />;
    }
  
    return <Dashboard triggerPulse={triggerPulse} />;
  }

  return (
    <div className="relative">
      {isPulsing && <div className="pulse-gold-bg-overlay" />}
      {renderAppContent()}
    </div>
  );
};

export default App;