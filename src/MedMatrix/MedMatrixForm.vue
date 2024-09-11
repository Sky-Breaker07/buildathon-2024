<template> 
    <div class="page-container">
        <!--------Header Section-------->

        <header class="header-section">
      <div class="logo">
        <img src="https://via.placeholder.com/100x50" alt="Logo" />
      </div>
      <h1>Welcome to Our Registration Page</h1>
      <button class="login-button" @click="handleLogin">Login</button>
    </header>

        <!------Form and Image-------->
        <div class="form-container">
        <div class="form-fields">
          <h2>Registration Form</h2>
           <form @submit.prevent="submitForm">
           <div class="form-group">
           <label for="name">Name:</label>
           <input type="text" id="name" v-model="formData.name" required />
           </div>
          <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="formData.email" required />
          </div>
          <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="formData.password" required />
          </div>
            <button type="submit">Submit</button>
          </form>
          </div>

          <div class="form-image">
         <img src="https://via.placeholder.com/300" alt="Form Image" />
            </div>
         </div>
      </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    submitForm() {
      // Handle form submission
      console.log('Form data:', this.formData);
    },
    handleLogin() {
      // Handle login button click
      alert("Redirect to login page!");
    }
  }
};
</script>


<style></style>