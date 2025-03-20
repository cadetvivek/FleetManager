
import React from 'react';
import { Calendar, CheckCircle2, AlertTriangle, Wrench } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';

const MaintenanceStats = ({ stats }) => {
  return (
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
            <CheckCircle2 size={20} />
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
  );
};

export default MaintenanceStats;
