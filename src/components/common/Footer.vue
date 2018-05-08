<template>
  <div class="footer">
    <span>{{copyright}}</span>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      copyright: '',
    }
  },
  watch: {
    '$store.state.global.user.copyright': {
      handler(val) {
        if (val) this.copyright = val
      },
      deep: true,
    },
  },
}
</script>

<style lang="less" scoped>
.footer {
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  text-align: center;
  color: #333;
  background: #ffffff;
}
</style>
