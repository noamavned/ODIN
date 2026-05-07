<template>
    <!-- 
        Main Sidebar Container: 
        Uses 'fixed' positioning to overlay the main dashboard content.
        The 'backdrop-blur-xl' adds a high-end frosted glass effect, 
        maintaining visual context of the radar behind the logs.
    -->
    <div
        class="fixed top-0 right-0 h-full w-80 bg-slate-950/95 border-l border-emerald-500/20 z-40 flex flex-col shadow-[-10px_0_40px_rgba(0,0,0,0.8)] backdrop-blur-xl select-none">

        <!-- Sidebar Header: Branding for the communication channel -->
        <div class="p-6 border-b border-emerald-900/30 bg-emerald-500/5 mt-4">
            <h2 class="text-xs font-black text-emerald-400 uppercase tracking-widest italic flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-emerald-500 animate-pulse rounded-full"></span>
                Data Link Alpha
            </h2>
        </div>

        <!-- 
            Scrollable Content Area: 
            'flex-1' allows this section to grow to fill the available height.
            'scrollbar-hide' keeps the interface looking like a specialized hardware display.
        -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4 font-mono scrollbar-hide">
            <!-- Individual Log Entry Template -->
            <div v-for="(log, i) in entries" :key="i" class="border-l border-emerald-900/50 pl-3 py-1">
                <div class="flex flex-col gap-1 text-[10px]">
                    <!-- Metadata Header (Log Type and Timestamp) -->
                    <div class="flex justify-between text-[8px] opacity-50 italic">
                        <span>{{ log.type }}</span>
                        <span class="text-gray-400 bold">{{ log.time }}</span>
                    </div>
                    <!-- 
                        Message Content: 
                        Color-coded based on the subsystem (System vs UI).
                        Uses 'select-text' so specific error logs can be copied if needed.
                    -->
                    <span class="leading-tight tracking-tighter select-text" :class="{
                        'text-red-400': log.type === 'SYS',
                        'text-emerald-400': log.type === 'UI'
                    }">
                        {{ log.msg }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Persistent Footer: Reassures the user of the link's security status -->
        <div class="p-4 bg-slate-900/80 border-t border-emerald-900/20 text-[8px] text-emerald-900 font-bold uppercase">
            Connection: AES-256 Verified
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

/**
 * Component Props
 * @property {Array} entries - Full history of system events passed from the root app state.
 */
defineProps(['entries'])
</script>

<style scoped>
/* 
   Webkit-specific CSS to remove scrollbars for a cleaner, 
   integrated hardware feel while maintaining scroll functionality. 
*/
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>