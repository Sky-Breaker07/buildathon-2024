<template>
  <div v-if="loading" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const loading = ref(false);

const show = () => {
  loading.value = true;
};

const hide = () => {
  loading.value = false;
};

defineExpose({ show, hide });
</script>
