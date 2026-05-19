<template>
    <div class="fixed top-0 right-0 h-full w-80 bg-slate-950/95 border-l border-emerald-500/20 z-40 flex flex-col shadow-[-10px_0_40px_rgba(0,0,0,0.8)] backdrop-blur-xl select-none">
        <!-- Sidebar Header -->
        <div class="p-6 border-b border-emerald-900/30 bg-emerald-500/5 mt-4">
            <h2 class="text-xs font-black text-emerald-400 uppercase tracking-widest italic flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-emerald-500 animate-pulse rounded-full"></span>
                Data Link Alpha
            </h2>
        </div>

        <!-- Scrollable Content Area -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4 font-mono scrollbar-hide">
            <!-- 
                FIXED: Changed :key="i" to :key="log.id"
                Vue's diffing engine now tracks the physical object perfectly.
            -->
            <div v-for="log in entries" :key="log.id" class="border-l border-emerald-900/50 pl-3 py-1">
                <div class="flex flex-col gap-1 text-[10px]">
                    <!-- Metadata Header -->
                    <div class="flex justify-between text-[8px] opacity-50 italic">
                        <span>{{ log.type }}</span>
                        <span class="text-gray-400 font-bold">{{ log.time }}</span>
                    </div>
                    <!-- Message Content -->
                    <span class="leading-tight tracking-tighter select-text" :class="{
                        'text-cyan-400': log.type === 'SYS',
                        'text-red-400': log.type === 'ERROR',
                        'text-amber-500': log.type === 'WARN',
                        'text-teal-400': log.type === 'SIGNAL',
                        'text-emerald-300': log.type === 'SUCCESS'
                    }">
                        {{ log.msg }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Persistent Footer -->
        <div class="p-4 bg-slate-900/80 border-t border-emerald-900/20 text-[8px] text-emerald-900 font-bold uppercase">
            Connection: AES-256 Verified
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

/**
 * Component Props
 * @property {Array} entries - Full history of system events passed from root app state.
 */
defineProps({
    entries: {
        type: Array,
        required: true,
        default: () => []
    }
})
</script>

<style scoped>
/* 
    Cross-Browser Scrollbar Hiding:
    Completely masks scroll elements across Webkit, Firefox, and IE engines
    without interrupting native track scrolling mechanics.
*/
.scrollbar-hide {
    -ms-overflow-style: none;  /* IE/Edge Legacy */
    scrollbar-width: none;     /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
    display: none;             /* Chrome, Safari, and Opera */
}
</style>