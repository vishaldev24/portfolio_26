import React from 'react';

const AvailabilityBadge: React.FC = () => {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs md:text-sm font-medium border border-blue-200 dark:border-blue-800/50 mb-8 shadow-sm">
        <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        Open to Associate & Junior Product Designer roles in Hyderabad & Remote
    </div>
  );
};

export default AvailabilityBadge;
