<template>
	<div
		v-if="currentUser"
		class="px-[2.175rem]"
	>
		<StaffDashBoardHeader />
		<div v-if="isHIM">
			<HealthInformationManager />
		</div>
		<div class="flex-1 overflow-x-hidden overflow-y-auto">
			<div class="container mx-auto px-6 py-8">
				<h3 class="text-3xl font-medium text-gray-700">
					Welcome, {{ currentUser.firstName }}
					{{ currentUser.lastName }}
				</h3>
				<div class="mt-4">
					<div class="flex flex-wrap -mx-6">
						<div class="w-full px-6 sm:w-1/2 xl:w-1/3">
							<div
								class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white"
							>
								<div
									class="p-3 rounded-full bg-indigo-600 bg-opacity-75"
								>
									<svg
										class="h-8 w-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										></path>
									</svg>
								</div>
								<div class="mx-5">
									<h4
										class="text-2xl font-semibold text-gray-700"
									>
										{{ currentUser.staff_id }}
									</h4>
									<div class="text-gray-500">Staff ID</div>
								</div>
							</div>
						</div>
						<div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
							<div
								class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white"
							>
								<div
									class="p-3 rounded-full bg-green-600 bg-opacity-75"
								>
									<svg
										class="h-8 w-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
										></path>
									</svg>
								</div>
								<div class="mx-5">
									<h4
										class="text-2xl font-semibold text-gray-700"
									>
										{{ userTitle }}
									</h4>
									<div class="text-gray-500">Position</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div
		v-else
		class="flex items-center justify-center h-screen bg-gray-100"
	>
		<p class="text-xl text-gray-600">Loading...</p>
	</div>
	<LoadingModal ref="loadingModal" />
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue';
	import { useRouter } from 'vue-router';
	import { useStaffStore } from '../stores/staff-management';
	import { removeToken } from '../utils/tokenUtils';
	import { storeToRefs } from 'pinia';
	import LoadingModal from '../components/LoadingModal.vue';
	import { useToast } from 'vue-toastification';
	import StaffDashBoardHeader from '../components/StaffDashBoardHeader.vue';
	import HealthInformationManager from '../components/HealthInformationManager.vue';
	const router = useRouter();
	const staffStore = useStaffStore();
	const { currentUser } = storeToRefs(staffStore);
	const toast = useToast();

	const sidebarCollapsed = ref(false);
	const loadingModal = ref(null);

	const isAdminHCP = computed(
		() =>
			currentUser.value?.role === 'HealthCareProfessional' &&
			currentUser.value?.isAdmin
	);

	const isSuperAdmin = computed(
		() => currentUser.value?.role === 'SuperAdmin'
	);

	const isHIM = computed(
		() => currentUser.value?.role === 'HealthInformationManager'
	);

	const adminHCPProfessionPlural = computed(() => {
		if (isAdminHCP.value && currentUser.value?.profession) {
			const profession = currentUser.value.profession;
			// Handle special cases for plural forms
			if (profession.endsWith('y')) {
				return profession.slice(0, -1) + 'ists';
			} else if (profession.endsWith('s')) {
				return profession;
			} else {
				return profession + 's';
			}
		}
		return '';
	});

	const userTitle = computed(() => {
		if (!currentUser.value) return '';
		if (currentUser.value.role === 'SuperAdmin')
			return 'Chief Executive Officer';
		if (currentUser.value.role === 'HealthCareProfessional')
			return currentUser.value.profession || 'Healthcare Professional';
		if (currentUser.value.role === 'HealthInformationManager')
			return 'Health Information Manager';
		return currentUser.value.role;
	});

	onMounted(async () => {
		await fetchCurrentUser();
	});

	const toggleSidebar = () => {
		sidebarCollapsed.value = !sidebarCollapsed.value;
	};

	const goToAdminSetup = async () => {
		try {
			if (loadingModal.value) {
				loadingModal.value.show();
			}
			await router.push('/admin-setup');
		} catch (error) {
			console.error('Error navigating to Admin Setup:', error);
			toast.error('Failed to navigate to Admin Setup. Please try again.');
		} finally {
			if (loadingModal.value) {
				loadingModal.value.hide();
			}
		}
	};

	const goToOrgSetup = async () => {
		try {
			if (loadingModal.value) {
				loadingModal.value.show();
			}
			await router.push('/setup');
		} catch (error) {
			console.error('Error navigating to Organization Setup:', error);
			toast.error(
				'Failed to navigate to Organization Setup. Please try again.'
			);
		} finally {
			if (loadingModal.value) {
				loadingModal.value.hide();
			}
		}
	};

	const goToRegisterPatient = async () => {
		try {
			if (loadingModal.value) {
				loadingModal.value.show();
			}
			await router.push('/patient/register');
		} catch (error) {
			console.error('Error navigating to Register Patient:', error);
			toast.error(
				'Failed to navigate to Register Patient. Please try again.'
			);
		} finally {
			if (loadingModal.value) {
				loadingModal.value.hide();
			}
		}
	};

	const goToAllPatients = async () => {
		try {
			if (loadingModal.value) {
				loadingModal.value.show();
			}
			await router.push('/patients');
		} catch (error) {
			console.error('Error navigating to All Patients:', error);
			toast.error(
				'Failed to navigate to All Patients. Please try again.'
			);
		} finally {
			if (loadingModal.value) {
				loadingModal.value.hide();
			}
		}
	};

	const fetchCurrentUser = async () => {
		try {
			loadingModal.value.show();
			await staffStore.fetchCurrentUser();
		} catch (error) {
			console.error('Error fetching current user:', error);
			toast.error('Failed to fetch user data. Please try again.');
			router.push('/login');
		} finally {
			loadingModal.value.hide();
		}
	};

	const logout = async () => {
		try {
			loadingModal.value.show();
			removeToken();
			staffStore.clearStaffData();
			router.push('/login');
			toast.success('Logged out successfully');
		} catch (error) {
			console.error('Error during logout:', error);
			toast.error('An error occurred during logout. Please try again.');
		} finally {
			loadingModal.value.hide();
		}
	};
</script>
