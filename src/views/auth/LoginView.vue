<template>
  <div class="flex min-h-screen w-full bg-neutral-950 font-sans selection:bg-[#D4AF37] selection:text-black">
    
    <div class="hidden lg:flex w-[55%] relative items-center justify-center overflow-hidden bg-black">
      <div class="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop" 
               alt="POS Background" 
               class="w-full h-full object-cover opacity-30 filter grayscale" />
          <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-[#D4AF37]/10 to-black/90"></div>
      </div>
      
      <div class="z-10 text-center p-12 relative">
        <div class="w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-[#F3E5AB] rounded-full mx-auto mb-8 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.4)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
        </div>
        <h1 class="font-moul text-5xl lg:text-6xl text-white mb-6 leading-relaxed drop-shadow-2xl">
          ប្រព័ន្ធគ្រប់គ្រង <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]">ហាងទំនើប</span>
        </h1>
        <p class="text-lg text-gray-300 max-w-lg mx-auto leading-loose font-light border-t border-white/10 pt-6">
          បង្កើនប្រសិទ្ធភាពអាជីវកម្មរបស់អ្នកជាមួយបច្ចេកវិទ្យាដែលគួរឱ្យទុកចិត្តបំផុត។
        </p>
      </div>
    </div>

    <div class="w-full lg:w-[45%] flex items-center justify-center p-8 lg:p-16 bg-[#050505] relative">
      <div class="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="w-full max-w-md space-y-8 z-10">
        
        <div class="text-center lg:text-left space-y-2">
          <h2 class="font-moul text-3xl text-white drop-shadow-md leading-relaxed">ស្វាគមន៍មកកាន់ប្រព័ន្ធ</h2>
          <p class="text-neutral-400 text-base">សូមបញ្ចូលព័ត៌មានគណនីរបស់អ្នកដើម្បីបន្ត</p>
        </div>

        <div v-if="authStore.errorMessage" class="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
          {{ authStore.errorMessage }}
        </div>

        <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
          
          <div class="group">
            <label class="block text-xs font-bold text-[#D4AF37] mb-2 ml-1">ឈ្មោះគណនី (Username)</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-500 group-focus-within:text-[#D4AF37] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <input 
                  v-model="username" 
                  type="text" 
                  required 
                  class="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-300" 
                  placeholder="បញ្ចូលឈ្មោះគណនី (ឧ. owner)" 
                />
            </div>
          </div>

          <div class="group">
            <div class="flex justify-between mb-2 ml-1">
              <label class="block text-xs font-bold text-[#D4AF37]">ពាក្យសម្ងាត់</label>
              <a href="#" class="text-xs text-neutral-500 hover:text-[#D4AF37] transition-colors">ភ្លេចលេខសម្ងាត់?</a>
            </div>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-500 group-focus-within:text-[#D4AF37] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <input 
                  v-model="password" 
                  :type="showPassword ? 'text' : 'password'" 
                  required 
                  class="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 text-white placeholder-neutral-600 rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-300" 
                  placeholder="••••••••••••" 
                />
                <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-500 hover:text-[#D4AF37] cursor-pointer focus:outline-none">
                    <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                </button>
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="authStore.isLoading"
            class="w-full py-4 px-6 bg-gradient-to-r from-[#D4AF37] via-[#E2C258] to-[#D4AF37] text-black text-lg rounded-xl shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_30px_rgba(212,175,55,0.5)] hover:-translate-y-0.5 active:translate-y-0 transform transition-all duration-300 group font-bold disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3"
          >
            <svg v-if="authStore.isLoading" class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-if="!authStore.isLoading">ចូលប្រព័ន្ធ (Login)</span>
            <span v-else>កំពុងដំណើរការ...</span>
          </button>

        </form>

        <div class="mt-8 pt-8 border-t border-white/10 text-center">
          <p class="text-sm text-neutral-500">
            &copy; ២០២៦ រក្សាសិទ្ធិគ្រប់យ៉ាងដោយ <span class="text-[#D4AF37]">POS Gold</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';

// State
const username = ref('');
const password = ref('');
const showPassword = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  // 1. ហៅ Function Login ពី Store (ដែលនឹងបំប្លែង username -> email)
  const success = await authStore.login(username.value, password.value);
  if (success) {
    // ត្រូវប្រាកដថាដាក់ /owner/overview (ហាមដាក់ /dashboard)
    router.push('/owner/overview');
  }
};
</script>