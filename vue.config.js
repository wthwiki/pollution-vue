const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  //可以有多个代理
  devServer: {
    // host:'0,0.0.0',
    port: 80,
    proxy: 'http://172.20.10.8:80'
  }
})
