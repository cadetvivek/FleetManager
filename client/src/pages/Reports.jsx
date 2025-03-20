import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { vehicles, drivers, trips, maintenanceRecords, fuelLogs } from '../data/mockData';
import { BarChart, FileDown, Filter, Calendar, FileText, Fuel, Wrench, Route, Users, Car } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import Chart from '../components/ui/Chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const ReportCard = ({ title, icon: Icon, description, onClick }) => (
  <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
    <CardContent className="p-6 flex flex-col items-center text-center">
      <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Reports = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('month');
  
  // Mock data for charts
  const fuelEfficiencyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        name: 'Sedans',
        data: [15.2, 15.0, 14.8, 15.5, 15.3, 14.9, 15.1, 15.2, 15.4, 15.6, 15.2, 15.0]
      },
      {
        name: 'Vans',
        data: [12.1, 11.9, 11.7, 12.0, 11.8, 11.5, 11.6, 11.9, 12.2, 12.0, 11.8, 11.7]
      },
      {
        name: 'Trucks',
        data: [8.5, 8.3, 8.2, 8.7, 8.5, 8.4, 8.3, 8.6, 8.8, 8.7, 8.5, 8.4]
      }
    ]
  };
  
  const maintenanceCostData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        name: 'Preventive',
        data: [3500, 2800, 4200, 3800, 5100, 4500, 3900, 4600, 5200, 4800, 3700, 4100]
      },
      {
        name: 'Corrective',
        data: [1200, 900, 1500, 2200, 1800, 1100, 2500, 2000, 1600, 1300, 1700, 2100]
      }
    ]
  };
  
  const driverPerformanceData = {
    labels: ['Safety Score', 'On-Time %', 'Fuel Efficiency', 'Vehicle Care', 'Customer Rating'],
    datasets: [
      {
        name: 'Top Performers',
        data: [95, 98, 90, 93, 97]
      },
      {
        name: 'Average',
        data: [85, 82, 78, 80, 83]
      },
      {
        name: 'Bottom Performers',
        data: [70, 65, 62, 68, 72]
      }
    ]
  };
  
  const distanceTraveledData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        name: 'Long Haul',
        data: [2800, 3200, 2600, 3100]
      },
      {
        name: 'Regional',
        data: [1500, 1400, 1600, 1350]
      },
      {
        name: 'Local',
        data: [800, 850, 790, 820]
      }
    ]
  };
  
  // Fleet statistics
  const fleetStats = {
    totalVehicles: vehicles.length,
    activeVehicles: vehicles.filter(v => v.status === 'active').length,
    totalDrivers: drivers.length,
    activeDrivers: drivers.filter(d => d.status === 'available' || d.status === 'on-duty').length,
    totalTrips: trips.length,
    totalDistance: trips.reduce((sum, trip) => sum + trip.distance, 0),
    avgFuelEfficiency: (
      vehicles.reduce((sum, vehicle) => sum + vehicle.fuelEfficiency, 0) / vehicles.length
    ).toFixed(1),
    maintenanceCost: maintenanceRecords.reduce((sum, record) => sum + record.cost, 0),
    fuelCost: fuelLogs.reduce((sum, log) => sum + log.cost, 0)
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Reports & Analytics</h1>
            <p className="text-muted-foreground">Comprehensive insights into your fleet performance</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
              <FileDown size={16} />
              <span>Export</span>
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-md">
              <Calendar size={16} />
              <select 
                className="bg-transparent focus:outline-none"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">
              <BarChart size={16} className="mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="vehicles">
              <Car size={16} className="mr-2" />
              Vehicles
            </TabsTrigger>
            <TabsTrigger value="drivers">
              <Users size={16} className="mr-2" />
              Drivers
            </TabsTrigger>
            <TabsTrigger value="fuel">
              <Fuel size={16} className="mr-2" />
              Fuel
            </TabsTrigger>
            <TabsTrigger value="maintenance">
              <Wrench size={16} className="mr-2" />
              Maintenance
            </TabsTrigger>
            <TabsTrigger value="trips">
              <Route size={16} className="mr-2" />
              Trips
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Vehicles</p>
                      <p className="text-2xl font-bold">{fleetStats.totalVehicles}</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                      <Car size={20} />
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    {fleetStats.activeVehicles} Active ({Math.round(fleetStats.activeVehicles / fleetStats.totalVehicles * 100)}%)
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Drivers</p>
                      <p className="text-2xl font-bold">{fleetStats.totalDrivers}</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full text-green-600 dark:bg-green-900/20 dark:text-green-400">
                      <Users size={20} />
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    {fleetStats.activeDrivers} Active ({Math.round(fleetStats.activeDrivers / fleetStats.totalDrivers * 100)}%)
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Distance</p>
                      <p className="text-2xl font-bold">{Math.round(fleetStats.totalDistance)} km</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                      <Route size={20} />
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    {fleetStats.totalTrips} Total Trips
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Costs</p>
                      <p className="text-2xl font-bold">${(fleetStats.maintenanceCost + fleetStats.fuelCost).toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-red-100 rounded-full text-red-600 dark:bg-red-900/20 dark:text-red-400">
                      <FileText size={20} />
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Maintenance: ${fleetStats.maintenanceCost.toLocaleString()} | Fuel: ${fleetStats.fuelCost.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Costs</CardTitle>
                </CardHeader>
                <CardContent>
                  <Chart
                    type="bar"
                    height={300}
                    data={maintenanceCostData}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Fuel Efficiency by Vehicle Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <Chart
                    type="line"
                    height={300}
                    data={fuelEfficiencyData}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distance Traveled</CardTitle>
                </CardHeader>
                <CardContent>
                  <Chart
                    type="bar"
                    height={300}
                    data={distanceTraveledData}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Driver Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <Chart
                    type="radar"
                    height={300}
                    data={driverPerformanceData}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="vehicles">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ReportCard
                title="Vehicle Utilization"
                icon={Car}
                description="Analyze how efficiently each vehicle is being utilized"
                onClick={() => {}}
              />
              
              <ReportCard
                title="Maintenance Analysis"
                icon={Wrench}
                description="Track maintenance costs and frequency by vehicle"
                onClick={() => {}}
              />
              
              <ReportCard
                title="Fuel Consumption"
                icon={Fuel}
                description="Compare fuel efficiency and costs across the fleet"
                onClick={() => {}}
              />
              
              <ReportCard
                title="Vehicle Performance"
                icon={BarChart}
                description="Review overall performance metrics by vehicle"
                onClick={() => {}}
              />
              
              <ReportCard
                title="Cost Analysis"
                icon={FileText}
                description="Breakdown of costs by vehicle, including TCO"
                onClick={() => {}}
              />
              
              <ReportCard
                title="Vehicle Lifecycle"
                icon={Calendar}
                description="Track acquisition, depreciation, and replacement timelines"
                onClick={() => {}}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="drivers">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ReportCard
                title="Driver Performance"
                icon={Users}
                description="Review driver performance metrics and safety scores"
                onClick={() => {}}
              />
              
              <ReportCard
                title="Hours of Service"
                icon={Calendar}
                description="Monitor driver hours and compliance with regulations"
                onClick={() => {}}
              />
              
              <ReportCard
                title="Safety Analysis"
                icon={BarChart}
                description="Analyze driver safety incidents and patterns"
                onClick={() => {}}
              />
              
              <ReportCard
                title="Driver Efficiency"
                icon={Fuel}
                description="Compare fuel efficiency and vehicle handling by driver"
                onClick={() => {}}
              />
              
              <ReportCard
                title="Trip Performance"
                icon={Route}
                description="Evaluate on-time delivery and route adherence"
                onClick={() => {}}
              />
              
              <ReportCard
                title="Driver Certification"
                icon={FileText}
                description="Track license renewals and required certifications"
                onClick={() => {}}
              />
            </div>
          </TabsContent>
          
          {/* Placeholder content for other tabs */}
          <TabsContent value="fuel">
            <div className="bg-muted p-8 rounded-lg text-center">
              <Fuel className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Fuel Consumption Reports</h3>
              <p className="text-muted-foreground mb-4">Select a report type to view detailed fuel analysis</p>
              <div className="flex justify-center gap-4">
                <button className="px-4 py-2 rounded-md bg-primary text-white">Cost Analysis</button>
                <button className="px-4 py-2 rounded-md border">Efficiency Trends</button>
                <button className="px-4 py-2 rounded-md border">By Vehicle</button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="maintenance">
            <div className="bg-muted p-8 rounded-lg text-center">
              <Wrench className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Maintenance Reports</h3>
              <p className="text-muted-foreground mb-4">Select a report type to view detailed maintenance analysis</p>
              <div className="flex justify-center gap-4">
                <button className="px-4 py-2 rounded-md bg-primary text-white">Cost Breakdown</button>
                <button className="px-4 py-2 rounded-md border">Frequency Analysis</button>
                <button className="px-4 py-2 rounded-md border">By Vehicle</button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trips">
            <div className="bg-muted p-8 rounded-lg text-center">
              <Route className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Trip Reports</h3>
              <p className="text-muted-foreground mb-4">Select a report type to view detailed trip analysis</p>
              <div className="flex justify-center gap-4">
                <button className="px-4 py-2 rounded-md bg-primary text-white">Distance Analysis</button>
                <button className="px-4 py-2 rounded-md border">Route Optimization</button>
                <button className="px-4 py-2 rounded-md border">By Driver</button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Custom Report Builder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText size={18} className="text-primary" />
              <span>Custom Report Builder</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Select Report Type</h3>
                <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md">
                  <option>Vehicle Performance</option>
                  <option>Driver Performance</option>
                  <option>Maintenance Analysis</option>
                  <option>Fuel Consumption</option>
                  <option>Trip Analysis</option>
                  <option>Cost Analysis</option>
                </select>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Date Range</h3>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="date" 
                    className="p-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    defaultValue="2023-01-01"
                  />
                  <input 
                    type="date" 
                    className="p-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    defaultValue="2023-12-31"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Output Format</h3>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20">
                    <FileText size={16} />
                    <span>PDF</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                    <FileText size={16} />
                    <span>CSV</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                    <FileText size={16} />
                    <span>Excel</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Data Fields to Include</h3>
                <button className="text-sm text-primary hover:underline">Select All</button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Vehicle ID', 'Vehicle Make', 'Vehicle Model', 'License Plate', 'Driver Name', 'Trip Date', 'Distance', 'Fuel Used', 'Efficiency', 'Cost', 'Location', 'Purpose'].map(field => (
                  <div key={field} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={`field-${field}`} 
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <label htmlFor={`field-${field}`} className="text-sm">{field}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                Generate Report
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
