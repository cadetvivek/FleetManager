
// Mock data for FleetManagerPro

// Vehicle statuses
export const VEHICLE_STATUSES = {
  ACTIVE: 'active',
  MAINTENANCE: 'maintenance',
  INACTIVE: 'inactive'
};

// Driver statuses
export const DRIVER_STATUSES = {
  AVAILABLE: 'available',
  ON_DUTY: 'on-duty',
  OFF_DUTY: 'off-duty',
  ON_LEAVE: 'on-leave'
};

// Mock Vehicles Data
export const vehicles = [
  {
    id: 1,
    licensePlate: 'ABC-1234',
    make: 'Toyota',
    model: 'Hilux',
    year: 2022,
    type: 'Pickup',
    status: VEHICLE_STATUSES.ACTIVE,
    mileage: 15420,
    fuelType: 'Diesel',
    fuelEfficiency: 14.2, // km/l
    lastMaintenance: '2023-07-15',
    nextMaintenance: '2024-01-15',
    assignedDriver: 3,
    location: { lat: 34.0522, lng: -118.2437 },
    image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?ixlib=rb-4.0.3'
  },
  {
    id: 2,
    licensePlate: 'XYZ-5678',
    make: 'Ford',
    model: 'Transit',
    year: 2021,
    type: 'Van',
    status: VEHICLE_STATUSES.ACTIVE,
    mileage: 28750,
    fuelType: 'Petrol',
    fuelEfficiency: 11.8,
    lastMaintenance: '2023-08-22',
    nextMaintenance: '2024-02-22',
    assignedDriver: 1,
    location: { lat: 34.0624, lng: -118.3652 },
    image: 'https://images.unsplash.com/photo-1630513483672-94f6e4eebdb1?ixlib=rb-4.0.3'
  },
  {
    id: 3,
    licensePlate: 'DEF-9012',
    make: 'Mercedes-Benz',
    model: 'Actros',
    year: 2020,
    type: 'Heavy Truck',
    status: VEHICLE_STATUSES.MAINTENANCE,
    mileage: 45680,
    fuelType: 'Diesel',
    fuelEfficiency: 8.5,
    lastMaintenance: '2023-06-10',
    nextMaintenance: '2023-12-10',
    assignedDriver: 5,
    location: { lat: 34.1478, lng: -118.1445 },
    image: 'https://images.unsplash.com/photo-1627283375431-b90a9f2144e7?ixlib=rb-4.0.3'
  },
  {
    id: 4,
    licensePlate: 'GHI-3456',
    make: 'Volvo',
    model: 'FH16',
    year: 2021,
    type: 'Heavy Truck',
    status: VEHICLE_STATUSES.ACTIVE,
    mileage: 32450,
    fuelType: 'Diesel',
    fuelEfficiency: 9.2,
    lastMaintenance: '2023-09-05',
    nextMaintenance: '2024-03-05',
    assignedDriver: 2,
    location: { lat: 34.0825, lng: -118.2748 },
    image: 'https://images.unsplash.com/photo-1592805144716-feaddaaa4ede?ixlib=rb-4.0.3'
  },
  {
    id: 5,
    licensePlate: 'JKL-7890',
    make: 'Isuzu',
    model: 'NPR',
    year: 2019,
    type: 'Medium Truck',
    status: VEHICLE_STATUSES.INACTIVE,
    mileage: 67890,
    fuelType: 'Diesel',
    fuelEfficiency: 10.4,
    lastMaintenance: '2023-04-18',
    nextMaintenance: '2023-10-18',
    assignedDriver: null,
    location: { lat: 34.0224, lng: -118.2851 },
    image: 'https://images.unsplash.com/photo-1626444344029-5c680f7c6c53?ixlib=rb-4.0.3'
  },
  {
    id: 6,
    licensePlate: 'MNO-1234',
    make: 'Mitsubishi',
    model: 'Fuso',
    year: 2022,
    type: 'Medium Truck',
    status: VEHICLE_STATUSES.ACTIVE,
    mileage: 12340,
    fuelType: 'Diesel',
    fuelEfficiency: 12.1,
    lastMaintenance: '2023-10-12',
    nextMaintenance: '2024-04-12',
    assignedDriver: 4,
    location: { lat: 34.0902, lng: -118.3762 },
    image: 'https://images.unsplash.com/photo-1647334419426-879a38ba3f2c?ixlib=rb-4.0.3'
  }
];

