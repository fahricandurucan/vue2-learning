<template>
    <div class="q-pa-md column" :class="$q.dark.isActive ? 'bg-blue-grey-10 text-grey-2' : 'bg-grey-1 text-dark'">

        <!-- Başlık kısmı -->
        <q-card flat bordered class="q-mb-md" :class="$q.dark.isActive ? 'bg-blue-grey-9 text-grey-2' : 'bg-white text-dark'">
            <q-toolbar>
                <q-toolbar-title class="row items-center">
                    <q-icon name="checklist" :color="$q.dark.isActive ? 'blue-4' : 'primary'" size="md"
                        class="q-mr-sm" />
                    <span class="text-h5">ToDo List</span>
                </q-toolbar-title>
                <div class="row items-center q-gutter-sm">
                    <q-badge :color="$q.dark.isActive ? 'blue-4' : 'primary'" rounded class="text-subtitle2 q-pa-sm"
                        outline
                        :label="(getTodoList && getTodoList.length) ? getTodoList.length + ' görev' : '0 görev'" />
                    <q-badge :color="$q.dark.isActive ? 'green-4' : 'positive'" rounded class="text-subtitle2 q-pa-sm"
                        outline
                        :label="(completedTodoList && completedTodoList.length) ? completedTodoList.length + ' tamamlanan' : '0 tamamlanan'" />
                    <q-separator vertical spaced />
                    <q-btn v-if="hasActiveFilters" dense outline :color="$q.dark.isActive ? 'grey-4' : 'grey-7'"
                        icon="filter_alt_off" label="Filtreleri temizle" @click="clearFilters" />
                </div>
            </q-toolbar>
        </q-card>

        <!-- Search kısmı -->
        <div class="q-mb-md" style="position: sticky; top: 0; z-index: 2;">
            <q-card flat bordered class="q-pa-md"
                :class="$q.dark.isActive ? 'bg-blue-grey-9 text-grey-2' : 'bg-white text-dark'">
                <div class="row q-col-gutter-md items-center">
                    <div class="col-12 col-md-4">
                        <q-input outlined dense rounded placeholder="Başlık/Açıklama ara..." clearable v-model="searchType"
                            debounce="250" :color="$q.dark.isActive ? 'blue-4' : 'primary'" :input-class="$q.dark.isActive ? 'text-grey-2' : 'text-dark'">
                            <template v-slot:prepend>
                                <q-icon name="search" :color="$q.dark.isActive ? 'grey-4' : 'grey-6'" />
                            </template>
                        </q-input>
                    </div>
                    <div class="col-6 col-md-3">
                        <q-select outlined dense rounded label="Öncelik" :options="['Düşük', 'Orta', 'Yüksek']"
                            v-model="searchPriority" clearable :color="$q.dark.isActive ? 'blue-4' : 'primary'" />
                    </div>
                    <div class="col-6 col-md-5">
                        <q-select outlined dense rounded multiple use-chips label="Etiketler" v-model="searchTags"
                            :options="['İş', 'Kişisel', 'Önemli']" clearable
                            :color="$q.dark.isActive ? 'blue-4' : 'primary'" />
                    </div>
                </div>
            </q-card>
        </div>

        <!-- Tamamlanmayan görevler -->
        <div v-if="activeTodoList && activeTodoList.length" class="q-mb-md"
            style="max-height: 300px; overflow-y: auto;">
            <q-list bordered separator class="rounded-borders"
                :class="$q.dark.isActive ? 'bg-blue-grey-9 text-grey-2' : 'bg-white text-dark'">
                <transition-group name="fade" tag="div">
                    <div v-for="(todo, index) in activeTodoList" :key="(todo.id || index) + '-active'">
                        <q-item :key="todo.id || index" clickable v-ripple class="q-py-sm" :to="{name: 'todo-detail', params:{id: todo.id}}">
                            <q-item-section avatar>
                                <q-avatar :color="todo.isDone ? 'positive' : ($q.dark.isActive ? 'grey-6' : 'grey-4')"
                                    text-color="white">
                                    <q-icon :name="todo.isDone ? 'check' : 'event_note'" />
                                </q-avatar>
                            </q-item-section>

                            <q-item-section>
                                <div class="row items-center no-wrap">
                                    <div class="col text-weight-medium text-body1 ellipsis">{{ todo.title }}</div>
                                </div>
                                <div :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'"
                                    class="text-caption q-mt-xs">
                                    {{ todo.description }}
                                </div>

                                <div class="row items-center q-gutter-xs q-mt-sm">
                                    <q-badge :color="todo.priority === 'Düşük'
                                        ? ($q.dark.isActive ? 'orange-6' : 'orange-8')
                                        : (todo.priority === 'Orta'
                                            ? ($q.dark.isActive ? 'blue-4' : 'blue')
                                            : (todo.priority === 'Yüksek'
                                                ? ($q.dark.isActive ? 'red-4' : 'red')
                                                : 'grey'))" text-color="white" :label="'Öncelik: ' + (todo.priority || 'Belirsiz')" />

                                    <template v-for="(tag, i) in todo.tag">
                                        <q-chip :key="i" dense :color="$q.dark.isActive ? 'grey-7' : 'grey-5'"
                                            :text-color="$q.dark.isActive ? 'white' : 'black'"
                                            :icon="tag === 'İş' ? 'work' : tag === 'Kişisel' ? 'person' : tag === 'Önemli' ? 'priority_high' : 'label'">
                                            {{ tag }}
                                        </q-chip>
                                    </template>

                                    <q-separator vertical spaced class="q-ml-xs q-mr-xs" />

                                    <q-chip dense square :color="$q.dark.isActive ? 'grey-7' : 'grey-4'"
                                        :text-color="$q.dark.isActive ? 'white' : 'black'" v-if="todo.createdAt">
                                        Oluşturulma: {{ todo.createdAt | formatDate }}
                                    </q-chip>
                                    <q-chip dense square :color="$q.dark.isActive ? 'grey-7' : 'grey-4'"
                                        :text-color="$q.dark.isActive ? 'white' : 'black'" v-if="todo.updatedAt">
                                        Son düzenleme: {{ todo.updatedAt | formatDate }}
                                    </q-chip>
                                    <q-chip dense square :color="todo.dueDate && !todo.isDone
                                        ? ($q.dark.isActive ? 'blue-6' : 'blue-2')
                                        : ($q.dark.isActive ? 'grey-7' : 'grey-4')"
                                        :text-color="$q.dark.isActive ? 'white' : 'black'" v-if="todo.dueDate">
                                        Hedef: {{ todo.dueDate | formatDate }}
                                    </q-chip>
                                    <q-chip dense square color="red-4" text-color="white"
                                        v-if="todo.dueDate && !todo.isDone && todo.isOverdue">
                                        Süre doldu
                                    </q-chip>
                                </div>
                            </q-item-section>

                            <q-item-section side top>
                                <div class="row items-center q-gutter-xs" @click.stop @mousedown.stop>
                                    <update-modal :todo="todo"></update-modal>
                                    <confirm-delete :todo-id="todo.id"></confirm-delete>

                                    <q-btn v-if="todo.isDone" flat round dense icon="check_circle" color="positive"
                                        @click.stop.prevent="toggleTodoDone(todo)" @mousedown.stop>
                                        <q-tooltip>Tamamlandı</q-tooltip>
                                    </q-btn>
                                    <q-btn v-else flat round dense icon="radio_button_unchecked"
                                        :color="$q.dark.isActive ? 'grey-4' : 'grey-7'" @click.stop.prevent="toggleTodoDone(todo)" @mousedown.stop>
                                        <q-tooltip>Henüz tamamlanmadı</q-tooltip>
                                    </q-btn>
                                </div>
                            </q-item-section>
                        </q-item>
                        <q-separator :key="'active-sep-' + (todo.id || index)" spaced inset="item" :color="$q.dark.isActive ? 'grey-8' : 'grey-4'" />
                    </div>
                </transition-group>
            </q-list>
        </div>

        <!-- Tamamlanan todolar -->
        <div v-if="completedTodoList && completedTodoList.length" class="q-mt-lg">
            <div :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'" class="text-subtitle2 q-mb-sm">
                Tamamlananlar
            </div>
            <q-list bordered separator class="rounded-borders"
                :class="$q.dark.isActive ? 'bg-blue-grey-9 text-grey-2' : 'bg-grey-1 text-dark'">
                <transition-group name="fade" tag="div">
                    <div v-for="(todo, index) in completedTodoList" :key="(todo.id || index) + '-done'">
                        <q-item :key="todo.id || index" class="q-py-sm" :to="{name: 'todo-detail', params:{id: todo.id}}">
                            <q-item-section avatar>
                                <q-avatar color="positive" text-color="white">
                                    <q-icon name="check" />
                                </q-avatar>
                            </q-item-section>
                            <q-item-section>
                                <div class="row items-center no-wrap">
                                    <div class="col text-weight-medium text-body1 text-strike ellipsis"
                                        :class="$q.dark.isActive ? 'text-grey-6' : 'text-grey-7'">
                                        {{ todo.title }}
                                    </div>
                                </div>
                                <div class="text-caption text-strike q-mt-xs"
                                    :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-6'">
                                    {{ todo.description }}
                                </div>
                                <div class="row items-center q-gutter-xs q-mt-sm">
                                    <q-badge :color="todo.priority === 'Düşük'
                                        ? ($q.dark.isActive ? 'orange-6' : 'orange-8')
                                        : (todo.priority === 'Orta'
                                            ? ($q.dark.isActive ? 'blue-4' : 'blue')
                                            : (todo.priority === 'Yüksek'
                                                ? ($q.dark.isActive ? 'red-4' : 'red')
                                                : 'grey'))" text-color="white" :label="'Öncelik: ' + (todo.priority || 'Belirsiz')" />
                                    <template v-for="(tag, i) in todo.tag">
                                        <q-chip :key="i" dense :color="$q.dark.isActive ? 'grey-7' : 'grey-5'"
                                            :text-color="$q.dark.isActive ? 'white' : 'black'">
                                            {{ tag }}
                                        </q-chip>
                                    </template>
                                    <q-separator vertical spaced class="q-ml-xs q-mr-xs" />
                                    <q-chip dense square :color="$q.dark.isActive ? 'grey-7' : 'grey-4'"
                                        :text-color="$q.dark.isActive ? 'white' : 'black'" v-if="todo.createdAt">
                                        Oluşturulma: {{ todo.createdAt | formatDate }}
                                    </q-chip>
                                    <q-chip dense square :color="$q.dark.isActive ? 'grey-7' : 'grey-4'"
                                        :text-color="$q.dark.isActive ? 'white' : 'black'" v-if="todo.updatedAt">
                                        Son düzenleme: {{ todo.updatedAt | formatDate }}
                                    </q-chip>
                                    <q-chip dense square color="positive" text-color="white" v-if="todo.completedAt">
                                        Tamamlanma: {{ todo.completedAt | formatDate }}
                                    </q-chip>
                                </div>
                            </q-item-section>
                            <q-item-section side top>
                                <div class="row items-center q-gutter-xs">
                                    <confirm-delete :todo-id="todo.id"></confirm-delete>
                                    <q-btn flat round dense icon="history"
                                        :color="$q.dark.isActive ? 'grey-4' : 'grey-7'"
                                        @click.stop="toggleTodoDone(todo)">
                                        <q-tooltip>Geri al</q-tooltip>
                                    </q-btn>
                                </div>
                            </q-item-section>
                        </q-item>
                        <q-separator :key="'done-sep-' + (todo.id || index)" spaced inset="item" :color="$q.dark.isActive ? 'grey-8' : 'grey-4'" />
                    </div>
                </transition-group>
            </q-list>
        </div>

        <!-- Boş durum -->
        <div v-if="!(completedTodoList && completedTodoList.length) && !(activeTodoList && activeTodoList.length)">
            <q-card flat bordered class="q-pa-lg flex flex-center column"
                :class="$q.dark.isActive ? 'bg-blue-grey-9 text-grey-2' : 'bg-grey-1 text-dark'">
                <q-icon name="assignment" size="48px" :color="$q.dark.isActive ? 'grey-6' : 'grey-5'" />
                <div class="text-subtitle1 q-mt-sm">Henüz eklenmiş bir todo yok</div>
                <div :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'" class="text-caption">
                    Yeni bir görev ekleyerek başlayın.
                </div>
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
        },
        hasActiveFilters() {
            return !!(this.searchType || this.searchPriority || (this.searchTags && this.searchTags.length))
        }
    },
    methods: {
        toggleTodoDone(todo) {
            // this.$store.commit('toggleTodoDone', todo.id);
            this.$store.dispatch('toggleTodoDone', todo.id);
        },
        clearFilters() {
            this.searchType = ''
            this.searchPriority = ''
            this.searchTags = []
        },
        

    }

}
</script>
