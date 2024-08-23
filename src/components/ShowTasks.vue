<template>
    <div class="xs:h-screen bg-gray-50 border w- border-gray-300 rounded-md shadow p-4 space-y-2">
      <div v-for="task in tasks" :key="task.id" class="flex items-start">
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

import { ref, onMounted } from 'vue';
import axiosTask from '@/axiosTask.js';

const tasks = ref([]);

const fetchTasks = async () => {
  try {
    const response = await axiosTask.get('/');
    tasks.value = response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

onMounted(() => {
  fetchTasks();
});

</script>