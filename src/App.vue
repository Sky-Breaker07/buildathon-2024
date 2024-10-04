<template>
	<OrganizationHeader />
	<component :is="layout">
		<router-view />
	</component>
</template>

<script setup>
	import { computed, onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import { warmUp } from './utils/misc';
	import OrganizationHeader from './components/OrganizationHeader.vue';
	const route = useRoute();

	onMounted(async () => {
		const warmingUp = await warmUp();

		if (warmingUp) {
			warmingUp.message;
		}
	});

	const layout = computed(() => {
		return route.meta.layout || 'div';
	});
</script>

<style scoped></style>
