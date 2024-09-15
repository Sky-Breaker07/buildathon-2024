<template>
	<div
		v-if="currentUser"
		class="min-h-screen p-4 sm:p-6 lg:p-8"
	>
		<StaffDashBoardHeader />

		<!-- Main content -->
		<div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			<!-- AdminHCP -->
			<template v-if="isAdminHCP">
				<DashboardCard
					icon="user-plus"
					title="Register/Remove"
					:subtitle="adminHCPProfessionPlural"
					@click="goToAdminSetup"
					colorScheme="blue"
				/>
				<DashboardCard
					icon="users"
					title="All Patients"
					subtitle="View and manage patient records"
					@click="goToAllPatientsHCP"
					colorScheme="green"
				/>
				<DashboardCard
					icon="clipboard-list"
					:title="`Manage ${currentUser.profession} Templates`"
					subtitle="Create and edit templates"
					@click="goToManageTemplates"
					colorScheme="purple"
				/>
			</template>

			<!-- HIM specific items -->
			<template v-if="isHIM">
				<DashboardCard
					icon="user-plus"
					title="Register Patient"
					subtitle="Add new patient to the system"
					@click="goToRegisterPatient"
					colorScheme="blue"
				/>
				<DashboardCard
					icon="users"
					title="All Patients"
					subtitle="View and manage patient records"
					@click="goToAllPatientsHIM"
					colorScheme="green"
				/>
			</template>

			<!-- Super Admin specific items -->
			<template v-if="isSuperAdmin">
				<DashboardCard
					icon="cog"
					title="Organization Setup"
					subtitle="Configure organization settings"
					@click="goToOrgSetup"
					colorScheme="red"
				/>
			</template>

			<!-- Add this new nav item for Healthcare Professionals -->
			<DashboardCard
				v-if="isHCP"
				icon="user-md"
				title="My Patients"
				subtitle="View and manage assigned patients"
				@click="goToAssignedPatients"
				colorScheme="yellow"
			/>

			<!-- Add this card for Patient Statistics -->
			<DashboardCard
				v-if="isHIM || isSuperAdmin || isAdminHCP"
				icon="chart-bar"
				title="Patient Statistics"
				subtitle="View detailed patient statistics"
				@click="goToPatientStats"
				colorScheme="indigo"
			/>
		</div>

		<!-- Add this new section for Staff Statistics -->
		<div
			v-if="isSuperAdmin && staffStats.length !== 0"
			class="mt-8"
		>
			<h2 class="text-2xl font-semibold mb-4">Staff Statistics</h2>
			<StaffStatisticsCards :staffStats="staffStats" />
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
	import { storeToRefs } from 'pinia';
	import LoadingModal from '../components/LoadingModal.vue';
	import { useToast } from 'vue-toastification';
	import StaffDashBoardHeader from '@/components/StaffDashBoardHeader.vue';
	import DashboardCard from '@/components/DashboardCards.vue';
	import StaffStatisticsCards from '@/components/StaffStatisticsCards.vue';
	import staffStatsUtil from '@/utils/staffStats';

	const router = useRouter();
	const staffStore = useStaffStore();
	const { currentUser } = storeToRefs(staffStore);
	const toast = useToast();
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

	const isHCP = computed(
		() => currentUser.value?.role === 'HealthCareProfessional'
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

	const staffStats = ref(null);

	onMounted(async () => {
		await fetchCurrentUser();
		if (isSuperAdmin.value) {
			await fetchStaffStatistics();
		}
	});

	const fetchStaffStatistics = async () => {
		try {
			loadingModal.value.show();
			const response = await staffStatsUtil.getStaffStatistics();
			staffStats.value = response;
		} catch (error) {
			console.error('Error fetching staff statistics:', error);
			toast.error('Failed to fetch staff statistics. Please try again.');
		} finally {
			loadingModal.value.hide();
		}
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

	const goToManageTemplates = async () => {
		try {
			if (loadingModal.value) {
				loadingModal.value.show();
			}
			await router.push('/dashboard/templates');
		} catch (error) {
			console.error('Error navigating to Manage Templates:', error);
			toast.error(
				'Failed to navigate to Manage Templates. Please try again.'
			);
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

	const goToAllPatientsHCP = async () => {
		try {
			if (loadingModal.value) {
				loadingModal.value.show();
			}
			await router.push('/dashboard/all-patients');
		} catch (error) {
			console.error('Error navigating to All Patients (HCP):', error);
			toast.error(
				'Failed to navigate to All Patients (HCP). Please try again.'
			);
		} finally {
			if (loadingModal.value) {
				loadingModal.value.hide();
			}
		}
	};

	const goToAllPatientsHIM = async () => {
		try {
			if (loadingModal.value) {
				loadingModal.value.show();
			}
			await router.push('/patients');
		} catch (error) {
			console.error('Error navigating to All Patients (HIM):', error);
			toast.error(
				'Failed to navigate to All Patients (HIM). Please try again.'
			);
		} finally {
			if (loadingModal.value) {
				loadingModal.value.hide();
			}
		}
	};

	const goToAssignedPatients = async () => {
		try {
			if (loadingModal.value) {
				loadingModal.value.show();
			}
			await router.push('/dashboard/assigned-patients');
		} catch (error) {
			console.error('Error navigating to Assigned Patients:', error);
			toast.error(
				'Failed to navigate to Assigned Patients. Please try again.'
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

	// Add this method in the <script setup> section
	const goToPatientStats = async () => {
		try {
			if (loadingModal.value) {
				loadingModal.value.show();
			}
			await router.push('/dashboard/patient-stats');
		} catch (error) {
			console.error('Error navigating to Patient Statistics:', error);
			toast.error(
				'Failed to navigate to Patient Statistics. Please try again.'
			);
		} finally {
			if (loadingModal.value) {
				loadingModal.value.hide();
			}
		}
	};
</script>
