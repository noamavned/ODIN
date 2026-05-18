<template>
    <!-- 
        Main Header: 
        Uses a flex layout to push branding to the left and system status to the right.
    -->
    <header class="flex justify-between items-center border-b border-emerald-900/50 pb-4 mb-8">
        
        <!-- Branding / Project Identification -->
        <div>
            <h1 class="text-3xl font-black tracking-tighter uppercase italic">Project ODIN</h1>
            <p class="text-xs text-emerald-600 uppercase tracking-widest">
                Omnidirectional Digital Interference Nullifier
            </p>
        </div>

        <!-- Hardware Connectivity Status -->
        <div class="text-right">
            <div class="text-xs uppercase text-slate-500">System Status</div>
            <div class="flex items-center gap-2">
                <!-- Status LED -->
                <span 
                    :class="props.FPGAactive ? 'bg-emerald-500' : 'bg-red-500'"
                    class="w-2 h-2 rounded-full animate-pulse"></span>
                
                <span 
                    class="text-sm font-bold uppercase"
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