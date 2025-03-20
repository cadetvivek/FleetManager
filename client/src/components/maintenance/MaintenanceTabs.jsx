
import React from 'react';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Card } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import MaintenanceTableScheduled from './MaintenanceTableScheduled';
import MaintenanceTableOverdue from './MaintenanceTableOverdue';
import MaintenanceTableCompleted from './MaintenanceTableCompleted';

const MaintenanceTabs = ({
  viewMode,
  setViewMode,
  scheduledMaintenance,
  completedMaintenance,
  overdueMaintenance,
  getVehicleDetails,
  handleRecordSelect
}) => {
  return (
    <Tabs defaultValue="scheduled" className="mb-6" onValueChange={setViewMode}>
      <TabsList>
        <TabsTrigger value="scheduled" className="flex items-center gap-1">
          <Calendar size={16} />
          <span>Scheduled ({scheduledMaintenance.length})</span>
        </TabsTrigger>
        <TabsTrigger value="overdue">
          <div className="flex items-center gap-1 text-status-inactive">
            <AlertTriangle size={16} />
            <span>Overdue ({overdueMaintenance.length})</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="completed">Completed ({completedMaintenance.length})</TabsTrigger>
        <TabsTrigger value="history">Maintenance History</TabsTrigger>
      </TabsList>
      
      <TabsContent value="scheduled" className="mt-4">
        <MaintenanceTableScheduled 
          scheduledMaintenance={scheduledMaintenance}
          getVehicleDetails={getVehicleDetails}
          handleRecordSelect={handleRecordSelect}
        />
      </TabsContent>
      
      <TabsContent value="overdue" className="mt-4">
        <MaintenanceTableOverdue 
          overdueMaintenance={overdueMaintenance}
          getVehicleDetails={getVehicleDetails}
          handleRecordSelect={handleRecordSelect}
        />
      </TabsContent>
      
      <TabsContent value="completed" className="mt-4">
        <MaintenanceTableCompleted 
          completedMaintenance={completedMaintenance}
          getVehicleDetails={getVehicleDetails}
          handleRecordSelect={handleRecordSelect}
        />
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
  );
};

export default MaintenanceTabs;
