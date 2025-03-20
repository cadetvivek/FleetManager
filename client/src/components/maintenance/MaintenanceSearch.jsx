
import React from 'react';
import { Search, Filter, Car, Tool } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';

const MaintenanceSearch = ({ 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus,
  filterVehicle,
  setFilterVehicle,
  filterType,
  setFilterType,
  vehicles
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search by vehicle, type, or technician..." 
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 text-sm text-muted-foreground whitespace-nowrap">
              <Filter size={16} />
              <span>Status:</span>
            </div>
            <select 
              className="border rounded-md p-2 bg-background flex-1 min-w-[120px]"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-between mt-4">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 text-sm text-muted-foreground whitespace-nowrap">
              <Car size={16} />
              <span>Vehicle:</span>
            </div>
            <select 
              className="border rounded-md p-2 bg-background flex-1 min-w-[120px]"
              value={filterVehicle}
              onChange={(e) => setFilterVehicle(e.target.value)}
            >
              <option value="all">All Vehicles</option>
              {vehicles.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 text-sm text-muted-foreground whitespace-nowrap">
              <Tool size={16} />
              <span>Type:</span>
            </div>
            <select 
              className="border rounded-md p-2 bg-background flex-1 min-w-[120px]"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              {Array.from(new Set(maintenanceRecords.map(record => record.type))).map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">
              <Download size={16} />
              <span>Export</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">
              <Upload size={16} />
              <span>Import</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">
              <Settings size={16} />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaintenanceSearch;
