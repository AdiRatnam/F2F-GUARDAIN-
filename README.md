# Farm-to-Fork (F2F) GUARDIAN 🌾🔐

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

**An interactive frontend prototype built for the Smart India Hackathon (SIH) demonstrating a secure, offline-capable, and blockchain-verified cold-chain tracking solution.**

---

## 📖 The Problem
Global export markets demand strict compliance with international traceability standards to combat food fraud and track contamination outbreaks. 
- **High Costs:** Large enterprises can afford complex cold-chain logging systems, but Small and Medium Enterprises (SMEs) and local farmers are priced out. 
- **Data Loss:** Standard data loggers often lose cellular connectivity in remote agricultural areas, creating blind spots in the supply chain data.
- **Data Tampering:** Current centralized logging systems are vulnerable to food fraud, where drivers or intermediaries modify temperature records to hide spoilage.

## 💡 Our Solution
**Farm-to-Fork Guardian** is an affordable, rugged, tamper-proof hardware and software ecosystem that tracks ambient environmental data during transit. 

This repository contains the **Frontend UI Prototype** that acts as a digital twin for our proposed hardware. It demonstrates:
1. **Multi-Parameter Sensing:** Tracking Temperature, Humidity, Ethylene gas (ripening), and Shock/Vibration.
2. **Offline Logging & Sync:** Simulating how our hardware safely stores data locally on an SD card during network dropouts (Deep Sleep / No Cell Service) and automatically pushes it via MQTT when the network is restored.
3. **Cryptographic Integrity:** Simulating the blockchain-anchored, tamper-evident nature of our data, proving that modified records are instantly flagged.
4. **End-to-End Traceability:** A QR verification module meant for end-buyers to easily verify the freshness and authenticity of their received food.

---

## 🚀 Features Demonstrated in this Prototype

- 📊 **Main Dashboard:** Real-time overview of active devices, shipments, and critical alerts.
- 🗺️ **Shipment Tracking:** An interactive Leaflet map tracing the exact GPS path of a shipment (e.g., Alphonso Mangoes).
- 🌡️ **Environmental Monitoring:** Interactive Recharts graphing live temperature, humidity, and ethylene gas levels with threshold alerts.
- 🔋 **Device Management:** Hardware diagnostics showing battery percentage, solar charging status, and sensor health.
- 📡 **Offline Sync Simulation:** A dedicated testing page to simulate cellular dropouts. Watch the device queue data locally, and seamlessly bulk-upload it when connectivity returns!
- 🔐 **Anti-Tamper Verification:** An interactive simulation to "tamper" with the data, instantly proving how our cryptographic hash-chain detects fraud.
- 📱 **QR Code View:** A consumer-facing UI for simple scan-and-trust verification.

---

## 🛠️ Tech Stack
- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Mapping:** React-Leaflet & OpenStreetMap
- **Data Visualization:** Recharts

---

## 💻 How to Run the Prototype Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AdiRatnam/F2F-GUARDAIN-.git
   cd "F2F-GUARDAIN-/guardian-frontend"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the App:**
   Open your browser and navigate to `http://localhost:5173`

---

## 🎯 Target Audience
1. **SME Exporters:** To monitor shipments and prevent spoilage.
2. **Logistics Managers:** To track fleets and manage device hardware health.
3. **End Consumers/Importers:** To verify food integrity and authenticity via QR scan.

*Built for the Smart India Hackathon.*
