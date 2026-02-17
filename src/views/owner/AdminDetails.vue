<template>
    <div class="min-h-screen bg-[#050505] text-gray-200 font-battambang relative">
        
        <div 
            class="sticky top-0 z-50 transition-all duration-300 border-b border-white/5 backdrop-blur-md"
            :class="isScrolled ? 'bg-black/80 py-3 shadow-lg' : 'bg-transparent py-6 border-transparent'"
        >
            <div class="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between">
                
                <div class="flex items-center gap-4">
                    <button 
                        @click="$router.go(-1)" 
                        class="group flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-300"
                        title="ត្រឡប់ក្រោយ"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <transition name="fade">
                        <div v-if="isScrolled && adminData" class="flex items-center gap-3">
                            <img :src="adminData.photoUrl || `https://ui-avatars.com/api/?name=${adminData.fullName}&background=000&color=fff`" class="w-8 h-8 rounded-full object-cover border border-white/20">
                            <div>
                                <h3 class="text-sm font-bold text-white leading-tight">{{ adminData.fullName }}</h3>
                                <p class="text-[10px] text-[#D4AF37]">@{{ adminData.username }}</p>
                            </div>
                        </div>
                    </transition>
                </div>

                <div v-if="isScrolled" class="flex gap-1 bg-white/5 p-1 rounded-lg">
                    <button @click="activeTab = 'sellers'" :class="activeTab === 'sellers' ? 'bg-[#D4AF37] text-black shadow' : 'text-gray-400 hover:text-white'" class="px-4 py-1.5 rounded-md text-xs font-bold transition-all">Sellers</button>
                    <button @click="activeTab = 'sales'" :class="activeTab === 'sales' ? 'bg-[#D4AF37] text-black shadow' : 'text-gray-400 hover:text-white'" class="px-4 py-1.5 rounded-md text-xs font-bold transition-all">Sales</button>
                </div>

            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 lg:px-8 pb-10">
            
            <div v-if="isLoading" class="flex justify-center items-center py-20">
                 <svg class="animate-spin h-12 w-12 text-[#D4AF37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            </div>

            <div v-else-if="adminData" class="space-y-6">
                
                <transition name="slide-fade">
                    <div v-if="!isScrolled" class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#111] to-black border border-white/10 p-6 shadow-2xl">
                        <div class="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[80px] pointer-events-none"></div>
                        <div class="flex flex-col md:flex-row items-center gap-6 relative z-10">
                            <div class="relative group">
                                <div class="w-24 h-24 md:w-28 md:h-28 rounded-full p-1 bg-gradient-to-br from-[#D4AF37] to-transparent shadow-xl">
                                    <img :src="adminData.photoUrl || `https://ui-avatars.com/api/?name=${adminData.fullName}&background=000&color=fff`" class="w-full h-full rounded-full object-cover border-4 border-[#111] transition-transform duration-500 group-hover:scale-105">
                                </div>
                                <div class="absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-[#111]" :class="!adminData.isBlocked ? 'bg-green-500' : 'bg-red-500'"></div>
                            </div>
                            
                            <div class="text-center md:text-left flex-1 space-y-2">
                                <div>
                                    <h1 class="font-moul text-2xl md:text-3xl text-white tracking-wide">{{ adminData.fullName }}</h1>
                                    <div class="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-sm text-gray-400 mt-1">
                                        <span class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#D4AF37]" viewBox="0 0 20 20" fill="currentColor"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg> @{{ adminData.username }}</span>
                                        <span class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg> {{ adminData.telegram || 'No Telegram' }}</span>
                                    </div>
                                </div>
                                
                                <div class="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                                    <div class="inline-flex items-center bg-white/5 border border-white/10 rounded-lg px-4 py-2 hover:bg-white/10 transition-colors">
                                        <span class="text-xl font-bold text-white mr-2">{{ sellers.length }}</span>
                                        <span class="text-[10px] text-gray-400 uppercase tracking-wider">Sellers</span>
                                    </div>
                                    <div class="inline-flex items-center bg-white/5 border border-white/10 rounded-lg px-4 py-2 hover:bg-white/10 transition-colors">
                                        <span class="text-sm font-bold text-gray-300 mr-2">{{ formatDate(adminData.createdAt) }}</span>
                                        <span class="text-[10px] text-gray-500 uppercase">Joined</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>

                <div v-if="!isScrolled" class="flex gap-6 border-b border-white/10 pb-1 overflow-x-auto scrollbar-hide">
                    <button @click="activeTab = 'sellers'" :class="activeTab === 'sellers' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-gray-400 hover:text-white'" class="pb-3 px-2 font-bold transition-all whitespace-nowrap font-moul text-sm md:text-base">
                        បញ្ជី Seller
                    </button>
                    <button @click="activeTab = 'sales'" :class="activeTab === 'sales' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-gray-400 hover:text-white'" class="pb-3 px-2 font-bold transition-all whitespace-nowrap font-moul text-sm md:text-base">
                        ព័ត៌មានលក់
                    </button>
                </div>

                <div class="min-h-[500px]">
                    <transition name="fade" mode="out-in">
                        <div v-if="activeTab === 'sellers'" key="sellers">
                            <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 sticky top-20 z-30 bg-[#050505]/95 backdrop-blur py-2">
                                <div class="relative w-full md:max-w-md">
                                    <input v-model="searchQuery" type="text" placeholder="ស្វែងរកឈ្មោះ ឬ Username..." class="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:border-[#D4AF37] outline-none transition-colors shadow-inner">
                                    <svg class="h-4 w-4 text-gray-500 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>

                                <div class="flex gap-2 w-full md:w-auto">
                                    <button @click="downloadPDF" :disabled="isGeneratingPDF" class="flex-1 md:flex-none flex justify-center items-center px-4 py-2.5 bg-[#D4AF37] text-black text-sm font-bold rounded-xl hover:bg-[#b5952f] transition-all shadow-lg shadow-[#D4AF37]/10 disabled:opacity-50 active:scale-95">
                                        <svg v-if="!isGeneratingPDF" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                        {{ isGeneratingPDF ? 'Generating...' : 'PDF' }}
                                    </button>
                                    <div class="bg-[#1a1a1a] border border-white/10 rounded-xl p-1 flex">
                                        <button @click="viewMode = 'grid'" :class="viewMode === 'grid' ? 'bg-white/10 text-[#D4AF37]' : 'text-gray-500 hover:text-white'" class="p-1.5 rounded-lg transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" /></svg></button>
                                        <button @click="viewMode = 'list'" :class="viewMode === 'list' ? 'bg-white/10 text-[#D4AF37]' : 'text-gray-500 hover:text-white'" class="p-1.5 rounded-lg transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg></button>
                                    </div>
                                </div>
                            </div>

                            <div v-if="filteredSellers.length === 0" class="text-center py-20 bg-[#1a1a1a] rounded-3xl border border-white/5 border-dashed">
                                <p class="text-gray-500">រកមិនឃើញទិន្នន័យ Seller ទេ។</p>
                            </div>

                            <div v-else>
                                <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div v-for="seller in paginatedSellers" :key="seller.id" class="bg-[#1a1a1a] rounded-2xl p-6 border border-white/10 hover:border-[#D4AF37]/50 transition-all group relative shadow-lg hover:-translate-y-1 duration-300">
                                        <div class="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button @click="openEditModal(seller)" class="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 00 2 2h11a2 2 0 00 2-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                                            <button @click="handleDelete(seller)" class="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                        </div>
                                        <div class="flex flex-col items-center text-center">
                                            <img :src="seller.photoUrl || `https://ui-avatars.com/api/?name=${seller.fullName}&background=000&color=fff`" class="w-20 h-20 rounded-full object-cover mb-4 border-2 border-white/10 shadow-md group-hover:border-[#D4AF37] transition-colors">
                                            <h4 class="text-white font-bold text-lg mb-1 truncate w-full">{{ seller.fullName }}</h4>
                                            <p class="text-xs text-[#D4AF37] mb-4 truncate w-full">@{{ seller.username }}</p>
                                            <div class="w-full space-y-2 text-xs border-t border-white/10 pt-4 text-gray-400">
                                                <div class="flex justify-between"><span>ទូរស័ព្ទ:</span><span class="text-white font-mono">{{ seller.phoneNumber || '-' }}</span></div>
                                                <div class="flex justify-between"><span>ស្ថានភាព:</span><span :class="!seller.isBlocked ? 'text-green-500' : 'text-red-500'" class="font-bold">{{ !seller.isBlocked ? 'Active' : 'Blocked' }}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div v-else class="overflow-x-auto rounded-2xl border border-white/10 bg-[#1a1a1a] shadow-xl">
                                    <table class="w-full text-left text-sm text-gray-300">
                                        <thead class="bg-black/40 uppercase font-bold text-gray-200 border-b border-white/5 text-xs">
                                            <tr>
                                                <th class="px-6 py-4 text-center w-16">ល.រ</th>
                                                <th class="px-6 py-4">ឈ្មោះ / គណនី</th>
                                                <th class="px-6 py-4">លេខទូរស័ព្ទ</th>
                                                <th class="px-6 py-4 text-center">ស្ថានភាព</th>
                                                <th class="px-6 py-4 text-center w-24">សកម្មភាព</th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y divide-white/5">
                                            <tr v-for="(seller, index) in paginatedSellers" :key="seller.id" class="hover:bg-white/5 transition-colors group">
                                                <td class="px-6 py-4 text-center text-gray-500">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                                                <td class="px-6 py-4">
                                                    <div class="flex items-center gap-4">
                                                        <img :src="seller.photoUrl || `https://ui-avatars.com/api/?name=${seller.fullName}&background=000&color=fff`" class="h-9 w-9 rounded-full border border-white/10 object-cover">
                                                        <div>
                                                            <div class="text-white font-bold text-sm">{{ seller.fullName }}</div>
                                                            <div class="text-xs text-[#D4AF37]">@{{ seller.username }}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 font-mono text-xs">{{ seller.phoneNumber || '-' }}</td>
                                                <td class="px-6 py-4 text-center">
                                                    <span class="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border border-white/5" :class="!seller.isBlocked ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'">{{ !seller.isBlocked ? 'Active' : 'Blocked' }}</span>
                                                </td>
                                                <td class="px-6 py-4 text-center">
                                                    <div class="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button @click="openEditModal(seller)" class="p-1.5 text-blue-400 bg-blue-500/10 rounded hover:bg-blue-500 hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 00 2 2h11a2 2 0 00 2-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                                                        <button @click="handleDelete(seller)" class="p-1.5 text-red-400 bg-red-500/10 rounded hover:bg-red-500 hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div v-if="filteredSellers.length > itemsPerPage" class="flex justify-between items-center mt-6 bg-[#1a1a1a] p-4 rounded-xl border border-white/10">
                                    <div class="text-xs text-gray-500">ទំព័រ <span class="text-white font-bold">{{ currentPage }}</span> នៃ {{ totalPages }}</div>
                                    <div class="flex gap-2">
                                        <button @click="currentPage--" :disabled="currentPage === 1" class="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white text-xs disabled:opacity-50 transition-colors">ថយក្រោយ</button>
                                        <button @click="currentPage++" :disabled="currentPage === totalPages" class="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white text-xs disabled:opacity-50 transition-colors">ទៅមុខ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>

                    <transition name="fade" mode="out-in">
                        <div v-if="activeTab === 'sales'" key="sales">
                            <SellerSalesReports :sellers="sellers" />
                        </div>
                    </transition>
                </div>

            </div>
            
            <div v-else class="text-center text-red-500 py-20 font-moul">រកមិនឃើញទិន្នន័យ Admin នេះទេ!</div>

            <div id="pdf-container" style="position: fixed; left: -9999px; top: 0;">
                <div id="pdf-report" style="width: 210mm; min-height: 297mm; font-family: 'Battambang', sans-serif; background-color: #ffffff; color: #000000; padding: 25px; box-sizing: border-box;">
                    <div style="border-bottom: 2px solid #D4AF37; padding-bottom: 10px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end;">
                        <div><h1 style="color: #D4AF37; font-size: 24px; font-weight: bold; margin: 0; font-family: 'Moul', serif;">POS GOLD</h1><p style="font-size: 12px; margin: 5px 0 0 0; color: #333; font-weight: bold;">របាយការណ៍បញ្ជីអ្នកលក់ (SELLER REPORT)</p></div>
                        <div style="text-align: right; font-size: 10px; color: #444;"><p style="margin: 2px 0;">អ្នកគ្រប់គ្រង: <strong>{{ adminData?.fullName }}</strong></p><p style="margin: 2px 0;">កាលបរិច្ឆេទ: {{ new Date().toLocaleDateString('en-GB') }}</p></div>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px;">
                        <div style="background-color: #f3f4f6; padding: 10px; border-radius: 6px; border: 1px solid #e5e7eb; text-align: center;"><p style="font-size: 10px; color: #6b7280; text-transform: uppercase; margin: 0;">សរុប (Total)</p><p style="font-size: 18px; font-weight: bold; color: #000000; margin: 2px 0 0 0;">{{ sellers.length }}</p></div>
                        <div style="background-color: #f0fdf4; padding: 10px; border-radius: 6px; border: 1px solid #dcfce7; text-align: center;"><p style="font-size: 10px; color: #16a34a; text-transform: uppercase; margin: 0;">សកម្ម (Active)</p><p style="font-size: 18px; font-weight: bold; color: #15803d; margin: 2px 0 0 0;">{{ sellers.filter(s => !s.isBlocked).length }}</p></div>
                        <div style="background-color: #fef2f2; padding: 10px; border-radius: 6px; border: 1px solid #fee2e2; text-align: center;"><p style="font-size: 10px; color: #dc2626; text-transform: uppercase; margin: 0;">បានបិទ (Blocked)</p><p style="font-size: 18px; font-weight: bold; color: #b91c1c; margin: 2px 0 0 0;">{{ sellers.filter(s => s.isBlocked).length }}</p></div>
                    </div>
                    <table style="width: 100%; font-size: 11px; text-align: left; border-collapse: collapse; table-layout: fixed;">
                        <thead style="background-color: #D4AF37; color: #000000; display: table-header-group;">
                            <tr><th style="padding: 10px; border: 1px solid #d1d5db; width: 6%; text-align: center; font-weight: bold;">ល.រ</th><th style="padding: 10px; border: 1px solid #d1d5db; width: 28%; text-align: left; font-weight: bold;">ឈ្មោះពេញ</th><th style="padding: 10px; border: 1px solid #d1d5db; width: 20%; text-align: left; font-weight: bold;">គណនី</th><th style="padding: 10px; border: 1px solid #d1d5db; width: 26%; text-align: left; font-weight: bold;">លេខទូរស័ព្ទ</th><th style="padding: 10px; border: 1px solid #d1d5db; width: 20%; text-align: center; font-weight: bold;">កាលបរិច្ឆេទ</th></tr>
                        </thead>
                        <tbody>
                            <tr v-for="(seller, index) in sellers" :key="seller.id" style="page-break-inside: avoid;"><td style="padding: 6px 8px; border: 1px solid #d1d5db; text-align: center;">{{ index + 1 }}</td><td style="padding: 6px 8px; border: 1px solid #d1d5db; font-weight: bold; text-align: left;">{{ seller.fullName }}</td><td style="padding: 6px 8px; border: 1px solid #d1d5db; color: #333; text-align: left;">{{ seller.username }}</td><td style="padding: 6px 8px; border: 1px solid #d1d5db; text-align: left;">{{ seller.phoneNumber || '-' }}</td><td style="padding: 6px 8px; border: 1px solid #d1d5db; text-align: left;">{{ formatDateShort(seller.createdAt) }}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div v-if="isEditModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                <div class="bg-[#1a1a1a] border border-[#D4AF37] w-full max-w-lg rounded-2xl shadow-2xl p-6">
                    <h3 class="font-moul text-xl text-[#D4AF37] mb-6">កែប្រែព័ត៌មាន Seller</h3>
                    <div class="flex flex-col items-center mb-6">
                        <div class="relative group cursor-pointer" @click="$refs.fileInput.click()">
                            <div class="w-24 h-24 rounded-full overflow-hidden border-2 border-[#D4AF37]">
                                <img :src="editPreviewImage || editingSeller.photoUrl || `https://ui-avatars.com/api/?name=${editingSeller.fullName}&background=000&color=fff`" class="w-full h-full object-cover">
                            </div>
                            <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                                <span class="text-xs text-white font-bold">ប្តូររូប</span>
                            </div>
                        </div>
                        <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleImageChange">
                    </div>
                    <div class="space-y-4">
                        <div><label class="text-xs text-gray-400 mb-1 block">ឈ្មោះពេញ</label><input v-model="editingSeller.fullName" class="w-full bg-black border border-white/20 p-3 rounded-xl text-white focus:border-[#D4AF37] outline-none"></div>
                        <div><label class="text-xs text-gray-400 mb-1 block">លេខទូរស័ព្ទ</label><input v-model="editingSeller.phoneNumber" class="w-full bg-black border border-white/20 p-3 rounded-xl text-white focus:border-[#D4AF37] outline-none"></div>
                        <div><label class="text-xs text-gray-400 mb-1 block">Telegram Username</label><input v-model="editingSeller.telegram" class="w-full bg-black border border-white/20 p-3 rounded-xl text-white focus:border-[#D4AF37] outline-none" placeholder="@username"></div>
                    </div>
                    <div class="flex justify-end gap-3 mt-8">
                        <button @click="isEditModalOpen = false" class="px-6 py-2 text-gray-400 hover:text-white font-bold">បោះបង់</button>
                        <button @click="confirmUpdateSeller" class="px-6 py-2 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#b5952f]">រក្សាទុក</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'; // Added onUnmounted
import { useRoute } from 'vue-router';
import { db } from '../../services/firebase';
import { doc, getDoc, collection, query, where, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { uploadImageToCloudinary } from '../../services/upload';
import html2pdf from 'html2pdf.js';
import SellerSalesReports from '../../components/owner/SellerSalesReports.vue';

const route = useRoute();
const isLoading = ref(true);
const adminData = ref(null);
const sellers = ref([]);
const viewMode = ref('list');
const activeTab = ref('sellers');
const searchQuery = ref('');
const isGeneratingPDF = ref(false);
const isScrolled = ref(false); // State for scroll detection

// Pagination
const currentPage = ref(1);
const itemsPerPage = 40;

// Scroll Listener Logic
const handleScroll = () => {
    isScrolled.value = window.scrollY > 100; // Trigger after scrolling 100px
};

onMounted(async () => {
    const adminId = route.params.id;
    window.addEventListener('scroll', handleScroll); // Add listener
    await fetchData(adminId);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll); // Cleanup
});

const filteredSellers = computed(() => {
    if (!searchQuery.value) return sellers.value;
    const lower = searchQuery.value.toLowerCase();
    return sellers.value.filter(s => 
        s.fullName.toLowerCase().includes(lower) || 
        s.username.toLowerCase().includes(lower)
    );
});

const totalPages = computed(() => Math.ceil(filteredSellers.value.length / itemsPerPage));
const paginatedSellers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredSellers.value.slice(start, end);
});

// Edit Logic
const isEditModalOpen = ref(false);
const editingSeller = ref({});
const editPreviewImage = ref(null);
const newImageFile = ref(null);
const fileInput = ref(null);

const openEditModal = (seller) => {
    editingSeller.value = { ...seller };
    editPreviewImage.value = null;
    newImageFile.value = null;
    isEditModalOpen.value = true;
};

const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        newImageFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => editPreviewImage.value = e.target.result;
        reader.readAsDataURL(file);
    }
};

