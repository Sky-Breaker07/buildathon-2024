<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="staff-id" class="sr-only">Staff ID</label>
            <input id="staff-id" name="staff_id" type="text" required v-model="staffId" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Staff ID">
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required v-model="password" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
          </div>
        </div>

        <div v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <a href="#" @click.prevent="showResetPassword = true" class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button type="submit" :disabled="isLoading" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span v-if="!isLoading">Sign in</span>
            <span v-else class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          </button>
        </div>
      </form>
    </div>

    <!-- Reset Password Modal -->
    <div v-if="showResetPassword" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              Reset Password
            </h3>
            <div class="mt-2">
              <input type="text" v-model="resetStaffId" placeholder="Staff ID" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <select v-model="selectedSecurityQuestion" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">Select Security Question</option>
                <option v-for="question in securityQuestions" :key="question" :value="question">
                  {{ question }}
                </option>
              </select>
              <input type="text" v-model="securityAnswer" placeholder="Security Answer" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <input type="password" v-model="newPassword" placeholder="New Password" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" @click="handleResetPassword" :disabled="isLoading" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
              <span v-if="!isLoading">Reset Password</span>
              <span v-else class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Resetting...
              </span>
            </button>
            <button type="button" @click="showResetPassword = false" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStaffStore } from '../stores/staff-management';
import { login, resetPassword } from '../utils/auth';
import { setToken } from '../utils/tokenUtils';
import { useToast } from 'vue-toastification';

const router = useRouter();
const route = useRoute();
const staffStore = useStaffStore();
const toast = useToast();

const staffId = ref('');
const password = ref('');
const showResetPassword = ref(false);
const resetStaffId = ref('');
const selectedSecurityQuestion = ref('');
const securityAnswer = ref('');
const newPassword = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const securityQuestions = [
  "What was the name of your first pet?",
  "In which city were you born?",
  "What is your mother's maiden name?",
  "What was the name of your first school?",
  "What is the name of your favorite childhood friend?",
];

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const response = await login(staffId.value, password.value);
    setToken(response.data.token);
    staffStore.setCurrentUser(response.data.user);
    toast.success('Login successful!');
    handleSuccessfulLogin();
  } catch (error) {
    console.error('Login failed:', error);
    errorMessage.value = 'Login failed. Please check your credentials and try again.';
    toast.error('Login failed. Please try again.');
  } finally {
    isLoading.value = false;
  }
};

const handleResetPassword = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    await resetPassword(resetStaffId.value, selectedSecurityQuestion.value, securityAnswer.value, newPassword.value);
    toast.success('Password reset successful. Please login with your new password.');
    showResetPassword.value = false;
  } catch (error) {
    console.error('Password reset failed:', error);
    errorMessage.value = 'Password reset failed. Please check your information and try again.';
    toast.error('Password reset failed. Please try again.');
  } finally {
    isLoading.value = false;
  }
};

const handleSuccessfulLogin = () => {
  const redirectPath = route.query.redirect || '/dashboard';
  router.push(redirectPath);
};
</script>