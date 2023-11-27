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
            this.setList();
        }
    },
    methods: {
        setList() {
            this.list = _.slice(this.dataArray, 35000, 35100);
            this.genreList = this.uniqueGenres();
            this.genreListSize = this.genreList.length;
        },
        uniqueGenres() {
            const genreSet = new Set();
            let sortedGeners = [];
            _.forEach(this.list, (movie) => {
                movie.genres.forEach((genre) => {
                    genreSet.add(genre);
                });
            });
            sortedGeners = _.sortBy(Array.from(genreSet));
            return sortedGeners;
        },
        moviesByGenre(genre) {
            let tmp = [];
            tmp = _.filter(this.list, (movie) => movie.genres.includes(genre));
            return _.sortBy(tmp, 'title');
        },
    },
}
</script>