import type { Shipment, SensorReadings } from '../types';

export const generateMockReadings = (count: number, isOffline = false, tamperedIndex = -1): SensorReadings[] => {
  const readings: SensorReadings[] = [];
  let baseTemp = 8.5;
  let baseHum = 88;
  let baseEthylene = 0.4;
  
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const timestamp = new Date(now.getTime() - (count - i) * 15 * 60000).toISOString();
    
    // Simulate some variation
    baseTemp += (Math.random() - 0.5) * 0.5;
    baseHum += (Math.random() - 0.5) * 1;
    baseEthylene += (Math.random() - 0.5) * 0.05;

    const isTampered = i === tamperedIndex;

    readings.push({
      timestamp,
      temperature: Number(baseTemp.toFixed(1)),
      humidity: Number(baseHum.toFixed(1)),
      ethylene: Number(baseEthylene.toFixed(2)),
      shockVibration: isTampered ? 2.5 : Number((Math.random() * 0.5).toFixed(2)),
      tampered: isTampered,
      isSynced: !isOffline,
      isValid: !isTampered,
    });
  }
  return readings;
};

export const MOCK_SHIPMENT: Shipment = {
  id: 'SHP-2026-IND-842',
  productName: 'Alphonso Mangoes',
  batchNumber: 'BATCH-ALPH-0482',
  origin: 'Ratnagiri Farm, Maharashtra',
  destination: 'JNPT Port, Mumbai',
  currentLocation: {
    lat: 18.9401,
    lng: 72.9566,
    name: 'Mumbai-Pune Expressway',
    type: 'Transport',
    timestamp: new Date().toISOString(),
  },
  journey: [
    { lat: 16.9902, lng: 73.3120, name: 'Ratnagiri Farm', type: 'Farm', timestamp: '2026-09-28T08:00:00Z' },
    { lat: 17.0000, lng: 73.3200, name: 'Ratnagiri Cold Storage', type: 'Cold Storage', timestamp: '2026-09-28T14:00:00Z' },
    { lat: 18.5204, lng: 73.8567, name: 'Pune Transit Hub', type: 'Transport', timestamp: '2026-09-29T02:00:00Z' },
  ],
  status: 'In Transit',
  assignedDevice: {
    id: 'DEV-ESP32-9021',
    esp32Status: 'Online',
    sht45Status: 'Healthy',
    ethyleneStatus: 'Healthy',
    accelStatus: 'Healthy',
    tamperStatus: 'Secure',
    rtcStatus: 'Synced',
    secureElementStatus: 'Active',
    batteryLevel: 84,
    solarCharging: true,
    connectivityType: 'Cellular',
    signalStrength: 75,
    lastSync: new Date().toISOString(),
    localStorageUtilization: 12,
  },
  readings: generateMockReadings(48), // Last 12 hours (15 min intervals)
  alerts: [
    {
      id: 'ALT-001',
      timestamp: '2026-09-28T15:30:00Z',
      shipmentId: 'SHP-2026-IND-842',
      deviceId: 'DEV-ESP32-9021',
      type: 'Temperature',
      severity: 'Warning',
      description: 'Temperature exceeded 10°C briefly during loading.',
      resolved: true,
    }
  ],
  blockchainProof: {
    batchHash: '0x8f4b2a1c9e8d7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a',
    merkleRoot: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    transactionId: '0x5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
    ledgerConfirmation: 'Confirmed',
  }
};
