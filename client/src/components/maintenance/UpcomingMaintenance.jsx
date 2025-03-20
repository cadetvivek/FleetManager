
import React from 'react';
import { Card } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

const UpcomingMaintenance = () => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Upcoming Maintenance Reminders</h2>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle</TableHead>
              <TableHead>Maintenance Type</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Current Mileage</TableHead>
              <TableHead>Due Mileage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="font-medium">Toyota Hilux</div>
                <div className="text-xs text-muted-foreground">ABC-1234</div>
              </TableCell>
              <TableCell>Oil Change</TableCell>
              <TableCell>Dec 15, 2023</TableCell>
              <TableCell>15,420 km</TableCell>
              <TableCell>16,000 km</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                  <span>Due Soon</span>
                </div>
              </TableCell>
              <TableCell>
                <button className="p-1 text-primary rounded hover:bg-primary/10">Schedule</button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Ford Transit</div>
                <div className="text-xs text-muted-foreground">XYZ-5678</div>
              </TableCell>
              <TableCell>Brake Inspection</TableCell>
              <TableCell>Dec 22, 2023</TableCell>
              <TableCell>28,750 km</TableCell>
              <TableCell>30,000 km</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                  <span>Due Soon</span>
                </div>
              </TableCell>
              <TableCell>
                <button className="p-1 text-primary rounded hover:bg-primary/10">Schedule</button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Volvo FH16</div>
                <div className="text-xs text-muted-foreground">GHI-3456</div>
              </TableCell>
              <TableCell>Full Service</TableCell>
              <TableCell>Jan 05, 2024</TableCell>
              <TableCell>32,450 km</TableCell>
              <TableCell>35,000 km</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  <span>Upcoming</span>
                </div>
              </TableCell>
              <TableCell>
                <button className="p-1 text-primary rounded hover:bg-primary/10">Schedule</button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default UpcomingMaintenance;
