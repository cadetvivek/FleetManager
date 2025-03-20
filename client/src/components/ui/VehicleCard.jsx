
import React from 'react';
import { Calendar, Fuel, MapPin } from 'lucide-react';
import StatusBadge from './StatusBadge';

const VehicleCard = ({ vehicle, onClick }) => {
  return (
    <div 
      className="card overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={vehicle.image || 'https://images.unsplash.com/photo-1573717664535-13d284bcca1b?ixlib=rb-4.0.3'}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <StatusBadge status={vehicle.status} />
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold">{vehicle.make} {vehicle.model}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{vehicle.licensePlate} • {vehicle.year}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <MapPin size={16} className="mr-2 text-gray-500" />
            <span className="truncate">Current Location</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Fuel size={16} className="mr-2 text-gray-500" />
            <span>{vehicle.fuelType} • {vehicle.fuelEfficiency} km/l</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Calendar size={16} className="mr-2 text-gray-500" />
            <span>Next Maintenance: {new Date(vehicle.nextMaintenance).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Mileage</p>
            <p className="font-medium">{vehicle.mileage.toLocaleString()} km</p>
          </div>
          {vehicle.assignedDriver && (
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400">Assigned To</p>
              <p className="font-medium text-primary">Driver #{vehicle.assignedDriver}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
