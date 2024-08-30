<template>
  <div class="xs:h-screen bg-gray-50 border w-full border-gray-300 rounded-md shadow p-4 space-y-2" id="tasks">

    <div v-if="tasks.data.length === 0" class="text-center text-gray-700">
      <p>Go ahead and add a task in the form below to get you started.</p>
    </div>

    <div v-else>
      <div v-for="task in tasks.data" :key="task.id" class="flex items-start">
        <!-- Checkbox -->
        <input 
          type="checkbox" 
          class="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-0 mt-1"
          :checked="task.status === 'complete'"
          @change="toggleTaskStatus(task)"
        >
    
        <!-- Task Details -->
        <div 
          class="ml-4"
          :class="{ 'line-through text-gray-500': task.status === 'complete' }"
        >
          <h3 class="text-lg font-bold text-gray-900">{{ task.title }}</h3>
          <p class="text-sm">{{ task.description }}</p>
        </div>
        <button @click="confirmDelete(task.id)" class="text-red-600 hover:text-red-800">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

import store from "../store";
import { computed } from "vue";

// Access the tasks from the Vuex store
const tasks = computed(() => store.state.tasks);

// Dispatch the action to get tasks when the component is mounted
store.dispatch("getTasks");

// Method to handle the checkbox change event
const toggleTaskStatus = (task) => {
  // Dispatch an action to update the task status
  store.dispatch('updateTaskStatus', task.id);
};

const confirmDelete = (taskId) => {
  if (confirm("Are you sure you want to delete this task?")) {
    store.dispatch('deleteTask', taskId);
  }
};

</script>
