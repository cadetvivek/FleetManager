
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-background to-secondary/30">
      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Mobile sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-gray-900/50" onClick={toggleSidebar}></div>
          <div className="fixed inset-y-0 left-0">
            <Sidebar />
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden animate-fade-in">
          {children}
        </main>
        
        <footer className="py-4 px-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2023 FleetManagerPro. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
