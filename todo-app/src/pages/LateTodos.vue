<template>
    <q-page padding :class="$q.dark.isActive ? 'bg-blue-grey-10 text-grey-2' : 'bg-grey-1 text-dark'">
        <div class="row q-col-gutter-md justify-center">
            <div class="col-12 col-md-8">

                <div v-if="lateTodos.length !== 0" class="text-h5 q-mb-md">Geciken Görevler</div>
                <div v-if="lateTodos.length === 0" class="q-pa-xl column items-center justify-center text-center">
                    <q-icon name="check_circle_outline" size="64px" class="q-mb-md" color="green-5" />
                    <div class="text-h6 q-mb-sm">Geciken Görevler Yok!</div>
                    <div class="text-subtitle2 q-mb-md">All tasks are on track. Great job!</div>
                    <q-btn color="primary" label="Go to Todos" icon="list" to="/todos" />
                </div>

                <q-card v-else v-for="todo in lateTodos" :key="todo.id" class="q-mb-md"
                    :class="$q.dark.isActive ? 'bg-blue-grey-9' : 'bg-white'">
                    <q-card-section class="row items-center justify-between">
                        <div class="col-12 col-md-9">
                            <div class="text-h6 q-mb-xs">{{ todo.title || 'No title' }}</div>
                            <div class="text-body2">{{ todo.description || 'No description' }}</div>
                            <div class="row q-gutter-xs q-mt-sm">
                                <q-chip v-for="(tag, i) in todo.tag" :key="'tag-' + i"
                                    :color="$q.dark.isActive ? 'grey-7' : 'grey-5'"
                                    :text-color="$q.dark.isActive ? 'white' : 'black'"
                                    :icon="tag === 'Work' ? 'work' : tag === 'Personal' ? 'person' : tag === 'Important' ? 'priority_high' : 'label'">
                                    {{ tag }}
                                </q-chip>
                            </div>
                        </div>

                        <div class="col-12 col-md-3 q-mt-sm q-mt-md-none">
                            <div class="row q-gutter-sm justify-end">
                                <q-chip color="red" text-color="white" icon="warning">
                                    Late
                                </q-chip>

                            </div>
                        </div>
                    </q-card-section>

                    <q-separator />

                    <q-card-section>
                        <div class="row q-col-gutter-sm items-center">

                            <!-- Tarihler -->
                            <div class="col-12 col-md-6">
                                <q-item dense>
                                    <q-item-section avatar>
                                        <q-icon name="event" />
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>Oluşturulma Tarihi</q-item-label>
                                        <q-item-label caption>{{ todo.createdAt | formatDate }}</q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-item dense>
                                    <q-item-section avatar>
                                        <q-icon name="update" />
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>Hedef Tarih</q-item-label>
                                        <q-item-label caption>{{ todo.dueDate | formatDate }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </div>

                            <div class="col-12 col-md-6">
                                <div class="row q-gutter-sm justify-end">
                                    <q-chip rounded clickable :color="$q.dark.isActive ? 'blue-4' : 'blue-2'"
                                        text-color="$q.dark.isActive ? 'white' : 'black'"
                                        @click="openPostponeModal(todo, '1 Gün')">
                                        1 Gün
                                    </q-chip>
                                    <q-chip rounded clickable :color="$q.dark.isActive ? 'blue-4' : 'blue-2'"
                                        text-color="$q.dark.isActive ? 'white' : 'black'"
                                        @click="openPostponeModal(todo, '3 Gün')">
                                        3 Gün
                                    </q-chip>
                                    <q-chip rounded clickable :color="$q.dark.isActive ? 'blue-4' : 'blue-2'"
                                        text-color="$q.dark.isActive ? 'white' : 'black'"
                                        @click="openPostponeModal(todo, '1 Hafta')">
                                        1 Hafta
                                    </q-chip>
                                </div>
                            </div>

                        </div>
                    </q-card-section>


                </q-card>
                <q-dialog v-model="postponeDialog.show">
                    <q-card :class="$q.dark.isActive ? 'bg-blue-grey-9 text-white' : 'bg-white text-dark'"
                        style="min-width: 350px; max-width: 450px;">

                        <q-card-section class="row items-center q-pb-none justify-center">
                            <q-icon name="schedule" size="36px" class="q-mr-sm"
                                :color="$q.dark.isActive ? 'orange-5' : 'orange-6'" />
                            <div class="text-h6">Görevi Ertele</div>
                        </q-card-section>
                        <q-card-section class="text-center q-pt-none q-mb-sm">
                            <div class="text-subtitle1">
                                <strong>{{ postponeDialog.days }}</strong> süreyle ertelenecek ve yeniden görev
                                listenize eklenecek.<br>
                                Onaylıyor musunuz?
                            </div>
                        </q-card-section>

                        <q-separator />

                        <q-card-actions align="right">
                            <q-btn flat label="Hayır" color="negative" @click="postponeDialog.show = false" />
                            <q-btn flat label="Evet" color="positive" @click="confirmPostpone" />
                        </q-card-actions>

                    </q-card>
                </q-dialog>

            </div>
        </div>
    </q-page>
</template>

<script>
export default {
    name: 'LateTodosPage',
    data() {
        return {
            postponeDialog: {
                show: false,
                days: ''
            },
            lateTodo: {}
        }
    },
    computed: {
        lateTodos() {
            return this.$store.getters.timeUpTodos;
        }
    },
    methods: {
        openPostponeModal(todo, days) {
            this.lateTodo = todo;
            this.postponeDialog.days = days;
            this.postponeDialog.show = true;
        },
        confirmPostpone() {
            let daysToAdd = 0

            if (this.postponeDialog.days === '1 Gün') {
                daysToAdd = 1
            }
            else if (this.postponeDialog.days === '3 Gün') {
                daysToAdd = 3
            }
            else if (this.postponeDialog.days === '1 Hafta') {
                daysToAdd = 7
            }

            // statusleri değişecek......

            // this.$store.commit('postponeTodo', { todoId: this.lateTodo.id, postpone: daysToAdd })
            this.$store.dispatch('postponeTodo', { todoId: this.lateTodo.id, postpone: daysToAdd });

            this.postponeDialog.show = false;


        }
    }

}
</script>
