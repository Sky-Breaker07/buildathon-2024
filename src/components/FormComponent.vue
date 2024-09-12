<template>
	<div class="form_container">
		<div class="form_fields">
			<h2>Sign Up</h2>
			<form @submit.prevent="submitForm">
				<label
					for="name"
					class="form_group"
				>
					<input
						type="text"
						id="name"
						placeholder="Name"
						required
					/>
				</label>

				<label
					for="email"
					class="form_group"
				>
					<input
						type="email"
						id="email"
						placeholder="Email"
						required
					/>
				</label>

				<label
					for="sex"
					class="form_group"
				>
					<input
						type="text"
						id="sex"
						placeholder="Sex"
						required
					/>
				</label>

				<label
					for="hname"
					class="form_group"
				>
					<input
						type="text"
						id="hname"
						placeholder="Organization/Hospital Name"
						required
					/>
				</label>

				<label
					for="address"
					class="form_group"
				>
					<input
						type="text"
						id="address"
						placeholder="Address"
						required
					/>
				</label>

				<label
					for="doforg"
					class="form_group"
				>
					<input
						type="text"
						id="doforg"
						placeholder="Description of Organization/Hospital"
						required
					/>
				</label>

				<label
					for="password"
					class="form_group"
				>
					<input
						type="password"
						id="password"
						placeholder="Password"
						required
					/>
				</label>

				<div class="Fomx">
					<ButtonComponent text="Sign Up" />
					<button>login</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
	import ButtonComponent from './ButtonComponent.vue';
</script>

<style scoped>
	button {
		width: 3.75rem;
		height: 1.875rem;
		font-family: 'Poppins' sans-serif;
		font-weight: 800;
		font-size: 1.875rem;
		color: hsla(218, 15%, 11%, 1);
	}

	.form_container {
		/* width: 42.375rem;
 height: 48rem; */
		padding-top: 4rem;
		padding-left: 2.625rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	/*.form_fields{

}*/

	.form_fields h2 {
		font-family: 'inter' sans-serif;
		font-weight: 900;
		font-size: 2.25rem;
		line-height: 2.25rem;
		margin-bottom: 2rem;
	}

	.form_group {
		border: 1px solid hsla(219, 12%, 76%, 1);
		border-radius: 0.5rem;
		margin-bottom: 0.5rem;
		width: 36.1875rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
	}

	.form_group label {
		flex-shrink: 0;
	}

	.form_group input {
		width: 100%;
	}

	label {
		display: block;
		font-family: 'Poppins' sans-serif;
		font-weight: 400;
		font-size: 1.125rem;
		line-height: 1.675rem;
		color: hsla(218, 15%, 11%, 1);
	}

	input {
		width: 100%;
		box-sizing: border-box;
	}

	.Fomx {
		display: flex;
		gap: 0.75rem;
	}
</style>
