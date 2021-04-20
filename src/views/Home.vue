<template>
  <div>
    <b-navbar style="height: 70px" toggleable="lg" type="dark" variant="info">
      <b-container>
        <b-navbar-brand href="#" style="font-weight: bold; font-size: 32px">Cinema</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item  v-if="userAuth" @click="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
    <div class="home pt-5">
      <login-form v-if="!userAuth"></login-form>
      <div v-else>
        <ticket-choice v-if="!hasTicket"></ticket-choice>
        <payment v-else-if="!hasMethod"></payment>
        <show-ticket v-else></show-ticket>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm";
import Payment from "../components/Payment";
import TicketChoice from "../components/TicketChoice";
import ShowTicket from "../components/ShowTicket";
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: { LoginForm, TicketChoice, Payment, ShowTicket },
  computed: {
    userAuth() {
      return this.$store.state.isAuth
    },
    hasTicket() {
      return this.$store.state.ticket !== null
    },
    hasMethod() {
      return this.$store.state.paymentMethod !== null
    },
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>
