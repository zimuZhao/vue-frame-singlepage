<!-- 带分页表格 - 支持前端分页/后端分页
props:
  dataAll         (Object)    表格填充数据
  ifLoading       (Boolean)   是否显示loading动画，默认为true
  showPagination  (Boolean)   是否显示分页
  currentPageNo   (Number)    当前页
  ifPageRequest   (Boolean)   后端分页 true || 前端分页 false，默认为false
  ifMultiple      (Boolean)   是否显示多选框
  defaultSort     (Object)    默认排序 {prop: '', order: ''}
  spanMethod      (Function)  合并行或列
  pagingLayout    (String)    分页组件布局 默认"total, sizes, prev, pager, next, jumper"
$emit:
  pageChange      currentPage、pageSize变更时触发
  multipleSelect  多选框勾选时触发
  sortChange      点击排序时触发
-->
<template>
  <el-row class="table-template" v-loading="ifLoading">
    <el-table border stripe style="width: 100%" :header-cell-style="headerCellStyle"
              :data="tableData"
              :default-sort="defaultSort"
              :span-method="spanMethod"
              @selection-change="handleMultipleChange"
              @sort-change="handleSortChange">

      <el-table-column v-if="ifMultiple" :fixed="true" type="selection" width="55" align="center"/>

      <el-table-column v-for="item in dataAll.titleName" v-if="item.hidden !== 'true'" header-align="center"
                       :align="item.align ? item.align : 'center'"
                       :key="item.key"
                       :prop="item.key"
                       :label="item.title"
                       :width="item.width"
                       :show-overflow-tooltip="true"
                       :fixed="item.fixed && item.fixed !== 'false' ? item.fixed : false"
                       :sortable="item.sortable && item.sortable !== 'false' ?
                                  (item.sortable === 'true' ? true : item.sortable) : false">

        <template slot-scope="scope">
          <column-slot :index="scope.$index"
                       :row="scope.row"
                       :column="scope.column"
                       :render="item.render"/>
        </template>

      </el-table-column>
    </el-table>

    <el-pagination v-if="showPagination"
                   :layout="pagingLayout"
                   :page-sizes="[10, 20, 30, 40]"
                   :page-size="pageSize"
                   :total="totalSize"
                   :current-page="currentPage"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"/>

  </el-row>
</template>

<script>
import columnSlot from './columnSlot'
import {
  Table as elTable,
  TableColumn as elTableColumn,
  Pagination as elPagination,
} from 'element-ui'
import _ from 'lodash'

export default {
  name: 'tableTemplate',
  components: {columnSlot, elTable, elTableColumn, elPagination},
  filters: {},
  mixins: [],
  props: {
    dataAll: {
      type: Object,
      default () {
        return {
          titleName: [],
          titleList: [],
          totalSize: 0, // 前端分页可缺省，后端分页必须传递
        }
      },
      require: true,
    },
    ifLoading: {
      type: Boolean,
      default () {
        return true
      },
      require: false,
    },
    showPagination: {
      type: Boolean,
      default () {
        return true
      },
      require: false,
    },
    currentPageNo: {
      type: Number,
      default () {
        return 1
      },
      require: false,
    },
    ifPageRequest: {
      type: Boolean,
      default () {
        return false
      },
      require: false,
    },
    ifMultiple: {
      type: Boolean,
      default () {
        return false
      },
      require: false,
    },
    defaultSort: {
      type: Object,
      default () {
        return {prop: '', order: ''} // order: descending ||  ascending
      },
      require: false,
    },
    spanMethod: {
      type: Function,
      require: false,
    },
    pagingLayout: {
      type: String,
      default () {
        return 'total, sizes, prev, pager, next, jumper'
      },
      require: false,
    },
  },
  data () {
    return {
      headerCellStyle: {
        backgroundColor: '#f5f7f9',
      },
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalSize: 0,
      multipleSelect: [],
    }
  },
  computed: {},
  watch: {
    currentPageNo: {
      handler (val, oldVal) {
        this.currentPage = val
      },
      deep: true,
    },
    dataAll: {
      handler (val, oldVal) {
        const _vm = this
        _vm.totalSize = 0
        _vm.tableData.splice(0, _vm.tableData.length)

        if (_vm.ifPageRequest) {
          _vm.totalSize = val.totalSize
          _vm.tableData = val.titleList
        } else {
          _vm.currentPage = 1
          _vm.totalSize = val.titleList.length
          let _dataAll = _.cloneDeep(val)
          _vm.tableData = _dataAll.titleList.slice((_vm.currentPage - 1) * _vm.pageSize,
            _vm.pageSize * _vm.currentPage)
        }
      },
      deep: true,
    },

  },
  methods: {
    handleSizeChange (val) {
      const _vm = this
      _vm.pageSize = val
      if (_vm.ifPageRequest && _vm.currentPage === 1) {
        _vm.$emit('pageChange', {currentPage: _vm.currentPage, pageSize: val})
      } else {
        let _dataAll = _.cloneDeep(_vm.dataAll)
        _vm.tableData = _dataAll.titleList.slice((_vm.currentPage - 1) * val, val * _vm.currentPage)
      }
      _vm.currentPage = 1
    },
    handleCurrentChange (page) {
      const _vm = this
      _vm.currentPage = page
      if (_vm.ifPageRequest) {
        _vm.$emit('pageChange', {currentPage: page, pageSize: _vm.pageSize})
      } else {
        let _dataAll = _.cloneDeep(_vm.dataAll)
        _vm.tableData = _dataAll.titleList.slice((page - 1) * _vm.pageSize, _vm.pageSize * page)
      }
    },
    handleMultipleChange (val) {
      const _vm = this
      _vm.multipleSelect = val
      _vm.$emit('multipleSelect', val)
    },
    handleSortChange (val) {
      const _vm = this
      _vm.$emit('sortChange', val)
    },
  },
}
</script>

<style lang="less">
.table-template {

  .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    color: #666;
    font-weight: 900;
  }

  .el-table thead th.gutter {
    display: block !important;
  }

  .el-pagination {
    margin-top: 20px;
    padding: 0;
    text-align: right;

    .el-pagination__total {
      height: 32px;
      line-height: 32px;
    }

    .el-pagination__sizes {
      .el-input__inner {
        height: 32px;
        line-height: 32px;
      }
    }

    .btn-prev {
      margin-right: 8px;
      padding: 9px 6px;
      width: 32px;
      min-width: 32px;
      height: 32px;
      line-height: 32px;
      border: 1px solid rgba(179, 187, 195, 0.50);
      border-radius: 4px;
    }

    .btn-next {
      margin-left: 8px;
      padding: 9px;
      width: 32px;
      min-width: 32px;
      height: 32px;
      line-height: 32px;
      border: 1px solid rgba(179, 187, 195, 0.50);
      border-radius: 4px;
    }

    .el-pager {
      .number {
        margin-right: 4px;
        width: 32px;
        height: 32px;
        line-height: 32px;
        border: 1px solid rgba(179, 187, 195, 0.50);
        border-radius: 4px;
      }

      .more {
        margin-right: 4px;
        height: 32px;
        line-height: 32px;
        border: 1px solid rgba(179, 187, 195, 0.50);
        border-radius: 4px;
      }

      li.active {
        color: #fff;
        background-color: #42C0FB;
      }
    }

    .el-pagination__jump {
      height: 32px;
      line-height: 32px;
    }

  }
}
</style>
