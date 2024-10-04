<template>
	<div class="pt-4 w-[90rem] mx-auto">
		<div class="w-full flex gap-[5rem] px-[2.175rem]">
			<div class="pt-16 w-3/5">
				<div class="flex items-center justify-between">
					<h2
						class="font-inter font-black text-4xl text-clrBlack mb-10"
					>
						{{
							currentStep < 3
								? 'Sign Up'
								: 'Register Organization'
						}}
					</h2>
					<p class="text-center text-lg text-clrBlue font-poppins">
						Step {{ currentStep }} of 3
					</p>
				</div>
				<form>
					<div
						v-if="currentStep === 1"
						class="mb-4"
					>
						<div class="flex items-center gap-2 mb-4">
							<FormField
								id="fname"
								type="text"
								placeholder="First Name"
								v-model="formData.firstName"
							/>
							<FormField
								id="lname"
								type="text"
								placeholder="Last Name"
								v-model="formData.lastName"
							/>
						</div>
						<div class="flex items-center gap-2">
							<FormField
								id="email"
								type="email"
								placeholder="Email"
								v-model="formData.email"
								class="mt-2"
							/>
							<div
								class="w-full border border-clrOffWhite rounded-[0.5rem] shadow-sm flex items-center px-[1rem]"
							>
								<label
									for="sex"
									class="font-medium text-gray-700 font-poppins font-normal text-l leading-7 text-clrBlack opacity-50"
									>Sex</label
								>
								<select
									id="sex"
									v-model="formData.sex"
									required
									class="mt-1 block w-full px-3 py-2 bg-white outline-0 font-poppins font-normal text-l leading-7 text-clrBlack flex items-center"
								>
									<option value="">Select Sex</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
									<option value="other">Other</option>
								</select>
							</div>
						</div>
					</div>
					<div v-if="currentStep === 2">
						<div class="mb-4">
							<FormField
								id="password"
								type="password"
								placeholder="Password"
								v-model="formData.password"
							/>
						</div>
						<div
							class="w-full border border-clrOffWhite rounded-[0.5rem] shadow-sm flex items-center px-[1rem] mb-4"
						>
							<label
								for="securityQuestion"
								class="font-medium text-gray-700 font-poppins font-normal text-l leading-7 text-clrBlack opacity-50 shrink-0"
								>Security Question</label
							>
							<select
								id="securityQuestion"
								v-model="formData.securityQuestion"
								required
								class="mt-1 block w-full px-3 py-2 bg-white outline-0 font-poppins font-normal text-l leading-7 text-clrBlack flex items-center"
							>
								<option value="">
									Select Security Question
								</option>
								<option
									v-for="question in securityQuestions"
									:key="question"
									:value="question"
								>
									{{ question }}
								</option>
							</select>
						</div>
						<div class="mb-4">
							<FormField
								id="seurityAnswer"
								type="text"
								placeholder="Security Answer"
								v-model="formData.securityAnswer"
							/>
						</div>
					</div>
					<div v-if="currentStep === 3">
						<div class="mb-4">
							<FormField
								id="orgName"
								type="text"
								placeholder="Organization Name"
								v-model="formData.organizationName"
							/>
						</div>
						<div class="mb-4">
							<FormField
								id="orgAdd"
								type="text"
								placeholder="Organization Address"
								v-model="formData.organizationAddress"
							/>
						</div>
						<div class="mb-4">
							<label for="orgDesc">
								<textarea
									rows="3"
									id="orgDesc"
									placeholder="Organization Description"
									class="w-full font-poppins font-normal text-l leading-7 text-clrBlack outline-0 resize-none"
									v-model="formData.organizationDescription"
								></textarea>
							</label>
						</div>
					</div>
					<div
						v-if="errorMessage"
						class="text-clrRed text-sm mt-2 font-poppins mb-4"
					>
						{{ errorMessage }}
					</div>
					<div class="flex items-center justify-end gap-4 ml-auto">
						<button
							v-if="currentStep > 1"
							@click="previousStep"
							class="flex items-center gap-2 bg-clrBlue px-4 py-2 rounded-md transition duration-500 ease outline-0 hover:bg-indigo-700"
						>
							<i
								class="bx bx-chevron-left font-poppins text-md font-normal text-clrWhite"
							></i>
							<span
								class="font-poppins text-md font-normal text-clrWhite"
								>Previous</span
							>
						</button>
						<button
							@click="handleStep"
							:disabled="isLoading"
							class="flex items-center gap-2 bg-clrBlue px-4 py-2 rounded-md transition duration-500 ease outline-0 hover:bg-indigo-700"
						>
							<span
								class="font-poppins text-md font-normal text-clrWhite"
								>{{
									currentStep < 3 ? 'Next' : 'Register'
								}}</span
							>
							<i
								class="bx bx-chevron-right font-poppins text-md font-normal text-clrWhite"
							></i>
						</button>
					</div>
				</form>
			</div>

			<div>
				<img
					src="../assets/images/sign_up-img.png"
					alt=""
					class="h-full object-contain"
				/>
			</div>
		</div>
	</div>
	<LoadingModal ref="loadingModal" />
