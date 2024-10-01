<template>
	<BackButton class="pt-2 pb-4" />
	<form
		@submit.prevent="handleSubmit"
		class="px-[2.175rem]"
	>
		<div class="bg-purplish rounded-md py-[1.1875rem] px-[2.5625rem]">
			<header
				class="border-b border-solid border-grayish pb-2 flex items-center justify-between"
			>
				<h1 class="font-bold text-2xl text-clrBlack leading-8">
					Register Patient
				</h1>
			</header>

			<div class="my-8 flex gap-10">
				<div class="flex flex-col gap-4">
					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="name"
							class="font-poppins font-normal text-clrBlack text-sm"
							>Patient Name</label
						>
						<input
							type="text"
							id="name"
							placeholder="John Doe"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2"
							v-model="patientData.name"
						/>
					</div>

					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="age"
							class="font-poppins font-normal text-clrBlack text-sm"
							>Age</label
						>
						<input
							type="number"
							id="age"
							placeholder="20"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2"
							v-model="patientData.age"
						/>
					</div>

					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="address"
							class="font-poppins font-normal text-clrBlack text-sm"
							>Address</label
						>
						<input
							type="text"
							id="address"
							placeholder="House 34, Block 2, Street 12"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2"
							v-model="patientData.address"
						/>
					</div>

					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="phone"
							class="font-poppins font-normal text-clrBlack text-sm"
							>Mobile Number</label
						>
						<input
							type="tel"
							id="phone"
							placeholder="1234567890"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2"
							v-model="patientData.phone_number"
						/>
					</div>
				</div>

				<div class="flex flex-col gap-4">
					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="sex"
							class="font-poppins font-normal text-clrBlack text-sm"
							>Sex</label
						>
						<select
							id="sex"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2"
							placeholder="Select Sex"
							v-model="patientData.sex"
						>
							<option
								value=""
								selected
								disabled
							>
								Select Sex
							</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">Other</option>
						</select>
					</div>

					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="occupation"
							class="font-poppins font-normal text-clrBlack text-sm"
							>Occupation</label
						>
						<input
							type="text"
							id="occupation"
							placeholder="Teacher"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2"
							v-model="patientData.occupation"
						/>
					</div>

					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="marital-status"
							class="font-poppins font-normal text-clrBlack text-sm"
							>Marital Status</label
						>
						<select
							id="marital-status"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2"
							v-model="patientData.marital_status"
						>
							<option
								value=""
								disabled
								selected
							>
								Select Marital Status
							</option>
							<option value="single">Single</option>
							<option value="married">Married</option>
							<option value="divorced">Divorced</option>
							<option value="widowed">Widowed</option>
						</select>
					</div>

					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="tribe"
							class="font-poppins font-normal text-clrBlack text-sm"
							>Tribe</label
						>
						<input
							type="text"
							id="tribe"
							placeholder="Yoruba"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2"
							v-model="patientData.tribe"
						/>
					</div>
				</div>

				<div class="flex flex-col gap-4">
					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="religion"
							class="font-poppins font-normal text-clrBlack text-sm"
							>Religion</label
						>
						<input
							type="text"
							id="religion"
							placeholder="Christianity"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2 w-full"
							v-model="patientData.religion"
						/>
					</div>
				</div>
			</div>

			<div class="border-t border-solid border-grayish pt-6 flex gap-10">
				<div class="flex flex-col gap-1 w-[20rem]">
					<label
						for="status"
						class="font-poppins font-normal text-clrBlack text-sm"
						>Status</label
					><select
						id="status"
						class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2"
						placeholder="Select Status"
						v-model="patientType"
					>
						<option
							value=""
							disabled
							selected
						>
							Select Status
						</option>
						<option value="In-Patient">In-Patient</option>
						<option value="Out-Patient">Out-Patient</option>
					</select>
				</div>

				<div class="flex flex-col gap-1 w-[20rem]">
					<label
						for="appointment-date"
						class="font-poppins font-normal text-clrBlack text-sm"
						>Next Appointment Date</label
					>
					<input
						type="datetime-local"
						id="appointment-date"
						placeholder="Select a date"
						class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2 appearance-none"
						v-model="appointmentDateTime"
					/>
				</div>
			</div>
		</div>

		<div class="mt-8 flex items-center gap-4">
			<input
				type="number"
				v-model="demoPatientCount"
				min="1"
				max="100"
				class="w-20 px-2 py-1 border border-gray-300 rounded font-poppins outline-none no-spinners appearnace-none"
				placeholder="12"
			/>
			<button
				@click="registerDemoPatients"
				:disabled="isSubmitting || isDemoRegistering"
				class="px-4 py-2 bg-green-500 text-white rounded font-poppins hover:bg-green-600 disabled:opacity-50"
			>
				Register Demo Patients
			</button>
		</div>

		<div
			v-if="isDemoRegistering"
			class="mt-4"
		>
			<p class="text-sm text-gray-600">
				Registering demo patients: {{ registeredDemoCount }} /
				{{ demoPatientCount }}
			</p>
			<div class="w-full bg-gray-200 rounded-full h-2.5 mt-2">
				<div
					class="bg-blue-600 h-2.5 rounded-full"
					:style="{
						width: `${
							(registeredDemoCount / demoPatientCount) * 100
						}%`,
					}"
				></div>
			</div>
		</div>

		<div>
			<button
				type="submit"
				:disabled="isSubmitting"
				class="mt-10 w-full flex justify-center py-4 border border-transparent rounded-md shadow-sm text-sm font-medium font-poppins text-clrWhite bg-clrBlue hover:indigo-600 transition duration-150 ease-in-out disabled:opacity-50"
			>
				<span
					v-if="isSubmitting"
					class="flex items-center"
				>
					<svg
						class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					Registering...
				</span>
				<span v-else>Register Patient</span>
			</button>
		</div>
	</form>
	<LoadingModal ref="loadingModal" />
