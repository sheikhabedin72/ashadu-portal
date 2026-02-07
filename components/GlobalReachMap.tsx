
import React from 'react';

interface GlobalReachMapProps {
    isFlaring: boolean;
}

const flareNodes = [
    { cx: "50%", cy: "50%", delay: "0s" }, // Central Point
    { cx: "20%", cy: "30%", delay: "0.2s" }, // North America
    { cx: "75%", cy: "35%", delay: "0.4s" }, // East Asia
    { cx: "55%", cy: "70%", delay: "0.3s" }, // South America
    { cx: "48%", cy: "30%", delay: "0.1s" }, // Europe
    { cx: "52%", cy: "60%", delay: "0.5s" }, // Africa
    { cx: "85%", cy: "75%", delay: "0.6s" }, // Oceania
    { cx: "65%", cy: "45%", delay: "0.2s" }, // Central Asia
];

const GlobalReachMap: React.FC<GlobalReachMapProps> = ({ isFlaring }) => {
    return (
        <div className="relative aspect-video bg-gray-900 rounded-md overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 1000 500">
                <path 
                    d="M998 250c0 137-223 248-500 248S-2 387-2 250 221 2 498 2s500 111 500 248z"
                    fill="#111827"
                    stroke="#D4AF37"
                    strokeOpacity="0.3"
                />
                {/* Simplified continents for visual effect */}
                <path d="M220 150 l-50 20 l-20 40 l30 50 l40 -10 l20 -50 Z" fill="#374151"/>
                <path d="M300 250 l-30 60 l40 30 l50 -20 l-10 -70 Z" fill="#374151"/>
                <path d="M450 120 l50 10 l30 50 l-20 60 l-70 -20 l-10 -80 Z" fill="#374151"/>
                <path d="M550 280 l-10 70 l60 20 l40 -40 l-20 -50 Z" fill="#374151"/>
                <path d="M700 150 l60 20 l20 60 l-40 40 l-50 -30 Z" fill="#374151"/>
                 <path d="M800 350 l30 20 l-10 40 l-40 -10 Z" fill="#374151"/>
                
                {isFlaring && flareNodes.map((node, index) => (
                    <g key={index}>
                        <circle
                            cx={node.cx}
                            cy={node.cy}
                            r="2"
                            fill="#00FFFF"
                        />
                         <circle
                            className="flare-dot"
                            cx={node.cx}
                            cy={node.cy}
                            fill="none"
                            stroke="#00FFFF"
                            strokeWidth="2"
                            style={{ animationDelay: node.delay }}
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default GlobalReachMap;