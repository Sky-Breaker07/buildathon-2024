<template>
	<header class="w-full border border-clrOffWhite border-solid">
		<div class="w-[90rem] mx-auto px-[2.175rem] py-[1rem]">
			<nav class="flex items-center justify-between">
				<div class="flex items-center gap-[0.5rem]">
					<img
						src="../assets/images/Logo.svg"
						alt="Logo"
						class="w-[2.375rem] h-[1.8125rem]"
					/>
					<span
						class="font-afacad font-bold text-2xl leading-8 text-clrBlue"
					>
						CareLog
					</span>
				</div>

				<p
					class="font-afacad text-clrBlack font-bold text-2xl leading-8"
				>
					{{ organizationName }}
				</p>

				<div class="header__btns">
					<ButtonComponent
						v-if="!currentUser"
						text="Login"
					/>

					<div
						v-else
						class="flex items-center gap-2"
					>
						<div
							class="w-[2.875rem] h-[2.875rem] rounded-full bg-clrOffWhite"
						></div>
						<button
							class="w-[2.875rem] h-[2.875rem] rounded-full text-clrOffWhite hover:text-offWhiteAlt transition-colors duration-500 ease"
						>
							<i class="bx bx-cog text-[2.875rem]"></i>
						</button>
					</div>
				</div>
			</nav>
		</div>
	</header>
</template>

<script setup>
	import { computed } from 'vue';
	import { useStaffStore } from '../stores/staff-management';
	import { storeToRefs } from 'pinia';
	import ButtonComponent from './ButtonComponent.vue';

	const staffStore = useStaffStore();
	const { currentUser } = storeToRefs(staffStore);

	const organizationName = computed(
		() => currentUser.value?.organization?.name || ''
	);
</script>
