<template>
    <div class="xs:h-screen bg-gray-50 border w- border-gray-300 rounded-md shadow p-4 space-y-2" id="tasks">
      <div v-for="task in tasks.data" :key="task.id" class="flex items-start">
        <!-- Checkbox -->
        <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-0 mt-1">
  
        <!-- Task Details -->
        <div class="ml-4">
          <h3 class="text-lg font-bold text-gray-900">{{ task.title }}</h3>
          <p class="text-sm text-gray-700">{{ task.description }}</p>
        </div>
      </div>
    </div>
  </template>

<script setup>

import store from "../store";
import { computed } from "vue";

const tasks = computed(() => store.state.tasks);

store.dispatch("getTasks");
</script>