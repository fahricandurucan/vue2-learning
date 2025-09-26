<template>
  <q-card class="kanban-card q-pa-sm">
    <div class="row items-start no-wrap">
      <div class="col">
        <div class="text-weight-medium">{{ task.title }}</div>
        <div class="text-caption text-grey-7 q-mt-xs">{{ task.description }}</div>
      </div>
      <div class="col-auto">
        <q-badge :color="priorityColor" text-color="white" class="q-ml-sm">P</q-badge>
      </div>
    </div>

    <div class="row items-center q-gutter-xs q-mt-sm">
      <q-chip
        v-for="(tag, idx) in task.tag"
        :key="idx"
        dense
        color="grey-3"
        text-color="black"
        :icon="getTagIcon(tag)"
        class="q-pa-sm"
      >
        {{ tag }}
      </q-chip>

      <q-chip
        v-if="task.isDone"
        dense
        square
        color="green-2"
        text-color="black"
      >
        Tamamlandı: {{ task.completedAt | formatDate }}
      </q-chip>
      <q-chip
        v-else
        dense
        square
        color="blue-2"
        text-color="black"
      >
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
      switch(tag) {
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
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  background-color: #ffffff;
  transition: box-shadow 0.2s;
}

.kanban-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
</style>
