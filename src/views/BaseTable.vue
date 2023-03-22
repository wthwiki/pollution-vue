<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 详细信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
          >批量删除</el-button
        >

        <!-- 需要变化 -->
        <el-input
          v-model="query.key_dept_id"
          placeholder="企业编号"
          class="handle-input mr10"
        ></el-input>

        <!-- <el-select
          v-model="query.address"
          placeholder="地址"
          class="handle-select mr10"
        >
          <el-option key="1" label="广东省" value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select> -->

        <!-- 需要变化 -->
        <el-input
          v-model="query.key_poll_id"
          placeholder="污染物编号"
          class="handle-input mr10"
        ></el-input>

        <!-- 需要变化 -->
          <el-date-picker
            v-model="query.key_date"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
            value-format="yyyy-MM-dd"
          ></el-date-picker>

        <el-button type="primary" icon="el-icon-search" @click="handleSearch"
          >搜索</el-button
        >
      </div>

      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="deptId"
          label="企业编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="drainId"
          label="排污口编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="pollId"
          label="污染物编号"
          align="center"
        ></el-table-column>
        <el-table-column label="污染物浓度" align="center">
          <template #default="scope">{{ scope.row.density }}mg/L</template>
        </el-table-column>
        <el-table-column label="污染物排放量" align="center">
          <template #default="scope">{{ scope.row.discharge }}Kg</template>
        </el-table-column>
        <el-table-column label="总体积" align="center">
          <template #default="scope">{{ scope.row.volumn }}L</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template #default="scope">
            <el-tag
                  class="tag"
                  v-if="scope.row.status == '1'"
                  type="success"
                  >正常</el-tag
                >
                <el-tag
                  class="tag"
                  v-if="scope.row.status == '2'"
                  type="info"
                  >违规</el-tag
                >
                <el-tag 
                  class="tag" 
                  v-if="scope.row.status == '3'" 
                  type="warning"
                  >篡改</el-tag
                >
                <el-tag 
                  class="tag" 
                  v-if="scope.row.status == '4'" 
                  type="danger"
                  >伪造</el-tag
                >
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          type="date"
          value-format="yyyy-MM-dd"
          label="提交时间"
          align="center"
        ></el-table-column>

        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <!-- <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            > -->
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :page-size="query.pageSize"
          :total="total"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <!-- <el-dialog title="编辑" v-model="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog> -->
  </div>
</template>




<script>
// import { fetchData } from "../api/index";
import { listDeptTarget, deleteDeptTarget } from "../api/basetable";
import { toRaw } from "@vue/reactivity";
import { ref, onMounted } from "vue";
// import { store } from '@vue/store'

// import { ref, onMounted } from "vue";

// const queryParam = ref({
//   size: 10,
//   page: 0,
//   userName: "",
//   nickName: "",
// });

// const tableData = ref([]);
// const total = ref(0);
// let dialogVisible = ref(false);
// let title = ref("");

// const getListUser = function () {
//   listDept(queryParam.value).then((res) => {
//     console.log(res);
//     tableData.value = res.data.content;
//     total.value = res.data.totalElements;
//     queryParam.value.size = res.data.size;
//   });
// };
// onMounted(() => {
//   getListUser();
// });
// const changePage = async function (current) {
//   queryParam.value.page = current - 1;
//   getListUser();

// };

// const onSubmit = async function () {
//   getListUser();
// };
Date.prototype.format = function (format) {
  var args = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    // "h+": this.getHours(),
    // "m+": this.getMinutes(),
    // "s+": this.getSeconds(),
  };
  if (/(Y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var i in args) {
    var n = args[i];
    if (new RegExp("(" + i + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length)
      );
  }
  return format;
};

