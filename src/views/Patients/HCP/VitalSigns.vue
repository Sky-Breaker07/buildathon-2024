<template>
	<div class="p-8 max-w-6xl mx-auto min-h-screen">
		<BackButton class="pt-4 pb-2" />
		<h1 class="text-4xl font-bold mb-6 text-center text-indigo-800">
			Vital Signs
		</h1>
		<div
			v-if="patient"
			class="space-y-8"
		>
			<!-- Patient Info -->
			<section class="bg-white shadow-lg rounded-lg p-6">
				<h2 class="text-2xl font-semibold mb-4 text-indigo-700">
					Patient Information
				</h2>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<span class="font-semibold">Name:</span>
						{{ patient.biodata.name }}
					</div>
					<div>
						<span class="font-semibold">Hospital ID:</span>
						{{ patient.hospital_record.hospital_id }}
					</div>
					<div>
						<span class="font-semibold">Age:</span>
						{{ patient.biodata.age }}
					</div>
					<div>
						<span class="font-semibold">Sex:</span>
						{{ patient.biodata.sex }}
					</div>
				</div>
			</section>

			<!-- Create New Vital Signs -->
			<section class="bg-white shadow-lg rounded-lg p-6">
				<h2 class="text-2xl font-semibold mb-4 text-indigo-700">
					Record New Vital Signs
				</h2>
				<form
					@submit.prevent="createVitalSigns"
					class="grid grid-cols-1 md:grid-cols-2 gap-6"
				>
					<div>
						<label
							for="systolicBP"
							class="block text-sm font-medium text-gray-700"
							>Systolic BP (mmHg)</label
						>
						<input
							type="number"
							id="systolicBP"
							v-model="newVitalSigns.blood_pressure.systemicBP"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg p-2"
						/>
					</div>
					<div>
						<label
							for="diastolicBP"
							class="block text-sm font-medium text-gray-700"
							>Diastolic BP (mmHg)</label
						>
						<input
							type="number"
							id="diastolicBP"
							v-model="newVitalSigns.blood_pressure.diastolicBP"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg p-2"
						/>
					</div>
					<div>
						<label
							for="meanArterialPressure"
							class="block text-sm font-medium text-gray-700"
							>Mean Arterial Pressure (mmHg)</label
						>
						<input
							type="number"
							id="meanArterialPressure"
							v-model="
								newVitalSigns.blood_pressure
									.mean_arterial_pressure
							"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg p-2"
						/>
					</div>
					<div>
						<label
							for="heartRate"
							class="block text-sm font-medium text-gray-700"
							>Heart Rate (beats/min)</label
						>
						<input
							type="number"
							id="heartRate"
							v-model="newVitalSigns.heart_rate"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg p-2"
						/>
					</div>
					<div>
						<label
							for="pulseRate"
							class="block text-sm font-medium text-gray-700"
							>Pulse Rate (beats/min)</label
						>
						<input
							type="number"
							id="pulseRate"
							v-model="newVitalSigns.pulse_rate"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg p-2"
						/>
					</div>
					<div>
						<label
							for="respiratoryRate"
							class="block text-sm font-medium text-gray-700"
							>Respiratory Rate (breaths/min)</label
						>
						<input
							type="number"
							id="respiratoryRate"
							v-model="newVitalSigns.respiratory_rate"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg p-2"
						/>
					</div>
					<div>
						<label
							for="temperature"
							class="block text-sm font-medium text-gray-700"
							>Temperature (°C)</label
						>
						<input
							type="number"
							id="temperature"
							v-model="newVitalSigns.temperature"
							step="0.1"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg p-2"
						/>
					</div>
					<div>
						<label
							for="spo2"
							class="block text-sm font-medium text-gray-700"
							>SpO2 (%)</label
						>
						<input
							type="number"
							id="spo2"
							v-model="newVitalSigns.spo2"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg p-2"
						/>
					</div>
					<div class="md:col-span-2">
						<button
							type="submit"
							class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-lg"
						>
							Record Vital Signs
						</button>
					</div>
				</form>
			</section>

			<!-- Previous Vital Signs -->
			<section class="bg-white shadow-lg rounded-lg p-6">
				<h2 class="text-2xl font-semibold mb-4 text-indigo-700">
					Previous Vital Signs
				</h2>
				<div
					v-if="sortedVitalSigns.length === 0"
					class="text-center text-gray-500"
				>
					No previous vital signs recorded.
				</div>
				<div
					v-else
					class="space-y-4"
				>
					<div
						v-for="(vitalSign, index) in sortedVitalSigns"
						:key="index"
						class="border-b pb-4"
					>
						<h3 class="text-lg font-semibold text-indigo-600">
							Recorded on: {{ formatDate(vitalSign.createdAt) }}
						</h3>
						<div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
							<div>
								<span class="font-semibold">Systolic BP:</span>
								{{
									formatVitalSign(
										vitalSign.blood_pressure?.systemicBP,
										'mmHg'
									)
								}}
							</div>
							<div>
								<span class="font-semibold">Diastolic BP:</span>
								{{
									formatVitalSign(
										vitalSign.blood_pressure?.diastolicBP,
										'mmHg'
									)
								}}
							</div>
							<div>
								<span class="font-semibold"
									>Mean Arterial Pressure:</span
								>
								{{
									formatVitalSign(
										vitalSign.blood_pressure
											?.mean_arterial_pressure,
										'mmHg'
									)
								}}
							</div>
							<div>
								<span class="font-semibold">Heart Rate:</span>
								{{
									formatVitalSign(
										vitalSign.heart_rate,
										'beats/min'
									)
								}}
							</div>
							<div>
								<span class="font-semibold">Pulse Rate:</span>
								{{
									formatVitalSign(
										vitalSign.pulse_rate,
										'beats/min'
									)
								}}
							</div>
							<div>
								<span class="font-semibold"
									>Respiratory Rate:</span
								>
								{{
									formatVitalSign(
										vitalSign.respiratory_rate,
										'breaths/min'
									)
								}}
							</div>
							<div>
								<span class="font-semibold">Temperature:</span>
								{{
									formatVitalSign(vitalSign.temperature, '°C')
								}}
							</div>
							<div>
								<span class="font-semibold">SpO2:</span>
								{{ formatVitalSign(vitalSign.spo2, '%') }}
							</div>
						</div>
					</div>
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
	<LoadingModal ref="loadingModal" />
