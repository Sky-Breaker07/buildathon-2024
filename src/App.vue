<template>
	<OrganizationHeader />
	<component :is="layout">
		<router-view />
	</component>
</template>

<script setup>
	import { computed } from 'vue';
	import { useRoute } from 'vue-router';
	import { warmUp } from './utils/misc';
	import OrganizationHeader from './components/OrganizationHeader.vue'
	const route = useRoute();
	
	warmUp();
	const layout = computed(() => {
		return route.meta.layout || 'div';
	});
</script>



<style scoped></style>
