<template>
    <div v-if="currentUser" class="flex h-screen bg-gray-100">
      <!-- Sidebar -->
      <div :class="{'w-64': !sidebarCollapsed, 'w-16': sidebarCollapsed}" class="bg-indigo-800 text-white transition-all duration-300 ease-in-out">
        <div class="p-4">
          <button @click="toggleSidebar" class="text-white focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <nav class="mt-5">
          <a href="#" class="flex items-center py-2 px-4 text-gray-300 hover:bg-indigo-700">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <span v-if="!sidebarCollapsed">Dashboard</span>
          </a>
          <a v-if="isSuperAdmin" href="#" @click="goToOrgSetup" class="flex items-center py-2 px-4 text-gray-300 hover:bg-indigo-700">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            <span v-if="!sidebarCollapsed">Organization Setup</span>
          </a>
          <a href="#" @click="logout" class="flex items-center py-2 px-4 text-gray-300 hover:bg-indigo-700">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          <span v-if="!sidebarCollapsed">Logout</span>
        </a>
      </nav>
    </div>

    <!-- Main content -->
    <div class="flex-1 overflow-x-hidden overflow-y-auto">
      <div class="container mx-auto px-6 py-8">
        <h3 class="text-3xl font-medium text-gray-700">Welcome, {{ currentUser.firstName }} {{ currentUser.lastName }}</h3>
        <div class="mt-4">
          <div class="flex flex-wrap -mx-6">
            <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
              <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                <div class="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                  <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div class="mx-5">
                  <h4 class="text-2xl font-semibold text-gray-700">{{ currentUser.staff_id }}</h4>
                  <div class="text-gray-500">Staff ID</div>
                </div>
              </div>
            </div>
            <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
              <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                <div class="p-3 rounded-full bg-green-600 bg-opacity-75">
                  <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                </div>
                <div class="mx-5">
                  <h4 class="text-2xl font-semibold text-gray-700">{{ currentUser.role }}</h4>
                  <div class="text-gray-500">Role</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex items-center justify-center h-screen bg-gray-100">
    <p class="text-xl text-gray-600">Loading...</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStaffStore } from '../stores/staff-management';
import { removeToken } from '../utils/tokenUtils';
import { storeToRefs } from 'pinia';

const router = useRouter();
const staffStore = useStaffStore();
const { currentUser } = storeToRefs(staffStore);

const sidebarCollapsed = ref(false);
const isSuperAdmin = computed(() => currentUser.value?.role === 'SuperAdmin');

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

const goToOrgSetup = () => {
  router.push('/setup');
};

const logout = () => {
  removeToken();
  staffStore.clearStaffData();
  router.push('/login');
};
</script>