<template>
    <button @click="logout" class="mt-4 w-30 rounded-md bg-red-500 text-white font-medium text-sm px-5 py-2.5 text-center">
        Sign Out
    </button>
    <ShowTasks />
    <AddTask />

</template>

<script setup>

import AddTask from '@/components/AddTask.vue';
import ShowTasks from '@/components/ShowTasks.vue';

import { useRouter } from 'vue-router';
import { useStore } from 'vuex';    

const store = useStore();
const router = useRouter();

function logout() {
    store.dispatch("logout").then(() => {
        router.push({ name: "Login" });
    });
}

</script>