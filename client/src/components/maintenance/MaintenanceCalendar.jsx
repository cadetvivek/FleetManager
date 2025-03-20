
import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/card';

const MaintenanceCalendar = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar size={18} className="text-primary" />
          <span>Maintenance Calendar</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-medium">November 2023</div>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded-md hover:bg-muted">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="px-2 py-1 text-sm rounded-md hover:bg-muted">Today</button>
            <button className="p-1 rounded-md hover:bg-muted">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 text-sm rounded-md bg-primary/10 text-primary">Month</button>
            <button className="px-2 py-1 text-sm rounded-md hover:bg-muted">Week</button>
            <button className="px-2 py-1 text-sm rounded-md hover:bg-muted">Day</button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="text-center text-sm font-medium py-2">{day}</div>
          ))}
          {Array.from({ length: 35 }).map((_, i) => {
            const day = i - 3; // Start with last days of prev month
            const isCurrentMonth = day >= 0 && day < 30;
            const isToday = day === 15;
            const hasMaintenance = [5, 12, 18, 25, 28].includes(day);
            const hasOverdue = [3, 10].includes(day);
            const hasCompleted = [8, 20].includes(day);
            
            return (
              <div 
                key={i} 
                className={`
                  aspect-square flex flex-col items-center p-1 border rounded-md relative
                  ${isToday ? "border-primary bg-primary/5" : "border-transparent"}
                  ${isCurrentMonth ? "bg-background" : "bg-muted text-muted-foreground"}
                  hover:bg-muted/80 cursor-pointer
                `}
              >
                <span className={`text-sm ${isToday ? "font-bold text-primary" : ""}`}>
                  {isCurrentMonth ? day + 1 : (day < 0 ? 31 + day : day - 29)}
                </span>
                
                {hasMaintenance && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-status-maintenance rounded-full"></div>
                  </div>
                )}
                
                {hasOverdue && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-status-inactive rounded-full"></div>
                  </div>
                )}
                
                {hasCompleted && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-status-active rounded-full"></div>
                  </div>
                )}
                
                {hasMaintenance && day === 18 && (
                  <div className="mt-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-1 rounded leading-tight">
                    3 maint.
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="flex items-center justify-center space-x-4 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-status-maintenance mr-1"></div>
            <span className="text-sm">Scheduled</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-status-inactive mr-1"></div>
            <span className="text-sm">Overdue</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-status-active mr-1"></div>
            <span className="text-sm">Completed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaintenanceCalendar;
