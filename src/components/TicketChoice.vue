<template>
  <div class="TicketChoice">
    <b-container class="d-flex justify-content-center">
      <b-form class="w-50 text-left" @submit.prevent="sendTicket">

        <b-form-group
            id="input-group-1"
            label="Select country:"
            label-for="country"
        >
          <b-form-select
              :options="countriesList"
              id="country"
              value-field="_id"
              text-field="name"
              v-model="country"
              required
          ></b-form-select>
        </b-form-group>

        <b-form-group
            v-if="possibleCinemas.length"
            id="input-group-2"
            label="Select cinemas:"
            label-for="cinema"
            :description="showDescCinemas"
        >
          <b-form-select
              :options="possibleCinemas"
              id="cinema"
              value-field="_id"
              text-field="name"
              v-model="cinema"
              required
          ></b-form-select>
        </b-form-group>

        <b-form-group
            v-if="possibleMovies.length"
            id="input-group-3"
            label="Select cinemas:"
            label-for="movie"
        >
          <b-form-select
              :options="possibleMovies"
              id="movie"
              value-field="id"
              text-field="title"
              v-model="movie"
              required
          ></b-form-select>
        </b-form-group>

        <b-form-group
            v-if="movie"
            id="input-group-4"
            label="Select count ticked:"
            label-for="ticketCount"
        >
          <b-form-input
              v-model="ticketCount"
              id="ticketCount"
              type="number"
              min="1"
              max="12"
          ></b-form-input>
        </b-form-group>

        <b-button variant="primary" type="submit" v-show="formCompleted">Send</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>

export default {
  name: "TicketChoice",
  data() {
    return {
      country: null,
      cinema: null,
      movie: null,
      ticketCount: 1,
      hasMovies: true,

      countriesList: [],
      statesList: [],
      citiesList: [],
      cinemasList: [],

      possibleCinemas: [],
      possibleMovies: [],
    }
  },
  computed: {
    formCompleted() {
      return this.country && this.cinema && this.movie && this.ticketCount !== 0
    },
    showDescCinemas() {
      return !this.hasMovies? 'There are no movies in the selected cinema': ''
    }
  },
  mounted() {
    this.getData()
  },
  watch: {
    country(val) {
      if(val){
        this.getCinema(val)
      }
    },
    cinema(val) {
      if(val){
        this.getMovies(val)
      }
    }
  },
  methods: {
    getData() {
      const promises = [];
      promises.push(this.$axios.get('/countries'));
      promises.push(this.$axios.get('/states'));
      promises.push(this.$axios.get('/cities'));
      Promise.all(promises)
          .then(([ countries, states, cities]) =>{
            this.countriesList = countries.data
            this.statesList = states.data;
            this.citiesList = cities.data
          })
          .catch(([errorCountries, errorStates, errorCities, errorCinemas]) => {
            console.error(errorCountries)
            console.error(errorStates)
            console.error(errorCities)
            console.error(errorCinemas)
          })
    },
    sendTicket() {
      this.$store.dispatch('setTicket', {
        cinema: this.cinemasList.find(cinema => cinema._id === this.cinema),
        movie: this.possibleMovies.find(movie => movie.id === this.movie),
        ticketCount: this.ticketCount,
      })
    },
    async getCinema(val) {
      const states = this.statesList.filter(state => state.country_id === val)
      const citiesIds = states.reduce((_, state) => ([ ..._, ...state.cities ]), []);
      /* const cinemasIds = this.citiesList.reduce((_, city) => {
        if(citiesIds.includes(city._id)) {
          return [..._, ...city.cinemas];
        }
        return _;
      }, []); */
      
      let getCities = citiesIds.map(cityId => {
        return this.$axios.get(`/cinemas?cityId=${cityId}`);
      });
      
      let cinemas = (await Promise.all(getCities)).flat().map(res => res.data).flat()
      
      this.cinemasList = cinemas;
      this.possibleCinemas = cinemas;
      
      // this.possibleCinemas = this.cinemasList.filter(c => cinemasIds.includes(c._id));
      this.possibleMovies = []
      this.cinema = null
      this.movie = null
      this.hasMovies = true
    },
    getMovies(val) {
      this.$axios
          .get(`/cinemas/${val}`)
          .then(resp => {
            if(resp.data.cinemaPremieres) {
              this.possibleMovies = resp.data.cinemaPremieres
              this.hasMovies = true
            }else{
              this.hasMovies = false
            }
          })
          .catch(e => {
            console.error(e)
          })
      this.movie = null
    }
  }
}
</script>

<style scoped>

</style>