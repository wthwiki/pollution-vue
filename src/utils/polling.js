
// import { Ref } from 'vue'
// export function polling(
//   //发请求的接口函数
//   fun = new function(){},
//   //需要动态更新的数据变量
//   params: Ref<number>,
//   //调用echarts配置项
//   chartOption: Function,
// ) {
//   fun().then((res: { data: Ref<number> }) => {
//     let timer = setTimeout(() => {
//       clearTimeout(timer)
//       //拿到请求回来的数据传给echarts图表的配置项函数
//       params = res.data
//       chartOption(params)
//       polling(fun, params, chartOption)
//     }, 3000)
//   })
// }