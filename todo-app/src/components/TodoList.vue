<template>
    <div class="q-pa-md column">
        <!-- Başlık kısmı -->
        <div class="row items-center q-mb-md">
            <div class="col-auto">
                <h3 class="q-my-none">ToDo List</h3>
            </div>
            <div class="col-auto q-ml-sm">
                <q-badge color="primary" rounded class="text-h6 q-pa-sm"
                    :label="(getTodoList && getTodoList.length) ? getTodoList.length + ' görev' : '0 tamamlanan'" />
            </div>
            <div class="col-auto q-ml-sm">
                <q-badge color="primary" rounded class="text-h6 q-pa-sm"
                    :label="(completedTodoList && completedTodoList.length) ? completedTodoList.length + ' tamamlanan' : '0 görev'" />
            </div>
        </div>

        <!-- Search kısmı -->

        <div class="q-mb-md">
            <q-card flat bordered class="q-pa-md bg-white">
                <div class="row q-col-gutter-md items-center">
                    <div class="col-12 col-md-4">
                        <q-input outlined dense placeholder="Başlık/Açıklama ara..." clearable v-model="searchType" />
                    </div>
                    <div class="col-6 col-md-3">
                        <q-select outlined dense label="Öncelik" :options="['Düşük', 'Orta', 'Yüksek']"
                            v-model="searchPriority" clearable />
                    </div>
                    <div class="col-6 col-md-5">
                        <q-select outlined dense multiple use-chips label="Etiketler" v-model="searchTags"
                            :options="['İş', 'Kişisel', 'Önemli']" clearable />
                    </div>
                </div>
            </q-card>
        </div>

        <!-- Tamamlanmayan ve yeni eklnen görevler kısmı -->
        <div v-if="activeTodoList && activeTodoList.length" class="q-mb-md"
            style="max-height: 300px; overflow-y: auto;">
            <q-list bordered separator class="rounded-borders bg-white">
                <div v-for="(todo, index) in activeTodoList" :key="todo.id || index">
                    <q-item :key="todo.id || index" clickable v-ripple>
                        <q-item-section avatar>
                            <q-avatar :color="todo.isDone ? 'positive' : 'grey-4'" text-color="white">
                                <q-icon :name="todo.isDone ? 'check' : 'event_note'" />
                            </q-avatar>
                        </q-item-section>

                        <q-item-section>
                            <div class="row items-center no-wrap">
                                <div class="col text-weight-medium text-body1 ellipsis">{{ todo.title }}</div>
                            </div>
                            <div class="text-grey-7 text-caption q-mt-xs">{{ todo.description }}</div>

                            <div class="row items-center q-gutter-xs q-mt-sm">
                                <q-badge
                                    :color="todo.priority === 'Düşük' ? 'green' : (todo.priority === 'Orta' ? 'blue' : (todo.priority === 'Yüksek' ? 'red' : 'grey'))"
                                    text-color="white" :label="'Öncelik: ' + (todo.priority || 'Belirsiz')" />

                                <template v-for="(tag, i) in todo.tag">
                                    <q-chip :key="i" dense color="grey-5" text-color="black"
                                        :icon="tag === 'İş' ? 'work' : tag === 'Kişisel' ? 'person' : tag === 'Önemli' ? 'priority_high' : 'label'">
                                        {{ tag }}
                                    </q-chip>
                                </template>
                            </div>
                        </q-item-section>

                        <q-item-section side top>
                            <div class="row items-center q-gutter-xs">

                                <update-modal :todo="todo"></update-modal>
                                <confirm-delete :todo-id="todo.id"></confirm-delete>

                                <q-icon v-if="todo.isDone" name="check_circle" color="positive" size="24px"
                                    @click="toggleTodoDone(todo)">
                                    <q-tooltip>Tamamlandı</q-tooltip>
                                </q-icon>
                                <q-icon v-else name="radio_button_unchecked" color="grey-5" size="24px"
                                    @click="toggleTodoDone(todo)">
                                    <q-tooltip>Henüz tamamlanmadı</q-tooltip>
                                </q-icon>
                            </div>
                        </q-item-section>
                    </q-item>
                    <q-separator :key="'active-sep-' + (todo.id || index)" spaced inset="item" />
                </div>
            </q-list>
        </div>

        <!-- Tamamlanan todolar -->
        <div v-if="completedTodoList && completedTodoList.length" class="q-mt-lg">
            <div class="text-subtitle2 text-grey-7 q-mb-sm">Tamamlananlar</div>
            <q-list bordered separator class="rounded-borders bg-grey-1">
                <div v-for="(todo, index) in completedTodoList" :key="todo.id || index">
                    <q-item :key="todo.id || index">
                        <q-item-section avatar>
                            <q-avatar color="positive" text-color="white">
                                <q-icon name="check" />
                            </q-avatar>
                        </q-item-section>
                        <q-item-section>
                            <div class="row items-center no-wrap">
                                <div class="col text-weight-medium text-body1 text-strike text-grey-7 ellipsis">{{
                                    todo.title }}
                                </div>
                            </div>
                            <div class="text-grey-6 text-caption text-strike q-mt-xs">{{ todo.description }}</div>
                            <div class="row items-center q-gutter-xs q-mt-sm">
                                <q-badge
                                    :color="todo.priority === 'Düşük' ? 'green' : (todo.priority === 'Orta' ? 'blue' : (todo.priority === 'Yüksek' ? 'red' : 'grey'))"
                                    text-color="white" :label="'Öncelik: ' + (todo.priority || 'Belirsiz')" />
                                <template v-for="(tag, i) in todo.tag">
                                    <q-chip :key="i" dense color="grey-5" text-color="black"
                                        :icon="tag === 'İş' ? 'work' : tag === 'Kişisel' ? 'person' : tag === 'Önemli' ? 'priority_high' : 'label'">
                                        {{ tag }}
                                    </q-chip>
                                </template>
                            </div>
                        </q-item-section>
                        <q-item-section side top>
                            <div class="row items-center q-gutter-xs">
                                <confirm-delete :todo-id="todo.id"></confirm-delete>
                                <q-btn flat round dense icon="history" color="grey-7"
                                    @click.stop="toggleTodoDone(todo)">
                                    <q-tooltip>Geri al</q-tooltip>
                                </q-btn>
                            </div>
                        </q-item-section>
                    </q-item>
                    <q-separator :key="'done-sep-' + (todo.id || index)" spaced inset="item" />
                </div>
            </q-list>
        </div>

        <!-- Boş durum -->
        <div v-if="!(completedTodoList && completedTodoList.length) && !(activeTodoList && activeTodoList.length)">
            <q-card flat bordered class="q-pa-lg flex flex-center column bg-grey-1">
                <q-icon name="assignment" size="48px" color="grey-5" />
                <div class="text-subtitle1 q-mt-sm">Henüz eklenmiş bir todo yok</div>
                <div class="text-caption text-grey-7">Yeni bir görev ekleyerek başlayın.</div>
            </q-card>
        </div>
    </div>

