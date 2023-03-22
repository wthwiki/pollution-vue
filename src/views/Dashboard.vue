<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height: 252px">
          <div class="user-info">
            <img src="../assets/img/head.png" class="user-avator" alt />
            <div class="user-info-cont">
              <div class="user-info-name">{{ name }}</div>
              <div>{{ deptName }}</div>
            </div>
          </div>
          <div class="user-info-list">
            上次登录时间：
            <span>2022-04-09</span>
          </div>
          <div class="user-info-list">
            上次登录地点：
            <span> 四川成都 </span>
          </div>
        </el-card>

        <!-- <el-card shadow="hover" style="height: 252px">
          <template #header>
            <div class="clearfix">
              <span>语言详情</span>
            </div>
          </template>
          Vue
          <el-progress :percentage="80" color="#42b983"></el-progress>JavaScript
          <el-progress :percentage="10" color="#f1e05a"></el-progress>CSS
          <el-progress :percentage="5"></el-progress>HTML
          <el-progress :percentage="5" color="#f56c6c"></el-progress>
        </el-card> -->
        <el-card shadow="hover" style="height: 252px">
          <template #header>
            <div class="clearfix">
              <span style="font-size: 20px; font-weight: bold">占比情况</span>
            </div>
          </template>
          正常
          <el-progress :percentage="ans1" color="rgb(6, 87, 24)"></el-progress
          >违规
          <el-progress
            :percentage="ans2"
            color="rgb(234, 162, 28)"
          ></el-progress
          >篡改
          <!-- <el-progress :percentage="5"></el-progress>HTML -->
          <el-progress :percentage="ans3" color="rgb(224, 69, 26)"></el-progress
          >伪造
          <el-progress
            :percentage="ans4"
            color="rgb(119, 16, 16)"
          ></el-progress>
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
          <el-col class="head" :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1" @click="doSearch(1)">
                <!-- 图标 -->
                <i class="el-icon-check grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num" ref="top1">{{ access }}</div>
                  <div style="color: rgb(6, 87, 24)">正常企业数</div>
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col class="head" :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2" @click="doSearch(2)">
                <i class="el-icon-bell grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ info }}</div>
                  <div style="color: rgb(234, 162, 28)">违规企业数</div>
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col class="head" :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-3" @click="doSearch(3)">
                <i class="el-icon-warning-outline grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ warning }}</div>
                  <div style="color: rgb(224, 69, 26)">篡改企业数</div>
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col class="head" :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-4" @click="doSearch(4)">
                <i class="el-icon-close grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ danger }}</div>
                  <div style="color: rgb(119, 16, 16)">伪造企业数</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <!-- </div> -->
        </el-row>

        <el-card shadow="hover" style="height: 403px">
          <!-- <div class="tableTitle"> -->
          <div style="font-size: 20px; font-weight: bold" class="information">
            信息展示
          </div>
          <el-pagination
            class="dashPagination"
            background
            layout="total, prev, pager, next"
            :page-size="query.pageSize"
            :total="total"
            @current-change="handlePageChange"
          ></el-pagination>

          <!-- <el-button style="float: right; padding: 3px 0" type="text">添加</el-button> -->
          <!-- </div> -->

          <!-- <template #header></template> -->
          <!-- <el-divider class="divider"/> -->
          <div class="tableTitle"></div>
          <el-table
            :show-header="false"
            :data="deptTargetInformation"
            style="width: 100%"
          >
            <!-- <el-table-column width="40">
              <template #default="scope">
                <el-checkbox v-model="scope.row.status"></el-checkbox>
              </template>
            </el-table-column> -->
            <!-- <el-scrollbar style="height:100%" max-height="100px"> -->

            <el-table-column>
              <template #default="scope">
                <!-- <div
                  class="todo-item"
                  :class="{
                    'todo-item-del': scope.row.status,
                  }"
                > -->
                编号为<el-tag>{{ scope.row.deptId }}</el-tag>
                的企业在编号为<el-tag>{{ scope.row.drainId }}</el-tag>
                的排污口排放编号为<el-tag>{{ scope.row.pollId }}</el-tag>
                的污染物<el-tag>{{ scope.row.discharge }}</el-tag>
                Kg，其浓度为<el-tag>{{ scope.row.density }}</el-tag
                >mg/L
                <!-- </div> -->
                <el-tag
                  class="tag"
                  v-if="scope.row.status == '1'"
                  type="success"
                  >正常</el-tag
                >
                <el-tag class="tag" v-if="scope.row.status == '2'" type="info"
                  >违规</el-tag
                >
                <el-tag
                  class="tag"
                  v-if="scope.row.status == '3'"
                  type="warning"
                  >篡改</el-tag
                >
                <el-tag class="tag" v-if="scope.row.status == '4'" type="danger"
                  >伪造</el-tag
                >
              </template>
            </el-table-column>

            <!-- <el-table-column width="60">
              <template>
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
              </template>
            </el-table-column> -->
            <!-- </el-scrollbar> -->
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <!-- <el-col :span="12">
        <el-card shadow="hover">
          <schart
            ref="bar"
            class="schart"
            canvasId="bar"
            :options="options"
          ></schart>
        </el-card>
      </el-col> -->
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="tablehead">最近30天企业的状态</div>
          <div id="main" class="schart"></div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="hover">
          <schart
            ref="line"
            class="schart"
            canvasId="line"
            :options="options2"
          ></schart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { changeDefaultConfig } from "@jiaminghi/charts";
