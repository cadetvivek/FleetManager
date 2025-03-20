
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Car, 
  Users, 
  Calendar, 
  BarChart, 
  Map, 
  Fuel, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  UserCog,
  LogOut
} from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, label, isCollapsed, isActive }) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center p-2 mb-1 rounded-lg transition-all duration-200
        ${isActive 
          ? 'bg-primary/10 text-primary font-medium' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
    >
      <Icon className={`flex-shrink-0 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} size={20} />
      {!isCollapsed && <span className="truncate">{label}</span>}
    </Link>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const sidebarLinks = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/vehicles', label: 'Vehicles', icon: Car },
    { path: '/drivers', label: 'Drivers', icon: Users },
    { path: '/maintenance', label: 'Maintenance', icon: Calendar },
    { path: '/reports', label: 'Reports', icon: BarChart },
    { path: '/routes', label: 'Routes', icon: Map },
    { path: '/fuel', label: 'Fuel Management', icon: Fuel },
    { path: '/trips', label: 'Trip Logs', icon: Clock },
    { path: '/geofencing', label: 'Geofencing', icon: MapPin },
    { path: '/emergency', label: 'Emergency', icon: AlertTriangle },
    { path: '/users', label: 'Users', icon: UserCog },
  ];

  return (
    <div className={`sidebar ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'} glass shadow-lg`}>
      <div className="flex flex-col h-full">
        {/* Logo and collapse button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {!collapsed && (
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">Fleet</span>
              <span className="text-xl font-bold">Manager</span>
              <span className="text-sm font-semibold text-primary ml-1">Pro</span>
            </Link>
          )}
          {collapsed && (
            <Link to="/" className="mx-auto">
              <span className="text-2xl font-bold text-primary">F</span>
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        
        {/* Main navigation */}
        <nav className="flex-grow p-4 overflow-y-auto">
          <div className={`space-y-1 ${collapsed ? '' : 'pr-2'}`}>
            {sidebarLinks.map((link) => (
              <SidebarLink
                key={link.path}
                to={link.path}
                icon={link.icon}
                label={link.label}
                isCollapsed={collapsed}
                isActive={isActive(link.path)}
              />
            ))}
          </div>
        </nav>
        
        {/* User section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Link 
            to="/login" 
            className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg`}
          >
            <LogOut size={20} className={collapsed ? '' : 'mr-3'} />
            {!collapsed && <span>Log Out</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
