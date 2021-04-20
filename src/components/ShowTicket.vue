<template>
  <b-container>
    <b-card class="w-50 mx-auto" title="Your Ticket">
      <b-card-text>
        <h3>Cinema: {{ ticket.cinema.name }}</h3>
      </b-card-text>
      <b-card-text>
        <h4>Movies: {{ ticket.movie.title }}</h4>
        <b-img v-if="ticket.movie.poster.includes('http')" :src="ticket.movie.poster" alt="Image 1"></b-img>
        <p>Plot: {{ ticket.movie.plot }}</p>
        <p>Movie time: {{ ticket.movie.runtime }}min.</p>
        <p>Count tickets: {{ ticket.ticketCount }}</p>
        <p>Payment Method: {{ ticket.paymentMethod }}</p>
      </b-card-text>
    </b-card>
    <b-button class="mt-4" @click="resetTicket">Reset</b-button>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "ShowTicket",
  computed: {
    ticket() {
      return this.$store.getters.getTicket
    },
  },
  methods: {
    ...mapActions(['resetTicket']),
  }

}
</script>

<style scoped>

</style>