import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { trips, vehicles, drivers } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Search, Filter, Clock, Calendar, Route, Fuel, Map, MapPin, Plus } from 'lucide-react';
import Chart from '../components/ui/Chart';
import MapView from '../components/ui/MapView';
import StatusBadge from '../components/ui/StatusBadge';

const Trips = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDriver, setFilterDriver] = useState('all');
  const [filterVehicle, setFilterVehicle] = useState('all');
  const [dateRange, setDateRange] = useState('month');
  
  // Get vehicle details by ID
  const getVehicleDetails = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle || { make: 'Unknown', model: 'Unknown', licensePlate: 'Unknown' };
  };
  
  // Get driver details by ID
  const getDriverDetails = (driverId) => {
    const driver = drivers.find(d => d.id === driverId);
    return driver || { name: 'Unknown' };
  };
  
  // Filter trips based on search and filters
  const filteredTrips = trips.filter(trip => {
    // Status filter
    if (filterStatus !== 'all' && trip.status !== filterStatus) {
      return false;
    }
    
    // Driver filter
    if (filterDriver !== 'all' && trip.driverId !== parseInt(filterDriver)) {
      return false;
    }
    
    // Vehicle filter
    if (filterVehicle !== 'all' && trip.vehicleId !== parseInt(filterVehicle)) {
      return false;
    }
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        trip.startLocation.toLowerCase().includes(searchLower) ||
        trip.endLocation.toLowerCase().includes(searchLower) ||
        trip.purpose.toLowerCase().includes(searchLower) ||
        getDriverDetails(trip.driverId).name.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  // Calculate trip statistics
  const stats = {
    totalTrips: trips.length,
    completedTrips: trips.filter(t => t.status === 'Completed').length,
    inProgressTrips: trips.filter(t => t.status === 'In Progress').length,
    scheduledTrips: trips.filter(t => t.status === 'Scheduled').length,
    totalDistance: trips.reduce((sum, trip) => sum + trip.distance, 0),
    totalFuelConsumed: trips.reduce((sum, trip) => sum + trip.fuelConsumed, 0)
  };
  
  // Trip distance by purpose data for chart
  const tripDistanceByPurposeData = {
    labels: ['Delivery', 'Long Haul', 'Client Visit', 'Equipment Transport', 'Pickup'],
    datasets: [
      {
        name: 'Distance (km)',
        data: [450, 980, 370, 520, 280]
      }
    ]
  };
  
  // Trip efficiency data
  const tripEfficiencyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        name: 'Trip Time (hours)',
        data: [5.2, 4.8, 6.5, 5.7, 6.2, 4.1, 3.5]
      },
      {
        name: 'Distance (km)',
        data: [320, 290, 410, 350, 380, 250, 210]
      }
    ]
  };
  
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Trip Management</h1>
            <p className="text-muted-foreground">Log and monitor all trips across your fleet</p>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Plus size={16} />
            <span>Log New Trip</span>
          </button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Trips</p>
                <p className="text-2xl font-bold">{stats.totalTrips}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <Clock size={20} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Active Trips</p>
                <p className="text-2xl font-bold">{stats.inProgressTrips}</p>
              </div>
              <div className="p-3 bg-status-maintenance/10 rounded-full text-status-maintenance">
                <Route size={20} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Distance</p>
                <p className="text-2xl font-bold">{stats.totalDistance.toLocaleString()} km</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/20 text-green-600 dark:text-green-400">
                <Map size={20} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Fuel Consumed</p>
                <p className="text-2xl font-bold">{stats.totalFuelConsumed.toLocaleString()} L</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
                <Fuel size={20} />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Search trips by location, driver, or purpose..." 
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground hidden md:inline">Status:</span>
                  <select 
                    className="border rounded-md p-2 bg-background"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-muted-foreground" />
                  <select 
                    className="border rounded-md p-2 bg-background"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">Last 3 Months</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-3">
              <div className="flex items-center gap-2">
                <select 
                  className="border rounded-md p-2 bg-background"
                  value={filterDriver}
                  onChange={(e) => setFilterDriver(e.target.value)}
                >
                  <option value="all">All Drivers</option>
                  {drivers.map(driver => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <select 
                  className="border rounded-md p-2 bg-background"
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
            </div>
          </CardContent>
        </Card>
        
        {/* Trips Tabs */}
        <Tabs defaultValue="list" className="mb-6">
          <TabsList>
            <TabsTrigger value="list" className="flex items-center gap-1">
              <Clock size={16} />
              <span>Trip List</span>
            </TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="analytics">Trip Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trip Details</TableHead>
                    <TableHead>Driver & Vehicle</TableHead>
                    <TableHead>Time & Distance</TableHead>
                    <TableHead>Fuel</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTrips.map(trip => {
                    const vehicle = getVehicleDetails(trip.vehicleId);
                    const driver = getDriverDetails(trip.driverId);
                    
                    return (
                      <TableRow key={trip.id}>
                        <TableCell>
                          <div className="font-medium">{trip.startLocation}</div>
                          <div className="text-xs text-muted-foreground flex items-center">
                            <MapPin size={10} className="mr-1" />
                            {trip.endLocation}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>{driver.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>{new Date(trip.startTime).toLocaleDateString()}</div>
                          <div className="text-xs text-muted-foreground flex items-center">
                            <Route size={10} className="mr-1" />
                            {trip.distance} km
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>{trip.fuelConsumed.toFixed(1)} L</div>
                          <div className="text-xs text-muted-foreground">
                            {(trip.distance / trip.fuelConsumed).toFixed(1)} km/L
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-block px-2 py-1 bg-muted rounded-md text-xs">
                            {trip.purpose}
                          </span>
                        </TableCell>
                        <TableCell>
                          {trip.status === 'Completed' && (
                            <StatusBadge status="active" size="small" />
                          )}
                          {trip.status === 'In Progress' && (
                            <StatusBadge status="maintenance" size="small" />
                          )}
                          {trip.status === 'Scheduled' && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                              Scheduled
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex space-x-2 justify-end">
                            <button className="p-1 text-primary rounded hover:bg-primary/10">View</button>
                            <button className="p-1 text-muted-foreground rounded hover:bg-muted">Edit</button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
          
          <TabsContent value="map" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin size={18} className="text-primary" />
                  <span>Trip Locations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[500px] bg-muted rounded-md overflow-hidden">
                  <MapView
                    vehicles={vehicles}
                    height={500}
                    showTrips={true}
                  />
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-sm font-medium mb-2">Active Trips</h3>
                      <div className="space-y-3">
                        {trips.filter(t => t.status === 'In Progress').map(trip => (
                          <div key={trip.id} className="flex items-center justify-between border-b pb-2">
                            <div>
                              <div className="text-sm font-medium">{getDriverDetails(trip.driverId).name}</div>
                              <div className="text-xs text-muted-foreground">{trip.startLocation} → {trip.endLocation}</div>
                            </div>
                            <StatusBadge status="maintenance" size="small" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-sm font-medium mb-2">Completed Today</h3>
                      <div className="space-y-3">
                        {trips.filter(t => t.status === 'Completed').slice(0, 3).map(trip => (
                          <div key={trip.id} className="flex items-center justify-between border-b pb-2">
                            <div>
                              <div className="text-sm font-medium">{getDriverDetails(trip.driverId).name}</div>
                              <div className="text-xs text-muted-foreground">{trip.startLocation} → {trip.endLocation}</div>
                            </div>
                            <StatusBadge status="active" size="small" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-sm font-medium mb-2">Upcoming Trips</h3>
                      <div className="space-y-3">
                        {trips.filter(t => t.status === 'Scheduled').map(trip => (
                          <div key={trip.id} className="flex items-center justify-between border-b pb-2">
                            <div>
                              <div className="text-sm font-medium">{getDriverDetails(trip.driverId).name}</div>
                              <div className="text-xs text-muted-foreground">{trip.startLocation} → {trip.endLocation}</div>
                            </div>
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                              Scheduled
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trip Distance by Purpose</CardTitle>
                </CardHeader>
                <CardContent>
                  <Chart
                    type="bar"
                    height={300}
                    data={tripDistanceByPurposeData}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Trip Efficiency (Last Week)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Chart
                    type="line"
                    height={300}
                    data={tripEfficiencyData}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Trip Count by Day</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => {
                      const count = 5 + Math.floor(Math.random() * 15);
                      const percentage = count / 20 * 100;
                      
                      return (
                        <div key={day} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{day}</span>
                            <span>{count} trips</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Top Routes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { route: 'Los Angeles → San Francisco', count: 32, distance: 380.2 },
                      { route: 'Los Angeles → San Diego', count: 28, distance: 120.5 },
                      { route: 'Los Angeles → Las Vegas', count: 25, distance: 270.8 },
                      { route: 'Los Angeles → Phoenix', count: 18, distance: 370.3 },
                      { route: 'Los Angeles → Santa Barbara', count: 15, distance: 95.1 }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <div className="text-sm font-medium">{item.route}</div>
                          <div className="text-xs text-muted-foreground">{item.distance} km</div>
                        </div>
                        <div className="text-sm font-medium">{item.count}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Driver Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {drivers.slice(0, 5).map(driver => {
                      const tripCount = 10 + Math.floor(Math.random() * 30);
                      const efficiency = 10 + Math.random() * 5;
                      
                      return (
                        <div key={driver.id} className="flex justify-between items-center border-b pb-2">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                              <img 
                                src={driver.profileImage} 
                                alt={driver.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="text-sm font-medium">{driver.name}</div>
                              <div className="text-xs text-muted-foreground">{tripCount} trips</div>
                            </div>
                          </div>
                          <div className="text-sm font-medium">{efficiency.toFixed(1)} km/L</div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Trips;
