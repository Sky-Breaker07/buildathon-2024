<template>
	<button
		@click="goBack"
		class="flex items-center gap-2 text-clrBlue hover:text-clrBlue-dark transition-colors duration-300 pl-[2.175rem] transition duration-500 ease-in-out hover:text-indigo-700"
	>
		<i class="bx bx-left-arrow-alt text-2xl"></i>
		<span class="font-poppins text-lg">Back</span>
	</button>
</template>

<script setup>
	import { useRouter } from 'vue-router';

	const router = useRouter();

	const goBack = () => {
		router.go(-1);
	};
</script>
