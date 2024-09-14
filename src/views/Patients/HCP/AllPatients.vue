<template>
  <StaffDashBoardHeader />
  <div class="w-[90rem] mx-auto px-[2.175rem] py-8">
    <h1 class="font-poppins text-3xl font-bold mb-6">All Patients</h1>

    <!-- Search and Filter -->
    <div class="mb-6 flex space-x-4">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search patients..."
        class="px-4 py-2 border rounded-md flex-grow outline-none font-poppins"
      />
      <select
        v-model="filterOption"
        class="px-4 py-2 border rounded-md font-poppins outline-none"
      >
        <option value="all">All</option>
        <option value="assigned">Assigned to Me</option>
        <option value="otherHCPs">
          Assigned to Other Health Care Professionals
        </option>
        <option value="received">Received Patients</option>
      </select>
    </div>

    <!-- Patients Assigned to Admin -->
    <div v-if="filteredAssignedToAdmin.length > 0" class="mb-8">
      <h2 class="text-2xl font-poppins font-semibold mb-4">
        Patients Assigned to Me
      </h2>
      <table class="w-full border-collapse font-poppins">
        <thead>
          <tr>
            <th class="text-left p-2 border-y font-semibold text-offWhiteAlt">
              Patient Name
            </th>
            <th class="text-left p-2 border-y font-semibold text-offWhiteAlt">
              Hospital ID
            </th>
            <th class="text-left p-2 border-y font-semibold text-offWhiteAlt">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="patient in filteredAssignedToAdmin"
            :key="patient.hospital_id"
            class="hover:bg-gray-50"
          >
            <td class="py-4 px-2 border-b">{{ patient.name }}</td>
            <td class="py-4 px-2 border-b">
              {{ patient.hospital_id }}
            </td>
            <td class="py-4 px-2 border-b space-x-2">
              <router-link
                :to="`/dashboard/assigned/${patient.hospital_id}`"
                class="bg-clrBlue text-clrWhite transition duration-500 ease-in-out hover:bg-indigo-700 px-4 py-2 rounded-md inline-flex items-center"
              >
                <v-icon name="ri-file-text-line" class="mr-2" />
                Access File
              </router-link>
              <button
                @click="handleUnassignPatient(patient.hospital_id)"
                class="bg-red-500 text-white transition duration-500 ease-in-out hover:bg-red-600 px-4 py-2 rounded-md inline-flex items-center"
              >
                <v-icon name="ri-user-unfollow-line" class="mr-2" />
                Unassign
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Patients Assigned to Other HCPs -->
    <div v-if="filteredAssignedToOtherHCPs.length > 0" class="mt-10 mb-8">
      <h2 class="text-2xl font-poppins font-semibold mb-4">
        Patients Assigned to Other HCPs
      </h2>
      <div
        v-for="hcpGroup in filteredAssignedToOtherHCPs"
        :key="hcpGroup.hcp.staff_id"
        class="mb-4"
      >
        <h3 class="font-poppins text-xl font-medium mb-2">
          {{ hcpGroup.hcp.name }} ({{ hcpGroup.hcp.staff_id }})
        </h3>
        <table class="w-full border-collapse font-poppins">
          <thead>
            <tr>
              <th class="text-left p-2 border-y font-semibold text-offWhiteAlt">
                Patient Name
              </th>
              <th class="text-left p-2 border-y font-semibold text-offWhiteAlt">
                Hospital ID
              </th>
              <th class="text-left p-2 border-y font-semibold text-offWhiteAlt">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="patient in hcpGroup.patients"
              :key="patient.hospital_id"
              class="hover:bg-gray-50"
            >
              <td class="py-4 px-2 border-b">
                {{ patient.name }}
              </td>
              <td class="py-4 px-2 border-b">
                {{ patient.hospital_id }}
              </td>
              <td class="py-4 px-2 border-b space-x-2">
                <router-link
                  :to="`/dashboard/patient/${patient.hospital_id}`"
                  class="bg-clrBlue text-clrWhite transition duration-500 ease-in-out hover:bg-indigo-700 px-4 py-2 rounded-md inline-flex items-center"
                >
                  <v-icon name="ri-file-text-line" class="mr-2" />
                  Access File
                </router-link>
                <button
                  @click="
                    handleUnassignPatient(
                      patient.hospital_id,
                      hcpGroup.hcp.staff_id
                    )
                  "
                  class="bg-red-500 text-white transition duration-500 ease-in-out hover:bg-red-600 px-4 py-2 rounded-md inline-flex items-center"
                >
                  <v-icon name="ri-user-unfollow-line" class="mr-2" />
                  Unassign
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Received Patients -->
    <div v-if="filteredReceivedPatients.length > 0" class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Received Patients</h2>
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th class="text-left p-2 border-y font-semibold text-offWhiteAlt">
              Patient Name
            </th>
            <th class="text-left p-2 border-y font-semibold text-offWhiteAlt">
              Hospital ID
            </th>
            <th class="text-left p-2 border-y font-semibold text-offWhiteAlt">
              Status
            </th>
            <th class="text-left p-2 border-y font-semibold text-offWhiteAlt">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="patient in filteredReceivedPatients"
            :key="patient.hospital_id"
            class="hover:bg-gray-50"
          >
            <td class="py-4 px-2 border-b">{{ patient.name }}</td>
            <td class="py-4 px-2 border-b">
              {{ patient.hospital_id }}
            </td>
            <td class="py-4 px-2 border-b">
              <span :class="getStatusClass(patient.status)">
                {{ patient.status }}
              </span>
            </td>
            <td class="py-4 px-2 border-b space-x-2">
              <router-link
                :to="`/dashboard/patient/${patient.hospital_id}`"
                class="bg-clrBlue text-clrWhite transition duration-500 ease-in-out hover:bg-indigo-700 px-4 py-2 rounded-md inline-flex items-center"
              >
                <v-icon name="ri-file-text-line" class="mr-2" />
                Access File
              </router-link>
              <template v-if="patient.status === 'pending'">
                <button
                  @click="handleAcceptPatient(patient.hospital_id)"
                  class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 inline-flex items-center"
                >
                  <v-icon name="ri-check-line" class="mr-2" />
                  Accept
                </button>
                <button
                  @click="handleRejectPatient(patient.hospital_id)"
                  class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 inline-flex items-center"
                >
                  <v-icon name="ri-close-line" class="mr-2" />
                  Reject
                </button>
              </template>
              <template v-else-if="patient.status === 'accepted'">
                <button
                  @click="handleAssignPatient(patient.hospital_id)"
                  class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-flex items-center"
                >
                  <v-icon name="ri-user-follow-line" class="mr-2" />
                  Assign
                </button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="noResults" class="text-center text-gray-500 mt-8">
      No patients found matching your search or filter criteria.
    </div>
  </div>
  <LoadingModal ref="loadingModal" />

  <!-- Assignment Modal -->
  <div
    v-if="showAssignmentModal"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center"
  >
    <div class="bg-white p-5 rounded-lg shadow-xl w-full max-w-md">
      <h3 class="text-xl font-semibold mb-4">Assign Patient to HCPs</h3>
      <p class="mb-4">
        Assign patient {{ selectedPatient?.name }} ({{
          selectedPatient?.hospital_id
        }}) to:
      </p>
      <div class="max-h-60 overflow-y-auto mb-4">
        <div v-for="hcp in availableHCPs" :key="hcp.staff_id" class="mb-2">
          <label class="flex items-center">
            <input
              type="radio"
              v-model="selectedHCP"
              :value="hcp.staff_id"
              class="mr-2"
            />
            {{ hcp.name }} ({{ hcp.staff_id }})
          </label>
        </div>
      </div>
      <div class="flex justify-end">
        <button
          @click="closeAssignmentModal"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
        >
          Cancel
        </button>
        <button
          @click="confirmAssignment"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Assign
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStaffStore } from "@/stores/staff-management";
import { usePatientStore } from "@/stores/patient-management";
import {
  getAdminJurisdictionPatients,
  acceptPatient,
  rejectPatient,
  assignPatientToHCP,
  unassignPatientFromHCP,
} from "@/utils/patientManagement";
import { getHCPsByProfession } from "@/utils/staffManagement";
import { getToken } from "@/utils/tokenUtils";
import { useToast } from "vue-toastification";
import LoadingModal from "@/components/LoadingModal.vue";
import StaffDashBoardHeader from "@/components/StaffDashBoardHeader.vue";

