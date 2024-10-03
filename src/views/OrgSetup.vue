<template>
	<div class="min-h-screen">
		<div class="w-[90rem] mx-auto px-8 py-2 font-poppins">
			<BackButton class="pb-4" />

			<StaffDashBoardHeader />
			<!-- Header and Dashboard button (unchanged) -->
			<div class="flex justify-between items-center mb-6">
				<h2 class="text-center text-3xl font-bold text-gray-900">
					Organization Setup
				</h2>
			</div>

			<!-- New: Instructions Card -->
			<div
				class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md shadow-md"
			>
				<h3 class="text-lg font-semibold text-blue-700 mb-2">
					Important Instructions
				</h3>
				<p class="text-blue-600 mb-2">For each staff member created:</p>
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
					Please ensure to communicate these details securely to each
					staff member and advise them to change their password upon
					first login.
				</p>
			</div>

			<!-- Professions Card (with minor enhancements) -->
			<div class="bg-white shadow-md rounded-lg p-6 mb-6">
				<h3 class="text-xl font-semibold mb-4 text-indigo-700">
					Manage Professions
				</h3>
				<div class="flex items-center space-x-4 mb-4">
					<input
						v-model="newProfession"
						type="text"
						class="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						placeholder="Enter profession name"
					/>
					<button
						@click="addProfession"
						class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Add
					</button>
				</div>
				<div class="flex flex-wrap gap-2 mt-4">
					<span
						v-for="profession in professions"
						:key="profession"
						class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm flex items-center transition-all hover:bg-indigo-200"
					>
						{{ profession }}
						<button
							@click="removeProfession(profession)"
							class="ml-2 text-indigo-600 hover:text-indigo-800 focus:outline-none transition-colors duration-200"
						>
							<svg
								class="h-4 w-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								></path>
							</svg>
						</button>
					</span>
				</div>
			</div>

			<!-- Head of Profession Registration (with minor enhancements) -->
			<div class="bg-white shadow-md rounded-lg p-6 mb-6">
				<h3 class="text-xl font-semibold mb-4 text-indigo-700">
					Register Head of Profession
				</h3>
				<form
					@submit.prevent="registerHeadOfProfession"
					class="space-y-4"
				>
					<div class="grid grid-cols-2 gap-4">
						<input
							v-model="headForm.firstName"
							type="text"
							required
							class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							placeholder="First Name"
						/>
						<input
							v-model="headForm.lastName"
							type="text"
							required
							class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							placeholder="Last Name"
						/>
					</div>
					<input
						v-model="headForm.email"
						type="email"
						required
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						placeholder="Email"
					/>
					<select
						v-model="headForm.profession"
						required
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
					>
						<option value="">Select Profession</option>
						<option
							v-for="profession in professions"
							:key="profession"
							:value="profession"
						>
							{{ profession }}
						</option>
					</select>
					<p class="text-sm text-gray-600 italic">
						Note: The staff ID will be generated automatically and
						used as the username.
					</p>
					<button
						type="submit"
						class="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
					>
						Register Head of Profession
					</button>
				</form>
			</div>

			<!-- Health Information Manager Registration (with minor enhancements) -->
			<div class="bg-white shadow-md rounded-lg p-6 mb-6">
				<h3 class="text-xl font-semibold mb-4 text-indigo-700">
					Register Health Information Manager
				</h3>
				<form
					@submit.prevent="registerHealthInformationManager"
					class="space-y-4"
				>
					<div class="grid grid-cols-2 gap-4">
						<input
							v-model="himForm.firstName"
							type="text"
							required
							class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							placeholder="First Name"
						/>
						<input
							v-model="himForm.lastName"
							type="text"
							required
							class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							placeholder="Last Name"
						/>
					</div>
					<input
						v-model="himForm.email"
						type="email"
						required
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						placeholder="Email"
					/>
					<p class="text-sm text-gray-600 italic">
						Note: The staff ID will be generated automatically and
						used as the username.
					</p>
					<button
						type="submit"
						class="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
					>
						Register Health Information Manager
					</button>
				</form>
			</div>

			<!-- Registered Staff Table (with enhancements) -->
			<div class="bg-white shadow-md rounded-lg p-6">
				<h3 class="text-xl font-semibold mb-4 text-indigo-700">
					Registered Staff
				</h3>
				<div class="overflow-x-auto">
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
									Role
								</th>
								<th
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Action
								</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200">
							<tr
								v-for="staff in registeredStaff"
								:key="staff.staff_id"
								class="hover:bg-gray-50 transition-colors duration-150"
							>
								<td
									class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
								>
									{{ staff.name }}
								</td>
								<td
									class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
								>
									{{ staff.staff_id }}
								</td>
								<td
									class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
								>
									{{ staff.email }}
								</td>
								<td
									class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
								>
									{{ staff.role }}
								</td>
								<td
									class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
								>
									<button
										@click="openRemoveModal(staff)"
										class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
									>
										Remove
										{{
											staff.role ===
											'Health Information Manager'
												? 'HIM'
												: 'Admin'
										}}
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<!-- Remove Admin Modal (with minor enhancements) -->
			<teleport to="body">
				<div
					v-if="showRemoveModal"
					class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
				>
					<div class="bg-white p-6 rounded-lg max-w-md w-full">
						<h2 class="text-xl font-bold mb-4 text-indigo-700">
							Confirm Staff Removal
						</h2>
						<p class="mb-4">
							Are you sure you want to remove
							{{ staffToRemove?.name }} as
							{{
								staffToRemove?.role ===
								'Health Information Manager'
									? 'a Health Information Manager'
									: 'an admin'
							}}?
						</p>
						<p class="mb-4">
							To confirm, please type the staff ID:
							<strong class="text-indigo-600">{{
								staffToRemove?.staff_id
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
								@click="removeAdmin"
								:disabled="
									confirmationInput !==
									staffToRemove?.staff_id
								"
								class="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50 hover:bg-red-600 transition-colors duration-200"
							>
								Remove Staff
							</button>
						</div>
					</div>
				</div>
			</teleport>
		</div>
	</div>
	<LoadingModal ref="loadingModal" />
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import { useStaffStore } from '../stores/staff-management';
	import {
		registerAdminHCP,
		registerHIM,
		getAdminHCPs,
		getAllHIMs,
		removeAdminHCP,
		removeHIM,
	} from '../utils/staffManagement';
	import { useToast } from 'vue-toastification';
	import { getToken } from '../utils/tokenUtils';
	import LoadingModal from '../components/LoadingModal.vue';
	import BackButton from '../components/BackButton.vue';
	import StaffDashBoardHeader from '../components/StaffDashBoardHeader.vue';

	const toast = useToast();
	const staffStore = useStaffStore();
	const loadingModal = ref(null);

	const professions = ref([]);
	const newProfession = ref('');
	const headForm = ref({
		firstName: '',
		lastName: '',
		email: '',
		profession: '',
	});
	const himForm = ref({
		firstName: '',
		lastName: '',
		email: '',
	});
	const registeredStaff = ref([]);
	const showRemoveModal = ref(false);
	const staffToRemove = ref(null);
	const confirmationInput = ref('');

	onMounted(async () => {
		await fetchRegisteredStaff();
	});

	const addProfession = () => {
		if (
			newProfession.value &&
			!professions.value.includes(newProfession.value)
		) {
			professions.value.push(capitalizeFirstLetter(newProfession.value));
			newProfession.value = '';
		}
	};

	const removeProfession = (profession) => {
		professions.value = professions.value.filter((p) => p !== profession);
	};

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const registerHeadOfProfession = async () => {
		try {
			loadingModal.value.show();
			const token = getToken();
			if (!token) {
				throw new Error('No authentication token found');
			}
			const response = await registerAdminHCP(headForm.value, token);
			if (
				response.data &&
				response.data.status === 'Success' &&
				response.data.data.adminHealthcareProfessional
			) {
				toast.success(
					`${headForm.value.firstName} ${headForm.value.lastName} registered successfully as the Head of ${headForm.value.profession}s`
				);
				staffStore.addAdminHealthcareProfessional(
					response.data.data.adminHealthcareProfessional
				);
				await fetchRegisteredStaff();
				resetHeadForm();
			} else {
				console.error('Unexpected response format:', response);
				toast.error(
					'Failed to register Head of Profession. Please try again.'
				);
			}
		} catch (error) {
			console.error('Error registering Head of Profession:', error);
			toast.error(
				'Failed to register Head of Profession. Please try again.'
			);
		} finally {
			loadingModal.value.hide();
		}
	};

	const registerHealthInformationManager = async () => {
		try {
			loadingModal.value.show();
			const token = getToken();
			if (!token) {
				throw new Error('No authentication token found');
			}
			const response = await registerHIM(himForm.value, token);
			if (
				response.data &&
				response.data.status === 'Success' &&
				response.data.data.healthInformationManager
			) {
				toast.success(
					`${himForm.value.firstName} ${himForm.value.lastName} registered successfully as Health Information Manager`
				);
				staffStore.addHealthInformationManager(
					response.data.data.healthInformationManager
				);
				await fetchRegisteredStaff();
				resetHIMForm();
			} else {
				console.error('Unexpected response format:', response);
				toast.error(
					'Failed to register Health Information Manager. Please try again.'
				);
			}
		} catch (error) {
			console.error(
				'Error registering Health Information Manager:',
				error
			);
			toast.error(
				'Failed to register Health Information Manager. Please try again.'
			);
		} finally {
			loadingModal.value.hide();
		}
	};

	const resetHeadForm = () => {
		headForm.value = {
			firstName: '',
			lastName: '',
			email: '',
			profession: '',
		};
	};

	const resetHIMForm = () => {
		himForm.value = {
			firstName: '',
			lastName: '',
			email: '',
		};
	};

	const fetchRegisteredStaff = async () => {
		try {
			loadingModal.value.show();
			const [adminHCPs, hims] = await Promise.all([
				getAdminHCPs(),
				getAllHIMs(),
			]);
			registeredStaff.value = [
				...(
					adminHCPs.data?.data?.adminHealthcareProfessionals || []
				).map((hcp) => ({
					...hcp,
					role: `Head of ${hcp.profession}s`,
				})),
				...(hims.data?.data?.healthInformationManagers || []).map(
					(him) => ({
						...him,
						role: 'Health Information Manager',
					})
				),
			];
		} catch (error) {
			console.error('Error fetching registered staff:', error);
			toast.error('Failed to fetch registered staff. Please try again.');
		} finally {
			loadingModal.value.hide();
		}
	};

	const openRemoveModal = (staff) => {
		staffToRemove.value = staff;
		showRemoveModal.value = true;
		confirmationInput.value = '';
	};

	const closeRemoveModal = () => {
		showRemoveModal.value = false;
		staffToRemove.value = null;
		confirmationInput.value = '';
	};

	const removeAdmin = async () => {
		if (confirmationInput.value === staffToRemove.value.staff_id) {
			try {
				loadingModal.value.show();
				const token = getToken();
				const staffName = staffToRemove.value.name;
				if (staffToRemove.value.role === 'Health Information Manager') {
					await removeHIM(staffToRemove.value.staff_id, token);
					staffStore.removeHealthInformationManager(
						staffToRemove.value.staff_id
					);
				} else {
					await removeAdminHCP(staffToRemove.value.staff_id, token);
					staffStore.removeAdminHealthcareProfessional(
						staffToRemove.value.staff_id
					);
				}
				await fetchRegisteredStaff();
				closeRemoveModal();
				toast.success(`${staffName} has been removed successfully.`);
			} catch (error) {
				console.error('Error removing staff:', error);
				toast.error('Failed to remove staff. Please try again.');
			} finally {
				loadingModal.value.hide();
			}
		}
	};
</script>
