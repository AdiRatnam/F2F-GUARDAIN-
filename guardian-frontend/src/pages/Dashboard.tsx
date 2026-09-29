import React from 'react';
import { Package, Smartphone, Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
  const { shipment, isOffline } = useSimulation();

  const chartData = shipment.readings.slice(-20).map(r => ({
    time: new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temp: r.temperature,
    hum: r.humidity
  }));

  const stats = [
    { name: 'Total Shipments', value: '1,248', icon: Package, color: 'bg-blue-100 text-blue-600' },
    { name: 'Active Devices', value: '842', icon: Smartphone, color: 'bg-agricultural-primary text-white bg-opacity-20 text-agricultural-primary' },
    { name: 'Online Devices', value: isOffline ? '841' : '842', icon: Wifi, color: 'bg-emerald-100 text-emerald-600' },
    { name: 'Offline Devices', value: isOffline ? '1' : '0', icon: WifiOff, color: 'bg-amber-100 text-amber-600' },
    { name: 'Action Required', value: shipment.alerts.filter(a => !a.resolved).length.toString(), icon: AlertTriangle, color: 'bg-red-100 text-red-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard Overview</h1>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm p-4 flex items-center border border-slate-100 hover:shadow-md transition-shadow cursor-default">
            <div className={`p-3 rounded-full ${stat.color} mr-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.name}</p>
              <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Chart & Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-5 border border-slate-100">
            <h2 className="text-lg font-medium text-slate-900 mb-4">Live Environmental Telemetry (Sample Shipment)</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis yAxisId="left" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                  <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line yAxisId="left" type="monotone" dataKey="temp" name="Temperature (°C)" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                  <Line yAxisId="right" type="monotone" dataKey="hum" name="Humidity (%)" stroke="#10b981" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Col: Active Shipment Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-5 border border-slate-100">
            <h2 className="text-lg font-medium text-slate-900 mb-4">Active Shipment Overview</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between pb-3 border-b border-slate-100">
                <span className="text-sm text-slate-500">Shipment ID</span>
                <span className="text-sm font-semibold text-slate-800">{shipment.id}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-slate-100">
                <span className="text-sm text-slate-500">Product</span>
                <span className="text-sm font-semibold text-slate-800">{shipment.productName}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-slate-100">
                <span className="text-sm text-slate-500">Location</span>
                <span className="text-sm font-semibold text-slate-800">{shipment.currentLocation.name}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-slate-100">
                <span className="text-sm text-slate-500">Device</span>
                <span className="text-sm font-semibold text-slate-800">{shipment.assignedDevice.id}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-slate-100">
                <span className="text-sm text-slate-500">Status</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  shipment.status === 'Compromised' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                  {shipment.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
