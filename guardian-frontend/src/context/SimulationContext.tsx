import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Shipment, Alert, SensorReadings } from '../types';
import { MOCK_SHIPMENT, generateMockReadings } from '../data/mockData';

interface SimulationContextType {
  shipment: Shipment;
  isOffline: boolean;
  isSyncing: boolean;
  pendingRecords: number;
  simulateNetworkFailure: () => void;
  restoreConnectivity: () => void;
  simulateDataTampering: () => void;
  verifyRecordIntegrity: () => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [shipment, setShipment] = useState<Shipment>(MOCK_SHIPMENT);
  const [isOffline, setIsOffline] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingRecords, setPendingRecords] = useState(0);

  // Simulation loop for generating offline records
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isOffline) {
      interval = setInterval(() => {
        setPendingRecords(prev => prev + 1);
        setShipment(prev => {
          const newReading = generateMockReadings(1, true)[0];
          newReading.timestamp = new Date().toISOString(); // Current time
          return {
            ...prev,
            readings: [...prev.readings, newReading]
          };
        });
      }, 3000); // Add a reading every 3 seconds for demonstration
    }

    return () => clearInterval(interval);
  }, [isOffline]);

  const simulateNetworkFailure = () => {
    setIsOffline(true);
    setShipment(prev => ({
      ...prev,
      assignedDevice: {
        ...prev.assignedDevice,
        esp32Status: 'Offline',
        connectivityType: 'None',
        signalStrength: 0
      },
      alerts: [
        {
          id: `ALT-${Date.now()}`,
          timestamp: new Date().toISOString(),
          shipmentId: prev.id,
          deviceId: prev.assignedDevice.id,
          type: 'Connectivity',
          severity: 'Warning',
          description: 'Network connection lost. Device operating in offline-first mode.',
          resolved: false,
        },
        ...prev.alerts
      ]
    }));
  };

  const restoreConnectivity = () => {
    setIsOffline(false);
    setIsSyncing(true);
    
    setShipment(prev => ({
      ...prev,
      assignedDevice: {
        ...prev.assignedDevice,
        esp32Status: 'Online',
        connectivityType: 'Cellular',
        signalStrength: 78
      }
    }));

    // Simulate sync process
    setTimeout(() => {
      setPendingRecords(0);
      setIsSyncing(false);
      setShipment(prev => ({
        ...prev,
        assignedDevice: {
          ...prev.assignedDevice,
          lastSync: new Date().toISOString(),
        },
        readings: prev.readings.map(r => ({ ...r, isSynced: true })),
        alerts: prev.alerts.map(a => 
          a.type === 'Connectivity' ? { ...a, resolved: true, description: a.description + ' (Restored)' } : a
        )
      }));
    }, Math.max(2000, pendingRecords * 500)); // Sync takes time based on pending records
  };

  const simulateDataTampering = () => {
    setShipment(prev => {
      const newReadings = [...prev.readings];
      // Tamper with a reading from the middle
      const indexToTamper = Math.floor(newReadings.length / 2);
      newReadings[indexToTamper] = {
        ...newReadings[indexToTamper],
        temperature: newReadings[indexToTamper].temperature + 5, // Unrealistic spike
        tampered: true,
        isValid: false,
      };

      return {
        ...prev,
        readings: newReadings,
        status: 'Compromised',
        alerts: [
          {
            id: `ALT-${Date.now()}`,
            timestamp: new Date().toISOString(),
            shipmentId: prev.id,
            deviceId: prev.assignedDevice.id,
            type: 'Integrity',
            severity: 'Critical',
            description: 'Cryptographic hash mismatch detected on stored records.',
            resolved: false,
          },
          ...prev.alerts
        ]
      };
    });
  };

  const verifyRecordIntegrity = () => {
    setShipment(prev => {
      const newReadings = prev.readings.map(r => ({ ...r, tampered: false, isValid: true }));
      return {
        ...prev,
        readings: newReadings,
        status: 'In Transit',
        alerts: prev.alerts.map(a => 
          a.type === 'Integrity' ? { ...a, resolved: true, description: 'Integrity restored to original valid state.' } : a
        )
      };
    });
  };

  return (
    <SimulationContext.Provider value={{
      shipment,
      isOffline,
      isSyncing,
      pendingRecords,
      simulateNetworkFailure,
      restoreConnectivity,
      simulateDataTampering,
      verifyRecordIntegrity
    }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
