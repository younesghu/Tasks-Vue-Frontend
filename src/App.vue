<script>
import { computed } from 'vue';
import Loader from './components/Loader.vue';
import { useStore } from 'vuex';

export default {
  components: {
    Loader
  },
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.getters.isLoading);

    // Return an object with `isLoading` so it can be used in the template
    return {
      isLoading
    };
  }
}
</script>

<template>
  <Loader v-if="isLoading"/>
  <router-view />
</template>

<style scoped>

</style>
