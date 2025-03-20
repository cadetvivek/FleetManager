import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { maintenanceRecords, vehicles } from '../data/mockData';
import { Calendar, Search, Filter, Wrench, Clock, CheckCircle, AlertTriangle, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import StatusBadge from '../components/ui/StatusBadge';

const Maintenance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('scheduled');
  
  // Get vehicle details by ID
  const getVehicleDetails = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle || { make: 'Unknown', model: 'Unknown', licensePlate: 'Unknown' };
  };
  
  // Filter maintenance records based on search and filter
  const filteredRecords = maintenanceRecords.filter(record => {
    // Status filter
    if (filterStatus !== 'all' && record.status.toLowerCase() !== filterStatus.toLowerCase()) {
      return false;
    }
    
    // Search filter
    if (searchTerm) {
      const vehicle = getVehicleDetails(record.vehicleId);
      const searchLower = searchTerm.toLowerCase();
      return (
        record.type.toLowerCase().includes(searchLower) ||
        record.technician.toLowerCase().includes(searchLower) ||
        vehicle.make.toLowerCase().includes(searchLower) ||
        vehicle.model.toLowerCase().includes(searchLower) ||
        vehicle.licensePlate.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  // Separate records by status
  const scheduledMaintenance = filteredRecords.filter(record => record.status === 'Scheduled');
  const completedMaintenance = filteredRecords.filter(record => record.status === 'Completed');
  
  // Calculate maintenance stats
  const stats = {
    total: maintenanceRecords.length,
    scheduled: scheduledMaintenance.length,
    completed: completedMaintenance.length,
    overdue: 1, // Mocked value
    totalCost: maintenanceRecords.reduce((sum, record) => sum + record.cost, 0)
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Maintenance Management</h1>
            <p className="text-muted-foreground">Schedule and track maintenance for your fleet vehicles</p>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Plus size={16} />
            <span>Schedule Maintenance</span>
          </button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold">{stats.scheduled}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <Calendar size={20} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/20 text-green-600 dark:text-green-400">
                <CheckCircle size={20} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold">{stats.overdue}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full dark:bg-red-900/20 text-red-600 dark:text-red-400">
                <AlertTriangle size={20} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Cost (MTD)</p>
                <p className="text-2xl font-bold">${stats.totalCost.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                <Wrench size={20} />
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
                  placeholder="Search by vehicle, type, or technician..." 
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Filter size={16} />
                  <span>Filter</span>
                </div>
                <select 
                  className="border rounded-md p-2 bg-background"
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
          </CardContent>
        </Card>
        
        {/* Maintenance Tabs */}
        <Tabs defaultValue="scheduled" className="mb-6" onValueChange={setViewMode}>
          <TabsList>
            <TabsTrigger value="scheduled" className="flex items-center gap-1">
              <Calendar size={16} />
              <span>Scheduled ({scheduledMaintenance.length})</span>
            </TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedMaintenance.length})</TabsTrigger>
            <TabsTrigger value="history">Maintenance History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scheduled" className="mt-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Estimated Cost</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledMaintenance.map(record => {
                    const vehicle = getVehicleDetails(record.vehicleId);
                    return (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-medium">{vehicle.make} {vehicle.model}</div>
                            <div className="text-xs text-muted-foreground">{vehicle.licensePlate}</div>
                          </div>
                        </TableCell>
                        <TableCell>{record.type}</TableCell>
                        <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-status-maintenance rounded-full mr-2" />
                            <span>{record.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>${record.cost.toLocaleString()}</TableCell>
                        <TableCell>{record.technician}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <button className="p-1 text-primary rounded hover:bg-primary/10">Edit</button>
                            <button className="p-1 text-status-inactive rounded hover:bg-status-inactive/10">Cancel</button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Completion Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Final Cost</TableHead>
                    <TableHead>Technician</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedMaintenance.map(record => {
                    const vehicle = getVehicleDetails(record.vehicleId);
                    return (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-medium">{vehicle.make} {vehicle.model}</div>
                            <div className="text-xs text-muted-foreground">{vehicle.licensePlate}</div>
                          </div>
                        </TableCell>
                        <TableCell>{record.type}</TableCell>
                        <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-status-active rounded-full mr-2" />
                            <span>{record.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>${record.cost.toLocaleString()}</TableCell>
                        <TableCell>{record.technician}</TableCell>
                        <TableCell>
                          <button className="p-1 text-primary rounded hover:bg-primary/10">View Report</button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <div className="bg-muted p-8 rounded-lg text-center">
              <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Maintenance History</h3>
              <p className="text-muted-foreground mb-4">View complete maintenance history for all vehicles</p>
              <div className="flex justify-center gap-4">
                <button className="px-4 py-2 rounded-md bg-primary text-white">All Vehicles</button>
                <button className="px-4 py-2 rounded-md border">By Vehicle</button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Upcoming Maintenance Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar size={18} className="text-primary" />
              <span>Upcoming Maintenance Calendar</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-7 gap-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="text-center text-sm font-medium py-2">{day}</div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => {
                const day = i - 3; // Start with last days of prev month
                const isCurrentMonth = day >= 0 && day < 30;
                const hasMaintenance = [5, 12, 18, 25].includes(day);
                
                return (
                  <div 
                    key={i} 
                    className={`
                      aspect-square flex flex-col items-center justify-start p-1 border rounded-md
                      ${isCurrentMonth ? "bg-background" : "bg-muted text-muted-foreground"}
                      ${hasMaintenance ? "border-primary" : "border-transparent"}
                    `}
                  >
                    <span className="text-sm">{isCurrentMonth ? day + 1 : (day < 0 ? 31 + day : day - 29)}</span>
                    {hasMaintenance && (
                      <div className="w-4 h-1 bg-primary rounded-full mt-1"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Maintenance;