import React from 'react';
import { Wifi, WifiOff, HardDrive, UploadCloud } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

const OfflineLogging: React.FC = () => {
  const { isOffline, isSyncing, pendingRecords, simulateNetworkFailure, restoreConnectivity, shipment } = useSimulation();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Offline-First Logging & Synchronization</h1>
        <p className="mt-1 text-slate-500">
          Demonstrate the system's ability to maintain data integrity during network outages.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Control Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50">
            <h2 className="text-lg font-medium text-slate-900 flex items-center">
              <span className="w-8 h-8 rounded-full bg-agricultural-primary text-white flex items-center justify-center mr-3 text-sm">1</span>
              Simulation Controls
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <p className="text-sm text-slate-600">
              Simulate a cellular drop-out during transport. The device will switch to offline-first mode, logging cryptographic records to its secure local storage.
            </p>
            
            <div className="flex flex-col space-y-4">
              <button
                onClick={simulateNetworkFailure}
                disabled={isOffline || isSyncing}
                className={`flex items-center justify-center px-4 py-3 rounded-lg font-medium text-white transition-all ${
                  isOffline || isSyncing 
                    ? 'bg-slate-300 cursor-not-allowed' 
                    : 'bg-red-500 hover:bg-red-600 shadow-md shadow-red-500/20'
                }`}
              >
                <WifiOff className="w-5 h-5 mr-2" />
                Simulate Network Failure
              </button>
              
              <button
                onClick={restoreConnectivity}
                disabled={!isOffline || isSyncing}
                className={`flex items-center justify-center px-4 py-3 rounded-lg font-medium text-white transition-all ${
                  !isOffline || isSyncing 
                    ? 'bg-slate-300 cursor-not-allowed' 
                    : 'bg-agricultural-accent hover:bg-green-600 shadow-md shadow-green-500/20'
                }`}
              >
                <Wifi className="w-5 h-5 mr-2" />
                Restore Connectivity
              </button>
            </div>
          </div>
        </div>

        {/* Status Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50">
            <h2 className="text-lg font-medium text-slate-900 flex items-center">
              <span className="w-8 h-8 rounded-full bg-agricultural-primary text-white flex items-center justify-center mr-3 text-sm">2</span>
              System Status
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-5">
              
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${isOffline ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {isOffline ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Network State</p>
                    <p className={`font-bold ${isOffline ? 'text-red-600' : 'text-green-600'}`}>
                      {isOffline ? 'OFFLINE' : 'ONLINE'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                    <HardDrive className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Local Sensor Logging</p>
                    <p className="font-bold text-blue-700 flex items-center">
                      ACTIVE <span className="flex h-2 w-2 relative ml-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span></span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${pendingRecords > 0 ? 'bg-amber-100 text-amber-600' : 'bg-slate-200 text-slate-500'}`}>
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Pending Sync Records</p>
                    <p className={`font-bold ${pendingRecords > 0 ? 'text-amber-600' : 'text-slate-700'}`}>
                      {pendingRecords} {isSyncing && <span className="ml-2 text-sm text-blue-500 font-medium animate-pulse">(Uploading...)</span>}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Sync Log Panel */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-medium text-slate-900">Event Log</h2>
          {isSyncing && <span className="text-sm text-blue-600 flex items-center"><UploadCloud className="w-4 h-4 mr-1 animate-bounce" /> Syncing via MQTT over TLS...</span>}
        </div>
        <div className="max-h-60 overflow-y-auto bg-slate-900 text-green-400 font-mono text-sm p-4 space-y-2">
          {shipment.readings.slice(-10).reverse().map((r, i) => (
            <div key={i} className="flex border-b border-slate-800 pb-1">
              <span className="text-slate-500 mr-4">[{new Date(r.timestamp).toLocaleTimeString()}]</span>
              <span>
                T:{r.temperature}°C, H:{r.humidity}% | Hash:{r.isValid ? 'OK' : 'ERR'} | 
                <span className={r.isSynced ? 'text-blue-400 ml-2' : 'text-amber-400 ml-2'}>
                  {r.isSynced ? '[SYNCED]' : '[STORED_LOCALLY]'}
                </span>
              </span>
            </div>
          ))}
          {shipment.readings.length === 0 && <div className="text-slate-500">No events yet...</div>}
        </div>
      </div>
    </div>
  );
};

export default OfflineLogging;
