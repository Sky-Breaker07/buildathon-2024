<template>
	<div
		@click="$emit('click')"
		class="font-poppins rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
		:class="colorClasses"
	>
		<div class="p-6 flex flex-col items-center text-center">
			<div
				class="rounded-full p-3 mb-4"
				:class="iconBackgroundClass"
			>
				<i :class="`fas fa-${icon} text-2xl ${iconColorClass}`"></i>
			</div>
			<h2
				class="text-xl font-semibold mb-2"
				:class="textColorClass"
			>
				{{ title }}
			</h2>
			<p :class="subtitleColorClass">{{ subtitle }}</p>
		</div>
	</div>
</template>

<script setup>
	import { computed } from 'vue';

	const props = defineProps({
		icon: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		subtitle: {
			type: String,
			required: true,
		},
		colorScheme: {
			type: String,
			default: 'blue',
			validator: (value) =>
				[
					'blue',
					'green',
					'red',
					'yellow',
					'purple',
					'indigo',
					'teal',
				].includes(value),
		},
	});

	const colorClasses = computed(() => {
		const colors = {
			blue: 'bg-blue-50',
			green: 'bg-green-50',
			purple: 'bg-purple-50',
			red: 'bg-red-50',
			yellow: 'bg-yellow-50',
		};
		return colors[props.colorScheme];
	});

	const iconBackgroundClass = computed(() => {
		const colors = {
			blue: 'bg-blue-200',
			green: 'bg-green-200',
			purple: 'bg-purple-200',
			red: 'bg-red-200',
			yellow: 'bg-yellow-200',
		};
		return colors[props.colorScheme];
	});

	const iconColorClass = computed(() => {
		const colors = {
			blue: 'text-blue-600',
			green: 'text-green-600',
			purple: 'text-purple-600',
			red: 'text-red-600',
			yellow: 'text-yellow-600',
		};
		return colors[props.colorScheme];
	});

	const textColorClass = computed(() => {
		const colors = {
			blue: 'text-blue-800',
			green: 'text-green-800',
			purple: 'text-purple-800',
			red: 'text-red-800',
			yellow: 'text-yellow-800',
		};
		return colors[props.colorScheme];
	});

	const subtitleColorClass = computed(() => {
		const colors = {
			blue: 'text-blue-600',
			green: 'text-green-600',
			purple: 'text-purple-600',
			red: 'text-red-600',
			yellow: 'text-yellow-600',
		};
		return colors[props.colorScheme];
	});
</script>
