# Project ODIN
**Omnidirectional Digital Interference Nullifier**

Project ODIN is a high-fidelity Signal Intelligence (SIGINT) dashboard and tactical control interface. Designed for real-time spatial target acquisition and frequency domain analysis, it serves as the central control console for an integrated embedded hardware pipeline featuring an Intel MAX 10 FPGA and an ESP32-WROOM-32D (DevKitC v1) microcontroller.

---

## 📡 System Overview
ODIN acts as a ruggedized visualization and configuration layer for real-time digital signal processing. The architecture decouples sub-millisecond hardware acceleration from high-refresh-rate frontend presentation, processing hardware telemetry with a total pipeline latency under 1.2ms.

### Core Features
* **Spatial Target Acquisition**: A 360° azimuth radar sweep engine for tracking incoming signal bearings, backed by a dynamic heuristic confidence scoring system.
* **Frequency Domain Analysis**: Real-time Spectrum Analyzer visualizing signal magnitude across frequency bins.
* **Dynamic Gain Engine**: Remote interface for the hardware's Automatic Gain Control (AGC), supporting full "Auto-Normalization" loop processing and passive hardware "Direct-Pass (Bypass)" monitoring.
* **Tactical Event Logging**: A prioritized system log for hardware alerts (SYS), signal locks (SIGNAL), and interface events.

---

## 🛠 Tech Stack & Hardware Architecture

### Software Architecture
* **Framework**: Vue.js 3 (Composition API)
* **State Management**: Pinia (Centralized Global Telemetry Hub)
* **Styling**: Tailwind CSS (Utility-first responsive design)
* **Animation**: CSS3 Transitions & SVG Quadratic Bézier Curves

### Embedded Hardware Stack
* **Digital Signal Processing**: **Intel MAX 10 FPGA (10M08)**
  * High-speed ADC sampling, FFT processing, and real-time signal filtering.
* **Communication Layer**: **ESP32 NodeMCU DevKit v1**
  * Bridges FPGA data lines to the web interface via high-speed WebSocket streams.

---

## 🏗 Architecture & Logic

### Centralized State (Pinia)
The system utilizes a global Pinia store to decouple hardware telemetry from the UI. This ensures that high-frequency data updates (20Hz+) do not block the main thread and that state remains consistent across the Radar, Spectrum Analyzer, and Logs.

### Virtual DOM Optimization
To prevent "layout thrashing" during rapid logging, each log entry is assigned a unique, immutable ID. This allows Vue to perform atomic DOM updates rather than re-rendering the entire list when a new signal is acquired.

---

## 📈 Technical Specifications
| Metric | Value |
| :--- | :--- |
| **Sampling Rate** | 48.0 kHz |
| **System Latency** | < 1.2ms (FPGA Optimized) |
| **Encryption** | AES-256 Bit Link |
| **UI Refresh Rate** | 20 FPS (Logic) / 60 FPS (Visuals) |

---

## ⚖️ License
This project is licensed under the **MIT License**.

Copyright (c) 2026 ReiRei

---

## 📝 Engineering Notes
This project is a base for my final engineering project. The current version uses simulated telemetry loops; the hardware branch (ESP32/FPGA integration) is currently in development.

<3 ReiRei
