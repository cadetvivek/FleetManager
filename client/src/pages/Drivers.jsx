
import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { drivers, vehicles } from '../data/mockData';
import DriverCard from '../components/ui/DriverCard';
import { Search, Filter, Users } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const Drivers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDrivers, setFilteredDrivers] = useState(drivers);
  const [viewMode, setViewMode] = useState('grid');
  
  // Get the assigned vehicle information for each driver
  const getVehicleInfo = (vehicleId) => {
    if (!vehicleId) return 'None';
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.licensePlate})` : 'None';
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    
    if (value === '') {
      setFilteredDrivers(drivers);
    } else {
      const filtered = drivers.filter(driver => 
        driver.name.toLowerCase().includes(value) || 
        driver.email.toLowerCase().includes(value) ||
        driver.licenseNumber.toLowerCase().includes(value)
      );
      setFilteredDrivers(filtered);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Driver Management</h1>
            <p className="text-muted-foreground">Manage your fleet drivers and monitor their performance</p>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
            Add New Driver
          </button>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or license..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Filter size={16} />
                  <span>Filter</span>
                </div>
                <select className="border rounded-md p-2 bg-background">
                  <option value="all">All Statuses</option>
                  <option value="available">Available</option>
                  <option value="on-duty">On Duty</option>
                  <option value="off-duty">Off Duty</option>
                  <option value="on-leave">On Leave</option>
                </select>
              </div>
              <div className="flex bg-muted rounded-md p-1">
                <button 
                  className={`px-3 py-1.5 rounded ${viewMode === 'grid' ? 'bg-background shadow' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <div className="grid grid-cols-3 gap-0.5 h-4 w-4">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button 
                  className={`px-3 py-1.5 rounded ${viewMode === 'list' ? 'bg-background shadow' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <div className="flex flex-col gap-0.5 h-4 w-4">
                    <div className="bg-current h-0.5 rounded-sm"></div>
                    <div className="bg-current h-0.5 rounded-sm"></div>
                    <div className="bg-current h-0.5 rounded-sm"></div>
                    <div className="bg-current h-0.5 rounded-sm"></div>
                  </div>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-1">
              <Users size={16} />
              <span>All Drivers ({drivers.length})</span>
            </TabsTrigger>
            <TabsTrigger value="available">Available ({drivers.filter(d => d.status === 'available').length})</TabsTrigger>
            <TabsTrigger value="on-duty">On Duty ({drivers.filter(d => d.status === 'on-duty').length})</TabsTrigger>
            <TabsTrigger value="off-duty">Off Duty ({drivers.filter(d => d.status === 'off-duty').length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDrivers.map(driver => (
                  <DriverCard key={driver.id} driver={driver} onClick={() => alert(`View ${driver.name}'s profile`)} />
                ))}
              </div>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Driver</TableHead>
                      <TableHead>License</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Assigned Vehicle</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDrivers.map(driver => (
                      <TableRow key={driver.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <img 
                                src={driver.profileImage} 
                                alt={driver.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{driver.name}</div>
                              <div className="text-xs text-muted-foreground">ID: {driver.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{driver.licenseNumber}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium inline-block 
                            ${driver.status === 'available' ? 'bg-status-active/10 text-status-active' :
                              driver.status === 'on-duty' ? 'bg-status-maintenance/10 text-status-maintenance' :
                              driver.status === 'off-duty' ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300' :
                              'bg-status-inactive/10 text-status-inactive'}`}
                          >
                            {driver.status.replace('-', ' ')}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div>{driver.phone}</div>
                          <div className="text-xs text-muted-foreground">{driver.email}</div>
                        </TableCell>
                        <TableCell>{getVehicleInfo(driver.assignedVehicle)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="mr-2">{driver.rating}</div>
                            <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                              <div 
                                className="h-full bg-status-active rounded-full"
                                style={{ width: `${driver.rating * 20}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <button className="p-1 text-primary rounded hover:bg-primary/10">Edit</button>
                            <button className="p-1 text-status-inactive rounded hover:bg-status-inactive/10">Disable</button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="available">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drivers.filter(d => d.status === 'available').map(driver => (
                  <DriverCard key={driver.id} driver={driver} onClick={() => alert(`View ${driver.name}'s profile`)} />
                ))}
              </div>
            ) : (
              <Card>
                <Table>
                  {/* Same table structure as above but filtered */}
                  <TableHeader>
                    <TableRow>
                      <TableHead>Driver</TableHead>
                      <TableHead>License</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Assigned Vehicle</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {drivers.filter(d => d.status === 'available').map(driver => (
                      <TableRow key={driver.id}>
                        {/* Same row structure as above */}
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <img 
                                src={driver.profileImage} 
                                alt={driver.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{driver.name}</div>
                              <div className="text-xs text-muted-foreground">ID: {driver.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{driver.licenseNumber}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-medium inline-block bg-status-active/10 text-status-active">
                            Available
                          </span>
                        </TableCell>
                        <TableCell>
                          <div>{driver.phone}</div>
                          <div className="text-xs text-muted-foreground">{driver.email}</div>
                        </TableCell>
                        <TableCell>{getVehicleInfo(driver.assignedVehicle)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="mr-2">{driver.rating}</div>
                            <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                              <div 
                                className="h-full bg-status-active rounded-full"
                                style={{ width: `${driver.rating * 20}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <button className="p-1 text-primary rounded hover:bg-primary/10">Edit</button>
                            <button className="p-1 text-status-inactive rounded hover:bg-status-inactive/10">Disable</button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>
          
          {/* Repeat similar structure for other tabs */}
          <TabsContent value="on-duty">
            {/* Similar content structure as "available" */}
          </TabsContent>
          <TabsContent value="off-duty">
            {/* Similar content structure as "available" */}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Drivers;