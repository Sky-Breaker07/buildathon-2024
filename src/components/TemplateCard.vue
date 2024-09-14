<template>
  <div class="template-card" :class="{ 'template-card--hover': isHovered }" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <div class="template-card__icon">
      <v-icon :name="template.icon" scale="3" />
    </div>
    <h2 class="template-card__title">{{ template.name }}</h2>
    <p class="template-card__description">{{ template.description }}</p>
    <v-btn class="template-card__button" color="primary" @click="$emit('click')">
      Manage Templates
    </v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { OhVueIcon as VIcon } from 'oh-vue-icons';

defineProps({
  template: {
    type: Object,
    required: true,
  },
});

const isHovered = ref(false);
</script>

<style scoped>
.template-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
}

.template-card--hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.template-card__icon {
  margin-bottom: 1rem;
  color: #3498db;
}

.template-card__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.template-card__description {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 1.5rem;
}

.template-card__button {
  margin-top: auto;
}
</style>
