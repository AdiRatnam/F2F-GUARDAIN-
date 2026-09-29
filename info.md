# MASTER PROMPT — FARM-TO-FORK GUARDIAN

## SIH 2026 | Frontend Prototype Development

Act as a senior frontend developer, UI/UX designer and product architect building a professional Smart India Hackathon 2026 prototype.

Your task is to develop a complete, interactive, visually impressive and technically coherent frontend prototype for our project:

**FARM-TO-FORK GUARDIAN**
*A Secure, Low-Power IoT Traceability System for Farm-to-Fork Food Supply Chains.*

This is not just a normal dashboard. It must clearly demonstrate our complete proposed solution to SIH judges, including hardware monitoring, offline-first logging, cryptographic security, automatic synchronization, blockchain verification and end-to-end food traceability.

The frontend must be simple enough to understand immediately, but detailed enough to demonstrate every major feature promised in our official solution.

---

# 1. OFFICIAL PROBLEM STATEMENT

### Background

Global export markets require strict compliance with international traceability standards to prevent food fraud and track contamination outbreaks.

Large enterprises can afford expensive cold-chain monitoring systems, but SMEs cannot.

Additionally, standard data loggers often lose connectivity in remote agricultural areas, creating gaps in supply-chain records.

### Description

There is a need for an affordable, rugged and tamper-proof hardware device that monitors environmental conditions during transportation.

It must withstand moisture, dust and vibrations while tracking:

* Temperature
* Humidity
* Ethylene gas

### Expected Solution

A low-power, plug-and-play IoT sensor node with local cryptographic storage to preserve data integrity during cellular network outages.

The device must support energy harvesting, such as solar or thermal, to extend battery life.

When connectivity returns, it must automatically synchronize encrypted data through lightweight protocols such as MQTT to a decentralized ledger, preventing unauthorized manipulation of cold-chain records.

**Every major requirement above MUST be represented somewhere in the frontend prototype.**

---

# 2. OUR PROPOSED SOLUTION

We propose Farm-to-Fork Guardian: an affordable, rugged, solar-assisted IoT sensor node attached to agricultural food crates or containers.

### Proposed hardware architecture

* ESP32-S3 microcontroller
* SHT45 temperature and humidity sensor
* Calibrated ethylene gas sensor
* Accelerometer for shock/vibration detection
* Tamper detection switch
* RTC for accurate timestamps
* ATECC608C secure element
* Encrypted local Flash / industrial microSD storage
* Solar panel
* MPPT charger
* LiFePO4 battery
* Rugged IP65/IP67 enclosure

### Software and communication architecture

* Offline-first data logging
* Cryptographic signatures and hash-chain integrity
* Cellular / LoRaWAN / Wi-Fi connectivity
* MQTT over TLS
* Backend verification
* EPCIS 2.0-compatible traceability events
* Permissioned blockchain storing batch hashes / Merkle roots
* Web dashboard and QR-based shipment verification

The system must continue recording locally during network outages and synchronize pending records when connectivity returns.

---

# 3. MAIN OBJECTIVE OF THE FRONTEND

Build a functional web application that allows SIH judges to understand and interact with the complete proposed solution.

The frontend will initially use realistic simulated data.

No physical hardware, actual sensor connection or real blockchain deployment is required for this prototype.

However, the interactions must behave convincingly and consistently.

For example:

* Clicking Disconnect Network should change the device status to offline.
* Sensor logging should continue.
* Pending records should increase.
* Clicking Reconnect should initiate synchronization.
* The pending records should move to synchronized records.
* Tampering with a sample record should cause integrity verification to fail.

Do not create buttons that do nothing.

Do not display fake functionality as actual hardware integration. Clearly identify simulated operations where appropriate.

---

# 4. DESIGN AND USER EXPERIENCE

Create a professional, modern, polished dashboard suitable for presentation to government ministry-level evaluators and SIH judges.

### Design direction

Use:

