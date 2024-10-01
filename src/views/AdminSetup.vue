<template>
	<div
		v-if="currentUser"
		class="min-h-screen pt-2 pb- px-4 sm:px-6 lg:px-8"
	>
		<BackButton />
		<div class="w-[90rem] mx-auto bg-white rounded-xl overflow-hidden">
			<div>
				<StaffDashBoardHeader />

				<!-- New: Instructions Card -->
				<div
					class="bg-blue-50 border-l-4 border-clrBlue py-4 px-[2.175rem] mb-6 rounded-md shadow-md font-poppins"
				>
					<h3 class="text-lg font-semibold text-blue-700 mb-2">
						Important Instructions
					</h3>
					<p class="text-blue-600 mb-2">
						For each {{ profession }} registered:
					</p>
					<ul class="list-disc list-inside ml-4 mb-2 text-blue-600">
						<li>
							The <strong>staff ID</strong> will be their
							<strong>username</strong> for login.
						</li>
						<li>
							Their <strong>surname</strong> will be set as the
							<strong>default password</strong>.
						</li>
					</ul>
					<p class="text-blue-600">
						Please ensure to communicate these details securely to
						each {{ profession }} and advise them to change their
						password upon first login.
					</p>
				</div>

				<!-- Healthcare Professional Registration Form (with enhancements) -->
				<div
					class="mb-8 bg-white shadow-md rounded-lg p-6 font-poppins"
				>
					<h3 class="text-xl font-bold text-gray-900 mb-4">
						Register New {{ profession }}
					</h3>
					<form
						@submit.prevent="registerHealthcareProfessional"
						class="space-y-4"
					>
						<div class="grid grid-cols-2 gap-4">
							<input
								v-model="hcpForm.firstName"
								type="text"
								required
								class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
								placeholder="First Name"
							/>
							<input
								v-model="hcpForm.lastName"
								type="text"
								required
								class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
								placeholder="Last Name"
							/>
						</div>
						<input
							v-model="hcpForm.email"
							type="email"
							required
							class="w-[49.5%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							placeholder="Email"
						/>
						<p class="text-sm text-gray-600 italic">
							<b>Note :</b> The <b>staff ID</b> will be generated
							automatically and used as the username.
						</p>
						<button
							type="submit"
							class="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:bg:clrBlue"
						>
							Register {{ profession }}
						</button>
					</form>
				</div>

				<!-- Registered Healthcare Professionals List (with enhancements) -->
				<div class="bg-white shadow-md rounded-lg p-6 font-poppins">
					<h3 class="text-xl font-bold text-gray-900 mb-4">
						Registered {{ profession }}s
					</h3>
					<div
						v-if="registeredHCPs.length > 0"
						class="overflow-x-auto"
					>
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Name
									</th>
									<th
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Staff ID
									</th>
									<th
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Email
									</th>
									<th
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Actions
									</th>
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
								<tr
									v-for="hcp in registeredHCPs"
									:key="hcp.staff_id"
									class="hover:bg-gray-50 transition-colors duration-200"
								>
									<td
										class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
									>
										{{ hcp.name }}
									</td>
									<td
										class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
									>
										{{ hcp.staff_id }}
									</td>
									<td
										class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
									>
										{{ hcp.email }}
									</td>
									<td
										class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
									>
										<button
											@click="openRemoveModal(hcp)"
											class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
										>
											Remove
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<p
						v-else
						class="text-gray-600 italic"
					>
						No registered {{ profession }}s found.
					</p>
				</div>
			</div>
		</div>
		<LoadingModal ref="loadingModal" />
	</div>
	<div
		v-else
		class="min-h-screen flex items-center justify-center bg-gray-100"
	>
		<p class="text-xl text-gray-600">Loading...</p>
	</div>

	<!-- Remove Modal (with enhancements) -->
	<teleport to="body">
		<div
			v-if="showRemoveModal"
			class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
		>
			<div class="bg-white p-6 rounded-lg max-w-md w-full">
				<h2 class="text-xl font-bold mb-4 text-indigo-700">
					Confirm {{ profession }} Removal
				</h2>
				<p class="mb-4">
					Are you sure you want to remove {{ hcpToRemove?.name }}?
				</p>
				<p class="mb-4">
					To confirm, please type the staff ID:
					<strong class="text-indigo-600">{{
						hcpToRemove?.staff_id
					}}</strong>
				</p>
				<input
					v-model="confirmationInput"
					class="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
					placeholder="Type staff ID here"
				/>
				<div class="flex justify-end">
					<button
						@click="closeRemoveModal"
						class="px-4 py-2 bg-gray-300 rounded mr-2 hover:bg-gray-400 transition-colors duration-200"
					>
						Cancel
					</button>
					<button
						@click="removeHealthcareProfessional"
						:disabled="confirmationInput !== hcpToRemove?.staff_id"
						class="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50 hover:bg-red-600 transition-colors duration-200"
					>
						Remove
					</button>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script setup>
	import { ref, onMounted, computed } from 'vue';
	import { useRouter } from 'vue-router';
	import { useToast } from 'vue-toastification';
	import { useStaffStore } from '../stores/staff-management';
	import {
		registerHCP,
		getHCPsByProfession,
		removeHCP,
	} from '../utils/staffManagement';
	import LoadingModal from '../components/LoadingModal.vue';
	import { getToken } from '../utils/tokenUtils';
	import StaffDashBoardHeader from '@/components/StaffDashBoardHeader.vue';
	import BackButton from '@/components/BackButton.vue';

	const router = useRouter();
	const toast = useToast();
	const staffStore = useStaffStore();
	const loadingModal = ref(null);

	const currentUser = computed(() => staffStore.currentUser);
	const registeredHCPs = ref([]);

	const profession = computed(() => {
		return currentUser.value?.profession
			? capitalizeFirstLetter(currentUser.value.profession)
			: '';
	});

	const hcpForm = ref({
		firstName: '',
		lastName: '',
		email: '',
	});

	const showRemoveModal = ref(false);
	const hcpToRemove = ref(null);
	const confirmationInput = ref('');

	onMounted(async () => {
		if (!currentUser.value) {
			await staffStore.fetchCurrentUser();
		}

		if (
			!currentUser.value ||
			!currentUser.value.isAdmin ||
			currentUser.value.role !== 'HealthCareProfessional'
		) {
			toast.error('You are not authorized to access this page');
			router.push('/dashboard');
			return;
		}

		await fetchRegisteredHCPs();
	});

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const fetchRegisteredHCPs = async () => {
		try {
			loadingModal.value.show();
			const response = await getHCPsByProfession(
				currentUser.value.profession
			);

			// Check if the response is successful and has the expected structure
			if (
				response &&
				response.data &&
				response.data.status === 'Success' &&
				response.data.data &&
				Array.isArray(response.data.data.healthcareProfessionals)
			) {
				registeredHCPs.value =
					response.data.data.healthcareProfessionals.filter(
						(hcp) => !hcp.isAdmin
					);
				if (registeredHCPs.value.length === 0) {
					toast.info(
						'No registered healthcare professionals found for this profession.'
					);
				}
			} else {
				console.error('Unexpected response structure:', response);
				toast.error(
					'Failed to fetch registered healthcare professionals. Unexpected data structure.'
				);
			}
		} catch (error) {
			console.error('Error fetching registered HCPs:', error);
			toast.error(
				'Failed to fetch registered healthcare professionals. Please try again.'
			);
		} finally {
			loadingModal.value.hide();
		}
	};

	const registerHealthcareProfessional = async () => {
		try {
			loadingModal.value.show();
			const token = getToken();
			if (!token) {
				throw new Error('No authentication token found');
			}
			const response = await registerHCP(
				{
					...hcpForm.value,
					profession: currentUser.value.profession,
				},
				token
			);

			// Check if the response is successful and has the expected structure
			if (
				response &&
				response.data &&
				response.data.status === 'Success' &&
				response.data.data &&
				response.data.data.healthcareProfessional
			) {
				registeredHCPs.value.push(
					response.data.data.healthcareProfessional
				);
				resetHCPForm();
				toast.success(
					'Healthcare Professional registered successfully'
				);
			} else {
				console.error('Unexpected response structure:', response);
				toast.error(
					'Failed to register Healthcare Professional. Unexpected data structure.'
				);
			}
		} catch (error) {
			console.error('Error registering Healthcare Professional:', error);
			toast.error(
				'Failed to register Healthcare Professional. Please try again.'
			);
		} finally {
			loadingModal.value.hide();
		}
	};

	const openRemoveModal = (hcp) => {
		hcpToRemove.value = hcp;
		showRemoveModal.value = true;
		confirmationInput.value = '';
	};

	const closeRemoveModal = () => {
		showRemoveModal.value = false;
		hcpToRemove.value = null;
		confirmationInput.value = '';
	};

	const removeHealthcareProfessional = async () => {
		if (confirmationInput.value === hcpToRemove.value.staff_id) {
			try {
				loadingModal.value.show();
				const token = getToken();
				if (!token) {
					throw new Error('No authentication token found');
				}
				await removeHCP(hcpToRemove.value.staff_id, token);
				registeredHCPs.value = registeredHCPs.value.filter(
					(hcp) => hcp.staff_id !== hcpToRemove.value.staff_id
				);
				toast.success('Healthcare Professional removed successfully');
				closeRemoveModal();
			} catch (error) {
				console.error('Error removing Healthcare Professional:', error);
				toast.error(
					'Failed to remove Healthcare Professional. Please try again.'
				);
			} finally {
				loadingModal.value.hide();
			}
		}
	};

	const resetHCPForm = () => {
		hcpForm.value = {
			firstName: '',
			lastName: '',
			email: '',
		};
	};
</script>

<style scoped>
	/* Add any component-specific styles here */
</style>