</template>

<script>
import ConfirmDelete from './ConfirmDelete.vue';
import UpdateModal from './UpdateModal.vue';

export default {
    name: 'TodoList',
    components: {
        ConfirmDelete,
        UpdateModal
    },
    data() {
        return {
            searchType: '',
            searchPriority: '',
            searchTags: [],
        }
    },
    computed: {
        getTodoList() {
            console.log(this.$store.getters.allTodos.length);
            return this.$store.getters.allTodos;
        },
        activeTodoList() {
            return this.$store.getters.activeTodoList
                .filter(todo => {
                    if (!this.searchType) return true
                    return todo.title.toLowerCase().includes(this.searchType.toLowerCase()) ||
                        todo.description.toLowerCase().includes(this.searchType.toLowerCase())
                })
                .filter(todo => {
                    if (!this.searchPriority) return true
                    return todo.priority === this.searchPriority
                })
                .filter(todo => {
                    if (!this.searchTags || !this.searchTags.length) return true
                    return todo.tag.some(tag => this.searchTags.includes(tag))
                });
            // return (this.getTodoList || []).filter(t => !t.isDone)
        },
        completedTodoList() {
            return this.$store.getters.completedTodoList
                .filter(todo => {
                    if (!this.searchPriority) return true
                    return todo.priority === this.searchPriority
                })
                .filter(todo => {
                    if (!this.searchTags || !this.searchTags.length) return true
                    return todo.tag.some(tag => this.searchTags.includes(tag))
                });
        },
    },
    methods: {
        toggleTodoDone(todo) {
            this.$store.commit('toggleTodoDone', todo.id);

        },
    }

}
</script>
