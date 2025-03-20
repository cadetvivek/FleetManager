
import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatCard from '../components/ui/StatCard';
import Chart from '../components/ui/Chart';
import MapView from '../components/ui/MapView';
import { 
  Car, 
  Users, 
  Fuel, 
  Clock, 
  DollarSign,
  BarChart,
  Route,
  MapPin, 
  ShieldAlert,
  Activity,
  Bell
} from 'lucide-react';

import { 
  dashboardStats, 
  vehicles, 
  drivers, 
  fuelConsumptionChart, 
  maintenanceCostChart, 
  vehicleUtilizationChart,
  driverPerformanceChart,
  geofences
} from '../data/mockData';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, Admin</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
              Export Report
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm">
              Create Alert
            </button>
          </div>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Vehicles" 
            value={dashboardStats.totalVehicles} 
            icon={Car} 
            trend="5%" 
            trendDirection="up" 
          />
          <StatCard 
            title="Total Drivers" 
            value={dashboardStats.totalDrivers} 
            icon={Users} 
            trend="2%" 
            trendDirection="up" 
          />
          <StatCard 
            title="Total Distance (Month)" 
            value={`${dashboardStats.totalDistanceMonth.toLocaleString()} km`} 
            icon={Route} 
            trend="8%" 
            trendDirection="up" 
          />
          <StatCard 
            title="Fuel Consumed (Month)" 
            value={`${dashboardStats.fuelConsumedMonth.toLocaleString()} L`} 
            icon={Fuel} 
            trend="3%" 
            trendDirection="down" 
          />
        </div>
        
        {/* Primary content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Fleet Activity</h2>
                <div className="flex space-x-2">
                  <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-sm px-3 py-1">
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Last 3 Months</option>
                    <option>This Year</option>
                  </select>
                </div>
              </div>
              <Chart 
                type="area" 
                height={300}
                data={fuelConsumptionChart}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4">Maintenance Costs</h2>
                <Chart
                  type="bar"
                  height={250}
                  data={maintenanceCostChart}
                />
              </div>
              
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4">Vehicle Utilization</h2>
                <Chart
                  type="line"
                  height={250}
                  data={vehicleUtilizationChart}
                />
              </div>
            </div>
            
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Fleet Map</h2>
              <MapView 
                vehicles={vehicles}
                geofences={geofences}
                height={300}
              />
            </div>
          </div>
          
          {/* Right column */}
          <div className="space-y-6">
            <div className="card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Status Overview</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Vehicles Status</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-center bg-status-active/10 rounded-lg p-3">
                      <span className="text-status-active font-semibold text-xl">{dashboardStats.activeVehicles}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Active</span>
                    </div>
                    <div className="flex flex-col items-center bg-status-maintenance/10 rounded-lg p-3">
                      <span className="text-status-maintenance font-semibold text-xl">{dashboardStats.vehiclesInMaintenance}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Maintenance</span>
                    </div>
                    <div className="flex flex-col items-center bg-status-inactive/10 rounded-lg p-3">
                      <span className="text-status-inactive font-semibold text-xl">{dashboardStats.inactiveVehicles}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Inactive</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Drivers Status</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="flex flex-col items-center bg-status-active/10 rounded-lg p-2">
                      <span className="text-status-active font-semibold text-lg">{dashboardStats.availableDrivers}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Available</span>
                    </div>
                    <div className="flex flex-col items-center bg-status-maintenance/10 rounded-lg p-2">
                      <span className="text-status-maintenance font-semibold text-lg">{dashboardStats.onDutyDrivers}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">On Duty</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-200 dark:bg-gray-700 rounded-lg p-2">
                      <span className="font-semibold text-lg">{dashboardStats.offDutyDrivers}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Off Duty</span>
                    </div>
                    <div className="flex flex-col items-center bg-status-inactive/10 rounded-lg p-2">
                      <span className="text-status-inactive font-semibold text-lg">1</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">On Leave</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Driver Performance</span>
                  </div>
                  <Chart
                    type="radar"
                    height={200}
                    data={driverPerformanceChart}
                  />
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Alerts</h2>
                <button className="text-sm text-primary hover:text-primary/90">View All</button>
              </div>
              
              <div className="space-y-4">
                {dashboardStats.recentAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className={`
                      flex-shrink-0 p-2 rounded-full mr-3
                      ${alert.severity === 'high' ? 'bg-status-inactive/10 text-status-inactive' : 
                        alert.severity === 'medium' ? 'bg-status-maintenance/10 text-status-maintenance' : 
                        'bg-status-active/10 text-status-active'}
                    `}>
                      <Bell size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2 text-sm text-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                Load More
              </button>
            </div>
            
            <div className="card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Quick Stats</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Activity className="text-primary mr-2" size={18} />
                    <span className="text-sm">Active Trips</span>
                  </div>
                  <span className="font-medium">3</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="text-primary mr-2" size={18} />
                    <span className="text-sm">Scheduled Trips Today</span>
                  </div>
                  <span className="font-medium">7</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="text-primary mr-2" size={18} />
                    <span className="text-sm">Maintenance Cost (MTD)</span>
                  </div>
                  <span className="font-medium">$4,532</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ShieldAlert className="text-primary mr-2" size={18} />
                    <span className="text-sm">Maintenance Due (7 days)</span>
                  </div>
                  <span className="font-medium">2</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="text-primary mr-2" size={18} />
                    <span className="text-sm">Active Geofences</span>
                  </div>
                  <span className="font-medium">4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
