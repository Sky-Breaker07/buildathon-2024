<template>
	<div
		v-if="currentUser"
		class="w-[90rem] mx-auto p-8 pt-4 bg-white rounded-lg font-poppins"
	>
		<div class="flex justify-between items-center mb-8">
			<BackButton class="py-4" />
			<a
				@click="navigateToManageTemplates"
				class="text-indigo-600 hover:text-indigo-800 transition-colors duration-300 flex items-center cursor-pointer"
			>
				<i class="fas fa-list-ul mr-2"></i> Manage Existing Templates
			</a>
		</div>
		<h1
			class="text-4xl font-bold mb-8 text-indigo-700 border-b-2 border-indigo-200 pb-4"
		>
			Edit {{ capitalizeTemplateType }} Template
		</h1>

		<div
			class="mb-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md shadow-md"
		>
			<h3 class="text-lg font-semibold text-blue-700 mb-2">
				How to Edit This Template
			</h3>
			<ul class="list-disc list-inside text-blue-600 space-y-2">
				<li>Modify the template name and description if needed.</li>
				<li>Edit existing sections or add new ones to reorganize your assessment.</li>
				<li>
					Within each section, modify existing fields or add new ones to collect specific
					information.
				</li>
				<li>
					You can preview your changes at any time using the "Preview
					Template" button.
				</li>
				<li>
					Once you're satisfied with your changes, click "Update Template" to save your work.
				</li>
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
					class="w-full min-h-[8rem] p-3 border-2 border-indigo-300 rounded-lg resize-none transition-all duration-300 pl-10"
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
					{{
						section.name
							? `Add ${section.name} variable`
							: 'Add variable'
					}}
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
				<i class="fas fa-save mr-2"></i> Update Template
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
		<div
			v-if="showPreviewModal"
			class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto"
		>
			<div
				class="bg-white p-6 rounded-lg max-w-3xl w-full m-4 font-poppins"
			>
				<h2 class="text-2xl font-bold mb-4 text-indigo-700">
					Template Preview
				</h2>
				<div class="max-h-[70vh] overflow-y-auto">
					<h3
						class="text-2xl font-semibold mb-2 text-center text-indigo-600"
					>
						{{ templateName }}
					</h3>
					<p class="text-gray-600 mb-6 text-center">
						{{ description }}
					</p>
					<div
						v-for="(section, sectionIndex) in sections"
						:key="sectionIndex"
						class="mb-8"
					>
						<h4
							class="text-xl font-bold mb-4 text-center text-indigo-700 border-b-2 border-indigo-200 pb-2"
						>
							{{ section.name }}
						</h4>
						<div
							v-for="(field, fieldName) in section.fields"
							:key="fieldName"
							class="mb-4"
						>
							<p class="font-medium">{{ field.label }}</p>
							<div class="mt-1">
								<input
									v-if="field.type === 'String' && !field.isImage"
									type="text"
									class="w-full p-2 border rounded"
									:placeholder="field.placeholder"
									disabled
								/>
								<div v-else-if="field.type === 'String' && field.isImage" class="mt-1">
									<p class="text-sm text-gray-500">Image upload field</p>
									<div class="mt-1 flex items-center">
										<span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
											<svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
												<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
											</svg>
										</span>
									</div>
								</div>
								<input
									v-else-if="field.type === 'Number'"
									type="number"
									class="w-full p-2 border rounded"
									:placeholder="field.placeholder"
									disabled
								/>
								<input
									v-else-if="field.type === 'Date'"
									type="date"
									class="w-full p-2 border rounded"
									disabled
								/>
								<select
									v-else-if="field.type === 'Array'"
									class="w-full p-2 border rounded"
									disabled
								>
									<option
										v-for="option in field.options"
										:key="option"
										:value="option"
									>
										{{ option }}
									</option>
								</select>
								<select
									v-else-if="field.type === 'Boolean'"
									class="w-full p-2 border rounded"
									disabled
								>
									<option value="">Select a value</option>
									<option value="true">True</option>
									<option value="false">False</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="mt-4 flex justify-end">
					<button
						@click="closePreviewModal"
						class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-200"
					>
						Close Preview
					</button>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue';
	import { useRouter, useRoute } from 'vue-router';
	import { useToast } from 'vue-toastification';
	import { useStaffStore } from '@/stores/staff-management';
	import LoadingModal from '../../../components/LoadingModal.vue';
	import BackButton from '../../../components/BackButton.vue';
	import FieldBuilder from '../../../components/FieldBuilder.vue';

	// Import all template stores
	import { useAssessmentTemplateStore } from '@/stores/assessment-template';
	import { useTreatmentTemplateStore } from '@/stores/treatment-template';
	import { useDischargeTemplateStore } from '@/stores/discharge-template';
	import { useEvaluationTemplateStore } from '@/stores/evaluation-template';
	import { useReferralTemplateStore } from '@/stores/referral-template';

	// Import the consolidated template utility functions
	import { updateTemplate, getTemplateById } from '@/utils/template';

	const router = useRouter();
	const route = useRoute();
	const toast = useToast();
	const staffStore = useStaffStore();
	const loadingModal = ref(null);

	const templateType = computed(() => route.params.type);
	const templateId = computed(() => route.params.id);

	const templateStore = computed(() => {
		switch (templateType.value) {
			case 'assessment': return useAssessmentTemplateStore();
			case 'treatment': return useTreatmentTemplateStore();
			case 'discharge': return useDischargeTemplateStore();
			case 'evaluation': return useEvaluationTemplateStore();
			case 'referral': return useReferralTemplateStore();
			default: throw new Error(`Invalid template type: ${templateType.value}`);
		}
	});

	const templateName = ref('');
	const description = ref('');
	const sections = ref([]);

	const currentUser = computed(() => staffStore.currentUser);

	onMounted(async () => {
		if (!currentUser.value) {
			await staffStore.fetchCurrentUser();
		}
		await fetchTemplate();
	});

	const fetchTemplate = async () => {
		try {
			loadingModal.value.show();
			const response = await getTemplateById(templateType.value, templateId.value);
			const template = response.data;
			templateName.value = template.name;
			description.value = template.description;
			sections.value = Object.entries(template.fields).map(([name, fields]) => ({
				name,
				fields
			}));
		} catch (error) {
			console.error('Error fetching template:', error);
			toast.error('Failed to fetch template data. Please try again.');
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
			isImage: false,
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
			const response = await updateTemplate(templateType.value, templateId.value, templateData);
			templateStore.value.updateTemplate(response.data);

			toast.success('Template updated successfully!');
			router.push({ name: 'ManageTemplates', params: { type: templateType.value } });
		} catch (error) {
			console.error('Error updating template:', error);
			toast.error('Error updating template. Please try again.');
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

	const navigateToManageTemplates = () => {
		router.push({ name: 'ManageTemplates', params: { type: templateType.value } });
	};

	const capitalizeTemplateType = computed(() => {
		return templateType.value.charAt(0).toUpperCase() + templateType.value.slice(1);
	});
</script>