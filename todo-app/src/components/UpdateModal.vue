<template>
    <div>
        <q-btn dense flat :color="$q.dark.isActive ? 'blue-4' : 'primary'" icon="edit" @click="openDialog">
            <q-tooltip>Güncelle</q-tooltip>
        </q-btn>

        <q-dialog v-model="showDialog">
            <q-card class="q-pa-md q-rounded-borders shadow-2" style="min-width: 400px; max-width: 500px"
                :class="$q.dark.isActive ? 'bg-blue-grey-9 text-grey-2' : 'bg-white text-dark'">
                <!-- Başlık -->
                <q-card-section class="q-pt-none">
                    <div class="text-h6 text-center">
                        Görev Güncelle
                    </div>
                </q-card-section>

                <q-separator :color="$q.dark.isActive ? 'grey-8' : 'grey-4'" />

                <!-- Form alanları -->
                <q-card-section>
                    <q-input outlined dense rounded v-model="localTodo.title" label="Başlık" class="q-mb-md"
                        :color="$q.dark.isActive ? 'blue-4' : 'primary'" />

                    <q-input outlined dense rounded v-model="localTodo.description" type="textarea" label="Açıklama"
                        class="q-mb-md" :color="$q.dark.isActive ? 'blue-4' : 'primary'" />

                    <q-select outlined dense rounded v-model="localTodo.priority" :options="['Düşük', 'Orta', 'Yüksek']"
                        label="Öncelik" class="q-mb-md" :color="$q.dark.isActive ? 'blue-4' : 'primary'" />

                    <q-select outlined dense rounded multiple use-chips v-model="localTodo.tag" :options="availableTags"
                        label="Etiketler" class="q-mb-md" :color="$q.dark.isActive ? 'blue-4' : 'primary'" />
                </q-card-section>

                <!-- Butonlar -->
                <q-card-actions align="right">
                    <q-btn flat :color="$q.dark.isActive ? 'grey-5' : 'negative'" label="İptal" v-close-popup />
                    <q-btn :unelevated="!$q.dark.isActive" :outline="$q.dark.isActive" :color="$q.dark.isActive ? 'blue-4' : 'positive'" label="Kaydet" icon="save"
                        @click="updateTodo" />
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
            this.localTodo.updatedAt = new Date()
            // this.$store.commit('updateTodo', this.localTodo)
            this.$store.dispatch('updateTodo', this.localTodo)
            this.showDialog = false
            this.$q.notify({ type: 'positive', message: 'Görev güncellendi' })
        }
    }
}
</script>
