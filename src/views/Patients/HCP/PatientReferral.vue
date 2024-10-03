<template>
  <div class="min-h-screen px-4 sm:px-6 lg:px-8">
    <BackButton class="pb-4 pr-10" />
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-8 flex items-center">
        <v-icon name="ri-clipboard-line" class="mr-2" scale="1.5" />
        Patient Referral
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

      <!-- Tabs for New Referral and Past Referrals -->
      <div v-if="patientData" class="mb-8">
        <div class="sm:hidden">
          <select
            v-model="activeTab"
            class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <option value="new">New Referral</option>
            <option value="past">Past Referrals</option>
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
                New Referral
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
                Past Referrals
              </a>
            </nav>
          </div>
        </div>
      </div>

      <!-- New Referral Form -->
      <div v-if="activeTab === 'new' && patientData">
        <div
          v-if="referralTemplates.length === 0"
          class="bg-white shadow-lg rounded-lg overflow-hidden p-6"
        >
          <p class="text-lg text-gray-600">
            No referral templates are available for your profession.
          </p>
          <p class="text-md text-gray-500 mt-2">
            Please contact an administrator to create templates before adding
            new referrals.
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
              Select Referral Template
            </h2>
          </div>
          <div class="p-6">
            <div v-if="referralTemplates.length === 0" class="text-center">
              <p class="text-lg text-gray-600">
                No referral templates available for your profession.
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
                v-for="template in referralTemplates"
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

        <!-- Referral Form -->
        <div
          v-if="activeTab === 'new' && selectedTemplate"
          class="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div
            class="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex justify-between items-center"
          >
            <h2 class="text-2xl font-bold flex items-center">
              <v-icon name="ri-edit-line" class="mr-2" />
              {{ selectedTemplate.name }}
            </h2>
            <button
              @click="resetTemplateSelection"
              class="text-white hover:text-indigo-200 transition duration-300 ease-in-out"
            >
              <v-icon name="ri-arrow-left-line" class="mr-1" />
              Back to Templates
            </button>
          </div>
          <div class="p-6">
            <form @submit.prevent="submitReferral" class="space-y-8">
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

                  <template v-if="field.isImage">
                    <div class="flex items-center space-x-4">
                      <input
                        type="file"
                        :id="`${sectionName}_${fieldKey}`"
                        @change="
                          handleImageUpload($event, sectionName, fieldKey)
                        "
                        accept=".jpg,.jpeg,.png,.gif,.webp"
                        class="hidden"
                      />
                      <label
                        :for="`${sectionName}_${fieldKey}`"
                        class="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition duration-300"
                      >
                        Select Image
                      </label>
                      <span
                        v-if="referralData[sectionName][fieldKey]"
                        class="text-sm text-gray-600"
                      >
                        Image selected
                      </span>
                      <button
                        v-if="referralData[sectionName][fieldKey]"
                        @click.prevent="deleteImage(sectionName, fieldKey)"
                        class="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                    <div
                      v-if="referralData[sectionName][fieldKey]"
                      class="mt-2"
                    >
                      <img
                        :src="referralData[sectionName][fieldKey]"
                        alt="Uploaded image"
                        class="max-w-full h-auto rounded-lg shadow-md"
                      />
                    </div>
                  </template>
                  <component
                    v-else
                    :is="getFieldComponent(field.type)"
                    :id="`${sectionName}_${fieldKey}`"
                    :value="referralData[sectionName][fieldKey]"
                    @input="
                      updateReferralData(
                        sectionName,
                        fieldKey,
                        $event.target.value
                      )
                    "
                    @change="
                      updateReferralData(
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
                    <template v-if="field.type === 'Boolean'">
                      <option value="">Select a value</option>
                      <option value="true">True</option>
                      <option value="false">False</option>
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
                    Submit Referral
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Past Referrals -->
      <div v-else-if="activeTab === 'past' && patientData" class="space-y-8">
        <div
          v-if="Object.keys(groupedReferrals).length === 0"
          class="bg-white shadow-lg rounded-lg overflow-hidden p-6"
        >
          <p class="text-lg text-gray-600">
            No past referrals found for this patient.
          </p>
        </div>
        <div v-else>
          <div
            v-for="(referrals, profession) in groupedReferrals"
            :key="profession"
            class="bg-white shadow-lg rounded-lg overflow-hidden mb-4"
          >
            <div
              @click="toggleAccordion(profession)"
              class="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 cursor-pointer flex justify-between items-center"
            >
              <h2 class="text-2xl font-bold text-white">
                {{ profession }} Referrals
              </h2>
              <v-icon
                :name="expandedProfessions[profession] ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'"
                class="text-white text-2xl transition-transform duration-300"
                :class="{ 'transform rotate-180': expandedProfessions[profession] }"
              />
            </div>
            <transition
              name="accordion"
              @enter="startTransition"
              @after-enter="endTransition"
              @before-leave="startTransition"
              @after-leave="endTransition"
            >
              <div v-show="expandedProfessions[profession]" class="overflow-hidden">
                <div class="p-6">
                  <div
                    v-for="(referral, index) in referrals"
                    :key="index"
                    class="mb-6 last:mb-0 bg-white shadow-lg rounded-lg overflow-hidden"
                  >
                    <div class="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                      <h3 class="text-xl font-semibold">
                        {{ referral.template?.name || 'Unnamed Referral' }}
                      </h3>
                      <p class="text-sm text-indigo-100">
                        {{ new Date(referral.createdAt).toLocaleString() }}
                      </p>
                    </div>
                    <div class="p-6">
                      <div
                        v-for="(sectionData, sectionName) in referral.referral_data"
                        :key="sectionName"
                        class="mb-6 last:mb-0"
                      >
                        <h4 class="text-lg font-medium text-gray-800 mb-3 border-b border-gray-200 pb-2">{{ sectionName }}</h4>
                        <div
                          v-for="(value, key) in sectionData"
                          :key="key"
                          class="mb-4 last:mb-0"
                        >
                          <p class="text-sm font-medium text-gray-600 mb-1">{{ key }}:</p>
                          <div v-if="isImageUrl(value)" class="mt-2">
                            <img 
                              :src="value" 
                              :alt="key"
                              class="max-w-full h-auto rounded-lg shadow-md cursor-pointer hover:opacity-90 transition duration-300 ease-in-out"
                              @click="openFullScreenImage(value)"
                            />
                          </div>
                          <p v-else-if="typeof value === 'boolean'" class="text-base text-gray-900 font-semibold">
                            {{ value ? 'True' : 'False' }}
                          </p>
                          <p v-else class="text-base text-gray-900">{{ value }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
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

    <!-- Full-screen image modal -->
    <div
      v-if="fullScreenImage"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    >
      <div class="relative w-full h-full">
        <img
          :src="fullScreenImage"
          alt="Full-screen image"
          class="max-w-full max-h-full m-auto object-contain"
        />
        <button
          @click="closeFullScreenImage"
          class="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
        >
          &times;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { useStaffStore } from "@/stores/staff-management";
import { getTemplatesByProfession } from "@/utils/template";
import { createReferral, getPatient } from "@/utils/patientManagement";
import LoadingModal from "@/components/LoadingModal.vue";
import BackButton from "@/components/BackButton.vue";
import { useFirebase } from "@/utils/useFirebase";

const router = useRouter();
const route = useRoute();
const toast = useToast();
const staffStore = useStaffStore();
const loadingModal = ref(null);

const referralTemplates = ref([]);
const selectedTemplate = ref(null);
const referralData = ref({});
const patientData = ref(null);
const activeTab = ref("new");

const fullScreenImage = ref(null);

const currentUser = computed(() => staffStore.currentUser);

const { uploadImage, deleteImage: deleteFirebaseImage } = useFirebase();

const expandedProfessions = ref({});

const toggleAccordion = (profession) => {
  expandedProfessions.value[profession] = !expandedProfessions.value[profession];
};

const startTransition = (el) => {
  el.style.height = 'auto';
  const height = el.offsetHeight;
  el.style.height = '0px';
  el.offsetHeight; // force reflow
  el.style.height = height + 'px';
};

const endTransition = (el) => {
  el.style.height = '';
};

const updateReferralData = (sectionName, fieldKey, value) => {
  if (selectedTemplate.value.fields[sectionName][fieldKey].type === "Boolean") {
    referralData.value[sectionName][fieldKey] = value === "true";
  } else {
    referralData.value[sectionName][fieldKey] = value;
  }
};

const capitalizeWord = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const groupedReferrals = computed(() => {
  if (
    !patientData.value ||
    !patientData.value.referrals ||
    patientData.value.referrals.length === 0
  )
    return {};
  return patientData.value.referrals.reduce((acc, referral) => {
    const profession = referral.template?.profession || "Unknown";
    if (!acc[profession]) acc[profession] = [];
    acc[profession].push(referral);
    return acc;
  }, {});
});

onMounted(async () => {
  if (!currentUser.value) {
    await fetchCurrentUser();
  }
  await fetchReferralTemplates();
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

const fetchReferralTemplates = async () => {
  try {
    loadingModal.value.show();
    const response = await getTemplatesByProfession(
      'referral',
      currentUser.value.profession
    );
    referralTemplates.value = response.data.referralTemplates;
  } catch (error) {
    console.error("Error fetching referral templates:", error);
    if (error.response && error.response.status === 404) {
      toast.warning(
        "No referral templates found for your profession. Please contact an administrator."
      );
      referralTemplates.value = [];
    } else {
      toast.error("Failed to fetch referral templates. Please try again.");
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
  referralData.value = Object.keys(template.fields).reduce(
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
  console.log("Initial Referral Data:", referralData.value); // For debugging
};

const resetForm = () => {
  if (selectedTemplate.value) {
    referralData.value = Object.keys(selectedTemplate.value.fields).reduce(
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

const handleImageUpload = async (event, sectionName, fieldKey) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    toast.error("File size exceeds 5MB limit");
    return;
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    toast.error(
      "Invalid file type. Please upload a JPG, JPEG, PNG, GIF, or WEBP file."
    );
    return;
  }

  loadingModal.value.show();
  try {
    const downloadURL = await uploadImage(file, "Referrals");
    if (downloadURL) {
      updateReferralData(sectionName, fieldKey, downloadURL);
      console.log("Image uploaded successfully:", downloadURL);
    } else {
      throw new Error("Failed to get download URL");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    toast.error("Failed to upload image. Please try again.");
  } finally {
    loadingModal.value.hide();
  }
};

const deleteImage = async (sectionName, fieldKey) => {
  const imageUrl = referralData.value[sectionName][fieldKey];
  if (!imageUrl) return;

  loadingModal.value.show();
  try {
    await deleteFirebaseImage(imageUrl);
    updateReferralData(sectionName, fieldKey, "");
    toast.success("Image deleted successfully");
  } catch (error) {
    console.error("Error deleting image:", error);
    toast.error("Failed to delete image. Please try again.");
  } finally {
    loadingModal.value.hide();
  }
};

const submitReferral = async () => {
  try {
    loadingModal.value.show();

    if (!selectedTemplate.value || !patientData.value) {
      throw new Error("Missing template or patient data");
    }

    const transformedReferralData = Object.entries(
      referralData.value
    ).reduce((acc, [sectionName, sectionData]) => {
      acc[sectionName] = Object.entries(sectionData).reduce(
        (sectionAcc, [fieldKey, value]) => {
          const field = selectedTemplate.value.fields[sectionName][fieldKey];
          if (field) {
            const key = field.label || fieldKey; // Use label if available, otherwise use fieldKey
            sectionAcc[key] = field.isImage ? value : value;
          } else {
            console.warn(
              `Missing field definition for ${fieldKey} in section ${sectionName}`
            );
          }
          return sectionAcc;
        },
        {}
      );
      return acc;
    }, {});

    console.log("Transformed Referral Data:", transformedReferralData);

    const response = await createReferral(
      selectedTemplate.value._id,
      transformedReferralData,
      patientData.value.hospital_record.hospital_id
    );

    if (response.data && response.data.status === "Success") {
      toast.success("Referral submitted successfully!");
      resetForm();
      await fetchPatientData();
      activeTab.value = "past";
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    console.error("Error submitting referral:", error);
    toast.error(`Failed to submit referral: ${error.message}`);
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
      return "select";
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
      return {};
    case "Array":
      return {};
    default:
      return { type: "text" };
  }
};

const isImageUrl = (value) => {
  return (
    typeof value === "string" &&
    value.match(/^https?:\/\/.*\.(jpeg|jpg|gif|png|webp)(\?.*)?$/i)
  );
};

const openFullScreenImage = (imageUrl) => {
  fullScreenImage.value = imageUrl;
};

const closeFullScreenImage = () => {
  fullScreenImage.value = null;
};

const resetTemplateSelection = () => {
  selectedTemplate.value = null;
  referralData.value = {};
};
</script>

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

.fixed {
  position: fixed;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.z-50 {
  z-index: 50;
}

.object-contain {
  object-fit: contain;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: height 0.3s ease-out;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  height: 0;
}
</style>