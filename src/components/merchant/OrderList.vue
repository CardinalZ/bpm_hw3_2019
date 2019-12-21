<template>
  <div>
    <Card v-for="order in orderList"
          :key="order.id"
          class="card">
      <p slot="title" style="text-align:left">
        <Icon type="ios-film-outline"></Icon>
        订单{{order.id}}
      </p>
      <a href="#" slot="extra" @click.prevent="handleClick(order.id)">
        <div v-if="order.state==='pass'">已处理</div>
        <div v-if="order.state==='review'">待处理</div>
      </a>


      <div style="text-align:left">
        <!--        <p>预定时间： {{order.timestamp | beijing}}</p>-->
        <p>商品名称： {{order.product_name}}</p>
        <p>价格： {{order.price}}</p>
        <p>商家： {{order.merchant_name}}</p>
        <p>商品类型： {{order.product_category}}</p>
      </div>
    </Card>
  </div>
</template>

<script>
  import APIUtil from '../../services/APIUtil'

  export default {
    name: 'OrderList',
    data () {
      return {
        orderList: []
      }
    },
    methods: {
      handleClick (id) {
        console.log(id)
        this.$router.push({
          name: 'OrderDetail',
          params: {
            id: id
          }
        })
      }
    },
    mounted () {
      var stateItems = []
      APIUtil.get('/Order').then(res => {
          res.data.Order.forEach(item => {
            if (item.state === 'pass'||item.state === 'review'||item.state === 'topay') {
              stateItems.push(item)
            }
          })
          this.orderList = stateItems
      })
    }
  }
</script>

<style scoped>

</style>
