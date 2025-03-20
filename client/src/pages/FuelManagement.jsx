import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { fuelLogs, vehicles } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import Chart from '../components/ui/Chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Fuel, Calendar, Search, Filter, Plus, BarChart, AlertTriangle, TrendingDown, TrendingUp, DollarSign } from 'lucide-react';

const FuelManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVehicle, setFilterVehicle] = useState('all');
  const [dateRange, setDateRange] = useState('month');
  
  // Get vehicle details by ID
  const getVehicleDetails = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle || { make: 'Unknown', model: 'Unknown', licensePlate: 'Unknown' };
  };
  
  // Filter fuel logs based on search and filter
  const filteredLogs = fuelLogs.filter(log => {
    // Vehicle filter
    if (filterVehicle !== 'all' && log.vehicleId !== parseInt(filterVehicle)) {
      return false;
    }
    
    // Search filter
    if (searchTerm) {
      const vehicle = getVehicleDetails(log.vehicleId);
      const searchLower = searchTerm.toLowerCase();
      return (
        log.station.toLowerCase().includes(searchLower) ||
        log.filledBy.toLowerCase().includes(searchLower) ||
        vehicle.make.toLowerCase().includes(searchLower) ||
        vehicle.model.toLowerCase().includes(searchLower) ||
        vehicle.licensePlate.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  // Calculate fuel statistics
  const stats = {
    totalFuelAmount: fuelLogs.reduce((sum, log) => sum + log.amount, 0),
    totalFuelCost: fuelLogs.reduce((sum, log) => sum + log.cost, 0),
    avgPricePerLiter: fuelLogs.reduce((sum, log) => sum + log.cost, 0) / fuelLogs.reduce((sum, log) => sum + log.amount, 0),
    fuelEfficiency: 12.5, // km/l (example average)
    costPerKm: 0.15, // $/km (example average)
    fuelConsumptionTrend: -3.5 // % change (example)
  };
  
  // Monthly consumption data for chart
  const monthlyConsumptionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        name: 'Consumption (Liters)',
        data: [420, 380, 450, 410, 390, 405, 440, 430, 420, 410, 400, 430]
      }
    ]
  };
  
  // Fuel efficiency by vehicle type
  const efficiencyData = {
    labels: ['Sedan', 'Van', 'Light Truck', 'Medium Truck', 'Heavy Truck'],
    datasets: [
      {
        name: 'Efficiency (km/l)',
        data: [15.2, 12.8, 10.5, 8.3, 6.7]
      }
    ]
  };
  
  // Fuel cost trend
  const costTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        name: 'Cost per Liter ($)',
        data: [1.65, 1.70, 1.75, 1.80, 1.85, 1.82, 1.79, 1.77, 1.74, 1.69, 1.72, 1.79]
      }
    ]
  };
  
  // Sample efficiency anomalies
  const efficiencyAnomalies = [
    {
      id: 1,
      vehicleId: 2,
      vehicle: 'Ford Transit (XYZ-5678)',
      expectedEfficiency: 12.8,
      actualEfficiency: 9.6,
      change: -25,
      period: 'Last 30 days',
      possibleCauses: ['Maintenance issues', 'Tire pressure', 'Driving behavior']
    },
    {
      id: 2,
      vehicleId: 5,
      vehicle: 'Isuzu NPR (JKL-7890)',
      expectedEfficiency: 10.4,
      actualEfficiency: 8.3,
      change: -20.2,
      period: 'Last 30 days',
      possibleCauses: ['Engine performance', 'Heavy loads', 'Idle time']
    }
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Fuel Management</h1>
            <p className="text-muted-foreground">Monitor and optimize your fleet's fuel consumption</p>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Plus size={16} />
            <span>Add Fuel Log</span>
          </button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Fuel</p>
                <p className="text-2xl font-bold">{stats.totalFuelAmount.toFixed(1)} L</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <Fuel size={20} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Cost</p>
                <p className="text-2xl font-bold">${stats.totalFuelCost.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/20 text-green-600 dark:text-green-400">
                <DollarSign size={20} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Average Efficiency</p>
                <p className="text-2xl font-bold">{stats.fuelEfficiency} km/L</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                <BarChart size={20} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Consumption Trend</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold">{Math.abs(stats.fuelConsumptionTrend)}%</p>
                  {stats.fuelConsumptionTrend < 0 ? (
                    <TrendingDown className="ml-1 text-green-500" size={20} />
                  ) : (
                    <TrendingUp className="ml-1 text-red-500" size={20} />
                  )}
                </div>
              </div>
              <div className="p-3 bg-amber-100 rounded-full dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
                <TrendingDown size={20} />
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
                  placeholder="Search by vehicle, station, or filled by..." 
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground hidden md:inline">Vehicle:</span>
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
                
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-muted-foreground" />
                  <select 
                    className="border rounded-md p-2 bg-background"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs for different views */}
        <Tabs defaultValue="logs" className="mb-6">
          <TabsList>
            <TabsTrigger value="logs" className="flex items-center gap-1">
              <Fuel size={16} />
              <span>Fuel Logs</span>
            </TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="efficiency">Efficiency Monitoring</TabsTrigger>
          </TabsList>
          
          <TabsContent value="logs" className="mt-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Odometer</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Station</TableHead>
                    <TableHead>Filled By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map(log => {
                    const vehicle = getVehicleDetails(log.vehicleId);
                    return (
                      <TableRow key={log.id}>
                        <TableCell>{new Date(log.date).toLocaleDateString()}</TableCell>
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-medium">{vehicle.make} {vehicle.model}</div>
                            <div className="text-xs text-muted-foreground">{vehicle.licensePlate}</div>
                          </div>
                        </TableCell>
                        <TableCell>{log.amount.toFixed(1)} L</TableCell>
                        <TableCell>{log.odometer.toLocaleString()} km</TableCell>
                        <TableCell>${log.cost.toFixed(2)}</TableCell>
                        <TableCell>{log.station}</TableCell>
                        <TableCell>{log.filledBy}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex space-x-2 justify-end">
                            <button className="p-1 text-primary rounded hover:bg-primary/10">Edit</button>
                            <button className="p-1 text-status-inactive rounded hover:bg-status-inactive/10">Delete</button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Fuel Consumption</CardTitle>
                </CardHeader>
                <CardContent>
                  <Chart
                    type="bar"
                    height={300}
                    data={monthlyConsumptionData}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Fuel Price Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <Chart
                    type="line"
                    height={300}
                    data={costTrendData}
                  />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Fuel Efficiency by Vehicle Type</CardTitle>
              </CardHeader>
              <CardContent>
                <Chart
                  type="bar"
                  height={300}
                  data={efficiencyData}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="efficiency" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle size={18} className="text-status-maintenance" />
                    <span>Efficiency Anomalies</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {efficiencyAnomalies.map(anomaly => (
                      <div key={anomaly.id} className="p-4 border border-status-maintenance/30 bg-status-maintenance/5 rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{anomaly.vehicle}</h3>
                          <span className="text-status-maintenance flex items-center text-sm">
                            <TrendingDown size={16} className="mr-1" />
                            {anomaly.change}% efficiency
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Expected</p>
                            <p className="font-medium">{anomaly.expectedEfficiency} km/L</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Actual</p>
                            <p className="font-medium">{anomaly.actualEfficiency} km/L</p>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground mb-1">Possible Causes:</p>
                          <div className="flex flex-wrap gap-1">
                            {anomaly.possibleCauses.map((cause, i) => (
                              <span key={i} className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                {cause}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-3 flex justify-end">
                          <button className="text-primary text-sm hover:underline">Investigate</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Optimization Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-green-500/30 bg-green-500/5 rounded-md">
                      <h3 className="font-medium flex items-center">
                        <TrendingDown size={16} className="mr-1 text-green-500" />
                        <span>Route Optimization</span>
                      </h3>
                      <p className="text-sm mt-1">Optimizing delivery routes could reduce fuel consumption by up to 15%. Consider implementing route planning software.</p>
                      <div className="mt-2 bg-muted p-3 rounded-md">
                        <div className="flex justify-between text-sm">
                          <span>Potential Savings:</span>
                          <span className="font-medium">$430 / month</span>
                        </div>
                        <div className="mt-2 flex justify-end">
                          <button className="text-primary text-sm hover:underline">Learn More</button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-green-500/30 bg-green-500/5 rounded-md">
                      <h3 className="font-medium flex items-center">
                        <TrendingDown size={16} className="mr-1 text-green-500" />
                        <span>Driver Training Program</span>
                      </h3>
                      <p className="text-sm mt-1">Eco-driving techniques could improve fuel efficiency by 8-12%. Consider implementing a driver training program.</p>
                      <div className="mt-2 bg-muted p-3 rounded-md">
                        <div className="flex justify-between text-sm">
                          <span>Potential Savings:</span>
                          <span className="font-medium">$320 / month</span>
                        </div>
                        <div className="mt-2 flex justify-end">
                          <button className="text-primary text-sm hover:underline">Learn More</button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-green-500/30 bg-green-500/5 rounded-md">
                      <h3 className="font-medium flex items-center">
                        <TrendingDown size={16} className="mr-1 text-green-500" />
                        <span>Tire Pressure Monitoring</span>
                      </h3>
                      <p className="text-sm mt-1">Properly inflated tires can improve fuel efficiency by 3%. Implement regular tire pressure checks.</p>
                      <div className="mt-2 bg-muted p-3 rounded-md">
                        <div className="flex justify-between text-sm">
                          <span>Potential Savings:</span>
                          <span className="font-medium">$120 / month</span>
                        </div>
                        <div className="mt-2 flex justify-end">
                          <button className="text-primary text-sm hover:underline">Learn More</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Average Efficiency</TableHead>
                      <TableHead>Benchmark</TableHead>
                      <TableHead>Variance</TableHead>
                      <TableHead>Fuel Cost per 100km</TableHead>
                      <TableHead>CO2 Emissions</TableHead>
                      <TableHead>Recommendation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicles.slice(0, 4).map(vehicle => (
                      <TableRow key={vehicle.id}>
                        <TableCell className="font-medium">
                          {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
                        </TableCell>
                        <TableCell>{(vehicle.fuelEfficiency * 0.9 + Math.random() * vehicle.fuelEfficiency * 0.2).toFixed(1)} km/L</TableCell>
                        <TableCell>{vehicle.fuelEfficiency} km/L</TableCell>
                        <TableCell className={
                          Math.random() > 0.5 ? "text-green-500" : "text-status-maintenance"
                        }>
                          {Math.random() > 0.5 ? "+" : "-"}{(Math.random() * 10).toFixed(1)}%
                        </TableCell>
                        <TableCell>${(100 / vehicle.fuelEfficiency * 1.75).toFixed(2)}</TableCell>
                        <TableCell>{(100 / vehicle.fuelEfficiency * 2.3).toFixed(1)} kg</TableCell>
                        <TableCell>
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            {Math.random() > 0.5 ? "Maintenance Check" : "Optimize Routes"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default FuelManagement;