const router = useRouter();
const staffStore = useStaffStore();
const patientStore = usePatientStore();
const toast = useToast();
const loadingModal = ref(null);

const searchTerm = ref("");
const filterOption = ref("all");
const showAssignmentModal = ref(false);
const selectedPatient = ref(null);
const availableHCPs = ref([]);
const selectedHCP = ref(null);

const fetchPatients = async () => {
  try {
    loadingModal.value.show();
    const token = getToken();
    const response = await getAdminJurisdictionPatients(token);
    console.log(response.data);
    patientStore.setAllPatients(response.data.data);
  } catch (error) {
    console.error("Error fetching patients:", error);
    toast.error("Failed to fetch patients. Please try again.");
  } finally {
    loadingModal.value.hide();
  }
};

const fetchHCPs = async () => {
  try {
    loadingModal.value.show();
    const response = await getHCPsByProfession(
      staffStore.currentUser.profession
    );
    if (
      response?.data?.status === "Success" &&
      Array.isArray(response.data.data.healthcareProfessionals)
    ) {
      availableHCPs.value = response.data.data.healthcareProfessionals.map(
        (hcp) => ({
          staff_id: hcp.staff_id,
          name:
            hcp.name ||
            `${hcp.firstName || ""} ${hcp.lastName || ""}`.trim() ||
            "Unknown Name",
        })
      );
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Error fetching HCPs:", error);
    toast.error("Failed to fetch healthcare professionals. Please try again.");
  } finally {
    loadingModal.value.hide();
  }
};

onMounted(async () => {
  if (!staffStore.currentUser || !staffStore.currentUser.isAdmin) {
    router.push("/dashboard");
    return;
  }
  await fetchPatients();
  await fetchHCPs();
});

const filteredAssignedToAdmin = computed(() => {
  return filterPatients(patientStore.allPatients.assignedToAdmin || []);
});

const filteredAssignedToOtherHCPs = computed(() => {
  return (patientStore.allPatients.assignedToOtherHCPs || [])
    .map((hcpGroup) => ({
      ...hcpGroup,
      patients: filterPatients(hcpGroup.patients),
    }))
    .filter((hcpGroup) => hcpGroup.patients.length > 0);
});

const filteredReceivedPatients = computed(() => {
  const assignedPatientIds = [
    ...filteredAssignedToAdmin.value.map(p => p.hospital_id),
    ...filteredAssignedToOtherHCPs.value.flatMap(group => group.patients.map(p => p.hospital_id))
  ];

  return filterPatients(
    patientStore.allPatients.receivedPatients.filter(p => !assignedPatientIds.includes(p.hospital_id))
  );
});

const noResults = computed(() => {
  return (
    filteredAssignedToAdmin.value.length === 0 &&
    filteredAssignedToOtherHCPs.value.length === 0 &&
    filteredReceivedPatients.value.length === 0
  );
});

const filterPatients = (patientList) => {
  return patientList.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      patient.hospital_id
        .toLowerCase()
        .includes(searchTerm.value.toLowerCase());
    const matchesFilter =
      filterOption.value === "all" ||
      (filterOption.value === "assigned" &&
        (patientList === patientStore.allPatients.assignedToAdmin ||
          patientStore.allPatients.assignedToOtherHCPs.some((group) =>
            group.patients.includes(patient)
          ))) ||
      (filterOption.value === "received" &&
        patientList === patientStore.allPatients.receivedPatients);
    return matchesSearch && matchesFilter;
  });
};

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-200 px-2 py-1 rounded";
    case "accepted":
      return "bg-green-200 px-2 py-1 rounded";
    default:
      return "";
  }
};