</template>

<script setup>
	import { ref, onMounted, reactive, computed } from 'vue';
	import { useRoute } from 'vue-router';
	import { useToast } from 'vue-toastification';
	import {
		getPatientFullDetails,
		createVitals,
	} from '@/utils/patientManagement';
	import { usePatientStore } from '@/stores/patient-management';
	import LoadingModal from '@/components/LoadingModal.vue';
	import BackButton from '@/components/BackButton.vue';

	const route = useRoute();
	const toast = useToast();
	const patientStore = usePatientStore();
	const loadingModal = ref(null);

	const patient = ref(null);

	const newVitalSigns = reactive({
		blood_pressure: {
			systemicBP: null,
			diastolicBP: null,
			mean_arterial_pressure: null,
		},
		heart_rate: null,
		pulse_rate: null,
		respiratory_rate: null,
		temperature: null,
		spo2: null,
	});

	const fetchPatientDetails = async () => {
		loadingModal.value.show();
		try {
			const response = await getPatientFullDetails(
				route.params.hospital_id
			);
			if (response.data && response.data.status === 'Success') {
				patient.value = response.data.data;
				patientStore.setCurrentPatient(patient.value);
			} else {
				console.error('Unexpected response format:', response);
				toast.error('Failed to load patient details');
			}
		} catch (error) {
			console.error('Error fetching patient details:', error);
			toast.error('Error fetching patient details');
		} finally {
			loadingModal.value.hide();
		}
	};

	const createVitalSigns = async () => {
		loadingModal.value.show();
		try {
			const vitalSignsData = {
				...newVitalSigns,
				hospital_id: patient.value.hospital_record.hospital_id,
			};
			const response = await createVitals(
				patient.value.hospital_record.hospital_id,
				vitalSignsData
			);
			if (response.data && response.data.status === 'Success') {
				toast.success('Vital signs recorded successfully');
				patientStore.addVitalSign(response.data.data);
				patient.value.vital_signs.unshift(response.data.data);
				resetNewVitalSigns();
			} else {
				console.error('Unexpected response format:', response);
				toast.error('Failed to record vital signs');
			}
		} catch (error) {
			console.error('Error creating vital signs:', error);
			toast.error('Error recording vital signs');
		} finally {
			// reload the page
			window.location.reload();
			loadingModal.value.hide();
		}
	};

	const sortedVitalSigns = computed(() => {
		if (!patient.value || !patient.value.vital_signs) return [];
		return [...patient.value.vital_signs].sort(
			(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
		);
	});

	const resetNewVitalSigns = () => {
		if (newVitalSigns && typeof newVitalSigns === 'object') {
			Object.keys(newVitalSigns).forEach((key) => {
				if (
					newVitalSigns[key] &&
					typeof newVitalSigns[key] === 'object'
				) {
					Object.keys(newVitalSigns[key]).forEach((subKey) => {
						newVitalSigns[key][subKey] = null;
					});
				} else {
					newVitalSigns[key] = null;
				}
			});
		} else {
			console.error('newVitalSigns is not an object:', newVitalSigns);
		}
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleString();
	};

	const formatVitalSign = (value, unit) => {
		return value != null ? `${value} ${unit}` : 'N/A';
	};

	onMounted(() => {
		fetchPatientDetails();
	});
</script>
