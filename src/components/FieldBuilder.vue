<template>
  <div class="field-builder space-y-4">
    <div class="flex justify-between items-center">
      <select 
        :value="field.type" 
        @input="updateField('type', $event.target.value)" 
        class="p-2 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
      >
        <option v-for="type in fieldTypes" :key="type" :value="type">{{ type }}</option>
      </select>
      <button @click="$emit('remove')" class="text-red-500 hover:text-red-700 transition-colors duration-300">
        <i class="fas fa-times"></i>
      </button>
    </div>
    
    <div class="relative">
      <input 
        :value="field.label" 
        @input="updateField('label', $event.target.value)" 
        class="w-full p-3 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 pl-10"
        placeholder="Field Label" 
      />
      <span class="absolute left-3 top-3 text-indigo-500">
        <i class="fas fa-tag"></i>
      </span>
    </div>
    
    <div class="flex items-center">
      <input 
        type="checkbox" 
        :checked="field.required" 
        @change="updateField('required', $event.target.checked)" 
        class="mr-2 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <label class="text-gray-700">Required</label>
    </div>
    
    <div class="relative">
      <input 
        :value="field.placeholder" 
        @input="updateField('placeholder', $event.target.value)" 
        class="w-full p-3 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 pl-10"
        placeholder="Placeholder" 
      />
      <span class="absolute left-3 top-3 text-indigo-500">
        <i class="fas fa-font"></i>
      </span>
    </div>
    
    <div v-if="field.type === 'Array'" class="space-y-2">
      <div v-for="(option, index) in field.options" :key="index" class="flex">
        <input 
          :value="option" 
          @input="updateOption(index, $event.target.value)" 
          class="flex-grow p-2 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
          placeholder="Option" 
        />
        <button @click="removeOption(index)" class="ml-2 text-red-500 hover:text-red-700 transition-colors duration-300">
          <i class="fas fa-minus"></i>
        </button>
      </div>
      <button @click="addOption" class="mt-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center">
        <i class="fas fa-plus mr-2"></i> Add Option
      </button>
    </div>
    
    <div class="relative">
      <input 
        :value="field.defaultValue" 
        @input="updateField('defaultValue', $event.target.value)" 
        class="w-full p-3 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 pl-10"
        placeholder="Default Value" 
      />
      <span class="absolute left-3 top-3 text-indigo-500">
        <i class="fas fa-pencil-alt"></i>
      </span>
    </div>
  </div>
</template>

<script setup>

const props = defineProps(['field']);
const emit = defineEmits(['remove', 'update:field']);

const fieldTypes = ['String', 'Number', 'Boolean', 'Array', 'Date', 'Object'];

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