export default {
  name: "basetable",
  data() {
    return {
      query: {
        //搜索所需
        key_dept_id: "",
        key_poll_id: "",
        key_date: [],
        //分页所需
        pageSize: 10,
        pageNum: 0,
      },
      delete: {
        deptNum: "",
        pollId: "",
        drainId: "",
        submitDate: [],
      },
      //存放响应获得的信息
      tableData: [],
      //左侧选择框选择到的对象
      multipleSelection: [],
      //进行多选删除时，将multipleSelection内的对象封装进
      delList: [],
      //
      pageTotal: 0,
      // editVisible: false,
      // form: {},
      // idx: -1,
      // id: -1,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    getData() {
      listDeptTarget(this.query).then((res) => {
        //表赋值
        // console.log(res.data.data.list)
        // console.log(res.data.data.total)
        // console.log(res.data.data.size)
        this.tableData = res.data.data.list;
        //统计数据项数，以及分页相关
        this.total = res.data.data.total;
        this.query.pageSize = res.data.data.size;
        // this.pageTotal = res.pageTotal || 1;
      });
    },
    // getData() {
    //   listDept(this.query).then((res) => {
    //     console.log(res);
    //     //表赋值
    //     this.tableData = res.list;
    //     //统计数据项数，以及分页相关
    //     this.pageTotal = res.pageTotal || 50;
    //   });
    // },

    // vue: onMounted(() => {
    //   listDeptTarget();
    // }),

    // 触发搜索按钮
    handleSearch() {
      // this.$set(this.query, "pageIndex", 1);
      // if(this.query.submitDate != []){
      //   let values = new Date(this.query.submitDate).toLocaleDateString().toString().split("/")
      // this.query.submitDate = values[0]+"-"+values[1]+"-"+values[2]
      // }
      this.query.key_date = new Date(this.query.key_date).format(
        "YYYY-MM-dd"
      );
      if (this.query.key_date === "NaN-aN-aN" || this.query.key_date === "1970-01-01" ) {
        this.query.key_date = [];
      }
      this.getData();
    },

    // 删除操作
    // index拿执行操作的行数
    // row拿被执行操作行的具体信息
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          // this.delete.deptNum = row.deptNum
          // this.delete.drainId = row.drainId
          // this.delete.pollId = row.pollId
          // this.delete.submitDate = row.submitDate
          deleteDeptTarget(
            row.dataId
            // row.deptNum,
            // row.drainId,
            // row.pollId,
            // row.submitDate
          ).then((res) => {
            if (res.status === 200) {
              // this.tableData.splice(index, 1);
              this.getData();
              this.$message.success("删除成功");
            }
          });
        })
        .catch(() => {});
    },

    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    delAllSelection() {
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      }).then(() => {
        // const length = this.multipleSelection.length;
        // // var list = toRaw(store.state.menuList)
        // console.log(length);
        // let str = "";
        // //PROXY
        // const crystal = toRaw(this.multipleSelection);
        // console.log(crystal);
        // this.delList = this.delList.concat(crystal);
        // console.log(this.delList);
        const length = this.multipleSelection.length;
        let str = "";
        this.delList = this.delList.concat(this.multipleSelection);

        for (let i = 0; i < length; i++) {
          // console.log(this.multipleSelection[i].get(name));
          str += this.delList[i].deptNum + " ";
          deleteDeptTarget(
            this.delList[i].dataId
            // this.delList[i].deptNum,
            // this.delList[i].drainId,
            // this.delList[i].pollId,
            // this.delList[i].submitDate
          ).then((res) => {
            if (res) {
              // this.tableData.splice(index, 1);
              this.getData();
            }
          });
        }
        this.$message.error(`删除了以下企业信息：${str}`);
      });
      // this.multipleSelection = [];
    },

    // // 编辑操作
    // handleEdit(index, row) {
    //   this.idx = index;
    //   this.form = row;
    //   this.editVisible = true;
    // },
    // // 保存编辑
    // saveEdit() {
    //   this.editVisible = false;
    //   this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    //   this.$set(this.tableData, this.idx, this.form);
    // },

    // 分页导航
    async handlePageChange(current) {
      // this.$set(this.query, "pageIndex", val);
      //新增的
      console.log(current)
      this.query.pageNum = current-1;
      this.getData();
    },
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 200px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
