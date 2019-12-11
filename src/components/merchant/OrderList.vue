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
        <div v-if="order.state==='review'">处理</div>
        已处理
      </a>


      <div style="text-align:left">
        <!--        <p>预定时间： {{order.timestamp | beijing}}</p>-->
        <p>商品名称： {{order.commodityname}}</p>
        <p>用户： {{order.username}}</p>
        <p>商家： {{order.merchantname}}</p>
        <p>备注： {{order.detail}}</p>
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

      APIUtil.get('/Order').then(res => {
        console.log(res)
        this.orderList = res.data.Order

      })
    }
  }
</script>

<style scoped>

</style>