const confirmUpdateSeller = async () => {
    try {
        let photoUrl = editingSeller.value.photoUrl;
        if (newImageFile.value) {
            photoUrl = await uploadImageToCloudinary(newImageFile.value);
        }

        await updateDoc(doc(db, 'users', editingSeller.value.id), {
            fullName: editingSeller.value.fullName,
            phoneNumber: editingSeller.value.phoneNumber || '',
            telegram: editingSeller.value.telegram || '',
            photoUrl: photoUrl
        });

        const index = sellers.value.findIndex(s => s.id === editingSeller.value.id);
        if (index !== -1) {
            sellers.value[index] = { 
                ...editingSeller.value, 
                photoUrl: photoUrl 
            };
        }
        isEditModalOpen.value = false;
        alert("កែប្រែជោគជ័យ!");
    } catch (e) {
        console.error(e);
        alert("បរាជ័យក្នុងការកែប្រែ!");
    }
};

const handleDelete = async (seller) => {
    if (confirm(`តើអ្នកចង់លុប Seller "${seller.fullName}" មែនទេ?`)) {
        try {
            await deleteDoc(doc(db, 'users', seller.id));
            sellers.value = sellers.value.filter(s => s.id !== seller.id);
        } catch (e) {
            console.error(e);
            alert("មិនអាចលុបបានទេ!");
        }
    }
};

