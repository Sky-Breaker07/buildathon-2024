<template>
	<div class="font-poppins pt-6 px-4">
		<div class="max-w-7xl mx-auto">
			<BackButton />
			<h1 class="text-4xl font-bold text-clrBlue mb-8 text-center">
				Assigned Patients
			</h1>

			<!-- Search and filter -->
			<div class="w-full mb-6 flex gap-2 items-center">
				<input
					v-model="searchTerm"
					type="text"
					placeholder="Search patients..."
					class="w-full font-poppins outline-none px-4 py-2 rounded-md border border-offWhiteAlt"
				/>
				<select
					v-model="sortBy"
					class="outline-none w-full font-poppins sm:w-auto px-4 py-2 rounded-md border border-offWhiteAlt"
				>
					<option value="name">Sort by Name</option>
					<option value="hospital_id">Sort by Hospital ID</option>
				</select>
			</div>

			<!-- Patients table -->
			<div v-if="sortedAndFilteredPatients.length > 0">
				<table class="w-full border-collapse border-y font-poppins">
					<thead>
						<tr>
							<th
								scope="col"
								class="text-left p-2 border-y font-semibold text-offWhiteAlt"
							>
								Patient Name
							</th>
							<th
								scope="col"
								class="text-left p-2 border-y font-semibold text-offWhiteAlt"
							>
								Hospital ID
							</th>
							<th
								scope="col"
								class="text-left p-2 border-y font-semibold text-offWhiteAlt"
							>
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="patient in sortedAndFilteredPatients"
							:key="patient.hospital_record.hospital_id"
							class="hover:bg-gray-50"
						>
							<td class="pl-2 p-4 border-b">
								{{ patient.biodata.name }}
							</td>
							<td class="pl-2 p-4 border-b">
								{{ patient.hospital_record.hospital_id }}
							</td>
							<td class="pl-2 p-4 border-b">
								<router-link
									:to="`/dashboard/assigned/${patient.hospital_record.hospital_id}`"
									class="bg-clrBlue text-clrWhite transition duration-500 ease-in-out hover:bg-indigo-700 px-4 py-2 rounded-md"
								>
									Access File
								</router-link>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- No results message -->
			<div
				v-else-if="patientStore.assignedPatients.length > 0"
				class="text-center mt-8 text-indigo-800 font-medium"
			>
				No patients found matching your search criteria.
			</div>

			<!-- No assigned patients message -->
			<div
				v-else
				class="text-center mt-8 text-indigo-800 font-medium"
			>
				You currently have no assigned patients.
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue';
	import { useRouter } from 'vue-router';
	import { useStaffStore } from '@/stores/staff-management';
	import { usePatientStore } from '@/stores/patient-management';
	import { getAssignedPatients } from '@/utils/patientManagement';
	import { getToken } from '@/utils/tokenUtils';
	import { useToast } from 'vue-toastification';
	import BackButton from '@/components/BackButton.vue';

	const router = useRouter();
	const staffStore = useStaffStore();
	const patientStore = usePatientStore();
	const toast = useToast();

	const searchTerm = ref('');
	const sortBy = ref('name');

	const fetchAssignedPatients = async () => {
		try {
			const token = getToken();
			const response = await getAssignedPatients(token);
			if (
				response.data &&
				response.data.status === 'Success' &&
				Array.isArray(response.data.data)
			) {
				patientStore.setAssignedPatients(response.data.data);
			} else {
				console.error('Unexpected response structure:', response);
				toast.error(
					'Failed to fetch assigned patients. Unexpected data structure.'
				);
			}
		} catch (error) {
			console.error('Error fetching assigned patients:', error);
			toast.error('Failed to fetch assigned patients. Please try again.');
		}
	};

	onMounted(async () => {
		if (
			!staffStore.currentUser ||
			staffStore.currentUser.role !== 'HealthCareProfessional'
		) {
			toast.error('Unauthorized access');
			router.push('/dashboard');
			return;
		}
		await fetchAssignedPatients();
	});

	const sortedAndFilteredPatients = computed(() => {
		if (!patientStore.assignedPatients) return [];

		let filtered = patientStore.assignedPatients.filter(
			(patient) =>
				(patient.biodata.name &&
					patient.biodata.name
						.toLowerCase()
						.includes(searchTerm.value.toLowerCase())) ||
				(patient.hospital_record.hospital_id &&
					patient.hospital_record.hospital_id
						.toLowerCase()
						.includes(searchTerm.value.toLowerCase()))
		);

		return filtered.sort((a, b) => {
			if (sortBy.value === 'name') {
				return (a.biodata.name || '').localeCompare(
					b.biodata.name || ''
				);
			} else {
				return (a.hospital_record.hospital_id || '').localeCompare(
					b.hospital_record.hospital_id || ''
				);
			}
		});
	});
</script>
