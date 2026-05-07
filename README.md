# Project ODIN
**Omnidirectional Digital Interference Nullifier**

Project ODIN is a high-fidelity Signal Intelligence (SIGINT) dashboard and control interface. Designed for real-time spatial target acquisition and frequency domain analysis, it serves as the frontend for an integrated embedded system (FPGA/ESP32).

## 📡 System Overview
ODIN provides a tactical visualization layer for raw signal data. It is engineered to handle high-speed telemetry with sub-1.2ms latency, offering operators a comprehensive view of the local electromagnetic spectrum and spatial signal origins.

### Core Features
*   **Spatial Target Acquisition**: A 360° radar interface for tracking signal bearings with heuristic confidence scoring.
*   **Frequency Domain Analysis**: Real-time Spectrum Analyzer visualizing signal magnitude across frequency bins.
*   **Dynamic Gain Engine**: An Automatic Gain Control (AGC) interface with "Auto-Normalization" and "Direct-Pass" modes.
*   **Signal Intelligence Metadata**: Real-time telemetry monitoring including sampling rates (48.0 kHz), hardware thermals, and link security (AES-256).
*   **Tactical Event Logging**: A prioritized system log for hardware alerts (SYS) and interface events (UI).

---

## 🛠 Tech Stack
*   **Framework**: Vue.js 3 (Composition API)
*   **Styling**: Tailwind CSS
*   **Animations**: CSS3 Transitions & SVG Quadratic Bézier Curves
*   **Hardware Integration**: Designed for FPGA/ESP32 Serial/WebSocket data streams

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v16+)
*   npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/project-odin.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🏗 Architecture & Logic

### Signal Confidence Heuristic
The system calculates target reliability based on three primary vectors:
1.  **Movement Delta**: Rapid changes in bearing reduce lock confidence.
2.  **Gain Penalty**: Higher amplification levels suggest a lower Signal-to-Noise Ratio (SNR).
3.  **Environmental Jitter**: Simulated electronic noise floor.

### Visual Aesthetic (CRT Terminal)
The UI utilizes a custom "Scanline" CSS layer and neon glow effects to simulate a ruggedized hardware terminal.
*   **Global Scanlines**: Created via linear gradients to mimic cathode ray tube (CRT) monitors.
*   **Tabular Numerals**: Ensuring UI stability during high-frequency data updates.
*   **Tactical Geometry**: Components use `clip-path` polygons rather than standard border-radii for an industrial feel.

---

## 📈 Technical Specifications
| Metric | Value |
| :--- | :--- |
| **Sampling Rate** | 48.0 kHz |
| **System Latency** | < 1.2ms (FPGA Optimized) |
| **Encryption** | AES-256 Bit Link |
| **UI Refresh Rate** | 20 FPS (Logic) / 60 FPS (Transitions) |

---

## ⚖️ License
This project is licensed under the **MIT License**.

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## 📝 Notes
This project is a base for my final engineering project and involves fake data.

I do not have the database set up and connected to the ESP32 yet, but once I have it set up, I will add it as another branch.

<3 ReiRei
