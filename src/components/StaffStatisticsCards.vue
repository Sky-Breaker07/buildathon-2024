<template>
	<div
		v-if="staffStats"
		class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
	>
		<!-- Super Admins -->
		<DashboardCard
			v-if="staffStats.counts.superAdmins > 0"
			icon="user-shield"
			title="Super Admins"
			:subtitle="`${staffStats.counts.superAdmins} staff member${
				staffStats.counts.superAdmins !== 1 ? 's' : ''
			}`"
			colorScheme="red"
			@click="openModal('superAdmins')"
		>
			<template #count>
				<CountUp
					:end-val="staffStats.counts.superAdmins"
					:duration="2"
				/>
			</template>
		</DashboardCard>

		<!-- Healthcare Professional Admins -->
		<DashboardCard
			v-if="staffStats.counts.healthCareProfessionals.admins > 0"
			icon="user-md"
			title="Head of Healthcare Professionals"
			:subtitle="`${
				staffStats.counts.healthCareProfessionals.admins
			} staff member${
				staffStats.counts.healthCareProfessionals.admins !== 1
					? 's'
					: ''
			}`"
			colorScheme="blue"
			@click="openModal('healthCareProfessionals.admins')"
		>
			<template #count>
				<CountUp
					:end-val="staffStats.counts.healthCareProfessionals.admins"
					:duration="2"
				/>
			</template>
		</DashboardCard>

		<!-- Healthcare Professionals by Profession -->
		<DashboardCard
			v-for="(
				professionData, profession
			) in healthCareProfessionalsByProfession"
			:key="profession"
			:icon="getProfessionIcon(profession)"
			:title="profession"
			:subtitle="`${professionData.count} staff member${
				professionData.count !== 1 ? 's' : ''
			}`"
			:colorScheme="getProfessionColor(profession)"
			@click="openModal(`healthCareProfessionals.${profession}`)"
		>
			<template #count>
				<CountUp
					:end-val="professionData.count"
					:duration="2"
				/>
			</template>
		</DashboardCard>

		<!-- Health Information Managers -->
		<DashboardCard
			v-if="staffStats.counts.healthInfoManagers > 0"
			icon="file-medical"
			title="Health Information Managers"
			:subtitle="`${staffStats.counts.healthInfoManagers} staff member${
				staffStats.counts.healthInfoManagers !== 1 ? 's' : ''
			}`"
			colorScheme="purple"
			@click="openModal('healthInfoManagers')"
		>
			<template #count>
				<CountUp
					:end-val="staffStats.counts.healthInfoManagers"
					:duration="2"
				/>
			</template>
		</DashboardCard>
	</div>

	<InfoModal
		v-if="showModal"
		@close="closeModal"
		class="font-poppins"
	>
		<template #header>
			<h3 class="text-lg font-semibold">
				{{ formatRole(selectedRole) }}
			</h3>
		</template>
		<template #body>
			<div class="max-h-96 overflow-y-auto">
				<ul>
					<li
						v-for="staff in getStaffList()"
						:key="staff.staff_id"
						class="mb-4"
					>
						{{ staff.name }} ({{ staff.staff_id }})
						<span
							v-if="staff.profession"
							class="text-gray-500 ml-2"
							>({{ staff.profession }})</span
						>
						<ul
							v-if="staff.subordinates"
							class="ml-4"
						>
							<li
								v-for="sub in staff.subordinates"
								:key="sub.staff_id"
								class="mb-2"
							>
								{{ sub.name }} ({{ sub.staff_id }})
								<span
									v-if="sub.profession"
									class="text-gray-500 ml-2"
									>({{ sub.profession }})</span
								>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</template>
	</InfoModal>
</template>

<script setup>
	import { ref, computed } from 'vue';
	import DashboardCard from './DashboardCards.vue';
	import InfoModal from './InfoModal.vue';
	import CountUp from 'vue-countup-v3';

	const props = defineProps({
		staffStats: {
			type: Object,
			required: true,
		},
	});

	const showModal = ref(false);
	const selectedRole = ref('');

	const formatRole = (role) => {
		const [category, subCategory] = role.split('.');
		if (
			category === 'healthCareProfessionals' &&
			subCategory !== 'admins'
		) {
			return subCategory;
		} else {
			return role
				.split('.')
				.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
				.join(' ');
		}
	};

	const openModal = (role) => {
		selectedRole.value = role;
		showModal.value = true;
	};

	const closeModal = () => {
		showModal.value = false;
	};

	const getStaffList = () => {
		const [category, subCategory] = selectedRole.value.split('.');
		if (subCategory) {
			if (
				category === 'healthCareProfessionals' &&
				subCategory !== 'admins'
			) {
				return props.staffStats.healthCareProfessionals.regular.filter(
					(staff) => staff.profession === subCategory
				);
			} else {
				return props.staffStats[category][subCategory];
			}
		} else {
			return props.staffStats[category];
		}
	};

	const healthCareProfessionalsByProfession = computed(() => {
		const professions = {};
		props.staffStats.healthCareProfessionals.regular.forEach((staff) => {
			if (staff.profession) {
				if (!professions[staff.profession]) {
					professions[staff.profession] = {
						count: 0,
						staff: [],
					};
				}
				professions[staff.profession].count++;
				professions[staff.profession].staff.push(staff);
			}
		});
		return professions;
	});

	const getProfessionIcon = (profession) => {
		switch (profession) {
			case 'Physician':
				return 'user-md';
			case 'Physiotherapist':
				return 'user-md';
			case 'Nurse':
				return 'user-nurse';
			case 'Pharmacist':
				return 'prescription-bottle-alt';
			case 'Radiologist':
				return 'x-ray';
			case 'Surgeon':
				return 'scalpel';
			default:
				return 'user-alt';
		}
	};

	const getProfessionColor = (profession) => {
		switch (profession) {
			case 'Physician':
				return 'green';
			case 'Physiotherapist':
				return 'green';
			case 'Nurse':
				return 'yellow';
			case 'Pharmacist':
				return 'indigo';
			case 'Radiologist':
				return 'pink';
			case 'Surgeon':
				return 'orange';
			default:
				return 'gray';
		}
	};
</script>
