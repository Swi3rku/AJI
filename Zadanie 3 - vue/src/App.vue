<template>
  <div class="container">
    <h1>Baza filmów</h1>
    <moviesTable @movieData="receiveArray" />
    <ListByGenre :dataArray="tmp" />
    <ListByActor :dataArray="tmp" />
  </div>
</template>

<script>
import moviesTable from './components/MoviesTable.vue'
import ListByGenre from './components/ListByGenre.vue';
import ListByActor from './components/ListByActor.vue';

export default {
  name: 'App',
  components: {
    moviesTable,
    ListByGenre,
    ListByActor
},
  data() {
    return {
      tmp: [],
    };
  },
  methods: {
    receiveArray(array) {
      this.tmp = array;
    }
  }
}
</script>



<style>
</style>
