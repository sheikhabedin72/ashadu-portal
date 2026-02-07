import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShareIcon } from './icons';

interface CardData {
    message: string;
    quote?: string;
    emoji: string;
    background: string;
    font: string;
    textColor: string;
    theme: 'fasting' | 'noble' | 'spiritual' | 'community';
}

interface RamadhanCardGeneratorProps {
    triggerPulse: () => void;
}

// Data for card generation
const themes = {
    fasting: {
        messages: ["Suhoor Mubarak!", "Happy Iftar!", "The Joy of Fasting"],
        emojis: ["🥘", "😋", "💧"],
        backgrounds: ["from-orange-400 to-red-500", "from-yellow-400 to-orange-500"],
    },
    noble: {
        messages: ["Give Sadaqah", "Help Your Neighbour", "An Act of Kindness"],
        emojis: ["🤝", "💖", "😊"],
        backgrounds: ["from-green-500 to-emerald-600", "from-teal-400 to-green-500"],
    },
    spiritual: {
        messages: ["Recite the Quran", "Taraweeh Prayers", "Find Your Peace"],
        emojis: ["📖", "🕌", "✨"],
        backgrounds: ["from-purple-500 to-indigo-600", "from-blue-700 to-cyan-400"],
    },
    community: {
        messages: ["Ramadhan Mubarak", "Ramadhan Kareem", "Blessings To Your Family"],
        emojis: ["🌙", "🏮", "👨‍👩‍👧‍👦"],
        backgrounds: ["from-rose-400 to-red-500", "from-sky-400 to-blue-600"],
    }
};

const fonts = ["font-fredoka", "font-quicksand"];
const textColors = ["text-white", "text-gray-800"];

const RamadhanCardGenerator: React.FC<RamadhanCardGeneratorProps> = ({ triggerPulse }) => {
    const { t } = useLanguage();
    const [activeTheme, setActiveTheme] = useState<'all' | CardData['theme']>(() => {
        // Read preferred theme from localStorage on initial load
        return (localStorage.getItem('ashaduRamadhanThemePref') as 'all' | CardData['theme']) || 'all';
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [key, setKey] = useState(0);

    const fullCardData = useMemo(() => {
        const generatedCards: CardData[] = [];
        let id = 0;
        while(generatedCards.length < 100) {
            for (const themeKey in themes) {
                const theme = themes[themeKey as CardData['theme']];
                const card: CardData = {
                    theme: themeKey as CardData['theme'],
                    message: theme.messages[id % theme.messages.length],
                    emoji: theme.emojis[id % theme.emojis.length],
                    background: theme.backgrounds[id % theme.backgrounds.length],
                    font: fonts[id % fonts.length],
                    textColor: textColors[id % textColors.length]
                };
                 if (card.theme === 'fasting') card.quote = t('hadithFasting');
                generatedCards.push(card);
                id++;
            }
        }
        return generatedCards;
    }, [t]);

    const filteredCards = useMemo(() => {
        if (activeTheme === 'all') return fullCardData;
        return fullCardData.filter(card => card.theme === activeTheme);
    }, [activeTheme, fullCardData]);

    const currentCard = filteredCards[currentIndex];

    const showNext = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % filteredCards.length);
        setKey(prev => prev + 1);
    }, [filteredCards.length]);

    const showPrev = useCallback(() => {
        setCurrentIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
        setKey(prev => prev + 1);
    }, [filteredCards.length]);
    
    // Reset index when theme changes
    useEffect(() => {
        setCurrentIndex(0);
        setKey(prev => prev + 1);
    }, [activeTheme]);

    const handleShare = useCallback(async () => {
        const shareText = `${currentCard.message} ${currentCard.emoji}`;
        
        if (navigator.share) {
            try { 
                await navigator.share({ title: t('ramadhanCardTitle'), text: shareText }); 
                triggerPulse(); // Zayana's Gold Sparkles!
                setFeedback(t('shareSuccess'));
                setTimeout(() => setFeedback(''), 2000);
            } 
            catch (error) { 
                // Handle the case where the user cancels the share action
                if (error instanceof Error && error.name === 'AbortError') {
                    console.debug('User cancelled sharing.');
                } else {
                    console.error('Error sharing:', error); 
                }
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareText);
                triggerPulse();
                setFeedback(t('shareSuccess'));
                setTimeout(() => setFeedback(''), 2000);
            } catch (err) {
                console.error('Clipboard error:', err);
            }
        }
    }, [currentCard, t, triggerPulse]);
    
    const handleThemeChange = (theme: 'all' | CardData['theme']) => {
        setActiveTheme(theme);
        // Store the user's preference in localStorage
        localStorage.setItem('ashaduRamadhanThemePref', theme);
    };

    const ThemeButton = ({ theme, label }: { theme: typeof activeTheme, label: string }) => (
        <button onClick={() => handleThemeChange(theme)} className={`px-3 py-1 text-xs rounded-full transition-colors ${activeTheme === theme ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
            {label}
        </button>
    );

    return (
        <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white font-cinzel mb-4 text-center">{t('ramadhanCardTitle')}</h2>
            
            <div className="flex justify-center flex-wrap gap-2 mb-4">
                <ThemeButton theme="all" label="All" />
                <ThemeButton theme="fasting" label={t('themeFastingJoy')} />
                <ThemeButton theme="noble" label={t('themeNobleAct')} />
                <ThemeButton theme="spiritual" label={t('themeSpiritualLink')} />
                <ThemeButton theme="community" label={t('themeCommunitySpirit')} />
            </div>

            <div className="relative mb-4">
                <div key={key} className={`card-fade-in aspect-video w-full rounded-lg flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br ${currentCard.background}`}>
                    <p className={`text-5xl md:text-6xl`}>{currentCard.emoji}</p>
                    <p className={`text-2xl md:text-3xl mt-2 ${currentCard.font} ${currentCard.textColor}`}>{currentCard.message}</p>
                    {currentCard.quote && <p className={`mt-4 text-xs italic ${currentCard.textColor}/80`}>{currentCard.quote}</p>}
                </div>
            </div>

            <div className="flex items-center justify-between mb-4">
                <button onClick={showPrev} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md font-semibold transition-colors">{t('prevCard')}</button>
                <p className="text-sm text-gray-400 font-mono">
                    {t('cardCounter', { current: (currentIndex + 1).toString(), total: filteredCards.length.toString() })}
                </p>
                <button onClick={showNext} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md font-semibold transition-colors">{t('nextCard')}</button>
            </div>
            
            <button onClick={handleShare} className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-300 transition-colors">
                <ShareIcon className="w-5 h-5 mr-2" />
                {t('shareCard')}
            </button>
            
            {feedback && <p className="text-center text-green-400 text-xs mt-2">{feedback}</p>}
        </div>
    );
};

export default RamadhanCardGenerator;