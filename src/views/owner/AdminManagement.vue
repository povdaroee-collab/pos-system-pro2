<template>
    <div class="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
        
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#0a0a0a] p-4 rounded-2xl border border-white/10 shadow-lg">
            <div>
                <h2 class="font-moul text-xl text-white">គ្រប់គ្រង <span class="text-[#D4AF37]">Admin</span></h2>
                <p class="text-gray-500 text-xs mt-1">ទិន្នន័យលក់សរុប និងការគ្រប់គ្រងគណនី</p>
            </div>

            <div class="flex bg-black/50 p-1 rounded-xl border border-white/5">
                <button @click="activeTab = 'list'" :class="activeTab === 'list' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-gray-400 hover:text-white'" class="px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg> ទិន្នន័យ
                </button>
                <button @click="activeTab = 'create'" :class="activeTab === 'create' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-gray-400 hover:text-white'" class="px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg> បង្កើតថ្មី
                </button>
            </div>
        </div>

        <transition name="fade" mode="out-in">
            <div v-if="activeTab === 'list'" class="space-y-6">
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl flex items-center gap-4">
                        <div class="p-3 bg-blue-500/10 text-blue-500 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg></div>
                        <div><p class="text-xs text-gray-400 uppercase">ភ្ញៀវសរុប</p><p class="text-xl font-bold text-white">{{ totalClientsAll }}</p></div>
                    </div>
                    <div class="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl flex items-center gap-4">
                        <div class="p-3 bg-green-500/10 text-green-500 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg></div>
                        <div><p class="text-xs text-gray-400 uppercase">ទំនិញលក់ចេញ</p><p class="text-xl font-bold text-white">{{ totalSoldAll }}</p></div>
                    </div>
                    <div class="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl flex items-center gap-4">
                        <div class="p-3 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                        <div>
                            <p class="text-xs text-gray-400 uppercase">ចំណូលសរុប</p>
                            <p class="text-lg font-bold text-white">$ {{ formatCurrency(totalRevenueUSDAll) }} <span class="text-xs text-gray-500">|</span> {{ formatCurrency(totalRevenueKHRAll) }} ៛</p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div class="relative flex-1 w-full md:max-w-md">
                        <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-3.5 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input v-model="searchQuery" type="text" placeholder="ស្វែងរក..." class="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none" />
                    </div>

                    <div class="flex gap-3 items-center w-full md:w-auto">
                        <button @click="downloadAdminListPDF" :disabled="isGeneratingPDF" class="bg-[#D4AF37] text-black px-4 py-3 rounded-xl font-bold hover:bg-[#b5952f] flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20 whitespace-nowrap disabled:opacity-50">
                            <svg v-if="!isGeneratingPDF" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            {{ isGeneratingPDF ? 'Generating...' : 'PDF' }}
                        </button>

                        <div class="bg-[#0a0a0a] border border-white/10 rounded-xl p-1 flex">
                            <button @click="viewMode = 'grid'" :class="viewMode === 'grid' ? 'bg-white/10 text-[#D4AF37]' : 'text-gray-500 hover:text-white'" class="p-2 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" /></svg></button>
                            <button @click="viewMode = 'list'" :class="viewMode === 'list' ? 'bg-white/10 text-[#D4AF37]' : 'text-gray-500 hover:text-white'" class="p-2 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg></button>
                        </div>
                    </div>
                </div>

                <div v-if="isLoadingList" class="flex justify-center items-center py-20">
                     <svg class="animate-spin h-10 w-10 text-[#D4AF37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                </div>

                <div v-else>
                    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        <div v-for="admin in filteredAdmins" :key="admin.id" class="group bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative overflow-hidden hover:border-[#D4AF37]/50 transition-all">
                             <div class="flex items-center gap-4 mb-4 cursor-pointer" @click="goToDetails(admin.id)">
                                <div class="w-14 h-14 rounded-full p-0.5 bg-gradient-to-br from-[#D4AF37] to-black">
                                    <img :src="admin.photoUrl || `https://ui-avatars.com/api/?name=${admin.fullName}&background=000&color=fff`" class="w-full h-full rounded-full object-cover border-2 border-[#0a0a0a]">
                                </div>
                                <div>
                                    <h3 class="text-white font-bold text-lg leading-tight">{{ admin.fullName }}</h3>
                                    <p class="text-gray-500 text-xs">@{{ admin.username }}</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-2 mb-4 bg-white/5 p-3 rounded-xl">
                                <div class="text-center"><p class="text-[10px] text-gray-400">Seller សរុប</p><p class="text-white font-bold">{{ admin.sellerCount }}</p></div>
                                <div class="text-center border-l border-white/10"><p class="text-[10px] text-gray-400">ភ្ញៀវសរុប</p><p class="text-[#D4AF37] font-bold">{{ admin.totalClients }}</p></div>
                                <div class="col-span-2 border-t border-white/10 pt-2 flex justify-between px-2"><span class="text-[10px] text-gray-400">ចំណូល (USD):</span><span class="text-green-500 font-bold text-sm">$ {{ formatCurrency(admin.totalRevenueUSD) }}</span></div>
                                <div class="col-span-2 flex justify-between px-2"><span class="text-[10px] text-gray-400">ចំណូល (KHR):</span><span class="text-blue-500 font-bold text-sm">{{ formatCurrency(admin.totalRevenueKHR) }} ៛</span></div>
                            </div>
                            <div class="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                                <span class="text-[10px] px-2 py-1 rounded bg-white/5" :class="!admin.isBlocked ? 'text-green-500' : 'text-red-500'">{{ !admin.isBlocked ? 'Active' : 'Blocked' }}</span>
                                <div class="flex gap-2">
                                    <button @click="openEditModal(admin)" class="p-1.5 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 00 2 2h11a2 2 0 00 2-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                                    <button @click="requestDelete(admin)" class="p-1.5 text-red-500 hover:bg-red-500/10 rounded"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else class="overflow-x-auto rounded-2xl border border-white/10 bg-[#0a0a0a]">
                        <table class="w-full text-left text-sm text-gray-400">
                            <thead class="bg-white/5 uppercase text-gray-200 font-bold">
                                <tr>
                                    <th class="px-6 py-4">ឈ្មោះ / គណនី</th>
                                    <th class="px-4 py-4 text-center" title="ចំនួនភ្ញៀវសរុប"><div class="flex items-center justify-center gap-1 text-[#D4AF37]"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg></div></th>
                                    <th class="px-4 py-4 text-center" title="ចំនួនទំនិញលក់ចេញ"><div class="flex items-center justify-center gap-1 text-blue-400"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg></div></th>
                                    <th class="px-4 py-4 text-right" title="ចំណូលសរុប"><div class="flex items-center justify-end gap-1 text-green-400"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div></th>
                                    <th class="px-6 py-4 text-center" title="ប្រភេទលក់ (Units)"><div class="flex items-center justify-center gap-1 text-purple-400"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg></div></th>
                                    <th class="px-6 py-4 text-center">សកម្មភាព</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-white/5">
                                <tr v-for="admin in filteredAdmins" :key="admin.id" class="hover:bg-white/5 transition-colors">
                                    <td class="px-6 py-4 cursor-pointer" @click="goToDetails(admin.id)">
                                        <div class="flex items-center gap-3">
                                            <img :src="admin.photoUrl || `https://ui-avatars.com/api/?name=${admin.fullName}&background=000&color=fff`" class="h-10 w-10 rounded-full border border-white/10 object-cover">
                                            <div>
                                                <div class="text-white font-medium hover:text-[#D4AF37]">{{ admin.fullName }}</div>
                                                <div class="text-xs text-gray-500">@{{ admin.username }}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-4 py-4 text-center font-bold text-white">{{ admin.totalClients }}</td>
                                    <td class="px-4 py-4 text-center font-mono">{{ admin.totalSold }}</td>
                                    <td class="px-4 py-4 text-right">
                                        <div class="flex flex-col">
                                            <span class="text-green-500 text-xs font-bold">$ {{ formatCurrency(admin.totalRevenueUSD) }}</span>
                                            <span class="text-blue-500 text-xs">{{ formatCurrency(admin.totalRevenueKHR) }} ៛</span>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-center">
                                        <div class="flex flex-wrap justify-center gap-1 max-w-[200px] mx-auto">
                                            <span v-for="unit in (admin.isUnitsExpanded ? admin.units : admin.units.slice(0, 3))" :key="unit" class="px-2 py-0.5 bg-white/10 rounded text-[10px] text-gray-300 border border-white/5">
                                                {{ unit }}
                                            </span>
                                            <button v-if="admin.units.length > 3" @click="admin.isUnitsExpanded = !admin.isUnitsExpanded" class="px-2 py-0.5 bg-[#D4AF37]/20 text-[#D4AF37] rounded text-[10px] hover:bg-[#D4AF37] hover:text-black transition-colors">
                                                {{ admin.isUnitsExpanded ? '-' : `+${admin.units.length - 3}` }}
                                            </button>
                                            <span v-if="admin.units.length === 0" class="text-xs text-gray-600">-</span>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-center">
                                        <div class="flex justify-center gap-2">
                                            <button @click="openEditModal(admin)" class="p-1.5 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 00 2 2h11a2 2 0 00 2-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                                            <button @click="requestDelete(admin)" class="p-1.5 text-red-500 hover:bg-red-500/10 rounded"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="fade" mode="out-in">
            <div v-if="activeTab === 'create'">
                <div class="bg-[#0a0a0a] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl relative">
                    <div class="p-8 lg:p-10 border-b border-white/10 bg-gradient-to-r from-black to-[#111] relative z-10 flex justify-between items-center">
                        <div><h2 class="font-moul text-xl lg:text-2xl text-white mb-2">បញ្ចូលព័ត៌មាន <span class="text-[#D4AF37]">Admin</span></h2></div>
                        <button @click="activeTab = 'list'" class="text-gray-500 hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                    </div>
                    <div class="p-8 lg:p-12 relative z-10">
                         <form @submit.prevent="handleCreateAdmin" class="space-y-8">
                             <div class="flex flex-col lg:flex-row gap-10">
                                <div class="lg:w-1/3 flex flex-col items-center space-y-6">
                                    <div class="relative group">
                                        <div class="w-48 h-48 rounded-full border-4 border-[#D4AF37]/30 p-1 bg-black overflow-hidden group-hover:border-[#D4AF37] transition-all duration-300">
                                            <div class="w-full h-full rounded-full bg-[#151515] flex items-center justify-center overflow-hidden relative">
                                                <img v-if="imagePreview" :src="imagePreview" class="w-full h-full object-cover">
                                                <div v-else class="text-center p-6 text-gray-500 text-xs">រូបភាព Profile</div>
                                                <div class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" @click="$refs.fileInput.click()"><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
                                            </div>
                                        </div>
                                        <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleImageChange" />
                                    </div>
                                </div>
                                <div class="lg:w-2/3 space-y-6">
                                    <div class="space-y-2"><label class="text-xs font-bold text-[#D4AF37]">ឈ្មោះពេញ *</label><input v-model="form.fullName" required class="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-xl text-white outline-none focus:border-[#D4AF37]" /></div>
                                    <div class="grid grid-cols-2 gap-6">
                                        <div class="space-y-2"><label class="text-xs font-bold text-[#D4AF37]">Username *</label><input v-model="form.username" required class="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-xl text-white outline-none focus:border-[#D4AF37]" /></div>
                                        <div class="space-y-2"><label class="text-xs font-bold text-[#D4AF37]">Telegram</label><input v-model="form.telegram" required class="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-xl text-white outline-none focus:border-[#D4AF37]" /></div>
                                    </div>
                                    <div class="space-y-2"><label class="text-xs font-bold text-[#D4AF37]">Password *</label><input v-model="form.password" type="password" required class="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-xl text-white outline-none focus:border-[#D4AF37]" /></div>
                                </div>
                             </div>
                             <div class="pt-6 border-t border-white/10 flex justify-end gap-3"><button type="submit" :disabled="isLoading" class="px-10 py-4 bg-[#D4AF37] text-black font-bold rounded-xl">{{ isLoading ? 'កំពុងបង្កើត...' : 'បង្កើតគណនី Admin' }}</button></div>
                         </form>
                    </div>
               </div>
            </div>
        </transition>

        <transition name="fade">
            <div v-if="isEditModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                 <div class="bg-[#111] border border-[#D4AF37]/30 w-full max-w-2xl rounded-2xl shadow-2xl relative">
                    <div class="p-6 border-b border-white/10 flex justify-between items-center bg-[#151515]"><h3 class="font-moul text-xl text-[#D4AF37]">កែប្រែព័ត៌មាន Admin</h3><button @click="closeEditModal" class="text-gray-500 hover:text-white">✕</button></div>
                    <div class="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                        <div class="flex justify-center"><div class="relative w-32 h-32 rounded-full border-2 border-[#D4AF37] overflow-hidden group"><img :src="editPreviewImage || editingAdminData.photoUrl || `https://ui-avatars.com/api/?name=${editingAdminData.fullName}&background=000&color=fff`" class="w-full h-full object-cover"><div class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" @click="$refs.editFileInput.click()"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div><input type="file" ref="editFileInput" class="hidden" accept="image/*" @change="handleEditImageChange" /></div></div>
                        <div class="space-y-4"><div class="space-y-1"><label class="text-xs text-gray-400">ឈ្មោះពេញ</label><input v-model="editingAdminData.fullName" class="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white outline-none focus:border-[#D4AF37]" /></div><div class="space-y-1"><label class="text-xs text-gray-400">Telegram</label><input v-model="editingAdminData.telegram" class="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white outline-none focus:border-[#D4AF37]" /></div><div class="space-y-1 pt-4 border-t border-white/10"><label class="text-xs text-[#D4AF37] font-bold">ប្តូរពាក្យសម្ងាត់ថ្មី</label><input v-model="editingAdminData.newPassword" type="password" placeholder="ទុកទទេបើមិនចង់ប្តូរ..." class="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white outline-none focus:border-[#D4AF37]" /></div></div>
                    </div>
                    <div class="p-6 border-t border-white/10 bg-[#151515] flex justify-end gap-3"><button @click="closeEditModal" class="px-6 py-3 text-gray-400 hover:text-white">បោះបង់</button><button @click="handleUpdateAdmin" :disabled="isUpdating" class="px-8 py-3 bg-[#D4AF37] text-black font-bold rounded-lg">{{ isUpdating ? 'កំពុងរក្សាទុក...' : 'រក្សាទុក' }}</button></div>
                </div>
            </div>
        </transition>

        <transition name="fade">
            <div v-if="confirmModal.isOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                <div class="bg-[#111] border border-[#D4AF37] w-full max-w-sm rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.2)] text-center p-8 transform transition-all scale-100">
                    <div class="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <h3 class="font-moul text-xl text-white mb-2">{{ confirmModal.title }}</h3>
                    <p class="text-gray-400 text-sm mb-8">{{ confirmModal.message }}</p>
                    <div class="flex gap-3 justify-center">
                        <button @click="closeConfirmModal" class="px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all font-bold">បោះបង់</button>
                        <button @click="confirmAction" class="px-8 py-3 rounded-xl bg-[#D4AF37] text-black font-bold hover:bg-[#b8952b] shadow-lg shadow-[#D4AF37]/20 transition-all">យល់ព្រម</button>
                    </div>
                </div>
            </div>
        </transition>

        <div id="admin-pdf-container" style="position: fixed; left: -9999px; top: 0;">
            <div id="admin-list-pdf" style="width: 210mm; height: auto; min-height: auto; padding: 15mm; font-family: 'Battambang', sans-serif; background: white; color: black; box-sizing: border-box;">
                
                <div style="border-bottom: 2px solid #D4AF37; padding-bottom: 10px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end;">
                    <div>
                        <h1 style="color: #D4AF37; font-size: 24px; font-weight: bold; margin: 0; font-family: 'Moul', serif;">POS GOLD</h1>
                        <p style="font-size: 12px; margin: 5px 0 0 0; color: #333; font-weight: bold;">របាយការណ៍បញ្ជីអ្នកគ្រប់គ្រង (ADMIN REPORT)</p>
                    </div>
                    <div style="text-align: right; font-size: 10px; color: #444;">
                        <p>Date: {{ new Date().toLocaleDateString('en-GB') }}</p>
                    </div>
                </div>

                <table style="width: 100%; font-size: 10px; border-collapse: collapse; text-align: left; table-layout: fixed;">
                    <thead style="background: #D4AF37; color: black;">
                        <tr>
                            <th style="padding: 8px; border: 1px solid #ccc; width: 5%; text-align: center; font-weight: bold;">No</th>
                            <th style="padding: 8px; border: 1px solid #ccc; width: 25%; text-align: center; font-weight: bold;">Admin Name</th>
                            <th style="padding: 8px; border: 1px solid #ccc; width: 10%; text-align: center; font-weight: bold;">Sellers</th>
                            <th style="padding: 8px; border: 1px solid #ccc; width: 10%; text-align: center; font-weight: bold;">Clients</th>
                            <th style="padding: 8px; border: 1px solid #ccc; width: 10%; text-align: center; font-weight: bold;">Items</th>
                            <th style="padding: 8px; border: 1px solid #ccc; width: 20%; text-align: center; font-weight: bold;">Total (USD)</th>
                            <th style="padding: 8px; border: 1px solid #ccc; width: 20%; text-align: center; font-weight: bold;">Total (KHR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(admin, index) in filteredAdmins" :key="admin.id" style="page-break-inside: avoid;">
                            <td style="padding: 6px; border: 1px solid #eee; text-align: center;">{{ index + 1 }}</td>
                            <td style="padding: 6px; border: 1px solid #eee; text-align: left;">
                                <div style="font-weight: bold;">{{ admin.fullName }}</div>
                                <div style="font-size: 8px; color: #666;">@{{ admin.username }}</div>
                            </td>
                            <td style="padding: 6px; border: 1px solid #eee; text-align: left; padding-left: 10px;">{{ admin.sellerCount }}</td>
                            <td style="padding: 6px; border: 1px solid #eee; text-align: left; padding-left: 10px;">{{ admin.totalClients }}</td>
                            <td style="padding: 6px; border: 1px solid #eee; text-align: left; padding-left: 10px;">{{ admin.totalSold }}</td>
                            <td style="padding: 6px; border: 1px solid #eee; text-align: left; padding-left: 10px;">$ {{ formatCurrency(admin.totalRevenueUSD) }}</td>
                            <td style="padding: 6px; border: 1px solid #eee; text-align: left; padding-left: 10px;">{{ formatCurrency(admin.totalRevenueKHR) }} ៛</td>
                        </tr>
                    </tbody>
                </table>

                <div style="margin-top: 25px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;">
                    
                    <div style="border: 1px solid #eab308; background-color: #fefce8; padding: 10px; border-radius: 6px; text-align: center;">
                        <p style="font-size: 9px; color: #854d0e; font-weight: bold; margin: 0; text-transform: uppercase;">Sellers សរុប</p>
                        <p style="font-size: 16px; font-weight: bold; color: #000; margin: 5px 0 0 0;">{{ totalSellersAll }}</p>
                    </div>

                    <div style="border: 1px solid #3b82f6; background-color: #eff6ff; padding: 10px; border-radius: 6px; text-align: center;">
                        <p style="font-size: 9px; color: #1e40af; font-weight: bold; margin: 0; text-transform: uppercase;">ភ្ញៀវសរុប (Clients)</p>
                        <p style="font-size: 16px; font-weight: bold; color: #000; margin: 5px 0 0 0;">{{ totalClientsAll }}</p>
                    </div>

                    <div style="border: 1px solid #22c55e; background-color: #f0fdf4; padding: 10px; border-radius: 6px; text-align: center;">
                        <p style="font-size: 9px; color: #15803d; font-weight: bold; margin: 0; text-transform: uppercase;">ចំណូលសរុប (USD)</p>
                        <p style="font-size: 16px; font-weight: bold; color: #166534; margin: 5px 0 0 0;">$ {{ formatCurrency(totalRevenueUSDAll) }}</p>
                    </div>

                    <div style="border: 1px solid #6366f1; background-color: #eef2ff; padding: 10px; border-radius: 6px; text-align: center;">
                        <p style="font-size: 9px; color: #4338ca; font-weight: bold; margin: 0; text-transform: uppercase;">ចំណូលសរុប (KHR)</p>
                        <p style="font-size: 16px; font-weight: bold; color: #3730a3; margin: 5px 0 0 0;">{{ formatCurrency(totalRevenueKHRAll) }} ៛</p>
                    </div>

                </div>

                <div style="margin-top: 20px; text-align: center; font-size: 8px; color: #888; border-top: 1px dashed #ccc; padding-top: 10px;">
                    Report Generated by POS GOLD System | {{ new Date().toLocaleString('en-GB') }}
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useNotificationStore } from '../../stores/notification';
import { uploadImageToCloudinary } from '../../services/upload';
import { createAdminAccount } from '../../services/userManagement';
import { db } from '../../services/firebase';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import html2pdf from 'html2pdf.js';

// State & Props
const router = useRouter();
const activeTab = ref('list');
const viewMode = ref('grid');
const filterStatus = ref('all');
const searchQuery = ref('');
const isGeneratingPDF = ref(false);
const fileInput = ref(null);
const editFileInput = ref(null);
const imagePreview = ref(null);
const editPreviewImage = ref(null);
const isLoading = ref(false);
const isLoadingList = ref(false);
const isUpdating = ref(false);
const notify = useNotificationStore();
const admins = ref([]);

const confirmModal = reactive({ isOpen: false, title: '', message: '', action: null, data: null });
const isEditModalOpen = ref(false);
const editingAdminData = reactive({ id: '', fullName: '', telegram: '', photoUrl: '', newPhotoFile: null, newPassword: '' });
const form = reactive({ imageFile: null, fullName: '', username: '', telegram: '', password: '' });

// Computed Property for Filter
const filteredAdmins = computed(() => {
    let result = admins.value;
    if (filterStatus.value === 'active') result = result.filter(a => !a.isBlocked);
    else if (filterStatus.value === 'blocked') result = result.filter(a => a.isBlocked);
    if (searchQuery.value) {
        const lower = searchQuery.value.toLowerCase();
        result = result.filter(a => a.fullName.toLowerCase().includes(lower) || a.username.toLowerCase().includes(lower));
    }
    return result;
});

// Computed Totals for Summary Cards & PDF Footer
const totalSellersAll = computed(() => filteredAdmins.value.reduce((sum, a) => sum + (a.sellerCount || 0), 0));
const totalClientsAll = computed(() => filteredAdmins.value.reduce((sum, a) => sum + (a.totalClients || 0), 0));
const totalSoldAll = computed(() => filteredAdmins.value.reduce((sum, a) => sum + (a.totalSold || 0), 0));
const totalRevenueUSDAll = computed(() => filteredAdmins.value.reduce((sum, a) => sum + (a.totalRevenueUSD || 0), 0));
const totalRevenueKHRAll = computed(() => filteredAdmins.value.reduce((sum, a) => sum + (a.totalRevenueKHR || 0), 0));

// Lifecycle
onMounted(() => fetchAdmins());

// Format Currency Helper
const formatCurrency = (val) => {
    return Number(val || 0).toLocaleString();
};

// Main Data Fetching with Aggregation
const fetchAdmins = async () => {
    isLoadingList.value = true;
    try {
        const q = query(collection(db, 'users'), where('role', '==', 'admin'));
        const sn = await getDocs(q);
        
        const adminsData = await Promise.all(sn.docs.map(async (docSnap) => {
            const adminData = docSnap.data();
            const adminId = docSnap.id;

            // 1. Get Sellers for this Admin
            const sellersQ = query(collection(db, 'users'), where('role', '==', 'seller'), where('createdBy', '==', adminId));
            const sellersSn = await getDocs(sellersQ);
            
            // 2. Prepare Aggregation Variables
            let totalClients = 0;
            let totalSold = 0;
            let totalRevenueUSD = 0;
            let totalRevenueKHR = 0;
            const uniqueUnits = new Set();

            const sellerIds = sellersSn.docs.map(s => s.id);

            // 3. Fetch Sales Reports if there are sellers
            if (sellerIds.length > 0) {
                const salesQ = query(collection(db, 'sales_reports'), orderBy('createdAt', 'desc'));
                const salesSn = await getDocs(salesQ); 
                
                salesSn.docs.forEach(doc => {
                    const report = doc.data();
                    if (sellerIds.includes(report.sellerId)) {
                        totalClients += Number(report.totalClients || 0); 
                        totalSold += Number(report.totalSold || 0);
                        
                        if (report.currency === 'USD') {
                            totalRevenueUSD += Number(report.totalPrice || 0);
                        } else {
                            totalRevenueKHR += Number(report.totalPrice || 0);
                        }

                        if (report.unit) uniqueUnits.add(report.unit);
                    }
                });
            }
            
            return { 
                id: adminId, 
                ...adminData,
                sellerCount: sellersSn.size,
                totalClients,
                totalSold,
                totalRevenueUSD,
                totalRevenueKHR,
                units: Array.from(uniqueUnits),
                isUnitsExpanded: false
            };
        }));
        
        admins.value = adminsData;
    } catch (e) { 
        console.error(e);
        notify.show("Error fetching data", "error"); 
    } finally { 
        isLoadingList.value = false; 
    }
};

// Basic Actions
const goToDetails = (adminId) => router.push({ name: 'admin-details', params: { id: adminId } });
const handleImageChange = (e) => { const f=e.target.files[0]; if(f){ form.imageFile=f; const r=new FileReader(); r.onload=(ev)=>imagePreview.value=ev.target.result; r.readAsDataURL(f); }};
const handleEditImageChange = (e) => { const f=e.target.files[0]; if(f){ editingAdminData.newPhotoFile=f; const r=new FileReader(); r.onload=(ev)=>editPreviewImage.value=ev.target.result; r.readAsDataURL(f); }};

const handleCreateAdmin = async () => {
    isLoading.value=true;
    try {
        let url=""; if(form.imageFile) url=await uploadImageToCloudinary(form.imageFile);
        await createAdminAccount({ email: form.username+"@pos.com", password: form.password, fullName: form.fullName, username: form.username, telegram: form.telegram, profileUrl: url });
        notify.show("បង្កើតជោគជ័យ", "success");
        form.fullName=''; form.username=''; form.password=''; form.imageFile=null; imagePreview.value=null;
        await fetchAdmins(); activeTab.value='list';
    } catch(e) { notify.show(e.message, "error"); } finally { isLoading.value=false; }
};

// Edit / Delete / Block Logic
const openEditModal = (a) => { editingAdminData.id=a.id; editingAdminData.fullName=a.fullName; editingAdminData.telegram=a.telegram; editingAdminData.photoUrl=a.photoUrl; isEditModalOpen.value=true; };
const closeEditModal = () => isEditModalOpen.value=false;
const handleUpdateAdmin = async () => {
    isUpdating.value=true;
    try {
        const up={ fullName: editingAdminData.fullName, telegram: editingAdminData.telegram };
        if(editingAdminData.newPhotoFile) up.photoUrl=await uploadImageToCloudinary(editingAdminData.newPhotoFile);
        await updateDoc(doc(db, 'users', editingAdminData.id), up);
        notify.show("កែប្រែជោគជ័យ", "success"); await fetchAdmins(); closeEditModal();
    } catch(e) { notify.show("បរាជ័យ", "error"); } finally { isUpdating.value=false; }
};

const requestBlock = (admin) => openConfirm(`បញ្ជាក់ការ${admin.isBlocked ? 'បើក' : 'បិទ'}គណនី`, `តើអ្នកពិតជាចង់${admin.isBlocked ? 'បើក' : 'បិទ'}គណនី ${admin.fullName} មែនទេ?`, 'block', admin);
const requestDelete = (admin) => openConfirm('លុបគណនី', `តើអ្នកចង់លុបគណនី ${admin.fullName} ជាអចិន្ត្រៃយ៍មែនទេ?`, 'delete', admin);
const openConfirm = (t, m, a, d) => { confirmModal.title=t; confirmModal.message=m; confirmModal.action=a; confirmModal.data=d; confirmModal.isOpen=true; };
const closeConfirmModal = () => confirmModal.isOpen = false;
const confirmAction = async () => {
    closeConfirmModal();
    const admin = confirmModal.data;
    try {
        if (confirmModal.action === 'block') {
            await updateDoc(doc(db, 'users', admin.id), { isBlocked: !admin.isBlocked });
            admin.isBlocked = !admin.isBlocked;
            notify.show("ជោគជ័យ", "success");
        } else {
            await deleteDoc(doc(db, 'users', admin.id));
            admins.value = admins.value.filter(a => a.id !== admin.id);
            notify.show("លុបជោគជ័យ", "success");
        }
    } catch (e) { notify.show("បរាជ័យ", "error"); }
};

const formatDate = (ts) => { if(!ts)return'N/A'; const d=ts.toDate?ts.toDate():new Date(ts); return new Intl.DateTimeFormat('en-GB', {day:'numeric', month:'short', year:'numeric'}).format(d); };

// GENERATE ADMIN LIST PDF (Fixed)
const downloadAdminListPDF = async () => {
    isGeneratingPDF.value = true;
    const element = document.getElementById('admin-list-pdf');
    
    const opt = {
        margin: [5, 5, 5, 5], 
        filename: `Admins_Report_${new Date().toISOString().slice(0,10)}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        await html2pdf().set(opt).from(element).save();
    } catch (e) {
        console.error(e);
        notify.show("PDF Error", "error");
    } finally {
        isGeneratingPDF.value = false;
    }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>