// Mock Drivers Data
export const drivers = [
  {
    id: 1,
    name: 'John Smith',
    licenseNumber: 'DL123456789',
    licenseExpiry: '2025-06-30',
    age: 35,
    phone: '+1 (555) 123-4567',
    email: 'john.smith@example.com',
    address: '123 Fleet St, Los Angeles, CA',
    status: DRIVER_STATUSES.ON_DUTY,
    employmentDate: '2019-04-15',
    rating: 4.8,
    drivingScore: 92,
    assignedVehicle: 2,
    tripCount: 782,
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    licenseNumber: 'DL987654321',
    licenseExpiry: '2026-02-15',
    age: 29,
    phone: '+1 (555) 987-6543',
    email: 'sarah.johnson@example.com',
    address: '456 Transport Ave, Los Angeles, CA',
    status: DRIVER_STATUSES.AVAILABLE,
    employmentDate: '2020-07-22',
    rating: 4.7,
    drivingScore: 94,
    assignedVehicle: 4,
    tripCount: 542,
    profileImage: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 3,
    name: 'Michael Brown',
    licenseNumber: 'DL456789123',
    licenseExpiry: '2024-11-10',
    age: 42,
    phone: '+1 (555) 456-7890',
    email: 'michael.brown@example.com',
    address: '789 Logistics Blvd, Los Angeles, CA',
    status: DRIVER_STATUSES.ON_DUTY,
    employmentDate: '2018-01-30',
    rating: 4.5,
    drivingScore: 89,
    assignedVehicle: 1,
    tripCount: 947,
    profileImage: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: 4,
    name: 'Emily Davis',
    licenseNumber: 'DL789123456',
    licenseExpiry: '2025-08-20',
    age: 31,
    phone: '+1 (555) 789-0123',
    email: 'emily.davis@example.com',
    address: '321 Shipping Lane, Los Angeles, CA',
    status: DRIVER_STATUSES.OFF_DUTY,
    employmentDate: '2021-03-15',
    rating: 4.9,
    drivingScore: 97,
    assignedVehicle: 6,
    tripCount: 328,
    profileImage: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    id: 5,
    name: 'David Wilson',
    licenseNumber: 'DL321654987',
    licenseExpiry: '2026-05-12',
    age: 38,
    phone: '+1 (555) 321-6549',
    email: 'david.wilson@example.com',
    address: '654 Carrier Road, Los Angeles, CA',
    status: DRIVER_STATUSES.ON_LEAVE,
    employmentDate: '2019-09-10',
    rating: 4.6,
    drivingScore: 91,
    assignedVehicle: 3,
    tripCount: 673,
    profileImage: 'https://randomuser.me/api/portraits/men/5.jpg'
  }
];

// Mock Maintenance Records
export const maintenanceRecords = [
  {
    id: 1,
    vehicleId: 3,
    type: 'Engine Overhaul',
    date: '2023-11-28',
    status: 'Scheduled',
    cost: 3500,
    notes: 'Complete engine overhaul needed due to excessive mileage',
    technician: 'Mike Richards'
  },
  {
    id: 2,
    vehicleId: 1,
    type: 'Oil Change',
    date: '2024-01-15',
    status: 'Scheduled',
    cost: 150,
    notes: 'Regular maintenance oil change',
    technician: 'Sarah Thompson'
  },
  {
    id: 3,
    vehicleId: 2,
    type: 'Brake Replacement',
    date: '2024-02-22',
    status: 'Scheduled',
    cost: 800,
    notes: 'Replace front and rear brake pads',
    technician: 'John Miller'
  },
  {
    id: 4,
    vehicleId: 5,
    type: 'Tire Rotation',
    date: '2023-10-18',
    status: 'Completed',
    cost: 120,
    notes: 'Regular tire rotation and pressure check',
    technician: 'Alex Johnson'
  },
  {
    id: 5,
    vehicleId: 4,
    type: 'Transmission Service',
    date: '2024-03-05',
    status: 'Scheduled',
    cost: 1200,
    notes: 'Transmission fluid change and inspection',
    technician: 'Lisa Garcia'
  }
];

