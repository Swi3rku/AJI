<template>
    <div class="container">
        <form class="form-group row" action="">
            <div class="form-group">
                <label for="movieTitle">Tytuł</label>
                <input type="text" id="movieTitle" v-model="movieTitle" class="col-12"
                    placeholder="Podaj tytuł lub fragment tytułu filmu">
            </div>
            <div class="form-group inline">
                <label for="startDate" class="col-4">Rok produkcji od:</label>
                <input type="number" id="startDate" v-model="startDate" class="col-8" min="1900" max="2023"
                    placeholder="Liczba naturalna z przedziału 1900-2023">
            </div>
            <div class="form-group inline">
                <label for="endDate" class="col-4">Rok produkcji do:</label>
                <input type="number" id="endDate" v-model="endDate" class="col-8" min="1900" max="2023"
                    placeholder="Liczba naturalna z przedziału 1900-2023">
            </div>
            <div class="form-group">
                <label for="name">Obsada</label>
                <input type="text" id="name" v-model="name" class="col-12" placeholder="Imię i nazwisko">
            </div>
        </form>
        <button class="btn btn-info col-12" @click="applyFilter">Szukaj</button>
    </div>
</template>

<script>
export default {
    emits: ['filterChanged'],
    data() {
        return {
            movieTitle: '', 
            startDate: '', 
            endDate: '', 
            name: '',
            filterCriteria: {
                title: '',
                startYear: null,
                endYear: null,
                name: '',
            },
        };
    },
    methods: {
        applyFilter() {
            this.filterCriteria.title = this.movieTitle;
            this.filterCriteria.startYear = this.startDate;
            this.filterCriteria.endYear = this.endDate;
            this.filterCriteria.name = this.name;
            this.emitFilterChanged();
        },
        emitFilterChanged() {
            this.$emit('filterChanged', { ...this.filterCriteria });
        },
    },
};
</script>
