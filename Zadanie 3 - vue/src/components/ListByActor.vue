<template>
    <h3>Filmy wg obsady</h3>
    <div class="container">
        <div v-for="i in actorsListSize" :key="i">
            <p>{{ i }}. {{ actorsList[i - 1] }}</p>
            <ul>
                <li v-for="movie in moviesByActors(actorsList[i-1])" :key="movie.cast">
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
            actorsListSize: 0,
            list: [],
            actorsList: []
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
            this.actorsList = this.uniqueActors();
            this.actorsListSize = this.actorsList.length;
        },
        uniqueActors() {
            const actorsSet = new Set();

            this.list.forEach((movie) => {
                movie.cast.forEach((actor) => {
                    actorsSet.add(actor);
                });
            });
            console.log(actorsSet);
            // Convert the set back to an array
            return Array.from(actorsSet);
        },
        moviesByActors(actor) {
            return this.list.filter((movie) => movie.cast.includes(actor));
        },
    },
    computed: {

    },
}
</script>