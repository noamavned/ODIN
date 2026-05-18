<template>
    <div class="relative w-full h-screen bg-[#020617] overflow-hidden text-emerald-400 font-mono">
        <!-- Primary Viewport -->
        <main class="w-full h-full p-6 overflow-y-auto select-none">
            <!-- Binding components directly to store context -->
            <StatusHeader v-model:FPGAactive="store.systemStatus" />

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
                <div class="lg:col-span-7">
                    <RadarDisplay :angle="store.bearing" :confidence="store.confidence" />
                </div>

                <div class="lg:col-span-5 space-y-6">
                    <SpectrumAnalyzer :bars="store.spectrumBars" />
                    <ControlPanel :gain="store.gainLevel" />
                </div>
            </div>
        </main>

        <!-- Sidebar Components linked directly to global status states -->
        <Transition name="fade">
            <div v-if="store.isSidebarOpen" @click="store.isSidebarOpen = false"
                class="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-30"></div>
        </Transition>

        <Transition name="slide">
            <LogsSidebar v-if="store.isSidebarOpen" :entries="store.logs" class="z-40" />
        </Transition>

        <!-- Sidebar Toggle Tab -->
        <button @click="store.isSidebarOpen = !store.isSidebarOpen"
            class="fixed right-0 top-1/2 -translate-y-1/2 z-50 transition-transform duration-300 select-none"
            :class="{ '-translate-x-80': store.isSidebarOpen }">
            <div class="bg-slate-900 border-y border-l border-emerald-500/30 p-2 py-8 flex flex-col items-center gap-4 shadow-[-5px_0_15px_rgba(0,0,0,0.5)]">
                <span class="vertical-text text-[9px] font-black uppercase tracking-[0.3em]">
                    {{ store.isSidebarOpen ? "CLOSE" : "LOGS" }}
                </span>
                <div class="w-1 h-1 bg-emerald-500" :class="{ 'animate-ping': !store.isSidebarOpen }"></div>
            </div>
        </button>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useOdinStore } from "./stores/odinStore";
import StatusHeader from "./components/StatusHeader.vue";
import RadarDisplay from "./components/RadarDisplay.vue";
import SpectrumAnalyzer from "./components/SpectrumAnalyzer.vue";
import ControlPanel from "./components/ControlPanel.vue";
import LogsSidebar from "./components/LogsSidebar.vue";

const store = useOdinStore();

onMounted(() => {
    // Simply activate the data links when interface loads
    store.connectTelemetry();
    window.odinStore = store;
});

onUnmounted(() => {
    // Drop execution cycles cleanly on teardown
    store.disconnectTelemetry();
    delete window.odinStore;
});
</script>

<style>
.vertical-text { writing-mode: vertical-rl; text-orientation: mixed; transform: rotate(180deg); }
.slide-enter-active, .slide-leave-active { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>