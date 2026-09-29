import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Clock } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ShipmentTracking: React.FC = () => {
  const { shipment } = useSimulation();

  const journeyPath = shipment.journey.map(loc => [loc.lat, loc.lng] as [number, number]);
  journeyPath.push([shipment.currentLocation.lat, shipment.currentLocation.lng] as [number, number]);

  const mapCenter: [number, number] = [17.9, 73.4]; // Centered around Maharashtra logistics route

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[calc(100vh-120px)] flex flex-col">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Shipment Tracking</h1>
        <p className="mt-1 text-slate-500">Live GPS tracking and supply chain journey.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Left Side: Journey Timeline */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-y-auto h-full">
          <div className="p-5 border-b border-slate-100 sticky top-0 bg-white z-10">
            <h2 className="text-lg font-medium text-slate-900">Supply Chain Journey</h2>
          </div>
          <div className="p-6">
            <div className="relative border-l-2 border-slate-200 ml-4 space-y-8">
              
              {shipment.journey.map((step, idx) => (
                <div key={idx} className="relative pl-6">
                  <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-agricultural-primary ring-4 ring-white"></span>
                  <div>
                    <h3 className="font-semibold text-slate-900">{step.name}</h3>
                    <p className="text-sm text-slate-500">{step.type}</p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(step.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}

              {/* Current Location */}
              <div className="relative pl-6">
                <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-blue-500 ring-4 ring-white animate-pulse flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                </span>
                <div>
                  <h3 className="font-semibold text-blue-700">{shipment.currentLocation.name}</h3>
                  <p className="text-sm text-blue-600">{shipment.currentLocation.type} (In Transit)</p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(shipment.currentLocation.timestamp).toLocaleString()}
                  </p>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-600">Product</span>
                      <span className="font-semibold text-slate-900">{shipment.productName}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Batch ID</span>
                      <span className="font-medium text-slate-700 font-mono text-xs">{shipment.batchNumber}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Side: Map */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative min-h-[400px]">
          <MapContainer center={mapCenter} zoom={7} scrollWheelZoom={true} className="h-full w-full absolute inset-0 z-0">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Historical Nodes */}
            {shipment.journey.map((step, idx) => (
              <Marker key={idx} position={[step.lat, step.lng]}>
                <Popup>
                  <div className="font-semibold">{step.name}</div>
                  <div className="text-xs text-gray-500">{step.type}</div>
                </Popup>
              </Marker>
            ))}

            {/* Current Location Node */}
            <Marker position={[shipment.currentLocation.lat, shipment.currentLocation.lng]}>
              <Popup>
                <div className="font-semibold text-blue-600">{shipment.currentLocation.name}</div>
                <div className="text-xs text-gray-500">Currently Here</div>
              </Popup>
            </Marker>

            <Polyline positions={journeyPath} color="#3b82f6" weight={4} opacity={0.7} />
          </MapContainer>
        </div>

      </div>
    </div>
  );
};

export default ShipmentTracking;
