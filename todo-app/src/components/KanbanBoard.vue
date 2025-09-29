<template>
  <div>
    <!-- Başlık -->
    <div class="row items-center q-mb-lg">
      <div class="col">
        <div class="text-h5" :class="$q.dark.isActive ? 'text-blue-3' : 'text-dark'">Kanban</div>
        <div class="text-caption" :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey'">
          Durum bazlı görev görünümü
        </div>
      </div>
      <div class="col-auto q-gutter-sm">
        <q-btn dense :unelevated="!$q.dark.isActive" :outline="$q.dark.isActive"
          :color="$q.dark.isActive ? 'blue-4' : 'primary'" icon="add" label="Yeni Görev" @click="goHome" />
      </div>
    </div>

    <!-- Kanban kolonları -->
    <div class="row q-col-gutter-md">
      <div v-for="(col, cIdx) in localColumns" :key="cIdx" class="col-12 col-md-3">
        <q-card :class="$q.dark.isActive ? 'bg-blue-grey-9 text-grey-2' : 'bg-white text-dark'"
          class="column full-height">
          <q-card-section class="row items-center q-gutter-sm">
            <q-badge :color="col.color" :text-color="col.textColor || ($q.dark.isActive ? 'white' : 'white')">{{
              col.title }}</q-badge>
            <q-badge :color="$q.dark.isActive ? 'grey-7' : 'grey-5'" :text-color="$q.dark.isActive ? 'white' : 'black'"
              :label="(col.items && col.items.length) || 0" />
          </q-card-section>
          <q-separator :color="$q.dark.isActive ? 'grey-8' : 'grey-4'" />
          <q-scroll-area style="height: calc(100vh - 260px)">
            <div class="q-pa-sm column q-gutter-sm" @dragover.prevent @drop="onDropColumn(cIdx)">
              <div v-for="(t, idx) in (col.items || [])" :key="cIdx + '-' + idx" class="kanban-draggable"
                :draggable="!(t.isDone && t.status === 'completed')" @dragstart="onDragStart(cIdx, idx)"
                @dragend="onDragEnd">
                <kanban-card :task="t" :columnIdx="cIdx" />
              </div>
              <div v-if="!col.items || col.items.length === 0" class="empty-column-placeholder"
                :class="$q.dark.isActive ? 'empty-dark' : ''">
                <div class="text-center q-pa-lg" :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-5'">
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
      // this.$store.commit('changeTaskStatusForKanban', { todoId, status });
      this.$store.dispatch('changeTaskStatusForKanban', { todoId, status });

      this.onDragEnd()
    },
    goHome() {
      this.$router.replace('/')
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

.empty-dark {
  border-color: rgba(255, 255, 255, 0.18);
}

.kanban-draggable {
  cursor: move;
}

.kanban-draggable:hover {
  transform: translateY(-2px);
  transition: transform 0.2s;
}
</style>
