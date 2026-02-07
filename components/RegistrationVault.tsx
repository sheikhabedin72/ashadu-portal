
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GoogleIcon } from './icons';

interface RegistrationVaultProps {
    onRegistrationComplete: () => void;
}

const RegistrationVault: React.FC<RegistrationVaultProps> = ({ onRegistrationComplete }) => {
    const { t } = useLanguage();
    const [postcode, setPostcode] = useState('');

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log(`ASHADU_GPS: User locked at ${latitude}, ${longitude}`);
                    // Obfuscate the exact location in the UI for privacy, as per Zayana's note.
                    setPostcode(t('locationSecured'));
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    alert("Could not retrieve location. Please enter it manually.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("REGISTRATION: Data submitted. Initiating OTP flow to ashadu.cloud...");
        // Simulate OTP verification and completion
        setTimeout(() => {
            onRegistrationComplete();
        }, 1000);
    };
    
    const inputClasses = "w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-[#c5a059] focus:outline-none transition-colors";
    const goldBtnClasses = "w-full px-8 py-3 border border-[#c5a059] text-[#c5a059] font-semibold rounded-md hover:bg-[#c5a059] hover:text-black transition-all";

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
            <div id="registration-vault" className="bg-gray-900/50 border border-cyan-400 p-8 rounded-lg max-w-lg w-full">
                <h2 className="text-center text-3xl font-cinzel text-cyan-400 mb-8">{t('joinTheLink')}</h2>
                
                <form id="regForm" onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         <input type="text" placeholder={t('firstName')} required className={`${inputClasses} md:col-span-1`} />
                         <input type="text" placeholder={t('middleName')} className={`${inputClasses} md:col-span-1`} />
                         <input type="text" placeholder={t('lastName')} required className={`${inputClasses} md:col-span-1`} />
                    </div>
                    
                    <input type="email" placeholder={t('emailAddress')} required className={inputClasses} />
                    <input type="tel" placeholder={t('mobileNumber')} required className={inputClasses} />
                    
                    <div>
                        <label className="text-sm text-gray-400 ml-1">{t('dob')}</label>
                        <input type="date" required className={inputClasses} />
                    </div>

                    <div className="space-y-2 pt-4">
                        <button type="button" onClick={getLocation} className={goldBtnClasses}>
                            {t('autoFindLocation')}
                        </button>
                        <input 
                            type="text" 
                            id="postcode" 
                            value={postcode}
                            onChange={(e) => setPostcode(e.target.value)}
                            placeholder={t('manualLocationPlaceholder')} 
                            className={inputClasses} />
                    </div>
                    
                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-700"></div>
                        <span className="flex-shrink mx-4 text-gray-500">OR</span>
                        <div className="flex-grow border-t border-gray-700"></div>
                    </div>

                    <button type="button" className="w-full flex items-center justify-center py-3 border border-gray-600 text-gray-300 font-semibold rounded-md hover:bg-gray-800 transition-all">
                        <GoogleIcon className="w-5 h-5 mr-3" />
                        {t('loginWithGoogle')}
                    </button>
                    <button type="submit" className={`${goldBtnClasses} mt-4`}>
                        {t('verifyViaOTP')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationVault;