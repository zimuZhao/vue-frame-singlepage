<template>
  <v-page>
    <!-- <keep-alive> -->
    <router-view/>
    <!-- </keep-alive> -->
  </v-page>
</template>

<script>
import vPage from '@/components/common/Page.vue'
export default {
  name: 'App',
  components: {
    vPage,
  },
}
</script>
