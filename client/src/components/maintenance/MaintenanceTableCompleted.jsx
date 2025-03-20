
import React from 'react';
import { FileText } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

const MaintenanceTableCompleted = ({ completedMaintenance, getVehicleDetails, handleRecordSelect }) => {
  return (
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
                    <div className="w-2 h-2 bg-status-active rounded-full mr-2" />
                    <span>{record.status}</span>
                  </div>
                </TableCell>
                <TableCell>${record.cost.toLocaleString()}</TableCell>
                <TableCell>{record.technician}</TableCell>
                <TableCell>
                  <button className="p-1 text-primary rounded hover:bg-primary/10 flex items-center gap-1">
                    <FileText size={14} />
                    <span>Report</span>
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

export default MaintenanceTableCompleted;
