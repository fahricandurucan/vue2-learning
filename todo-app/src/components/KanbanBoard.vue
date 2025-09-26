<template>
  <div>
    <div class="row items-center q-mb-lg">
      <div class="col">
        <div class="text-h5">Kanban</div>
        <div class="text-caption text-grey">Durum bazlı görev görünümü (UI only)</div>
      </div>
      <div class="col-auto q-gutter-sm">
        <q-btn dense flat round icon="refresh" color="grey-7" />
        <q-btn dense unelevated color="primary" icon="add" label="Yeni Görev" />
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div v-for="(col, cIdx) in localColumns" :key="cIdx" class="col-12 col-md-3">
        <q-card class="column full-height">
          <q-card-section class="row items-center q-gutter-sm">
            <q-badge :color="col.color" :text-color="col.textColor || 'white'">{{ col.title }}</q-badge>
            <q-badge color="grey-5" text-color="black" :label="(col.items && col.items.length) || 0" />
          </q-card-section>
          <q-separator />
          <q-scroll-area style="height: calc(100vh - 260px)">
            <div class="q-pa-sm column q-gutter-sm" @dragover.prevent @drop="onDropColumn(cIdx)">
              <div v-for="(t, idx) in (col.items || [])" :key="cIdx + '-' + idx" class="kanban-draggable"
                draggable="true" @dragstart="onDragStart(cIdx, idx)" @dragend="onDragEnd">
                <kanban-card :task="t" :columnIdx="cIdx" />
              </div>
              <div v-if="!col.items || col.items.length === 0" class="empty-column-placeholder">
                <div class="text-center text-grey-5 q-pa-lg">
                  <q-icon name="inbox" size="48px" class="q-mb-sm" />
                  <div class="text-caption">Kartları buraya sürükleyin</div>
                </div>
              </div>
            </div>
          </q-scroll-area>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import KanbanCard from './KanbanCard.vue'

export default {
  name: 'KanbanBoard',
  components: {
    KanbanCard
  },
  props: {
    columns: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      localColumns: JSON.parse(JSON.stringify(this.columns || [])),
      dnd: {
        dragging: null
      }
    }
  },
  watch: {
    columns: {
      deep: true,
      handler(val) {
        this.localColumns = JSON.parse(JSON.stringify(val || []))
      }
    }
  },
  methods: {
    onDragStart(fromColIdx, fromIndex) {
      this.dnd.dragging = { fromColIdx, fromIndex }
    },
    onDragEnd() {
      this.dnd.dragging = null
    },
    onDropColumn(toColIdx) {
      if (!this.dnd.dragging) {
        return
      }
      const { fromColIdx, fromIndex } = this.dnd.dragging
      console.log('Moving from column', fromColIdx, 'index', fromIndex, 'to column', toColIdx)

      // aynı coulmda hareket ettirme
      if (fromColIdx === toColIdx) {
        this.onDragEnd()
        return
      }

      if (!this.localColumns[fromColIdx] || !this.localColumns[fromColIdx].items) {
        this.onDragEnd()
        return
      }

      const fromItems = this.localColumns[fromColIdx].items
      console.log('Source items:', fromItems)

      if (!this.localColumns[toColIdx]) {
        this.onDragEnd()
        return
      }

      if (!this.localColumns[toColIdx].items) {
      }

      if (fromIndex < 0 || fromIndex >= fromItems.length) {
        this.onDragEnd()
        return
      }

      const moved = fromItems[fromIndex]

      console.log('Moving item:', moved)

      //mutation çağırarak status güncelliyoruz task in
      const status = this.localColumns[toColIdx].status
      console.log('status : ' + status)

      let todoId = moved.id;
      this.$store.commit('changeTaskStatusForKanban', { todoId, status });

      this.onDragEnd()
    }
  },

}
</script>

<style scoped>
.empty-column-placeholder {
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  margin: 8px 0;
}

.kanban-draggable {
  cursor: move;
}

.kanban-draggable:hover {
  transform: translateY(-2px);
  transition: transform 0.2s;
}
</style>
