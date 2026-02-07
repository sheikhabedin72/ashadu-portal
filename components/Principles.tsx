
import React, { useState, useMemo } from 'react';
import { TimeMiningIcon, InterfaithLogicIcon, MembershipIcon, PrivacyShieldIcon } from './icons';
import { useLanguage } from '../context/LanguageContext';

const Principles: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  
  const principles = useMemo(() => [
    {
      icon: <TimeMiningIcon />,
      title: t('principle1Title'),
      description: t('principle1Desc'),
    },
    {
      icon: <InterfaithLogicIcon />,
      title: t('principle2Title'),
      description: t('principle2Desc'),
    },
    {
      icon: <MembershipIcon />,
      title: t('principle3Title'),
      description: t('principle3Desc'),
    },
    {
      icon: <PrivacyShieldIcon />,
      title: t('principle4Title'),
      description: t('principle4Desc'),
    },
  ], [t]);

  const filteredPrinciples = useMemo(() => {
    return principles.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [principles, searchTerm]);

  return (
    <section className="mb-24 sm:mb-32">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-white font-cinzel mb-8">
        {t('opDirectives')}
      </h2>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative group">
          <input 
            type="text" 
            placeholder={t('searchDirectives')} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900/80 border border-gray-800 rounded-md p-3 text-white focus:ring-2 focus:ring-[#FFD700] focus:border-transparent focus:outline-none transition-all duration-300 text-center placeholder-gray-600 group-hover:border-gray-600"
          />
          <div className="absolute inset-0 rounded-md bg-[#FFD700]/5 pointer-events-none group-focus-within:bg-transparent transition-colors"></div>
        </div>
      </div>

      {filteredPrinciples.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredPrinciples.map((principle, index) => (
            <div 
              key={principle.title} 
              className="bg-gray-900/50 border border-gray-800 p-8 rounded-lg text-center transition-all duration-300 hover:border-[#FFD700] hover:shadow-2xl hover:shadow-yellow-500/10 flex flex-col items-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center items-center mb-6 text-[#FFD700]">
                {principle.icon}
              </div>
              <h3 className="text-xl font-bold text-white font-cinzel mb-3">{principle.title}</h3>
              <p className="text-gray-400">{principle.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 font-mono italic">{t('noResultsDirectives')}</p>
        </div>
      )}
    </section>
  );
};

export default Principles;
