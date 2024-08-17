<template>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-gray-50 rounded-md shadow border border-gray-700 md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Login page
                        </h1>
                        <form class="space-y-4 md:space-y-6" method="POST" action="">
                            <div>
                                <label for="loginname" class="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
                                <input type="text" name="loginname" id="loginname" v-model="user.name" class="bg-white border border-gray-500 text-gray-900 rounded sm:text-sm block w-full p-2.5 focus:outline-none" placeholder="name" required="">
                            </div>
                            <div>
                                <label for="loginpassword" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input type="password" name="loginpassword" id="loginpassword" placeholder="••••••••" v-model="user.password" class="bg-white border border-gray-500 text-gray-900 rounded sm:text-sm block w-full p-2.5 focus:outline-none" required="">
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

<script>
import { useRouter } from 'vue-router';
import Register from './Register.vue';
import store from '@/store';

const router = useRouter();
export default{
    name: "Login"
}
const user = {
    email: '',
    password: ''
}

function login(ev) {
    ev.preventDefault();
    store.dispatch('login', user)
    .then(() => {
        router.push({
            name: 'Home'
        })
    })
}


</script>