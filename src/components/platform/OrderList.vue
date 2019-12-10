<template>
  <div>
    <Card v-for="order in orderList"
          :key="order.id"
          class="card">
      <p slot="title" style="text-align:left">
        <Icon type="ios-film-outline"></Icon>
        {{order.id}}
      </p>
      <a href="#" slot="extra" @click.prevent="handleClick(order.id)">
        处理
      </a>

      <div style="text-align:left">
<!--        <p>预定时间： {{order.timestamp | beijing}}</p>-->
        <p>商品名称： {{order.commodityName}}</p>
        <p>用户： {{order.userName}}</p>
        <p>商家： {{order.merchantName}}</p>
        <p>备注： {{order.detail}}</p>
      </div>
    </Card>
  </div>
</template>

<script>
  import OrderData from '../../mock/order_mock_data'

export default {
  name: 'OrderList',
  data () {
    return {
      orderList: []
    }
  },
  methods: {
    handleClick(id) {
      this.$router.push({
        name: 'OrderDetail',
        params: {
          id: id
        }
      })
    }
  },
  mounted () {
    this.orderList = OrderData
  }
}
</script>

<style scoped>

</style>