* Clean agricultural technology theme
* Deep navy / dark green / white colour palette
* Subtle green accents
* Professional typography
* Rounded cards
* Clear visual hierarchy
* Consistent icons
* Attractive charts
* Interactive maps
* Smooth but restrained animations

Avoid:

* Excessive gradients
* Unnecessary animations
* Cluttered dashboards
* Too many tiny cards
* Generic AI-generated-looking layouts
* Unnecessary marketing sections
* Overcomplicated navigation

The website should feel like a real commercial IoT monitoring product.

Use the uploaded system architecture image as a reference for understanding the proposed solution and its components. Do not simply reproduce the image as the website.

The application must be responsive, especially for laptop and desktop presentation, while remaining usable on mobile devices.

---

# 5. APPLICATION STRUCTURE

Create a sidebar-based dashboard with these main sections:

1. Dashboard
2. Shipment Tracking
3. Environmental Monitoring
4. Device Management
5. Offline Logging & Synchronization
6. Security & Blockchain Verification
7. Alerts & Notifications
8. QR Shipment Verification

Use a consistent top navigation bar containing:

* Project name and logo
* Current date/time
* Search
* Notifications
* User profile
* System connectivity indicator

---

# 6. PAGE-WISE FUNCTIONAL REQUIREMENTS

## PAGE 1: MAIN DASHBOARD

This is the first page judges should see.

Display an overall summary of the system.

### Summary cards

* Total Shipments
* Active Devices
* Online Devices
* Offline Devices
* Shipments Requiring Attention

### Main visualizations

* Shipment tracking map
* Recent shipment activity
* Environmental monitoring summary
* Recent alerts
* Device connectivity overview

### Shipment condition indicators

GREEN: Conditions within configured limits.

AMBER: Warning or abnormal environmental readings.

RED: Critical environmental excursion or integrity failure.

Use realistic sample data.

The dashboard must immediately communicate what our system does.

## PAGE 2: SHIPMENT TRACKING

Create an interactive shipment tracking interface.

Display a map with shipment locations and routes.

Show the complete supply chain:

Farm → Cold Storage → Transport → Port → Destination.

Each shipment should contain:

* Shipment ID
* Product name
* Batch number
* Origin
* Destination
* Current location
* Assigned device ID
* Shipment status
* Current environmental conditions

When a user clicks a shipment, open a detailed shipment view with:

* Journey timeline
* Location history
* Environmental history
* Alerts generated
* Device information
* Integrity verification status

Use realistic Indian agricultural logistics examples.

## PAGE 3: ENVIRONMENTAL MONITORING

This page demonstrates multi-parameter sensing.

Display individual sensor cards for:

1. Temperature (°C)
2. Humidity (% RH)
3. Ethylene (ppm)
4. Shock/Vibration
5. Battery percentage
6. Sensor health

Include:

* Current readings
* Historical graphs
* Time-range filters
* Commodity-specific configured thresholds
* Normal/warning/critical indicators

Provide an option to select different shipments.

Make charts interactive and readable.

IMPORTANT:
Ethylene values must be treated as sensor readings, not direct proof of freshness or food safety.

## PAGE 4: DEVICE MANAGEMENT

Represent our actual proposed physical IoT hardware.

Show device information:

* Device ID
* ESP32-S3 status
* SHT45 sensor status
* Ethylene sensor status
* Accelerometer status
* Tamper sensor status
* RTC status
* Secure element status
* Battery level
* Solar charging status
* Connectivity type
* Signal strength
* Last synchronization
* Local storage utilization

Include a visual representation of the rugged sensor node.

Show:

* IP65/IP67 enclosure
* Solar panel
* Battery
* Sensors
* Secure storage

Display hardware status through a simple device health panel.

## PAGE 5: OFFLINE LOGGING & SYNCHRONIZATION

THIS IS ONE OF THE MOST IMPORTANT PAGES.

It must demonstrate the central innovation of our project.

Create a dedicated interactive simulation.

### Initial state

Device is connected.

Sensor readings are being recorded.

