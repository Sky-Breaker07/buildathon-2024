<template>
	<header
		class="w-full border border-clrOffWhite border-solid bg-white"
		:class="{ 'fixed z-50': route.path === '/' }"
	>
		<div class="relative w-[90rem] mx-auto px-[2.175rem] py-[1.5rem]">
			<nav class="flex items-center justify-between">
				<router-link
					:to="{ path: route.path === '/' ? '/dashboard' : '' }"
				>
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
				</router-link>
				<p
					class="font-afacad text-clrBlack font-bold text-2xl leading-8"
				>
					{{ organizationName }}
				</p>

				<ul
					v-if="!currentUser && route.path === '/'"
					class="flex space-x-6 font-poppins"
				>
					<li>
						<a
							href="#features"
							class="text-gray-600 font-semibold hover:text-blue-600 transition duration-300"
							>Features</a
						>
					</li>
					<li>
						<a
							href="#about"
							class="text-gray-600 font-semibold hover:text-blue-600 transition duration-300"
							>About</a
						>
					</li>
					<li>
						<a
							href="#contact"
							class="text-gray-600 font-semibold hover:text-blue-600 transition duration-300"
							>Contact</a
						>
					</li>
				</ul>

				<div
					v-if="currentUser"
					class="flex items-center gap-2"
				>
					<router-link
						to="/dashboard"
						title="Dashboard"
						class="w-[2.375rem] h-[2.375rem] rounded-full text-clrOffWhite hover:text-offWhiteAlt transition-colors duration-500 ease"
					>
						<i class="bx bxs-dashboard text-[2.375rem]"></i
					></router-link>
					<button
						title="Settings"
						class="w-[2.375rem] h-[2.375rem] rounded-full text-clrOffWhite hover:text-offWhiteAlt transition-colors duration-500 ease"
						@click="
							isSettingsDropdownOpen = !isSettingsDropdownOpen
						"
					>
						<i class="bx bx-cog text-[2.375rem]"></i>
					</button>
				</div>
			</nav>

			<SettingsDropdown
				:isOpen="isSettingsDropdownOpen"
				@close="isSettingsDropdownOpen = false"
			/>
		</div>
	</header>
</template>

<script setup>
	import { computed, ref } from 'vue';
	import { useStaffStore } from '../stores/staff-management';
	import { storeToRefs } from 'pinia';
	import SettingsDropdown from './SettingsDropdown.vue';
	import { useRoute } from 'vue-router';

	const route = useRoute();

	const staffStore = useStaffStore();
	const { currentUser } = storeToRefs(staffStore);

	const organizationName = computed(
		() => currentUser.value?.organization?.name || ''
	);

	const isSettingsDropdownOpen = ref(false);
</script>
