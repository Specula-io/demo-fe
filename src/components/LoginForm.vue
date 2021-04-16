<template>
  <b-container class="d-flex justify-content-center">
    <b-form
        class="w-50"
        @submit.prevent="sendForm"
    >
      <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="email"
      >
        <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Password:" label-for="password">
        <b-form-input
            id="password"
            type="password"
            v-model="form.password"
            placeholder="Password"
            required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>


export default {
  name: "LoginForm",
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
    }
  },
  methods:{
    sendForm() {
      this.$axios.post('/login', {
        email: this.form.email,
        password: this.form.password,
      }).then(resp => {
        const {token, user} = resp.data
        localStorage.setItem('id_token', token)
        this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');
        this.$store.dispatch('signIn', {
          token: token,
          user: user,
          isAuth: true,
        })
      }).catch(error => {
        console.error(error)
      })
    }
  },
}
</script>

<style scoped>

</style>