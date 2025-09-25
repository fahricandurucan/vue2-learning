<template>
    <div>
        <q-btn dense flat color="primary" icon="edit" @click="openDialog">
            <q-tooltip>Güncelle</q-tooltip>
        </q-btn>

        <q-dialog v-model="showDialog">
            <q-card class="q-pa-md q-rounded-borders shadow-2" style="min-width: 400px; max-width: 500px">

                <q-card-section class="q-pt-none">
                    <div class="text-h6 text-center">Görev Güncelle</div>
                </q-card-section>

                <q-separator />

                <q-card-section>
                    <q-input outlined dense v-model="localTodo.title" label="Başlık" class="q-mb-md" />
                    <q-input outlined dense v-model="localTodo.description" type="textarea" label="Açıklama"
                        class="q-mb-md" />

                    <q-select outlined dense v-model="localTodo.priority" :options="['Düşük', 'Orta', 'Yüksek']"
                        label="Öncelik" class="q-mb-md" />

                    <q-select outlined dense multiple use-chips v-model="localTodo.tag" :options="availableTags"
                        label="Etiketler" class="q-mb-md" />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat color="negative" label="İptal" v-close-popup />
                    <q-btn flat color="positive" label="Kaydet" icon="save" @click="updateTodo" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
export default {
    props: {
        todo: { type: Object, required: true }
    },
    data() {
        return {
            showDialog: false,
            localTodo: {},
            availableTags: ['İş', 'Kişisel', 'Önemli', 'Diğer']
        }
    },
    methods: {
        openDialog() {
            this.localTodo = { ...this.todo, tag: [...this.todo.tag] }
            this.showDialog = true
        },
        updateTodo() {
            this.$store.commit('updateTodo', this.localTodo)
            this.showDialog = false
            this.$q.notify({ type: 'positive', message: 'Görev güncellendi' })
        }
    }
}
</script>
