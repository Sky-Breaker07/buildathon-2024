<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-8">Patient Assessment</h1>
      
      <!-- Template Selection -->
      <div v-if="!selectedTemplate" class="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div class="px-4 py-5 sm:px-6">
          <h2 class="text-lg leading-6 font-medium text-gray-900">Select Assessment Template</h2>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">Choose a template to start the patient assessment.</p>
        </div>
        <div class="border-t border-gray-200">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fields</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="template in assessmentTemplates" :key="template._id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ template.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ template.description }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ Object.keys(template.fields).length }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button @click="selectTemplate(template)" class="text-indigo-600 hover:text-indigo-900">Select</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Assessment Form -->
      <div v-else class="bg-white shadow-2xl rounded-lg overflow-hidden">
        <div class="px-6 py-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <h2 class="text-3xl font-extrabold">{{ selectedTemplate.name }}</h2>
          <p class="mt-2 text-indigo-100">{{ selectedTemplate.description }}</p>
        </div>
        <div class="p-6">
          <form @submit.prevent="submitAssessment" class="space-y-8">
            <div v-for="(field, key) in selectedTemplate.fields" :key="key" class="space-y-2">
              <label :for="key" class="block text-sm font-medium text-gray-700 uppercase tracking-wide">
                {{ field.label }}
                <span v-if="field.required" class="text-red-500">*</span>
              </label>
              
              <template v-if="field.type === 'String'">
                <input v-if="!field.label.toLowerCase().includes('history')"
                  :id="key"
                  v-model="assessmentData[key]"
                  type="text"
                  :required="field.required"
                  :placeholder="field.placeholder"
                  class="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                />
                <textarea v-else
                  :id="key"
                  v-model="assessmentData[key]"
                  :required="field.required"
                  :placeholder="field.placeholder"
                  rows="4"
                  class="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                ></textarea>
              </template>
              
              <input v-else-if="field.type === 'Number'" 
                :id="key"
                v-model="assessmentData[key]"
                type="number"
                :required="field.required"
                :placeholder="field.placeholder"
                class="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              />
              
              <select v-else-if="field.type === 'Array' && field.options.length > 0"
                :id="key"
                v-model="assessmentData[key]"
                :required="field.required"
                class="mt-1 block w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              >
                <option value="">Select an option</option>
                <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
              </select>
              
              <div v-else-if="field.type === 'Boolean'" class="flex items-center">
                <input 
                  :id="key"
                  v-model="assessmentData[key]"
                  type="checkbox"
                  class="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition duration-150 ease-in-out"
                />
                <label :for="key" class="ml-3 block text-sm text-gray-700">{{ field.label }}</label>
              </div>
              
              <input v-else-if="field.type === 'Date'"
                :id="key"
                v-model="assessmentData[key]"
                type="date"
                :required="field.required"
                class="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              />
            </div>
            
            <div class="pt-6 border-t border-gray-200">
              <div class="flex justify-end space-x-3">
                <button type="button" @click="resetForm" class="px-6 py-3 bg-white text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
                  Reset
                </button>
                <button type="submit" class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
                  Submit Assessment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <LoadingModal ref="loadingModal" />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Apply Poppins font to all text */
* {
  font-family: 'Poppins', sans-serif;
}

/* Custom styles for form elements */
input[type="text"],
input[type="number"],
input[type="date"],
textarea,
select {
  transition: all 0.3s ease;
}

input[type="text"]:focus,
input[type="number"]:focus,
input[type="date"]:focus,
textarea:focus,
select:focus {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Custom checkbox styles */
input[type="checkbox"] {
  position: relative;
  cursor: pointer;
}

input[type="checkbox"]:before {
  content: "";
  display: block;
  position: absolute;
  width: 20px;
  height: 20px;
  top: -2px;
  left: -2px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  background-color: white;
}

input[type="checkbox"]:checked:before {
  background-color: #4f46e5;
  border-color: #4f46e5;
}

input[type="checkbox"]:checked:after {
  content: "";
  display: block;
  position: absolute;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  top: 2px;
  left: 7px;
}
</style>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useStaffStore } from '@/stores/staff-management';
import { getAssessmentTemplatesByProfession } from '@/utils/assessmentTemplate';
import LoadingModal from '@/components/LoadingModal.vue';

const router = useRouter();
const toast = useToast();
const staffStore = useStaffStore();
const loadingModal = ref(null);

const assessmentTemplates = ref([]);
const selectedTemplate = ref(null);
const assessmentData = ref({});

const currentUser = computed(() => staffStore.currentUser);

onMounted(async () => {
  if (!currentUser.value) {
    await fetchCurrentUser();
  }
  await fetchAssessmentTemplates();
});

const fetchCurrentUser = async () => {
  try {
    loadingModal.value.show();
    await staffStore.fetchCurrentUser();
  } catch (error) {
    console.error('Error fetching current user:', error);
    toast.error('Failed to fetch user data. Please try again.');
    router.push('/login');
  } finally {
    loadingModal.value.hide();
  }
};

const fetchAssessmentTemplates = async () => {
  try {
    loadingModal.value.show();
    const response = await getAssessmentTemplatesByProfession(currentUser.value.profession);
    assessmentTemplates.value = response.data.assessmentTemplates;
  } catch (error) {
    console.error('Error fetching assessment templates:', error);
    toast.error('Failed to fetch assessment templates. Please try again.');
  } finally {
    loadingModal.value.hide();
  }
};

const selectTemplate = (template) => {
  selectedTemplate.value = template;
  assessmentData.value = Object.keys(template.fields).reduce((acc, key) => {
    acc[key] = template.fields[key].defaultValue || '';
    return acc;
  }, {});
};

const resetForm = () => {
  assessmentData.value = Object.keys(selectedTemplate.value.fields).reduce((acc, key) => {
    acc[key] = selectedTemplate.value.fields[key].defaultValue || '';
    return acc;
  }, {});
};

const submitAssessment = async () => {
  try {
    loadingModal.value.show();
    // Here you would typically send the assessmentData to your backend
    console.log('Assessment Data:', assessmentData.value);
    toast.success('Assessment submitted successfully!');
    // Reset the form after successful submission
    resetForm();
  } catch (error) {
    console.error('Error submitting assessment:', error);
    toast.error('Failed to submit assessment. Please try again.');
  } finally {
    loadingModal.value.hide();
  }
};
</script>