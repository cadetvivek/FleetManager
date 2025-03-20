
import React from 'react';
import { Card } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

const MaintenanceTableOverdue = ({ overdueMaintenance, getVehicleDetails, handleRecordSelect }) => {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vehicle</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Original Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Days Overdue</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {overdueMaintenance.map(record => {
            const vehicle = getVehicleDetails(record.vehicleId);
            const currentDate = new Date();
            const scheduledDate = new Date(record.date);
            const daysOverdue = Math.floor((currentDate - scheduledDate) / (1000 * 60 * 60 * 24));
            
            return (
              <TableRow key={record.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleRecordSelect(record)}>
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
                    <div className="w-2 h-2 bg-status-inactive rounded-full mr-2" />
                    <span className="text-status-inactive font-medium">Overdue</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-status-inactive font-medium">{daysOverdue} days</span>
                </TableCell>
                <TableCell>{record.technician}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button className="p-1 text-primary rounded hover:bg-primary/10">Reschedule</button>
                    <button className="p-1 rounded bg-status-inactive/10 text-status-inactive hover:bg-status-inactive/20">
                      Urgent
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

export default MaintenanceTableOverdue;
