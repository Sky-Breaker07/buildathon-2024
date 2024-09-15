<template>
  <div v-if="!registrationComplete">
    <RegisterSuperAdmin @registration-complete="handleRegistrationComplete" />
  </div>
  <div v-else class="text-center">
    <h2
      class="font-inter mt-6 mb-4 text-center text-3xl font-extrabold text-clrBlack"
    >
      Registration Successful
    </h2>
    <p class="mt-2 font-poppins text-sm text-gray-600">Your Staff ID is:</p>
    <div class="mt-2 flex items-center justify-center">
      <input
        ref="staffIdInput"
        :value="staffId"
        readonly
        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-50"
      />
      <button
        @click="copyStaffId"
        class="ml-2 inline-flex items-center gap-2 px-3 py-2 border border-transparent text-sm leading-4 font-medium font-poppins rounded-md text-clrWhite bg-clrBlue transition duration-500 ease outline-none hover:bg-indigo-700"
      >
        <i class="bx bx-copy"></i>
        Copy
      </button>
    </div>
    <button
      @click="goToLogin"
      class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md font-poppins rounded-md text-clrWhite bg-clrBlue transition duration-500 ease outline-0 hover:bg-indigo-700"
    >
      Continue to Login
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import RegisterSuperAdmin from "../components/RegisterSuperAdmin.vue";
import { checkSuperAdminExists } from "../utils/staffManagement";

const router = useRouter();
const registrationComplete = ref(false);
const staffId = ref("");
const staffIdInput = ref(null);

onMounted(async () => {
  try {
    const superAdminExists = await checkSuperAdminExists();
    if (superAdminExists) {
      goToLogin();
    }
  } catch (error) {
    console.error("Error checking Super Admin existence:", error);
    // You might want to show an error message to the user here
  }
});

const handleRegistrationComplete = (data) => {
  registrationComplete.value = true;
  staffId.value = data.superAdmin.staff_id;
};

const copyStaffId = async () => {
  try {
    await navigator.clipboard.writeText(staffId.value);
    alert("Staff ID copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

const goToLogin = () => {
  router.push("/login");
};
</script>
