<template>
  <el-row>
    <el-card class="box-card">
      <v-table :ifLoading="ifLoading" :ifPageRequest="true" :dataAll="dataAll" :currentPageNo="currentPage"
               @pageChange="pageChange" style="width: 100%"/>
    </el-card>
  </el-row>
</template>

<script>
import {Card as elCard} from 'element-ui'
import vTable from '@/components/table-template/index.vue'
import {
  formatTitle,
  formatTitleColor,
  formatLink,
} from '@/components/table-template/cellFormat'
import {getTable} from '@/api/index'

export default {
  name: 'Index',
  components: {elCard, vTable},
  filters: {},
  mixins: [],
  props: {},
  data() {
    return {
      ifLoading: true,
      dataAll: {
        titleName: [],
        titleList: [],
        totalSize: 0,
      },
      currentPage: 1,
      pageSize: 10,
      defaultSort: {prop: '', order: ''},
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.serviceGetTable()
  },
  methods: {
    serviceGetTable () {
      this.ifLoading = true

      const _params = Object.assign({}, {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      })

      getTable(_params).then((data) => {
        return this.renderCircle(data)
      }).then((tableData) => {
        this.dataAll = Object.assign({}, tableData)
        this.ifLoading = false
      })
    },

    renderCircle (data) {
      const [servceData, _vm] = [data, this]
      for (const item of servceData.titleName) {
        switch (item.renderType) {
          case 'TITLE':
            formatTitle(item)
            break
          case 'TITLE_COLOR':
            formatTitleColor(item)
            break
          case 'LINK':
            formatLink(item)
            break
          case 'CUSTOMISE':
            if (item.key === 'status') { // 菜单监控
              item.render = (h, val) => {
                let _color = ''
                switch (val['row'][item.key]) {
                  case 'UNNORMAL':
                    _color = 'red'
                    break
                  case 'NORMAL':
                    _color = 'green'
                    break
                  case 'RUNNING':
                    _color = 'blue'
                    break
                }

                return h('div', {
                  attrs: {
                    class: 'con-circle ' + _color,
                  },
                  on: {
                    click: () => {
                      let _routeData = _vm.$router.resolve({ // 传递菜单ID/菜单名
                        path: `/menu-monitor-upstream/${val['row']['id']}/${encodeURIComponent(
                          val['row']['monitorMenuName'])}`,
                      })
                      window.open(_routeData.href, '_blank')
                    },
                  },
                })
              }
            }
            break
          default:
            break
        }
      }
      return servceData
    },

    pageChange (val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.serviceGetTable()
    },

  },
}
</script>

<style lang="less">
.box-card {
  color: #333;
  background-color: #FFF;
  text-align: left;
  border: 1px solid #E8EAED;
  box-shadow: none;

  .el-card__header {
    padding: 20px 30px;
    border-bottom: 1px solid #D9DDE1;
    font-size: 12px;
  }

  .card-content {
    padding: 20px 30px;
  }

  .el-card__body {
    padding: 25px 30px;
    min-height: 505px;
  }

  .select-area {
    font-size: 14px;
    margin-bottom: 20px;

    .el-select {
      width: 180px;
    }
  }

  .m-r-12 {
    margin-right: 12px;
  }

  .con-circle {
    cursor: pointer;
    width: 15px;
    height: 15px;
    margin: 3px auto;
    border-radius: 50%;
    position: relative;
  }

  .red {
    background-color: #E50000;
    box-shadow: 0 0 0 3px rgba(255, 80, 0, .2);
  }

  .green {
    background-color: #00D675;
    box-shadow: 0 0 0 3px rgba(0, 214, 117, .2);
  }

  .blue {
    background-color: #42C0FB;
    box-shadow: 0 0 0 3px rgba(66, 192, 251, .2);
  }

}
</style>
