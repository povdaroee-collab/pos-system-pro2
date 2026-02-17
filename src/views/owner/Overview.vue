<template>
    <div class="p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto">
        
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#D4AF37]/20 via-black to-black border border-[#D4AF37]/20 p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_10px_40px_-15px_rgba(212,175,55,0.3)]">
            <div class="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
            
            <div class="z-10 text-center md:text-left">
                <h2 class="font-moul text-3xl lg:text-4xl text-white mb-4 leading-tight">
                    សួស្ដី, <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">ម្ចាស់ហាង</span>
                </h2>
                <p class="text-gray-400 text-lg max-w-xl font-light">
                    សូមស្វាគមន៍មកកាន់ប្រព័ន្ធគ្រប់គ្រង។
                    <span class="text-[#D4AF37]">ទិន្នន័យជាក់ស្តែងនឹងបង្ហាញនៅទីនេះ។</span>
                </p>
            </div>
            <div class="hidden md:block z-10">
                 <button class="px-8 py-4 bg-[#D4AF37] hover:bg-[#c5a028] text-black font-bold rounded-xl shadow-lg shadow-[#D4AF37]/20 transition-all hover:-translate-y-1 active:translate-y-0 flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    បង្កើតការលក់ថ្មី
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="(stat, index) in stats" :key="index" class="relative group bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.2)] hover:-translate-y-2 overflow-hidden">
                <div class="absolute -bottom-4 -right-4 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-2xl group-hover:bg-[#D4AF37]/20 transition-all duration-500"></div>

                <div class="flex justify-between items-start mb-6 relative z-10">
                    <div class="p-4 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-transparent text-[#D4AF37] group-hover:from-[#D4AF37] group-hover:to-[#F3E5AB] group-hover:text-black transition-all duration-300 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <path v-if="index === 0" d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                            <path v-if="index === 1" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>
                            <path v-if="index === 2" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            <path v-if="index === 3" d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/>
                        </svg>
                    </div>
                </div>
                <h3 class="font-moul text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight z-10 relative">
                    {{ stat.value }}
                </h3>
                <p class="text-gray-400 text-base font-medium z-10 relative tracking-wide">
                    {{ stat.title }}
                </p>
            </div>
        </div>

        <div class="bg-[#0a0a0a] rounded-[2rem] border border-white/5 p-8 h-[500px] flex flex-col shadow-2xl relative overflow-hidden">
             <div class="flex justify-between items-center mb-8 z-10">
                 <h3 class="font-moul text-xl text-white">វិភាគការលក់ប្រចាំខែ</h3>
                 <select class="bg-black border border-white/20 rounded-xl px-4 py-2 text-gray-300 focus:border-[#D4AF37] outline-none">
                    <option>ខែនេះ</option>
                    <option>ខែមុន</option>
                 </select>
            </div>
            
            <div class="flex-1 flex items-center justify-center text-gray-600 z-10 border-2 border-dashed border-white/10 rounded-2xl bg-black/20">
                <div class="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mx-auto mb-4 opacity-30 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                    <p class="text-lg font-moul text-gray-500">មិនទាន់មានទិន្នន័យ</p>
                    <p class="text-sm">ទិន្នន័យនឹងបង្ហាញនៅពេលមានការលក់</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';

// ទិន្នន័យត្រូវបានកំណត់ជា 0 ទាំងអស់
const stats = ref([
    { title: 'ចំណូលសរុប (ថ្ងៃនេះ)', value: '$0.00' },
    { title: 'ចំនួនវិក្កយបត្រ', value: '0' },
    { title: 'អតិថិជនថ្មី', value: '0' },
    { title: 'ផលិតផលជិតអស់', value: '0' },
]);
</script>