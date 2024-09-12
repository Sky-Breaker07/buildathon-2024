<template>
	<div class="header__btns">
		<button>{{ text }}</button>
	</div>
</template>

<script setup>
	defineProps({
		text: {
			type: String,
		},
	});
</script>

<style scoped>
	button {
		font-family: 'Poppins', sans-serif;
		font-weight: 800;
		font-size: 1.25rem;
		line-height: 1.875rem;
		border-radius: 6px;
		background-color: hsla(231, 100%, 74%, 1);
		color: hsla(0, 0%, 96%, 1);
		padding: 0.5rem 1.5rem;
	}
</style>
