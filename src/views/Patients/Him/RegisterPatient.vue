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
							v-model="patientData.phone"
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
							<option value="0">Select Sex</option>
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
							<option value="0">Select Marital Status</option>
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

					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="unit"
							class="font-poppins font-normal text-clrBlack text-sm"
							>Unit Referred To</label
						>
						<input
							type="text"
							id="unit"
							placeholder="Neurosurgery"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2 bg-grayish"
							readonly
						/>
					</div>

					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="hcp-referred-to"
							class="font-poppins font-normal text-clrBlack text-sm"
							>HCP Referred To</label
						>
						<input
							type="text"
							id="hcp-referref-to"
							placeholder="Dr. Jane Udor"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2 bg-grayish"
							readonly
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
					>
					<input
						type="text"
						id="status"
						placeholder="In-patient"
						class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2"
					/>
				</div>

				<div class="flex flex-col gap-1 w-[20rem]">
					<label
						for="appointment-date"
						class="font-poppins font-normal text-clrBlack text-sm"
						>Next Appointment Date</label
					>
					<input
						type="date"
						id="appointment-date"
						placeholder="01/01/2024"
						class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2"
					/>
				</div>
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
	});

	const isSubmitting = ref(false);

	const handleSubmit = async () => {
		if (isSubmitting.value) return;

		try {
			isSubmitting.value = true;
			loadingModal.value.show();
			const response = await registerPatient(patientData.value);
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
