<template>
	<div class="all-templates">
		<BackButton class="pt-4 pb-2" />
		<h1 class="title">Template Management</h1>
		<div class="template-grid">
			<template-card
				v-for="template in templates"
				:key="template.name"
				:template="template"
				@click="navigateTo(template.route)"
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
			route: 'AssessmentTemplate',
		},
		{
			name: 'Treatment Templates',
			description: 'Manage and create treatment templates',
			icon: 'ri-medicine-bottle-line',
			route: 'TreatmentTemplate',
		},
		{
			name: 'Discharge Templates',
			description: 'Manage and create discharge templates',
			icon: 'ri-door-open-line',
			route: 'DischargeTemplate',
		},
		{
			name: 'Evaluation Templates',
			description: 'Manage and create evaluation templates',
			icon: 'ri-file-text-line',
			route: 'EvaluationTemplate',
		},
		{
			name: 'Referral Templates',
			description: 'Manage and create referral templates',
			icon: 'ri-arrow-right-line',
			route: 'ReferralTemplate',
		},
	]);

	const navigateTo = (route) => {
		router.push({ name: route });
	};
</script>

<style scoped>
	.all-templates {
		padding: 2rem;
	}

	.title {
		font-size: 2.5rem;
		font-weight: 700;
		color: #2c3e50;
		margin-bottom: 2rem;
		text-align: center;
	}

	.template-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}
</style>
