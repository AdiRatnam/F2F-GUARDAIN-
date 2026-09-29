export interface SensorReadings {
  timestamp: string;
  temperature: number; // °C
  humidity: number; // %
  ethylene: number; // ppm
  shockVibration: number; // g
  tampered: boolean;
  isSynced: boolean;
  isValid: boolean;
}

export interface DeviceStatus {
  id: string;
  esp32Status: 'Online' | 'Offline';
  sht45Status: 'Healthy' | 'Warning' | 'Error';
  ethyleneStatus: 'Healthy' | 'Warning' | 'Error';
  accelStatus: 'Healthy' | 'Warning' | 'Error';
  tamperStatus: 'Secure' | 'Tampered';
  rtcStatus: 'Synced' | 'Desynced';
  secureElementStatus: 'Active' | 'Error';
  batteryLevel: number; // 0-100
  solarCharging: boolean;
  connectivityType: 'Cellular' | 'LoRaWAN' | 'Wi-Fi' | 'None';
  signalStrength: number; // 0-100
  lastSync: string;
  localStorageUtilization: number; // %
}

export interface Location {
  lat: number;
  lng: number;
  name: string;
  type: 'Farm' | 'Cold Storage' | 'Transport' | 'Port' | 'Destination';
  timestamp: string;
}

export interface Alert {
  id: string;
  timestamp: string;
  shipmentId: string;
  deviceId: string;
  type: 'Temperature' | 'Humidity' | 'Ethylene' | 'Shock' | 'Tamper' | 'Sensor' | 'Battery' | 'Connectivity' | 'Sync' | 'Integrity';
  severity: 'Warning' | 'Critical';
  description: string;
  resolved: boolean;
}

export interface Shipment {
  id: string;
  productName: string;
  batchNumber: string;
  origin: string;
  destination: string;
  currentLocation: Location;
  journey: Location[];
  status: 'In Transit' | 'Delayed' | 'Delivered' | 'Compromised';
  assignedDevice: DeviceStatus;
  readings: SensorReadings[];
  alerts: Alert[];
  blockchainProof: {
    batchHash: string;
    merkleRoot: string;
    transactionId: string;
    ledgerConfirmation: 'Confirmed' | 'Pending' | 'Failed';
  };
}
