<template>
    <div class="space-y-6">
        
        <div class="bg-[#1a1a1a] border border-white/10 p-4 rounded-2xl flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
            
            <div class="relative w-full xl:w-1/4">
                <input v-model="searchQuery" placeholder="ស្វែងរកឈ្មោះ Seller / Username..." class="w-full bg-black border border-white/20 rounded-xl pl-10 pr-3 py-2.5 text-white outline-none focus:border-[#D4AF37]">
                <svg class="w-4 h-4 text-gray-500 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>

            <div class="flex flex-wrap gap-2 w-full xl:w-auto items-center">
                <select v-model="categoryFilter" class="bg-black border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#D4AF37] cursor-pointer">
                    <option value="all">ប្រភេទលក់ទាំងអស់</option>
                    <option value="លក់រាយ">លក់រាយ</option>
                    <option value="បោះដុំ">បោះដុំ</option>
                </select>

                <select v-model="dateFilterType" class="bg-black border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#D4AF37] cursor-pointer">
                    <option value="all">កាលបរិច្ឆេទទាំងអស់</option>
                    <option value="today">ថ្ងៃនេះ</option>
                    <option value="month">ខែនេះ</option>
                    <option value="year">ឆ្នាំនេះ</option>
                    <option value="range">ចន្លោះថ្ងៃ (Custom)</option>
                </select>

                <div v-if="dateFilterType === 'range'" class="flex gap-2 items-center">
                    <input type="date" v-model="startDate" class="bg-black border border-white/20 text-white rounded-xl px-2 py-2 text-sm outline-none focus:border-[#D4AF37]">
                    <span class="text-white">-</span>
                    <input type="date" v-model="endDate" class="bg-black border border-white/20 text-white rounded-xl px-2 py-2 text-sm outline-none focus:border-[#D4AF37]">
                </div>

                <button @click="downloadSalesPDF" class="bg-[#D4AF37] text-black px-4 py-2.5 rounded-xl font-bold hover:bg-[#b5952f] flex items-center gap-2 text-sm ml-auto xl:ml-0 shadow-lg shadow-[#D4AF37]/20">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    PDF
                </button>
            </div>
        </div>

        <div class="bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <div v-if="loading" class="p-10 flex justify-center"><svg class="animate-spin h-8 w-8 text-[#D4AF37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>
            
            <div v-else-if="paginatedReports.length === 0" class="p-20 text-center">
                <p class="text-gray-500 text-lg">មិនមានទិន្នន័យលក់ត្រូវនឹងលក្ខខណ្ឌទេ។</p>
            </div>

            <table v-else class="w-full text-left text-sm text-gray-300">
                <thead class="bg-black/40 uppercase font-bold text-gray-200 border-b border-white/10">
                    <tr>
                        <th class="px-6 py-4">Seller</th>
                        <th class="px-6 py-4 text-center">ប្រភេទ (Unit)</th>
                        <th class="px-6 py-4 text-center">ប្រភេទលក់</th>
                        <th class="px-6 py-4 text-right">ចំនួន</th>
                        <th class="px-6 py-4 text-right">តម្លៃសរុប</th>
                        <th class="px-6 py-4 text-right">កាលបរិច្ឆេទ</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/10">
                    <tr v-for="report in paginatedReports" :key="report.id" class="hover:bg-white/5 transition-colors">
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-3">
                                <img :src="getSellerImage(report.sellerId)" class="w-8 h-8 rounded-full object-cover border border-white/10">
                                <div>
                                    <div class="font-bold text-white">{{ report.sellerName }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 text-center text-[#D4AF37]">{{ report.unit || '-' }}</td>
                        <td class="px-6 py-4 text-center">
                            <span class="px-3 py-1 rounded-full text-xs border font-bold" 
                                  :class="report.category === 'លក់រាយ' ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-blue-500/50 text-blue-400 bg-blue-500/10'">
                                {{ report.category || 'N/A' }}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-right font-mono text-white">{{ report.totalSold }}</td>
                        <td class="px-6 py-4 text-right font-bold font-mono">{{ formatCurrency(report.totalPrice) }} {{ report.currency === 'USD' ? '$' : '៛' }}</td>
                        <td class="px-6 py-4 text-right text-xs text-gray-500 font-battambang">{{ formatDateKhmer(report.createdAt) }}</td>
                    </tr>
                </tbody>
            </table>

            <div v-if="filteredReports.length > itemsPerPage" class="flex justify-between items-center p-4 border-t border-white/10 bg-black/20">
                <div class="text-xs text-gray-500">
                    បង្ហាញ {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredReports.length) }} នៃ {{ filteredReports.length }}
                </div>
                <div class="flex gap-2">
                    <button @click="currentPage--" :disabled="currentPage === 1" class="px-3 py-1 bg-white/10 rounded hover:bg-white/20 disabled:opacity-30 text-white text-xs">ថយក្រោយ</button>
                    <span class="text-white text-xs self-center px-2">{{ currentPage }}</span>
                    <button @click="currentPage++" :disabled="currentPage === totalPages" class="px-3 py-1 bg-white/10 rounded hover:bg-white/20 disabled:opacity-30 text-white text-xs">ទៅមុខ</button>
                </div>
            </div>
        </div>

        <div id="sales-pdf-container" style="position: fixed; left: -9999px; top: 0;">
            <div id="sales-pdf-report" style="width: 210mm; height: auto; min-height: auto; padding: 15mm 10mm; font-family: 'Battambang', sans-serif; background: white; color: black; box-sizing: border-box;">
                
                <div style="border-bottom: 2px solid #D4AF37; padding-bottom: 15px; margin-bottom: 20px;">
                    <h1 style="color: #D4AF37; font-size: 24px; font-weight: bold; margin: 0; font-family: 'Moul', serif; text-align: center;">POS GOLD</h1>
                    <h2 style="font-size: 14px; font-weight: bold; text-align: center; margin-top: 10px; color: #333;">
                        {{ pdfHeaderTitle }}
                    </h2>
                </div>

                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 25px;">
                    <div style="background-color: #f0f9ff; padding: 10px; border: 1px solid #bae6fd; border-radius: 5px; text-align: center;">
                        <p style="font-size: 10px; color: #0284c7; font-weight: bold; margin: 0;">ចំនួនលក់សរុប (Qty)</p>
                        <p style="font-size: 18px; font-weight: bold; color: #000; margin: 5px 0 0 0;">{{ totalFilteredQty }}</p>
                    </div>
                    <div style="background-color: #f0fdf4; padding: 10px; border: 1px solid #bbf7d0; border-radius: 5px; text-align: center;">
                        <p style="font-size: 10px; color: #16a34a; font-weight: bold; margin: 0;">ចំណូលសរុប (USD)</p>
                        <p style="font-size: 18px; font-weight: bold; color: #15803d; margin: 5px 0 0 0;">$ {{ formatCurrency(totalFilteredPriceUSD) }}</p>
                    </div>
                    <div style="background-color: #fffbeb; padding: 10px; border: 1px solid #fde68a; border-radius: 5px; text-align: center;">
                        <p style="font-size: 10px; color: #d97706; font-weight: bold; margin: 0;">ចំណូលសរុប (KHR)</p>
                        <p style="font-size: 18px; font-weight: bold; color: #b45309; margin: 5px 0 0 0;">{{ formatCurrency(totalFilteredPriceKHR) }} ៛</p>
                    </div>
                </div>

                <table style="width: 100%; border-collapse: collapse; font-size: 9px; table-layout: fixed;">
                    <thead style="background: #D4AF37; color: black;">
                        <tr>
                            <th style="padding: 10px 5px; border: 1px solid #999; text-align: center; width: 20%; font-weight: bold;">អ្នកលក់ (Seller)</th>
                            <th style="padding: 10px 5px; border: 1px solid #999; text-align: center; width: 12%; font-weight: bold;">ប្រភេទ (Unit)</th>
                            <th style="padding: 10px 5px; border: 1px solid #999; text-align: center; width: 8%; font-weight: bold;">ប្រភេទលក់</th>
                            <th style="padding: 10px 5px; border: 1px solid #999; text-align: center; width: 5%; font-weight: bold;">Qty</th>
                            <th style="padding: 10px 5px; border: 1px solid #999; text-align: center; width: 8%; font-weight: bold;">តម្លៃសរុប</th>
                            <th style="padding: 10px 5px; border: 1px solid #999; text-align: center; width: 10%; font-weight: bold;">កាលបរិច្ឆេទ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(r, index) in filteredReports" :key="index" style="page-break-inside: avoid;">
                            <td style="padding: 6px 5px; border: 1px solid #ccc; font-weight: bold; word-wrap: break-word;">{{ r.sellerName }}</td>
                            <td style="padding: 6px 5px; border: 1px solid #ccc; text-align: left;">{{ r.unit || '-' }}</td>
                            <td style="padding: 6px 5px; border: 1px solid #ccc; text-align: left;">{{ r.category || 'N/A' }}</td>
                            <td style="padding: 6px 5px; border: 1px solid #ccc; text-align: left;">{{ r.totalSold }}</td>
                            <td style="padding: 6px 5px; border: 1px solid #ccc; text-align: left; font-weight: bold;">{{ formatCurrency(r.totalPrice) }} {{ r.currency === 'USD' ? '$' : '៛' }}</td>
                            <td style="padding: 6px 5px; border: 1px solid #ccc; text-align: left">{{ formatDateKhmer(r.createdAt) }}</td>
                        </tr>
                    </tbody>
                </table>

                <div style="margin-top: 20px; font-size: 9px; text-align: right; color: #666; border-top: 1px solid #eee; padding-top: 10px;">
                    <p>បង្កើតដោយប្រព័ន្ធ POS GOLD | កាលបរិច្ឆេទចេញរបាយការណ៍: {{ formatDateKhmer(new Date()) }}</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { db } from '../../services/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import html2pdf from 'html2pdf.js';

const props = defineProps({ sellers: { type: Array, required: true } });

const loading = ref(false);
const allReports = ref([]);
const searchQuery = ref('');
const categoryFilter = ref('all');
const dateFilterType = ref('all');
const startDate = ref('');
const endDate = ref('');

const currentPage = ref(1);
const itemsPerPage = 50;

const getSellerImage = (sellerId) => {
    const seller = props.sellers.find(s => s.id === sellerId);
    return seller?.photoUrl || `https://ui-avatars.com/api/?name=Seller&background=000&color=fff`;
};

const formatDateKhmer = (timestamp) => {
    if (!timestamp) return '-';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('km-KH', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    }).format(date);
};

