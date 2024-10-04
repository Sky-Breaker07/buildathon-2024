<template>
	<div
		class="min-h-screen bg-gradient-to-b from-blue-100 to-white font-poppins pt-[5rem]"
	>
		<!-- Hero Section with Split Screen -->
		<section class="relative h-screen">
			<div class="absolute inset-0 flex">
				<div
					class="w-1/2 bg-cover bg-center"
					style="background-image: url('/image_1.png')"
				></div>
				<div
					class="w-1/2 bg-cover bg-center"
					style="background-image: url('/image_2.png')"
				></div>
			</div>
			<div
				class="w-[90rem] mx-auto relative z-10 container mx-auto px-4 h-full flex items-center"
			>
				<div
					class="max-w-2xl bg-white bg-opacity-90 px-8 py-10 rounded-lg shadow-lg"
				>
					<h2
						class="text-2xl md:text-4xl font-bold text-gray-800 mb-6"
					>
						Revolutionize Healthcare Management in Nigeria
					</h2>
					<p class="text-xl text-gray-600 mb-8">
						CareLog simplifies hospital operations, enhances patient
						care, and improves overall efficiency for Nigerian
						healthcare providers.
					</p>
					<button
						@click="navigateToRegister"
						class="bg-blue-600 text-white font-medium py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105"
					>
						Get Started
					</button>
				</div>
			</div>
		</section>

		<!-- Features Section -->
		<section
			id="features"
			class="bg-white py-16"
		>
			<div class="container w-[90rem] mx-auto px-4">
				<h3
					class="section__header text-3xl font-bold text-clrBlack text-center mb-12 relative"
				>
					Key Features
				</h3>
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
		<section
			id="about"
			class="py-16 bg-blue-50"
		>
			<div class="container w-[90rem] mx-auto px-4">
				<h3
					class="section__header text-3xl font-bold text-clrBlack text-center mb-12 relative"
				>
					About CareLog
				</h3>
				<p
					class="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-8"
				>
					CareLog is designed to modernize healthcare operations in
					Nigerian hospitals. Our goal is to enhance patient care,
					reduce administrative workload, and improve overall hospital
					efficiency through digital transformation.
				</p>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
					<div class="bg-white p-6 rounded-lg shadow-md">
						<h4 class="text-xl font-semibold mb-4">Our Mission</h4>
						<p class="text-gray-600 pr-2">
							To empower healthcare providers with cutting-edge
							technology, enabling them to deliver superior
							patient care and streamline operations.
						</p>
					</div>
					<div class="bg-white p-6 rounded-lg shadow-md">
						<h4 class="text-xl font-semibold mb-4">
							Why Choose CareLog?
						</h4>
						<ul
							class="custom__list list-disc list-inside text-gray-600"
						>
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
			<div class="container w-[90rem] mx-auto px-4 text-center">
				<h3 class="text-3xl font-bold text-white mb-6">
					Ready to Transform Your Healthcare Management?
				</h3>
				<button
					@click="navigateToRegister"
					class="bg-white text-blue-600 font-medium py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 transform hover:scale-105"
				>
					Get Started Now
				</button>
			</div>
		</section>

		<!-- Footer -->
		<footer class="bg-gray-800 text-white">
			<div class="container w-[90rem] mx-auto px-4 py-8">
				<div class="w-full flex gap-4 justify-between">
					<div class="mb-6 md:mb-0 flex-1 min-w-0">
						<div class="flex gap-2 items-center mb-4">
							<img
								src="../assets/images/Logo.svg"
								class="w-[2.5rem] h-[2.5rem]"
								alt="Logo"
							/>
							<h4 class="text-xl font-semibold">CareLog</h4>
						</div>
						<p class="text-gray-400 w-[80%]">
							CareLog simplifies hospital operations, enhances
							patient care, and improves overall efficiency for
							Nigerian healthcare providers.
						</p>
					</div>
					<div class="flex justify-between gap-4 flex-1 min-w-0">
						<div class="mb-6 md:mb-0 flex-1 min-w-0">
							<h4 class="text-xl font-semibold mb-4">
								Quick Links
							</h4>
							<ul class="space-y-2">
								<li>
									<a
										href="#features"
										class="text-gray-400 hover:text-white transition duration-300"
										>Features</a
									>
								</li>
								<li>
									<a
										href="#about"
										class="text-gray-400 hover:text-white transition duration-300"
										>About</a
									>
								</li>
								<li>
									<a
										href="#contact"
										class="text-gray-400 hover:text-white transition duration-300"
										>Contact</a
									>
								</li>
							</ul>
						</div>
						<div class="flex-1 min-w-0">
							<h4 class="text-xl font-semibold mb-4">
								Connect With Us
							</h4>
							<div class="flex space-x-4">
								<a
									href="#"
									class="text-gray-400 hover:text-white transition duration-300"
									><v-icon name="ri-facebook-fill"
								/></a>
								<a
									href="#"
									class="text-gray-400 hover:text-white transition duration-300"
									><v-icon name="ri-twitter-fill"
								/></a>
								<a
									href="#"
									class="text-gray-400 hover:text-white transition duration-300"
									><v-icon name="ri-linkedin-fill"
								/></a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="bg-white mt-8 text-center text-gray-700 py-2">
				<p>
					&copy;<span>{{ date }}</span> <b>CareLog</b>. All rights
					reserved.
				</p>
			</div>
		</footer>
	</div>
</template>

<script setup>
	import { computed } from 'vue';
	import { useRouter } from 'vue-router';
	import FeatureCard from '../components/FeatureCard.vue';
	import { OhVueIcon as VIcon } from 'oh-vue-icons';

	const router = useRouter();

	const navigateToRegister = () => {
		router.push('/register');
	};

	const date = computed(() => new Date().getFullYear());
</script>

<style scoped>
	/* Any additional scoped styles can be added here if needed */
	.section__header::after {
		position: absolute;
		content: '';
		width: 5%;
		height: 0.19rem;
		background-color: hsla(230, 100%, 70%, 1);
		bottom: -0.5rem;
		left: 50%;
		transform: translate(-50%, 0);
	}

	.custom__list li::marker {
		color: theme('colors.clrBlue');
	}
</style>
