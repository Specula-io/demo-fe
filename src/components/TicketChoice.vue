<template>
  <div class="TicketChoice">
    <b-container class="d-flex justify-content-center">
      <b-form class="w-100 text-left" @submit.prevent="sendTicket">
        <div class="d-flex justify-content-between">
          <b-form-group
            class="w-45"
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
            class="w-45"
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
        </div>

        <div v-if="possibleMovies.length" class="movies">
            <movie-item
              v-for="movie in possibleMovies"
              :key="movie.id"
              :movie="movie"
              @buyTickets="(val) => sendTicket(val)"
            ></movie-item>
        </div>

      </b-form>
    </b-container>
  </div>
</template>

<script>
import MovieItem from "./MovieItem";

export default {
  name: "TicketChoice",
  components: {MovieItem},
  comments: {MovieItem},
  data() {
    return {
      country: null,
      cinema: null,
      movie: null,
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
      promises.push(this.$axios.get('/cinemas'));
      Promise.all(promises)
        .then(([ countries, states, cities, cinemas]) =>{
          this.countriesList = countries.data
          this.statesList = states.data;
          this.citiesList = cities.data
          this.cinemasList = cinemas.data
        })
        .catch(([errorCountries, errorStates, errorCities, errorCinemas]) => {
          console.error(errorCountries)
          console.error(errorStates)
          console.error(errorCities)
          console.error(errorCinemas)
        })
    },
    sendTicket(data) {
      this.$store.dispatch('setTicket', {
        cinema: this.cinemasList.find(cinema => cinema._id === this.cinema),
        movie: data.movie,
        ticketCount: data.ticketCount,
      })
    },
    getCinema(val) {
      const states = this.statesList.filter(state => state.country_id === val)
      const citiesIds = states.reduce((_, state) => ([ ..._, ...state.cities ]), []);
      const cinemasIds = this.citiesList.reduce((_, city) => {
        if(citiesIds.includes(city._id)) {
          return [..._, ...city.cinemas];
        }
        return _;
      }, []);
      this.possibleCinemas = this.cinemasList.filter(c => cinemasIds.includes(c._id));
      this.possibleMovies = []
      this.cinema = null
      this.movie = null
      this.hasMovies = true
    },
    getMovies(val) {
      console.log(val)
      this.$axios
        .get(`/cinemas/${val}`)
        .then(resp => {
          if(resp.data.cinemaPremieres) {
            this.possibleMovies = resp.data.cinemaPremieres
            console.log("possibleMovies : ", this.possibleMovies)

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
.w-45{
  width: 45%;
}
.movies{
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 5%;
}


</style>