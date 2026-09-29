import React, { useState } from 'react';
import { QrCode, Scan, ShieldCheck, MapPin, Package, CheckCircle } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

const QRVerification: React.FC = () => {
  const { shipment } = useSimulation();
  const [isScanned, setIsScanned] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">QR Shipment Verification</h1>
        <p className="mt-1 text-slate-500">End-user traceability access via QR scan.</p>
      </div>

      {!isScanned ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-48 h-48 bg-white border-4 border-slate-900 p-2 rounded-lg flex items-center justify-center mb-8 shadow-lg relative">
            <QrCode className="w-40 h-40 text-slate-900" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent animate-pulse"></div>
          </div>
          <h2 className="text-xl font-medium text-slate-900 mb-2">Ready to Scan</h2>
          <p className="text-slate-500 text-center max-w-md mb-8">
            Scan the QR code on the shipment crate to view its complete farm-to-fork history, environmental conditions, and integrity proof.
          </p>
          <button 
            onClick={() => setIsScanned(true)}
            className="flex items-center px-6 py-3 bg-agricultural-primary text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-md"
          >
            <Scan className="w-5 h-5 mr-2" />
            Simulate Scan
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-0 overflow-hidden">
            <div className="bg-agricultural-dark p-6 text-white flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-bold">{shipment.productName}</h2>
                <p className="text-slate-300 mt-1">Batch: {shipment.batchNumber}</p>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-white ${
                  shipment.status === 'Compromised' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {shipment.status === 'Compromised' ? 'Compromised' : 'Verified Authentic'}
                </span>
              </div>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center"><MapPin className="w-4 h-4 mr-2"/> Journey</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-agricultural-primary mr-3"></div>
                      <div>
                        <p className="font-medium text-slate-900">Origin</p>
                        <p className="text-sm text-slate-600">{shipment.origin}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 mr-3"></div>
                      <div>
                        <p className="font-medium text-slate-900">Destination</p>
                        <p className="text-sm text-slate-600">{shipment.destination}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center"><Package className="w-4 h-4 mr-2"/> Condition Status</h3>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <p className="text-sm text-slate-700">Throughout the journey, conditions were logged properly.</p>
                    {shipment.status === 'Compromised' && (
                      <p className="text-sm text-red-600 font-medium mt-2">Warning: Integrity checks failed for some records.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center"><ShieldCheck className="w-4 h-4 mr-2"/> Blockchain Integrity</h3>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-3">
                    <div className="flex items-center text-sm">
                      <CheckCircle className={`w-4 h-4 mr-2 ${shipment.status === 'Compromised' ? 'text-red-500' : 'text-green-500'}`} />
                      <span className="text-slate-700">Cryptographic Signatures {shipment.status === 'Compromised' ? 'Failed' : 'Valid'}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className={`w-4 h-4 mr-2 ${shipment.status === 'Compromised' ? 'text-red-500' : 'text-green-500'}`} />
                      <span className="text-slate-700">{shipment.status === 'Compromised' ? 'Data Tampering Detected' : 'No Data Tampering Detected'}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-slate-700">Anchored to Ledger</span>
                    </div>
                    <div className="pt-2 mt-2 border-t border-slate-200">
                      <p className="text-xs text-slate-500">Transaction ID:</p>
                      <p className="text-xs font-mono text-slate-600 truncate">{shipment.blockchainProof.transactionId}</p>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsScanned(false)}
                  className="w-full py-2 text-sm text-slate-500 hover:text-slate-700 font-medium"
                >
                  Scan Another Code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRVerification;
