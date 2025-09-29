<template>
  <q-item
    clickable
    v-ripple
    :to="to"
    exact
    :active-class="$q.dark.isActive ? 'bg-blue-grey-8 text-grey-2' : 'bg-grey-3 text-dark'"
    :exact-active-class="$q.dark.isActive ? 'bg-blue-grey-8 text-grey-2' : 'bg-grey-3 text-dark'"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" :color="$q.dark.isActive ? 'grey-3' : 'grey-7'" />
    </q-item-section>

    <q-item-section>
      <q-item-label :class="$q.dark.isActive ? 'text-grey-2' : 'text-dark'">{{ title }}</q-item-label>
      <q-item-label v-if="caption" caption :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'">
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    title: { type: String, required: true },
    caption: { type: String, default: '' },
    to: { type: [String, Object], required: true },
    icon: { type: String, default: '' }
  }
}
</script>
