<template>
  <div class="field-builder space-y-4 p-4 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center">
      <select 
        :value="field.type" 
        @input="updateField('type', $event.target.value)" 
        class="p-2 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
      >
        <option v-for="type in fieldTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
      </select>
      <button @click="$emit('remove')" class="text-red-500 hover:text-red-700 transition-colors duration-300">
        <v-icon name="ri-close-line" />
      </button>
    </div>
    
    <div class="relative">
      <input 
        :value="field.label" 
        @input="updateField('label', $event.target.value)" 
        class="w-full p-3 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 pl-10"
        :placeholder="sectionName ? `${sectionName} variable` : 'Variable'" 
      />
      <span class="absolute left-3 top-3 text-indigo-500">
        <v-icon name="ri-question-line" />
      </span>
    </div>
    
    <div class="flex items-center">
      <input 
        type="checkbox" 
        :checked="field.required" 
        @change="updateField('required', $event.target.checked)" 
        class="mr-2 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <label class="text-gray-700 flex items-center">
        <v-icon name="ri-checkbox-circle-line" class="mr-1" />
        Required
      </label>
    </div>
    
    <div class="relative" v-if="field.type !== 'Boolean'">
      <input 
        :value="field.placeholder" 
        @input="updateField('placeholder', $event.target.value)" 
        class="w-full p-3 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 pl-10"
        placeholder="Placeholder text" 
      />
      <span class="absolute left-3 top-3 text-indigo-500">
        <v-icon name="ri-file-text-line" />
      </span>
    </div>
    
    <div v-if="field.type === 'Array'" class="space-y-2">
      <p class="text-sm font-medium text-gray-700">Options:</p>
      <div v-for="(option, index) in field.options" :key="index" class="flex">
        <input 
          :value="option" 
          @input="updateOption(index, $event.target.value)" 
          class="flex-grow p-2 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
          placeholder="Option" 
        />
        <button @click="removeOption(index)" class="ml-2 text-red-500 hover:text-red-700 transition-colors duration-300">
          <v-icon name="ri-delete-bin-line" />
        </button>
      </div>
      <button @click="addOption" class="mt-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center">
        <v-icon name="ri-add-line" class="mr-2" /> Add Option
      </button>
    </div>
    
    <div class="relative" v-if="field.type !== 'Boolean' && field.type !== 'Array'">
      <input 
        :value="field.defaultValue" 
        @input="updateField('defaultValue', $event.target.value)" 
        class="w-full p-3 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 pl-10"
        placeholder="Default Value" 
      />
      <span class="absolute left-3 top-3 text-indigo-500">
        <v-icon name="ri-pencil-line" />
      </span>
    </div>
    
    <div v-if="field.type === 'Boolean'" class="relative">
      <select
        :value="field.defaultValue"
        @change="updateField('defaultValue', $event.target.value)"
        class="w-full p-3 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 pl-10"
      >
        <option value="">Select a value</option>
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <span class="absolute left-3 top-3 text-indigo-500">
        <v-icon name="ri-toggle-line" />
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['field', 'sectionName']);
const emit = defineEmits(['remove', 'update:field']);

const fieldTypes = ref([
  { value: 'String', label: 'Short Text' },
  { value: 'Number', label: 'Number' },
  { value: 'Boolean', label: 'True/False' },
  { value: 'Array', label: 'Multiple Choice' },
  { value: 'Date', label: 'Date' }
]);

const updateField = (key, value) => {
  emit('update:field', { ...props.field, [key]: value });
};

const addOption = () => {
  const newOptions = Array.isArray(props.field.options) ? [...props.field.options, ''] : [''];
  updateField('options', newOptions);
};

const removeOption = (index) => {
  const newOptions = [...props.field.options];
  newOptions.splice(index, 1);
  updateField('options', newOptions);
};

const updateOption = (index, value) => {
  const newOptions = [...props.field.options];
  newOptions[index] = value;
  updateField('options', newOptions);
};
</script>