</template>

<script setup>
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	import { usePatientStore } from '@/stores/patient-management';
	import { registerPatient } from '@/utils/patientManagement';
	import { generateDemoPatients } from '@/utils/generateDemoPatients';
	import LoadingModal from '@/components/LoadingModal.vue';
	import { useToast } from 'vue-toastification';
	import BackButton from '@/components/BackButton.vue';

	const router = useRouter();
	const patientStore = usePatientStore();
	const loadingModal = ref(null);
	const toast = useToast();

	const patientData = ref({
		name: '',
		age: null,
		sex: '',
		tribe: '',
		religion: '',
		occupation: '',
		marital_status: '',
		address: '',
		phone_number: '',
	});

	const appointmentDateTime = ref('');
	const patientType = ref('');

	const isSubmitting = ref(false);

	const demoPatientCount = ref(10);
	const isDemoRegistering = ref(false);
	const registeredDemoCount = ref(0);

	const registerDemoPatients = async () => {
		if (isDemoRegistering.value) return;

		try {
			isDemoRegistering.value = true;
			registeredDemoCount.value = 0;
			const demoPatients = generateDemoPatients(demoPatientCount.value);

			for (const demoPatient of demoPatients) {
				await registerPatient(
					demoPatient.patient,
					demoPatient.appointmentDateTime,
					demoPatient.patientType
				);
				registeredDemoCount.value++;
			}

			toast.success(
				`Successfully registered ${demoPatientCount.value} demo patients!`
			);
			setTimeout(() => {
				router.push('/patients');
			}, 2000);
		} catch (error) {
			console.error('Error registering demo patients:', error);
			toast.error('Failed to register demo patients. Please try again.');
		} finally {
			isDemoRegistering.value = false;
		}
	};

	const handleSubmit = async () => {
		if (isSubmitting.value) return;

		try {
			isSubmitting.value = true;
			loadingModal.value.show();
			const response = await registerPatient(
				patientData.value,
				appointmentDateTime.value,
				patientType.value
			);
			patientStore.setCurrentPatient(response.data.hospitalRecord);
			loadingModal.value.hide();
			toast.success('Patient registered successfully!');
			setTimeout(() => {
				router.push('/patients');
			}, 2000);
		} catch (error) {
			console.error('Error registering patient:', error);
			loadingModal.value.hide();
			toast.error('Failed to register patient. Please try again.');
		} finally {
			isSubmitting.value = false;
		}
	};
</script>
