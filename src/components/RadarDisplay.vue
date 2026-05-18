<template>
    <!-- 
        Radar Container: 
        Uses 'flex-col justify-between' to anchor the title at the top 
        and the data readouts at the bottom, leaving the center for the radar plot.
    -->
    <section
        class="bg-slate-900/40 backdrop-blur-md border border-emerald-500/20 rounded-xl p-8 border-glow relative overflow-hidden h-full flex flex-col justify-between">

        <!-- Plotter Grid: Subtle radial dots to simulate a coordinate system background -->
        <div class="absolute inset-0 opacity-10 pointer-events-none"
            style="background-image: radial-gradient(#10b981 1px, transparent 1px); background-size: 20px 20px;"></div>

        <!-- Component Header with "Scanning" status pulse -->
        <h2
            class="text-xs uppercase mb-8 font-black text-emerald-500/50 tracking-[0.3em] flex items-center gap-2 relative z-20">
            <span class="w-2 h-2 bg-emerald-500 animate-ping rounded-full"></span>
            Spatial Target Acquisition
        </h2>

        <!-- 
            The Radar Disc:
            Represents the 360° azimuth field. Concentric rings provide 
            a visual reference for range/signal depth.
        -->
        <div
            class="relative w-72 h-72 mx-auto rounded-full border border-emerald-500/30 flex items-center justify-center z-10">

            <!-- Cardinal Direction Markers (Bearing Degrees) -->
            <span class="absolute top-2 text-[10px] font-bold text-emerald-700/60">000°</span>
            <span class="absolute right-2 text-[10px] font-bold text-emerald-700/60">090°</span>
            <span class="absolute bottom-2 text-[10px] font-bold text-emerald-700/60">180°</span>
            <span class="absolute left-2 text-[10px] font-bold text-emerald-700/60">270°</span>

            <!-- Range Rings: Purely aesthetic depth markers -->
            <div class="absolute inset-8 border border-emerald-500/10 rounded-full"></div>
            <div class="absolute inset-20 border border-emerald-500/10 rounded-full"></div>
            <div class="absolute inset-32 border border-emerald-500/5 rounded-full"></div>

            <!-- 
                Radar Needle (Direction Indicator):
                Stripped the 300ms CSS transition. The 50ms frame rate from 
                App.vue now feeds a raw, live hardware tracking dynamic.
            -->
            <div class="absolute bottom-1/2 left-1/2 w-[2px] h-32 origin-bottom"
                :style="{ transform: `translateX(-50%) rotate(${angle}deg)` }">
                <div
                    class="w-full h-full bg-gradient-to-t from-transparent via-emerald-500/40 to-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.6)] relative">
                    <!-- Needle Tip: Highlights the exact bearing point -->
                    <div
                        class="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full blur-[1px] shadow-[0_0_10px_white]">
                    </div>
                </div>
            </div>

            <!-- Center Origin Point: Represents the observer/antenna location -->
            <div class="w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_15px_#34d399] z-20 border-2 border-slate-950">
            </div>
        </div>

        <!-- 
            Data Readout Footer:
            Displays the precise numerical state for technical monitoring.
        -->
        <div class="mt-10 flex justify-between gap-4 relative z-20">
            <!-- Bearing Display -->
            <div class="flex-1 bg-slate-950/80 p-3 border-l-2 border-emerald-500 rounded-r-lg shadow-inner">
                <span class="text-[9px] uppercase text-emerald-900 block font-black tracking-widest">Bearing</span>
                <span class="text-2xl font-black glow tabular-nums">{{ angle.toFixed(1) }}°</span>
            </div>
            <!-- Confidence/SNR Reliability -->
            <div class="flex-1 bg-slate-950/80 p-3 border-l-2 border-emerald-500 rounded-r-lg text-right shadow-inner">
                <span class="text-[9px] uppercase text-emerald-900 block font-black tracking-widest">Confidence</span>
                <!-- Added tabular-nums here to stabilize character width shifting -->
                <span class="text-2xl font-black glow tabular-nums">{{ confidence }}%</span>
            </div>
        </div>
    </section>
</template>

<script setup>
import { defineProps } from 'vue'

/**
 * Component Props
 * @property {Number} angle - The target azimuth in degrees (0-359).
 * @property {Number} confidence - Percentage (0-100) of signal reliability.
 */
defineProps({
    angle: {
        type: Number,
        default: 0
    },
    confidence: {
        type: [Number, String],
        default: 0
    }
})
</script>

<style scoped>
/* Neon glow for critical numerical data */
.glow {
    text-shadow: 0 0 10px rgba(52, 211, 153, 0.7);
}

/* Outer box shadow for panel elevation */
.border-glow {
    box-shadow: 0 0 25px rgba(6, 78, 59, 0.2);
}

/**
 * UI Stability:
 * Prevents "jittering" of the dashboard layout when numbers update.
 */
.tabular-nums {
    font-variant-numeric: tabular-nums;
}

/* Optional: Background rotation for an "active sweep" effect */
.scan-ring {
    animation: spin 10s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
</style>