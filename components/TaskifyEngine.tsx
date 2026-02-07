
import React, { useState } from 'react';

const TaskifyEngine: React.FC = () => {
    const [task3, setTask3] = useState(false);
    const [task4, setTask4] = useState(false);

    const TaskItem: React.FC<{ checked?: boolean; disabled?: boolean; label: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ checked, disabled, label, onChange }) => (
        <div className="mb-2.5 flex items-center gap-2.5">
            <input 
                type="checkbox" 
                checked={checked} 
                disabled={disabled}
                onChange={onChange}
                className="w-4 h-4 text-cyan-400 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 accent-cyan-400 cursor-pointer"
            />
            <span className={disabled ? "opacity-50 line-through" : ""}>{label}</span>
        </div>
    );

    return (
        <div className="bg-gray-900/50 border border-yellow-500/50 p-6 sm:p-8 rounded-lg text-left">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl sm:text-3xl tracking-wider text-white font-cinzel m-0">
                    📋 Taskify AI
                </h2>
                <div className="text-xs text-cyan-400 border border-cyan-400/50 py-1 px-3 rounded-md">
                    AI PRIORITY: EXPANSION MODE
                </div>
            </div>

            <div className="mb-8">
                <div className="border-l-4 border-cyan-400 pl-4 mb-5">
                    <strong className="text-cyan-400 text-xs uppercase tracking-widest">CRITICAL PATH: 23 DAYS TO FLARE</strong>
                    <div className="mt-2.5 text-gray-300">
                        <TaskItem checked disabled label="Sovereign Infrastructure Build-out" />
                        <TaskItem checked disabled label="Funder Engine & 1% Tribute Logic" />
                        <TaskItem checked={task3} onChange={() => setTask3(!task3)} label='Finalize "Genesis Proclamation" Multi-lingual Translations' />
                        <TaskItem checked={task4} onChange={() => setTask4(!task4)} label="Stress Test Global Mesh (Fasthosts Hull)" />
                    </div>
                </div>
            </div>

            <div className="bg-cyan-900/20 border border-dashed border-cyan-500/50 p-4 rounded-lg">
                <p className="text-xs m-0 mb-2.5 text-cyan-400">Awaiting Voice Command...</p>
                <div className="italic opacity-70 text-sm">"Ashadu, add a task to check the .world domain latency..."</div>
            </div>
        </div>
    );
};

export default TaskifyEngine;
