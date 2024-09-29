<!-- src/views/PatientStatistics.vue -->
<template>
	<div class="container mx-auto px-4 py-8 font-poppins">
		<h1 class="text-4xl font-bold mb-8 text-center text-indigo-800">
			Patient Insights Dashboard
		</h1>

		<!-- Instructions Card -->
		<div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-lg shadow-md">
			<h2 class="text-xl font-semibold text-blue-800 mb-2">How to Use This Dashboard</h2>
			<ul class="list-disc list-inside text-blue-700 space-y-1">
				<li>View pre-defined patient statistics in the cards below</li>
				<li>Use the "Create Your Own Insight" section to explore custom data</li>
				<li>Select categories, conditions, and values to filter patient information</li>
				<li>Click "Generate Insight" to see your custom results</li>
			</ul>
		</div>

		<!-- Existing DynamicStatistics components -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<DynamicStatistics
				title="Total Patients"
				statType="getTotalPatients"
				:params="{}"
				icon="ri-user-line"
			/>

			<DynamicStatistics
				title="Patients Aged 40+"
				statType="getPatientsByBiodata"
				:params="{ field: 'age', operator: 'gte', value: 40 }"
				chartType="pie"
				icon="ri-user-star-line"
			/>

			<DynamicStatistics
				title="Gender Distribution"
				statType="getPatientsByBiodata"
				:params="{
					field: 'sex',
					operator: 'in',
					value: ['Male', 'Female'],
				}"
				chartType="bar"
				icon="ri-men-line"
			/>

			<DynamicStatistics
				title="Employed Patients"
				statType="getPatientsByBiodata"
				:params="{
					field: 'occupation',
					operator: 'ne',
					value: 'Student',
				}"
				chartType="pie"
				icon="ri-briefcase-line"
			/>

			<DynamicStatistics
				title="Marital Status Distribution"
				statType="getPatientsByBiodata"
				:params="{
					field: 'marital_status',
					operator: 'in',
					value: ['Single', 'Married', 'Divorced', 'Widowed'],
				}"
				chartType="bar"
				icon="ri-heart-2-line"
			/>
		</div>

		<!-- Custom Query Section -->
		<div class="mt-12 bg-white shadow-lg rounded-lg p-6 font-poppins">
			<h2 class="text-2xl font-bold mb-4 text-indigo-800">
				Create Your Own Insight
			</h2>
			<div class="flex flex-wrap gap-4 mb-4">
				<select
					v-model="customQuery.model"
					class="p-2 border rounded focus:ring-2 focus:ring-indigo-500 font-poppins"
					@change="updateFieldOptions"
				>
					<option value="" disabled selected>Select a category</option>
					<option
						v-for="model in Object.keys(queryableFields)"
						:key="model"
						:value="model"
					>
						{{ formatFieldName(model) }}
					</option>
				</select>
				<select
					v-model="customQuery.field"
					class="p-2 border rounded focus:ring-2 focus:ring-indigo-500 font-poppins"
					@change="updateOperatorOptions"
				>
					<option value="" disabled selected>Select a subcategory</option>
					<option
						v-for="field in currentFieldOptions"
						:key="field"
						:value="field"
					>
						{{ formatFieldName(field) }}
					</option>
				</select>
				<select
					v-model="customQuery.operator"
					class="p-2 border rounded focus:ring-2 focus:ring-indigo-500 font-poppins"
				>
					<option value="" disabled selected>Select a condition</option>
					<option
						v-for="op in currentOperatorOptions"
						:key="op.value"
						:value="op.value"
					>
						{{ op.label }}
					</option>
				</select>
				<input
					v-if="!['in', 'nin'].includes(customQuery.operator)"
					v-model="customQuery.value"
					:type="getInputType()"
					:placeholder="getPlaceholder()"
					class="p-2 border rounded focus:ring-2 focus:ring-indigo-500 font-poppins"
				/>
				<div
					v-else
					class="flex flex-col"
				>
					<div v-for="(val, index) in customQuery.values" :key="index" class="flex mb-2">
						<input
							v-model="customQuery.values[index]"
							:type="getInputType()"
							:placeholder="getPlaceholder()"
							class="p-2 border rounded-l focus:ring-2 focus:ring-indigo-500 font-poppins"
						/>
						<button
							@click="removeValue(index)"
							class="bg-red-500 text-white px-2 py-1 rounded-r hover:bg-red-600 transition-colors duration-300 font-poppins"
						>
							<v-icon name="ri-delete-bin-line" />
						</button>
					</div>
					<button
						@click="addValue"
						class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors duration-300 font-poppins"
					>
						<v-icon name="ri-add-line" class="mr-1" />
						Add Another Value
					</button>
				</div>
				<button
					@click="executeCustomQuery"
					class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors duration-300 font-poppins"
				>
					<v-icon name="ri-search-line" class="mr-1" />
					Generate Insight
				</button>
			</div>
			<DynamicStatistics
				v-if="showCustomResult"
				title="Your Custom Insight"
				:statType="getStatType()"
				:params="getCustomQueryParams()"
				chartType="pie"
				icon="ri-file-search-line"
			/>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue';
	import DynamicStatistics from '../components/DynamicStatistics.vue';
	import PatientStats from '../utils/patientStats';

	const queryableFields = ref({});
	const customQuery = ref({
		model: '',
		field: '',
		operator: 'eq',
		value: '',
		values: [''],
	});

	const showCustomResult = ref(false);

	const currentFieldOptions = computed(() => {
		if (
			customQuery.value.model &&
			queryableFields.value[customQuery.value.model]
		) {
			return getNestedFields(
				queryableFields.value[customQuery.value.model]
			);
		}
		return [];
	});

	const currentOperatorOptions = computed(() => {
		const fieldType = getFieldType(
			customQuery.value.model,
			customQuery.value.field
		);
		if (fieldType === 'Number') {
			return [
				{ value: 'eq', label: 'Equal to' },
				{ value: 'ne', label: 'Not equal to' },
				{ value: 'gt', label: 'More than' },
				{ value: 'gte', label: 'At least' },
				{ value: 'lt', label: 'Less than' },
				{ value: 'lte', label: 'At most' },
				{ value: 'in', label: 'Any of' },
				{ value: 'nin', label: 'None of' },
			];
		} else {
			return [
				{ value: 'eq', label: 'Is' },
				{ value: 'ne', label: 'Is not' },
				{ value: 'in', label: 'Any of' },
				{ value: 'nin', label: 'None of' },
			];
		}
	});

	onMounted(async () => {
		try {
			queryableFields.value = await PatientStats.getQueryableFields();
			if (Object.keys(queryableFields.value).length > 0) {
				customQuery.value.model = Object.keys(queryableFields.value)[0];
				updateFieldOptions();
			}
		} catch (error) {
			console.error('Error loading queryable fields:', error);
		}
	});

	const updateFieldOptions = () => {
		if (
			customQuery.value.model &&
			queryableFields.value[customQuery.value.model]
		) {
			const fields = getNestedFields(
				queryableFields.value[customQuery.value.model]
			);
			customQuery.value.field = fields.length > 0 ? fields[0] : '';
			updateOperatorOptions();
		}
	};

	const updateOperatorOptions = () => {
		customQuery.value.operator = currentOperatorOptions.value[0].value;
	};

	const getInputType = () => {
		const fieldType = getFieldType(
			customQuery.value.model,
			customQuery.value.field
		);
		if (fieldType === 'Number') return 'number';
		if (fieldType === 'Date') return 'date';
		if (fieldType === 'Boolean') return 'checkbox';
		return 'text';
	};

	const getFieldType = (model, field) => {
		if (model && field) {
			const nestedFields = getNestedFields(
				queryableFields.value[model],
				true
			);
			return nestedFields[field] || 'String';
		}
		return 'String';
	};

	const getNestedFields = (obj, isFlat = false, prefix = '') => {
		let fields = isFlat ? {} : [];
		for (const [key, value] of Object.entries(obj)) {
			if (
				typeof value === 'object' &&
				value !== null &&
				!Array.isArray(value)
			) {
				const nestedFields = getNestedFields(
					value,
					isFlat,
					`${prefix}${key}.`
				);
				if (isFlat) {
					Object.assign(fields, nestedFields);
				} else {
					fields = [...fields, ...nestedFields];
				}
			} else {
				if (isFlat) {
					fields[`${prefix}${key}`] =
						value === 'Unknown' ? 'String' : value;
				} else {
					fields.push(`${prefix}${key}`);
				}
			}
		}
		return fields;
	};

	const formatFieldName = (field) => {
		return field
			.split('.')
			.pop()
			.split('_')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	const getStatType = () => {
		// Ensure the model name matches exactly with the method name in PatientStats.js
		const modelName =
			customQuery.value.model === 'BioData'
				? 'Biodata'
				: customQuery.value.model;
		return `getPatientsBy${modelName}`;
	};

	const getCustomQueryParams = () => {
		return {
			field: customQuery.value.field,
			operator: customQuery.value.operator,
			value: ['in', 'nin'].includes(customQuery.value.operator)
				? customQuery.value.values
				: customQuery.value.value,
		};
	};

	const addValue = () => {
		customQuery.value.values.push('');
	};

	const executeCustomQuery = () => {
		showCustomResult.value = true;
	};

	const getPlaceholder = () => {
		const fieldType = getFieldType(customQuery.value.model, customQuery.value.field);
		if (fieldType === 'Number') return 'Enter a number';
		if (fieldType === 'Date') return 'Select a date';
		if (fieldType === 'Boolean') return 'True or False';
		return 'Enter a value';
	};

	const removeValue = (index) => {
		customQuery.value.values.splice(index, 1);
	};
</script>