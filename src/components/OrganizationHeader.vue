<template>
  <header class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
    <div class="container mx-auto px-4 py-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <svg class="h-10 w-10 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
          <h1 class="text-3xl font-bold tracking-tight">{{ organizationName }}</h1>
        </div>
        <div class="text-sm">
          <p>Welcome, {{ userName }}</p>
          <p class="text-indigo-200">{{ userTitle }}</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useStaffStore } from '../stores/staff-management';
import { storeToRefs } from 'pinia';

const staffStore = useStaffStore();
const { currentUser } = storeToRefs(staffStore);

const organizationName = computed(() => currentUser.value?.organization?.name || 'Organization');
const userName = computed(() => `${currentUser.value?.firstName} ${currentUser.value?.lastName}`);
const userTitle = computed(() => {
  if (!currentUser.value) return '';
  if (currentUser.value.role === 'SuperAdmin') return 'Chief Executive Officer';
  if (currentUser.value.role === 'HealthCareProfessional') return currentUser.value.profession || 'Healthcare Professional';
  if (currentUser.value.role === 'HealthInformationManager') return 'Health Information Manager';
  return currentUser.value.role;
});
</script>
