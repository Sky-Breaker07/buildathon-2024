<template>
  <div class="min-h-screen px-4 sm:px-6 lg:px-8">
    <BackButton class="pb-4 pr-10" />
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-8 flex items-center">
        <v-icon name="ri-clipboard-line" class="mr-2" scale="1.5" />
        Patient Assessment
      </h1>

      <!-- Patient Information Card -->
      <div
        v-if="patientData"
        class="bg-white shadow-lg rounded-lg overflow-hidden mb-8"
      >
        <div class="px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600">
          <h2 class="text-2xl font-bold text-white flex items-center">
            <v-icon name="ri-user-follow-line" class="mr-2" />
            Patient Information
          </h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm font-medium text-gray-500">Name</p>
              <p class="text-lg font-semibold text-gray-900">
                {{ patientData.biodata.name }}
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Hospital ID</p>
              <p class="text-lg font-semibold text-gray-900">
                {{ patientData.hospital_record.hospital_id }}
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Age</p>
              <p class="text-lg font-semibold text-gray-900">
                {{ patientData.biodata.age }} years
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Sex</p>
              <p class="text-lg font-semibold text-gray-900">
                {{ capitalizeWord(patientData.biodata.sex) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="bg-white shadow-lg rounded-lg overflow-hidden mb-8 p-6"
      >
        <p class="text-lg text-gray-600">Loading patient information...</p>
      </div>

      <!-- Tabs for New Assessment and Past Assessments -->
      <div v-if="patientData" class="mb-8">
        <div class="sm:hidden">
          <select
            v-model="activeTab"
            class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <option value="new">New Assessment</option>
            <option value="past">Past Assessments</option>
          </select>
        </div>
        <div class="hidden sm:block">
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8" aria-label="Tabs">
              <a
                href="#"
                @click.prevent="activeTab = 'new'"
                :class="[
                  activeTab === 'new'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                ]"
              >
                New Assessment
              </a>
              <a
                href="#"
                @click.prevent="activeTab = 'past'"
                :class="[
                  activeTab === 'past'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                ]"
              >
                Past Assessments
              </a>
            </nav>
          </div>
        </div>
      </div>

      <!-- New Assessment Form -->
      <div v-if="activeTab === 'new' && patientData">
        <div
          v-if="assessmentTemplates.length === 0"
          class="bg-white shadow-lg rounded-lg overflow-hidden p-6"
        >
          <p class="text-lg text-gray-600">
            No assessment templates are available for your profession.
          </p>
          <p class="text-md text-gray-500 mt-2">
            Please contact an administrator to create templates before adding
            new assessments.
          </p>
        </div>
        <!-- Template Selection -->
        <div
          v-if="!selectedTemplate"
          class="bg-white shadow-lg rounded-lg overflow-hidden mb-8"
        >
          <div class="px-6 py-4 bg-gradient-to-r from-green-500 to-teal-600">
            <h2 class="text-2xl font-bold text-white flex items-center">
              <v-icon name="ri-file-text-line" class="mr-2" />
              Select Assessment Template
            </h2>
          </div>
          <div class="p-6">
            <div v-if="assessmentTemplates.length === 0" class="text-center">
              <p class="text-lg text-gray-600">
                No assessment templates available for your profession.
              </p>
              <p class="text-md text-gray-500 mt-2">
                Please contact an administrator to create templates.
              </p>
            </div>
            <div
              v-else
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <div
                v-for="template in assessmentTemplates"
                :key="template._id"
                class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out p-4 cursor-pointer"
                @click="selectTemplate(template)"
              >
                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                  {{ template.name }}
                </h3>
                <p class="text-sm text-gray-600 mb-4">
                  {{ template.description }}
                </p>
                <p class="text-xs text-gray-500">
                  Fields: {{ countFields(template.fields) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Assessment Form -->
        <div
          v-if="activeTab === 'new' && selectedTemplate"
          class="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div
            class="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
          >
            <h2 class="text-2xl font-bold flex items-center">
              <v-icon name="ri-edit-line" class="mr-2" />
              {{ selectedTemplate.name }}
            </h2>
            <p class="mt-2 text-indigo-100">
              {{ selectedTemplate.description }}
            </p>
          </div>
          <div class="p-6">
            <form @submit.prevent="submitAssessment" class="space-y-8">
              <div
                v-for="(sectionFields, sectionName) in selectedTemplate.fields"
                :key="sectionName"
                class="space-y-6"
              >
                <h3 class="text-xl font-semibold text-gray-800">
                  {{ sectionName }}
                </h3>
                <div
                  v-for="(field, fieldKey) in sectionFields"
                  :key="fieldKey"
                  class="space-y-2"
                >
                  <label
                    :for="`${sectionName}_${fieldKey}`"
                    class="block text-sm font-medium text-gray-700 uppercase tracking-wide"
                  >
                    {{ field.label }}
                    <span v-if="field.required" class="text-red-500">*</span>
                  </label>

                  <component
                    :is="getFieldComponent(field.type)"
                    :id="`${sectionName}_${fieldKey}`"
                    :value="assessmentData[sectionName][fieldKey]"
                    @input="
                      updateAssessmentData(
                        sectionName,
                        fieldKey,
                        $event.target.value
                      )
                    "
                    :required="field.required"
                    :placeholder="field.placeholder"
                    v-bind="getFieldAttributes(field.type)"
                    class="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                  >
                    <template v-if="field.type === 'Array'">
                      <option value="">Select an option</option>
                      <option
                        v-for="option in field.options"
                        :key="option"
                        :value="option"
                      >
                        {{ option }}
                      </option>
                    </template>
                  </component>
                </div>
              </div>

              <div class="pt-6 border-t border-gray-200">
                <div class="flex justify-end space-x-3">
                  <button
                    type="button"
                    @click="resetForm"
                    class="px-6 py-3 bg-white text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                  >
                    Submit Assessment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Past Assessments -->
      <div v-else-if="activeTab === 'past' && patientData" class="space-y-8">
        <div
          v-if="Object.keys(groupedAssessments).length === 0"
          class="bg-white shadow-lg rounded-lg overflow-hidden p-6"
        >
          <p class="text-lg text-gray-600">
            No past assessments found for this patient.
          </p>
        </div>
        <div
          v-else
          v-for="(assessments, profession) in groupedAssessments"
          :key="profession"
          class="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div class="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600">
            <h2 class="text-2xl font-bold text-white">
              {{ profession }} Assessments
            </h2>
          </div>
          <div class="p-6">
            <div
              v-for="(assessment, index) in assessments"
              :key="index"
              class="mb-6 last:mb-0"
            >
              <div class="flex justify-between items-center mb-2">
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ assessment.template.name }}
                </h3>
                <p class="text-sm text-gray-500">
                  {{ new Date(assessment.createdAt).toLocaleString() }}
                </p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <div
                  v-for="(
                    sectionData, sectionName
                  ) in assessment.assessment_data"
                  :key="sectionName"
                  class="mb-4"
                >
                  <h4 class="text-md font-medium text-gray-700 mb-2">
                    {{ sectionName }}
                  </h4>
                  <div
                    v-for="(value, key) in sectionData"
                    :key="key"
                    class="ml-4 mb-2"
                  >
                    <p class="text-sm font-medium text-gray-600">{{ key }}:</p>
                    <p class="text-sm text-gray-900">
                      {{ value }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div
        v-if="!patientData"
        class="bg-white shadow-lg rounded-lg overflow-hidden p-6"
      >
        <p class="text-lg text-gray-600 flex items-center">
          <v-icon name="ri-loader-4-line" class="mr-2 animate-spin" />
          Loading patient data...
        </p>
      </div>
    </div>
    <LoadingModal ref="loadingModal" />
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Apply Poppins font to all text */
* {
  font-family: "Poppins", sans-serif;
}

/* Custom styles for form elements */
input[type="text"],
input[type="number"],
input[type="date"],
textarea,
select {
  transition: all 0.3s ease;
}

input[type="text"]:focus,
input[type="number"]:focus,
input[type="date"]:focus,
textarea:focus,
select:focus {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Custom checkbox styles */
input[type="checkbox"] {
  position: relative;
  cursor: pointer;
}

input[type="checkbox"]:before {
  content: "";
  display: block;
  position: absolute;
  width: 20px;
  height: 20px;
  top: -2px;
  left: -2px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  background-color: white;
}

input[type="checkbox"]:checked:before {
  background-color: #4f46e5;
  border-color: #4f46e5;
}

input[type="checkbox"]:checked:after {
  content: "";
  display: block;
  position: absolute;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  top: 2px;
  left: 7px;
}
</style>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { useStaffStore } from "@/stores/staff-management";
import { getAssessmentTemplatesByProfession } from "@/utils/assessmentTemplate";
import { createAssessment, getPatient } from "@/utils/patientManagement";
import LoadingModal from "@/components/LoadingModal.vue";
import BackButton from "@/components/BackButton.vue";

const router = useRouter();
const route = useRoute();
const toast = useToast();
const staffStore = useStaffStore();
const loadingModal = ref(null);

const assessmentTemplates = ref([]);
const selectedTemplate = ref(null);
const assessmentData = ref({});
const patientData = ref(null);
const activeTab = ref("new");

const currentUser = computed(() => staffStore.currentUser);

const updateAssessmentData = (sectionName, fieldKey, value) => {
  assessmentData.value[sectionName][fieldKey] = value;
};

const capitalizeWord = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const groupedAssessments = computed(() => {
  if (
    !patientData.value ||
    !patientData.value.assessments ||
    patientData.value.assessments.length === 0
  )
    return {};
  return patientData.value.assessments.reduce((acc, assessment) => {
    const profession = assessment.template?.profession || "Unknown";
    if (!acc[profession]) acc[profession] = [];
    acc[profession].push(assessment);
    return acc;
  }, {});
});

onMounted(async () => {
  if (!currentUser.value) {
    await fetchCurrentUser();
  }
  await fetchAssessmentTemplates();
  await fetchPatientData();
});

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

const fetchAssessmentTemplates = async () => {
  try {
    loadingModal.value.show();
    const response = await getAssessmentTemplatesByProfession(
      currentUser.value.profession
    );
    assessmentTemplates.value = response.data.assessmentTemplates;
  } catch (error) {
    console.error("Error fetching assessment templates:", error);
    if (error.response && error.response.status === 404) {
      toast.warning(
        "No assessment templates found for your profession. Please contact an administrator."
      );
      assessmentTemplates.value = [];
    } else {
      toast.error("Failed to fetch assessment templates. Please try again.");
    }
  } finally {
    loadingModal.value.hide();
  }
};

const fetchPatientData = async () => {
  try {
    loadingModal.value.show();
    const hospitalId = route.params.hospital_id;
    const response = await getPatient(hospitalId);
    if (
      response.data &&
      response.data.status === "Success" &&
      response.data.data
    ) {
      patientData.value = response.data.data;
      console.log("Fetched patient data:", patientData.value); // For debugging
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    console.error("Error fetching patient data:", error);
    toast.error("Failed to fetch patient data. Please try again.");
    patientData.value = null; // Ensure patientData is null on error
  } finally {
    loadingModal.value.hide();
  }
};

const countFields = (fields) => {
  return Object.values(fields).reduce(
    (count, section) => count + Object.keys(section).length,
    0
  );
};

const selectTemplate = (template) => {
  selectedTemplate.value = template;
  assessmentData.value = Object.keys(template.fields).reduce(
    (acc, sectionName) => {
      acc[sectionName] = Object.keys(template.fields[sectionName]).reduce(
        (sectionAcc, fieldKey) => {
          const field = template.fields[sectionName][fieldKey];
          sectionAcc[fieldKey] = field.defaultValue || "";
          return sectionAcc;
        },
        {}
      );
      return acc;
    },
    {}
  );
  console.log("Initial Assessment Data:", assessmentData.value); // For debugging
};

const resetForm = () => {
  if (selectedTemplate.value) {
    assessmentData.value = Object.keys(selectedTemplate.value.fields).reduce(
      (acc, sectionName) => {
        acc[sectionName] = Object.keys(
          selectedTemplate.value.fields[sectionName]
        ).reduce((sectionAcc, fieldKey) => {
          sectionAcc[fieldKey] =
            selectedTemplate.value.fields[sectionName][fieldKey].defaultValue ||
            "";
          return sectionAcc;
        }, {});
        return acc;
      },
      {}
    );
  }
};

const submitAssessment = async () => {
  try {
    loadingModal.value.show();

    if (!selectedTemplate.value || !patientData.value) {
      throw new Error("Missing template or patient data");
    }

    // Transform the assessmentData to use labels instead of field keys
    const transformedAssessmentData = Object.entries(
      assessmentData.value
    ).reduce((acc, [sectionName, sectionData]) => {
      acc[sectionName] = Object.entries(sectionData).reduce(
        (sectionAcc, [fieldKey, value]) => {
          const field = selectedTemplate.value.fields[sectionName][fieldKey];
          if (field && field.label) {
            sectionAcc[field.label] = value;
          } else {
            console.warn(
              `Missing label for field ${fieldKey} in section ${sectionName}`
            );
          }
          return sectionAcc;
        },
        {}
      );
      return acc;
    }, {});

    console.log("Transformed Assessment Data:", transformedAssessmentData); // For debugging

    const response = await createAssessment(
      selectedTemplate.value._id,
      transformedAssessmentData,
      patientData.value.hospital_record.hospital_id
    );

    if (response.data && response.data.status === "Success") {
      toast.success("Assessment submitted successfully!");
      resetForm();
      await fetchPatientData(); // Refresh patient data to include the new assessment
      activeTab.value = "past"; // Switch to past assessments tab
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    console.error("Error submitting assessment:", error);
    toast.error(`Failed to submit assessment: ${error.message}`);
  } finally {
    loadingModal.value.hide();
  }
};

const getFieldComponent = (type) => {
  switch (type) {
    case "String":
    case "Number":
    case "Date":
      return "input";
    case "Boolean":
      return "input";
    case "Array":
      return "select";
    default:
      return "input";
  }
};

const getFieldAttributes = (type) => {
  switch (type) {
    case "String":
      return { type: "text" };
    case "Number":
      return { type: "number" };
    case "Date":
      return { type: "date" };
    case "Boolean":
      return { type: "checkbox" };
    case "Array":
      return {}; // No type attribute for select
    default:
      return { type: "text" };
  }
};
</script>
