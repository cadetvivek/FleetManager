import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { vehicles, drivers } from '../data/mockData';
import MapView from '../components/ui/MapView';
import { Search, Route, Calendar, AlertTriangle, Navigation, Plus, Clock, MapPin, Fuel, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import StatusBadge from '../components/ui/StatusBadge';

const RouteManagement = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [origin, setOrigin] = useState('Los Angeles, CA');
  const [destination, setDestination] = useState('San Diego, CA');
  const [startDate, setStartDate] = useState('');
  const [routeType, setRouteType] = useState('fastest');
  
  // Sample recent routes data
  const recentRoutes = [
    {
      id: 1,
      origin: 'Los Angeles, CA',
      destination: 'San Francisco, CA',
      distance: 382.5,
      duration: '5h 45m',
      driver: 'John Smith',
      vehicle: 'Ford Transit (XYZ-5678)',
      departureTime: '2023-11-24 08:00 AM',
      status: 'completed'
    },
    {
      id: 2,
      origin: 'Los Angeles, CA',
      destination: 'Las Vegas, NV',
      distance: 270.3,
      duration: '4h 10m',
      driver: 'Michael Brown',
      vehicle: 'Toyota Hilux (ABC-1234)',
      departureTime: '2023-11-25 07:30 AM',
      status: 'in-progress'
    },
    {
      id: 3,
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      distance: 372.4,
      duration: '5h 30m',
      driver: 'Sarah Johnson',
      vehicle: 'Volvo FH16 (GHI-3456)',
      departureTime: '2023-11-26 06:00 AM',
      status: 'scheduled'
    }
  ];
  
  // Simulated route planning result
  const routeResult = {
    distance: 120.5,
    duration: '1h 50m',
    fuelConsumption: 8.2,
    estimatedCost: 78.5,
    tollRoads: 2,
    trafficCondition: 'Moderate'
  };
  
  // Sample suggested waypoints
  const suggestedWaypoints = [
    {
      name: 'Rest Area - Oceanside',
      distance: 52.3,
      time: '45 minutes into trip',
      amenities: ['Restrooms', 'Food', 'Fuel']
    },
    {
      name: 'Truck Stop - Carlsbad',
      distance: 85.7,
      time: '1 hour 15 minutes into trip',
      amenities: ['Showers', 'Restaurant', 'Repair Shop', 'Fuel']
    }
  ];
  
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Route Planning</h1>
            <p className="text-muted-foreground">Plan optimal routes for your fleet vehicles</p>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Plus size={16} />
            <span>New Route</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Route Planning Form */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Route size={18} className="text-primary" />
                  <span>Plan New Route</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Origin</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        className="pl-10 w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
                        placeholder="Enter starting point"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Destination</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        className="pl-10 w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
                        placeholder="Enter destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Vehicle</label>
                    <select
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      value={selectedVehicle}
                      onChange={(e) => setSelectedVehicle(e.target.value)}
                    >
                      <option value="">Select Vehicle</option>
                      {vehicles.map(vehicle => (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Driver</label>
                    <select
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      value={selectedDriver}
                      onChange={(e) => setSelectedDriver(e.target.value)}
                    >
                      <option value="">Select Driver</option>
                      {drivers.map(driver => (
                        <option key={driver.id} value={driver.id}>
                          {driver.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Departure Date & Time</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <input
                        type="datetime-local"
                        className="pl-10 w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Route Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        className={`flex items-center justify-center p-2 border rounded-md ${
                          routeType === 'fastest' 
                            ? 'bg-primary/10 border-primary text-primary' 
                            : 'border-gray-300 dark:border-gray-700'
                        }`}
                        onClick={() => setRouteType('fastest')}
                      >
                        <Clock size={16} className="mr-2" />
                        Fastest
                      </button>
                      <button
                        type="button"
                        className={`flex items-center justify-center p-2 border rounded-md ${
                          routeType === 'economical' 
                            ? 'bg-primary/10 border-primary text-primary' 
                            : 'border-gray-300 dark:border-gray-700'
                        }`}
                        onClick={() => setRouteType('economical')}
                      >
                        <Fuel size={16} className="mr-2" />
                        Economical
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <input 
                      type="checkbox" 
                      id="avoid-tolls" 
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor="avoid-tolls">Avoid toll roads</label>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <input 
                      type="checkbox" 
                      id="avoid-highways" 
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor="avoid-highways">Avoid highways</label>
                  </div>
                  
                  <button
                    type="button"
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90"
                  >
                    Calculate Route
                  </button>
                </form>
              </CardContent>
            </Card>
            
            {/* Route Result */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation size={18} className="text-primary" />
                  <span>Route Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-4 rounded-md mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <MapPin size={16} className="text-primary" />
                      <span className="ml-1 font-medium">Los Angeles, CA</span>
                    </div>
                    <ArrowRight size={14} />
                    <div className="flex items-center">
                      <MapPin size={16} className="text-primary" />
                      <span className="ml-1 font-medium">San Diego, CA</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="p-2 bg-background rounded-md">
                      <p className="text-xs text-muted-foreground">Distance</p>
                      <p className="font-medium">{routeResult.distance} km</p>
                    </div>
                    <div className="p-2 bg-background rounded-md">
                      <p className="text-xs text-muted-foreground">Est. Duration</p>
                      <p className="font-medium">{routeResult.duration}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2 bg-background rounded-md">
                      <p className="text-xs text-muted-foreground">Fuel Consumption</p>
                      <p className="font-medium">{routeResult.fuelConsumption} L</p>
                    </div>
                    <div className="p-2 bg-background rounded-md">
                      <p className="text-xs text-muted-foreground">Est. Cost</p>
                      <p className="font-medium">${routeResult.estimatedCost}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Suggested Waypoints</h3>
                  <div className="space-y-2">
                    {suggestedWaypoints.map((waypoint, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 p-2 rounded-md">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">{waypoint.name}</p>
                          <p className="text-xs text-muted-foreground">{waypoint.distance} km</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{waypoint.time}</p>
                        <div className="flex gap-1 mt-1">
                          {waypoint.amenities.map((amenity, i) => (
                            <span key={i} className="text-xs bg-muted px-1.5 py-0.5 rounded-full">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between space-x-2">
                  <button className="flex-1 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
                    Share
                  </button>
                  <button className="flex-1 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
                    Export
                  </button>
                  <button className="flex-1 bg-primary text-white py-2 rounded-md text-sm hover:bg-primary/90">
                    Assign Route
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Map and Recent Routes */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin size={18} className="text-primary" />
                  <span>Route Map</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-96 bg-muted rounded-md overflow-hidden">
                  <MapView
                    vehicles={vehicles}
                    height={384}
                    showRoute={true}
                    routeStart={{ lat: 34.0522, lng: -118.2437 }}
                    routeEnd={{ lat: 32.7157, lng: -117.1611 }}
                  />
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="flex items-center space-x-1 text-xs">
                    <div className="w-3 h-3 rounded-full bg-status-active"></div>
                    <span>Current Position</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs">
                    <div className="w-3 h-3 rounded-full bg-status-maintenance"></div>
                    <span>Waypoint</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs">
                    <div className="w-3 h-3 rounded-full bg-status-inactive"></div>
                    <span>Destination</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Route size={18} className="text-primary" />
                    <span>Recent Routes</span>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="search"
                      className="pl-10 py-1 pr-3 text-sm border border-gray-300 dark:border-gray-700 rounded-md w-48 md:w-64"
                      placeholder="Search routes..."
                    />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Route</TableHead>
                      <TableHead>Driver & Vehicle</TableHead>
                      <TableHead>Distance</TableHead>
                      <TableHead>Departure</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentRoutes.map((route) => (
                      <TableRow key={route.id}>
                        <TableCell>
                          <div className="font-medium">{route.origin}</div>
                          <div className="text-xs text-muted-foreground flex items-center">
                            <ArrowRight size={10} className="mx-1" />
                            {route.destination}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>{route.driver}</div>
                          <div className="text-xs text-muted-foreground">{route.vehicle}</div>
                        </TableCell>
                        <TableCell>
                          <div>{route.distance} km</div>
                          <div className="text-xs text-muted-foreground">{route.duration}</div>
                        </TableCell>
                        <TableCell>
                          {route.departureTime}
                        </TableCell>
                        <TableCell>
                          {route.status === 'completed' && (
                            <StatusBadge status="active" size="small" />
                          )}
                          {route.status === 'in-progress' && (
                            <StatusBadge status="maintenance" size="small" />
                          )}
                          {route.status === 'scheduled' && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                              Scheduled
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <button className="p-1 text-primary rounded hover:bg-primary/10">View</button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle size={18} className="text-status-maintenance" />
                  <span>Traffic & Road Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start p-3 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-md">
                    <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Accident on I-5 South</p>
                      <p className="text-sm">Near Oceanside. Expect delays of 25-30 minutes. Consider alternate routes.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 rounded-md">
                    <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Construction Work on Highway 78</p>
                      <p className="text-sm">Lane closures from 9 AM to 4 PM. Expect moderate delays.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-md">
                    <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Heavy Rain Expected</p>
                      <p className="text-sm">Weather alert for San Diego area from 2 PM to 8 PM. Drive with caution.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RouteManagement;
