<template>
	<div class="flex flex-col gap-2 mb-6 px-[2.175rem]">
		<div class="flex gap-6 items-baseline">
			<h2 class="font-afacad font-semibold text-[2.5rem] text-clrBlack">
				Welcome, {{ staffName }}
			</h2>
			<p class="font-poppins font-normal text-clrBlack text-[1.685rem]">
				({{ splitString(currentUser?.role) }})
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

	const splitString = (str) => {
		return str
			.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
			.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
			.trim();
	};
</script>
