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
              <div :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-7'" class="text-body2">Bildirimler ve profil
                ayarları bu sürümde devre dışı bırakılmıştır.</div>
            </div>
          </q-card-section>

          <q-card-actions>
            <q-btn :color="$q.dark.isActive ? 'blue-4' : 'primary'" label="Kaydet" unelevated />
            <q-btn :color="$q.dark.isActive ? 'grey-5' : 'grey-8'" label="Sıfırla" flat />
          </q-card-actions>
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
              <div class="col-12 col-sm-6 col-md-3">
                <q-card flat bordered :class="$q.dark.isActive ? 'bg-blue-grey-10 text-grey-2' : 'bg-grey-1 text-dark'"
                  class="q-pa-md">
                  <div class="text-caption" :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'">Toplam Görev</div>
                  <div class="text-h6">{{ allTodosLenght }}</div>
                </q-card>
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <q-card flat bordered :class="$q.dark.isActive ? 'bg-blue-grey-10 text-grey-2' : 'bg-grey-1 text-dark'"
                  class="q-pa-md">
                  <div class="text-caption" :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'">Aktif</div>
                  <div class="text-h6">{{ activeTodoListLenght }}</div>
                </q-card>
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <q-card flat bordered :class="$q.dark.isActive ? 'bg-blue-grey-10 text-grey-2' : 'bg-grey-1 text-dark'"
                  class="q-pa-md">
                  <div class="text-caption" :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'">Tamamlanan</div>
                  <div class="text-h6">{{ completedTodoListLenght }}</div>
                </q-card>
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <q-card flat bordered :class="$q.dark.isActive ? 'bg-blue-grey-10 text-grey-2' : 'bg-grey-1 text-dark'"
                  class="q-pa-md">
                  <div class="text-caption" :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'">Beklemede/Devam
                  </div>
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
        theme: 'system',
        darkMode: false,
        emailNotif: true,
        pushNotif: true,
        summaryEmail: false,
        displayName: 'User',
        password: ''
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
