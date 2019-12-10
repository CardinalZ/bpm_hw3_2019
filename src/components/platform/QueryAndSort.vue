<template>
  <div>
    <Row>
      <Col span="24">
        <Input v-model="commodityName" placeholder="商品名称" style="width: 300px"></Input>
        <Button type="primary" style="width: 100px" @click="query">查找</Button>
        <Button type="primary" style="width: 100px" @click="addCommodity">添加商品信息</Button>
      </Col>
    </Row>
    <br>
    <Table :columns="columns" :data="data"></Table>
  </div>

</template>

<script>
  export default {
    name: 'QueryAndSort'
  }
</script>

<style scoped>

</style>
