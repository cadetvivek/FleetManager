
import React from 'react';
import { Card, CardContent } from '../../components/ui/card';

const MaintenanceRecordDetail = ({ record, onClose }) => {
  const getVehicleDetails = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle || { make: 'Unknown', model: 'Unknown', licensePlate: 'Unknown' };
  };
  
  const vehicle = getVehicleDetails(record.vehicleId);
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-2xl w-full mx-4">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold">Maintenance Record</h2>
              <p className="text-muted-foreground">
                {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
              </p>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <span className="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg mb-4">Maintenance Details</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Type</p>
                        <p className="font-medium">{record.type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <div>
                          <StatusBadge 
                            status={
                              record.status === 'Completed' ? 'active' : 
                              record.status === 'Scheduled' ? 'maintenance' : 'inactive'
                            } 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="font-medium">{new Date(record.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Cost</p>
                        <p className="font-medium">${record.cost.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-muted-foreground">Technician</p>
                      <p className="font-medium">{record.technician}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-muted-foreground">Notes</p>
                      <p className="text-sm mt-1">{record.notes}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-4">
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg mb-4">Parts Used</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                      <span>Oil Filter</span>
                      <span className="text-sm">$24.99</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                      <span>Engine Oil (5L)</span>
                      <span className="text-sm">$45.50</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                      <span>Air Filter</span>
                      <span className="text-sm">$18.75</span>
                    </div>
                    <div className="flex justify-between items-center font-medium mt-2">
                      <span>Total Parts Cost</span>
                      <span>$89.24</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg mb-4">Vehicle Information</h3>
                  <div className="mb-4">
                    <img 
                      src={vehicle.image || 'https://images.unsplash.com/photo-1573717664535-13d284bcca1b?ixlib=rb-4.0.3'} 
                      alt={`${vehicle.make} ${vehicle.model}`} 
                      className="w-full h-40 object-cover rounded-md"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Make & Model</p>
                        <p className="font-medium">{vehicle.make} {vehicle.model}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Year</p>
                        <p className="font-medium">{vehicle.year}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground">License Plate</p>
                        <p className="font-medium">{vehicle.licensePlate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Mileage</p>
                        <p className="font-medium">{vehicle.mileage.toLocaleString()} km</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-muted-foreground">Maintenance History</p>
                      <div className="text-sm mt-1">
                        <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded-full text-xs mr-2">
                          {maintenanceRecords.filter(r => r.vehicleId === vehicle.id).length} records
                        </span>
                        <span className="text-muted-foreground">
                          Last maintenance: {new Date(vehicle.lastMaintenance).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-4">
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg mb-4">Maintenance Timeline</h3>
                  <div className="relative pl-6 border-l border-gray-300 dark:border-gray-700 space-y-4">
                    <div className="relative">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -left-7"></div>
                      <div>
                        <p className="text-xs text-muted-foreground">Nov 15, 2023</p>
                        <p className="text-sm font-medium">Maintenance scheduled</p>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute w-3 h-3 bg-primary/70 rounded-full -left-7"></div>
                      <div>
                        <p className="text-xs text-muted-foreground">Nov 20, 2023</p>
                        <p className="text-sm font-medium">Parts ordered</p>
                      </div>
                    </div>
                    {record.status === 'Completed' && (
                      <>
                        <div className="relative">
                          <div className="absolute w-3 h-3 bg-primary/70 rounded-full -left-7"></div>
                          <div>
                            <p className="text-xs text-muted-foreground">Nov 28, 2023</p>
                            <p className="text-sm font-medium">Work started</p>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute w-3 h-3 bg-status-active rounded-full -left-7"></div>
                          <div>
                            <p className="text-xs text-muted-foreground">Nov 28, 2023</p>
                            <p className="text-sm font-medium">Maintenance completed</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
              {record.status === 'Completed' ? 'Download Report' : 'Update Status'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceRecordDetail;
