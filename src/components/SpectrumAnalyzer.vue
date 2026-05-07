<template>
    <!-- 
        Spectrum Analyzer Container:
        Visualizes the signal in the Frequency Domain. 
        Uses a semi-transparent slate background to maintain dashboard depth.
    -->
    <div class="bg-slate-900/50 border border-emerald-900/30 rounded-xl p-6">
        
        <h2 class="text-sm uppercase mb-4 font-bold text-emerald-500/70 tracking-widest text-right">
            Frequency Domain Analysis
        </h2>

        <!-- 
            Visualization Viewport:
            'items-end' ensures bars grow from the bottom up, mimicking 
            standard hardware spectrum analyzers.
        -->
        <div class="h-32 flex items-end gap-1 overflow-hidden">
            <!-- 
                Dynamic Bar Generation:
                Iterates through frequency bins provided by the 'bars' prop.
            -->
            <div v-for="(bar, i) in bars" :key="i"
                class="flex-1 bg-emerald-500/40 rounded-t-sm transition-all duration-75"
                :style="{ 
                    height: `${bar}%`, 
                    opacity: bar / 100 
                }">
                <!-- 
                    Logic Note: 
                    The 'opacity' is tied to the value (bar/100), 
                    creating a visual "intensity" effect—stronger signals 
                    appear brighter, while noise appears dimmer.
                -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

/**
 * Component Props
 * @property {Array} bars - An array of numerical values (0-100) 
 *                          representing the magnitude of specific frequency bands.
 */
defineProps(['bars'])
</script>