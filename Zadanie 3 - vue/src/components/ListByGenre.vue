<template>
    <h3>Filmy wg gatunku</h3>
    <div class="container">
        <div v-for="i in genreListSize" :key="i">
            <p>{{ i }}. {{ genreList[i - 1] }}</p>
            <ul>
                <li v-for="movie in moviesByGenre(genreList[i-1])" :key="movie.title">
                    {{ movie.title }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
// import _ from 'underscore';
var _ = require('lodash');


export default {
    props: [
        'dataArray'
    ],
    data() {
        return {
            genreListSize: 0,
            list: [],
            genreList: []
        }
    },
    watch: {
        dataArray: function () {
            // console.log('Prop changed: ', newVal, ' | was: ', oldVal);
            this.setList();
        }
    },
    methods: {
        setList() {
            // console.log("setList dataArray:");
            // console.log(this.dataArray);
            // for (let i = 35000; i < 35100; i++) {
            //     this.list[i - 35000] = this.dataArray[i];
            // }
            this.list = _.slice(this.dataArray, 35000, 35100);
            // console.log("ListByGenre100 dataArray:");
            // console.log(this.list);
            this.genreList = this.uniqueGenres();
            this.genreListSize = this.genreList.length;
        },
        uniqueGenres() {
            const genreSet = new Set();

            this.list.forEach((movie) => {
                movie.genres.forEach((genre) => {
                    genreSet.add(genre);
                });
            });
            console.log(genreSet);
            // Convert the set back to an array
            return Array.from(genreSet);
        },
        moviesByGenre(genre) {
            return this.list.filter((movie) => movie.genres.includes(genre));
        },
    },
    computed: {

    },
}
</script>