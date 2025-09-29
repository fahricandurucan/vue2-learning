<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Üst toolbar -->
    <q-header elevated :class="$q.dark.isActive ? 'bg-blue-grey-10 text-grey-2' : 'bg-primary text-white'">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen"
          :color="$q.dark.isActive ? 'grey-3' : 'white'" />

        <q-toolbar-title class="row items-center">
          <q-icon name="task_alt" size="22px" class="q-mr-sm" :color="$q.dark.isActive ? 'blue-4' : 'white'" />
          <span>ToDo App</span>
        </q-toolbar-title>

        <div class="row items-center q-gutter-sm">
          <div class="text-caption row items-center">
            <q-icon name="check_circle" size="16px" class="q-mr-xs" :color="$q.dark.isActive ? 'blue-4' : 'white'" />
            Görevlerinizi kolayca yönetin
          </div>
          <q-separator vertical spaced />
          <q-btn flat round dense icon="dark_mode" :color="$q.dark.isActive ? 'blue-4' : 'white'" @click="changeTheme">
            <q-tooltip :class="$q.dark.isActive ? 'bg-blue-grey-9 text-grey-2' : 'bg-grey-2 text-dark'">Temayı
              değiştir</q-tooltip>
          </q-btn>

        </div>

      </q-toolbar>
    </q-header>

    <!-- Yan menü -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered
      :content-class="$q.dark.isActive ? 'bg-blue-grey-9 text-grey-2' : 'bg-grey-1 text-dark'">
      <q-list>
        <q-item-label header :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-8'">
          ToDo Uygulama Menüsü
        </q-item-label>
        <MenuItem v-for="(item, i) in menuItems" :key="i" v-bind="item">
        </MenuItem>
      </q-list>
    </q-drawer>

    <!-- Sayfa container -->
    <q-page-container :class="$q.dark.isActive ? 'bg-blue-grey-10 text-grey-2' : 'bg-grey-2 text-dark'">
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<script>
import MenuItem from 'src/components/MenuItem.vue';

const menuItems = [
  {
    title: 'Dashboard',
    caption: 'Genel bakış',
    icon: 'dashboard',
    to: '/'
  },
  {
    title: 'Görevler',
    caption: 'Todo listesi',
    icon: 'check_circle',
    to: '/todos'
  },
  {
    title: 'Ayarlar',
    caption: 'Uygulama ayarları',
    icon: 'settings',
    to: '/settings'
  }
]

export default {
  name: 'MainLayout',
  components: {
    MenuItem
  },
  data() {
    return {
      leftDrawerOpen: false,
      menuItems: menuItems,
      isDark: null,
    }
  },
  created() {
    this.isDark = this.$store.state.darkMode
  },
  methods: {
    changeTheme() {
      this.$store.dispatch('setAppTheme', !this.isDark)
      this.isDark = !this.isDark

    }
  }
}
</script>