const pdfHeaderTitle = computed(() => {
    const today = new Date();
    if (dateFilterType.value === 'all') return 'របាយការណ៍ ទិន្នន័យរួមទាំងអស់';
    else if (dateFilterType.value === 'today') return `របាយការណ៍ប្រចាំថ្ងៃ ${formatDateKhmer(today)}`;
    else if (dateFilterType.value === 'month') return `របាយការណ៍ប្រចាំខែ ${new Intl.DateTimeFormat('km-KH', { month: 'long', year: 'numeric' }).format(today)}`;
    else if (dateFilterType.value === 'year') return `របាយការណ៍ប្រចាំឆ្នាំ ${new Intl.DateTimeFormat('km-KH', { year: 'numeric' }).format(today)}`;
    else if (dateFilterType.value === 'range' && startDate.value && endDate.value) return `របាយការណ៍ទិន្នន័យ ចន្លោះពីថ្ងៃទី ${formatDateKhmer(new Date(startDate.value))} ដល់ ${formatDateKhmer(new Date(endDate.value))}`;
    return 'របាយការណ៍លក់';
});

const filteredReports = computed(() => {
    return allReports.value.filter(report => {
        const isMySeller = props.sellers.some(s => s.id === report.sellerId);
        if (!isMySeller) return false;

        if (searchQuery.value) {
            const lower = searchQuery.value.toLowerCase();
            if (!report.sellerName?.toLowerCase().includes(lower)) return false;
        }

        if (categoryFilter.value !== 'all' && report.category !== categoryFilter.value) return false;

        if (dateFilterType.value !== 'all') {
            const reportDate = report.createdAt?.toDate ? report.createdAt.toDate() : new Date(report.createdAt);
            const now = new Date();
            if (dateFilterType.value === 'today') {
                if (reportDate.toDateString() !== now.toDateString()) return false;
            } else if (dateFilterType.value === 'month') {
                if (reportDate.getMonth() !== now.getMonth() || reportDate.getFullYear() !== now.getFullYear()) return false;
            } else if (dateFilterType.value === 'year') {
                if (reportDate.getFullYear() !== now.getFullYear()) return false;
            } else if (dateFilterType.value === 'range' && startDate.value && endDate.value) {
                const start = new Date(startDate.value);
                const end = new Date(endDate.value);
                end.setHours(23, 59, 59);
                if (reportDate < start || reportDate > end) return false;
            }
        }
        return true;
    });
});

