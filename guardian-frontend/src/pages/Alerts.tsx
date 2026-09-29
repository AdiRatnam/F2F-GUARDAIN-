import React from 'react';
import { Bell, AlertTriangle, CheckCircle } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

const Alerts: React.FC = () => {
  const { shipment } = useSimulation();
  
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Alerts & Notifications</h1>
        <p className="mt-1 text-slate-500">System-wide alerts for environmental excursions and security events.</p>
      </div>
      
      <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {shipment.alerts.map((alert) => (
            <div key={alert.id} className={`p-5 flex items-start ${alert.resolved ? 'bg-slate-50' : 'bg-white'}`}>
              <div className="flex-shrink-0 mr-4 mt-1">
                {alert.severity === 'Critical' ? (
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                ) : alert.resolved ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <Bell className="w-6 h-6 text-amber-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`font-medium ${alert.resolved ? 'text-slate-600' : 'text-slate-900'}`}>
                    {alert.type} Alert
                  </h3>
                  <span className="text-sm text-slate-500">{new Date(alert.timestamp).toLocaleString()}</span>
                </div>
                <p className={`text-sm mt-1 ${alert.resolved ? 'text-slate-500' : 'text-slate-700'}`}>
                  {alert.description}
                </p>
                <div className="mt-2 flex space-x-3 text-xs text-slate-500">
                  <span>Shipment: {alert.shipmentId}</span>
                  <span>•</span>
                  <span>Device: {alert.deviceId}</span>
                  <span>•</span>
                  <span className={alert.resolved ? 'text-green-600 font-medium' : 'text-amber-600 font-medium'}>
                    {alert.resolved ? 'Resolved' : 'Active'}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {shipment.alerts.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No alerts to display.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
