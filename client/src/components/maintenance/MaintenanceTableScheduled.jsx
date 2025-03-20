
import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

const MaintenanceTableScheduled = ({ scheduledMaintenance, getVehicleDetails, handleRecordSelect }) => {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center cursor-pointer">
                Vehicle <ArrowUpDown size={14} className="ml-1" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center cursor-pointer">
                Type <ArrowUpDown size={14} className="ml-1" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center cursor-pointer">
                Date <ArrowUpDown size={14} className="ml-1" />
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <div className="flex items-center cursor-pointer">
                Estimated Cost <ArrowUpDown size={14} className="ml-1" />
              </div>
            </TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scheduledMaintenance.map(record => {
            const vehicle = getVehicleDetails(record.vehicleId);
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
  );
};

export default MaintenanceTableScheduled;
