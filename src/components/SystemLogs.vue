<template>
    <!-- 
        Log Container: 
        Uses a fixed height (h-32) and hidden overflow to maintain a compact 
        dashboard footprint. The 'font-mono' ensures character alignment.
    -->
    <div
        class="bg-slate-950 border border-emerald-900/30 rounded-xl p-4 h-32 overflow-hidden relative font-mono text-[10px]">
        
        <!-- 
            Visual Depth Overlay:
            A non-interactive gradient mask that makes the top and bottom 
            log entries appear to fade into the background.
        -->
        <div
            class="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-b from-slate-950 via-transparent to-slate-950 opacity-50 z-10">
        </div>

        <!-- Log Entry List -->
        <div class="space-y-1">
            <div v-for="(log, i) in entries" :key="i" class="flex gap-2">
                <!-- Timestamp: Rendered in a darker tone to prioritize the message -->
                <span class="text-emerald-800 font-bold">[{{ log.time }}]</span>
                
                <!-- 
                    Dynamic Messaging:
                    Applies specific colors based on the entry type.
                    Note: Adjust the condition if using different status types (e.g., WARN, ERR).
                -->
                <span :class="log.type === 'success' ? 'text-emerald-400' : 'text-emerald-500'">
                    {{ log.msg }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

/**
 * Component Props
 * @property {Array} entries - An array of log objects: { time: String, msg: String, type: String }
 */
defineProps(['entries'])
</script>