<template>
  <div v-if="staffStats" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <template v-for="(count, profession) in professionCounts" :key="profession">
      <DashboardCard
        v-if="count > 0"
        :icon="getProfessionIcon(profession)"
        :title="formatProfession(profession)"
        :subtitle="`${count} staff member${count !== 1 ? 's' : ''}`"
        :colorScheme="getColorScheme(profession)"
        @click="openModal(profession)"
      >
        <template #count>
          <CountUp :end-val="count" :duration="2" />
        </template>
      </DashboardCard>
    </template>
  </div>

  <InfoModal v-if="showModal" @close="closeModal">
    <template #header>
      <h3 class="text-lg font-semibold">{{ formatProfession(selectedProfession) }} Staff</h3>
    </template>
    <template #body>
      <div class="max-h-96 overflow-y-auto">
        <div v-if="isHCP">
          <div v-for="admin in getAdmins()" :key="admin.staff_id" class="mb-4">
            <h4 class="font-semibold">{{ admin.name }} ({{ admin.staff_id }})</h4>
            <ul class="ml-4">
              <li v-for="sub in admin.subordinates" :key="sub.staff_id">
                {{ sub.name }} ({{ sub.staff_id }})
              </li>
            </ul>
          </div>
        </div>
        <ul v-else>
          <li v-for="staff in getStaffList()" :key="staff.staff_id">
            {{ staff.name }} ({{ staff.staff_id }})
          </li>
        </ul>
      </div>
    </template>
  </InfoModal>
</template>

<script setup>
import { ref, computed } from 'vue';
import DashboardCard from './DashboardCards.vue';
import InfoModal from './InfoModal.vue';
import CountUp from 'vue-countup-v3';

const props = defineProps({
  staffStats: {
    type: Object,
    required: true,
  },
});

const showModal = ref(false);
const selectedProfession = ref('');

const professionCounts = computed(() => {
  const counts = {};
  if (props.staffStats.healthCareProfessionals) {
    props.staffStats.healthCareProfessionals.regular.forEach(hcp => {
      counts[hcp.profession] = (counts[hcp.profession] || 0) + 1;
    });
  }
  if (props.staffStats.healthInfoManagers) {
    counts['Health Information Manager'] = props.staffStats.healthInfoManagers.length;
  }
  return counts;
});

const getProfessionIcon = (profession) => {
  const icons = {
    'Physician': 'user-md',
    'Physiotherapist': 'hand-holding-medical',
    'Health Information Manager': 'file-medical',
    // Add more profession-icon mappings as needed
  };
  return icons[profession] || 'user';
};

const formatProfession = (profession) => {
  return profession.replace(/([A-Z])/g, ' $1').trim();
};

const getColorScheme = (profession) => {
  const schemes = {
    'Physician': 'blue',
    'Physiotherapist': 'green',
    'Health Information Manager': 'purple',
    // Add more profession-color mappings as needed
  };
  return schemes[profession] || 'indigo';
};

const openModal = (profession) => {
  selectedProfession.value = profession;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const isHCP = computed(() => selectedProfession.value !== 'Health Information Manager');

const getAdmins = () => {
  return props.staffStats.healthCareProfessionals.admins.filter(admin => 
    admin.subordinates.some(sub => sub.profession === selectedProfession.value)
  );
};

const getStaffList = () => {
  return props.staffStats.healthInfoManagers;
};
</script>