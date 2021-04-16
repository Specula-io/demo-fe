<template>
  <div class="payment">
    <b-container class="d-flex justify-content-center">
     <div>
       <b-form-group label="Select payment method" v-slot="{ ariaDescribedby }" class="d-block text-left">
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
           @click.prevent="savePaymentMethod"
           variant="primary"
       >
         Save
       </b-button>
     </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Payment",
  data() {
    return {
      method: null,
    }
  },
  methods: {
    savePaymentMethod() {
      this.$store.dispatch('setPayment', this.method)
    }
  }
}
</script>

<style scoped>

</style>