Records are synchronized.

### When user clicks "Simulate Network Failure"

Display:

* Network status: OFFLINE
* Sensor logging: ACTIVE
* Local storage: ACTIVE
* Pending records: Increasing
* Last successful synchronization
* Cellular connection unavailable

Simulate new sensor records being generated and saved locally.

### When user clicks "Restore Connectivity"

Display:

* Network reconnecting
* MQTT connection established (simulated)
* Pending records being uploaded
* Record verification
* Synchronization completed
* Backend acknowledgement

Show the pending record count decreasing to zero.

Include a synchronization progress indicator and event log.

The user should clearly understand that connectivity loss does not stop local data collection.

Do not claim absolute zero data loss.

## PAGE 6: SECURITY & BLOCKCHAIN VERIFICATION

Create a professional security dashboard.

Show the proposed security workflow:

Sensor Reading → Encryption → Digital Signature → Hash Chain → Local Storage → Backend Verification → Blockchain Proof.

Display:

* Device authentication status
* Cryptographic signing status
* Hash-chain integrity
* Record verification
* Batch hash
* Merkle root
* Blockchain transaction ID (simulated)
* Ledger confirmation status

Include a button:

"Simulate Data Tampering"

When clicked:

* Modify a sample stored reading.
* Trigger integrity verification.
* Display an integrity failure warning.
* Highlight the affected record.
* Show that its verification status has failed.

Include another button:

"Verify Record Integrity"

When clicked, verify the original sample record and display its valid status.

Clearly distinguish between:

* Cryptographic verification
* Backend validation
* Blockchain anchoring

Do not suggest that blockchain itself validates whether the original sensor measurement was truthful.

## PAGE 7: ALERTS & NOTIFICATIONS

Create an alert management page.

Include alerts for:

* High temperature
* Low/high humidity
* Abnormal ethylene reading
* Shock/vibration event
* Physical tampering
* Sensor malfunction
* Low battery
* Connectivity loss
* Synchronization failure
* Data integrity failure

Each alert should have:

* Timestamp
* Shipment ID
* Device ID
* Alert type
* Severity
* Description
* Resolution status

Allow users to filter alerts by severity and status.

## PAGE 8: QR SHIPMENT VERIFICATION

Create a QR-based shipment verification feature.

Every shipment should have a unique QR code.

Provide a button to open or simulate scanning a QR code.

The resulting shipment-specific page must show:

* Product and batch details
* Origin and destination
* Shipment journey
* Environmental history
* Condition status
* Data integrity verification
* Blockchain proof status
* Verification timestamp

Design this page for buyers, exporters and authorized stakeholders.

It should be clean and easy to understand without requiring technical knowledge.

---

# 7. IMPORTANT DEMONSTRATION SCENARIO

Create one complete interactive demo using a sample agricultural shipment.

Example:

Shipment: Alphonso Mangoes

Journey:
Farm → Cold Storage → Transport → Destination.

The demo should allow judges to experience the following sequence:

STEP 1:
Open the dashboard and select the mango shipment.

STEP 2:
View its temperature, humidity, ethylene and vibration readings.

STEP 3:
Open device management and inspect its battery, sensors and connectivity.

STEP 4:
Click "Simulate Network Failure".

STEP 5:
Show sensor logging continuing while records accumulate in local storage.

STEP 6:
Click "Restore Connectivity".

STEP 7:
Show MQTT synchronization and backend verification.

STEP 8:
Open security verification and demonstrate a valid cryptographic record.

STEP 9:
Click "Simulate Data Tampering" and demonstrate integrity failure.

STEP 10:
Open blockchain verification and show the batch proof.

STEP 11:
Open QR verification and display the complete shipment history.

The entire demonstration must work without refreshing the page.

All related pages must use consistent shared shipment and device data.

---

# 8. TECHNICAL IMPLEMENTATION

First inspect the existing project directory and identify the existing framework and dependencies.

If the project is empty, use:

