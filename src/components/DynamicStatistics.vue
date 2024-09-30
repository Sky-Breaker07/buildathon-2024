<template>
	<div
		class="bg-white shadow-lg rounded-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl font-poppins"
	>
		<div class="flex items-center mb-4">
			<v-icon
				:name="icon"
				class="text-3xl mr-3 text-indigo-600"
			/>
			<h2 class="text-2xl font-bold">{{ title }}</h2>
		</div>
		<div
			v-if="loading"
			class="flex justify-center items-center h-64"
		>
			<v-icon
				name="ri-loader-4-line"
				class="animate-spin text-4xl text-indigo-600"
			/>
		</div>
		<div
			v-else-if="error"
			class="text-red-500 text-center"
		>
			{{ error }}
		</div>
		<div v-else>
			<div
				v-if="chartType && chartData"
				class="h-64"
			>
				<component
					:is="chartComponent"
					:data="chartData"
					:options="chartOptions"
				/>
			</div>
			<div class="text-center mt-4">
				<div
					v-if="Array.isArray(result)"
					class="grid grid-cols-2 gap-4"
				>
					<div
						v-for="(value, index) in result"
						:key="index"
						class="bg-gray-100 p-4 rounded-lg"
					>
						<p class="text-lg font-semibold">
							{{ chartData.labels[index] }}
						</p>
						<p class="text-3xl font-bold text-indigo-600">
							{{ value }}
						</p>
						<p class="text-sm text-gray-600">
							{{ ((value / totalPatients) * 100).toFixed(2) }}%
						</p>
					</div>
				</div>
				<div v-else>
					<p class="text-4xl font-bold text-indigo-600">
						{{ result }}
					</p>
					<p
						v-if="percentage !== null"
						class="text-lg mt-2"
					>
						{{ percentage.toFixed(2) }}% of total patients
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted, watch } from 'vue';
	import { Pie, Bar, Doughnut } from 'vue-chartjs';
	import {
		Chart as ChartJS,
		ArcElement,
		Tooltip,
		Legend,
		CategoryScale,
		LinearScale,
		BarElement,
	} from 'chart.js';
	import PatientStats from '../utils/patientStats';

	ChartJS.register(
		ArcElement,
		Tooltip,
		Legend,
		CategoryScale,
		LinearScale,
		BarElement
	);

	const props = defineProps({
		title: String,
		statType: String,
		params: Object,
		chartType: {
			type: String,
			default: null,
		},
		icon: {
			type: String,
			default: 'ri-bar-chart-box-line',
		},
	});

	const loading = ref(true);
	const error = ref(null);
	const result = ref(null);
	const totalPatients = ref(0);

	const percentage = computed(() => {
		if (result.value && totalPatients.value) {
			return (result.value / totalPatients.value) * 100;
		}
		return null;
	});

	const chartComponent = computed(() => {
		switch (props.chartType) {
			case 'pie':
				return Pie;
			case 'bar':
				return Bar;
			case 'doughnut':
				return Doughnut;
			default:
				return null;
		}
	});

	const chartData = computed(() => {
		if (!props.chartType || !result.value) return null;

		if (['pie', 'doughnut'].includes(props.chartType)) {
			if (Array.isArray(result.value)) {
				let labels, data;
				if (props.params.operator === 'custom') {
					if (props.params.field === 'age') {
						labels = props.params.value.map(category => category.label);
						data = result.value;
					} else if (props.params.field === 'occupation') {
						labels = ['Employed', 'Unemployed'];
						data = result.value;
					}
				} else {
					labels = props.params.value;
					data = result.value;
				}
				return {
					labels: labels,
					datasets: [
						{
							backgroundColor: [
								'#4F46E5',
								'#10B981',
								'#F59E0B',
								'#EF4444',
								'#6366F1',
								'#8B5CF6',
								'#EC4899',
								'#14B8A6',
								'#F97316',
								'#06B6D4'
							],
							data: data,
						},
					],
				};
			} else {
				return {
					labels: ['Selected Patients', 'Other Patients'],
					datasets: [
						{
							backgroundColor: ['#4F46E5', '#E5E7EB'],
							data: [
								result.value,
								totalPatients.value - result.value,
							],
						},
					],
				};
			}
		} else if (props.chartType === 'bar') {
			if (Array.isArray(result.value)) {
				return {
					labels: props.params.value,
					datasets: [
						{
							label: 'Number of Patients',
							backgroundColor: [
								'#4F46E5',
								'#10B981',
								'#F59E0B',
								'#EF4444',
							],
							data: result.value,
						},
					],
				};
			} else {
				return {
					labels: ['Selected Patients', 'Other Patients'],
					datasets: [
						{
							label: 'Number of Patients',
							backgroundColor: ['#4F46E5', '#E5E7EB'],
							data: [
								result.value,
								totalPatients.value - result.value,
							],
						},
					],
				};
			}
		}
		return null;
	});

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
	};

	const fetchData = async () => {
		try {
			loading.value = true;
			error.value = null;
			totalPatients.value = await PatientStats.getTotalPatients();
			
			if (props.params.operator === 'custom') {
				if (props.params.field === 'age') {
					result.value = await Promise.all(
						props.params.value.map(async (category) => {
							const minCount = await PatientStats.getPatientsByBiodata(
								'age',
								'gte',
								category.min
							);
							const maxCount = category.max < Infinity 
								? await PatientStats.getPatientsByBiodata('age', 'gte', category.max + 1)
								: 0;
							return minCount - maxCount;
						})
					);
				} else if (props.params.field === 'occupation') {
					const employed = await PatientStats.getPatientsByBiodata(
						'occupation',
						'nin',
						['Student', 'None', '']
					);
					const unemployed = totalPatients.value - employed;
					result.value = [employed, unemployed];
				}
			} else if (typeof PatientStats[props.statType] === 'function') {
				const { field, operator, value } = props.params;
				if (Array.isArray(value)) {
					result.value = await Promise.all(
						value.map((v) =>
							PatientStats[props.statType](field, operator, v)
						)
					);
				} else {
					result.value = await PatientStats[props.statType](
						field,
						operator,
						value
					);
				}
			} else {
				throw new Error(`Invalid statType: ${props.statType}`);
			}
		} catch (e) {
			console.error(e);
			error.value = `Failed to fetch statistics: ${e.message}`;
			result.value = null;
		} finally {
			loading.value = false;
		}
	};

	onMounted(fetchData);

	watch(() => props.params, fetchData, { deep: true });
</script>