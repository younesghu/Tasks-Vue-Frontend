<template>
    <div v-show="modalOpen" class="fixed bg-gray-900 w-full bg-opacity-30 min-h-full top-0 left-0 flex justify-center items-center px-8 sm:px-4 py-4 backdrop-blur-sm">

      <!-- Parent div for create Task Form -->
      <div class="w-full bg-gray-50 rounded-md shadow border border-gray-300 md:mt-0 sm:max-w-md xl:p-0">

        <!-- Close Form Button -->
        <button @click="closeAppModal" class="flex m-1 float-end text-2xl text-gray-900">
            <i class="fa fa-window-close" aria-hidden="true"></i>
        </button>

        <!-- Form Title -->
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">  
          
          <!-- Form header -->
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
            Create a Task
          </h1>

          <!-- Form -->
          <form class="space-y-4 md:space-y-6" @submit.prevent="addTask">
            
            <!-- Task title -->
            <div>              
              <label for="title" class="block mb-2 text-sm font-medium text-gray-900">Task Title</label>
              <input type="text" id="title" v-model="title" name="title" placeholder="Enter task title"
                class="bg-white border border-gray-500 rounded text-gray-900 sm:text-sm block w-full p-2.5 focus:outline-none"
                required>
            </div>

            <!-- Task Content -->
            <div>
              <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Task Description</label>
              <textarea id="description" v-model="description" name="description" rows="4" placeholder="Enter task description"
                class="bg-white border border-gray-500 rounded text-gray-900 sm:text-sm block w-full p-2.5 focus:outline-none"
                required></textarea>
            </div>

            <!-- Submit button -->
            <button type="submit"
              class="w-full rounded-md bg-gray-200 text-gray-900 font-medium text-sm px-5 py-2.5 text-center">
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
          title: '',
          description: '',
          modalOpen: false,
        };
      },
      mounted() {
        this.$store.watch(
          (state) => state.addTask,
          (newValue) => {
            this.modalOpen = newValue;
          }
        );
      },
      methods: {
        closeAppModal() {
          this.$store.dispatch('closeModalAddTask');
          this.clearForm();
          this.modalOpen = false;
        },
        addTask() {
          this.$store.dispatch('addTask', {
            title: this.title,
            description: this.description,
          })
          .then(() => {
            this.clearForm();
          })
          .catch((error) => {
            console.error("There was an error creating the task:", error);
          });
        },
        clearForm() {
          this.title = '';
          this.description = '';
        }
      }
    };
  </script>