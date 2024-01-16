<script setup>
import { mdiCog } from '@mdi/js'
import { useSlots, computed } from 'vue'
import BaseButton from '@/components/BaseButton.vue'

defineProps({
  icon: {
    type: String,
    default: null
  },
  main: Boolean
})

const hasSlot = computed(() => useSlots().default)
</script>

<template>
  <section  class="mb-2 flex items-center justify-between">

    <slot v-if="hasSlot" />
    <BaseButton v-else :icon="mdiCog" color="whiteDark" />
  </section>
</template>
