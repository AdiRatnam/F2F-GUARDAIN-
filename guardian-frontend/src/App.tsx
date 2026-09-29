import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SimulationProvider } from './context/SimulationContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ShipmentTracking from './pages/ShipmentTracking';
import EnvironmentalMonitoring from './pages/EnvironmentalMonitoring';
import DeviceManagement from './pages/DeviceManagement';
import OfflineLogging from './pages/OfflineLogging';
import SecurityVerification from './pages/SecurityVerification';
import Alerts from './pages/Alerts';
import QRVerification from './pages/QRVerification';

const App: React.FC = () => {
  return (
    <SimulationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="tracking" element={<ShipmentTracking />} />
            <Route path="environmental" element={<EnvironmentalMonitoring />} />
            <Route path="device" element={<DeviceManagement />} />
            <Route path="offline" element={<OfflineLogging />} />
            <Route path="security" element={<SecurityVerification />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="qr" element={<QRVerification />} />
          </Route>
        </Routes>
      </Router>
    </SimulationProvider>
  );
};

export default App;
