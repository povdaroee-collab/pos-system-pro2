<template>
  <div class="fixed top-5 right-5 z-[100] flex flex-col gap-4 w-full max-w-sm pointer-events-none pr-4 sm:pr-0">
    <transition-group 
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-x-full opacity-0 blur-sm"
      enter-to-class="translate-x-0 opacity-100 blur-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div 
        v-for="notification in notificationStore.notifications" 
        :key="notification.id"
        class="pointer-events-auto flex items-center p-4 rounded-xl border shadow-2xl backdrop-blur-xl relative overflow-hidden group"
        :class="{
          'bg-black/90 border-[#D4AF37] text-white shadow-[#D4AF37]/20': notification.type === 'success',
          'bg-black/90 border-red-500 text-white shadow-red-500/20': notification.type === 'error',
          'bg-black/90 border-blue-500 text-white shadow-blue-500/20': notification.type === 'info'
        }"
      >
        <div class="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:animate-shimmer"></div>

        <div class="mr-4 flex-shrink-0">
            <div v-if="notification.type === 'success'" class="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            </div>
            <div v-else-if="notification.type === 'error'" class="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </div>
            <div v-else class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
        </div>

        <div class="flex-1">
            <h4 class="font-moul text-sm font-bold mb-0.5" 
                :class="{
                    'text-[#D4AF37]': notification.type === 'success',
                    'text-red-400': notification.type === 'error',
                    'text-blue-400': notification.type === 'info'
                }">
                {{ notification.type === 'success' ? 'ជោគជ័យ' : (notification.type === 'error' ? 'បរាជ័យ' : 'ព័ត៌មាន') }}
            </h4>
            <p class="text-sm text-gray-300 font-sans">{{ notification.message }}</p>
        </div>

        <button @click="notificationStore.remove(notification.id)" class="ml-4 text-gray-500 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useNotificationStore } from '../stores/notification';
const notificationStore = useNotificationStore();
</script>

<style scoped>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
.animate-shimmer {
  animation: shimmer 1.5s infinite;
}
</style>