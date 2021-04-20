<template>
  <div class="movie-item">
    <b-img :src="movie.poster.includes('http')? movie.poster : 'https://picsum.photos/270/270/?image=54'" alt="Image 1"></b-img>
    <div class="info">
      <h4>{{ movie.title }}</h4>
      <div>
        <p>{{ movie.runtime }} min</p>
      </div>
    </div>
    <div class="w-50">
      <b-form-group
        id="input-group-4"
        label="Select count ticked:"
        label-for="ticketCount"
      >
        <div class="d-flex w-100">
          <b-form-input
            class="w-50"
            v-model="ticketCount"
            id="ticketCount"
            type="number"
            min="1"
            max="12"
          ></b-form-input>
          <b-button
            class="w-50"
            variant="primary"
            type="submit"
            @click.prevent="buy"
          >
            Buy
          </b-button>
        </div>
      </b-form-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieItem",
  data() {
    return {
      ticketCount: 1,
    }
  },
  emits: ['buyTickets'],
  props: ['movie'],
  methods: {
    buy() {
      this.$emit('buyTickets', {movie: this.movie, ticketCount: this.ticketCount})
    }
  }
}
</script>

<style scoped>
.movie-item{
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.09);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 10px;
  width: 30%;
  padding-bottom: 10px ;
}

.movie-item img{
  border-radius: 10px 10px 0 0;
  width: 100%;
}

.movie-item .info{
  margin-top: 8px;
  width: 86%;
  display: block;
}
</style>