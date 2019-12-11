<template>
  <Layout>
    <Header><h1 style="color: white">订单详情</h1></Header>
    <Layout>
      <Sider hide-trigger>
        <img  style="width: 400px" src='../../assets/yunnan.jpg'>
      </Sider>
      <Content>
        <p>商品名称： {{order.commodityname}}</p>
        <p>用户： {{order.username}}</p>
        <p>商家： {{order.merchantname}}</p>
<!--        <p>价格： {{order.price}}</p>-->
        <p>备注： {{order.detail}}</p>
      </Content>
    </Layout>
    <Footer>
      <div v-if="order.state==='review'">
        <Button type="primary" style="width: 100px" @click="reviewPass">审核通过</Button>
      </div>
    </Footer>
  </Layout>
</template>

<script>
  import APIUtil from '../../services/APIUtil'
  export default {
    name: 'OrderDetail',
    data() {
      return{
        order: Object,
        id: this.$route.params.id
      }
    },
    mounted () {
      APIUtil.get('/Order/'+ this.id).then(res=>{
          this.order = res.data

        }
      )
    },
    methods: {
      reviewPass(){
        this.order.state = 'pass'
        APIUtil.put('/Order/'+this.id,this.order).then(res=>{
            console.log(this.order)
            if(res.status === 200)
              alert("审核通过")
            // window.location.reload()
          }
        )
      }
    }
  }
</script>

<style scoped>

</style>
