<template>
	<ul
		class="w-[10rem] min-h-[2rem] absolute -right-14 top-20 bg-clrWhite rounded-lg"
	>
		<li class="px-4 py-2">
			<router-link
				to="#"
				@click="logout"
				class="text-clrBlack text-lg font-medium leading-6 transition duration-500 ease-in-out hover:text-red-600"
			>
				Logout
			</router-link>
		</li>
	</ul>
</template>

<script setup>
	import { useStaffStore } from '../stores/staff-management';
	import { useRouter } from 'vue-router';
	import { useToast } from 'vue-toastification';
	import { removeToken } from '../utils/tokenUtils';

	const staffStore = useStaffStore();
	const router = useRouter();
	const toast = useToast();
	const logout = async () => {
		try {
			removeToken();
			staffStore.clearStaffData();
			router.push('/login');
			toast.success('Logged out successfully');
		} catch (error) {
			console.error('Error during logout:', error);
			toast.error('An error occurred during logout. Please try again.');
		}
	};
</script>
