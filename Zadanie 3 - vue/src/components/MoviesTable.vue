<template>
  <SearchMovie @filterChanged="filteredMovies" />
  <div class="container">
    <table class="table" id="movies_Table">
      <tr>
        <th class="">#</th>
        <th class="col-6">Title</th>
        <th class="col-1">Production Year</th>
        <th class="col-3 ">Cast</th>
        <th class="col-2">Genres</th>
      </tr>
      <tr v-for="i in tableRows" :key="i">
        <td>{{ i }}</td>
        <td>{{ movies[i-1].title }}</td>
        <td>{{ movies[i-1].year }}</td>
        <td>{{ movies[i-1].cast.join(', ') }}</td>
        <td>{{ movies[i-1].genres.join(', ') }}</td>
      </tr>
    </table>
    <p>Wyświetlono {{ tableRows }} z {{ movies.length }} filmów</p>
    <button class="btn btn-success col-12" v-on:click="loadMore" :hidden="isButtonDisabled">Pokaż więcej</button>
  </div>
</template>

<script>
import SearchMovie from '@/components/SearchMovie.vue';
import moviesData from '@/assets/movies.json';
import _ from 'underscore';

// const INITIAL_TABLE_SIZE = 10;
let fMovies = [];

export default {
  data() {
    // let tableRows = this.movies.length%INITIAL_TABLE_SIZE;
    let tableRows = 0;
    // let tableRows = INITIAL_TABLE_SIZE;
    // let tableRows = this.movies.length
    // moviesLoaded: false;
    return {
      movies: [],
      tableRows,
      moviesData,
      isButtonDisabled: false,
      filterCriteria: {
        title: "",
        name: "",
        startYear: null,
        endYear: null,
      }
    };
  },
  mounted() {
    this.getMovies();
    this.$emit("movieData", moviesData);
  },
  methods: {
    loadMore() {
      if (this.movies.length - this.tableRows < 10) {
        this.tableRows += this.movies.length % 10;
        console.log("test tableRow <10");
        console.log(this.tableRows);
      } else {
        this.tableRows += 10;
        console.log(this.tableRows);
      }
      if(this.tableRows == this.movies.length) {
        this.isButtonDisabled = true;
      }
    },
    filteredMovies(filter) {
      this.tableRows = 0;
      this.isButtonDisabled = false;
      this.filterCriteria = filter;
      console.log(filter);
      const { title, startYear, endYear, name } = this.filterCriteria;

      fMovies = _.filter(moviesData, function (movie) {
        if ((title == "" || movie.title.toLowerCase().includes(title.toLowerCase())) &&
        (name == "" || movie.cast.some(actor => actor.toLowerCase().includes(name.toLocaleLowerCase()))) &&
        ((startYear == '') || startYear <= movie.year) && (endYear == '' || endYear >= movie.year) ) {
          return movie;
        }
      });
      this.getMovies();
    },
    getMovies() {
      this.movies = [];
      console.log(this.movies);
      if (this.filterCriteria.title === "" && this.filterCriteria.name === "" && this.filterCriteria.endYear === null && this.filterCriteria.startYear === null) {
        console.log('brak filtrow');
        this.movies = (this.moviesData);
        this.loadMore();
      } else {
        console.log("filtry -> fmovies");
        this.movies = (fMovies);
        this.loadMore();
      }
      console.log('movies.length: ', this.movies.length);
      console.log(this.movies);
    },

  },
  components: { SearchMovie }
};
</script>

<style scoped>
/* Add your component-specific styles here */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

/* th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
} */
</style>