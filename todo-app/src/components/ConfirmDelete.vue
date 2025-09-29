<template>
    <div>
        <q-btn dense flat :color="$q.dark.isActive ? 'red-4' : 'negative'" icon="delete" @click.stop.prevent="openDialog" @mousedown.stop>
            <q-tooltip :class="$q.dark.isActive ? 'bg-blue-grey-9 text-grey-2' : 'bg-grey-2 text-dark'">
                Sil
            </q-tooltip>
        </q-btn>
    </div>
</template>


<script>
export default {
    props: {
        todoId: { type: Number, required: true }
    },
    methods: {
        openDialog() {
            this.$q.dialog({
                title: 'Onay',
                message: 'Bu görevi silmek istediğinize emin misiniz?',
                cancel: true,
                persistent: true,
                color: this.$q.dark.isActive ? 'blue-4' : 'primary',
                class: this.$q.dark.isActive ? 'bg-blue-grey-9 text-grey-2' : ''
            }).onOk(() => {
                // this.$store.commit('deleteTodo', this.todoId)
                this.$store.dispatch('deleteTodo', this.todoId)
                this.$q.notify({ type: 'positive', message: 'Görev silindi' })
            })
        }
    }
}
</script>
