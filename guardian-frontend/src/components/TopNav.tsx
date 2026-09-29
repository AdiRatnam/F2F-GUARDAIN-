import React from 'react';
import { Search, Bell, User, Wifi, WifiOff } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';


const TopNav: React.FC = () => {
  const { isOffline, isSyncing, shipment } = useSimulation();

  const unreadAlerts = shipment.alerts.filter(a => !a.resolved).length;

  return (
    <header className="sticky top-0 z-10 flex w-full bg-white shadow-sm h-16 flex-shrink-0">
      <div className="flex flex-1 items-center justify-between px-6">
        
        {/* Search */}
        <div className="flex flex-1">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search shipments, devices, or alerts..." 
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-md leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-agricultural-primary focus:border-agricultural-primary sm:text-sm transition-colors"
            />
          </div>
        </div>

        {/* Right Nav */}
        <div className="ml-4 flex items-center space-x-4">
          {/* Status Indicator */}
          <div className="flex items-center text-sm font-medium mr-4">
            {isOffline ? (
              <span className="flex items-center text-amber-500">
                <WifiOff className="w-4 h-4 mr-1.5" />
                Offline Mode
              </span>
            ) : isSyncing ? (
              <span className="flex items-center text-blue-500 animate-pulse">
                <Wifi className="w-4 h-4 mr-1.5" />
                Syncing...
              </span>
            ) : (
              <span className="flex items-center text-agricultural-accent">
                <Wifi className="w-4 h-4 mr-1.5" />
                System Online
              </span>
            )}
          </div>

          <div className="relative">
            <button className="p-1 rounded-full text-slate-400 hover:text-slate-500 focus:outline-none">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
              {unreadAlerts > 0 && (
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
              )}
            </button>
          </div>

          <div className="relative">
            <button className="flex max-w-xs items-center rounded-full bg-white focus:outline-none text-slate-400 hover:text-slate-500">
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center border border-slate-300">
                <User className="h-5 w-5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
