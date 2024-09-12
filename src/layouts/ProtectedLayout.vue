<template>
  <div class="min-h-screen bg-gray-100">
    <OrganizationHeader />
    <div class="container mx-auto px-4 py-8">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import OrganizationHeader from '../components/OrganizationHeader.vue';
</script>