// Mock Trips Data
export const trips = [
  {
    id: 1,
    driverId: 3,
    vehicleId: 1,
    startLocation: 'Los Angeles, CA',
    endLocation: 'San Diego, CA',
    startTime: '2023-11-20T08:00:00',
    endTime: '2023-11-20T11:30:00',
    distance: 120.5,
    fuelConsumed: 8.7,
    purpose: 'Delivery',
    status: 'Completed',
    notes: 'Delivered on time, no issues'
  },
  {
    id: 2,
    driverId: 1,
    vehicleId: 2,
    startLocation: 'Los Angeles, CA',
    endLocation: 'San Francisco, CA',
    startTime: '2023-11-21T07:15:00',
    endTime: '2023-11-21T16:45:00',
    distance: 380.2,
    fuelConsumed: 32.5,
    purpose: 'Long Haul Delivery',
    status: 'Completed',
    notes: 'Traffic delay on I-5, arrived 30 minutes late'
  },
  {
    id: 3,
    driverId: 5,
    vehicleId: 3,
    startLocation: 'Los Angeles, CA',
    endLocation: 'Las Vegas, NV',
    startTime: '2023-11-22T06:30:00',
    endTime: '2023-11-22T12:15:00',
    distance: 270.8,
    fuelConsumed: 31.9,
    purpose: 'Equipment Transport',
    status: 'Completed',
    notes: 'Hot weather caused increased fuel consumption'
  },
  {
    id: 4,
    driverId: 2,
    vehicleId: 4,
    startLocation: 'Los Angeles, CA',
    endLocation: 'Phoenix, AZ',
    startTime: '2023-11-23T05:45:00',
    endTime: '2023-11-23T13:30:00',
    distance: 370.3,
    fuelConsumed: 40.2,
    purpose: 'Client Visit',
    status: 'In Progress',
    notes: 'Scheduled return on 11/24'
  },
  {
    id: 5,
    driverId: 4,
    vehicleId: 6,
    startLocation: 'Los Angeles, CA',
    endLocation: 'Santa Barbara, CA',
    startTime: '2023-11-24T09:00:00',
    endTime: '2023-11-24T11:45:00',
    distance: 95.1,
    fuelConsumed: 7.8,
    purpose: 'Sample Pickup',
    status: 'Scheduled',
    notes: 'High priority delivery'
  }
];

// Mock Fuel Logs
export const fuelLogs = [
  {
    id: 1,
    vehicleId: 1,
    date: '2023-11-18',
    amount: 45.5, // liters
    cost: 78.32,
    odometer: 15320,
    station: 'Shell',
    filledBy: 'Michael Brown'
  },
  {
    id: 2,
    vehicleId: 2,
    date: '2023-11-19',
    amount: 52.3,
    cost: 89.95,
    odometer: 28650,
    station: 'Chevron',
    filledBy: 'John Smith'
  },
  {
    id: 3,
    vehicleId: 4,
    date: '2023-11-20',
    amount: 68.7,
    cost: 118.24,
    odometer: 32380,
    station: 'Exxon',
    filledBy: 'Sarah Johnson'
  },
  {
    id: 4,
    vehicleId: 6,
    date: '2023-11-21',
    amount: 42.1,
    cost: 72.42,
    odometer: 12280,
    station: 'Mobil',
    filledBy: 'Emily Davis'
  },
  {
    id: 5,
    vehicleId: 1,
    date: '2023-11-22',
    amount: 40.8,
    cost: 70.18,
    odometer: 15420,
    station: 'Shell',
    filledBy: 'Michael Brown'
  }
];

// Mock Geofences
export const geofences = [
  {
    id: 1,
    name: 'Los Angeles HQ',
    type: 'Circle',
    center: { lat: 34.0522, lng: -118.2437 },
    radius: 5000, // meters
    color: '#3B82F6',
    description: 'Company headquarters and main depot'
  },
  {
    id: 2,
    name: 'LAX Restricted Zone',
    type: 'Polygon',
    coordinates: [
      { lat: 33.9416, lng: -118.4085 },
      { lat: 33.9416, lng: -118.3900 },
      { lat: 33.9300, lng: -118.3900 },
      { lat: 33.9300, lng: -118.4085 }
    ],
    color: '#EF4444',
    description: 'No parking zone near LAX airport'
  },
  {
    id: 3,
    name: 'Long Beach Port',
    type: 'Circle',
    center: { lat: 33.7701, lng: -118.1937 },
    radius: 3000,
    color: '#10B981',
    description: 'Port operation area for pickups and deliveries'
  },
  {
    id: 4,
    name: 'Warehouse District',
    type: 'Polygon',
    coordinates: [
      { lat: 34.0390, lng: -118.2370 },
      { lat: 34.0390, lng: -118.2270 },
      { lat: 34.0310, lng: -118.2270 },
      { lat: 34.0310, lng: -118.2370 }
    ],
    color: '#F59E0B',
    description: 'Industrial area with multiple warehouses'
  }
];

