import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { geofences, vehicles } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { MapPin, AlertCircle, Settings, Plus, Map as MapIcon, Edit, Trash2, Bell, Circle, Square } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import MapView from '../components/ui/MapView';

const GeofenceCard = ({ geofence, onEdit, onDelete }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium">{geofence.name}</h3>
            <p className="text-xs text-muted-foreground">{geofence.description}</p>
          </div>
          <div 
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: geofence.color }}
          ></div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-muted p-2 rounded-md">
            <p className="text-xs text-muted-foreground">Type</p>
            <p className="text-sm">{geofence.type}</p>
          </div>
          <div className="bg-muted p-2 rounded-md">
            <p className="text-xs text-muted-foreground">Size</p>
            <p className="text-sm">
              {geofence.type === 'Circle' 
                ? `${(geofence.radius / 1000).toFixed(1)} km radius` 
                : 'Custom polygon'}
            </p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-2">
          <button 
            onClick={() => onEdit(geofence)} 
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Edit size={16} />
          </button>
          <button 
            onClick={() => onDelete(geofence.id)} 
            className="p-1.5 rounded-md text-status-inactive hover:bg-status-inactive/10"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

const Geofencing = () => {
  const [selectedGeofence, setSelectedGeofence] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleEditGeofence = (geofence) => {
    setSelectedGeofence(geofence);
    setIsEditing(true);
  };
  
  const handleDeleteGeofence = (geofenceId) => {
    // In a real app, this would delete the geofence
    console.log(`Delete geofence ${geofenceId}`);
  };
  
  // Geofence alerts (mock data)
  const geofenceAlerts = [
    {
      id: 1,
      vehicleId: 2,
      vehicle: 'Ford Transit (XYZ-5678)',
      driverId: 1,
      driver: 'John Smith',
      geofence: 'LAX Restricted Zone',
      type: 'entry',
      timestamp: '2023-11-24 14:32:15',
      status: 'unresolved'
    },
    {
      id: 2,
      vehicleId: 4,
      vehicle: 'Volvo FH16 (GHI-3456)',
      driverId: 2,
      driver: 'Sarah Johnson',
      geofence: 'Warehouse District',
      type: 'exit',
      timestamp: '2023-11-24 11:45:22',
      status: 'resolved'
    },
    {
      id: 3,
      vehicleId: 1,
      vehicle: 'Toyota Hilux (ABC-1234)',
      driverId: 3,
      driver: 'Michael Brown',
      geofence: 'Los Angeles HQ',
      type: 'exit',
      timestamp: '2023-11-24 08:15:37',
      status: 'resolved'
    }
  ];
  
  // Vehicles in geofences (mock data)
  const vehiclesInGeofences = [
    {
      vehicleId: 1,
      vehicle: 'Toyota Hilux (ABC-1234)',
      driver: 'Michael Brown',
      geofence: 'Long Beach Port',
      enteredAt: '2023-11-24 09:45:12',
      duration: '2h 15m'
    },
    {
      vehicleId: 6,
      vehicle: 'Mitsubishi Fuso (MNO-1234)',
      driver: 'Emily Davis',
      geofence: 'Warehouse District',
      enteredAt: '2023-11-24 10:30:45',
      duration: '1h 30m'
    }
  ];
  
  // Form state for adding/editing geofence
  const [geofenceForm, setGeofenceForm] = useState({
    name: '',
    type: 'Circle',
    radius: 1000,
    color: '#3B82F6',
    description: ''
  });
  
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Geofencing</h1>
            <p className="text-muted-foreground">Create and manage virtual boundaries for your fleet</p>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Plus size={16} />
            <span>Add Geofence</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Geofence List */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin size={18} className="text-primary" />
                  <span>Geofences</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {geofences.map(geofence => (
                    <GeofenceCard
                      key={geofence.id}
                      geofence={geofence}
                      onEdit={handleEditGeofence}
                      onDelete={handleDeleteGeofence}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {isEditing && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit size={18} className="text-primary" />
                    <span>Edit Geofence</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
                        placeholder="Enter geofence name"
                        value={selectedGeofence?.name || ''}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Type</label>
                      <div className="grid grid-cols-3 gap-3">
                        <button
                          type="button"
                          className={`flex items-center justify-center p-2 border rounded-md ${
                            selectedGeofence?.type === 'Circle' 
                              ? 'bg-primary/10 border-primary text-primary' 
                              : 'border-gray-300 dark:border-gray-700'
                          }`}
                        >
                          <Circle size={16} className="mr-2" />
                          Circle
                        </button>
                        <button
                          type="button"
                          className={`flex items-center justify-center p-2 border rounded-md ${
                            selectedGeofence?.type === 'Polygon' 
                              ? 'bg-primary/10 border-primary text-primary' 
                              : 'border-gray-300 dark:border-gray-700'
                          }`}
                        >
                          <Square size={16} className="mr-2" />
                          Polygon
                        </button>
                      </div>
                    </div>
                    
                    {selectedGeofence?.type === 'Circle' && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Radius (meters)</label>
                        <input
                          type="number"
                          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
                          placeholder="Radius in meters"
                          value={selectedGeofence?.radius || 1000}
                        />
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          className="h-10 w-10 rounded"
                          value={selectedGeofence?.color || '#3B82F6'}
                        />
                        <input
                          type="text"
                          className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md"
                          value={selectedGeofence?.color || '#3B82F6'}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md min-h-[80px]"
                        placeholder="Enter description"
                        value={selectedGeofence?.description || ''}
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-between pt-2">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings size={18} className="text-primary" />
                  <span>Geofence Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Entry Alerts</h3>
                      <p className="text-xs text-muted-foreground">Notify when vehicles enter geofences</p>
                    </div>
                    <div className="h-5 w-10 bg-primary rounded-full relative">
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Exit Alerts</h3>
                      <p className="text-xs text-muted-foreground">Notify when vehicles leave geofences</p>
                    </div>
                    <div className="h-5 w-10 bg-primary rounded-full relative">
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Speed Alerts</h3>
                      <p className="text-xs text-muted-foreground">Notify on speeding within geofences</p>
                    </div>
                    <div className="h-5 w-10 bg-gray-300 dark:bg-gray-700 rounded-full relative">
                      <div className="absolute left-1 top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Alert Frequency</h3>
                      <p className="text-xs text-muted-foreground">How often to send alerts</p>
                    </div>
                    <select className="p-1 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-background">
                      <option>Every event</option>
                      <option>Hourly summary</option>
                      <option>Daily summary</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Notification Methods</h3>
                      <p className="text-xs text-muted-foreground">How to receive alerts</p>
                    </div>
                    <select className="p-1 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-background">
                      <option>System only</option>
                      <option>Email</option>
                      <option>Email & SMS</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Map and Alerts */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapIcon size={18} className="text-primary" />
                  <span>Geofence Map</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[400px] bg-muted rounded-md overflow-hidden">
                  <MapView
                    vehicles={vehicles}
                    geofences={geofences}
                    height={400}
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {geofences.map(geofence => (
                    <div 
                      key={geofence.id} 
                      className="flex items-center p-1 px-2 rounded-full text-xs"
                      style={{ backgroundColor: `${geofence.color}20`, color: geofence.color }}
                    >
                      <MapPin size={12} className="mr-1" />
                      {geofence.name}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="alerts" className="mb-6">
              <TabsList>
                <TabsTrigger value="alerts" className="flex items-center gap-1">
                  <Bell size={16} />
                  <span>Recent Alerts</span>
                </TabsTrigger>
                <TabsTrigger value="vehicles">Current Vehicles</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              
              <TabsContent value="alerts" className="mt-4">
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Alert</TableHead>
                        <TableHead>Vehicle & Driver</TableHead>
                        <TableHead>Geofence</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {geofenceAlerts.map(alert => (
                        <TableRow key={alert.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <div className={`
                                p-1.5 rounded-full mr-2
                                ${alert.type === 'entry' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}
                                dark:bg-opacity-20
                              `}>
                                {alert.type === 'entry' ? (
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 12L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M14 18L20 12L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                ) : (
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10 6L4 12L10 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                )}
                              </div>
                              <div>
                                <div className="font-medium capitalize">
                                  {alert.type} Alert
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">
                              {alert.vehicle}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {alert.driver}
                            </div>
                          </TableCell>
                          <TableCell>
                            {alert.geofence}
                          </TableCell>
                          <TableCell>
                            {alert.timestamp}
                          </TableCell>
                          <TableCell>
                            {alert.status === 'unresolved' ? (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-status-maintenance/10 text-status-maintenance">
                                Unresolved
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-status-active/10 text-status-active">
                                Resolved
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <button className="p-1 text-primary rounded hover:bg-primary/10">Details</button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
              
              <TabsContent value="vehicles" className="mt-4">
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead>Current Geofence</TableHead>
                        <TableHead>Entered At</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vehiclesInGeofences.map((item, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">
                            {item.vehicle}
                          </TableCell>
                          <TableCell>
                            {item.driver}
                          </TableCell>
                          <TableCell>
                            {item.geofence}
                          </TableCell>
                          <TableCell>
                            {item.enteredAt}
                          </TableCell>
                          <TableCell>
                            {item.duration}
                          </TableCell>
                          <TableCell className="text-right">
                            <button className="p-1 text-primary rounded hover:bg-primary/10">Locate</button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
              
              <TabsContent value="reports" className="mt-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Geofence Activity (Last 7 Days)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {geofences.map(geofence => {
                          const entryCount = Math.floor(Math.random() * 20);
                          const exitCount = Math.floor(Math.random() * 20);
                          
                          return (
                            <div key={geofence.id} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{geofence.name}</span>
                                <span>{entryCount + exitCount} events</span>
                              </div>
                              <div className="grid grid-cols-2 gap-1 text-xs">
                                <div className="flex items-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></div>
                                  <span className="text-muted-foreground">{entryCount} entries</span>
                                </div>
                                <div className="flex items-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1"></div>
                                  <span className="text-muted-foreground">{exitCount} exits</span>
                                </div>
                              </div>
                              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden flex">
                                <div 
                                  className="h-full bg-green-500" 
                                  style={{ width: `${entryCount / (entryCount + exitCount) * 100}%` }}
                                ></div>
                                <div 
                                  className="h-full bg-amber-500" 
                                  style={{ width: `${exitCount / (entryCount + exitCount) * 100}%` }}
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
                      <CardTitle className="text-base">Alert Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-4 bg-muted rounded-lg text-center">
                          <div className="text-3xl font-bold text-status-active mb-1">12</div>
                          <div className="text-sm text-muted-foreground">Resolved</div>
                        </div>
                        <div className="p-4 bg-muted rounded-lg text-center">
                          <div className="text-3xl font-bold text-status-maintenance mb-1">3</div>
                          <div className="text-sm text-muted-foreground">Unresolved</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>By Type</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                              <span className="text-xs">Entry</span>
                              <span className="text-xs font-medium">8</span>
                            </div>
                            <div className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                              <span className="text-xs">Exit</span>
                              <span className="text-xs font-medium">7</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>By Geofence</span>
                          </div>
                          <div className="space-y-2">
                            {geofences.map(geofence => (
                              <div 
                                key={geofence.id} 
                                className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700"
                              >
                                <span className="text-xs">{geofence.name}</span>
                                <span className="text-xs font-medium">{Math.floor(Math.random() * 5)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle size={18} className="text-primary" />
                  <span>Alert Rules</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">LAX Restricted Zone - Entry Alert</h3>
                        <p className="text-xs text-muted-foreground">Alert when any vehicle enters this zone</p>
                      </div>
                      <div className="h-5 w-10 bg-primary rounded-full relative">
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="flex gap-2">
                        <button className="p-1 text-primary rounded hover:bg-primary/10">Edit</button>
                        <button className="p-1 text-status-inactive rounded hover:bg-status-inactive/10">Delete</button>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Priority: High
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Los Angeles HQ - Exit Alert (After Hours)</h3>
                        <p className="text-xs text-muted-foreground">Alert when vehicles exit HQ between 8 PM and 6 AM</p>
                      </div>
                      <div className="h-5 w-10 bg-primary rounded-full relative">
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="flex gap-2">
                        <button className="p-1 text-primary rounded hover:bg-primary/10">Edit</button>
                        <button className="p-1 text-status-inactive rounded hover:bg-status-inactive/10">Delete</button>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Priority: Medium
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Warehouse District - Speed Alert</h3>
                        <p className="text-xs text-muted-foreground">Alert when vehicle speed exceeds 20 mph in this zone</p>
                      </div>
                      <div className="h-5 w-10 bg-gray-300 dark:bg-gray-700 rounded-full relative">
                        <div className="absolute left-1 top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="flex gap-2">
                        <button className="p-1 text-primary rounded hover:bg-primary/10">Edit</button>
                        <button className="p-1 text-status-inactive rounded hover:bg-status-inactive/10">Delete</button>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Priority: Medium
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full p-2 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-primary hover:bg-primary/5 text-sm">
                    + Add New Alert Rule
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Geofencing;
