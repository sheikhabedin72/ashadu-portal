
export const speak = (text: string, lang = 'en-US') => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech to prevent overlap
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    
    // Find a suitable voice
    const voices = window.speechSynthesis.getVoices();
    // Prefer a specific voice if available, otherwise default
    let selectedVoice = voices.find(voice => voice.name === 'Google UK English Female');
    if (!selectedVoice) {
        selectedVoice = voices.find(voice => voice.lang.startsWith(lang.split('-')[0]) && voice.name.includes('Female'));
    }
    if (!selectedVoice) {
        selectedVoice = voices.find(voice => voice.lang.startsWith(lang.split('-')[0]));
    }
    
    utterance.voice = selectedVoice || null;

    window.speechSynthesis.speak(utterance);
  } else {
    console.warn('Speech synthesis not supported by this browser.');
  }
};

// Pre-load voices
if ('speechSynthesis' in window && window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}