<template>
    <!-- 
        Spectrum Analyzer Container:
        Visualizes the signal in the Frequency Domain. 
    -->
    <div class="bg-slate-900/50 border border-emerald-900/30 rounded-xl p-6">
        
        <h2 class="text-sm uppercase mb-4 font-bold text-emerald-500/70 tracking-widest text-right">
            Frequency Domain Analysis
        </h2>

        <!-- Visualization Viewport -->
        <div class="h-32 flex items-end gap-1 overflow-hidden">
            <!-- 
                Dynamic Bar Generation:
                Removed 'transition-all duration-75' to prevent animation clashing.
                The 50ms parent loop now drives a crisp, raw hardware response.
            -->
            <div v-for="(bar, i) in bars" :key="i"
                class="flex-1 bg-emerald-500/40 rounded-t-sm"
                :style="{ 
                    height: `${bar}%`, 
                    opacity: bar / 100 
                }">
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

/**
 * Component Props
 * @property {Array} bars - An array of numerical values (0-100)
 */
defineProps({
    bars: {
        type: Array,
        required: true,
        default: () => []
    }
})
</script>