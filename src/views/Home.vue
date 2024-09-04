<template>
    <div class="flex justify-center px-4">
      <div class="w-full max-w-6xl">
        <div class="flex justify-end">
          <button @click="openModal" class="m-4 w-30 rounded bg-blue-400 text-white font-medium text-sm px-5 py-2.5 text-center">
            Create Task
          </button>
          <button @click="logout" class="m-4 w-30 rounded bg-red-400 text-white font-medium text-sm px-5 py-2.5 text-center">
            Sign Out
          </button>
        </div>
        <ShowTasks />
        <AddTask />
      </div>
    </div>
</template>

<script setup>

import AddTask from '@/components/AddTask.vue';
import ShowTasks from '@/components/ShowTasks.vue';

import { useRouter } from 'vue-router';
import { useStore } from 'vuex';    

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