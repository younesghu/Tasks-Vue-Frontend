<template>
    <div>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div class="w-full bg-gray-50 rounded-md shadow border border-gray-700 md:mt-0 sm:max-w-md xl:p-0">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Register
                        </h1>
                        <form class="space-y-4 md:space-y-6" method="POST" action="/" >
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Your Username</label>
                                <input type="text" name="name" id="name" class="bg-white border border-gray-500 rounded text-gray-900 sm:text-sm block w-full p-2.5 focus:outline-none" placeholder="name" required="">
                            </div>
                            <div>
                                <label for="email" class="bblock mb-2 text-sm font-medium text-gray-900">Your Email</label>
                                <input type="email" name="email" id="email" class="bg-white border border-gray-500 rounded text-gray-900 sm:text-sm block w-full p-2.5 focus:outline-none" placeholder="name@company.com" required="">
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-white border border-gray-500 rounded text-gray-900 sm:text-sm block w-full p-2.5 focus:outline-none" required="">
                            </div>
                            <button type="submit" class="w-full bg-gray-200 text-gray-900 rounded-md font-medium text-sm px-5 py-2.5 text-center">Sign up</button>
                            <p class="text-sm font-light text-gray-500">
                                Already have an account? 
                                <router-link :to="{name : 'Login'}" class="font-semibold text-gray-600 underline">Login</router-link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
export default{
    name: "Register"
}    
</script>