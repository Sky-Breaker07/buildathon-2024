<template>
	<div class="flex flex-col gap-2 mb-6 px-[2.175rem]">
		<div class="flex gap-6 items-baseline">
			<h2 class="font-afacad font-semibold text-[2.5rem] text-clrBlack">
				Welcome, {{ staffName }}
			</h2>
			<p class="font-poppins font-normal text-clrBlack text-[1.685rem]">
				({{ userTitle }})
			</p>
		</div>

		<p class="font-poppins font-normal text-offWhiteAlt text-[1.5rem]">
			<span>ID: </span>
			<span class="italic">{{ currentUser?.staff_id }}</span>
		</p>
	</div>
</template>

<script setup>
	import { useStaffStore } from '../stores/staff-management';
	import { storeToRefs } from 'pinia';
	import { computed } from 'vue';

	const staffStore = useStaffStore();
	const { currentUser } = storeToRefs(staffStore);

	const staffName = computed(() => {
		return `${currentUser?.value?.firstName} ${currentUser?.value?.lastName}`;
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
</script>
