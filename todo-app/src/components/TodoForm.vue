<template>
  <div>
    <q-card flat bordered class="q-pa-md"
      :class="$q.dark.isActive ? 'bg-blue-grey-9 text-grey-2' : 'bg-white text-dark'">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input outlined dense rounded label="Başlık" placeholder="Kısa ve net bir başlık" v-model="newTodo.title"
              :error="titleError" :error-message="'Başlık zorunludur'" clearable counter maxlength="80"
              :color="$q.dark.isActive ? 'blue-4' : 'primary'"
              :input-class="$q.dark.isActive ? 'text-grey-2' : 'text-dark'" />
          </div>

          <div class="col-12">
            <q-input outlined dense rounded type="textarea" autogrow label="Açıklama"
              placeholder="Detayları yazabilirsiniz" v-model="newTodo.description"
              :color="$q.dark.isActive ? 'blue-4' : 'primary'"
              :input-class="$q.dark.isActive ? 'text-grey-2' : 'text-dark'" />
          </div>

          <div class="col-12 col-md-4">
            <q-select outlined dense rounded label="Öncelik" :options="priorityOptions" v-model="newTodo.priority"
              :error="priorityError" :error-message="'Öncelik seçin'"
              :color="$q.dark.isActive ? 'blue-4' : 'primary'" />
          </div>
          <div class="col-12 col-md-8">
            <q-select outlined dense rounded label="Etiketler" multiple use-chips :options="tagOptions"
              v-model="newTodo.tag" hint="İsteğe bağlı" :color="$q.dark.isActive ? 'blue-4' : 'primary'" />
          </div>

          <div class="col-12 col-md-6">
            <q-input outlined dense rounded type="date" label="Hedef Tarih" placeholder="YYYY-MM-DD" v-model="tempDate"
              :color="$q.dark.isActive ? 'blue-4' : 'primary'"
              :input-class="$q.dark.isActive ? 'text-grey-2' : 'text-dark'" />
          </div>
          <div class="col-12 col-md-6">
            <q-input outlined dense rounded type="time" label="Hedef Saat" placeholder="HH:mm" v-model="tempTime"
              :color="$q.dark.isActive ? 'blue-4' : 'primary'"
              :input-class="$q.dark.isActive ? 'text-grey-2' : 'text-dark'" />
          </div>
        </div>
      </q-card-section>


      <q-separator spaced :color="$q.dark.isActive ? 'grey-8' : 'grey-4'"></q-separator>

      <q-card-actions align="between">
        <div class="text-caption" :class="(newTodo.title === '' || newTodo.priority === '')
          ? ($q.dark.isActive ? 'text-red-4' : 'text-red-7')
          : ($q.dark.isActive ? 'text-green-4' : 'text-green-7')">
          *Kaydetmeden önce zorunlu alanları doldurun.
        </div>
        <div>
          <q-btn flat rounded :color="$q.dark.isActive ? 'grey-4' : 'grey-7'" icon="refresh" label="Temizle"
            @click="resetForm" />
          <q-btn unelevated rounded :color="$q.dark.isActive ? 'blue-4' : 'primary'" icon="save" label="Kaydet"
            class="q-ml-sm" @click="saveNewTodo" />
        </div>
      </q-card-actions>
    </q-card>

  </div>

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
      tempTime: '',
      titleError: false,
      priorityError: false,
      priorityOptions: ['Düşük', 'Orta', 'Yüksek'],
      tagOptions: ['İş', 'Kişisel', 'Okul', 'Alışveriş', 'Sağlık', 'Finans', 'Hobi']
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
      // this.$store.commit('addNewTodo', { ...this.newTodo, id: lastId + 1, createdAt: createdAt })

      // actions a çevirdik
      this.$store.dispatch('addNewTodo', { ...this.newTodo, id: lastId + 1, createdAt: createdAt })

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

<style scoped></style>
