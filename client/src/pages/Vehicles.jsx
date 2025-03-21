
import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import VehicleCard from '../components/ui/VehicleCard';
import MapView from '../components/ui/MapView';
import StatusBadge from '../components/ui/StatusBadge';
import { Plus, Search, Grid, List, Filter, Map as MapIcon, X, Upload, Download, Fuel, Calendar, Car } from 'lucide-react';
import { vehicles, VEHICLE_STATUSES } from '../data/mockData';

const VehicleDetail = ({ vehicle, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
        
        <div className="inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="px-4 pt-5 pb-4 sm:p-6">
            <div className="flex items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-semibold">
                    {vehicle.make} {vehicle.model}
                  </h3>
                  <StatusBadge status={vehicle.status} size="large" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img 
                      src={vehicle.image || 'https://images.unsplash.com/photo-1573717664535-13d284bcca1b?ixlib=rb-4.0.3'}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">License Plate</p>
                        <p className="font-medium">{vehicle.licensePlate}</p>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Year</p>
                        <p className="font-medium">{vehicle.year}</p>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Type</p>
                        <p className="font-medium">{vehicle.type}</p>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Mileage</p>
                        <p className="font-medium">{vehicle.mileage.toLocaleString()} km</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Location</h4>
                      <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <MapIcon className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">Map View</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">Current coordinates: {vehicle.location.lat.toFixed(4)}, {vehicle.location.lng.toFixed(4)}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center mb-3">
                        <Fuel className="text-primary mr-2" size={18} />
                        <h4 className="text-sm font-medium">Fuel Information</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Fuel Type</p>
                          <p className="font-medium">{vehicle.fuelType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Efficiency</p>
                          <p className="font-medium">{vehicle.fuelEfficiency} km/l</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center mb-3">
                        <Calendar className="text-primary mr-2" size={18} />
                        <h4 className="text-sm font-medium">Maintenance</h4>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Last Maintenance</p>
                          <p className="font-medium">{new Date(vehicle.lastMaintenance).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Next Maintenance</p>
                          <p className="font-medium">{new Date(vehicle.nextMaintenance).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center mb-3">
                        <Car className="text-primary mr-2" size={18} />
                        <h4 className="text-sm font-medium">Assignment</h4>
                      </div>
                      {vehicle.assignedDriver ? (
                        <div className="flex items-center">
                          <img 
                            src="https://randomuser.me/api/portraits/men/32.jpg" 
                            alt="Driver" 
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <p className="font-medium">Driver #{vehicle.assignedDriver}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Assigned since Oct 15, 2023</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">No driver assigned</p>
                      )}
                    </div>
                    
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Documents</h4>
                      <div className="flex space-x-2">
                        <button className="flex items-center px-3 py-1.5 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 text-sm">
                          <Upload size={14} className="mr-1" /> Upload
                        </button>
                        <button className="flex items-center px-3 py-1.5 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 text-sm">
                          <Download size={14} className="mr-1" /> Download All
                        </button>
                      </div>
                      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Registration.pdf, Insurance.pdf
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
            >
              Edit Vehicle
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Vehicles = () => {
  const [view, setView] = useState('grid'); // 'grid', 'list', or 'map'
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  
  const handleVehicleClick = (vehicle) => {
    setSelectedVehicle(vehicle);
  };
  
  const closeVehicleDetail = () => {
    setSelectedVehicle(null);
  };
  
  const filteredVehicles = vehicles.filter(vehicle => {
    // Apply status filter
    if (filter !== 'all' && vehicle.status !== filter) {
      return false;
    }
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      return (
        vehicle.make.toLowerCase().includes(searchLower) ||
        vehicle.model.toLowerCase().includes(searchLower) ||
        vehicle.licensePlate.toLowerCase().includes(searchLower) ||
        vehicle.type.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Vehicles</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your fleet vehicles</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            <Plus size={18} className="mr-2" /> Add Vehicle
          </button>
        </div>
        
        {/* Filters and view switcher */}
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="search"
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-64"
                placeholder="Search vehicles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select 
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white dark:bg-gray-800 w-full sm:w-auto"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Vehicles</option>
                <option value={VEHICLE_STATUSES.ACTIVE}>Active</option>
                <option value={VEHICLE_STATUSES.MAINTENANCE}>In Maintenance</option>
                <option value={VEHICLE_STATUSES.INACTIVE}>Inactive</option>
              </select>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg ${
                view === 'grid' 
                  ? 'bg-primary text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <Grid size={20} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-2 rounded-lg ${
                view === 'list' 
                  ? 'bg-primary text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <List size={20} />
            </button>
            <button 
              onClick={() => setView('map')}
              className={`p-2 rounded-lg ${
                view === 'map' 
                  ? 'bg-primary text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <MapIcon size={20} />
            </button>
          </div>
        </div>
        
        {/* Vehicle count */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredVehicles.length} of {vehicles.length} vehicles
        </div>
        
        {/* Vehicles grid/list view */}
        {view === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard 
                key={vehicle.id} 
                vehicle={vehicle} 
                onClick={() => handleVehicleClick(vehicle)}
              />
            ))}
          </div>
        )}
        
        {view === 'list' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    License Plate
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Mileage
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Next Maintenance
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Assigned Driver
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {filteredVehicles.map((vehicle) => (
                  <tr 
                    key={vehicle.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => handleVehicleClick(vehicle)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 mr-3">
                          <img 
                            className="h-10 w-10 rounded-md object-cover" 
                            src={vehicle.image} 
                            alt=""
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{vehicle.make} {vehicle.model}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{vehicle.year}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{vehicle.licensePlate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={vehicle.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{vehicle.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{vehicle.mileage.toLocaleString()} km</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(vehicle.nextMaintenance).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {vehicle.assignedDriver ? (
                        <span className="text-primary">Driver #{vehicle.assignedDriver}</span>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">Not Assigned</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {view === 'map' && (
          <div className="card p-6">
            <MapView 
              vehicles={filteredVehicles}
              height={600}
            />
          </div>
        )}
        
        {selectedVehicle && (
          <VehicleDetail vehicle={selectedVehicle} onClose={closeVehicleDetail} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Vehicles;


