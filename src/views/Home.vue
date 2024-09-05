<template>
    <div class="flex justify-center px-4">
      <div class="w-full max-w-6xl">
        <div class="flex justify-between items-center">

          <!-- Header with Username -->
          <header class="m-2 font-extrabold text-2xl">
            Welcome <span class="text-yellow-500 text-3xl">{{ userName }}</span> to Task APP
          </header>
          
          <!-- Create Task & Sign Out buttons -->
          <div class="flex space-x-4">
            <button @click="openModal" class="m-4 w-30 rounded bg-blue-400 text-white font-medium text-sm px-5 py-2.5 text-center">
              Create Task
            </button>
            <button @click="logout" class="m-4 w-30 rounded bg-red-400 text-white font-medium text-sm px-5 py-2.5 text-center">
              Sign Out
            </button>
          </div>
        </div>

        <!-- Show All Tasks & Add Task Compenents -->
        <ShowTasks />
        <AddTask />
      </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';   

import AddTask from '@/components/AddTask.vue';
import ShowTasks from '@/components/ShowTasks.vue';
 
onMounted(() => {
  store.dispatch('getUser');
});

const userName = computed(() => store.state.user.data.name);

const store = useStore();
const router = useRouter();

function openModal() {
    store.dispatch('openAddTaskModal');
}

function logout() {
    store.dispatch("logout").then(() => {
        router.push({ name: "Login" });
    });
}

</script>