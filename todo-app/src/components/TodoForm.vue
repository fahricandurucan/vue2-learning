<template>
  <q-page padding class="bg-grey-1">

    <div class="q-pa-md">
      <h4 class="text-primary">Yeni Not Ekle</h4>

      <q-card flat bordered class="q-pa-md q-mt-md">
        <q-card-section>

          <q-input outlined label="Not Başlığı" placeholder="Başlık girin..." class="q-mb-md" v-model="newTodo.title" />

          <q-input outlined type="textarea" label="Açıklama" placeholder="Notun içeriğini girin..." class="q-mb-md"
            autogrow v-model="newTodo.description" />

          <q-select outlined label="Öncelik" :options="['Düşük', 'Orta', 'Yüksek']" class="q-mb-md"
            v-model="newTodo.priority" />

          <q-select outlined label="Etiketler" multiple use-chips :options="['İş', 'Kişisel', 'Önemli']"
            v-model="newTodo.tag" />

          <div class="row q-col-gutter-md q-mt-md">
            <div class="col-12 col-md-6">
              <q-input outlined type="date" label="Hedef Tarih" placeholder="YYYY-MM-DD" v-model="tempDate" />
            </div>
            <div class="col-12 col-md-6">
              <q-input outlined type="time" label="Hedef Saat" placeholder="HH:mm" v-model="tempTime" />
            </div>
          </div>

        </q-card-section>

        <q-card-actions class="justify-end">
          <q-btn label="İptal" color="grey" flat />
          <q-btn label="Kaydet" color="primary" @click="saveNewTodo" />
        </q-card-actions>
      </q-card>
    </div>

  </q-page>
</template>

<script>
export default {
  name: 'TodoEditor',
  data() {
    return {
      newTodo: {
        title: '',
        description: '',
        isDone: false,
        priority: '',
        tag: [],
        dueDate: null,
        status: 'unCompleted'
      },
      tempDate: '',
      tempTime: ''
    }
  },
  methods: {
    saveNewTodo() {
      this.titleError = !this.newTodo.title
      this.priorityError = !this.newTodo.priority

      if (this.titleError || this.priorityError) {
        return
      }
      const lastId = this.$store.state.myTodoList.length
        ? this.$store.state.myTodoList[this.$store.state.myTodoList.length - 1].id
        : 0;

      if (this.tempDate && this.tempTime) {
        const [year, month, day] = this.tempDate.split('-')
        const [hours, minutes] = this.tempTime.split(':')
        this.newTodo.dueDate = new Date(year, month - 1, day, hours, minutes)
      }

      const createdAt = new Date();

      this.$q.notify({ type: 'positive', message: 'Yeni Görev Eklendi' })


      // mutation çağırıyoruz burada
      this.$store.commit('addNewTodo', { ...this.newTodo, id: lastId + 1, createdAt: createdAt })

      this.resetForm()


    },
    resetForm() {
      this.newTodo = {
        title: '',
        description: '',
        isDone: false,
        priority: '',
        tag: [],
        dueDate: '',
        dueTime: ''
      }
      this.titleError = false
      this.priorityError = false
      this.tempDate = ''
      this.tempTime = ''
    }
  }
}
</script>

<style scoped>
.bg-grey-1 {
  background-color: #f5f5f5;
}
</style>
