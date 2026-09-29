import React from 'react';
import { Cpu, Battery, Sun, HardDrive, Wifi, WifiOff, CheckCircle2, AlertCircle, Clock, ShieldCheck } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

const DeviceManagement: React.FC = () => {
  const { shipment, isOffline } = useSimulation();
  const device = shipment.assignedDevice;

  const StatusBadge = ({ status }: { status: string }) => {
    if (status === 'Online' || status === 'Healthy' || status === 'Secure' || status === 'Synced' || status === 'Active') {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle2 className="w-3 h-3 mr-1" /> {status}</span>;
    }
    if (status === 'Warning') {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"><AlertCircle className="w-3 h-3 mr-1" /> {status}</span>;
    }
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><AlertCircle className="w-3 h-3 mr-1" /> {status}</span>;
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">IoT Device Management</h1>
        <p className="mt-1 text-slate-500">
          Hardware status and health monitoring for Farm-to-Fork Guardian node.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Device Info & Power */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-slate-100 rounded-lg mr-3">
                  <Cpu className="w-6 h-6 text-slate-700" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{device.id}</h2>
                  <p className="text-sm text-slate-500">ESP32-S3 Microcontroller</p>
                </div>
              </div>
              <StatusBadge status={device.esp32Status} />
            </div>
            
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Assigned Shipment</span>
                <span className="font-medium">{shipment.id}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Enclosure</span>
                <span className="font-medium text-slate-700">Rugged IP65/IP67</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Firmware Version</span>
                <span className="font-medium text-slate-700">v2.4.1 (Stable)</span>
              </div>
            </div>
          </div>

          {/* Power System */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-md font-semibold text-slate-900 mb-4 flex items-center">
              <Battery className="w-5 h-5 mr-2 text-green-600" /> Power System
            </h3>
            
            <div className="mb-4">
              <div className="flex justify-between items-end mb-1">
                <span className="text-sm font-medium text-slate-700">LiFePO4 Battery Level</span>
                <span className="text-sm font-bold text-green-600">{device.batteryLevel}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${device.batteryLevel}%` }}></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center">
                <Sun className={`w-5 h-5 mr-2 ${device.solarCharging ? 'text-amber-500 animate-pulse' : 'text-slate-400'}`} />
                <span className="text-sm font-medium text-slate-700">Solar MPPT Charging</span>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${device.solarCharging ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600'}`}>
                {device.solarCharging ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>
          </div>
        </div>

        {/* Sensors & Hardware Status */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full">
            <div className="p-5 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-medium text-slate-900">Hardware Components Status</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4">
              
              {/* Sensor Node */}
              <div className="border border-slate-100 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Sensing Modules</h4>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">Temp & Humidity (SHT45)</span>
                    <StatusBadge status={device.sht45Status} />
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">Ethylene Gas Sensor</span>
                    <StatusBadge status={device.ethyleneStatus} />
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">Accelerometer (Shock)</span>
                    <StatusBadge status={device.accelStatus} />
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">Enclosure Tamper Switch</span>
                    <StatusBadge status={device.tamperStatus} />
                  </li>
                </ul>
              </div>

              {/* Edge Processing */}
              <div className="border border-slate-100 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Edge Processing & Storage</h4>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-slate-400"/> RTC (Timestamping)
                    </span>
                    <StatusBadge status={device.rtcStatus} />
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700 flex items-center">
                      <ShieldCheck className="w-4 h-4 mr-2 text-slate-400"/> Secure Element (ATECC608C)
                    </span>
                    <StatusBadge status={device.secureElementStatus} />
                  </li>
                  
                  <li className="pt-3 border-t border-slate-100">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-sm font-medium text-slate-700 flex items-center">
                        <HardDrive className="w-4 h-4 mr-2 text-slate-400"/> Local Storage (MicroSD)
                      </span>
                      <span className="text-xs font-bold text-slate-500">{device.localStorageUtilization}% Full</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${device.localStorageUtilization}%` }}></div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Connectivity */}
              <div className="md:col-span-2 border border-slate-100 rounded-lg p-4 bg-slate-50 mt-2">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Connectivity (MQTT over TLS)</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Active Network</p>
                      <p className="font-medium text-slate-900 flex items-center">
                        {isOffline ? <WifiOff className="w-4 h-4 mr-1 text-red-500"/> : <Wifi className="w-4 h-4 mr-1 text-green-500"/>}
                        {device.connectivityType}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Signal Strength</p>
                      <p className="font-medium text-slate-900">{device.signalStrength}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Last Synchronization</p>
                      <p className="font-medium text-slate-900">{new Date(device.lastSync).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceManagement;
