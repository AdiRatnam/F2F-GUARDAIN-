import React, { useState } from 'react';
import { Thermometer, Droplets, Wind, Activity } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const EnvironmentalMonitoring: React.FC = () => {
  const { shipment } = useSimulation();
  const [timeRange, setTimeRange] = useState('12h');

  // Format data for charts
  const chartData = shipment.readings.map(r => ({
    time: new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temp: r.temperature,
    hum: r.humidity,
    ethylene: r.ethylene,
    shock: r.shockVibration
  }));

  const latestReading = shipment.readings[shipment.readings.length - 1];

  const MetricCard = ({ title, value, unit, icon: Icon, color, status }: any) => (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          status === 'Normal' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {status}
        </span>
      </div>
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <div className="flex items-baseline mt-1">
        <span className="text-3xl font-bold text-slate-900">{value}</span>
        <span className="ml-1 text-sm text-slate-500">{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Multi-Parameter Sensing</h1>
          <p className="mt-1 text-slate-500">
            Real-time environmental conditions for Shipment {shipment.id}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex bg-slate-100 p-1 rounded-lg">
          {['1h', '6h', '12h', '24h', 'All'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                timeRange === range ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Temperature" 
          value={latestReading.temperature} 
          unit="°C" 
          icon={Thermometer} 
          color="bg-blue-100 text-blue-600" 
          status={latestReading.temperature > 10 || latestReading.temperature < 2 ? 'Warning' : 'Normal'}
        />
        <MetricCard 
          title="Relative Humidity" 
          value={latestReading.humidity} 
          unit="%" 
          icon={Droplets} 
          color="bg-cyan-100 text-cyan-600" 
          status={latestReading.humidity > 95 || latestReading.humidity < 80 ? 'Warning' : 'Normal'}
        />
        <MetricCard 
          title="Ethylene Gas" 
          value={latestReading.ethylene} 
          unit="ppm" 
          icon={Wind} 
          color="bg-emerald-100 text-emerald-600" 
          status={latestReading.ethylene > 0.8 ? 'Warning' : 'Normal'}
        />
        <MetricCard 
          title="Shock / Vibration" 
          value={latestReading.shockVibration} 
          unit="g" 
          icon={Activity} 
          color="bg-amber-100 text-amber-600" 
          status={latestReading.shockVibration > 2.0 ? 'Warning' : 'Normal'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Temperature & Humidity Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h2 className="text-lg font-medium text-slate-900 mb-4">Temperature & Humidity History</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis yAxisId="left" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 20]} />
                <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[70, 100]} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                
                {/* Thresholds */}
                <ReferenceLine y={10} yAxisId="left" stroke="#ef4444" strokeDasharray="3 3" />
                <ReferenceLine y={2} yAxisId="left" stroke="#ef4444" strokeDasharray="3 3" />

                <Line yAxisId="left" type="monotone" dataKey="temp" name="Temp (°C)" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                <Line yAxisId="right" type="monotone" dataKey="hum" name="Humidity (%)" stroke="#06b6d4" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-between text-xs text-slate-500">
            <span>Configured Limits: Temp (2°C - 10°C), RH (80% - 95%)</span>
          </div>
        </div>

        {/* Ethylene & Shock Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h2 className="text-lg font-medium text-slate-900 mb-4">Ethylene & Shock Analysis</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis yAxisId="left" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 1.5]} />
                <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 3]} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                
                <ReferenceLine y={0.8} yAxisId="left" stroke="#ef4444" strokeDasharray="3 3" />
                <ReferenceLine y={2.0} yAxisId="right" stroke="#ef4444" strokeDasharray="3 3" />

                <Line yAxisId="left" type="monotone" dataKey="ethylene" name="Ethylene (ppm)" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                <Line yAxisId="right" type="stepAfter" dataKey="shock" name="Shock (g)" stroke="#f59e0b" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-xs text-slate-500 p-2 bg-slate-50 rounded-md border border-slate-100">
            <strong>Note:</strong> Ethylene values indicate ripening gas concentrations, not direct proof of freshness or food safety.
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalMonitoring;