* React
* TypeScript
* Vite
* Tailwind CSS
* Lucide React icons
* Recharts for graphs
* React Router for navigation
* Leaflet or another suitable map library

Use reusable components and a clean folder structure.

Use local mock data and frontend state to simulate the complete workflow.

Avoid unnecessary backend development.

Avoid unnecessary external API dependencies.

Do not require API keys to run the prototype.

Ensure the project runs locally with clear instructions.

Implement functional:

* Navigation
* Filters
* Search
* Shipment selection
* Charts
* Interactive maps
* Simulation buttons
* Status updates
* QR verification
* Alert management

Use realistic, internally consistent sample data.

The same shipment should show the same readings, alerts, location, device and verification status across all pages.

---

# 9. IMPORTANT TECHNICAL AND PRESENTATION RULES

1. The project is an IoT hardware solution, so the frontend must represent the physical device and its actual proposed components.
2. Offline-first logging is a core requirement and must receive special attention.
3. Cryptographic data integrity is essential and must be demonstrated.
4. Automatic synchronization after network recovery must be interactive.
5. MQTT over TLS must be represented in the communication workflow.
6. Blockchain should show batch hashes/Merkle roots rather than storing every raw sensor reading directly.
7. Solar-assisted operation and battery monitoring must be visible.
8. Temperature, humidity and ethylene monitoring must all be included.
9. Dust/moisture-resistant enclosure and vibration resistance must be represented.
10. QR-based end-to-end traceability must be included.
11. The interface must remain simple enough for judges to understand without technical explanations.
12. Do not add unrelated AI features, payment systems, e-commerce functionality or unnecessary modules.
13. Do not make unsupported claims such as guaranteed freshness, zero data loss or indefinite operation without power-budget validation.
14. Do not leave unfinished pages, placeholder buttons or broken interactions.

---

# 10. FINAL EXPECTATION

Build the complete frontend prototype, not just a wireframe, design concept or static screenshot.

Prioritize:

* Functional interactions
* Visual consistency
* Clear system architecture
* Realistic simulated data
* Easy navigation
* Professional presentation
* A compelling end-to-end demonstration

The final prototype should make SIH judges understand three things immediately:

**1. WHAT IS THE PROBLEM?**
SMEs cannot afford reliable, secure cold-chain monitoring, and connectivity gaps create unreliable traceability records.

**2. WHAT IS OUR INNOVATION?**
An affordable, rugged, solar-assisted IoT sensor node that securely logs environmental data offline and automatically synchronizes verifiable records when connectivity returns.

**3. HOW DOES OUR SOLUTION WORK?**
Through sensing → secure local storage → offline logging → MQTT synchronization → backend verification → blockchain proof → dashboard and QR-based traceability.

The final product must look like a realistic, deployable agricultural technology platform rather than a generic student project dashboard.

Start by inspecting the project files, then implement the entire application. Do not stop after planning or describing what you intend to build.


this is the official problem statement description and the expected solution we are to make and should definitely include in our prototype the things mentioned : Background: Global export markets demand strict compliance with international traceability standards to combat food fraud and track contamination outbreaks. While large enterprises can afford complex cold-chain logging systems, Small and Medium Enterprises (SMEs) are priced out. Additionally, standard data loggers often lose connectivity in remote agricultural areas, creating blind spots in the supply chain data. Description: There is a critical need for an affordable, rugged, tamper-proof hardware device that tracks ambient environmental data during transit. The hardware must survive harsh agricultural and industrial environments, including extreme moisture, dust, and vibrations, while continuously logging metrics like temperature, humidity, and ethylene gas. Expected Solution: A low-power, plug-and-play IoT sensor node equipped with local cryptographic storage to ensure data integrity during cellular dropouts. The device must feature energy-harvesting capabilities, such as solar or thermal, to extend battery life indefinitely. Upon reconnecting to a network, it must automatically sync its encrypted data directly to a decentralized ledger via lightweight protocols such as MQTT, preventing any unauthorized manipulation of the cold-chain logs. 
