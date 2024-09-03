<template>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-gray-50 rounded-md shadow border border-gray-700 md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Login page
                    </h1>
                    <form class="space-y-4 md:space-y-6" @submit="login">
                        <div v-if="errorMsg" class="py-3 px-8 bg-red-500 text-white rounded-md flex justify-between items-center">
                            {{ errorMsg }}
                            <span @click="errorMsg = ''" class="cursor-pointer">
                                <i class="fa fa-times-circle" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
                            <input type="email" name="email" id="email" v-model="user.email" class="bg-white border border-gray-500 rounded text-gray-900 sm:text-sm block w-full p-2.5 focus:outline-none" placeholder="email@gmail.com" required="">
                            </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" v-model="user.password" class="bg-white border border-gray-500 text-gray-900 rounded sm:text-sm block w-full p-2.5 focus:outline-none" required="">
                        </div>
                        <button type="submit" class="w-full bg-gray-200 text-gray-900 rounded-md font-medium text-sm px-5 py-2.5 text-center">Log in</button>
                        <p class="text-sm font-light text-gray-500">
                            Don’t have an account yet? 
                            <router-link :to="{name : 'Register'}" class="font-semibold text-gray-600 underline">Register</router-link>
                        </p>
                    </form>
                </div>
        </div>
    </div>
</template>

<script setup>

import store from '@/store';
import { useRouter } from 'vue-router';
import { ref } from "vue";

const router = useRouter();
const user = {
    email: "",
    password: "",
}

let errorMsg = ref('');

function login(ev) {
    ev.preventDefault();
    store.dispatch('login', user)
    .then(() => {
        router.push({
            name: 'Home' 
        })
    }).catch(err => {
        errorMsg.value = err.response.data.error
    })
}

</script>