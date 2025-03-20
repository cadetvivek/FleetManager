
import React from 'react';

const MapView = ({ vehicles, geofences, center, zoom = 10, height = 400 }) => {
  // In a real app, we would use react-leaflet or Google Maps
  // This is a simple placeholder
  return (
    <div 
      className="relative w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      style={{ height: `${height}px` }}
    >
      <div className="absolute inset-0 flex items-center justify-center flex-col p-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-12 h-12 text-gray-400 mb-4"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
        <p className="text-center text-gray-500 dark:text-gray-400">
          Map visualization would appear here with {vehicles?.length || 0} vehicles tracked in real-time.
        </p>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
          {geofences?.length || 0} geofence zones defined.
        </p>
        <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary/90 transition-colors">
          Enable Live Map
        </button>
      </div>
    </div>
  );
};

export default MapView;
