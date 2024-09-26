<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-100 to-white">
    <!-- Header -->
    <header class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-6 flex justify-between items-center">
        <div class="flex items-center">
          <v-icon name="ri-heart-pulse-line" class="text-3xl text-blue-600 mr-2" />
          <h1 class="text-2xl font-bold text-gray-800">CareLog</h1>
        </div>
        <nav>
          <ul class="flex space-x-6">
            <li><a href="#features" class="text-gray-600 hover:text-blue-600 transition duration-300">Features</a></li>
            <li><a href="#about" class="text-gray-600 hover:text-blue-600 transition duration-300">About</a></li>
            <li><a href="#contact" class="text-gray-600 hover:text-blue-600 transition duration-300">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Hero Section with Split Screen -->
    <section class="relative h-screen">
      <div class="absolute inset-0 flex">
        <div class="w-1/2 bg-cover bg-center" style="background-image: url('/image_1.png');"></div>
        <div class="w-1/2 bg-cover bg-center" style="background-image: url('/image_2.png');"></div>
      </div>
      <div class="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div class="max-w-2xl bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Revolutionize Healthcare Management in Nigeria</h2>
          <p class="text-xl text-gray-600 mb-8">CareLog simplifies hospital operations, enhances patient care, and improves overall efficiency for Nigerian healthcare providers.</p>
          <button @click="navigateToRegister" class="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="bg-white py-16">
      <div class="container mx-auto px-4">
        <h3 class="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon="ri-clipboard-line" 
            title="Patient Management" 
            description="Digitize patient records, history, and treatments for easy access and management."
          />
          <FeatureCard 
            icon="ri-calendar-line" 
            title="Appointment Scheduling" 
            description="Streamline booking processes for both patients and staff, reducing wait times."
          />
          <FeatureCard 
            icon="ri-bar-chart-box-line" 
            title="Analytics & Insights" 
            description="Gain valuable insights into patient flow, resource usage, and hospital performance."
          />
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-16 bg-blue-50">
      <div class="container mx-auto px-4">
        <h3 class="text-3xl font-bold text-center text-gray-800 mb-8">About CareLog</h3>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-8">
          CareLog is designed to modernize healthcare operations in Nigerian hospitals. Our goal is to enhance patient care, reduce administrative workload, and improve overall hospital efficiency through digital transformation.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h4 class="text-xl font-semibold mb-4">Our Mission</h4>
            <p class="text-gray-600">To empower healthcare providers with cutting-edge technology, enabling them to deliver superior patient care and streamline operations.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h4 class="text-xl font-semibold mb-4">Why Choose CareLog?</h4>
            <ul class="list-disc list-inside text-gray-600">
              <li>Tailored for Nigerian healthcare system</li>
              <li>User-friendly interface</li>
              <li>Comprehensive features</li>
              <li>Secure and compliant</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="bg-blue-600 py-16">
      <div class="container mx-auto px-4 text-center">
        <h3 class="text-3xl font-bold text-white mb-6">Ready to Transform Your Healthcare Management?</h3>
        <button @click="navigateToRegister" class="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 transform hover:scale-105">
          Get Started Now
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-between">
          <div class="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 class="text-xl font-semibold mb-4">CareLog</h4>
            <p class="text-gray-400">Revolutionizing healthcare management in Nigeria</p>
          </div>
          <div class="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 class="text-xl font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2">
              <li><a href="#features" class="text-gray-400 hover:text-white transition duration-300">Features</a></li>
              <li><a href="#about" class="text-gray-400 hover:text-white transition duration-300">About</a></li>
              <li><a href="#contact" class="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
            </ul>
          </div>
          <div class="w-full md:w-1/3">
            <h4 class="text-xl font-semibold mb-4">Connect With Us</h4>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white transition duration-300"><v-icon name="ri-facebook-fill" /></a>
              <a href="#" class="text-gray-400 hover:text-white transition duration-300"><v-icon name="ri-twitter-fill" /></a>
              <a href="#" class="text-gray-400 hover:text-white transition duration-300"><v-icon name="ri-linkedin-fill" /></a>
            </div>
          </div>
        </div>
        <div class="mt-8 text-center text-gray-400">
          <p>&copy; 2024 CareLog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import FeatureCard from '../components/FeatureCard.vue';
import { OhVueIcon as VIcon } from "oh-vue-icons";

const router = useRouter();

const navigateToRegister = () => {
  router.push('/register');
};
</script>

<style scoped>
/* Any additional scoped styles can be added here if needed */
</style>