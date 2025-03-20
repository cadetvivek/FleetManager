
import React, { useEffect, useState } from 'react';
import { Bell, Moon, Sun, Search, Menu } from 'lucide-react';
import { users } from '../../data/mockData';

const Header = ({ toggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const currentUser = users.find(user => user.role === 'admin');

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  // Initialize dark mode based on system preference
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full glass border-b border-gray-200 dark:border-gray-700 backdrop-blur-md">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 mr-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 md:hidden"
          >
            <Menu size={20} />
          </button>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="search"
              className="bg-white/50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm w-full md:w-64"
              placeholder="Search..."
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-status-active rounded-full">
                  {notifications}
                </span>
              )}
            </button>
            
            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50 animate-scale-in">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700 font-medium">
                  Notifications
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-status-active/10 p-2 rounded-full">
                        <Bell size={16} className="text-status-active" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Vehicle maintenance alert</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Vehicle #3 maintenance is overdue by 2 days</p>
                        <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-status-maintenance/10 p-2 rounded-full">
                        <Bell size={16} className="text-status-maintenance" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Geofence alert</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Vehicle #2 entered restricted zone</p>
                        <p className="text-xs text-gray-400 mt-1">4 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-status-inactive/10 p-2 rounded-full">
                        <Bell size={16} className="text-status-inactive" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Driver alert</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Driver #5 exceeded maximum driving hours</p>
                        <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
                  <button className="text-sm text-primary hover:underline">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* User profile */}
          <div className="flex items-center">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="User profile" 
              className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700"
            />
            <div className="ml-2 hidden sm:block">
              <p className="text-sm font-medium">{currentUser?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
