<template>
  <div class="xs:h-screen bg-yellow-100 border w-full border-gray-300 rounded-md shadow p-4 mb-4" id="tasks">
  
    <!-- Show this paragraph if no tasks are created yet-->
    <div v-if="tasks.incomplete.length === 0 && tasks.complete.length === 0" class="text-center text-gray-800">
      <p>Go ahead and add a task in the form below to get you started.</p>
    </div>

    <!-- Parent div for Incomplete & Complete Tasks -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <!-- Incomplete Tasks Column -->
      <div>
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Incomplete Tasks</h2>
        <div class="grid grid-cols-1 gap-4">
          <div 
            v-for="task in tasks.incomplete" 
            :key="task.id" 
            class="bg-white border border-gray-400 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out">
            
            <!-- Task title -->
            <h1 class="text-xl uppercase font-semibold text-gray-900 mb-2">{{ task.title }}</h1>
            
            <!-- Task content -->
            <p class="text-sm text-gray-700 mb-4">{{ task.description }}</p>

            <!-- Task completion status -->
            <div class="flex justify-between items-center">
              <label class="inline-flex items-center">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-0"
                      @change="toggleTaskStatus(task)">
                <span class="ml-2 text-sm text-gray-800">Mark as Complete</span>
              </label>
              
              <!-- Delete task button -->
              <button @click="confirmDelete(task.id)" class="text-red-600 hover:text-red-800">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Completed Tasks Column -->
      <div>
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Completed Tasks</h2>
        <div class="grid grid-cols-1 gap-4">
          <div 
            v-for="task in tasks.complete" 
            :key="task.id" 
            class="bg-gray-200 border border-gray-400 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out">

            <!-- Task title -->
            <h1 class="text-xl uppercase font-semibold text-gray-500 mb-2 line-through">{{ task.title }}</h1>

            <!-- Task content -->
            <p class="text-sm text-gray-400 mb-4 line-through">{{ task.description }}</p>

            <!-- Task completion status -->
            <div class="flex justify-between items-center">
              <label class="inline-flex items-center">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-0"
                       checked @change="toggleTaskStatus(task)">
                <span class="ml-2 text-sm text-gray-800">Completed</span>
              </label>

              <!-- Delete task button -->
              <button @click="confirmDelete(task.id)" class="text-red-600 hover:text-red-800">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import store from "../store";
import { computed } from "vue";

// Access the tasks from the Vuex store
const tasks = computed(() => {
  const allTasks = store.state.tasks.data;
  return {
    incomplete: allTasks.filter(task => task.status !== 'complete'),
    complete: allTasks.filter(task => task.status === 'complete')
  };
});

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