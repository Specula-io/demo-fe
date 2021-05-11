<template>
  <div class="payment" :class="{ 'loading-mask': isLoading }">
    <b-container class="d-flex justify-content-center">
      <div v-if="!successMessage">
        <b-form-group
          label="Select payment method"
          v-slot="{ ariaDescribedby }"
          class="d-block text-left"
        >
          <b-form-radio
            v-model="method"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="PayPal"
          >
            PayPal
          </b-form-radio>
          <b-form-radio
            v-model="method"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="Credit Card"
          >
            Credit Card
          </b-form-radio>
        </b-form-group>
        <b-button
          type="submit"
          @click.prevent="submitBookingDetails"
          variant="primary"
        >
          Save
        </b-button>
      </div>
      <div v-if="successMessage">
        <div>
          {{ successMessage }}
        </div>
        <b-button
          type="submit"
          @click.prevent="goToMainView"
        >
          Ok
        </b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "Payment",
  data() {
    return {
      isLoading: false,
      method: null,
      successMessage: null
    };
  },
  computed: {
    ticket() {
      return this.$store.getters.getTicket;
    },
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    ...mapActions(['resetTicket']),
    async submitBookingDetails() {
      this.isLoading = true;
      try {
        let { orderId } = await this.createBooking();
        this.successMessage = `Booking was created. Your order id is ${orderId}`;
      } catch (err) {
        console.log("err", err);
      }
      this.isLoading = false;
    },
    async createBooking() {
      return this.$axios
        .post("/booking", {
          booking: {
            city: "string",
            cinema: this.ticket.cinema.name,
            movie: this.ticket.movie.title,
            schedule: "2022-04-13T14:11:43.903Z",
            cinemaRoom: 0,
            seats: ["1"],
            totalAmount: this.ticket.ticketCount,
          },
          user: {
            name: this.user.email.split("@")[0],
            lastName: this.user.email.split("@")[0],
            email: this.user.email,
            creditCard: {
              number: "1111222233334444",
              cvc: "123",
              exp_month: "07",
              exp_year: "2017",
            },
            phoneNumber: "123-456-7890",
            membership: "7777888899990000",
          },
        })
        .then((res) => res.data);
    },
    goToMainView() {
      this.resetTicket();
    }
  },
};
</script>

<style scoped>
</style>