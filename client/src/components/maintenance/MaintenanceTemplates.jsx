
import React from 'react';
import { Settings, Tool, Calendar } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';

const MaintenanceTemplates = () => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Maintenance Templates</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium">Regular Service</h3>
              <div className="p-1.5 bg-primary/10 text-primary rounded-full">
                <Settings size={16} />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Standard maintenance package including oil change, fluid checks, and basic inspections</p>
            <div className="flex justify-between text-sm">
              <span>Est. time: 1-2 hours</span>
              <span className="font-medium">$150 - $200</span>
            </div>
            <button className="w-full mt-3 py-1.5 border border-primary text-primary rounded-md hover:bg-primary/5 text-sm">
              Use Template
            </button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium">Major Service</h3>
              <div className="p-1.5 bg-primary/10 text-primary rounded-full">
                <Tool size={16} />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Comprehensive maintenance including filters, belts, brake inspection, and full diagnostic</p>
            <div className="flex justify-between text-sm">
              <span>Est. time: 3-4 hours</span>
              <span className="font-medium">$350 - $500</span>
            </div>
            <button className="w-full mt-3 py-1.5 border border-primary text-primary rounded-md hover:bg-primary/5 text-sm">
              Use Template
            </button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium">Seasonal Check</h3>
              <div className="p-1.5 bg-primary/10 text-primary rounded-full">
                <Calendar size={16} />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Pre-season inspection to ensure vehicle readiness for weather conditions</p>
            <div className="flex justify-between text-sm">
              <span>Est. time: 1 hour</span>
              <span className="font-medium">$75 - $125</span>
            </div>
            <button className="w-full mt-3 py-1.5 border border-primary text-primary rounded-md hover:bg-primary/5 text-sm">
              Use Template
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MaintenanceTemplates;
