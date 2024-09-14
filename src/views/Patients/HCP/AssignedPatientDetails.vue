<template>
	<div class="p-8 max-w-6xl mx-auto min-h-screen font-poppins">
		<BackButton class="pt-2 pb-4" />
		<h1 class="text-4xl font-bold mb-6 text-center text-indigo-800">
			Patient Profile
		</h1>
		<div
			v-if="isLoading"
			class="text-center"
		>
			<div
				class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500 mx-auto"
			></div>
			<p class="mt-4 text-xl text-indigo-800">
				Loading patient details...
			</p>
		</div>
		<div
			v-else-if="patient"
			class="space-y-8"
		>
			<!-- Biodata Section -->
			<section
				class="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300"
			>
				<h2 class="text-3xl font-semibold mb-4 text-indigo-800">
					Biodata
				</h2>
				<div class="grid grid-cols-2 md:grid-cols-3 gap-6">
					<div
						v-for="(value, key) in filteredBiodata"
						:key="key"
						class="flex flex-col"
					>
						<span
							class="font-semibold capitalize text-indigo-600"
							>{{ formatKey(key) }}</span
						>
						<span class="text-gray-800">{{
							formatValue(key, value)
						}}</span>
					</div>
					<!-- Registration Date -->
					<div class="flex flex-col">
						<span class="font-semibold capitalize text-indigo-600"
							>Registration Date</span
						>
						<span class="text-gray-800">{{
							registrationDate
						}}</span>
					</div>
				</div>
			</section>

			<!-- Hospital Record Section -->
			<section
				class="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300"
			>
				<h2 class="text-3xl font-semibold mb-4 text-indigo-800">
					Hospital Record
				</h2>
				<div class="grid grid-cols-2 md:grid-cols-3 gap-6">
					<div class="flex flex-col">
						<span class="font-semibold text-indigo-600"
							>Hospital ID</span
						>
						<span class="text-2xl text-gray-800">{{
							patient.hospital_record.hospital_id
						}}</span>
					</div>
					<div class="flex flex-col">
						<span class="font-semibold text-indigo-600"
							>Mortality Status</span
						>
						<span
							:class="
								patient.hospital_record.mortality.status
									? 'text-red-600'
									: 'text-green-600'
							"
							class="text-2xl font-bold"
						>
							{{
								patient.hospital_record.mortality.status
									? 'Deceased'
									: 'Alive'
							}}
						</span>
					</div>
					<div
						v-if="patient.hospital_record.mortality.status"
						class="flex flex-col"
					>
						<span class="font-semibold text-indigo-600"
							>Date of Death</span
						>
						<span class="text-gray-800">{{
							formatDate(patient.hospital_record.mortality.date)
						}}</span>
					</div>
					<div
						v-if="patient.hospital_record.mortality.status"
						class="flex flex-col"
					>
						<span class="font-semibold text-indigo-600"
							>Cause of Death</span
						>
						<span class="text-gray-800">{{
							patient.hospital_record.mortality.cause ||
							'Not specified'
						}}</span>
					</div>
					<div class="flex flex-col">
						<span class="font-semibold text-indigo-600"
							>Session Count</span
						>
						<span class="text-2xl text-gray-800">{{
							patient.hospital_record.sessionCount || 'N/A'
						}}</span>
					</div>
					<div class="flex flex-col">
						<span class="font-semibold text-indigo-600"
							>Night Count</span
						>
						<span class="text-2xl text-gray-800">{{
							patient.hospital_record.nightCount || 'N/A'
						}}</span>
					</div>
				</div>
			</section>

			<!-- Vital Signs, Assessments, Treatments, Discharges, and Evaluations Sections -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<router-link
					v-for="section in [
						'vitalsigns',
						'assessments',
						'treatments',
						'discharges',
						'evaluations',
						'referrals',
					]"
					:key="section"
					:to="`/dashboard/assigned/${patient.hospital_record.hospital_id}/${section}`"
					class="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
				>
					<h2
						class="text-3xl font-semibold mb-4 text-indigo-800 capitalize"
					>
						{{ section === 'vitalsigns' ? 'Vital Signs' : section }}
					</h2>
					<p class="text-gray-600">Click to view details</p>
				</router-link>
			</div>

			<!-- Transfer Patient Section -->
			<section
				class="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300"
			>
				<h2 class="text-3xl font-semibold mb-4 text-indigo-800">
					Refer Patient
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
						<label
							for="admin"
							class="block text-sm font-medium text-gray-700"
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
						Refer Patient
					</button>
				</div>
			</section>
		</div>
		<div
			v-else
			class="text-center text-red-500 text-xl"
		>
			Failed to load patient details. Please try again.
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted, computed } from 'vue';
	import { useRoute } from 'vue-router';
	import {
		getPatient,
		transferPatient as transferPatientAPI,
	} from '@/utils/patientManagement';
	import { usePatientStore } from '@/stores/patient-management';
	import { useToast } from 'vue-toastification';
	import { getAdminHCPs } from '@/utils/staffManagement';
	import { getToken } from '@/utils/tokenUtils';
	import BackButton from '@/components/BackButton.vue';

	const route = useRoute();
	const patientStore = usePatientStore();
	const toast = useToast();

	const patient = ref(null);
	const isLoading = ref(true);

	const adminHCPs = ref([]);
	const selectedProfession = ref('');
	const selectedAdmin = ref('');

	const fetchPatientDetails = async () => {
		isLoading.value = true;
		try {
			const response = await getPatient(route.params.hospital_id);
			if (response.data && response.data.status === 'Success') {
				patient.value = response.data.data;
				patientStore.setCurrentPatient(patient.value);
			} else {
				console.error('Unexpected response format:', response);
			}
		} catch (error) {
			console.error('Error fetching patient details:', error);
		} finally {
			isLoading.value = false;
		}
	};

	const formatDate = (dateString) => {
		if (!dateString) return 'N/A';
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const formatKey = (key) => {
		return key.replace(/_/g, ' ');
	};

	const formatValue = (key, value) => {
		if (key === 'createdAt' || key === 'updatedAt') {
			return formatDate(value);
		}
		return value;
	};

	// const capitalizeFirstLetter = (string) => {
	//   return string.charAt(0).toUpperCase() + string.slice(1);
	// };

	const filteredBiodata = computed(() => {
		if (!patient.value || !patient.value.biodata) return {};
		// eslint-disable-next-line no-unused-vars
		const { _id, __v, createdAt, updatedAt, ...rest } =
			patient.value.biodata;
		return rest;
	});

	const registrationDate = computed(() => {
		if (
			!patient.value ||
			!patient.value.biodata ||
			!patient.value.biodata.createdAt
		)
			return 'N/A';
		return formatDate(patient.value.biodata.createdAt);
	});

	const loadAdminHCPs = async () => {
		try {
			const response = await getAdminHCPs();
			if (response.data && response.data.status === 'Success') {
				adminHCPs.value =
					response.data.data.adminHealthcareProfessionals;
			} else {
				console.error('Unexpected response format:', response);
				toast.error('Failed to load admin healthcare professionals');
			}
		} catch (error) {
			console.error(
				'Error fetching admin healthcare professionals:',
				error
			);
			toast.error('Error fetching admin healthcare professionals');
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
				toast.error('No authentication token found');
				return;
			}
			const response = await transferPatientAPI(
				patient.value.hospital_record.hospital_id,
				selectedAdmin.value,
				token
			);
			if (response.data && response.data.status === 'Success') {
				toast.success('Patient transferred successfully');
				// Optionally, you can update the patient's data or redirect to another page
			} else {
				console.error('Unexpected response format:', response);
				toast.error('Failed to transfer patient');
			}
		} catch (error) {
			console.error('Error transferring patient:', error);
			toast.error('Error transferring patient');
		}
	};

	onMounted(() => {
		fetchPatientDetails();
		loadAdminHCPs();
	});
</script>
