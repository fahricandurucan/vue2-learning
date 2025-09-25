<template>
    <q-page padding class="bg-grey-1">
        <!-- Header -->
        <div class="q-pa-md text-center">
            <h4 class="text-secondary">Hoşgeldiniz! Todo listenizi buradan yönetebilirsiniz.</h4>
            <TodoForm></TodoForm>
            
        </div>
        <!-- TODO LİST -->
         <TodoList></TodoList>

    </q-page>
</template>

<script>
import TodoForm from 'src/components/TodoForm.vue';
import TodoList from 'src/components/TodoList.vue';

export default {
    name: 'Home',
    components:{
        TodoForm,
        TodoList
    }

}
</script>



<style scoped>
.bg-grey-1 {
    background-color: #f5f5f5;
}
</style>
