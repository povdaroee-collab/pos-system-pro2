<template>
  <div class="flex h-screen bg-neutral-950 font-sans text-white overflow-hidden">
    
    <aside class="w-64 bg-black border-r border-white/10 flex flex-col hidden md:flex">
      <div class="p-6 flex items-center gap-3 border-b border-white/10">
        <div class="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#F3E5AB] rounded-full flex items-center justify-center text-black font-bold font-moul">P</div>
        <span class="font-moul text-[#D4AF37] text-lg">POS GOLD</span>
      </div>

      <nav class="flex-1 p-4 space-y-2">
        <a href="#" class="flex items-center px-4 py-3 bg-[#D4AF37]/10 text-[#D4AF37] rounded-xl border border-[#D4AF37]/20">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span class="font-bold">ផ្ទាំងគ្រប់គ្រង</span>
        </a>
        <a href="#" class="flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>បុគ្គលិក (Staff)</span>
        </a>
        <a href="#" class="flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            <span>របាយការណ៍ (Report)</span>
        </a>
      </nav>

      <div class="p-4 border-t border-white/10">
        <button @click="handleLogout" class="w-full flex items-center justify-center px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            ចាកចេញ
        </button>
      </div>
    </aside>

    <main class="flex-1 flex flex-col h-screen overflow-hidden">
      <header class="h-16 bg-black/50 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6">
        <h2 class="font-moul text-xl text-white">ទិដ្ឋភាពទូទៅ</h2>
        <div class="flex items-center gap-4">
            <div class="text-right hidden sm:block">
                <p class="text-sm font-bold text-[#D4AF37]">Owner Account</p>
                <p class="text-xs text-gray-500">Online</p>
            </div>
            <div class="w-10 h-10 rounded-full bg-gray-800 border border-[#D4AF37] overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Owner&background=D4AF37&color=000" alt="Profile">
            </div>
        </div>
      </header>

      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div v-for="(stat, index) in stats" :key="index" class="bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-[#D4AF37]/50 transition-colors group">
                <div class="flex justify-between items-start mb-4">
                    <div class="p-3 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                        <component :is="stat.icon" class="h-6 w-6" />
                    </div>
                    <span class="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">+12%</span>
                </div>
                <h3 class="text-3xl font-bold text-white mb-1">{{ stat.value }}</h3>
                <p class="text-gray-400 text-sm">{{ stat.title }}</p>
            </div>
        </div>

        <div class="bg-[#111] rounded-2xl border border-white/5 p-6 h-96 flex flex-col items-center justify-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
            <p>មិនទាន់មានទិន្នន័យលក់នៅឡើយទេ</p>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

// Icon components (អាចដាក់ក្នុង separate file បាន)
// សម្រាប់ demo នេះ ខ្ញុំប្រើ variable ធម្មតា
const stats = ref([
    { title: 'ចំណូលសរុប (ថ្ងៃនេះ)', value: '$0.00', icon: 'svg' },
    { title: 'ចំនួនវិក្កយបត្រ', value: '0', icon: 'svg' },
    { title: 'អតិថិជនថ្មី', value: '0', icon: 'svg' },
    { title: 'ផលិតផលសល់តិច', value: '0', icon: 'svg' },
]);

const handleLogout = async () => {
    await authStore.logout();
    // Router will handle redirect in store
};
</script>