</template>

<script setup>
	import { ref, reactive } from 'vue';
	import { useToast } from 'vue-toastification';
	import { registerSuperAdmin } from '../utils/staffManagement';

	import FormField from './FormField.vue';
	import LoadingModal from './LoadingModal.vue';

	const emit = defineEmits(['registration-complete']);
	const toast = useToast();

	const currentStep = ref(1);
	const isLoading = ref(false);
	const errorMessage = ref('');
	const loadingModal = ref(null);

	const formData = reactive({
		firstName: '',
		lastName: '',
		email: '',
		sex: '',
		password: '',
		securityQuestion: '',
		securityAnswer: '',
		organizationName: '',
		organizationAddress: '',
		organizationDescription: '',
	});

	const securityQuestions = [
		'What was the name of your first pet?',
		'In which city were you born?',
		"What is your mother's maiden name?",
		'What was the name of your first school?',
		'What is the name of your favorite childhood friend?',
		'What was your favorite food as a child?',
		'What is the middle name of your oldest sibling?',
		'What was the make of your first car?',
		'What is the name of the street you grew up on?',
		'What is your favorite book from childhood?',
	];

	const validateStep = () => {
		errorMessage.value = '';
		if (currentStep.value === 1) {
			if (
				!formData.firstName ||
				!formData.lastName ||
				!formData.email ||
				!formData.sex
			) {
				errorMessage.value = 'Please fill in all fields.';
				return false;
			}
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
				errorMessage.value = 'Please enter a valid email address.';
				return false;
			}
		} else if (currentStep.value === 2) {
			if (
				!formData.password ||
				!formData.securityQuestion ||
				!formData.securityAnswer
			) {
				errorMessage.value = 'Please fill in all fields.';
				return false;
			}
			if (formData.password.length < 8) {
				errorMessage.value =
					'Password must be at least 8 characters long.';
				return false;
			}
		} else if (currentStep.value === 3) {
			if (
				!formData.organizationName ||
				!formData.organizationAddress ||
				!formData.organizationDescription
			) {
				errorMessage.value = 'Please fill in all fields.';
				return false;
			}
		}
		return true;
	};

	const handleStep = async () => {
		if (validateStep()) {
			if (currentStep.value < 3) {
				currentStep.value++;
			} else {
				await registerSuperAdminHandler();
			}
		}
	};

	const previousStep = () => {
		if (currentStep.value > 1) {
			currentStep.value--;
		}
	};

	const registerSuperAdminHandler = async () => {
		loadingModal.value.show();
		isLoading.value = true;
		errorMessage.value = '';
		try {
			const superAdminData = {
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				sex: formData.sex,
				password: formData.password,
				securityQuestion: formData.securityQuestion,
				securityAnswer: formData.securityAnswer,
				organizationName: formData.organizationName,
				organizationAddress: formData.organizationAddress,
				organizationDescription: formData.organizationDescription,
			};

			const response = await registerSuperAdmin(superAdminData);

			'Server response:', response;
			'Response data:', response.data;
			'SuperAdmin data:', response.data?.data?.superAdmin;
			'Organization data:', response.data?.data?.organization;
			'Token:', response.data?.data?.token;

			if (
				response.data?.status === 'Success' &&
				response.data?.data?.superAdmin &&
				response.data?.data?.organization &&
				response.data?.data?.token
			) {
				emit('registration-complete', {
					superAdmin: response.data.data.superAdmin,
					organization: response.data.data.organization,
					token: response.data.data.token,
				});
			} else {
				console.error('Incomplete data in response:', response.data);
				throw new Error('Incomplete data received from server');
			}
		} catch (error) {
			console.error('Error registering Super Admin', error);
			if (error.response) {
				console.error('Error response:', error.response.data);
			}
			errorMessage.value =
				'An error occurred during registration. Please try again.';
			toast.error('Registration failed. Please try again.');
		} finally {
			isLoading.value = false;
			loadingModal.value.hide();
		}
	};
</script>

<style scoped>
	label[for='orgDesc'] {
		@apply border-solid border-clrOffWhite border rounded-[0.5rem] mb-[0.5rem] flex items-center px-[1rem] py-[0.5rem] w-full;
	}
</style>
