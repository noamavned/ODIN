<template>
    <!-- 
        Control Panel Container: 
        Uses a semi-transparent slate background and a custom 'border-glow' 
        to maintain the tactical aesthetic. 
    -->
    <div class="bg-slate-900/50 border border-emerald-900/30 rounded-xl p-6 border-glow shadow-2xl">

        <!-- Header Section: Mode Identification -->
        <div class="flex justify-between items-center mb-6">
            <div class="space-y-1">
                <h2 class="text-sm uppercase font-black text-emerald-500/70 tracking-[0.2em] italic">
                    Volume Stabilizer
                </h2>
                <p class="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                    Dynamic Gain Engine
                </p>
            </div>

            <!-- 
                Tactical Toggle:
                Switches between 'Online' (Active processing) and 'Bypass' (Direct signal).
            -->
            <button @click="active = !active" class="btn-tactical" :class="{ 'is-off': !active }">
                <span class="status-led"></span>
                <span class="glow">
                    <!-- Label hidden on mobile to maintain layout integrity -->
                    <span class="hidden md:inline">{{ active ? 'Online' : 'Bypass' }}</span>
                </span>
            </button>
        </div>

        <!-- 
            Gain Level Indicator:
            Visualizes the current amplification or attenuation percentage.
        -->
        <div class="space-y-2">
            <div class="flex justify-between text-[10px] font-bold uppercase text-emerald-900">
                <span>Level</span>
                <span>{{ gain }}%</span>
            </div>

            <!-- Progress Track -->
            <div class="w-full bg-slate-950 h-5 rounded-sm border border-emerald-900/20 overflow-hidden relative">
                <!-- 
                    Dynamic Level Bar:
                    Width is bound to the 'gain' prop. 
                    Color shifts to slate-800 when in Bypass mode.
                -->
                <div class="h-full transition-all duration-500 ease-out relative"
                    :class="active ? 'bg-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-slate-800'"
                    :style="{ width: `${gain}%` }">
                    <!-- Pulse animation to signify active data processing -->
                    <div v-if="active" class="absolute inset-0 bg-white/10 animate-pulse"></div>
                </div>
            </div>
        </div>

        <!-- Status Footer: Provides high-level operational context -->
        <div class="mt-4 pt-4 border-t border-emerald-900/20 flex justify-between items-center">
            <span class="text-[9px] text-slate-500 uppercase tracking-tighter font-bold">
                Mode: {{ active ? 'Auto-Normalization' : 'Direct-Pass' }}
            </span>
            <span v-if="active" class="text-[9px] text-emerald-600 animate-pulse font-black uppercase">
                Stabilizing...
            </span>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'

/**
 * Component Props
 * @property {Number} gain - The current gain level (0-100) received from the system.
 */
defineProps({
    gain: {
        type: Number,
        default: 0
    }
})

// Local state to toggle the AGC (Automatic Gain Control) logic
const active = ref(true)
</script>

<style scoped>
/* --- ODIN TACTICAL UI STYLES --- */

/**
 * Tactical Button Styling:
 * Uses a complex clip-path to create a ruggedized, industrial shape.
 */
.btn-tactical {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 100px;
    height: 34px;
    padding: 0 14px;
    background: rgba(16, 185, 129, 0.05);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #34d399;
    font-size: 10px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Creates the angular, cut-corner look */
    clip-path: polygon(0 0, 90% 0, 100% 30%, 100% 100%, 10% 100%, 0 70%);
}

/* Responsive adjustment: Ensures the button fits on mobile/tablet viewports */
@media (max-width: 768px) {
    .btn-tactical {
        min-width: 45px;
        padding: 0 8px;
        clip-path: polygon(0 0, 85% 0, 100% 25%, 100% 100%, 15% 100%, 0 75%);
    }

    .status-led {
        margin-right: 4px !important;
    }
}

.btn-tactical:hover {
    border-color: #10b981;
    background: rgba(16, 185, 129, 0.12);
    transform: scale(1.02);
}

.btn-tactical:active {
    transform: translateY(1px) scale(0.98);
    background: rgba(16, 185, 129, 0.25);
}

/* Visual state for the 'Bypass' mode */
.btn-tactical.is-off {
    color: #475569;
    border-color: #1e293b;
    background: rgba(30, 41, 59, 0.1);
}

/**
 * Status LED:
 * Simulates a physical hardware light with a CSS glow.
 */
.status-led {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 10px;
    background-color: #10b981;
    box-shadow: 0 0 8px #10b981;
    transition: all 0.3s ease;
}

.btn-tactical.is-off .status-led {
    background-color: #1e293b;
    box-shadow: none;
}

.glow {
    text-shadow: 0 0 8px rgba(52, 211, 153, 0.5);
    display: flex;
    align-items: center;
}

.border-glow {
    box-shadow: 0 0 20px rgba(6, 78, 59, 0.2);
}
</style>