<!-- components/ContextMenu.vue -->
<template>
    <div
      v-if="visible"
      class="absolute z-50 bg-zinc-800 text-sm text-white rounded shadow-lg border border-zinc-700"
      :style="{ top: `${y}px`, left: `${x}px` }"
      @click.stop
    >
      <ul>
        <li
          v-for="item in menuItems"
          :key="item.label"
          class="px-4 py-2 hover:bg-zinc-700 cursor-pointer"
          @click="item.action"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    x: Number,
    y: Number,
    visible: Boolean,
    menuItems: Array
  })
  </script>
  