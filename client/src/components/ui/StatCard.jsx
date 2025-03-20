
import React from 'react';

const StatCard = ({ title, value, icon: Icon, trend, trendDirection, color = 'primary', onClick }) => {
  const bgColor = `bg-${color}/10`;
  const textColor = `text-${color}`;
  
  return (
    <div 
      className={`card p-6 transition-all duration-300 ${onClick ? 'cursor-pointer hover:translate-y-[-4px]' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span 
                className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                  trendDirection === 'up' 
                    ? 'bg-status-active/10 text-status-active' 
                    : 'bg-status-inactive/10 text-status-inactive'
                }`}
              >
                {trendDirection === 'up' ? '↑' : '↓'} {trend}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
            </div>
          )}
        </div>
        
        {Icon && (
          <div className={`rounded-full p-3 ${bgColor}`}>
            <Icon className={textColor} size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
