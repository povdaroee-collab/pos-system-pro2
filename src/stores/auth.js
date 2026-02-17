import { defineStore } from 'pinia';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const errorMessage = ref('');
  const isLoading = ref(false);
  const router = useRouter();

  const DOMAIN = '@pos.com'; 

  const login = async (username, password) => {
    isLoading.value = true;
    errorMessage.value = '';

    const email = username.trim().toLowerCase() + DOMAIN;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      
      console.log("Login Success as:", username);
      // ចំណាំ: យើងមិន router.push នៅទីនេះទេ យើង return true ដើម្បីឱ្យ View ជាអ្នកធ្វើ
      return true;

    } catch (error) {
      console.error("Login Error:", error.code);
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage.value = 'ទម្រង់ឈ្មោះគណនីមិនត្រឹមត្រូវ!';
          break;
        case 'auth/user-not-found':
        case 'auth/invalid-credential':
          errorMessage.value = 'ឈ្មោះគណនី ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ!'; 
          break;
        case 'auth/wrong-password':
          errorMessage.value = 'ពាក្យសម្ងាត់មិនត្រឹមត្រូវ!';
          break;
        default:
          errorMessage.value = 'មានបញ្ហា៖ ' + error.message;
      }
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    await signOut(auth);
    user.value = null;
    router.push('/login');
  };

  return { user, login, logout, errorMessage, isLoading };
});