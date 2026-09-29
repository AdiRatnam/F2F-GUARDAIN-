import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Activity, 
  Cpu, 
  WifiOff, 
  ShieldCheck, 
  Bell, 
  QrCode,
  Leaf
} from 'lucide-react';
import { clsx } from 'clsx';
import { useSimulation } from '../context/SimulationContext';

const Sidebar: React.FC = () => {
  const { shipment } = useSimulation();
  
  const unreadAlerts = shipment.alerts.filter(a => !a.resolved).length;

  const links = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Shipment Tracking', path: '/tracking', icon: Map },
    { name: 'Environmental', path: '/environmental', icon: Activity },
    { name: 'Device Mgmt', path: '/device', icon: Cpu },
    { name: 'Offline Logging', path: '/offline', icon: WifiOff },
    { name: 'Security & Auth', path: '/security', icon: ShieldCheck },
    { name: 'Alerts', path: '/alerts', icon: Bell, badge: unreadAlerts },
    { name: 'QR Verification', path: '/qr', icon: QrCode },
  ];

  return (
    <aside className="w-64 bg-agricultural-dark text-slate-300 flex flex-col h-full flex-shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-700">
        <Leaf className="text-agricultural-accent w-6 h-6 mr-3" />
        <span className="text-white font-bold text-lg tracking-wide">F2F GUARDIAN</span>
      </div>
      <div className="py-4 flex-1 overflow-y-auto">
        <nav className="space-y-1 px-3">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => clsx(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive 
                  ? "bg-agricultural-primary text-white" 
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <link.icon className="flex-shrink-0 mr-3 h-5 w-5" />
              <span className="flex-1">{link.name}</span>
              {link.badge !== undefined && link.badge > 0 && (
                <span className="ml-3 inline-block py-0.5 px-2 text-xs font-medium rounded-full bg-amber-500 text-white">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-700 text-xs text-slate-500">
        SIH 2026 Prototype
      </div>
    </aside>
  );
};

export default Sidebar;
