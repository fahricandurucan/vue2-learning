<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

        <q-toolbar-title>
          ToDo App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">
          ToDo Uygulama Menüsü
        </q-item-label>
        <MenuItem v-for="(item, i) in menuItems" :key="i" v-bind="item">
        </MenuItem>
      </q-list>
    </q-drawer>

    <q-page-container>
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
