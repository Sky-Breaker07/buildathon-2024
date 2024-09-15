<!-- src/components/FeatureCard.vue -->
<template>
    <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
      <v-icon :name="icon" class="text-4xl text-blue-600 mb-4" />
      <h4 class="text-xl font-semibold mb-2">{{ title }}</h4>
      <p class="text-gray-600">{{ description }}</p>
    </div>
  </template>
  
  <script setup>
  import { OhVueIcon as VIcon } from "oh-vue-icons";

  defineProps({
    icon: String,
    title: String,
    description: String
  });
  </script>