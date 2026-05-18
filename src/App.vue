<template>
    <!-- Main UI Container: Styled with a dark "terminal" aesthetic -->
    <div class="relative w-full h-screen bg-[#020617] overflow-hidden text-emerald-400 font-mono">
        <!-- Primary Viewport -->
        <main class="w-full h-full p-6 overflow-y-auto select-none">
            <!-- System Status Indicator -->
            <StatusHeader v-model:FPGAactive="systemStatus" />

            <!-- Layout Grid: 7/12 for Radar, 5/12 for auxiliary data -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
                <!-- Radar/Bearing Viewport -->
                <div class="lg:col-span-7">
                    <RadarDisplay :angle="bearing" :confidence="confidence" />
                </div>

                <!-- Signal Analysis Column -->
                <div class="lg:col-span-5 space-y-6">
                    <SpectrumAnalyzer :bars="spectrumBars" />
                    <ControlPanel :gain="gainLevel" />
                </div>
            </div>
        </main>

        <!-- Sidebar Backdrop: Blurs the background when logs are open -->
        <Transition name="fade">
            <div v-if="isSidebarOpen" @click="isSidebarOpen = false"
                class="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-30"></div>
        </Transition>

        <!-- Event Logs Sidebar -->
        <Transition name="slide">
            <LogsSidebar v-if="isSidebarOpen" :entries="logs" class="z-40" />
        </Transition>

        <!-- Sidebar Toggle Tab: Floats on the right edge -->
        <button @click="isSidebarOpen = !isSidebarOpen"
            class="fixed right-0 top-1/2 -translate-y-1/2 z-50 transition-transform duration-300 select-none"
            :class="{ '-translate-x-80': isSidebarOpen }">
            <div
                class="bg-slate-900 border-y border-l border-emerald-500/30 p-2 py-8 flex flex-col items-center gap-4 shadow-[-5px_0_15px_rgba(0,0,0,0.5)]">
                <span class="vertical-text text-[9px] font-black uppercase tracking-[0.3em]">
                    {{ isSidebarOpen ? "CLOSE" : "LOGS" }}
                </span>
                <!-- Visual Heartbeat/Status LED -->
                <div class="w-1 h-1 bg-emerald-500" :class="{ 'animate-ping': !isSidebarOpen }"></div>
            </div>
        </button>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import StatusHeader from "./components/StatusHeader.vue";
import RadarDisplay from "./components/RadarDisplay.vue";
import SpectrumAnalyzer from "./components/SpectrumAnalyzer.vue";
import ControlPanel from "./components/ControlPanel.vue";
import LogsSidebar from "./components/LogsSidebar.vue";

// --- State Management ---
const bearing = ref(45.0); // Calculated angle of the target
const confidence = ref(92); // Reliability percentage of the current signal
const gainLevel = ref(45); // Current amplification level
const spectrumBars = ref([10, 40, 80, 20, 50, 30, 90, 40]); // Visual frequencies
const systemStatus = ref(true) // Represents FPGA connectivity, linked to StatusHeader

/**
 * UI Refresh Loop:
 * Updates visual-only elements (spectrum and subtle needle jitter)
 * at 20fps for smooth animation.
 */
onMounted(() => {
    setInterval(() => {
        // Apply low-frequency oscillation to the bearing for visual "hunting" effect
        bearing.value = 45 + Math.sin(Date.now() / 1000) * 10;

        // Simulate frequency hopping/noise in the spectrum analyzer
        spectrumBars.value = spectrumBars.value.map((bar) => {
            const noise = Math.random() * 20 - 10;
            return Math.max(10, Math.min(100, bar + noise));
        });

        // Modulate gain slightly to simulate electronic fluctuation
        gainLevel.value = Number((40 + Math.random() * 10).toFixed(2));
    }, 50);
});

/**
 * Heuristic Confidence Logic:
 * Simulates how signal reliability drops based on physical factors.
 * @param {Number} currentAngle - Newest bearing
 * @param {Number} lastAngle - Previous bearing for delta calculation
 * @param {Number} currentGain - Current system gain level
 */
const calculateSimulatedConfidence = (currentAngle, lastAngle, currentGain) => {
    let base = 98;

    // Movement Penalty: Significant angular jumps indicate a lost or unstable lock
    const delta = Math.abs(currentAngle - lastAngle);
    const movementPenalty = delta * 2.5;

    // Noise Penalty: High gain indicates a weak SNR (Signal-to-Noise Ratio)
    const noisePenalty = currentGain > 60 ? (currentGain - 60) * 0.8 : 0;

    // Jitter: General environmental interference
    const jitter = Math.random() * 3;

    const result = base - movementPenalty - noisePenalty - jitter;

    // Normalize between 0-100% and round to 1 decimal place
    return Number(Math.max(0, Math.min(100, result)).toFixed(1));
};

// Tracking State
let lastAngle = 45;
let lastLockState = false;

/**
 * Main Logic Loop (Physics/Signal Emulation):
 * Runs at a slower interval than the UI to simulate data processing cycles.
 */
setInterval(() => {
    // Simulate target motion using a sine wave across a 60-degree arc
    const targetAngle = 45 + Math.sin(Date.now() / 2000) * 30;

    // Update confidence based on the movement since the last pulse
    const calculatedConf = calculateSimulatedConfidence(
        targetAngle,
        lastAngle,
        gainLevel.value,
    );

    // Sync reactive state to UI components
    bearing.value = targetAngle;
    confidence.value = calculatedConf;

    lastAngle = targetAngle;

    // Lock-On Detection Logic
    // Note: User logic currently sets isLocked true only if confidence > 100 (Edge case)
    const isLocked = confidence.value > 100;

    if (isLocked && !lastLockState) {
        addLog(`Target Acquired: Bearing ${bearing.value.toFixed(1)}°`, "SIGNAL");
        lastLockState = true;
    } else if (!isLocked && lastLockState) {
        addLog("Target Lock Lost - Re-scanning...", "WARN");
        lastLockState = false;
    }
}, 100);

// --- Sidebar & Logging Logic ---
const isSidebarOpen = ref(false);
const logs = ref([
    // { time: "00:01:15", type: "SYS", msg: "BACKDROP LAYER INITIALIZED" },
]);

/**
 * Appends system events to the log buffer.
 * Includes automatic timestamping and buffer management.
 */
const addLog = (message, type = "SYS") => {
    const timestamp = new Date().toLocaleTimeString("en-GB", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    // Unshift adds new items to the top of the stack
    logs.value.unshift({
        time: timestamp,
        type: type.toUpperCase(),
        msg: message,
    });

    // Memory Management: Prevents logs from consuming too much memory over time
    if (logs.value.length > 50) {
        logs.value.pop();
    }
};
window.addLog = addLog; // Expose globally for StatusHeader to call

// eslint-disable-next-line no-unused-vars
function toggleFPGAStatus() {
    systemStatus.value = !systemStatus.value;
}
window.toggleFPGAStatus = toggleFPGAStatus;

addLog("ODIN SYSTEM BOOT SEQUENCE INITIATED", "SYS");
</script>

<style>
/* Rotates text for the sidebar tab handle */
.vertical-text {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
}

/* 
   Vue Transition Classes 
   Handles the smooth "sliding" of the log panel 
*/
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}

/* 
   Backdrop Fade 
   Controls the opacity of the background dimming 
*/
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
