<template>
    <!-- 
        Metadata Container: 
        Uses backdrop-blur and a low-opacity border to create a "glass-morphism" 
        effect that fits the tactical dashboard aesthetic.
    -->
    <div class="bg-slate-900/40 backdrop-blur-md border border-emerald-500/20 rounded-xl p-6 border-glow h-full">
        
        <!-- Section Header: Uses high letter-spacing and italic weight for a technical feel -->
        <h2 class="text-[10px] font-black text-emerald-500/50 tracking-[0.2em] uppercase mb-4 italic">
            Signal Intelligence / Metadata
        </h2>

        <div class="space-y-4">
            <!-- 
                Waveform Preview Window:
                Provides a visual representation of the incoming signal after 
                it has been cleaned/filtered by the hardware.
            -->
            <div class="h-20 bg-slate-950/50 border border-emerald-900/30 rounded relative overflow-hidden">
                <div class="absolute inset-0 flex items-center">
                    <!-- 
                        SVG-based Waveform:
                        Uses a Quadratic Bézier curve (Q) to simulate a sine-like wave.
                        The 'preserveAspectRatio="none"' allows the wave to stretch to the container width.
                    -->
                    <svg class="w-full h-12 text-emerald-500/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                        <path d="M0 10 Q 10 0, 20 10 T 40 10 T 60 10 T 80 10 T 100 10" fill="none" stroke="currentColor"
                            stroke-width="0.5" class="animate-wave"></path>
                    </svg>
                </div>
                <!-- Technical label for the waveform -->
                <span class="absolute top-1 left-1 text-[8px] text-emerald-800 uppercase">Live Waveform (Cleaned)</span>
            </div>

            <!-- 
                Telemetry Grid: 
                Displays critical performance metrics from the embedded system.
            -->
            <div class="grid grid-cols-2 gap-2 text-[9px] uppercase font-bold">
                <!-- Sampling Rate: The frequency at which the ADC digitizes the analog signal -->
                <div class="bg-slate-950 p-2 border border-emerald-900/10">
                    <span class="text-slate-600 block">Sampling Rate</span>
                    <span class="text-emerald-400">48.0 kHz</span>
                </div>

                <!-- Latency: Total round-trip time for processing within the FPGA fabric -->
                <div class="bg-slate-950 p-2 border border-emerald-900/10">
                    <span class="text-slate-600 block">Latency (FPGA)</span>
                    <span class="text-emerald-400">&lt; 1.2ms</span>
                </div>

                <!-- Thermal Monitoring: Real-time temperature of the ESP32 MCU -->
                <div class="bg-slate-950 p-2 border border-emerald-900/10">
                    <span class="text-slate-600 block">ESP32 Temp</span>
                    <span class="text-emerald-400">42°C</span>
                </div>

                <!-- Security Protocol: Status of the data link encryption -->
                <div class="bg-slate-950 p-2 border border-emerald-900/10">
                    <span class="text-slate-600 block">Encrypted Link</span>
                    <span class="text-emerald-400 text-[8px]">AES-256</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
/**
 * Note: This is a static metadata component. 
 * In a production environment, these values (Sampling Rate, Latency, Temp) 
 * would be passed as props from a parent component connected to a WebSocket or API.
 */
</script>


<style scoped>
/**
 * Waveform Animation:
 * Uses stroke-dashoffset to create a "scrolling" effect, 
 * simulating a continuous real-time data feed.
 */
.animate-wave {
    stroke-dasharray: 100;
    animation: waveMove 2s linear infinite;
}

@keyframes waveMove {
    from {
        stroke-dashoffset: 200;
    }
    to {
        stroke-dashoffset: 0;
    }
}
</style>
