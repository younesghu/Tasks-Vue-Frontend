<template>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-gray-50 rounded-md shadow border border-gray-700 md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                    Create a Task
                </h1>
                <form class="space-y-4 md:space-y-6">
                    <div>
                        <label for="title" class="block mb-2 text-sm font-medium text-gray-900">Task Title</label>
                        <input type="text" id="title" name="title" placeholder="Enter task title"
                            class="bg-white border border-gray-500 rounded text-gray-900 sm:text-sm block w-full p-2.5 focus:outline-none"
                            required>
                    </div>
                    <div>
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Task Description</label>
                        <textarea id="description" name="description" rows="4" placeholder="Enter task description"
                            class="bg-white border border-gray-500 rounded text-gray-900 sm:text-sm block w-full p-2.5 focus:outline-none"
                            required></textarea>
                    </div>
                    <button type="submit"
                        class="w-full rounded-md bg-gray-200 text-gray-900 font-medium text-sm px-5 py-2.5 text-center">
                        Add Task
                    </button>
                </form>
                <button @click="logout" class="mt-4 w-full rounded-md bg-red-500 text-white font-medium text-sm px-5 py-2.5 text-center">
                    Sign Out
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
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