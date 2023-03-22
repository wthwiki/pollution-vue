<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 表单
        </el-breadcrumb-item>
        <el-breadcrumb-item>基本表单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">
          <el-form-item label="企业编号" prop="deptId">
            <el-input v-model="form.deptId"></el-input>
          </el-form-item>

          <el-form-item label="排污口编号" prop="drainId">
            <el-input v-model="form.drainId"></el-input>
          </el-form-item>

          <el-form-item label="污染物编号" prop="pollId">
            <el-input v-model="form.pollId"></el-input>
          </el-form-item>

          <el-form-item label="污染物浓度" prop="density">
            <el-input v-model="form.density"></el-input>
          </el-form-item>

          <el-form-item label="污染物排放量" prop="discharge">
            <el-input v-model="form.discharge"></el-input>
          </el-form-item>

          <el-form-item label="总体积" prop="volumn">
            <el-input v-model="form.volumn"></el-input>
          </el-form-item>

          <el-form-item label="日期时间" prop="date">
            <el-col :span="11">
              <el-date-picker
                style="width: 100%"
                v-model="form.date"
                type="date"
                placeholder="选择日期"
                format="YYYY-MM-DD"
              ></el-date-picker>
            </el-col>
          </el-form-item>

          <!-- <el-form-item label="提交者" prop="submitBy">
            <el-input v-model="form.submitBy"></el-input>
          </el-form-item> -->

          <!-- <el-form-item label="选择器">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option key="bbk" label="步步高" value="bbk"></el-option>
              <el-option key="xtc" label="小天才" value="xtc"></el-option>
              <el-option key="imoo" label="imoo" value="imoo"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="城市级联">
            <el-cascader
              :options="options"
              v-model="form.options"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="选择开关">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="多选框">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="步步高" name="type"></el-checkbox>
              <el-checkbox label="小天才" name="type"></el-checkbox>
              <el-checkbox label="imoo" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="单选框">
            <el-radio-group v-model="form.resource">
              <el-radio label="步步高"></el-radio>
              <el-radio label="小天才"></el-radio>
              <el-radio label="imoo"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="文本框">
            <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">表单提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script >
import { reactive, ref } from "vue";
import { insertDeptTarget } from "../api/baseform";
// import type { FormInstance } from 'element-plus';
insertDeptTarget
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
  name: "baseform",

  data() {
    return {
      form: {
        deptId: "",
        drainId: "",
        pollId: "",
        density: "",
        discharge: "",
        volumn: "",
        date: [],
        // submitBy: "",
        // options: [],
      },
      rules: {
        deptId: [
          {
            required: true,
            message: "请输入企业编号",
            trigger: "blur",
          },
        //   {
        //     min: 0,
        //     max: 5,
        //     message: "Length should be 3 to 5",
        //     trigger: "blur",
        //   },
        ],
        drainId: [
          {
            required: true,
            message: "请输入排污口编号",
            trigger: "blur",
          },
        ],
        pollId: [
          {
            required: true,
            message: "请输入污染物编号",
            trigger: "blur",
          },
        ],
        density: [
          {
            required: true,
            message: "请输入污染物浓度",
            trigger: "blur",
          },
        ],
        discharge: [
          {
            required: true,
            message: "请输入污染物排放量",
            trigger: "blur",
          },
        ],
        volumn: [
          {
            required: true,
            message: "请输入总体积",
            trigger: "blur",
          },
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择提交时间",
            trigger: "blur",
          },
        ],
        // submitBy: [
        //   {
        //     required: true,
        //     message: "请输入提交者",
        //     trigger: "blur",
        //   },
        // ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$confirm("确定要提交吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          this.form.date = new Date(this.form.date).format(
            "YYYY-MM-dd"
          );
          if (
            this.form.date === "NaN-aN-aN" ||
            this.form.date === "1970-01-01"
          ) {
            this.form.date = [];
          }
          //   this.getData();
          this.$refs.form.validate((valid) => {
            if (valid) {
                insertDeptTarget(this.form).then((res) => {
                    console.log(res);
                })
              this.$message.success("提交成功！");
            } else {
              this.$message.error("请补全表单");
              return false;
            }
          });
        })
        .catch(() => {});
    },

    //     resetForm(formEl: FormInstance | undefined)  {
    //         if (!formEl) return
    //   formEl.resetFields()
    // },
    resetForm() {
      this.$confirm("确定要重置吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          this.form.deptId =
            this.form.drainId =
            this.form.pollId =
            this.form.density =
            this.form.discharge =
            // this.form.submitBy =
              "";
          this.form.date = [];
          this.$message.success("重置成功！");
        })
        .catch(() => {});
    },
  },
  //   options: [
  //     {
  //       value: "guangdong",
  //       label: "广东省",
  //       children: [
  //         {
  //           value: "guangzhou",
  //           label: "广州市",
  //           children: [
  //             {
  //               value: "tianhe",
  //               label: "天河区",
  //             },
  //             {
  //               value: "haizhu",
  //               label: "海珠区",
  //             },
  //           ],
  //         },
  //         {
  //           value: "dongguan",
  //           label: "东莞市",
  //           children: [
  //             {
  //               value: "changan",
  //               label: "长安镇",
  //             },
  //             {
  //               value: "humen",
  //               label: "虎门镇",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       value: "hunan",
  //       label: "湖南省",
  //       children: [
  //         {
  //           value: "changsha",
  //           label: "长沙市",
  //           children: [
  //             {
  //               value: "yuelu",
  //               label: "岳麓区",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
};
</script>