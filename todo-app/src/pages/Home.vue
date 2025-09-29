<template>
    <q-page :class="$q.dark.isActive ? 'bg-blue-grey-10 text-grey-2' : 'bg-grey-1 text-dark'">
        <div class="q-pa-md q-mx-auto" style="max-width: 60%">
            <q-banner inline-actions class="rounded-borders q-pa-md"
                :class="$q.dark.isActive ? 'bg-blue-grey-9 text-grey-2' : 'bg-primary text-white'">
                <div class="text-h6">Hoş geldiniz</div>
                <div class="text-body2 q-mt-xs">
                    Görevlerinizi kolayca ekleyin, arayın ve yönetin.
                </div>
                <template v-slot:action>
                    <q-btn :flat="!$q.dark.isActive" :outline="$q.dark.isActive" dense :color="$q.dark.isActive ? 'blue-4' : 'white'" icon="tips_and_updates"
                        label="İpucu" @click="tipInfo" />
                </template>
            </q-banner>

            <div class="q-mt-lg">
                <h5 :class="$q.dark.isActive ? 'text-blue-3' : 'text-primary'" class="q-mb-lg">
                    Yeni Görev
                </h5>
                <TodoForm />
            </div>

            <q-separator spaced class="q-my-lg" :color="$q.dark.isActive ? 'grey-8' : 'grey-4'" />

            <div class="q-mt-md">
                <h5 :class="$q.dark.isActive ? 'text-blue-3' : 'text-primary'" class="q-mb-md">
                    Görevler
                </h5>
                <TodoList />
            </div>
        </div>
    </q-page>
</template>

<script>
import TodoForm from 'src/components/TodoForm.vue';
import TodoList from 'src/components/TodoList.vue';

export default {
    name: 'Home',
    components: {
        TodoForm,
        TodoList
    },
    methods: {
        tipInfo() {
            this.$q.notify({ type: 'info', message: 'Formu doldurup Kaydet ile ekleyebilirsiniz.' });
        }
    }

}
</script>



<style scoped>
.bg-grey-1 {
    background-color: #f5f5f5;
}
</style>
