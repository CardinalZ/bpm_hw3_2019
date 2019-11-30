<template>
<div>
  <input class="file" name="file" type="file" accept="excel/xls,excel/xlsx" @change="update"/>

</div>
</template>

<script>
export default {
  name: 'Upload',

  methods: {
    update (e) {
      let file = e.target.files[0]
      let param = new FormData() // 创建form对象
      param.append('file', file)// 通过append向form对象添加数据
      console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      } // 添加请求头
      this.$http.post('http://dev4.hbjk.com.cn:8011/file/upload', param, config)
        .then(response => {
          console.log(response.data)
          if (response.data === '上传成功') {
            alert('上传成功')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
