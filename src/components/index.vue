<template>
  <p>{{showText}}</p>
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
    return {
      showText: '',
    }
  },
  computed: {},
  watch: {},
  mounted() {
    getInfo({appName: '接口测试'}).then((data) => {
      this.showText = data
    })
  },
  methods: {},
}
</script>

<style lang="less" scoped></style>
