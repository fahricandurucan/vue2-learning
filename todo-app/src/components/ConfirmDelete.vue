<template>
    <div>
        <q-btn dense flat color="negative" icon="delete" @click="openDialog" />
        <q-tooltip>Sil</q-tooltip>
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
                persistent: true
            }).onOk(() => {
                this.$store.commit('deleteTodo', this.todoId)
                this.$q.notify({ type: 'positive', message: 'Görev silindi' })
            })
        }
    }
}
</script>
