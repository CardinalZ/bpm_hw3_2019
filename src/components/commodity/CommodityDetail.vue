<template>
  <div>
    <h1>商品信息详情</h1>
    <Col span="12"><strong>商品名：</strong>{{commodity.commodityname}}</Col>
    <Col span="12"><strong>所属商家：</strong>{{commodity.merchant_name}}</Col>
    <Col span="12"><strong>出发地：</strong>{{commodity.commodityplace}}</Col>
    <Col span="12"><strong>游玩天数：</strong>{{commodity.commoditydays}}</Col>
    <Col span="12"><strong>推荐理由：</strong>{{commodity.recommendresult}}</Col>
    <Col span="12"><strong>航班信息：</strong>{{commodity.flight}}</Col>
    <Col span="12"><strong>酒店信息：</strong>{{commodity.hotel}}</Col>
    <Col span="12"><strong>行程安排：</strong>{{commodity.commodityplan}}</Col>
    <Button type="primary" style="width: 100px" @click="reviewPass">审核通过</Button>
  </div>



</template>

<script>
import APIUtil from '../../services/APIUtil'

export default {
  name: 'CommodityDetail',
  data() {
    return{
      commodity: Object,
      id: this.$route.params.id
    }
  },
  mounted () {
    APIUtil.get('/Commodity/'+ this.id).then(res=>{
        this.commodity = res.data
        console.log(res.data)
      }
    )
  },
  methods: {
    reviewPass(){
      APIUtil.put('/Commodity/'+this.id,{
        'review_status': 'pass'
      }).then(res=>{
        if(res.status === '200')
          alert("审核通过")
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