const handleAcceptPatient = async (hospitalId) => {
  try {
    loadingModal.value.show();
    const token = getToken();
    await acceptPatient(hospitalId, staffStore.currentUser.staff_id, token);
    patientStore.updatePatientStatus(hospitalId, "accepted");
    toast.success("Patient accepted successfully");
  } catch (error) {
    console.error("Error accepting patient:", error);
    toast.error("Failed to accept patient. Please try again.");
  } finally {
    loadingModal.value.hide();
  }
};

const handleRejectPatient = async (hospitalId) => {
  try {
    loadingModal.value.show();
    const token = getToken();
    await rejectPatient(hospitalId, staffStore.currentUser.staff_id, token);
    patientStore.removePatient(hospitalId);
    toast.success("Patient rejected successfully");
  } catch (error) {
    console.error("Error rejecting patient:", error);
    toast.error("Failed to reject patient. Please try again.");
  } finally {
    loadingModal.value.hide();
  }
};

const handleAssignPatient = (hospitalId) => {
  selectedPatient.value = patientStore.allPatients.receivedPatients.find(
    (p) => p.hospital_id === hospitalId
  );
  showAssignmentModal.value = true;
};

const handleUnassignPatient = async (hospitalId, hcpStaffId = null) => {
  try {
    loadingModal.value.show();
    const token = getToken();
    const staffId = hcpStaffId || staffStore.currentUser.staff_id;
    await unassignPatientFromHCP(hospitalId, staffId, token);
    patientStore.unassignPatient(hospitalId, staffId);
	//reload page
    await fetchPatients();
    toast.success("Patient unassigned successfully");
  } catch (error) {
    console.error("Error unassigning patient:", error);
    toast.error("Failed to unassign patient. Please try again.");
  } finally {
    loadingModal.value.hide();
  }
};

const closeAssignmentModal = () => {
  showAssignmentModal.value = false;
  selectedHCP.value = null;
};

const confirmAssignment = async () => {
  if (!selectedHCP.value) {
    toast.error("Please select an HCP to assign the patient to.");
    return;
  }

  try {
    loadingModal.value.show();
    const token = getToken();

    await assignPatientToHCP(
      selectedPatient.value.hospital_id,
      selectedHCP.value,
      token
    );
    patientStore.assignPatient(selectedPatient.value, selectedHCP.value);

    toast.success("Patient assigned successfully");
    closeAssignmentModal();
    await fetchPatients();
  } catch (error) {
    console.error("Error assigning patient:", error);
    toast.error("Failed to assign patient. Please try again.");
  } finally {
    loadingModal.value.hide();
  }
};
</script>
