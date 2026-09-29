import React from 'react';
import { Shield, ShieldAlert, ShieldCheck, Database, Link as LinkIcon, CheckCircle, AlertTriangle } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

const SecurityVerification: React.FC = () => {
  const { shipment, simulateDataTampering, verifyRecordIntegrity } = useSimulation();
  const isCompromised = shipment.status === 'Compromised';

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Security & Blockchain Verification</h1>
        <p className="mt-1 text-slate-500">
          Verify cryptographic signatures, hash-chain integrity, and blockchain anchoring.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Security Actions & Status */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-5 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-medium text-slate-900 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-agricultural-primary" />
                Integrity Verification
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className={`p-4 rounded-lg border ${isCompromised ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                <div className="flex items-center mb-2">
                  {isCompromised ? (
                    <ShieldAlert className="w-6 h-6 text-red-600 mr-2" />
                  ) : (
                    <ShieldCheck className="w-6 h-6 text-green-600 mr-2" />
                  )}
                  <h3 className={`font-semibold ${isCompromised ? 'text-red-800' : 'text-green-800'}`}>
                    {isCompromised ? 'INTEGRITY FAILURE' : 'RECORDS VERIFIED'}
                  </h3>
                </div>
                <p className={`text-sm ${isCompromised ? 'text-red-700' : 'text-green-700'}`}>
                  {isCompromised 
                    ? 'Cryptographic hash mismatch detected in local storage. Data tampering suspected.' 
                    : 'All sensor records possess valid cryptographic signatures and match the hash chain.'}
                </p>
              </div>

              <div className="flex flex-col space-y-3 pt-4 border-t border-slate-100">
                <button
                  onClick={simulateDataTampering}
                  disabled={isCompromised}
                  className={`px-4 py-2 rounded-lg font-medium text-sm text-center transition-colors ${
                    isCompromised ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  Simulate Data Tampering
                </button>
                <button
                  onClick={verifyRecordIntegrity}
                  disabled={!isCompromised}
                  className={`px-4 py-2 rounded-lg font-medium text-sm text-center transition-colors ${
                    !isCompromised ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  Restore & Verify Integrity
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-5 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-medium text-slate-900 flex items-center">
                <Database className="w-5 h-5 mr-2 text-blue-500" />
                Hardware Security Module
              </h2>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Secure Element</span>
                <span className="font-medium text-slate-900">ATECC608C</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Device Auth</span>
                <span className="font-medium text-green-600 flex items-center"><CheckCircle className="w-4 h-4 mr-1"/> Valid</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Signing Algo</span>
                <span className="font-medium text-slate-900">ECDSA (P-256)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Blockchain & Record Log */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-medium text-slate-900 flex items-center">
                <LinkIcon className="w-5 h-5 mr-2 text-indigo-500" />
                Blockchain Anchoring (EPCIS 2.0)
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Batch Merkle Root</p>
                  <div className="bg-slate-50 border border-slate-200 rounded p-2 text-xs font-mono text-slate-700 break-all">
                    {shipment.blockchainProof.merkleRoot}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Blockchain Transaction ID</p>
                  <div className="bg-slate-50 border border-slate-200 rounded p-2 text-xs font-mono text-indigo-600 break-all">
                    {shipment.blockchainProof.transactionId}
                  </div>
                </div>
                <div className="flex items-center pt-2">
                   <div className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold flex items-center">
                     <CheckCircle className="w-3.5 h-3.5 mr-1" />
                     Anchored to Permissioned Ledger
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Record Log showing valid/invalid */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-medium text-slate-900 flex items-center">
                Sensor Record Verification Log
              </h2>
            </div>
            <div className="overflow-x-auto max-h-[300px]">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Temp / Hum</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Hash Chain Signature</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {shipment.readings.slice(-15).reverse().map((r, i) => (
                    <tr key={i} className={r.isValid ? '' : 'bg-red-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {new Date(r.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {r.temperature}°C / {r.humidity}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-slate-400">
                        0x...{Math.random().toString(16).substr(2, 8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {r.isValid ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Valid
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 flex items-center">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Failed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityVerification;
