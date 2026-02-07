
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { speak } from '../utils/speech';
import { MicrophoneIcon, TikTokIcon, XIcon, InstagramIcon, FacebookIcon, LoadingSpinner } from './icons';

interface PostToLinkModalProps {
    onClose: () => void;
}

const PostToLinkModal: React.FC<PostToLinkModalProps> = ({ onClose }) => {
    const { t, language } = useLanguage();
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [isPosted, setIsPosted] = useState(false);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn("Speech recognition not supported for Post to Link modal.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = language;
        
        let finalTranscript = '';

        recognition.onresult = (event: any) => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            setTranscript(finalTranscript + interimTranscript);
        };
        
        recognition.onend = () => {
            setIsListening(false);
        }

        recognitionRef.current = recognition;
        
        // Start listening immediately when modal opens
        recognition.start();
        setIsListening(true);

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [language]);

    const handleBroadcast = () => {
        if (!transcript.trim()) return;
        setIsPosting(true);
        speak(t('postToLinkPosting'), language);
        setTimeout(() => {
            setIsPosting(false);
            setIsPosted(true);
            speak(t('postToLinkSuccess'), language);
            setTimeout(onClose, 2000);
        }, 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[70]">
            <div className="bg-[#0A0A0A] border-2 border-cyan-500 p-8 rounded-lg text-center max-w-2xl w-full">
                <h2 className="text-3xl font-cinzel text-cyan-300 mb-4">{t('postToLinkTitle')}</h2>
                
                {isPosted ? (
                    <div>
                         <p className="text-green-400 text-lg">{t('postToLinkSuccess')}</p>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-400 mb-6">{isListening ? t('postToLinkDictate') : 'Review your message.'}</p>
                        <div className="min-h-[120px] bg-gray-900 border border-gray-700 rounded-md p-4 text-left text-white mb-6">
                            {transcript || <span className="text-gray-500">{t('postToLinkDictate')}</span>}
                        </div>
                        <div className="flex items-center justify-center space-x-6 mb-8 text-gray-600">
                            <TikTokIcon className="w-6 h-6" />
                            <XIcon className="w-6 h-6" />
                            <InstagramIcon className="w-6 h-6" />
                            <FacebookIcon className="w-6 h-6" />
                        </div>

                        <div className="space-y-3">
                            <button onClick={handleBroadcast} disabled={!transcript.trim() || isPosting} className="w-full bg-cyan-500 text-black font-bold py-3 rounded-md hover:bg-cyan-400 transition-colors disabled:bg-gray-600 flex items-center justify-center">
                                {isPosting ? <><LoadingSpinner /> {t('postToLinkPosting')}...</> : 'Broadcast Now'}
                            </button>
                            <button onClick={onClose} className="w-full bg-transparent border border-gray-600 text-gray-400 py-2 rounded-md hover:bg-gray-800 transition-colors">{t('cancelAction')}</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PostToLinkModal;