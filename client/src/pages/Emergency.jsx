import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { drivers, vehicles } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import MapView from '../components/ui/MapView';
import { AlertTriangle, MapPin, Phone, MessageSquare, User, Settings, Clock, AlertCircle, Shield, Bell, CheckCircle2 } from 'lucide-react';

const EmergencyContactCard = ({ contact, onEdit }) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="p-2 bg-primary/10 text-primary rounded-full mr-3">
            <User size={20} />
          </div>
          <div>
            <h3 className="font-medium">{contact.name}</h3>
            <p className="text-sm text-muted-foreground">{contact.role}</p>
          </div>
        </div>
        <button 
          onClick={() => onEdit(contact)} 
          className="p-1 text-primary rounded hover:bg-primary/10"
        >
          Edit
        </button>
      </div>
      <div className="mt-3 space-y-2">
        <div className="flex items-center text-sm">
          <Phone size={14} className="mr-2 text-muted-foreground" />
          <span>{contact.phone}</span>
        </div>
        <div className="flex items-center text-sm">
          <MessageSquare size={14} className="mr-2 text-muted-foreground" />
          <span>{contact.email}</span>
        </div>
        <div className="flex items-center text-sm">
          <MapPin size={14} className="mr-2 text-muted-foreground" />
          <span>{contact.location}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Emergency = () => {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  
  // Mock emergency alerts
  const emergencyAlerts = [
    {
      id: 1,
      type: 'sos',
      driver: drivers[2],
      vehicle: vehicles.find(v => v.id === drivers[2].assignedVehicle),
      timestamp: '2023-11-24 14:35:22',
      location: { lat: 34.0825, lng: -118.2748 },
      status: 'active',
      message: 'Vehicle breakdown on highway, need assistance',
      priority: 'high'
    },
    {
      id: 2,
      type: 'accident',
      driver: drivers[4],
      vehicle: vehicles.find(v => v.id === drivers[4].assignedVehicle),
      timestamp: '2023-11-24 13:15:47',
      location: { lat: 34.1478, lng: -118.1445 },
      status: 'resolved',
      message: 'Minor collision, no injuries, police report filed',
      priority: 'medium',
      resolvedAt: '2023-11-24 13:58:12'
    },
    {
      id: 3,
      type: 'medical',
      driver: drivers[1],
      vehicle: vehicles.find(v => v.id === drivers[1].assignedVehicle),
      timestamp: '2023-11-24 10:22:38',
      location: { lat: 34.0624, lng: -118.3652 },
      status: 'resolved',
      message: 'Driver experiencing chest pain, paramedics called',
      priority: 'high',
      resolvedAt: '2023-11-24 11:05:30'
    }
  ];
  
  // Mock emergency contacts
  const emergencyContacts = [
    {
      id: 1,
      name: 'Robert Johnson',
      role: 'Safety Manager',
      phone: '+1 (555) 123-4567',
      email: 'robert.johnson@fleetmanagerpro.com',
      location: 'Los Angeles HQ'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      role: 'Fleet Operations Director',
      phone: '+1 (555) 987-6543',
      email: 'maria.garcia@fleetmanagerpro.com',
      location: 'Los Angeles HQ'
    },
    {
      id: 3,
      name: 'Local Emergency Services',
      role: 'External Service',
      phone: '911',
      email: 'emergency@dispatch.gov',
      location: 'All Regions'
    }
  ];
  
  // Mock emergency response procedures
  const emergencyProcedures = [
    {
      title: 'Vehicle Accident Protocol',
      steps: [
        'Ensure driver safety and assess injuries',
        'Contact emergency services if needed',
        'Document the scene and collect information',
        'File incident report within 24 hours',
        'Follow up with insurance procedures'
      ]
    },
    {
      title: 'Breakdown Response',
      steps: [
        'Driver to move vehicle to safe location if possible',
        'Deploy hazard signals and safety equipment',
        'Contact dispatch for roadside assistance',
        'Arrange alternative transportation if necessary',
        'Schedule vehicle recovery'
      ]
    },
    {
      title: 'Medical Emergency',
      steps: [
        'Call 911 immediately for medical assistance',
        'Provide first aid if trained and necessary',
        'Notify fleet manager and family contacts',
        'Document all actions taken',
        'Follow up with wellness check'
      ]
    },
    {
      title: 'Severe Weather Protocol',
      steps: [
        'Monitor weather conditions and alerts',
        'Direct drivers to safe locations',
        'Suspend operations if conditions warrant',
        'Account for all vehicles and personnel',
        'Resume operations only when safe'
      ]
    }
  ];
  
  // Handle editing emergency contact
  const handleEditContact = (contact) => {
    console.log('Edit contact:', contact);
    // In a real app, this would open an edit modal or form
  };
  
  // Handle emergency alert selection
  const handleAlertSelect = (alert) => {
    setSelectedAlert(alert);
  };
  
  // Handle triggering emergency protocol
  const handleTriggerEmergency = () => {
    setIsEmergencyActive(!isEmergencyActive);
    // In a real app, this would trigger emergency protocols and notifications
  };
  
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Emergency Response</h1>
            <p className="text-muted-foreground">Manage emergency situations and responses for your fleet</p>
          </div>
          <button 
            className={`px-4 py-2 rounded-md text-white ${
              isEmergencyActive 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-status-inactive hover:bg-status-inactive/90'
            }`}
            onClick={handleTriggerEmergency}
          >
            {isEmergencyActive ? 'Deactivate Emergency' : 'Trigger Emergency Protocol'}
          </button>
        </div>
        
        {isEmergencyActive && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300 animate-pulse">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 mr-3" />
              <div>
                <h2 className="text-lg font-bold">Emergency Protocol Active</h2>
                <p>All emergency contacts have been notified. Response team is mobilizing.</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Emergency Alerts Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle size={18} className="text-status-inactive" />
                  <span>Emergency Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyAlerts.length > 0 ? (
                    emergencyAlerts.map(alert => (
                      <div 
                        key={alert.id} 
                        className={`
                          p-3 rounded-lg cursor-pointer transition-colors
                          ${selectedAlert?.id === alert.id 
                            ? 'bg-primary/10 border border-primary/20' 
                            : 'bg-muted hover:bg-muted/80 border border-transparent'}
                          ${alert.status === 'active' ? 'animate-pulse' : ''}
                        `}
                        onClick={() => handleAlertSelect(alert)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <div className={`
                              p-1.5 rounded-full mr-2
                              ${alert.priority === 'high' 
                                ? 'bg-status-inactive/20 text-status-inactive' 
                                : 'bg-status-maintenance/20 text-status-maintenance'}
                            `}>
                              <AlertTriangle size={14} />
                            </div>
                            <div>
                              <div className="font-medium capitalize">
                                {alert.type} Alert
                              </div>
                              <div className="text-xs text-muted-foreground flex items-center">
                                <Clock size={10} className="mr-1" />
                                {alert.timestamp}
                              </div>
                            </div>
                          </div>
                          {alert.status === 'active' ? (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-status-inactive/10 text-status-inactive">
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-status-active/10 text-status-active">
                              Resolved
                            </span>
                          )}
                        </div>
                        
                        <div className="text-sm mb-2">
                          {alert.message}
                        </div>
                        
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <User size={10} className="mr-1" />
                            {alert.driver.name}
                          </div>
                          <div>
                            {alert.vehicle.make} {alert.vehicle.model}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <CheckCircle2 className="h-8 w-8 mx-auto text-status-active mb-2" />
                      <p className="text-muted-foreground">No active emergencies</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell size={18} className="text-primary" />
                  <span>Emergency Contacts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyContacts.map(contact => (
                    <EmergencyContactCard
                      key={contact.id}
                      contact={contact}
                      onEdit={handleEditContact}
                    />
                  ))}
                  <button className="w-full p-2 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-primary hover:bg-primary/5 text-sm">
                    + Add Emergency Contact
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Map and Details */}
          <div className="lg:col-span-2 space-y-6">
            {selectedAlert ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <AlertCircle size={18} className="text-status-inactive" />
                      <span>{selectedAlert.type.toUpperCase()} Alert Details</span>
                    </div>
                    {selectedAlert.status === 'active' && (
                      <button className="px-3 py-1 bg-status-active text-white text-sm rounded-md">
                        Mark Resolved
                      </button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Alert Information</h3>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-2 bg-muted rounded-md">
                              <p className="text-xs text-muted-foreground">Type</p>
                              <p className="text-sm font-medium capitalize">{selectedAlert.type}</p>
                            </div>
                            <div className="p-2 bg-muted rounded-md">
                              <p className="text-xs text-muted-foreground">Priority</p>
                              <p className={`text-sm font-medium ${
                                selectedAlert.priority === 'high' 
                                  ? 'text-status-inactive' 
                                  : selectedAlert.priority === 'medium'
                                    ? 'text-status-maintenance'
                                    : 'text-status-active'
                              }`}>
                                {selectedAlert.priority.toUpperCase()}
                              </p>
                            </div>
                            <div className="p-2 bg-muted rounded-md">
                              <p className="text-xs text-muted-foreground">Status</p>
                              <p className={`text-sm font-medium ${
                                selectedAlert.status === 'active' 
                                  ? 'text-status-inactive' 
                                  : 'text-status-active'
                              }`}>
                                {selectedAlert.status.toUpperCase()}
                              </p>
                            </div>
                            <div className="p-2 bg-muted rounded-md">
                              <p className="text-xs text-muted-foreground">Reported</p>
                              <p className="text-sm font-medium">{selectedAlert.timestamp}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium mb-2">Driver Information</h3>
                          <div className="flex items-center mb-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                              <img 
                                src={selectedAlert.driver.profileImage} 
                                alt={selectedAlert.driver.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{selectedAlert.driver.name}</p>
                              <p className="text-xs text-muted-foreground">{selectedAlert.driver.phone}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-2 bg-muted rounded-md">
                              <p className="text-xs text-muted-foreground">License</p>
                              <p className="text-sm">{selectedAlert.driver.licenseNumber}</p>
                            </div>
                            <div className="p-2 bg-muted rounded-md">
                              <p className="text-xs text-muted-foreground">Emergency Contact</p>
                              <p className="text-sm">On File</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium mb-2">Vehicle Information</h3>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-2 bg-muted rounded-md">
                              <p className="text-xs text-muted-foreground">Vehicle</p>
                              <p className="text-sm">{selectedAlert.vehicle.make} {selectedAlert.vehicle.model}</p>
                            </div>
                            <div className="p-2 bg-muted rounded-md">
                              <p className="text-xs text-muted-foreground">License Plate</p>
                              <p className="text-sm">{selectedAlert.vehicle.licensePlate}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Alert Location</h3>
                      <div className="h-[250px] bg-muted rounded-lg overflow-hidden mb-3">
                        <MapView
                          vehicles={[selectedAlert.vehicle]}
                          height={250}
                          center={selectedAlert.location}
                          zoom={13}
                        />
                      </div>
                      <div className="p-3 bg-muted rounded-md mb-3">
                        <p className="text-xs text-muted-foreground">Emergency Message</p>
                        <p className="text-sm font-medium">{selectedAlert.message}</p>
                      </div>
                      
                      {selectedAlert.status === 'active' ? (
                        <div className="space-y-2">
                          <button className="w-full p-2 bg-primary text-white rounded-md text-sm">
                            Contact Driver
                          </button>
                          <button className="w-full p-2 border border-primary text-primary rounded-md text-sm">
                            Dispatch Emergency Services
                          </button>
                          <button className="w-full p-2 border border-gray-300 dark:border-gray-700 text-sm rounded-md">
                            View Response Protocol
                          </button>
                        </div>
                      ) : (
                        <div className="p-3 bg-status-active/10 text-status-active rounded-md">
                          <div className="flex items-center mb-1">
                            <CheckCircle2 size={16} className="mr-2" />
                            <p className="font-medium">Alert Resolved</p>
                          </div>
                          <p className="text-xs">Resolved at: {selectedAlert.resolvedAt}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Response Timeline</h3>
                    <div className="relative pl-6 border-l border-gray-300 dark:border-gray-700 space-y-4">
                      <div className="relative">
                        <div className="absolute w-3 h-3 bg-status-inactive rounded-full -left-7"></div>
                        <div>
                          <p className="text-xs text-muted-foreground">{selectedAlert.timestamp}</p>
                          <p className="text-sm font-medium">Emergency alert triggered by driver</p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute w-3 h-3 bg-status-maintenance rounded-full -left-7"></div>
                        <div>
                          <p className="text-xs text-muted-foreground">{
                            new Date(new Date(selectedAlert.timestamp).getTime() + 2 * 60 * 1000).toLocaleString()
                          }</p>
                          <p className="text-sm font-medium">Fleet manager notified</p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute w-3 h-3 bg-status-maintenance rounded-full -left-7"></div>
                        <div>
                          <p className="text-xs text-muted-foreground">{
                            new Date(new Date(selectedAlert.timestamp).getTime() + 5 * 60 * 1000).toLocaleString()
                          }</p>
                          <p className="text-sm font-medium">Contact established with driver</p>
                        </div>
                      </div>
                      {selectedAlert.status === 'resolved' && (
                        <div className="relative">
                          <div className="absolute w-3 h-3 bg-status-active rounded-full -left-7"></div>
                          <div>
                            <p className="text-xs text-muted-foreground">{selectedAlert.resolvedAt}</p>
                            <p className="text-sm font-medium">Emergency resolved</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin size={18} className="text-primary" />
                    <span>Fleet Location Map</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[400px] bg-muted rounded-md overflow-hidden mb-3">
                    <MapView
                      vehicles={vehicles}
                      height={400}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Vehicles on map:</span> {vehicles.length}
                    </div>
                    <div className="flex space-x-3 text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-status-active mr-1"></div>
                        <span>Active</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-status-maintenance mr-1"></div>
                        <span>Maintenance</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-status-inactive mr-1"></div>
                        <span>Inactive</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield size={18} className="text-primary" />
                  <span>Emergency Response Procedures</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {emergencyProcedures.map((procedure, index) => (
                    <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h3 className="font-medium mb-3">{procedure.title}</h3>
                      <ol className="space-y-2">
                        {procedure.steps.map((step, i) => (
                          <li key={i} className="flex items-start">
                            <span className="flex items-center justify-center h-5 w-5 rounded-full bg-muted text-xs font-medium mr-2 mt-0.5">{i + 1}</span>
                            <span className="text-sm">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings size={18} className="text-primary" />
                  <span>Emergency System Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Automatic Emergency Services Notification</h3>
                      <p className="text-xs text-muted-foreground">Automatically notify emergency services for high priority alerts</p>
                    </div>
                    <div className="h-5 w-10 bg-primary rounded-full relative">
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">SMS Notifications</h3>
                      <p className="text-xs text-muted-foreground">Send SMS alerts to emergency contacts</p>
                    </div>
                    <div className="h-5 w-10 bg-primary rounded-full relative">
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Automatic Crash Detection</h3>
                      <p className="text-xs text-muted-foreground">Use vehicle sensors to detect potential crashes</p>
                    </div>
                    <div className="h-5 w-10 bg-primary rounded-full relative">
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Emergency Audio Channel</h3>
                      <p className="text-xs text-muted-foreground">Enable audio communication during emergencies</p>
                    </div>
                    <div className="h-5 w-10 bg-gray-300 dark:bg-gray-700 rounded-full relative">
                      <div className="absolute left-1 top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Emergency Test Schedule</label>
                      <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-background">
                        <option>Monthly</option>
                        <option>Quarterly</option>
                        <option>Bi-annually</option>
                        <option>Annually</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Default Emergency Priority</label>
                      <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-background">
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Emergency;
