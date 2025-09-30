<template>
    <q-page padding :class="$q.dark.isActive ? 'bg-blue-grey-10 text-grey-2' : 'bg-grey-1 text-dark'">
        <div class="row q-col-gutter-md justify-center">
            <div class="col-12 col-md-8">
                <q-card :class="$q.dark.isActive ? 'bg-blue-grey-9' : 'bg-white'">
                    <q-card-section class="row items-center justify-between">
                        <div class="col-12 col-md-9">
                            <div class="text-h5 q-mb-xs">{{ (todo.title) || 'Başlık bulunamadı' }}</div>
                            <div class="text-body2">{{ (todo && todo.description) || 'Açıklama bulunamadı' }}</div>
                            <div class="row q-gutter-xs q-mt-sm">
                                <template v-if="todo && todo.tag && todo.tag.length">
                                    <q-chip v-for="(tag, i) in todo.tag" :key="'tag-' + i"
                                        :color="$q.dark.isActive ? 'grey-7' : 'grey-5'"
                                        :text-color="$q.dark.isActive ? 'white' : 'black'"
                                        :icon="tag === 'İş' ? 'work' : tag === 'Kişisel' ? 'person' : tag === 'Önemli' ? 'priority_high' : 'label'">
                                        {{ tag }}
                                    </q-chip>
                                </template>
                            </div>
                        </div>
                        <div class="col-12 col-md-3 q-mt-sm q-mt-md-none">
                            <div class="row q-gutter-sm justify-end">
                                <q-chip :color="todo && todo.isDone ? 'positive' : 'primary'" text-color="white"
                                    :icon="todo && todo.isDone ? 'check_circle' : 'play_circle'">
                                    {{ todo.status === 'unCompleted' ? 'Tamamlanmadı' :
                                        todo.status === 'continue' ? 'Devam Ediyor' : todo.status === 'wait' ? 'Beklemede' :
                                            todo.status === 'completed' ? 'Tamamlandı' : '???' }}
                                </q-chip>
                                <q-chip v-if="todo && todo.dueDate" color="orange" text-color="white" icon="schedule">
                                    {{ todo.dueDate | formatDate }}
                                </q-chip>
                                <q-chip v-if="todo && todo.dueDate && !todo.isDone && todo.isOverdue" color="red-4"
                                    text-color="white" icon="warning">
                                    Süre doldu
                                </q-chip>
                            </div>
                        </div>
                    </q-card-section>

                    <q-separator />


                </q-card>

                <div class="row q-mt-md q-gutter-sm">
                    <!-- <q-btn unelevated color="primary" label="Düzenle" icon="edit" />
                    <q-btn outline color="negative" label="Sil" icon="delete" /> -->
                    <q-btn flat color="grey" label="Geri Dön" icon="arrow_back" to="/" replace />
                </div>

                <!-- Özet kartı: ana sütunda, aksiyonların altında -->
                <q-card class="q-mt-md" :class="$q.dark.isActive ? 'bg-blue-grey-9' : 'bg-white'">
                    <q-card-section>
                        <div class="text-subtitle2 q-mb-sm">Özet</div>
                        <div class="row q-col-gutter-sm">
                            <div class="col-6">
                                <q-item dense>
                                    <q-item-section avatar>
                                        <q-icon name="label" />
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>Öncelik</q-item-label>
                                        <q-item-label caption>{{ (todo && todo.priority) || 'Belirsiz' }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </div>

                            <div class="col-12">
                                <q-item dense>
                                    <q-item-section avatar>
                                        <q-icon name="event" />
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>Oluşturma</q-item-label>
                                        <q-item-label caption>{{ todo.createdAt | formatDate }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </div>
                            <div class="col-12">
                                <q-item dense>
                                    <q-item-section avatar>
                                        <q-icon name="update" />
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>Son düzenleme</q-item-label>
                                        <q-item-label caption>{{ todo.updatedAt | formatDate }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </div>
                            <div class="col-12" v-if="todo && todo.dueDate">
                                <q-item dense>
                                    <q-item-section avatar>
                                        <q-icon name="schedule" />
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>Hedef</q-item-label>
                                        <q-item-label caption>{{ todo.dueDate | formatDate }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </div>
                        </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <div class="text-subtitle2 q-mb-sm">Etiketler</div>
                        <div class="row q-gutter-xs">
                            <template v-if="todo && todo.tag && todo.tag.length">
                                <q-chip v-for="(tag, i) in todo.tag" :key="'side-tag-' + i"
                                    :color="$q.dark.isActive ? 'grey-7' : 'grey-5'"
                                    :text-color="$q.dark.isActive ? 'white' : 'black'"
                                    :icon="tag === 'İş' ? 'work' : tag === 'Kişisel' ? 'person' : tag === 'Önemli' ? 'priority_high' : 'label'">
                                    {{ tag }}
                                </q-chip>
                            </template>
                            <div v-else :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'" class="text-caption">
                                Etiket yok
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </div>

        </div>
    </q-page>
</template>

<script>


export default {
    name: 'TodoDetailPage',
    data() {
        return {
            todo: null,
        }
    },
    //CREATED DA OLUR
    mounted() {
        const id = this.$route.params.id
        this.todo = this.$store.getters.allTodos.find(t => t.id == id)
    }

}
</script>
