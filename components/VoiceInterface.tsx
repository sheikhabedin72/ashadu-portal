
import React, { useState, useEffect, useRef } from 'react';

interface VoiceInterfaceProps {
    onClose: () => void;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ onClose }) => {
    const [status, setStatus] = useState('LISTENING...');
    const [transcript, setTranscript] = useState('"Say Ashadu followed by a command..."');
    const recognitionRef = useRef<any>(null);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const speak = (msg: string) => {
        const synth = window.speechSynthesis;
        synth.cancel(); // Clear any previous speech
        const utterThis = new SpeechSynthesisUtterance(msg);
        utterThis.pitch = 0.8; // Deep, authoritative tone
        utterThis.rate = 0.9;
        synth.speak(utterThis);
    };

    const processCommand = (text: string) => {
        if (text.includes("ashadu")) {
            const command = text.split("ashadu")[1].trim();
            
            if (command.includes("post to social")) {
                speak("Synthesizing social media broadcast. What is the message?");
                setStatus('SYNTHESIZING...');
            } else if (command.includes("status report")) {
                speak("All systems are green. Launch date March 1 is secure.");
                setStatus('REPORTING...');
            } else if (command.includes("lockdown")) {
                speak("Initiating emergency protocol. Shuttering portals.");
                setStatus('INITIATING LOCKDOWN...');
            }
        }
    };

    useEffect(() => {
        if (!SpeechRecognition) {
            alert("This browser does not support the Ashadu Voice Link. Use Chrome or Brave.");
            onClose();
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
            let currentTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                currentTranscript += event.results[i][0].transcript;
            }
            setTranscript(`"${currentTranscript}"`);
            processCommand(currentTranscript.toLowerCase());
        };

        recognition.onerror = (err: any) => {
            console.error("AI Brain Error:", err);
            setStatus(`ERROR: ${err.error}`);
        };
        
        recognition.onend = () => {
             // If the service disconnects, restart it automatically if the component is still mounted.
             if (recognitionRef.current) {
                try {
                    recognition.start();
                } catch(e) {
                    console.error("Could not restart speech recognition", e);
                }
             }
        };

        recognitionRef.current = recognition;
        try {
            recognition.start();
        } catch(e) {
            console.error("Speech recognition could not be started", e);
            setStatus('ERROR: Could not start');
        }

        const timeout = setTimeout(() => {
            console.log("Voice interface auto-terminated for security.");
            onClose();
        }, 5 * 60 * 1000); // 5 minutes kill switch

        return () => {
            clearTimeout(timeout);
            if (recognitionRef.current) {
                recognitionRef.current.stop();
                recognitionRef.current = null;
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onClose, SpeechRecognition]);

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
            background: 'rgba(0,0,0,0.9)', zIndex: 10000, 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}>
            <div className="ashadu-orb" id="active-orb" style={{
                width: '200px', height: '200px', marginBottom: '50px',
                background: 'radial-gradient(circle, var(--gold), transparent)',
                borderRadius: '50%', boxShadow: '0 0 40px var(--gold)',
                animation: 'pulse 4s infinite ease-in-out'
            }}></div>
            <h1 id="voice-status" style={{ color: 'var(--cyan)', letterSpacing: '5px' }}>{status}</h1>
            <p id="transcript-preview" style={{ color: 'var(--gold)', opacity: 0.8, fontStyle: 'italic', fontSize: '1.5rem', minHeight: '2.5rem', maxWidth: '80%' }}>{transcript}</p>
            <button onClick={onClose} style={{
                border: '1px solid var(--gold)', color: 'var(--gold)', background: 'transparent', 
                padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', width: '200px', marginTop: '30px'
            }}>
                CLOSE INTERFACE
            </button>
        </div>
    );
};

export default VoiceInterface;