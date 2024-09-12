<template>
	<label :for="id">
		<input
			:type="type"
			:id="id"
			:placeholder="placeholder"
			:model="model"
			@input="updateValue"
			required
			class="w-full font-poppins font-normal text-l leading-7 text-clrBlack outline-0"
		/>
	</label>
</template>

<script setup>
	import { ref, watch } from 'vue';

	const props = defineProps({
		id: {
			type: String,
			required: true,
		},

		type: {
			type: String,
			required: true,
		},

		placeholder: {
			type: String,
			required: true,
		},

		modelValue: {
			type: String,
			required: true,
		},
	});

	const model = ref(props.modelValue);
	const emit = defineEmits(['update:modelValue']);

	watch(
		() => props.modelValue,
		(newValue) => {
			model.value = newValue;
		}
	);

	const updateValue = (e) => {
		model.value = e.target.value;
		emit('update:modelValue', model.value);
	};
</script>

<style scoped>
	label {
		@apply border-solid border-clrOffWhite border rounded-[0.5rem] mb-[0.5rem] flex items-center px-[1rem] py-[0.5rem] w-full;
	}
</style>
