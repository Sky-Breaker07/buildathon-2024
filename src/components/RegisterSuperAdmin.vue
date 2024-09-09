<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as Super Admin
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Step {{ currentStep }} of 3
        </p>
      </div>
      <div class="mt-8 space-y-6">
        <div v-if="currentStep === 1">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <input v-model="firstName" type="text" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="First Name">
            </div>
            <div>
              <input v-model="lastName" type="text" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Last Name">
            </div>
            <div>
              <input v-model="email" type="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
            </div>
          </div>
        </div>

        <div v-if="currentStep === 2">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <input v-model="password" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
            </div>
            <div>
              <input v-model="securityQuestion" type="text" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Security Question">
            </div>
            <div>
              <input v-model="securityAnswer" type="text" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Security Answer">
            </div>
          </div>
        </div>

        <div v-if="currentStep === 3">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <input v-model="organizationName" type="text" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Organization Name">
            </div>
            <div>
              <input v-model="organizationAddress" type="text" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Organization Address">
            </div>
            <div>
              <textarea v-model="organizationDescription" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Organization Description"></textarea>
            </div>
          </div>
        </div>

        <div v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</div>

        <div class="flex justify-between">
          <button v-if="currentStep > 1" @click="previousStep" class="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Previous
          </button>
          <button @click="handleStep" :disabled="isLoading" class="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg v-if="!isLoading" class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
              <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ currentStep < 3 ? 'Next' : 'Register' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStaffStore } from '../stores/staff-management';
import { registerSuperAdmin } from '../utils/staffManagement';

const staffStore = useStaffStore();

const currentStep = ref(1);
const isLoading = ref(false);
const errorMessage = ref('');

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const securityQuestion = ref('');
const securityAnswer = ref('');
const organizationName = ref('');
const organizationAddress = ref('');
const organizationDescription = ref('');

const validateStep = () => {
  errorMessage.value = '';
  if (currentStep.value === 1) {
    if (!firstName.value || !lastName.value || !email.value) {
      errorMessage.value = 'Please fill in all fields.';
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      errorMessage.value = 'Please enter a valid email address.';
      return false;
    }
  } else if (currentStep.value === 2) {
    if (!password.value || !securityQuestion.value || !securityAnswer.value) {
      errorMessage.value = 'Please fill in all fields.';
      return false;
    }
    if (password.value.length < 8) {
      errorMessage.value = 'Password must be at least 8 characters long.';
      return false;
    }
  } else if (currentStep.value === 3) {
    if (!organizationName.value || !organizationAddress.value || !organizationDescription.value) {
      errorMessage.value = 'Please fill in all fields.';
      return false;
    }
  }
  return true;
};

const handleStep = async () => {
  if (validateStep()) {
    if (currentStep.value < 3) {
      currentStep.value++;
    } else {
      await registerSuperAdminHandler();
    }
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const registerSuperAdminHandler = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const superAdminData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      securityQuestion: securityQuestion.value,
      securityAnswer: securityAnswer.value,
      organizationName: organizationName.value,
      organizationAddress: organizationAddress.value,
      organizationDescription: organizationDescription.value,
    };

    const response = await registerSuperAdmin(superAdminData);
    staffStore.setCurrentUser(response.data.superAdmin);
    // Handle successful registration (e.g., redirect to dashboard)
    console.log('Super Admin registered successfully', response.data);
  } catch (error) {
    console.error('Error registering Super Admin', error);
    errorMessage.value = 'An error occurred during registration. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>