<template>
	<div class="all-templates">
		<BackButton class="pt-4 pb-2" />
		<h1 class="title font-poppins text-clrBlue">Template Management</h1>
		<div class="template-grid font-poppins">
			<template-card
				v-for="template in templates"
				:key="template.name"
				:template="template"
				@click="navigateTo(template.type)"
			/>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	import TemplateCard from '@/components/TemplateCard.vue';
	import BackButton from '../../../components/BackButton.vue';
	const router = useRouter();

	const templates = ref([
		{
			name: 'Assessment Templates',
			description: 'Manage and create assessment templates',
			icon: 'ri-clipboard-line',
			type: 'assessment',
		},
		{
			name: 'Treatment Templates',
			description: 'Manage and create treatment templates',
			icon: 'ri-medicine-bottle-line',
			type: 'treatment',
		},
		{
			name: 'Discharge Templates',
			description: 'Manage and create discharge templates',
			icon: 'ri-door-open-line',
			type: 'discharge',
		},
		{
			name: 'Evaluation Templates',
			description: 'Manage and create evaluation templates',
			icon: 'ri-file-text-line',
			type: 'evaluation',
		},
		{
			name: 'Referral Templates',
			description: 'Manage and create referral templates',
			icon: 'ri-arrow-right-line',
			type: 'referral',
		},
	]);

	const navigateTo = (type) => {
		router.push({ name: 'Templates', params: { type } });
	};
</script>

<style scoped>
	.all-templates {
		padding: 2rem;
	}

	.title {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 2rem;
		text-align: center;
	}

	.template-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}
</style>
