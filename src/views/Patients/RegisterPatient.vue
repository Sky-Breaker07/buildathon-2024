<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <div class="bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div class="md:flex">
          <div class="md:flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white flex flex-col justify-center items-center">
            <svg class="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <h2 class="mt-4 text-2xl font-bold">New Patient Registration</h2>
            <p class="mt-2 text-sm">Enter patient details to create a new record</p>
          </div>
          <div class="p-8 md:p-12 flex-grow">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="md:col-span-2">
                  <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <input v-model="patientData.name" type="text" id="name" required class="flex-1 block w-full rounded-none rounded-r-md border-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out py-2 px-3" placeholder="John Doe">
                  </div>
                </div>
                <div>
                  <label for="age" class="block text-sm font-medium text-gray-700">Age</label>
                  <input v-model.number="patientData.age" type="number" id="age" required min="0" max="150" class="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out">
                </div>
                <div>
                  <label for="sex" class="block text-sm font-medium text-gray-700">Sex</label>
                  <select v-model="patientData.sex" id="sex" required class="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label for="tribe" class="block text-sm font-medium text-gray-700">Tribe</label>
                  <input v-model="patientData.tribe" type="text" id="tribe" required class="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out">
                </div>
                <div>
                  <label for="religion" class="block text-sm font-medium text-gray-700">Religion</label>
                  <input v-model="patientData.religion" type="text" id="religion" required class="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out">
                </div>
                <div>
                  <label for="occupation" class="block text-sm font-medium text-gray-700">Occupation</label>
                  <input v-model="patientData.occupation" type="text" id="occupation" required class="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out">
                </div>
                <div>
                  <label for="marital_status" class="block text-sm font-medium text-gray-700">Marital Status</label>
                  <select v-model="patientData.marital_status" id="marital_status" required class="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out">
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                </div>
              </div>
              <div>
                <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                <textarea v-model="patientData.address" id="address" required rows="3" class="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"></textarea>
              </div>
              <div>
                <button type="submit" :disabled="isSubmitting" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:opacity-50">
                  <span v-if="isSubmitting" class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </span>
                  <span v-else>Register Patient</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <LoadingModal ref="loadingModal" />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePatientStore } from '@/stores/patient-management';
import { registerPatient } from '@/utils/patientManagement';
import LoadingModal from '@/components/LoadingModal.vue';
import { useToast } from 'vue-toastification';

const router = useRouter();
const patientStore = usePatientStore();
const loadingModal = ref(null);
const toast = useToast();

const patientData = ref({
  name: '',
  age: null,
  sex: '',
  tribe: '',
  religion: '',
  occupation: '',
  marital_status: '',
  address: ''
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  if (isSubmitting.value) return;
  
  try {
    isSubmitting.value = true;
    loadingModal.value.show();
    const response = await registerPatient(patientData.value);
    patientStore.setCurrentPatient(response.data.hospitalRecord);
    loadingModal.value.hide();
    toast.success('Patient registered successfully!');
    setTimeout(() => {
      router.push({ name: 'patientDetails', params: { id: response.data.hospitalRecord.hospital_id } });
    }, 2000);
  } catch (error) {
    console.error('Error registering patient:', error);
    loadingModal.value.hide();
    toast.error('Failed to register patient. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>
