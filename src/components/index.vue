<template>
  <h1>This is index</h1>
</template>

<script>
import {getInfo} from '@/api/index'

export default {
  name: 'Index',
  components: {},
  filters: {},
  mixins: [],
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {
    getInfo({appName: '接口测试'}).then((data) => {
      console.warn(data)
    })
  },
  methods: {},
}
</script>

<style lang="less" scoped></style>
