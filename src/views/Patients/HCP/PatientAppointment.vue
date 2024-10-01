<template>
	<BackButton class="py-4" />
	<div class="w-[90rem] font-poppins mx-auto p-6">
		<h1 class="text-3xl font-bold mb-6 flex items-center">
			<v-icon
				name="ri-calendar-line"
				class="mr-2"
			/>
			Appointment Management
		</h1>

		<div
			v-if="patient"
			class="bg-gray-100 rounded-lg p-4 mb-6"
		>
			<h2 class="text-xl font-semibold">{{ patient.biodata.name }}</h2>
			<p class="text-gray-600">
				Hospital ID: {{ patient.hospital_record.hospital_id }}
			</p>
		</div>

		<div class="mb-6">
			<button
				@click="showNewAppointmentForm = true"
				class="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
			>
				<v-icon
					name="ri-user-add-line"
					class="mr-2"
				/>
				New Appointment
			</button>
		</div>

		<div
			v-if="showNewAppointmentForm"
			class="bg-white shadow-md rounded-lg p-4 mb-6"
		>
			<h3 class="text-lg font-semibold mb-2">Schedule New Appointment</h3>
			<input
				type="datetime-local"
				v-model="newAppointmentDateTime"
				class="border rounded-md p-2 mb-2 w-full"
			/>
			<div class="flex justify-end space-x-2">
				<button
					@click="createNewAppointment"
					class="bg-green-500 text-white px-4 py-2 rounded-md flex items-center"
				>
					<v-icon
						name="ri-check-line"
						class="mr-2"
					/>
					Schedule
				</button>
				<button
					@click="showNewAppointmentForm = false"
					class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center"
				>
					<v-icon
						name="ri-close-line"
						class="mr-2"
					/>
					Cancel
				</button>
			</div>
		</div>

		<div
			v-if="patient"
			class="bg-white shadow-md rounded-lg p-4"
		>
			<h3 class="text-xl font-semibold mb-4">Appointments</h3>
			<div
				v-for="appointment in sortedAppointments"
				:key="appointment._id"
				class="border-b py-4 last:border-b-0"
			>
				<div
					class="flex flex-col sm:flex-row justify-between items-start sm:items-center"
				>
					<div class="flex items-center space-x-2 mb-2 sm:mb-0">
						<v-icon
							name="ri-calendar-line"
							class="text-gray-500"
						/>
						<span class="font-medium"
							>{{ formatDate(appointment.date) }} at
							{{ appointment.time }}</span
						>
						<span
							:class="getStatusClass(appointment.status)"
							class="px-2 py-1 rounded-full text-xs font-semibold"
						>
							{{ appointment.status }}
						</span>
					</div>
					<div class="flex space-x-2">
						<button
							v-if="appointment.status === 'Scheduled'"
							@click="showRescheduleForm(appointment)"
							class="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm flex items-center"
						>
							<v-icon
								name="ri-edit-line"
								class="mr-1"
							/>
							Reschedule
						</button>
						<button
							v-if="appointment.status === 'Scheduled'"
							@click="cancelAppointment(appointment)"
							class="bg-red-500 text-white px-3 py-1 rounded-md text-sm flex items-center"
						>
							<v-icon
								name="ri-close-line"
								class="mr-1"
							/>
							Cancel
						</button>
						<button
							v-if="appointment.status === 'Scheduled'"
							@click="completeAppointment(appointment)"
							class="bg-green-500 text-white px-3 py-1 rounded-md text-sm flex items-center"
						>
							<v-icon
								name="ri-check-line"
								class="mr-1"
							/>
							Complete
						</button>
					</div>
				</div>
			</div>
		</div>

		<div
			v-if="appointmentToReschedule"
			class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
		>
			<div class="bg-white rounded-lg p-6 w-96">
				<h3 class="text-lg font-semibold mb-4">
					Reschedule Appointment
				</h3>
				<input
					type="datetime-local"
					v-model="rescheduleDateTime"
					class="border rounded-md p-2 mb-4 w-full"
				/>
				<div class="flex justify-end space-x-2">
					<button
						@click="rescheduleAppointment"
						class="bg-green-500 text-white px-4 py-2 rounded-md flex items-center"
					>
						<v-icon
							name="ri-check-line"
							class="mr-2"
						/>
						Confirm
					</button>
					<button
						@click="appointmentToReschedule = null"
						class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center"
					>
						<v-icon
							name="ri-close-line"
							class="mr-2"
						/>
						Cancel
					</button>
				</div>
			</div>
		</div>

		<LoadingModal ref="loadingModal" />
	</div>
