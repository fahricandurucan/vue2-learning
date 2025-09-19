<template>
    <div class="card-list">
                <h2>{{ title }}</h2>
                <div class="row">
                    <CardItem v-for="(card, index) in cards" :key="index" :item="card"/>
                </div>
            </div>
</template>



<script>
import CardItem from './CardItem.vue';

export default {
    name: 'CardLists',
    components: { CardItem },
     props: {
            title: { type: String, required: false, default: 'Card List' },
            // eslint-disable-next-line vue/require-valid-default-prop
            cards: { type: Array, required: true, default: [] }
        },
}
</script>