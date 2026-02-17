<template>
    <div class="min-h-screen bg-[#050505] flex flex-col text-gray-200 font-battambang relative overflow-hidden">
        
        <header class="h-20 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md fixed top-0 w-full z-50 px-4 lg:px-8 flex items-center justify-between shadow-lg">
            
            <div class="flex items-center gap-4 cursor-pointer group select-none" @click.stop="toggleMenu">
                <button class="p-2.5 rounded-xl bg-white/5 hover:bg-[#D4AF37]/20 transition-all duration-300 group-hover:text-[#D4AF37] border border-white/10 group-hover:border-[#D4AF37]/30">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform duration-300" :class="{'rotate-90': isMenuOpen}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div class="flex flex-col">
                    <h1 class="font-moul text-xl md:text-2xl text-[#D4AF37] leading-none tracking-wide group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.6)] transition-all">POS GOLD</h1>
                    <span class="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold group-hover:text-gray-300 transition-colors">Owner Panel</span>
                </div>
            </div>

            <div class="flex items-center gap-6">
                <h2 class="hidden md:block font-moul text-lg text-white/80 border-r border-white/10 pr-6 mr-2">{{ currentTitle }}</h2>
                <div class="flex items-center gap-3 pl-2">
                    <div class="hidden sm:block text-right leading-tight">
                        <p class="text-sm font-bold text-white">Owner Admin</p>
                        <div class="flex items-center justify-end gap-1.5">
                            <span class="relative flex h-2 w-2">
                              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <p class="text-[10px] text-gray-400 font-mono">ONLINE</p>
                        </div>
                    </div>
                    <div class="w-11 h-11 rounded-full bg-gradient-to-br from-[#D4AF37] to-black p-0.5 shadow-[0_0_15px_rgba(212,175,55,0.2)] cursor-pointer hover:scale-105 transition-transform">
                        <div class="w-full h-full rounded-full bg-[#1a1a1a] overflow-hidden flex items-center justify-center">
                            <span class="font-moul text-[#D4AF37] text-sm">ម</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <transition name="slide-down">
            <aside 
                v-if="isMenuOpen" 
                class="fixed top-20 left-0 w-72 h-[calc(100vh-5rem)] bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-white/10 z-40 flex flex-col shadow-[10px_0_40px_rgba(0,0,0,0.5)]"
                @click.stop
            >
                <nav class="flex-1 p-4 space-y-2 overflow-y-auto py-6">
                    <router-link 
                        to="/owner/overview" 
                        class="flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 group border border-transparent"
                        active-class="bg-gradient-to-r from-[#D4AF37]/10 to-transparent text-[#D4AF37] border-[#D4AF37]/30 shadow-[inset_0_0_10px_rgba(212,175,55,0.1)]"
                        :class="!$route.path.includes('overview') ? 'text-gray-400 hover:bg-white/5 hover:text-white' : ''"
                        @click="isMenuOpen = false"
                    >
                        <div class="p-2 rounded-lg bg-white/5 group-hover:bg-[#D4AF37]/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" /></svg>
                        </div>
                        <span class="font-bold text-base tracking-wide">ទិដ្ឋភាពទូទៅ</span>
                    </router-link>

                    <router-link 
                        to="/owner/admin-management" 
                        class="flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 group border border-transparent"
                        active-class="bg-gradient-to-r from-[#D4AF37]/10 to-transparent text-[#D4AF37] border-[#D4AF37]/30 shadow-[inset_0_0_10px_rgba(212,175,55,0.1)]"
                        :class="!$route.path.includes('admin-management') ? 'text-gray-400 hover:bg-white/5 hover:text-white' : ''"
                        @click="isMenuOpen = false"
                    >
                        <div class="p-2 rounded-lg bg-white/5 group-hover:bg-[#D4AF37]/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        <span class="font-bold text-base tracking-wide">គ្រប់គ្រង Admin</span>
                    </router-link>
                </nav>

                <div class="p-6 border-t border-white/10 bg-black/20">
                    <button 
                        @click="requestLogout" 
                        class="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl text-red-400 bg-red-500/5 hover:bg-red-500/10 hover:text-red-300 border border-red-500/10 hover:border-red-500/30 transition-all duration-300 group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        <span class="font-bold tracking-wide">ចាកចេញ</span>
                    </button>
                    <div class="text-center mt-4">
                        <p class="text-[10px] text-gray-600">POS GOLD v1.0.0</p>
                    </div>
                </div>
            </aside>
        </transition>

        <transition name="fade">
            <div 
                v-if="isMenuOpen" 
                class="fixed inset-0 top-20 bg-black/60 backdrop-blur-[3px] z-30"
                @click="isMenuOpen = false"
            ></div>
        </transition>

        <main class="flex-1 pt-20 relative z-0 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
            <router-view v-slot="{ Component }">
                <transition name="page-fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>

        <transition name="fade">
            <div v-if="showLogoutModal" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                <div class="bg-[#111] border border-[#D4AF37] w-full max-w-sm rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.2)] text-center p-8 transform transition-all scale-100 relative overflow-hidden">
                    <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-20 bg-gradient-to-b from-[#D4AF37]/10 to-transparent"></div>
                    <div class="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#D4AF37] relative z-10 border border-[#D4AF37]/20">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div>
                    <h3 class="font-moul text-xl text-white mb-2 relative z-10">ចាកចេញពីប្រព័ន្ធ</h3>
                    <p class="text-gray-400 text-sm mb-8 relative z-10">តើអ្នកពិតជាចង់ចាកចេញពីគណនីនេះមែនទេ?</p>
                    <div class="flex gap-3 justify-center relative z-10">
                        <button @click="showLogoutModal = false" class="px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all font-bold">បោះបង់</button>
                        <button @click="confirmLogout" class="px-8 py-3 rounded-xl bg-[#D4AF37] text-black font-bold hover:bg-[#b8952b] shadow-lg shadow-[#D4AF37]/20 transition-all">ចាកចេញ</button>
                    </div>
                </div>
            </div>
        </transition>

    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// FIXED PATH: Adjusted to point correctly to src/services/firebase.js
import { auth } from '../services/firebase'; 
import { signOut } from 'firebase/auth';

const router = useRouter();
const route = useRoute();
const isMenuOpen = ref(false);
const showLogoutModal = ref(false);

const currentTitle = computed(() => {
    return route.meta.title || 'ផ្ទាំងគ្រប់គ្រង';
});

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

// 1. Open Modal instead of confirm()
const requestLogout = () => {
    isMenuOpen.value = false; // Close menu first
    showLogoutModal.value = true;
};

// 2. Perform Logout
const confirmLogout = async () => {
    try {
        await signOut(auth);
        showLogoutModal.value = false;
        router.push('/');
    } catch (error) {
        console.error("Logout Error:", error);
        alert("មានបញ្ហាក្នុងការចាកចេញ!");
    }
};

const handleClickOutside = (e) => {
    if (isMenuOpen.value && !e.target.closest('aside') && !e.target.closest('header')) {
        isMenuOpen.value = false;
    }
};

onMounted(() => window.addEventListener('click', handleClickOutside));
onUnmounted(() => window.removeEventListener('click', handleClickOutside));
</script>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease; }
.slide-down-enter-from, .slide-down-leave-to { transform: translateX(-100%); opacity: 0; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.page-fade-enter-active, .page-fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.page-fade-enter-from, .page-fade-leave-to { opacity: 0; transform: translateY(5px); }
.font-moul { font-family: 'Moul', serif; }
.font-battambang { font-family: 'Battambang', sans-serif; }
</style>