const fetchData = async (id) => {
    isLoading.value = true;
    try {
        const adminSnap = await getDoc(doc(db, 'users', id));
        if (adminSnap.exists()) {
            adminData.value = { id: adminSnap.id, ...adminSnap.data() };
            const q = query(collection(db, 'users'), where('role', '==', 'seller'), where('createdBy', '==', id));
            const sellersSnap = await getDocs(q);
            sellers.value = sellersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
    } finally {
        isLoading.value = false;
    }
};

const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
};

const formatDateShort = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
};

// PDF LOGIC (Optimized)
const downloadPDF = async () => {
    if (!adminData.value) return;
    isGeneratingPDF.value = true;
    const element = document.getElementById('pdf-report');
    
    const opt = {
        margin: [10, 10, 10, 10], 
        filename: `Sellers_${adminData.value.username}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        await html2pdf().set(opt).from(element).save();
    } catch (err) {
        console.error("PDF Error:", err);
    } finally {
        isGeneratingPDF.value = false;
    }
};
</script>

<style scoped>
.font-battambang { font-family: 'Battambang', sans-serif; }
.font-moul { font-family: 'Moul', serif; }

/* Transitions */
.slide-fade-enter-active, .slide-fade-leave-active { transition: all 0.3s ease; }
.slide-fade-enter-from, .slide-fade-leave-to { transform: translateY(-20px); opacity: 0; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Hide Scrollbar for Tabs */
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>