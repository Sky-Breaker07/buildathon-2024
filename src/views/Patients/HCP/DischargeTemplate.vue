<template>
    <div v-if="currentUser" class="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-lg">
      <h1 class="text-4xl font-bold mb-8 text-indigo-700 border-b-2 border-indigo-200 pb-4">Discharge Template Builder</h1>
      
      <div class="space-y-6">
        <div class="relative">
          <input 
            v-model="templateName" 
            class="w-full p-3 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 pl-10"
            placeholder="Template Name"
          />
          <span class="absolute left-3 top-3 text-indigo-500">
            <i class="fas fa-file-alt"></i>
          </span>
        </div>
        
        <div class="relative">
          <input 
            :value="currentUser.profession" 
            class="w-full p-3 border-2 border-indigo-300 rounded-lg bg-gray-100 pl-10"
            placeholder="Profession" 
            disabled
          />
          <span class="absolute left-3 top-3 text-indigo-500">
            <i class="fas fa-user-md"></i>
          </span>
        </div>
        
        <div class="relative">
          <textarea 
            v-model="description" 
            class="w-full p-3 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 pl-10"
            placeholder="Description" 
            rows="3"
          ></textarea>
          <span class="absolute left-3 top-3 text-indigo-500">
            <i class="fas fa-info-circle"></i>
          </span>
        </div>
      </div>
      
      <div class="mt-8 space-y-8">
        <div v-for="(section, sectionIndex) in sections" :key="sectionIndex" class="p-6 border-2 border-indigo-200 rounded-lg bg-indigo-50 shadow-md transition-all duration-300 hover:shadow-lg">
          <div class="flex justify-between items-center mb-4">
            <input 
              v-model="section.name" 
              class="text-xl font-semibold bg-transparent border-b-2 border-indigo-300 focus:border-indigo-500 transition-all duration-300"
              placeholder="Section Name" 
            />
            <button @click="removeSection(sectionIndex)" class="text-red-500 hover:text-red-700 transition-colors duration-300">
              <i class="fas fa-trash"></i>
            </button>
          </div>
          
          <div v-for="(field, fieldName) in section.fields" :key="fieldName" class="mb-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <FieldBuilder 
              :field="field" 
              @remove="removeField(sectionIndex, fieldName)"
              @update:field="updateField(sectionIndex, fieldName, $event)"
            />
          </div>
          
          <button @click="addField(sectionIndex)" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center">
            <i class="fas fa-plus mr-2"></i> Add Field
          </button>
        </div>
      </div>
      
      <div class="flex justify-between mt-8">
        <button @click="addSection" class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center">
          <i class="fas fa-folder-plus mr-2"></i> Add Section
        </button>
        <button @click="saveTemplate" class="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300 flex items-center">
          <i class="fas fa-save mr-2"></i> Save Template
        </button>
      </div>
    </div>
    <div v-else class="flex items-center justify-center h-screen bg-gray-100">
      <p class="text-xl text-gray-600">Loading...</p>
    </div>
    <LoadingModal ref="loadingModal" />
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  import { useDischargeTemplateStore } from '@/stores/discharge-template';
  import { createDischargeTemplate } from '@/utils/dischargeTemplate';
  import FieldBuilder from '../../../components/FieldBuilder.vue';
  import { useStaffStore } from '@/stores/staff-management';
  import LoadingModal from '../../../components/LoadingModal.vue';
  
  const router = useRouter();
  const toast = useToast();
  const dischargeTemplateStore = useDischargeTemplateStore();
  const staffStore = useStaffStore();
  const loadingModal = ref(null);
  
  const templateName = ref('');
  const description = ref('');
  const sections = ref([]);
  
  const currentUser = computed(() => staffStore.currentUser);
  
  onMounted(async () => {
    if (!currentUser.value) {
      await fetchCurrentUser();
    }
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
  
  const addSection = () => {
    sections.value.push({ name: '', fields: {} });
  };
  
  const removeSection = (index) => {
    sections.value.splice(index, 1);
  };
  
  const addField = (sectionIndex) => {
    const fieldName = `field_${Object.keys(sections.value[sectionIndex].fields).length + 1}`;
    sections.value[sectionIndex].fields[fieldName] = {
      type: 'String',
      label: '',
      required: false,
      placeholder: '',
      options: [],
      defaultValue: '',
    };
  };
  
  const removeField = (sectionIndex, fieldName) => {
    delete sections.value[sectionIndex].fields[fieldName];
  };
  
  const updateField = (sectionIndex, fieldName, updatedField) => {
    sections.value[sectionIndex].fields[fieldName] = updatedField;
  };
  
  const processedFields = computed(() => {
    const fields = {};
    sections.value.forEach((section) => {
      fields[section.name] = section.fields;
    });
    return fields;
  });
  
  const saveTemplate = async () => {
    try {
      loadingModal.value.show();
      const templateData = {
        name: templateName.value,
        profession: currentUser.value.profession,
        description: description.value,
        fields: processedFields.value,
      };
      console.log(templateData);
      const response = await createDischargeTemplate(templateData);
      dischargeTemplateStore.addTemplate(response.data);
      
      toast.success('Template saved successfully!');
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Error saving template. Please try again.');
    } finally {
      loadingModal.value.hide();
    }
  };
  </script>