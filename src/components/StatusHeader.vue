<template>
    <!-- 
        Main Header: 
        Uses a flex layout to push branding to the left and system status to the right.
        The emerald-900/50 border maintains the consistent "Tactical UI" theme.
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
                <!-- 
                    Status LED: 
                    Switches color based on the 'active' prop and uses an 
                    animate-pulse to signify a "living" connection.
                -->
                <span id="fpga-status-led"
                    :class="props.FPGAactive ? 'bg-emerald-500' : 'bg-red-500'"
                    class="w-2 h-2 rounded-full animate-pulse"></span>
                
                <span id="fpga-status-text"
                    class="text-sm font-bold uppercase"
                    :class="props.FPGAactive ? 'text-emerald-400' : 'text-red-400'">
                    {{
                        props.FPGAactive ? 'FPGA Link Active' : 'FPGA Link Offline'
                    }}
                </span>
            </div>
        </div>
    </header>
</template>

<script setup>
import { defineProps, watch } from 'vue'

/**
 * Component Props
 * @property {Boolean} FPGAactive - Represents the connectivity state with the FPGA controller.
 *                              Determines the LED color and status text.
 */
// eslint-disable-next-line no-unused-vars
var props = defineProps({
    FPGAactive: {
        type: Boolean,
        default: false
    }
})


// eslint-disable-next-line no-unused-vars
setInterval(() => {
    // update header status every 5 seconds
    const ledObj = document.getElementById('fpga-status-led')
    const txtObj = document.getElementById('fpga-status-text')
    if (props.FPGAactive !== false) {
        ledObj.classList.replace('bg-red-500', 'bg-emerald-500')
        txtObj.classList.replace('text-red-400', 'text-emerald-400')
    } else {
        ledObj.classList.replace('bg-emerald-500', 'bg-red-500')
        txtObj.classList.replace('text-emerald-400', 'text-red-400')
    }
}, 1000)

watch(() => props.FPGAactive, () => {
    if (window.addLog) {
        window.addLog(
            props.FPGAactive ? "FPGA LINK ACTIVE" : "FPGA LINK OFFLINE",
            props.FPGAactive ? "SUCCESS" : "ERROR"
        )
    }
})
</script>
