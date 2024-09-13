<template>
  <div v-if="currentUser" class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div
      :class="{ 'w-64': !sidebarCollapsed, 'w-16': sidebarCollapsed }"
      class="bg-indigo-800 text-white transition-all duration-300 ease-in-out"
    >
      <div class="p-4">
        <button @click="toggleSidebar" class="text-white focus:outline-none">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <nav class="mt-5">
        <a
          href="#"
          class="flex items-center py-2 px-4 text-gray-300 hover:bg-indigo-700"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
          <span v-if="!sidebarCollapsed">Dashboard</span>
        </a>

        <!-- Admin HCP specific items -->
        <template v-if="isAdminHCP">
          <a
            href="#"
            @click.prevent="goToAdminSetup"
            class="flex items-center py-2 px-4 text-gray-300 hover:bg-indigo-700"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            <span v-if="!sidebarCollapsed"
              >Register/Remove {{ adminHCPProfessionPlural }}</span
            >
          </a>
          <a
            href="#"
            @click.prevent="goToAllPatientsHCP"
            class="flex items-center py-2 px-4 text-gray-300 hover:bg-indigo-700"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            <span v-if="!sidebarCollapsed">All Patients (HCP)</span>
          </a>
        </template>

        <!-- HIM specific items -->
        <template v-if="isHIM">
          <a
            href="#"
            @click.prevent="goToRegisterPatient"
            class="flex items-center py-2 px-4 text-gray-300 hover:bg-indigo-700"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              ></path>
            </svg>
            <span v-if="!sidebarCollapsed">Register Patient</span>
          </a>
          <a
            href="#"
            @click.prevent="goToAllPatientsHIM"
            class="flex items-center py-2 px-4 text-gray-300 hover:bg-indigo-700"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            <span v-if="!sidebarCollapsed">All Patients (HIM)</span>
          </a>
        </template>

        <!-- Super Admin specific items -->
        <a
          v-if="isSuperAdmin"
          href="#"
          @click.prevent="goToOrgSetup"
          class="flex items-center py-2 px-4 text-gray-300 hover:bg-indigo-700"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            ></path>
          </svg>
          <span v-if="!sidebarCollapsed">Organization Setup</span>
        </a>

        <!-- Add this new nav item for Healthcare Professionals -->
        <a
          v-if="isHCP"
          href="#"
          @click.prevent="goToAssignedPatients"
          class="flex items-center py-2 px-4 text-gray-300 hover:bg-indigo-700"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            ></path>
          </svg>
          <span v-if="!sidebarCollapsed">My Patients</span>
        </a>

        <!-- Logout button -->
        <a
          href="#"
          @click="logout"
          class="flex items-center py-2 px-4 text-gray-300 hover:bg-indigo-700"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
          </svg>
          <span v-if="!sidebarCollapsed">Logout</span>
        </a>
      </nav>
    </div>

    <!-- Main content -->
    <div class="flex-1 overflow-x-hidden overflow-y-auto">
      <div class="container mx-auto px-6 py-8">
        <h3 class="text-3xl font-medium text-gray-700">
          Welcome, {{ currentUser.firstName }} {{ currentUser.lastName }}
        </h3>
        <div class="mt-4">
          <div class="flex flex-wrap -mx-6">
            <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
              <div
                class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white"
              >
                <div class="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                  <svg
                    class="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </div>
                <div class="mx-5">
                  <h4 class="text-2xl font-semibold text-gray-700">
                    {{ currentUser.staff_id }}
                  </h4>
                  <div class="text-gray-500">Staff ID</div>
                </div>
              </div>
            </div>
            <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
              <div
                class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white"
              >
                <div class="p-3 rounded-full bg-green-600 bg-opacity-75">
                  <svg
                    class="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </div>
                <div class="mx-5">
                  <h4 class="text-2xl font-semibold text-gray-700">
                    {{ userTitle }}
                  </h4>
                  <div class="text-gray-500">Position</div>
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
  <LoadingModal ref="loadingModal" />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStaffStore } from "../stores/staff-management";
import { removeToken } from "../utils/tokenUtils";
import { storeToRefs } from "pinia";
import LoadingModal from "../components/LoadingModal.vue";
import { useToast } from "vue-toastification";

const router = useRouter();
const staffStore = useStaffStore();
const { currentUser } = storeToRefs(staffStore);
const toast = useToast();

const sidebarCollapsed = ref(false);
const loadingModal = ref(null);