const totalFilteredQty = computed(() => filteredReports.value.reduce((sum, r) => sum + Number(r.totalSold || 0), 0));
const totalFilteredPriceKHR = computed(() => filteredReports.value.filter(r => r.currency !== 'USD').reduce((sum, r) => sum + Number(r.totalPrice || 0), 0));
const totalFilteredPriceUSD = computed(() => filteredReports.value.filter(r => r.currency === 'USD').reduce((sum, r) => sum + Number(r.totalPrice || 0), 0));

const totalPages = computed(() => Math.ceil(filteredReports.value.length / itemsPerPage));
const paginatedReports = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredReports.value.slice(start, end);
});

const fetchReports = async () => {
    loading.value = true;
    try {
        const q = query(collection(db, 'sales_reports'), orderBy('createdAt', 'desc'), limit(1000));
        const sn = await getDocs(q);
        allReports.value = sn.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
};

onMounted(fetchReports);

const formatCurrency = (val) => Number(val || 0).toLocaleString();

const downloadSalesPDF = () => {
    const element = document.getElementById('sales-pdf-report');
    const opt = {
        margin: [10, 5, 10, 5], // Margin 10mm around to fit content comfortably
        filename: `Sales_Report_${new Date().toISOString().slice(0,10)}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
};
</script>

<style scoped>
.font-battambang { font-family: 'Battambang', sans-serif; }
</style>