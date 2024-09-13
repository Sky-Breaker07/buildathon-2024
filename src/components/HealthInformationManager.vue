<template>
	<div>
		<div class="bg-purplish rounded-md py-[1.1875rem] px-[2.5625rem]">
			<header
				class="border-b border-solid border-grayish pb-2 flex items-center justify-between"
			>
				<h1 class="font-bold text-2xl text-clrBlack leading-8">
					Register Patient
				</h1>
			</header>

			<div class="my-8 flex gap-10">
				<div class="flex flex-col gap-4">
					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="name"
							class="font-poppins font-normal text-clrBlack text-sm"
							>Patient Name</label
						>
						<input
							type="text"
							id="name"
							placeholder="John Doe"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2"
							v-model="patientData.name"
						/>
					</div>

					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="age"
							class="font-poppins font-normal text-clrBlack text-sm"
							>Age</label
						>
						<input
							type="number"
							id="age"
							placeholder="20"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2"
							v-model="patientData.age"
						/>
					</div>

					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="address"
							class="font-poppins font-normal text-clrBlack text-sm"
							>Address</label
						>
						<input
							type="text"
							id="address"
							placeholder="House 34, Block 2, Street 12"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2"
							v-model="patientData.address"
						/>
					</div>

					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="phone"
							class="font-poppins font-normal text-clrBlack text-sm"
							>Mobile Number</label
						>
						<input
							type="tel"
							id="phone"
							placeholder="1234567890"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2"
							v-model="patientData.phone"
						/>
					</div>
				</div>

				<div class="flex flex-col gap-4">
					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="sex"
							class="font-poppins font-normal text-clrBlack text-sm"
							>Sex</label
						>
						<select
							id="sex"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2"
							placeholder="Select Sex"
							v-model="patientData.sex"
						>
							<option value="0">Select Sex</option>
							<option value="1">Male</option>
							<option value="2">Female</option>
						</select>
					</div>

					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="occupation"
							class="font-poppins font-normal text-clrBlack text-sm"
							>Occupation</label
						>
						<input
							type="text"
							id="occupation"
							placeholder="Teacher"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2"
							v-model="patientData.occupation"
						/>
					</div>

					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="marital-status"
							class="font-poppins font-normal text-clrBlack text-sm"
							>Marital Status</label
						>
						<select
							id="marital-status"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2"
							v-model="patientData.marital_status"
						>
							<option value="0">Select Marital Status</option>
							<option value="1">Single</option>
							<option value="2">Married</option>
							<option value="3">Divorced</option>
							<option value="4">Widowed</option>
						</select>
					</div>

					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="tribe"
							class="font-poppins font-normal text-clrBlack text-sm"
							>Tribe</label
						>
						<input
							type="text"
							id="tribe"
							placeholder="Yoruba"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2"
							v-model="patientData.tribe"
						/>
					</div>
				</div>

				<div class="flex flex-col gap-4">
					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="religion"
							class="font-poppins font-normal text-clrBlack text-sm"
							>Religion</label
						>
						<input
							type="text"
							id="religion"
							placeholder="Christianity"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2 w-full"
							v-model="patientData.religion"
						/>
					</div>

					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="unit"
							class="font-poppins font-normal text-clrBlack text-sm"
							>Unit Referred To</label
						>
						<input
							type="text"
							id="unit"
							placeholder="Neurosurgery"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2 bg-grayish"
							readonly
						/>
					</div>

					<div class="flex flex-col gap-1 w-[20rem]">
						<label
							for="hcp-referred-to"
							class="font-poppins font-normal text-clrBlack text-sm"
							>HCP Referred To</label
						>
						<input
							type="text"
							id="hcp-referref-to"
							placeholder="Dr. Jane Udor"
							class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2 bg-grayish"
							readonly
						/>
					</div>
				</div>
			</div>

			<div class="border-t border-solid border-grayish pt-6 flex gap-10">
				<div class="flex flex-col gap-1 w-[20rem]">
					<label
						for="status"
						class="font-poppins font-normal text-clrBlack text-sm"
						>Status</label
					>
					<input
						type="text"
						id="status"
						placeholder="In-patient"
						class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2"
					/>
				</div>

				<div class="flex flex-col gap-1 w-[20rem]">
					<label
						for="appointment-date"
						class="font-poppins font-normal text-clrBlack text-sm"
						>Next Appointment Date</label
					>
					<input
						type="date"
						id="appointment-date"
						placeholder="01/01/2024"
						class="font-poppins font-normal text-clrBlack border border-solid border-grayish outline-none rounded-lg px-4 py-2"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup></script>