const isAdminHCP = computed(
  () =>
    currentUser.value?.role === "HealthCareProfessional" &&
    currentUser.value?.isAdmin
);

const isSuperAdmin = computed(() => currentUser.value?.role === "SuperAdmin");

const isHIM = computed(
  () => currentUser.value?.role === "HealthInformationManager"
);

const isHCP = computed(
  () => currentUser.value?.role === "HealthCareProfessional"
);

const adminHCPProfessionPlural = computed(() => {
  if (isAdminHCP.value && currentUser.value?.profession) {
    const profession = currentUser.value.profession;
    // Handle special cases for plural forms
    if (profession.endsWith("y")) {
      return profession.slice(0, -1) + "ists";
    } else if (profession.endsWith("s")) {
      return profession;
    } else {
      return profession + "s";
    }
  }
  return "";
});

const userTitle = computed(() => {
  if (!currentUser.value) return "";
  if (currentUser.value.role === "SuperAdmin") return "Chief Executive Officer";
  if (currentUser.value.role === "HealthCareProfessional")
    return currentUser.value.profession || "Healthcare Professional";
  if (currentUser.value.role === "HealthInformationManager")
    return "Health Information Manager";
  return currentUser.value.role;
});

onMounted(async () => {
  await fetchCurrentUser();
});

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

const goToAdminSetup = async () => {
  try {
    if (loadingModal.value) {
      loadingModal.value.show();
    }
    await router.push("/admin-setup");
  } catch (error) {
    console.error("Error navigating to Admin Setup:", error);
    toast.error("Failed to navigate to Admin Setup. Please try again.");
  } finally {
    if (loadingModal.value) {
      loadingModal.value.hide();
    }
  }
};

const goToOrgSetup = async () => {
  try {
    if (loadingModal.value) {
      loadingModal.value.show();
    }
    await router.push("/setup");
  } catch (error) {
    console.error("Error navigating to Organization Setup:", error);
    toast.error("Failed to navigate to Organization Setup. Please try again.");
  } finally {
    if (loadingModal.value) {
      loadingModal.value.hide();
    }
  }
};

const goToRegisterPatient = async () => {
  try {
    if (loadingModal.value) {
      loadingModal.value.show();
    }
    await router.push("/patient/register");
  } catch (error) {
    console.error("Error navigating to Register Patient:", error);
    toast.error("Failed to navigate to Register Patient. Please try again.");
  } finally {
    if (loadingModal.value) {
      loadingModal.value.hide();
    }
  }
};

const goToAllPatientsHCP = async () => {
  try {
    if (loadingModal.value) {
      loadingModal.value.show();
    }
    await router.push("/hcp/all-patients");
  } catch (error) {
    console.error("Error navigating to All Patients (HCP):", error);
    toast.error("Failed to navigate to All Patients (HCP). Please try again.");
  } finally {
    if (loadingModal.value) {
      loadingModal.value.hide();
    }
  }
};

const goToAllPatientsHIM = async () => {
  try {
    if (loadingModal.value) {
      loadingModal.value.show();
    }
    await router.push("/patients");
  } catch (error) {
    console.error("Error navigating to All Patients (HIM):", error);
    toast.error("Failed to navigate to All Patients (HIM). Please try again.");
  } finally {
    if (loadingModal.value) {
      loadingModal.value.hide();
    }
  }
};

const goToAssignedPatients = async () => {
  try {
    if (loadingModal.value) {
      loadingModal.value.show();
    }
    await router.push("/hcp/assigned-patients");
  } catch (error) {
    console.error("Error navigating to Assigned Patients:", error);
    toast.error("Failed to navigate to Assigned Patients. Please try again.");
  } finally {
    if (loadingModal.value) {
      loadingModal.value.hide();
    }
  }
};

const fetchCurrentUser = async () => {
  try {
    loadingModal.value.show();
    await staffStore.fetchCurrentUser();
  } catch (error) {
    console.error("Error fetching current user:", error);
    toast.error("Failed to fetch user data. Please try again.");
    router.push("/login");
  } finally {
    loadingModal.value.hide();
  }
};

const logout = async () => {
  try {
    loadingModal.value.show();
    removeToken();
    staffStore.clearStaffData();
    router.push("/login");
    toast.success("Logged out successfully");
  } catch (error) {
    console.error("Error during logout:", error);
    toast.error("An error occurred during logout. Please try again.");
  } finally {
    loadingModal.value.hide();
  }
};
</script>
