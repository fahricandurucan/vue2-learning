<template>
  <q-card class="kanban-card q-pa-sm" :class="$q.dark.isActive ? 'bg-blue-grey-8 text-grey-2' : 'bg-white text-dark'">
    <!-- Başlık ve açıklama -->
    <div class="row items-start no-wrap">
      <div class="col">
        <div class="text-weight-medium" :class="task.status === 'completed' ? 'text-strike' : ''">{{ task.title }}</div>
        <div class="text-caption q-mt-xs" :class="($q.dark.isActive ? 'text-grey-5' : 'text-grey-7') && (task.status === 'completed' ? 'text-strike' : '')">
          {{ task.description }}
        </div>
      </div>
      <div class="col-auto">
        <q-badge :color="priorityColor" text-color="white" class="q-ml-sm">P</q-badge>
      </div>
    </div>

    <!-- Etiketler ve durum -->
    <div class="row items-center q-gutter-xs q-mt-sm">
      <q-chip v-for="(tag, idx) in task.tag" :key="idx" dense :color="$q.dark.isActive ? 'grey-7' : 'grey-3'"
        :text-color="$q.dark.isActive ? 'white' : 'black'" :icon="getTagIcon(tag)" class="q-pa-sm">
        {{ tag }}
      </q-chip>

      <q-chip v-if="task.isDone" dense square :color="$q.dark.isActive ? 'green-7' : 'green-2'"
        :text-color="$q.dark.isActive ? 'white' : 'black'">
        Tamamlandı: {{ task.completedAt | formatDate }}
      </q-chip>
      <q-chip v-else dense square :color="$q.dark.isActive ? 'blue-7' : 'blue-2'"
        :text-color="$q.dark.isActive ? 'white' : 'black'">
        Hedef: {{ task.dueDate | formatDate }}
      </q-chip>

    </div>
  </q-card>
</template>


<script>
export default {
  name: 'KanbanCard',
  props: {
    task: {
      type: Object,
      required: true
    },
    columnIdx: Number,
  },
  computed: {
    priorityColor() {
      if (this.task.priority === 'Yüksek') return 'red'
      if (this.task.priority === 'Orta') return 'blue'
      return 'orange'
    }
  },
  methods: {
    getTagIcon(tag) {
      switch (tag) {
        case 'İş': return 'work'
        case 'Kişisel': return 'person'
        case 'Önemli': return 'priority_high'
        default: return 'label'
      }
    }
  }
}
</script>

<style scoped>
.kanban-card {
  border-radius: 8px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
  transition: box-shadow 0.2s;
}

.kanban-card:hover {
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.28);
}
</style>
