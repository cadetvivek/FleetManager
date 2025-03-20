
import React from 'react';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';

const AddMaintenanceForm = ({ onClose, vehicles, maintenanceTypes }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-2xl w-full mx-4">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold">Schedule Maintenance</h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <span className="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle">Vehicle</Label>
                <select 
                  id="vehicle" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option value="">Select Vehicle</option>
                  {vehicles.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maintenance-type">Maintenance Type</Label>
                <select 
                  id="maintenance-type" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option value="">Select Type</option>
                  {maintenanceTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Scheduled Date</Label>
                <Input 
                  id="date" 
                  type="date" 
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cost">Estimated Cost ($)</Label>
                <Input 
                  id="cost" 
                  type="number" 
                  placeholder="0.00" 
                  min="0" 
                  step="0.01"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="technician">Assigned Technician</Label>
                <Input 
                  id="technician" 
                  type="text" 
                  placeholder="Enter technician name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <select 
                  id="priority" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                placeholder="Enter maintenance details and notes"
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="parts">Required Parts</Label>
              <div className="p-3 border border-dashed border-gray-300 dark:border-gray-700 rounded-md">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input placeholder="Part name" className="flex-1" />
                    <Input placeholder="Part number" className="flex-1" />
                    <Input placeholder="Cost" type="number" min="0" step="0.01" className="w-24" />
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Part name" className="flex-1" />
                    <Input placeholder="Part number" className="flex-1" />
                    <Input placeholder="Cost" type="number" min="0" step="0.01" className="w-24" />
                  </div>
                  <button type="button" className="text-sm text-primary hover:underline">
                    + Add another part
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                <span>Send notification to assigned technician</span>
              </Label>
              <Label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                <span>Send notification to vehicle manager</span>
              </Label>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button 
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button 
                type="button"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Schedule Maintenance
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMaintenanceForm;
