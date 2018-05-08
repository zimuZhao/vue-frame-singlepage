<template>
  <h4><span>{{cont}}</span></h4>
</template>

<script>
export default {
  name: 'TitleCom',
  props: ['cont'],
}
</script>

<style lang="less" scoped>
h4 {
  text-align: left;
  border-bottom: 1px solid #ececee;
  line-height: 50px;
  height: 50px;
}

h4 span {
  font-size: 12px;
  color: #333333;
  padding-left: 30px;
  display: inline-block;
}
</style>