import Schart from "vue-schart";
import { toRaw } from "@vue/reactivity";
import {
  countAccess,
  countWarning,
  countDanger,
  ccount,
  getDeptTargetInformation,
} from "../api/dashboard";
import { ref, onMounted } from "vue";
import { listDept, deleteDept } from "../api/basetable";
import storage from "@/utils/storage.js";
import axios from "axios";

import * as echarts from "echarts";

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
  name: "dashboard",
  data() {
    return {
      ans1: "0",
      ans2: "0",
      ans3: "0",
      ans4: "0",
      access: "",
      info: "",
      warning: "",
      danger: "",
      count: "",
      array: [],
      count: {
        status: "1",
        // submitDate: [],
        start: [],
        end: [],
      },
      ccount: {
        // submitDate: [],
        start: [],
        end: [],
      },
      // name: localStorage.getItem("ms_deptName"),
      name: "admin",
      query: {
        //搜索所需
        // key_date: [],
        start: [],
        end: [],
        status: "",
        //分页所需
        pageSize: 5,
        pageNum: 0,
        // pageIndex: 0,
        // pageSize: 0,
      },
      pageTotal: 0,
      deptTargetInformation: [],
      options: {
        type: "bar",
        option: true,
        title: {
          text: "最近一周企业的状态",
        },
        xRorate: 25,
        labels: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        datasets: [
          {
            label: "正常",
            fillColor: "rgb(6, 87, 24)",
            data: ["234", "234", "234", "234", "234", "234", "234"],
          },
          {
            label: "违规",
            fillColor: "rgb(117, 94, 94)",
            data: ["234", "23", "234", "324", "234", "24", "234"],
          },
          {
            label: "篡改",
            fillColor: "rgb(242, 181, 67)",
            data: ["234", "234", "234", "234", "234", "24", "234"],
          },
          {
            label: "伪造",
            fillColor: "rgb(242, 94, 67)",
            data: ["234", "234", "234", "234", "234", "24", "24`"],
          },
        ],
      },
      options2: {
        type: "line",
        title: {
          text: "下一周企业排污形势的趋势",
        },
        labels: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        datasets: [
          {
            label: "污染物浓度（mg/L）",
            fillColor: "rgb(30, 121, 181)",
            data: ["", "", "", "", "", "", ""],
          },
          {
            label: "污染物总量（Kg * 10^2）",
            fillColor: "rgb(120, 67, 242)",
            data: ["", "", "", "", "", "", ""],
          },
          {
            label: "可能出现违规企业占比（%）",
            fillColor: "rgb(119, 16, 16)",
            data: ["", "", "", "", "", "", ""],
          },
        ],
      },
      options3: {
        type: "line",
        title: {
          text: "下一周企业排污形势的趋势",
        },
        labels: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        datasets: [
          {
            label: "污染物浓度（mg/L）",
            fillColor: "rgb(30, 121, 181)",
            data: [234, 278, 270, 190, 230, 200, 260],
          },
          {
            label: "污染物总量（Kg * 10^2）",
            fillColor: "rgb(120, 67, 242)",
            data: [164, 178, 150, 135, 160, 160, 120],
          },
          {
            label: "可能出现违规企业占比（%）",
            fillColor: "rgb(119, 16, 16)",
            data: [10, 5, 15, 8, 7, 3, 1],
          },
        ],
      },
    };
  },
  components: {
    Schart,
  },
  computed: {
    deptName() {
      return this.name === "admin" ? "超级管理员" : "普通用户";
    },
  },

  // watch: {
  //   // watch就是用来监控数据变化，只有变化了才会调用定时器的变化
  //   one() {
  //     // 调用定时器
  //     this.timer();
  //   },
  // },
  created() {
    this.setWeek();
    this.getData();
    this.getDeptTargetInformation();
    // this.getCountData();
  },
  mounted() {
    this.settable();
  },
  methods: {
    settable() {
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var option;

      myChart.showLoading();
      this.ccount.start = new Date().format("2020-10-01");
      this.ccount.end = new Date().format("2020-10-30");
      ccount(this.ccount).then((res) => {
        myChart.hideLoading();
        console.log(res.data.data[1].length);
        let datar = new Array();
        let label = new Array(30);
        for (var j = 1; j < 5; j++) {
          datar[j-1] = new Array()
          var length = res.data.data[j].length
          for (var i = 0; i < length ; i++) {
            if (j == 1) {
              label[i] = new Date(res.data.data[j][i].date).format(
                "YYYY-MM-dd"
              );
            }
            datar[j-1][i] = res.data.data[j][i].count;
          }
        }

        // this.options.datasets = [list[0], list[1], list[2], list[3]];
        this.options2 = this.options3;
        // option.title.textStyle. fontSize = 18
        option = {
          // title: {
          //   text: "最近30天企业的状态",
          //   textStyle: {
          //     fontSize: 20,
          //   },
          // },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              label: {
                show: true,
              },
            },
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              // dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          calculable: true,
          legend: {
            data: ["正常", "违规", "篡改", "伪造"],
            textStyle: {
              fontSize: 15,
            },
            itemGap: 10,
          },
          grid: {
            top: "12%",
            left: "1%",
            right: "10%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              // data: labell,
              data: label,
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "条/天",
              axisLabel: {
                formatter: function (a) {
                  a = +a;
                  return isFinite(a) ? echarts.format.addCommas(+a / 1) : "";
                },
              },
            },
          ],
          dataZoom: [
            {
              show: true,
              start: 94,
              end: 100,
            },
            {
              type: "inside",
              start: 94,
              end: 100,
            },
            {
              show: true,
              yAxisIndex: 0,
              filterMode: "empty",
              width: 30,
              height: "80%",
              showDataShadow: false,
              left: "93%",
            },
          ],
          series: [
            {
              name: "正常",
              type: "bar",
              color: "rgb(6, 87, 24)",
              data: datar[0],
            },
            {
              name: "违规",
              type: "bar",
              color: "rgb(234, 162, 28)",
              data: datar[1],
            },
            {
              name: "篡改",
              type: "bar",
              color: "rgb(224, 69, 26)",
              data: datar[2],
            },
            {
              name: "伪造",
              type: "bar",
              color: "rgb(119, 16, 16)",
              data: datar[3],
            },
          ],
        };
        myChart.setOption(option);
      });

      option && myChart.setOption(option);
    },

    // setCount(status) {
    //       this.status = status;
    //       this.submitDate = new Date().format("YYYY-MM-dd");
    //     },
    getData() {
      //   const { data: res } = await this.$http.get("/data01");
      //   const { data: res } = "1";
      //   console.log(res);

      // listDept(this.query).then((res) => {
      //   //表赋值
      //   // const crystal = toRaw(res.content);
      //   // console.log(crystal);
      //   // console.log(crystal[0].userId);
      //   // console.log(res.content[0].userId);
      //   this.access = res.content[0].userId;
      // });

      // this.count.start = new Date().format("YYYY-MM-dd");
      // this.count.end = new Date().format("YYYY-MM-dd");
      this.count.start = new Date().format("2020-10-09");
      this.count.end = new Date().format("2020-10-09");
      this.count.status = 1;
      countAccess(this.count).then((res) => {
        this.access = res.data.data;
      });
      this.count.status = 2;
      countWarning(this.count).then((res) => {
        this.info = res.data.data;
      });
      this.count.status = 3;
      countDanger(this.count).then((res) => {
        this.warning = res.data.data;
      });
      this.count.status = 4;
      countDanger(this.count).then((res) => {
        this.danger = res.data.data;
        this.count = this.access + this.info + this.warning + this.danger;
        if (res.status == 200) {
          setTimeout(() => {
            if (this.count != 0) {
              console.log(this.ans1);
              this.ans1 = ((this.access / this.count) * 100).toFixed(2);
              this.ans2 = ((this.info / this.count) * 100).toFixed(2);
              this.ans3 = ((this.warning / this.count) * 100).toFixed(2);
              this.ans4 = ((this.danger / this.count) * 100).toFixed(2);
              console.log(this.ans1);
            }
          }, 2000);
        }
      });
    },

    getDeptTargetInformation(val) {
      // this.query.key_date = new Date().format("YYYY-MM-dd");
      this.query.start = this.query.end = new Date().format("2020-10-09");
      // console.log(val);
      if (val === undefined) {
        this.query.status = 1;
      } else {
        this.query.status = val;
      }
      getDeptTargetInformation(this.query).then((res) => {
        console.log(res);
        // let lis = toRaw(res.data.data);
        this.deptTargetInformation = res.data.data.list;
        // this.deptTargetInformation = lis;
        console.log(res.data.data);
        this.total = res.data.data.total;
        this.query.pageSize = res.data.data.size;
        // this.pageTotal = res.data.totalElements;
        // console.log(this.deptTargetInformation);
      });
    },

    async handlePageChange(current) {
      console.log(current);
      this.query.pageNum = current - 1;

      this.getDeptTargetInformation(this.query.status);
    },

    doSearch(val) {
      this.query.pageNum = 0;
      // this.query.page = 0;
      this.query.status = val;
      this.getDeptTargetInformation(this.query.status);

      // console.log(this.options.datasets)
    },

    setWeek() {
      let date = new Date().getDay();
      let day = new Array(7);
      let copyDay = new Array(7);
      day = ["周天", "周一", "周二", "周三", "周四", "周五", "周六"];
      for (let i = 6, j = 0; i >= 0; i--) {
        if (date >= j) {
          copyDay[i] = day[date - j++];
        } else {
          copyDay[i] = day[date + i + 1];
        }
      }
      this.options.labels = copyDay;
      this.options2.labels = copyDay;
    },

    getCountData() {
      // console.log(this.options.datasets);
      // let list = toRaw(this.options.datasets);
      // let values = -1;
      // var rightDate = this.query.key_date = new Date().format("2020-10-09");

      // this.count.status = 0;
      // for (let i = 0; i < 7; i++) {
      //   // this.count.submitDate = new Date((new Date).getTime() - i*24*60*60*1000).format("YYYY-MM-dd");
      //   // this.count.submitDate = new Date(rightDate.getTime() - i*24*60*60*1000).format("YYYY-MM-dd");
      //   this.count.start = new Date(rightDate.getTime() - i*24*60*60*1000).format("YYYY-MM-dd");
      //   this.count.end = new Date(rightDate.getTime() - i*24*60*60*1000).format("YYYY-MM-dd");
      //   countAccess(this.count).then((res) => {
      //     if (res.status === 200) {
      //       values = res.data;
      //       // values = 2;
      //       list[0].data[6-i] = values;
      //     }
      //   });
      // }

      // this.count.status = 1;
      // for (let i = 0; i < 7; i++) {
      //   // this.count.submitDate = new Date((new Date).getTime() - i*24*60*60*1000).format("YYYY-MM-dd");
      //   // this.count.submitDate = new Date(rightDate.getTime() - i*24*60*60*1000).format("YYYY-MM-dd");
      //   this.count.start = new Date(rightDate.getTime() - i*24*60*60*1000).format("YYYY-MM-dd");
      //   this.count.end = new Date(rightDate.getTime() - i*24*60*60*1000).format("YYYY-MM-dd");
      //   console.log(this.count.submitDate)
      //   countWarning(this.count).then((res) => {
      //     if (res.status === 200) {
      //       values = res.data;
      //       // values = 2;
      //       list[1].data[6-i] = values;
      //     }
      //   });
      // }

      // this.count.status = 2;
      // for (let i = 0; i < 7; i++) {
      //   // this.count.submitDate = new Date((new Date).getTime() - i*24*60*60*1000).format("YYYY-MM-dd");
      //   // this.count.submitDate = new Date(rightDate.getTime() - i*24*60*60*1000).format("YYYY-MM-dd");
      //   this.count.start = new Date(rightDate.getTime() - i*24*60*60*1000).format("YYYY-MM-dd");
      //   this.count.end = new Date(rightDate.getTime() - i*24*60*60*1000).format("YYYY-MM-dd");
      //   countDanger(this.count).then((res) => {
      //     if (res.status === 200) {
      //       values = res.data;
      //       // values = 2;
      //       list[2].data[6-i] = values;
      //       if(i == 6){
      //         setTimeout(() =>{
      //           this.options.datasets = [list[0], list[1], list[2]];
      //           console.log(this.options.datasets);
      //         },2000)
      //       }
      //     }
      //   });
      // }
      // this.options.datasets = [list[0], list[1], list[2]];

      // for (let i = 0; i < 7; i++) {
      //   // this.count.submitDate = new Date((new Date).getTime() - i*24*60*60*1000).format("YYYY-MM-dd");
      //   // this.count.submitDate = new Date(rightDate.getTime() - i*24*60*60*1000).format("YYYY-MM-dd");
      //   // this.count.start = new Date(rightDate.getTime() - i*24*60*60*1000).format("YYYY-MM-dd");
      //   // this.count.end = new Date(rightDate.getTime() - i*24*60*60*1000).format("YYYY-MM-dd");
      //   let rightDate = new Date().format("2020-10-09");
      //   this.ccount.start = Date(
      //     rightDate.getTime() - i * 24 * 60 * 60 * 1000
      //   ).format("YYYY-MM-dd");
      //   this.ccount.end = Date(
      //     rightDate.getTime() - i * 24 * 60 * 60 * 1000
      //   ).format("YYYY-MM-dd");

      //   ccount(this.ccount).then((res) => {
      //     console.log(res);
      //   });

      //   countDanger(this.count).then((res) => {
      //     if (res.status === 200) {
      //       values = res.data;
      //       // values = 2;
      //       list[2].data[6 - i] = values;
      //       if (i == 6) {
      //         setTimeout(() => {
      //           this.options.datasets = [list[0], list[1], list[2]];
      //           console.log(this.options.datasets);
      //         }, 2000);
      //       }
      //     }
      //   });
      // }
      // this.options.datasets = [list[0], list[1], list[2]];

      let rightDate = new Date().format("2020-10-09");
      let list = toRaw(this.options.datasets);
      // var list[]
      this.ccount.start = new Date().format("2020-10-03");
      this.ccount.end = new Date().format("2020-10-09");
      // this.ccount.start = new Date(rightDate.getTime() - 0*24*60*60*1000).format("YYYY-MM-dd");
      // this.ccount.end = new Date(rightDate.getTime() - 7*24*60*60*1000).format("YYYY-MM-dd");
      ccount(this.ccount).then((res) => {
        if (res.status == 200) {
          // let listt = toRaw(res.data.data);
          // console.log(listt[0].status_1);
          let listt = toRaw(res.data.data);
          for (var i = 0; i < 7; i++) {
            console.log(listt[0].status_1);
            list[0].data[i] = listt[i].status_1;
            list[1].data[i] = listt[i].status_2;
            list[2].data[i] = listt[i].status_3;
            list[3].data[i] = listt[i].status_4;
          }

          this.options.datasets = [list[0], list[1], list[2], list[3]];
          this.options2 = this.options3;
          // console.log(this.options.datasets)
        }
      });

      // this.array = this.options.datasets
      // console.log(this.array);
      // this.drawLine();
    },
    // timer() {
    //   return setTimeout(() => {
    //     this.getCountData();
    //   }, 5000);
    // },

    // // 定时器
    // timer() {
    //   return setTimeout(() => {
    //     this.getDataone();
    //   }, 1000);
    // },
    // // 页面销毁后 停止计时器
    // destroyed() {
    //   clearTimeout(this.timer);
    // },

    // changeDate() {
    //   const now = new Date().getTime();
    //   this.data.forEach((item, index) => {
    //     const date = new Date(now - (6 - index) * 86400000);
    //     item.name = `${date.getFullYear()}/${
    //       date.getMonth() + 1
    //     }/${date.getDate()}`;
    //   });
    // },
  },
  // setup() {
  //   onMounted(() => {
  //     this.methods.getCountData();
  //   });
  // },
  // watch: {
  //   // options.datasets(){
  //   //   this.timer()
  //   // }
  //   list() {
  //     this.options.datasets = this.array;
  //     console.log(this.options.datasets);
  //   },
  // },
  // unmounted() {
  //   clearTimeout(this.timer);
  // },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(6, 87, 24);
}

.grid-con-1 .grid-num {
  color: rgb(6, 87, 24);
}

.grid-con-2 .grid-con-icon {
  background: rgb(234, 162, 28);
}

.grid-con-2 .grid-num {
  color: rgb(234, 162, 28);
}

.grid-con-3 .grid-con-icon {
  background: rgb(224, 69, 26);
}

.grid-con-3 .grid-num {
  color: rgb(224, 69, 26);
}

.grid-con-4 .grid-con-icon {
  background: rgb(119, 16, 16);
}

.grid-con-4 .grid-num {
  color: rgb(119, 16, 16);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: rgb(153, 153, 153);
}

.schart {
  width: 100%;
  height: 300px;
}
.tag {
  float: right;
  /* margin-left: 100px; */
}
.pagenatiom {
  height: 10px;
  float: right;
}
.information {
  float: left;
}
.tableTitle {
  /* position: relative; */
  margin: 24px auto 0px auto;
  width: auto;
  height: 1px;
  background-color: #d4d4d4;
  /* text-align: center; */
  /* font-size: 16px; */
  /* color: rgba(101, 101, 101, 1); */
}
.head {
  max-width: 25% !important;
}
.tablehead {
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  font-family: Sans-serif;
}
</style>