</template>

<script setup>
	import { ref, onMounted, computed } from 'vue';
	import { useRoute } from 'vue-router';
	import { useToast } from 'vue-toastification';
	import LoadingModal from '@/components/LoadingModal.vue';
	import {
		getPatient,
		createAppointment,
		cancelAppointment as cancelAppointmentApi,
		rescheduleAppointment as rescheduleAppointmentApi,
		completeAppointment as completeAppointmentApi,
	} from '@/utils/patientManagement';
	import BackButton from '@/components/BackButton.vue';

	const route = useRoute();
	const toast = useToast();
	const patient = ref(null);
	const showNewAppointmentForm = ref(false);
	const newAppointmentDateTime = ref('');
	const appointmentToReschedule = ref(null);
	const rescheduleDateTime = ref('');
	const loadingModal = ref(null);

	const fetchPatient = async () => {
		try {
			loadingModal.value.show();
			const response = await getPatient(route.params.hospital_id);
			patient.value = response.data.data;
		} catch (error) {
			toast.error('Failed to fetch patient data');
		} finally {
			loadingModal.value.hide();
		}
	};

	onMounted(fetchPatient);

	const sortedAppointments = computed(() => {
		if (!patient.value) return [];
		return [...patient.value.hospital_record.appointments].sort(
			(a, b) => new Date(b.date) - new Date(a.date)
		);
	});

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const getStatusClass = (status) => {
		switch (status.toLowerCase()) {
			case 'scheduled':
				return 'bg-blue-100 text-blue-800';
			case 'completed':
				return 'bg-green-100 text-green-800';
			case 'cancelled':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const createNewAppointment = async () => {
		try {
			loadingModal.value.show();
			await createAppointment(
				patient.value.hospital_record.hospital_id,
				newAppointmentDateTime.value
			);
			toast.success('Appointment created successfully');
			showNewAppointmentForm.value = false;
			newAppointmentDateTime.value = '';
			await fetchPatient();
		} catch (error) {
			toast.error('Failed to create appointment');
		} finally {
			loadingModal.value.hide();
		}
	};

	const showRescheduleForm = (appointment) => {
		appointmentToReschedule.value = appointment;
		rescheduleDateTime.value = `${appointment.date.split('T')[0]}T${
			appointment.time
		}`;
	};

	const rescheduleAppointment = async () => {
		try {
			loadingModal.value.show();
			await rescheduleAppointmentApi(
				patient.value.hospital_record.hospital_id,
				appointmentToReschedule.value._id,
				rescheduleDateTime.value
			);
			toast.success('Appointment rescheduled successfully');
			appointmentToReschedule.value = null;
			rescheduleDateTime.value = '';
			await fetchPatient();
		} catch (error) {
			toast.error('Failed to reschedule appointment');
		} finally {
			loadingModal.value.hide();
		}
	};

	const cancelAppointment = async (appointment) => {
		try {
			loadingModal.value.show();
			await cancelAppointmentApi(
				patient.value.hospital_record.hospital_id,
				appointment._id
			);
			toast.success('Appointment cancelled successfully');
			await fetchPatient();
		} catch (error) {
			toast.error('Failed to cancel appointment');
		} finally {
			loadingModal.value.hide();
		}
	};

	const completeAppointment = async (appointment) => {
		try {
			loadingModal.value.show();
			await completeAppointmentApi(
				patient.value.hospital_record.hospital_id,
				appointment._id
			);
			toast.success('Appointment marked as completed');
			await fetchPatient();
		} catch (error) {
			toast.error('Failed to complete appointment');
		} finally {
			loadingModal.value.hide();
		}
	};
</script>
