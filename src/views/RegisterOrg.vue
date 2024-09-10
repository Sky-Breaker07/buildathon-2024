<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-6xl space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div v-if="!registrationComplete">
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register Organization
          </h2>
          <RegisterSuperAdmin @registration-complete="handleRegistrationComplete" />
        </div>
        <div v-else class="text-center">
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registration Successful
          </h2>
          <p class="mt-2 text-sm text-gray-600">Your Staff ID is:</p>
          <div class="mt-2 flex items-center justify-center">
            <input
              ref="staffIdInput"
              :value="staffId"
              readonly
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              @click="copyStaffId"
              class="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
              Copy
            </button>
          </div>
          <button
            @click="goToLogin"
            class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue to Login
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import RegisterSuperAdmin from '../components/RegisterSuperAdmin.vue';
  
  const router = useRouter();
  const registrationComplete = ref(false);
  const staffId = ref('');
  const staffIdInput = ref(null);
  
  const handleRegistrationComplete = (data) => {
    registrationComplete.value = true;
    staffId.value = data.superAdmin.staff_id;
  };
  
  const copyStaffId = () => {
    staffIdInput.value.select();
    document.execCommand('copy');
    alert('Staff ID copied to clipboard!');
  };
  
  const goToLogin = () => {
    router.push('/login');
  };
  </script>