// Mock Users
export const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@fleetmanagerpro.com',
    role: 'admin',
    lastLogin: '2023-11-22T08:45:22',
    permissions: ['all'],
    status: 'active'
  },
  {
    id: 2,
    name: 'Manager User',
    email: 'manager@fleetmanagerpro.com',
    role: 'manager',
    lastLogin: '2023-11-21T14:30:10',
    permissions: ['vehicles', 'drivers', 'trips', 'maintenance', 'reports-limited'],
    status: 'active'
  },
  {
    id: 3,
    name: 'Driver User',
    email: 'driver@fleetmanagerpro.com',
    role: 'driver',
    lastLogin: '2023-11-20T17:15:45',
    permissions: ['trips-own', 'vehicle-assigned', 'maintenance-report'],
    status: 'active'
  }
];

// Dashboard summary stats
export const dashboardStats = {
  totalVehicles: vehicles.length,
  activeVehicles: vehicles.filter(v => v.status === VEHICLE_STATUSES.ACTIVE).length,
  vehiclesInMaintenance: vehicles.filter(v => v.status === VEHICLE_STATUSES.MAINTENANCE).length,
  inactiveVehicles: vehicles.filter(v => v.status === VEHICLE_STATUSES.INACTIVE).length,
  
  totalDrivers: drivers.length,
  availableDrivers: drivers.filter(d => d.status === DRIVER_STATUSES.AVAILABLE).length,
  onDutyDrivers: drivers.filter(d => d.status === DRIVER_STATUSES.ON_DUTY).length,
  offDutyDrivers: drivers.filter(d => d.status === DRIVER_STATUSES.OFF_DUTY).length,
  
  totalTripsMonth: 127,
  totalDistanceMonth: 24650,
  fuelConsumedMonth: 2345,
  maintenanceCostsMonth: 8750,
  
  recentAlerts: [
    { id: 1, type: 'vehicle', message: 'Vehicle #3 maintenance overdue', time: '2 hours ago', severity: 'high' },
    { id: 2, type: 'geofence', message: 'Vehicle #2 entered restricted area', time: '4 hours ago', severity: 'medium' },
    { id: 3, type: 'driver', message: 'Driver #5 exceeded max driving hours', time: '1 day ago', severity: 'medium' },
    { id: 4, type: 'system', message: 'System backup completed', time: '2 days ago', severity: 'low' }
  ]
};

// Chart data for dashboard
export const fuelConsumptionChart = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      name: 'Actual',
      data: [1200, 1150, 1300, 1250, 1400, 1350, 1300, 1450, 1500, 1550, 1500, 1450]
    },
    {
      name: 'Expected',
      data: [1100, 1100, 1100, 1100, 1100, 1200, 1200, 1200, 1300, 1300, 1300, 1300]
    }
  ]
};

export const maintenanceCostChart = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      name: 'Scheduled',
      data: [4500, 3200, 5100, 2800, 4200, 3800, 5500, 4000, 3700, 4800, 5200, 4500]
    },
    {
      name: 'Unscheduled',
      data: [1200, 2300, 800, 3100, 1500, 900, 1300, 2500, 1800, 2200, 1100, 1700]
    }
  ]
};

export const vehicleUtilizationChart = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      name: 'Sedans',
      data: [78, 82, 75, 80]
    },
    {
      name: 'Vans',
      data: [65, 70, 68, 72]
    },
    {
      name: 'Trucks',
      data: [92, 88, 90, 85]
    }
  ]
};

export const driverPerformanceChart = {
  labels: ['Safety Score', 'On-Time %', 'Efficiency', 'Compliance', 'Customer Rating'],
  datasets: [
    {
      name: 'Avg Score',
      data: [85, 92, 78, 95, 88]
    }
  ]
};
