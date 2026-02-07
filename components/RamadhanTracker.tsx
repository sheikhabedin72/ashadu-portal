
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

type FastingStatus = 'pending' | 'fastCompleted' | 'missedTravel' | 'missedIllness' | 'missedOther';

const RamadhanTracker: React.FC = () => {
  const { t } = useLanguage();
  const kaffaraRate = 5; // £5 per missed day
  const [fastingLog, setFastingLog] = useState<FastingStatus[]>(() => {
    try {
        const savedLog = localStorage.getItem('ashaduRamadhanLog');
        return savedLog ? JSON.parse(savedLog) : Array(30).fill('pending');
    } catch {
        return Array(30).fill('pending');
    }
  });

  useEffect(() => {
    localStorage.setItem('ashaduRamadhanLog', JSON.stringify(fastingLog));
  }, [fastingLog]);

  const handleStatusChange = (dayIndex: number, status: FastingStatus) => {
    const newLog = [...fastingLog];
    newLog[dayIndex] = status;
    setFastingLog(newLog);
  };
  
  const missedDaysForKaffara = fastingLog.filter(status => status === 'missedIllness' || status === 'missedOther').length;
  const totalKaffara = missedDaysForKaffara * kaffaraRate;

  const statuses: { value: FastingStatus, label: string }[] = [
    { value: 'fastCompleted', label: t('fastCompleted') },
    { value: 'missedTravel', label: t('missedTravel') },
    { value: 'missedIllness', label: t('missedIllness') },
    { value: 'missedOther', label: t('missedOther') },
  ];

  return (
    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white font-cinzel">{t('ramadhanTitle')}</h2>
        <p className="text-xs text-gray-500 mt-1">{t('ramadhanDesc')}</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
        {fastingLog.map((status, index) => (
          <div key={index} className="bg-gray-800 p-3 rounded-md">
            <label className="block text-sm font-semibold mb-1">{t('day')} {index + 1}</label>
            <select
                value={status}
                onChange={(e) => handleStatusChange(index, e.target.value as FastingStatus)}
                className="w-full bg-gray-700 text-white text-xs p-1 rounded-md border-0 focus:ring-2 focus:ring-cyan-500"
            >
                <option value="pending" disabled>Select Status</option>
                {statuses.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        ))}
      </div>

      <div className="bg-yellow-900/50 border border-yellow-500 p-4 rounded-lg text-center">
        <h3 className="text-lg font-bold text-yellow-300 font-cinzel">{t('kaffaraDue')}</h3>
        <p className="text-4xl font-mono font-bold text-yellow-400">£{totalKaffara.toFixed(2)}</p>
        <p className="text-xs text-yellow-600">{t('kaffaraDesc')}</p>
      </div>
    </div>
  );
};

export default RamadhanTracker;