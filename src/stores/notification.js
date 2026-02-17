import { defineStore } from 'pinia';
import { ref } from 'vue';

// ត្រូវប្រាកដថាមានពាក្យ "export" នៅខាងមុខ
export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref([]);

  // មុខងារបង្ហាញ Notification
  const show = (message, type = 'success') => {
    const id = Date.now();
    notifications.value.push({ id, message, type });

    // លុបវិញដោយស្វ័យប្រវត្តិ 3 វិនាទី
    setTimeout(() => {
      remove(id);
    }, 3000);
  };

  const remove = (id) => {
    notifications.value = notifications.value.filter(n => n.id !== id);
  };

  return { notifications, show, remove };
});