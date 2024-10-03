<template>
    <div v-if="currentUser" class="w-[90rem] mx-auto p-8 pt-4 bg-white rounded-lg font-poppins">
      <BackButton class="py-4" />
      <h1 class="text-4xl font-bold mb-8 text-indigo-700 border-b-2 border-indigo-200 pb-4">
        Manage {{ capitalizeTemplateType }} Templates
      </h1>
  
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
  
      <div v-else-if="templates.length === 0" class="text-center text-gray-600 text-xl mt-12">
        No templates found for your profession.
      </div>
  
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="template in templates" :key="template._id" class="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div class="p-6">
            <h3 class="text-xl font-semibold text-indigo-600 mb-2">{{ template.name }}</h3>
            <p class="text-gray-600 mb-4">{{ template.description }}</p>
            <div class="flex justify-between items-center">
              <button @click="previewTemplate(template)" class="text-blue-500 hover:text-blue-700 transition-colors duration-300">
                <i class="fas fa-eye mr-2"></i>Preview
              </button>
              <button @click="editTemplate(template)" class="text-green-500 hover:text-green-700 transition-colors duration-300">
                <i class="fas fa-edit mr-2"></i>Edit
              </button>
              <button @click="showDeleteModalFn(template)" class="text-red-500 hover:text-red-700 transition-colors duration-300">
                <i class="fas fa-trash mr-2"></i>Delete
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Preview Modal -->
      <teleport to="body">
        <div v-if="showPreviewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div class="bg-white p-6 rounded-lg max-w-3xl w-full m-4 font-poppins">
            <h2 class="text-2xl font-bold mb-4 text-indigo-700">Template Preview</h2>
            <div class="max-h-[70vh] overflow-y-auto">
              <h3 class="text-2xl font-semibold mb-2 text-center text-indigo-600">
                {{ selectedTemplate.name }}
              </h3>
              <p class="text-gray-600 mb-6 text-center">{{ selectedTemplate.description }}</p>
              <div v-for="(section, sectionName) in selectedTemplate.fields" :key="sectionName" class="mb-8">
                <h4 class="text-xl font-bold mb-4 text-center text-indigo-700 border-b-2 border-indigo-200 pb-2">
                  {{ sectionName }}
                </h4>
                <div v-for="(field, fieldName) in section" :key="fieldName" class="mb-4">
                  <p class="font-medium">{{ field.label }}</p>
                  <div class="mt-1">
                    <input
                      v-if="field.type === 'String' && !field.isImage"
                      type="text"
                      class="w-full p-2 border rounded"
                      :placeholder="field.placeholder"
                      disabled
                    />
                    <div v-else-if="field.type === 'String' && field.isImage" class="mt-1">
                      <p class="text-sm text-gray-500">Image upload field</p>
                      <div class="mt-1 flex items-center">
                        <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                          <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <input
                      v-else-if="field.type === 'Number'"
                      type="number"
                      class="w-full p-2 border rounded"
                      :placeholder="field.placeholder"
                      disabled
                    />
                    <input
                      v-else-if="field.type === 'Date'"
                      type="date"
                      class="w-full p-2 border rounded"
                      disabled
                    />
                    <select
                      v-else-if="field.type === 'Array'"
                      class="w-full p-2 border rounded"
                      disabled
                    >
                      <option v-for="option in field.options" :key="option" :value="option">
                        {{ option }}
                      </option>
                    </select>
                    <select
                      v-else-if="field.type === 'Boolean'"
                      class="w-full p-2 border rounded"
                      disabled
                    >
                      <option value="">Select a value</option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 flex justify-end">
              <button
                @click="closePreviewModal"
                class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-200"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      </teleport>
  
      <!-- Update Modal -->
      <teleport to="body">
        <div v-if="showUpdateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div class="bg-white p-6 rounded-lg max-w-3xl w-full m-4">
            <h2 class="text-2xl font-bold mb-4 text-indigo-700">Update Template</h2>
            <div class="space-y-4">
              <input v-model="updatedTemplate.name" class="w-full p-2 border rounded" placeholder="Template Name" />
              <textarea v-model="updatedTemplate.description" class="w-full p-2 border rounded" placeholder="Description" rows="3"></textarea>
              <!-- Add more fields for updating template structure if needed -->
            </div>
            <div class="mt-4 flex justify-end space-x-4">
              <button @click="closeUpdateModal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-200">
                Cancel
              </button>
              <button @click="updateTemplate" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200">
                Update
              </button>
            </div>
          </div>
        </div>
      </teleport>
  
      <!-- Delete Confirmation Modal -->
      <teleport to="body">
        <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white p-6 rounded-lg max-w-md w-full m-4">
            <h2 class="text-2xl font-bold mb-4 text-red-600">Confirm Deletion</h2>
            <p class="mb-6">Are you sure you want to delete the template "{{ selectedTemplate.name }}"? This action cannot be undone.</p>
            <div class="flex justify-end space-x-4">
              <button @click="closeDeleteModal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-200">
                Cancel
              </button>
              <button @click="deleteTemplate" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200">
                Delete
              </button>
            </div>
          </div>
        </div>
      </teleport>
  
      <LoadingModal ref="loadingModal" />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useToast } from 'vue-toastification';
  import { useStaffStore } from '@/stores/staff-management';
  import LoadingModal from '../../../components/LoadingModal.vue';
  import BackButton from '../../../components/BackButton.vue';
  import { getTemplatesByProfession, updateTemplate as updateTemplateAPI, deleteTemplate as deleteTemplateAPI } from '@/utils/template';
  
  const router = useRouter();
  const route = useRoute();
  const toast = useToast();
  const staffStore = useStaffStore();
  const loadingModal = ref(null);
  
  const currentUser = computed(() => staffStore.currentUser);
  const templates = ref([]);
  const loading = ref(true);
  
  const showPreviewModal = ref(false);
  const showUpdateModal = ref(false);
  const showDeleteModal = ref(false);
  const selectedTemplate = ref(null);
  const updatedTemplate = ref({});
  
  const templateType = computed(() => route.params.type);
  
  onMounted(async () => {
    if (!currentUser.value) {
      await fetchCurrentUser();
    }
    await fetchTemplates();
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
  
  const fetchTemplates = async () => {
    try {
      loading.value = true;
      const response = await getTemplatesByProfession(templateType.value, currentUser.value.profession);
      console.log('API Response:', response); // For debugging
      const templateKey = `${templateType.value}Templates`;
      templates.value = response.data[templateKey] || [];
    } catch (error) {
      // check for cases where no templates are found
      if (error.response && error.response.status === 404) {
        toast.info('No templates found for your profession. Please create templates.');
      } else {
        console.error('Error fetching templates:', error);
        toast.error('Failed to fetch templates. Please try again.');
      }
    } finally {
      loading.value = false;
    }
  };
  
  const previewTemplate = (template) => {
    selectedTemplate.value = template;
    showPreviewModal.value = true;
  };
  
  const closePreviewModal = () => {
    showPreviewModal.value = false;
    selectedTemplate.value = null;
  };
  
  const closeUpdateModal = () => {
    showUpdateModal.value = false;
    selectedTemplate.value = null;
    updatedTemplate.value = {};
  };
  
  const updateTemplate = async () => {
    try {
      loadingModal.value.show();
      await updateTemplateAPI(templateType.value, selectedTemplate.value._id, updatedTemplate.value);
      toast.success('Template updated successfully!');
      await fetchTemplates();
      closeUpdateModal();
    } catch (error) {
      console.error('Error updating template:', error);
      toast.error('Failed to update template. Please try again.');
    } finally {
      loadingModal.value.hide();
    }
  };
  
  const showDeleteModalFn = (template) => {
    selectedTemplate.value = template;
    showDeleteModal.value = true;
  };
  
  const closeDeleteModal = () => {
    showDeleteModal.value = false;
    selectedTemplate.value = null;
  };
  
  const deleteTemplate = async () => {
    try {
      loadingModal.value.show();
      await deleteTemplateAPI(templateType.value, selectedTemplate.value._id);
      toast.success('Template deleted successfully!');
      await fetchTemplates();
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error('Failed to delete template. Please try again.');
    } finally {
      loadingModal.value.hide();
    }
  };
  
  const editTemplate = (template) => {
    router.push({ name: 'EditTemplates', params: { type: templateType.value, id: template._id } });
  };

	const capitalizeTemplateType = computed(() => {
		return templateType.value.charAt(0).toUpperCase() + templateType.value.slice(1);
	});
</script>
