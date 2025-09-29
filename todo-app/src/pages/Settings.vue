<template>
  <q-page padding :class="$q.dark.isActive ? 'bg-blue-grey-10 text-grey-2' : 'bg-grey-1 text-dark'">
    <div class="text-h4 q-mb-lg">Ayarlar</div>

    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card flat bordered :class="$q.dark.isActive ? 'bg-blue-grey-9 text-grey-2' : 'bg-white text-dark'"
          class="q-mb-md">
          <q-card-section>
            <div class="text-h6">Genel</div>
            <div :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey'" class="text-caption">Uygulama deneyimini
              kişiselleştirin</div>
          </q-card-section>
          <q-separator :color="$q.dark.isActive ? 'grey-8' : 'grey-4'" />

          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>Uygulama Dili</q-item-label>
                <q-item-label caption>Arayüz dilini seçin</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-select dense rounded outlined emit-value map-options :options="languageOptions"
                  v-model="form.language" :color="$q.dark.isActive ? 'blue-4' : 'primary'" style="min-width: 200px" />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label>Koyu Tema</q-item-label>
                <q-item-label caption>Tercihinize göre koyu temayı açıp kapatın</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle v-model="darkMode" :color="$q.dark.isActive ? 'blue-4' : 'primary'" label="Dark Mode" />
              </q-item-section>
            </q-item>
          </q-list>

          <q-separator :color="$q.dark.isActive ? 'grey-8' : 'grey-4'" />
          <q-card-section>
            <div class="q-gutter-y-sm">
              <div :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-7'" class="text-body2">Uygulama teması ve dil
                ayarlarını buradan yönetebilirsiniz.</div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12">
        <q-card flat bordered :class="$q.dark.isActive ? 'bg-blue-grey-9 text-grey-2' : 'bg-white text-dark'">
          <q-card-section>
            <div class="text-h6">Özet</div>
            <div :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey'" class="text-caption">Uygulama durumu hakkında
              kısa bilgi</div>
          </q-card-section>
          <q-separator :color="$q.dark.isActive ? 'grey-8' : 'grey-4'" />

          <q-card-section>
            <div class="row q-col-gutter-md">
              <!-- Toplam Görev -->
              <div class="col-12 col-sm-6 col-md-3">
                <q-card flat bordered class="q-pa-md"
                  :class="$q.dark.isActive ? 'bg-blue-grey-8 text-white' : 'bg-blue-3 text-dark'">
                  <div class="text-caption">Toplam Görev</div>
                  <div class="text-h6">{{ allTodosLenght }}</div>
                </q-card>
              </div>

              <!-- Aktif -->
              <div class="col-12 col-sm-6 col-md-3">
                <q-card flat bordered class="q-pa-md"
                  :class="$q.dark.isActive ? 'bg-blue-6 text-white' : 'bg-green-4 text-dark'">
                  <div class="text-caption">Aktif</div>
                  <div class="text-h6">{{ activeTodoListLenght }}</div>
                </q-card>
              </div>

              <!-- Tamamlanan -->
              <div class="col-12 col-sm-6 col-md-3">
                <q-card flat bordered class="q-pa-md"
                  :class="$q.dark.isActive ? 'bg-green-7 text-white' : 'bg-grey-3 text-dark'">
                  <div class="text-caption">Tamamlanan</div>
                  <div class="text-h6">{{ completedTodoListLenght }}</div>
                </q-card>
              </div>

              <!-- Beklemede / Devam -->
              <div class="col-12 col-sm-6 col-md-3">
                <q-card flat bordered class="q-pa-md"
                  :class="$q.dark.isActive ? 'bg-orange-7 text-white' : 'bg-orange-3 text-dark'">
                  <div class="text-caption">Beklemede / Devam</div>
                  <div class="text-h6">{{ inProgressOrOnHoldLenght }}</div>
                </q-card>
              </div>
            </div>

          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'SettingsPage',
  data() {
    return {
      form: {
        language: 'tr',
        darkMode: false,
      },
      languageOptions: [
        { label: 'Türkçe', value: 'tr' },
        { label: 'English', value: 'en' }
      ],
    }
  },
  computed: {
    darkMode: {
      get() {
        return this.$store.state.darkMode
      },
      set(val) {
        this.$store.dispatch('setAppTheme', val)
      }
    },
    allTodosLenght() {
      return this.$store.getters.allTodos.length;
    },
    activeTodoListLenght() {
      return this.$store.getters.activeTodoList.length;
    },
    completedTodoListLenght() {
      return this.$store.getters.completedTodoList.length;
    },
    inProgressOrOnHoldLenght() {
      return (this.$store.getters.inProgressTodoList.length +
        this.$store.getters.onHoldTodoList.length);
    },

  },
  methods: {
    toggleTheme() {
      this.form.darkMode = !this.form.darkMode;
      this.$store.dispatch('settings/setAppTheme', this.form.darkMode)
    }
  }
}
</script>
