<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-6xl space-y-8 bg-white p-10 rounded-xl shadow-2xl">
      <div>
        <h2 class="mt-6 text-center text-4xl font-extrabold text-gray-900">
          Register as Chief Executive Officer
        </h2>
        <p class="mt-2 text-center text-lg text-gray-600">
          Step {{ currentStep }} of 3
        </p>
      </div>
      <div class="mt-8 space-y-6">
        <div v-if="currentStep === 1" class="grid grid-cols-2 gap-6">
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
            <input id="firstName" v-model="firstName" type="text" required class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input id="lastName" v-model="lastName" type="text" required class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <input id="email" v-model="email" type="email" required class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label for="sex" class="block text-sm font-medium text-gray-700">Sex</label>
            <select id="sex" v-model="sex" required class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="">Select Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div v-if="currentStep === 2" class="space-y-6">
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" v-model="password" type="password" required class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label for="securityQuestion" class="block text-sm font-medium text-gray-700">Security Question</label>
            <select id="securityQuestion" v-model="securityQuestion" required class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="">Select Security Question</option>
              <option v-for="question in securityQuestions" :key="question" :value="question">
                {{ question }}
              </option>
            </select>
          </div>
          <div>
            <label for="securityAnswer" class="block text-sm font-medium text-gray-700">Security Answer</label>
            <input id="securityAnswer" v-model="securityAnswer" type="text" required class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
        </div>

        <div v-if="currentStep === 3" class="space-y-6">
          <div>
            <label for="organizationName" class="block text-sm font-medium text-gray-700">Organization Name</label>
            <input id="organizationName" v-model="organizationName" type="text" required class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label for="organizationAddress" class="block text-sm font-medium text-gray-700">Organization Address</label>
            <input id="organizationAddress" v-model="organizationAddress" type="text" required class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label for="organizationDescription" class="block text-sm font-medium text-gray-700">Organization Description</label>
            <textarea id="organizationDescription" v-model="organizationDescription" rows="3" required class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
          </div>
        </div>

        <div v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</div>

        <div class="flex justify-between">
          <button v-if="currentStep > 1" @click="previousStep" class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
            Previous
          </button>
          <button @click="handleStep" :disabled="isLoading" class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {{ currentStep < 3 ? 'Next' : 'Register' }}
            <svg v-if="!isLoading" class="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="animate-spin ml-2 -mr-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { registerSuperAdmin } from '../utils/staffManagement';

const emit = defineEmits(['registration-complete']);
const toast = useToast();

const currentStep = ref(1);
const isLoading = ref(false);
const errorMessage = ref('');

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const sex = ref('');
const password = ref('');
const securityQuestion = ref('');
const securityAnswer = ref('');
const organizationName = ref('');
const organizationAddress = ref('');
const organizationDescription = ref('');

const securityQuestions = [
  "What was the name of your first pet?",
  "In which city were you born?",
  "What is your mother's maiden name?",
  "What was the name of your first school?",
  "What is the name of your favorite childhood friend?",
  "What was your favorite food as a child?",
  "What is the middle name of your oldest sibling?",
  "What was the make of your first car?",
  "What is the name of the street you grew up on?",
  "What is your favorite book from childhood?"
];

const validateStep = () => {
  errorMessage.value = '';
  if (currentStep.value === 1) {
    if (!firstName.value || !lastName.value || !email.value || !sex.value) {
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
      sex: sex.value,
      password: password.value,
      securityQuestion: securityQuestion.value,
      securityAnswer: securityAnswer.value,
      organizationName: organizationName.value,
      organizationAddress: organizationAddress.value,
      organizationDescription: organizationDescription.value,
    };

    const response = await registerSuperAdmin(superAdminData);
    
    console.log('Server response:', response);
    console.log('Response data:', response.data);
    console.log('SuperAdmin data:', response.data?.data?.superAdmin);
    console.log('Organization data:', response.data?.data?.organization);
    console.log('Token:', response.data?.data?.token);

    if (response.data?.status === 'Success' && 
        response.data?.data?.superAdmin && 
        response.data?.data?.organization && 
        response.data?.data?.token) {
      emit('registration-complete', {
        superAdmin: response.data.data.superAdmin,
        organization: response.data.data.organization,
        token: response.data.data.token
      });
    } else {
      console.error('Incomplete data in response:', response.data);
      throw new Error('Incomplete data received from server');
    }
  } catch (error) {
    console.error('Error registering Super Admin', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
    errorMessage.value = 'An error occurred during registration. Please try again.';
    toast.error('Registration failed. Please try again.');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>