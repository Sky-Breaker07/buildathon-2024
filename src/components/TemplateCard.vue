<template>
	<div
		class="template-card"
		:class="{ 'template-card--hover': isHovered }"
		@mouseenter="isHovered = true"
		@mouseleave="isHovered = false"
	>
		<div class="template-card__icon">
			<v-icon
				:name="template.icon"
				scale="3"
			/>
		</div>
		<h2 class="template-card__title">{{ template.name }}</h2>
		<p class="template-card__description">{{ template.description }}</p>
		<button
			class="template-card__button bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
			@click="$emit('click')"
		>
			<v-icon name="ri-settings-line" class="mr-2" />
			Manage Templates
		</button>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { OhVueIcon as VIcon } from 'oh-vue-icons';

	defineProps({
		template: {
			type: Object,
			required: true,
		},
	});

	const isHovered = ref(false);
</script>

<style scoped>
	.template-card {
		@apply bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-300 ease-in-out;
	}

	.template-card--hover {
		@apply transform -translate-y-1 shadow-lg;
	}

	.template-card__icon {
		@apply mb-4 text-blue-500;
	}

	.template-card__title {
		@apply text-xl font-semibold text-gray-800 mb-3;
	}

	.template-card__description {
		@apply text-base text-gray-600 mb-6;
	}

	.template-card__button {
		@apply mt-auto;
	}
</style>
