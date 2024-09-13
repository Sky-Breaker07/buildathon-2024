<template>
  <div class="p-8 max-w-6xl mx-auto bg-gray-100 min-h-screen">
    <h1 class="text-4xl font-bold mb-6 text-center text-indigo-800">
      Patient Profile
    </h1>
    <div v-if="isLoading" class="text-center">
      <div
        class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500 mx-auto"
      ></div>
      <p class="mt-4 text-xl text-indigo-800">Loading patient details...</p>
    </div>
    <div v-else-if="patient" class="space-y-8">
      <!-- Biodata Section -->
      <section
        class="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-3xl font-semibold text-indigo-800">Biodata</h2>
          <button
            @click="toggleEditMode"
            class="bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-600 transform hover:scale-110 transition-all duration-300"
          >
            {{ isEditing ? "Cancel" : "Edit" }}
          </button>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div
            v-for="(value, key) in filteredBiodata"
            :key="key"
            class="flex flex-col"
          >
            <span class="font-semibold capitalize text-indigo-600">{{
              formatKey(key)
            }}</span>
            <span v-if="!isEditing" class="text-gray-800">{{
              formatValue(key, value)
            }}</span>
            <input
              v-else
              v-model="editedBiodata[key]"
              :type="getInputType(key)"
              class="border-2 rounded p-2 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 border-indigo-500"
            />
          </div>
          <!-- Registration Date (non-editable) -->
          <div class="flex flex-col">
            <span class="font-semibold capitalize text-indigo-600"
              >Registration Date</span
            >
            <span class="text-gray-800">{{ registrationDate }}</span>
          </div>
        </div>
        <div v-if="isEditing" class="mt-4 flex justify-end space-x-4">
          <button
            @click="updateBiodata"
            class="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transform hover:scale-110 transition-all duration-300"
          >
            Save Changes
          </button>
          <button
            @click="cancelEdit"
            class="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transform hover:scale-110 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </section>

      <!-- Hospital Record Section -->
      <section
        class="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-3xl font-semibold text-indigo-800">Hospital Record</h2>
          <button
            @click="toggleEditHospitalRecord"
            class="bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-600 transform hover:scale-110 transition-all duration-300"
          >
            {{ isEditingHospitalRecord ? "Cancel" : "Edit" }}
          </button>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div class="flex flex-col">
            <span class="font-semibold text-indigo-600">Hospital ID</span>
            <span class="text-2xl text-gray-800">{{
              patient.hospital_record.hospital_id
            }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-semibold text-indigo-600">Mortality Status</span>
            <span
              :class="
                patient.hospital_record.mortality.status
                  ? 'text-red-600'
                  : 'text-green-600'
              "
              class="text-2xl font-bold"
            >
              {{
                patient.hospital_record.mortality.status ? "Deceased" : "Alive"
              }}
            </span>
          </div>
          <div
            v-if="patient.hospital_record.mortality.status"
            class="flex flex-col"
          >
            <span class="font-semibold text-indigo-600">Date of Death</span>
            <span class="text-gray-800">{{
              formatDate(patient.hospital_record.mortality.date)
            }}</span>
          </div>
          <div
            v-if="patient.hospital_record.mortality.status"
            class="flex flex-col"
          >
            <span class="font-semibold text-indigo-600">Cause of Death</span>
            <span class="text-gray-800">{{
              patient.hospital_record.mortality.cause || "Not specified"
            }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-semibold text-indigo-600">Session Count</span>
            <span v-if="!isEditingHospitalRecord" class="text-2xl text-gray-800">
              {{ patient.hospital_record.sessionCount || "N/A" }}
            </span>
            <input
              v-else
              v-model="editedHospitalRecord.sessionCount"
              type="number"
              class="border-2 rounded p-2 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 border-indigo-500"
            />
          </div>
          <div class="flex flex-col">
            <span class="font-semibold text-indigo-600">Night Count</span>
            <span v-if="!isEditingHospitalRecord" class="text-2xl text-gray-800">
              {{ patient.hospital_record.nightCount || "N/A" }}
            </span>
            <input
              v-else
              v-model="editedHospitalRecord.nightCount"
              type="number"
              class="border-2 rounded p-2 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 border-indigo-500"
            />
          </div>
        </div>
        <div v-if="isEditingHospitalRecord" class="mt-4 flex justify-end space-x-4">
          <button
            @click="updateHospitalRecord"
            class="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transform hover:scale-110 transition-all duration-300"
          >
            Save Changes
          </button>
          <button
            @click="cancelEditHospitalRecord"
            class="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transform hover:scale-110 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </section>

      <!-- Appointments Section -->
      <section
        class="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300"
      >
        <h2 class="text-3xl font-semibold mb-4 text-indigo-800">
          Appointments
        </h2>
        <div
          v-if="patient.hospital_record.appointments.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div
            v-for="appointment in patient.hospital_record.appointments"
            :key="appointment._id"
            class="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            :class="getAppointmentStatusClass(appointment.status)"
          >
            <div class="flex justify-between items-center mb-2">
              <span class="font-semibold text-lg">{{
                formatDate(appointment.date)
              }}</span>
              <span
                class="px-2 py-1 rounded text-sm font-semibold"
                :class="getAppointmentStatusTextClass(appointment.status)"
              >
                {{ appointment.status }}
              </span>
            </div>
            <div class="text-gray-600">{{ appointment.time }}</div>
          </div>
        </div>
        <p v-else class="text-gray-500 text-center text-lg">
          No appointments scheduled.
        </p>
      </section>

      <!-- Vital Signs Section -->
      <section
        class="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300"
      >
        <h2 class="text-3xl font-semibold mb-4 text-indigo-800">Vital Signs</h2>
        <div v-if="patient.vital_signs.length > 0" class="space-y-6">
          <div
            v-for="(vitalSign, index) in patient.vital_signs"
            :key="index"
            class="border-b pb-4"
          >
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div class="flex flex-col items-center">
                <span class="font-semibold text-indigo-600"
                  >Blood Pressure</span
                >
                <span class="text-2xl text-gray-800"
                  >{{ vitalSign.blood_pressure.systemicBP }}/{{
                    vitalSign.blood_pressure.diastolicBP
                  }}
                  mmHg</span
                >
              </div>
              <div class="flex flex-col items-center">
                <span class="font-semibold text-indigo-600">Pulse Rate</span>
                <span class="text-2xl text-gray-800"
                  >{{ vitalSign.pulse_rate }} bpm</span
                >
              </div>
              <div class="flex flex-col items-center">
                <span class="font-semibold text-indigo-600"
                  >Respiratory Rate</span
                >
                <span class="text-2xl text-gray-800"
                  >{{ vitalSign.respiratory_rate }} breaths/min</span
                >
              </div>
              <div class="flex flex-col items-center">
                <span class="font-semibold text-indigo-600">Temperature</span>
                <span class="text-2xl text-gray-800"
                  >{{ vitalSign.temperature }}°C</span
                >
              </div>
              <div class="flex flex-col items-center">
                <span class="font-semibold text-indigo-600">SpO2</span>
                <span class="text-2xl text-gray-800"
                  >{{ vitalSign.spo2 }}%</span
                >
              </div>
            </div>
            <div class="mt-2 text-sm text-gray-500 text-right">
              Recorded on: {{ formatDate(vitalSign.createdAt) }}
            </div>
          </div>
        </div>
        <p v-else class="text-gray-500 text-center text-lg">
          No vital signs recorded.
        </p>
      </section>

      <!-- Assessments, Treatments, Discharges, and Evaluations Sections -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <template
          v-for="(section, index) in [
            'assessments',
            'treatments',
            'discharges',
            'evaluations',
          ]"
          :key="index"
        >
          <section
            class="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300"
          >
            <h2 class="text-3xl font-semibold mb-4 text-indigo-800 capitalize">
              {{ section }}
            </h2>
            <div v-if="patient[section].length > 0" class="space-y-4">
              <div
                v-for="item in patient[section]"
                :key="item._id"
                class="border-b pb-4"
              >
                <h3 class="text-xl font-semibold mb-2 text-indigo-600">
                  {{ item.template.name }}
                </h3>
                <div
                  v-for="(value, key) in item[`${section.slice(0, -1)}_data`]"
                  :key="key"
                  class="mb-2"
                >
                  <span class="font-semibold capitalize text-gray-600"
                    >{{ formatKey(key) }}:</span
                  >
                  <span class="text-gray-800">{{ value }}</span>
                </div>
                <div class="mt-2 text-sm text-gray-500 text-right">
                  {{ capitalizeFirstLetter(section.slice(0, -1)) }} on:
                  {{ formatDate(item.createdAt) }}
                </div>
              </div>
            </div>
            <p v-else class="text-gray-500 text-center text-lg">
              No {{ section }} recorded.
            </p>
          </section>
        </template>
      </div>

      <!-- Transfer Patient Section -->
      <section
        class="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300"
      >
        <h2 class="text-3xl font-semibold mb-4 text-indigo-800">
          Transfer Patient
        </h2>
        <div class="space-y-4">
          <div>
            <label
              for="profession"
              class="block text-sm font-medium text-gray-700"
              >Select Profession</label
            >
            <select
              id="profession"
              v-model="selectedProfession"
              @change="loadAdminHCPs"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select a profession</option>
              <option
                v-for="profession in uniqueProfessions"
                :key="profession"
                :value="profession"
              >
                {{ profession }}
              </option>
            </select>
          </div>
          <div v-if="selectedProfession">
            <label for="admin" class="block text-sm font-medium text-gray-700"
              >Select Admin</label
            >
            <select
              id="admin"
              v-model="selectedAdmin"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select an admin</option>
              <option
                v-for="admin in filteredAdminHCPs"
                :key="admin.staff_id"
                :value="admin.staff_id"
              >
                {{ admin.name }}
              </option>
            </select>
          </div>
          <button
            @click="transferPatient"
            :disabled="!selectedAdmin"
            class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Transfer Patient
          </button>
        </div>
      </section>
    </div>
    <div v-else class="text-center text-red-500 text-xl">
      Failed to load patient details. Please try again.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import { useRoute } from "vue-router";
import {
  getPatient,
  updatePatientInfo,
  transferPatient as transferPatientAPI,
} from "@/utils/patientManagement";
import { usePatientStore } from "@/stores/patient-management";
import { useToast } from "vue-toastification";
import { getAdminHCPs } from "@/utils/staffManagement";
import { getToken } from "@/utils/tokenUtils";
import { updateSessionCount, updateNightCount } from "@/utils/patientManagement";

const route = useRoute();
const patientStore = usePatientStore();
const toast = useToast();

const patient = ref(null);
const isLoading = ref(true);
const isEditing = ref(false);
const editedBiodata = ref({});

const isEditingHospitalRecord = ref(false);
const editedHospitalRecord = reactive({
  sessionCount: null,
  nightCount: null,
});

const adminHCPs = ref([]);
const selectedProfession = ref("");
const selectedAdmin = ref("");

const fetchPatientDetails = async () => {
  isLoading.value = true;
  try {
    const response = await getPatient(route.params.hospital_id);
    if (response.data && response.data.status === "Success") {
      patient.value = response.data.data;
      patientStore.setCurrentPatient(patient.value);
    } else {
      console.error("Unexpected response format:", response);
    }
  } catch (error) {
    console.error("Error fetching patient details:", error);
  } finally {
    isLoading.value = false;
  }
};

const toggleEditMode = () => {
  if (!isEditing.value) {
    editedBiodata.value = { ...filteredBiodata.value };
  }
  isEditing.value = !isEditing.value;
};

const cancelEdit = () => {
  isEditing.value = false;
  editedBiodata.value = {};
};

const updateBiodata = async () => {
  try {
    const response = await updatePatientInfo({
      hospital_id: patient.value.hospital_record.hospital_id,
      biodata: editedBiodata.value,
    });
    if (response.data && response.data.status === "Success") {
      toast.success("Patient biodata updated successfully");
      // Check if the response contains the updated biodata
      if (
        response.data.data &&
        response.data.data.patient &&
        response.data.data.patient.biodata
      ) {
        patient.value.biodata = {
          ...patient.value.biodata,
          ...response.data.data.patient.biodata,
        };
      } else {
        // If the server doesn't return the updated data, use the locally edited data
        patient.value.biodata = {
          ...patient.value.biodata,
          ...editedBiodata.value,
        };
      }
      patientStore.setCurrentPatient(patient.value);
      isEditing.value = false;
      editedBiodata.value = {};
    } else {
      console.error("Unexpected response format:", response);
    }
  } catch (error) {
    console.error("Error updating patient biodata:", error);
    toast.error("Error updating patient biodata");
  }
};

const toggleEditHospitalRecord = () => {
  if (!isEditingHospitalRecord.value) {
    editedHospitalRecord.sessionCount = patient.value.hospital_record.sessionCount;
    editedHospitalRecord.nightCount = patient.value.hospital_record.nightCount;
  }
  isEditingHospitalRecord.value = !isEditingHospitalRecord.value;
};

const cancelEditHospitalRecord = () => {
  isEditingHospitalRecord.value = false;
  editedHospitalRecord.sessionCount = null;
  editedHospitalRecord.nightCount = null;
};

const updateHospitalRecord = async () => {
  try {
    const hospitalId = patient.value.hospital_record.hospital_id;
    let updatedSuccessfully = true;

    if (editedHospitalRecord.nightCount !== patient.value.hospital_record.nightCount) {
      const nightCountResponse = await updateNightCount(hospitalId, editedHospitalRecord.nightCount);
      if (nightCountResponse.data && nightCountResponse.data.status === "Success") {
        patient.value.hospital_record.nightCount = editedHospitalRecord.nightCount;
      } else {
        updatedSuccessfully = false;
        console.error("Failed to update night count:", nightCountResponse);
      }
    }

    if (editedHospitalRecord.sessionCount !== patient.value.hospital_record.sessionCount) {
      const sessionCountResponse = await updateSessionCount(hospitalId, editedHospitalRecord.sessionCount);
      if (sessionCountResponse.data && sessionCountResponse.data.status === "Success") {
        patient.value.hospital_record.sessionCount = editedHospitalRecord.sessionCount;
      } else {
        updatedSuccessfully = false;
        console.error("Failed to update session count:", sessionCountResponse);
      }
    }

    if (updatedSuccessfully) {
      toast.success("Hospital record updated successfully");
      patientStore.setCurrentPatient(patient.value);
      isEditingHospitalRecord.value = false;
    } else {
      toast.error("Failed to update some hospital record fields");
    }
  } catch (error) {
    console.error("Error updating hospital record:", error);
    toast.error("Error updating hospital record");
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatKey = (key) => {
  return key.replace(/_/g, " ");
};

const formatValue = (key, value) => {
  if (key === "createdAt" || key === "updatedAt") {
    return formatDate(value);
  }
  return value;
};

const getInputType = (key) => {
  if (key === "age") return "number";
  if (key === "createdAt" || key === "updatedAt") return "date";
  return "text";
};

const getAppointmentStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "scheduled":
      return "bg-blue-100 border-blue-300";
    case "completed":
      return "bg-green-100 border-green-300";
    case "cancelled":
      return "bg-red-100 border-red-300";
    default:
      return "bg-gray-100 border-gray-300";
  }
};

const getAppointmentStatusTextClass = (status) => {
  switch (status.toLowerCase()) {
    case "scheduled":
      return "bg-blue-200 text-blue-800";
    case "completed":
      return "bg-green-200 text-green-800";
    case "cancelled":
      return "bg-red-200 text-red-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const filteredBiodata = computed(() => {
  if (!patient.value || !patient.value.biodata) return {};
  // eslint-disable-next-line no-unused-vars
  const { _id, __v, createdAt, updatedAt, ...rest } = patient.value.biodata;
  return rest;
});

const registrationDate = computed(() => {
  if (
    !patient.value ||
    !patient.value.biodata ||
    !patient.value.biodata.createdAt
  )
    return "N/A";
  return formatDate(patient.value.biodata.createdAt);
});

const loadAdminHCPs = async () => {
  try {
    const response = await getAdminHCPs();
    if (response.data && response.data.status === "Success") {
      adminHCPs.value = response.data.data.adminHealthcareProfessionals;
    } else {
      console.error("Unexpected response format:", response);
      toast.error("Failed to load admin healthcare professionals");
    }
  } catch (error) {
    console.error("Error fetching admin healthcare professionals:", error);
    toast.error("Error fetching admin healthcare professionals");
  }
};

const uniqueProfessions = computed(() => {
  return [...new Set(adminHCPs.value.map((admin) => admin.profession))];
});

const filteredAdminHCPs = computed(() => {
  return adminHCPs.value.filter(
    (admin) => admin.profession === selectedProfession.value
  );
});

const transferPatient = async () => {
  if (!selectedAdmin.value || !patient.value) return;

  try {
    const token = getToken();
    if (!token) {
      toast.error("No authentication token found");
      return;
    }
    const response = await transferPatientAPI(
      patient.value.hospital_record.hospital_id,
      selectedAdmin.value,
      token
    );
    if (response.data && response.data.status === "Success") {
      toast.success("Patient transferred successfully");
      // Optionally, you can update the patient's data or redirect to another page
    } else {
      console.error("Unexpected response format:", response);
      toast.error("Failed to transfer patient");
    }
  } catch (error) {
    console.error("Error transferring patient:", error);
    toast.error("Error transferring patient");
  }
};

onMounted(() => {
  fetchPatientDetails();
  loadAdminHCPs();
});
</script>
