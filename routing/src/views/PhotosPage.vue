<template>
    <div class="photos">
        <h1>Photos Page</h1>
        <p>Welcome to the Photos Page!</p>
        <div class="card" style="width: 18rem" v-if="photo">
            <img :src="photo.url" class="card-img-top">
            <div class="card-body">
                <p class="card-text">{{ photo.title }}</p>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'PhotosPage',
    data() {
        return {
            photo: null,
        };
    },
    created() {
        this.fetchData();

    },
    watch: {
        '$route.params.id': 'fetchData' // route param id de değişiklik olursa fetch memtoıun tekrar çalışıtr
    },
    methods: {
        fetchData() {
            fetch('https://jsonplaceholder.typicode.com/photos/' + this.$route.params.id)
                .then(response => response.json())
                .then(data => {
                    this.photo = data
                });

        }

    },
};

</script>