import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MicrophoneIcon } from './icons';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export type VocalCommand = 
    | { type: 'OPEN_LEDGER' }
    | { type: 'STATUS_REPORT' }
    | { type: 'POST_TO_LINK' }
    | { type: 'ACTIVATE_LOGIC_FLARE' }
    | { type: 'ENGAGE_PRIVACY_SHIELD' }
    | { type: 'DEPLOY_TRAP', payload: number }
    | { type: 'RESOLVE_CONFLICT', payload: string }
    | { type: 'PROTOCOL_ZERO' }
    | { type: 'MIRROR_PROTOCOL' };

interface VocalCommanderProps {
    onCommand: (command: VocalCommand) => void;
    onWakeWord: () => void;
}

type CommanderStatus = 'idle' | 'listening' | 'heard';

const VocalCommander: React.FC<VocalCommanderProps> = ({ onCommand, onWakeWord }) => {
    const { t, language } = useLanguage();
    const [status, setStatus] = useState<CommanderStatus>('idle');
    const [isActivated, setIsActivated] = useState(false);
    const [permissionError, setPermissionError] = useState('');
    const recognitionRef = useRef<any>(null);
    const timeoutRef = useRef<number | null>(null);

    const handleActivate = async () => {
        setPermissionError('');

        if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
            setPermissionError(t('httpsRequired'));
            return;
        }

        if (!SpeechRecognition) {
            setPermissionError(t('speechNotSupported'));
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop());
            setIsActivated(true);
        } catch (err) {
            console.error("Error requesting microphone permission:", err);
            if (err instanceof Error && err.name === 'NotAllowedError') {
                setPermissionError(t('micAccessDenied'));
            } else {
                setPermissionError(t('micGenericError'));
            }
        }
    };

    useEffect(() => {
        if (!isActivated || !SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = language;

        recognition.onresult = (event: any) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
            console.log("Heard:", transcript);

            if (transcript.startsWith('ashadu')) {
                setStatus('heard');
                onWakeWord();
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = window.setTimeout(() => setStatus('listening'), 2000);
                
                const commandStr = transcript.substring(7).trim();
                
                if (commandStr.startsWith('open the ledger')) {
                    onCommand({ type: 'OPEN_LEDGER' });
                } else if (commandStr.startsWith('status report')) {
                    onCommand({ type: 'STATUS_REPORT' });
                } else if (commandStr.startsWith('post to the link')) {
                    onCommand({ type: 'POST_TO_LINK' });
                } else if (commandStr.startsWith('activate logic flare')) {
                    onCommand({ type: 'ACTIVATE_LOGIC_FLARE' });
                } else if (commandStr.startsWith('engage privacy shield')) {
                    onCommand({ type: 'ENGAGE_PRIVACY_SHIELD' });
                } else if (commandStr.startsWith('deploy trap')) {
                    const match = commandStr.match(/deploy trap (\d+)/);
                    if (match && match[1]) {
                        onCommand({ type: 'DEPLOY_TRAP', payload: parseInt(match[1], 10) });
                    }
                } else if (commandStr.startsWith('resolve')) {
                    const payload = commandStr.replace('resolve', '').trim().replace('via the third path','').trim();
                    if(payload) {
                       onCommand({ type: 'RESOLVE_CONFLICT', payload });
                    }
                } else if (commandStr.startsWith('protocol zero')) {
                    onCommand({ type: 'PROTOCOL_ZERO' });
                } else if (commandStr.startsWith('mirror protocol')) {
                    onCommand({ type: 'MIRROR_PROTOCOL' });
                }
            }
        };
        
        recognition.onstart = () => setStatus('listening');
        recognition.onend = () => {
             setStatus('idle');
             if (isActivated) {
                setTimeout(() => {
                    if (isActivated) recognition.start();
                }, 500);
             }
        };
        recognition.onerror = (event: any) => {
             console.error('Speech recognition error:', event.error);
             if (event.error === 'not-allowed') {
                 setPermissionError(t('micAccessDenied'));
                 setIsActivated(false);
             } else {
                 setPermissionError(t('speechError', { error: event.error }));
             }
             setStatus('idle');
        };

        recognition.start();
        recognitionRef.current = recognition;

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
             if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isActivated, language, onCommand, onWakeWord, t]);

    const getStatusStyles = () => {
        switch (status) {
            case 'listening': 
                return { 
                    orb: 'bg-cyan-400', 
                    animation: 'pulse-orb 2s infinite ease-in-out' 
                };
            case 'heard': 
                return { 
                    orb: 'bg-yellow-400', 
                    animation: 'heard-flash 0.6s forwards' 
                };
            default: 
                return { 
                    orb: 'bg-gray-700/50',
                    animation: 'none'
                };
        }
    };
    
    const { orb, animation } = getStatusStyles();

    return (
        <div className="fixed bottom-12 right-4 z-50 flex items-center p-3 rounded-full bg-black/50 backdrop-blur-md border border-gray-800 shadow-lg">
            {!isActivated ? (
                <div className="flex items-center space-x-2 px-2">
                    {permissionError ? (
                        <p className="text-xs text-red-400 max-w-xs text-right">{permissionError}</p>
                    ) : (
                        <button onClick={handleActivate} className="flex items-center text-cyan-300 hover:text-white transition-colors">
                            <MicrophoneIcon className="w-5 h-5 mr-2" />
                            <span className="text-sm font-semibold uppercase tracking-wider">{t('activateVoice')}</span>
                        </button>
                    )}
                </div>
            ) : (
                 <div className="flex items-center">
                    <div 
                        className={`w-5 h-5 rounded-full transition-all duration-300 ${orb}`}
                        style={{ animation }}
                    ></div>
                    <span className="ml-3 text-[10px] font-mono text-gray-500 uppercase tracking-tighter">
                        {status === 'heard' ? 'Wake Word: OK' : 'Ready for Ashadu...'}
                    </span>
                 </div>
            )}
        </div>
    );
};

export default VocalCommander;