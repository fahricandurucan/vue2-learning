<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Üst toolbar -->
    <q-header elevated :class="$q.dark.isActive ? 'bg-blue-grey-10 text-grey-2' : 'bg-primary text-white'">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen"
          :color="$q.dark.isActive ? 'grey-3' : 'white'" />

        <q-toolbar-title>
          ToDo App
        </q-toolbar-title>

        <div class="text-caption">
          Quasar v{{ $q.version }}
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
        <MenuItem v-for="(item, i) in menuItems" :key="i" v-bind="item"></MenuItem>
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
      menuItems: menuItems
    }
  }
}
</script>
