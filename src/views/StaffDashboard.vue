<template>
	<div
		v-if="currentUser"
		class="h-screen w-[90rem] mx-auto px-[2.175rem]"
	>
		<StaffDashBoardHeader />

		<!-- Main content -->
		<div class="w-full flex gap-4 overflow-x-hidden overflow-y-auto">
			<!-- AdminHCP -->
			<template v-if="isAdminHCP">
				<router-link
					to="#"
					@click.prevent="goToAdminSetup"
					class="flex items-center justify-center flex-col bg-clrBlue text-clrWhite font-poppins font-medium text-lg w-[20rem] h-[20rem] rounded-2xl"
				>
					Register/Remove
					{{ adminHCPProfessionPlural }}
				</router-link>

				<router-link
					to="#"
					@click.prevent="goToAllPatientsHCP"
					class="flex items-center justify-center flex-col bg-clrBlue text-clrWhite font-poppins font-medium text-lg w-[20rem] h-[20rem] rounded-2xl"
				>
					All Patients
				</router-link>
			</template>

			<!-- HIM specific items -->
			<template v-if="isHIM">
				<router-link
					to="#"
					@click.prevent="goToRegisterPatient"
					class="flex items-center justify-center flex-col bg-clrBlue text-clrWhite font-poppins font-medium text-lg w-[20rem] h-[20rem] rounded-2xl"
				>
					Register Patient
				</router-link>

				<router-link
					to="#"
					@click.prevent="goToAllPatientsHIM"
					class="flex items-center justify-center flex-col bg-clrBlue text-clrWhite font-poppins font-medium text-lg w-[20rem] h-[20rem] rounded-2xl"
				>
					All Patients
				</router-link>
			</template>

			<!-- Super Admin specific items -->
			<template v-if="isSuperAdmin">
				<router-link
					to="#"
					@click.prevent="goToOrgSetup"
					class="flex items-center justify-center flex-col bg-clrBlue text-clrWhite font-poppins font-medium text-lg w-[20rem] h-[20rem] rounded-2xl"
				>
					Organization Setup
				</router-link>
			</template>

			<!-- Add this new nav item for Healthcare Professionals -->
			<router-link
				v-if="isHCP"
				to="#"
				@click.prevent="goToAssignedPatients"
				class="flex items-center justify-center flex-col bg-clrBlue text-clrWhite font-poppins font-medium text-lg w-[20rem] h-[20rem] rounded-2xl"
			>
				My Patients
			</router-link>
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
	import StaffDashBoardHeader from '../components/StaffDashBoardHeader.vue';

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

	onMounted(async () => {
		await fetchCurrentUser();
	});

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

	const goToAllPatientsHCP = async () => {
		try {
			if (loadingModal.value) {
				loadingModal.value.show();
			}
			await router.push('/hcp/all-patients');
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
</script>
