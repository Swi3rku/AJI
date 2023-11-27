<template>
    <h3>Filmy wg obsady</h3>
    <div class="container">
        <div v-for="i in actorsListSize" :key="i">
            <p>{{ i }}. {{ actorsList[i - 1] }}</p>
            <ul>
                <li v-for="movie in moviesByActors(actorsList[i - 1])" :key="movie.cast">
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
            actorsListSize: 0,
            list: [],
            actorsList: []
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
            this.actorsList = this.uniqueActors();
            this.actorsListSize = this.actorsList.length;
        },
        uniqueActors() {
            const actorsSet = new Set();
            let sortedActors = [];
            _.forEach(this.list, (movie) => {
                movie.cast.forEach((actor) => {
                    actorsSet.add(actor);
                });
            });
            sortedActors = _.sortBy(Array.from(actorsSet));
            return sortedActors;
        },
        moviesByActors(actor) {
            let tmp = [];
            tmp = this.list.filter((movie) => movie.cast.includes(actor))
            return _.sortBy(tmp, 'title');
        },
    },
}
</script>