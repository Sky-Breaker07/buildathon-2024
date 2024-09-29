<template>
	<div
		v-if="currentUser"
		class="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-lg"
	>
		<BackButton class="pt-4 pb-2" />
		<h1
			class="text-4xl font-bold mb-8 text-indigo-700 border-b-2 border-indigo-200 pb-4"
		>
			Treatment Template Builder
		</h1>

		<div class="mb-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md shadow-md">
			<h3 class="text-lg font-semibold text-blue-700 mb-2">How to Use This Builder</h3>
			<ul class="list-disc list-inside text-blue-600 space-y-2">
				<li>Start by giving your template a name and description.</li>
				<li>Add sections to organize your treatment.</li>
				<li>Within each section, add fields to collect specific information.</li>
				<li>You can preview your template at any time using the "Preview Template" button.</li>
				<li>Once you're satisfied, click "Save Template" to finalize your work.</li>
			</ul>
		</div>

		<div class="space-y-6">
			<div class="relative">
				<input
					v-model="templateName"
					class="w-full p-3 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 pl-10"
					placeholder="Template Name"
				/>
				<span class="absolute left-3 top-3 text-indigo-500">
					<i class="fas fa-file-alt"></i>
				</span>
			</div>

			<div class="relative">
				<input
					:value="currentUser.profession"
					class="w-full p-3 border-2 border-indigo-300 rounded-lg bg-gray-100 pl-10"
					placeholder="Profession"
					disabled
				/>
				<span class="absolute left-3 top-3 text-indigo-500">
					<i class="fas fa-user-md"></i>
				</span>
			</div>

			<div class="relative">
				<textarea
					v-model="description"
					class="w-full p-3 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 pl-10"
					placeholder="Description"
					rows="3"
				></textarea>
				<span class="absolute left-3 top-3 text-indigo-500">
					<i class="fas fa-info-circle"></i>
				</span>
			</div>
		</div>

		<div class="mt-8 space-y-8">
			<div
				v-for="(section, sectionIndex) in sections"
				:key="sectionIndex"
				class="p-6 border-2 border-indigo-200 rounded-lg bg-indigo-50 shadow-md transition-all duration-300 hover:shadow-lg"
			>
				<div class="flex justify-between items-center mb-4">
					<input
						v-model="section.name"
						class="text-xl font-semibold bg-transparent border-b-2 border-indigo-300 focus:border-indigo-500 transition-all duration-300"
						placeholder="Section Name"
					/>
					<button
						@click="removeSection(sectionIndex)"
						class="text-red-500 hover:text-red-700 transition-colors duration-300"
					>
						<i class="fas fa-trash"></i>
					</button>
				</div>

				<div
					v-for="(field, fieldName) in section.fields"
					:key="fieldName"
					class="mb-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
				>
					<FieldBuilder
						:field="field"
						:section-name="section.name"
						@remove="removeField(sectionIndex, fieldName)"
						@update:field="
							updateField(sectionIndex, fieldName, $event)
						"
					/>
				</div>

				<button
					@click="addField(sectionIndex)"
					class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center"
				>
					<i class="fas fa-plus mr-2"></i> 
					{{ section.name ? `Add ${section.name} variable` : 'Add variable' }}
				</button>
			</div>
		</div>

		<div class="flex justify-between mt-8">
			<button
				@click="addSection"
				class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center"
			>
				<i class="fas fa-folder-plus mr-2"></i> Add Section
			</button>
			<button
				@click="previewTemplate"
				class="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-300 flex items-center mr-4"
			>
				<i class="fas fa-eye mr-2"></i> Preview Template
			</button>
			<button
				@click="saveTemplate"
				class="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300 flex items-center"
			>
				<i class="fas fa-save mr-2"></i> Save Template
			</button>
		</div>
	</div>
	<div
		v-else
		class="flex items-center justify-center h-screen bg-gray-100"
	>
		<p class="text-xl text-gray-600">Loading...</p>
	</div>
	<LoadingModal ref="loadingModal" />

	<!-- Preview Modal -->
	<teleport to="body">
		<div v-if="showPreviewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
			<div class="bg-white p-6 rounded-lg max-w-3xl w-full m-4">
				<h2 class="text-2xl font-bold mb-4 text-indigo-700">Template Preview</h2>
				<div class="max-h-[70vh] overflow-y-auto">
					<h3 class="text-2xl font-semibold mb-2 text-center text-indigo-600">{{ templateName }}</h3>
					<p class="text-gray-600 mb-6 text-center">{{ description }}</p>
					<div v-for="(section, sectionIndex) in sections" :key="sectionIndex" class="mb-8">
						<h4 class="text-xl font-bold mb-4 text-center text-indigo-700 border-b-2 border-indigo-200 pb-2">{{ section.name }}</h4>
						<div v-for="(field, fieldName) in section.fields" :key="fieldName" class="mb-4">
							<p class="font-medium">{{ field.label }}</p>
							<div class="mt-1">
								<input v-if="field.type === 'String'" type="text" class="w-full p-2 border rounded" :placeholder="field.placeholder" disabled>
								<input v-else-if="field.type === 'Number'" type="number" class="w-full p-2 border rounded" :placeholder="field.placeholder" disabled>
								<input v-else-if="field.type === 'Date'" type="date" class="w-full p-2 border rounded" disabled>
								<select v-else-if="field.type === 'Array'" class="w-full p-2 border rounded" disabled>
									<option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
								</select>
								<select v-else-if="field.type === 'Boolean'" class="w-full p-2 border rounded" disabled>
									<option value="">Select a value</option>
									<option value="true">True</option>
									<option value="false">False</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="mt-4 flex justify-end">
					<button @click="closePreviewModal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-200">Close Preview</button>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue';
	import { useRouter } from 'vue-router';
	import { useToast } from 'vue-toastification';
	import { useTreatmentTemplateStore } from '@/stores/treatment-template';
	import { createTreatmentTemplate } from '@/utils/treatmentTemplate';
	import FieldBuilder from '../../../components/FieldBuilder.vue';
	import { useStaffStore } from '@/stores/staff-management';
	import LoadingModal from '../../../components/LoadingModal.vue';
	import BackButton from '../../../components/BackButton.vue';
	const router = useRouter();
	const toast = useToast();
	const treatmentTemplateStore = useTreatmentTemplateStore();
	const staffStore = useStaffStore();
	const loadingModal = ref(null);

	const templateName = ref('');
	const description = ref('');
	const sections = ref([]);

	const currentUser = computed(() => staffStore.currentUser);

	onMounted(async () => {
		if (!currentUser.value) {
			await fetchCurrentUser();
		}
	});

	const fetchCurrentUser = async () => {
		try {
			loadingModal.value.show();
			await staffStore.fetchCurrentUser();
		} catch (error) {
			console.error('Error fetching current user:', error);
			toast.error('Failed to fetch user data. Please try again.');
			router.push('/login');
		} finally {
			loadingModal.value.hide();
		}
	};

	const addSection = () => {
		sections.value.push({ name: '', fields: {} });
	};

	const removeSection = (index) => {
		sections.value.splice(index, 1);
	};

	const addField = (sectionIndex) => {
		const fieldName = `field_${
			Object.keys(sections.value[sectionIndex].fields).length + 1
		}`;
		sections.value[sectionIndex].fields[fieldName] = {
			type: 'String',
			label: '',
			required: false,
			placeholder: '',
			options: [],
			defaultValue: '',
		};
	};

	const removeField = (sectionIndex, fieldName) => {
		delete sections.value[sectionIndex].fields[fieldName];
	};

	const updateField = (sectionIndex, fieldName, updatedField) => {
		sections.value[sectionIndex].fields[fieldName] = updatedField;
	};

	const processedFields = computed(() => {
		const fields = {};
		sections.value.forEach((section) => {
			fields[section.name] = section.fields;
		});
		return fields;
	});

	const saveTemplate = async () => {
		try {
			loadingModal.value.show();
			const templateData = {
				name: templateName.value,
				profession: currentUser.value.profession,
				description: description.value,
				fields: processedFields.value,
			};
			console.log(templateData);
			const response = await createTreatmentTemplate(templateData);
			treatmentTemplateStore.addTemplate(response.data);

			toast.success('Template saved successfully!');
		} catch (error) {
			console.error('Error saving template:', error);
			toast.error('Error saving template. Please try again.');
		} finally {
			loadingModal.value.hide();
		}
	};

	const showPreviewModal = ref(false);

	const previewTemplate = () => {
		showPreviewModal.value = true;
	};

	const closePreviewModal = () => {
		showPreviewModal.value = false;
	};
</script>