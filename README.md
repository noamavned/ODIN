<div align="center">

# PROJECT ODIN

### Omnidirectional Digital Interference Nullifier

<img src="https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge" />
<img src="https://img.shields.io/badge/FPGA-Intel%20MAX%2010-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/MCU-ESP32-red?style=for-the-badge" />
<img src="https://img.shields.io/badge/Frontend-Vue%203-42b883?style=for-the-badge" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />

### Real-Time DSP Visualization & Tactical Signal Interface

> FPGA accelerated • Ultra-low latency • Real-time telemetry • Tactical visualization

</div>

---

# Overview

PROJECT ODIN is a high-performance signal intelligence dashboard designed for real-time digital signal processing, telemetry visualization, and embedded systems experimentation.

The platform combines:

- **Intel MAX 10 FPGA acceleration** for deterministic DSP workloads
- **ESP32 telemetry and command routing** for wireless communication
- **Vue.js frontend rendering** for responsive tactical visualization

ODIN functions as the central command interface for a distributed embedded pipeline capable of acquiring, analyzing, and visualizing incoming signal activity with ultra-low latency.

---

# System Architecture

```text
┌───────────────────────────────────────────────────────┐
│                   PROJECT ODIN                        │
├───────────────────────────────────────────────────────┤
│                                                       │
│   Intel MAX 10 FPGA                                   │
│   • ADC Sampling                                      │
│   • FFT Processing                                    │
│   • Signal Filtering                                  │
│   • Gain Processing                                   │
│                                                       │
└───────────────┬───────────────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────────────────────┐
│                 ESP32 DevKitC v1                      │
│   • WebSocket Bridge                                  │
│   • Serial Interface                                  │
│   • Command Routing                                   │
│   • Telemetry Packaging                               │
└───────────────┬───────────────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────────────────────┐
│                Vue.js Tactical UI                     │
│   • Radar Visualization                               │
│   • FFT Spectrum Analyzer                             │
│   • AGC Controls                                      │
│   • Event Logging                                     │
└───────────────────────────────────────────────────────┘
```

---

# Core Features

| Feature | Description |
|---|---|
| Spatial Target Acquisition | 360° radar sweep engine with heuristic confidence scoring |
| Frequency Domain Analysis | Real-time FFT spectrum analyzer |
| Dynamic Gain Engine | Remote AGC configuration and adaptive modes |
| Tactical Event Logging | Prioritized system and telemetry event tracking |

---

# Technical Specifications

| Metric | Value |
|---|---|
| Sampling Rate | 48.0 kHz |
| Processing Latency | < 1.2 ms |
| FPGA Platform | Intel MAX 10 (10M08) |
| MCU Platform | ESP32-WROOM-32D |
| Communication | WebSocket / Serial |
| UI Refresh Rate | 60 FPS |
| Data Logic Refresh | 20 FPS |

---

# Software Stack

| Technology | Purpose |
|---|---|
| Vue.js 3 | Frontend framework |
| Pinia | State management |
| Tailwind CSS | Styling system |
| WebSocket | Telemetry transport |

---

# Development Status

## Completed
- Frontend architecture
- Telemetry simulation engine
- FFT visualization pipeline
- Tactical radar UI
- Event logging subsystem

## In Progress
- FPGA RTL implementation
- ESP32 firmware integration
- ADC hardware validation
- Real telemetry synchronization

## Planned
- Multi-channel acquisition
- Beamforming support
- Signal classification heuristics
- Embedded ML integration

---

# Repository Structure

```text
project-odin/
├── frontend/
├── firmware/
├── fpga/
├── docs/
└── README.md
```

---

# Frontend Setup

```bash
git clone https://github.com/noamavned/project-odin.git

cd project-odin/frontend

npm install

npm run dev
```

---

# Engineering Notes

PROJECT ODIN is part of a final engineering certification project focused on FPGA-based DSP acceleration, embedded telemetry systems, and real-time visualization architecture.

The current public release uses simulated telemetry while the embedded hardware layer remains under active development.

---

# License

MIT License

---

# Author

Prepared by **ReiRei**
