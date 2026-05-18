import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useOdinStore = defineStore("odin", () => {
    // --- State Management ---
    const trueBearing = ref(45.0);
    const visualJitter = ref(0.0);
    const confidence = ref(92);
    const gainLevel = ref(45);
    const spectrumBars = ref([10, 40, 80, 20, 50, 30, 90, 40]);
    const systemStatus = ref(true);
    const isSidebarOpen = ref(false);
    const logs = ref([]);

    // --- References for Timer Management ---
    let uiTimer = null;
    let logicTimer = null;
    
    // --- Computed Properties ---
    const bearing = computed(() => trueBearing.value + visualJitter.value);

    // --- Log Counter Variable ---
    let logCounter = 0; // Simple unique ID generator

    const addLog = (message, type = "SYS") => {
        const timestamp = new Date().toLocaleTimeString("en-GB", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

        // Inject a unique ID that NEVER changes even when the item shifts index
        logs.value.unshift({
            id: logCounter++, 
            time: timestamp,
            type: type.toUpperCase(),
            msg: message,
        });

        if (logs.value.length > 50) {
            logs.value.pop();
        }
    };

    const toggleFPGAStatus = () => {
        systemStatus.value = !systemStatus.value;
    };

    watch(systemStatus, (newStatus) => {
        addLog(
            newStatus ? "FPGA LINK ACTIVE" : "FPGA LINK OFFLINE",
            newStatus ? "SUCCESS" : "ERROR"
        );
    });

    const calculateSimulatedConfidence = (currentAngle, lastAngle, currentGain) => {
        let base = 98;
        const delta = Math.abs(currentAngle - lastAngle);
        const movementPenalty = delta * 2.5;
        const noisePenalty = currentGain > 60 ? (currentGain - 60) * 0.8 : 0;
        const jitter = Math.random() * 3;

        const result = base - movementPenalty - noisePenalty - jitter;
        return Number(Math.max(0, Math.min(100, result)).toFixed(1));
    };

    // --- Initialize Hardware Connections & Loops ---
    const connectTelemetry = () => {
        addLog("ODIN SYSTEM BOOT SEQUENCE INITIATED", "SYS");

        // UI Refresh Loop (20fps)
        uiTimer = setInterval(() => {
            visualJitter.value = Math.sin(Date.now() / 1000) * 3;

            spectrumBars.value = spectrumBars.value.map((bar) => {
                const noise = Math.random() * 20 - 10;
                return Math.max(10, Math.min(100, bar + noise));
            });

            gainLevel.value = Number((40 + Math.random() * 10).toFixed(2));
        }, 50);

        // Physics/Signal Logic Loop (10fps)
        let lastAngle = 45;
        let lastLockState = false;

        logicTimer = setInterval(() => {
            const targetAngle = 45 + Math.sin(Date.now() / 2000) * 30;
            const calculatedConf = calculateSimulatedConfidence(
                targetAngle,
                lastAngle,
                gainLevel.value
            );

            trueBearing.value = targetAngle;
            confidence.value = calculatedConf;
            lastAngle = targetAngle;

            const isLocked = confidence.value > 100; // Keeping your custom edge case logic intact

            if (isLocked && !lastLockState) {
                addLog(`Target Acquired: Bearing ${trueBearing.value.toFixed(1)}°`, "SIGNAL");
                lastLockState = true;
            } else if (!isLocked && lastLockState) {
                addLog("Target Lock Lost - Re-scanning...", "WARN");
                lastLockState = false;
            }
        }, 100);
    };

    // --- Disconnect & Cleanup ---
    const disconnectTelemetry = () => {
        clearInterval(uiTimer);
        clearInterval(logicTimer);
        addLog("ODIN SYSTEM LINK TERMINATED DOCKING CONSOLE", "WARN");
    };

    return {
        trueBearing, visualJitter, confidence, gainLevel, spectrumBars, systemStatus,
        isSidebarOpen, logs, bearing, addLog, toggleFPGAStatus, connectTelemetry, disconnectTelemetry
    };
});