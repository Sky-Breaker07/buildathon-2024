<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
    <div class="text-center">
      <img src="https://illustrations.popsy.co/white/crashed-error.svg" alt="404 Illustration" class="w-64 h-64 mx-auto mb-8">
      <h1 class="text-5xl font-bold text-white mb-4">Oops! Page Not Found</h1>
      <p class="text-xl text-white mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <p class="text-lg text-white mb-4">Redirecting to home in {{ countdown }} seconds...</p>
      <div class="inline-block">
        <div class="radial-progress text-white" :style="{ '--value': progressPercentage }">
          {{ countdown }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const countdown = ref(5)
const progressPercentage = computed(() => ((5 - countdown.value) / 5) * 100)

onMounted(() => {
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value === 0) {
      clearInterval(timer)
      router.push('/')
    }
  }, 1000)
})
</script>

<style scoped>
.radial-progress {
  --size: 5rem;
  --thickness: 4px;
}
</style>
