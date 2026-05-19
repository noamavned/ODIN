<template>
    <!-- 
        Main Header: 
        Mobile-first: flex-col, gap-4, and centered text.
        md (768px+) and up: Automatically snaps back to row layout, space-between, and left-aligned.
    -->
    <header class="flex flex-col gap-4 items-center border-b border-emerald-900/50 pb-4 mb-8 md:flex-row md:justify-between md:items-center md:gap-0">
        
        <!-- Branding / Project Identification -->
        <div class="text-center md:text-left">
            <!-- Font sizes scale cleanly at responsive breakpoints instead of loose vw units -->
            <h1 class="text-2xl font-black tracking-tighter uppercase italic sm:text-3xl">
                Project ODIN
            </h1>
            <p class="text-[10px] text-emerald-600 uppercase tracking-widest sm:text-xs">
                Omnidirectional Digital Interference Nullifier
            </p>
        </div>

        <!-- Hardware Connectivity Status -->
        <!-- On mobile: switches layout to a unified row grouping via flex-row-reverse or side-by-side flex -->
        <div class="flex flex-row items-center gap-3 text-center md:text-right md:flex-col md:gap-0">
            <div class="text-[10px] uppercase text-slate-500 sm:text-xs">
                System Status
            </div>
            <div class="flex items-center gap-2">
                <!-- Status LED -->
                <span 
                    :class="props.FPGAactive ? 'bg-emerald-500' : 'bg-red-500'"
                    class="w-2 h-2 rounded-full animate-pulse"></span>
                
                <span 
                    class="text-xs font-bold uppercase sm:text-sm"
                    :class="props.FPGAactive ? 'text-emerald-400' : 'text-red-400'">
                    {{ props.FPGAactive ? 'FPGA Link Active' : 'FPGA Link Offline' }}
                </span>
            </div>
        </div>
    </header>
</template>

<script setup>
import { defineProps } from 'vue'

/**
 * Component Props
 * @property {Boolean} FPGAactive - Connectivity state with the FPGA controller.
 */
const props = defineProps({
    FPGAactive: {
        type: Boolean,
        default: false
    }
})
</script>