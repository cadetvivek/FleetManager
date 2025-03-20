
import React from 'react';
import { MapPin, Phone, Mail, Star } from 'lucide-react';

const DriverStatusColor = {
  'available': 'bg-status-active text-white',
  'on-duty': 'bg-status-maintenance text-white',
  'off-duty': 'bg-gray-500 text-white',
  'on-leave': 'bg-status-inactive text-white',
};

const DriverCard = ({ driver, onClick }) => {
  return (
    <div 
      className="card overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-52 bg-gradient-to-b from-primary/20 to-primary/10 flex flex-col items-center justify-center p-4">
        <div className="absolute top-3 right-3">
          <span className={`${DriverStatusColor[driver.status]} px-2 py-1 rounded-full text-xs font-medium`}>
            {driver.status.replace('-', ' ')}
          </span>
        </div>
        
        <div className="relative">
          <img 
            src={driver.profileImage || 'https://randomuser.me/api/portraits/lego/1.jpg'}
            alt={driver.name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
          />
          <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
            <div className="flex items-center bg-status-active/10 text-status-active px-1.5 rounded text-xs font-bold">
              <Star size={12} className="mr-0.5" />
              {driver.rating}
            </div>
          </div>
        </div>
        
        <h3 className="mt-4 text-lg font-semibold text-center">{driver.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">License: {driver.licenseNumber}</p>
      </div>
      
      <div className="p-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Phone size={16} className="mr-2 text-gray-500" />
            <span>{driver.phone}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Mail size={16} className="mr-2 text-gray-500" />
            <span className="truncate">{driver.email}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <MapPin size={16} className="mr-2 text-gray-500" />
            <span className="truncate">{driver.address}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Driving Score</p>
            <div className="flex items-center">
              <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                <div 
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${driver.drivingScore}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{driver.drivingScore}/100</span>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">Trips Completed</p>
            <p className="font-medium">{driver.tripCount.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverCard;
