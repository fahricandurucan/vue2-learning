<template>
  <q-page padding :class="$q.dark.isActive ? 'bg-blue-grey-10 text-grey-2' : 'bg-grey-1 text-dark'">
    <kanban-board :columns="columns" />
  </q-page>
</template>

<script>
import KanbanBoard from '../components/KanbanBoard.vue'


export default {
  name: 'TodosPage',
  components: { KanbanBoard },
  computed: {
    columns() {
      return [
        {
          title: 'Yapılacak', status: 'unCompleted', color: 'grey-7', textColor: 'white', items: this.$store.getters.unCompletedTodoList
        },
        {
          title: 'Devam', status: 'continue', color: 'indigo', textColor: 'white', items: this.$store.getters.inProgressTodoList
        },
        {
          title: 'Beklemede', status: 'wait', color: 'purple', textColor: 'white', items: this.$store.getters.onHoldTodoList
        },
        {
          title: 'Tamamlandı', status: 'completed', color: 'positive', textColor: 'white', items: this.$store.getters.completedTodoList
        }
      ]
    }
  }
}
</script>
