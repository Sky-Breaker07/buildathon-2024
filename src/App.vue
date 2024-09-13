<template>
  <PatientTemplate/>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import PatientTemplate from './components/PatientTemplate.vue';


const route = useRoute();

const layout = computed(() => {
  return route.meta.layout || 'div';
});
</script>

<style scoped></style>
