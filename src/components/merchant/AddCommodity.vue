<template>
  <div>
    <h1 style="text-align: left">创建商品信息</h1>
    <div>
      <Divider>
        <h2>基本信息</h2>
      </Divider>
      <Col span="12">
        商品名
        <Input v-model="commodityname" placeholder="Enter something..." style="width: 200px;text-align: left"/>
      </Col>
      <Col span="12">
        商品总价
        <Input v-model="commodityprice" placeholder="Enter something..." style="width: 200px;text-align: center"/>
      </Col>
      <br>
      <Col span="12">
        出发地
        <Input v-model="commodityplace" placeholder="Enter something..." style="width: 200px;text-align: center"/>
      </Col>
      <Col span="12">
        游玩天数
        <Input v-model="commoditydays" placeholder="Enter something..." style="width: 200px;text-align: center"/>
      </Col>
      <br>
      <Col span="12">
        推荐指数
        <Rate v-model="value" style="text-align: justify"/>
      </Col>
      <Col span="12">
        推荐理由
        <Input v-model="recommendresult" show-word-limit type="textarea" placeholder="Enter something..."
               style="width: 200px;text-align: center"/>
      </Col>
    </div>
    <Divider>
      <h2>行程路线</h2>
    </Divider>
    <div>
      <Input v-model="commodityplan" show-word-limit type="textarea" rows="6" placeholder="Enter something..."
             style="width: 600px;text-align: center"/>
    </div>
    <Divider>
      <h2>内容详情</h2>
    </Divider>
    <Col span="12">
      航班信息
      <Input v-model="flight" show-word-limit placeholder="Enter something..." style="width: 200px;text-align: center"/>
    </Col>
    <Col span="12">
      酒店信息
      <Input v-model="hotel" placeholder="Enter something..." style="width: 200px;text-align: center"/>
    </Col>
    <Button type="primary" style="width: 100px" @click="upload">上传</Button>
  </div>
</template>

<script>
  import APIUtil from '../../services/APIUtil'

  export default {
    name: 'AddCommodity',
    data () {
      return {
        commodityname: '',
        commodityplace: '',
        commodityprice: '',
        recommendresult: '',
        commoditydays: '',
        commodityplan: '',
        flight: '',
        hotel: '',
        value: 0,
        review_status: '',
        merchant_name:''
      }
    },
    methods: {
      upload () {
        APIUtil.post('/Commodity', {
          'commodityname': this.commodityname,
          'commodityprice': this.commodityprice,
          'commodityplace': this.commodityplace,
          'commoditydays': this.commoditydays,
          'recommendresult': this.recommendresult,
          'commodityplan': this.commodityplan,
          'flight': this.flight,
          'hotel': this.hotel,
          'value': this.value,
          'review_status': 'review',
          'merchant_name':'携程伴你行'
        }).then((res) => {
          if (res.status === 200) {
            alert('上传成功')
          }
        })
      }
    },
    // mounted () {
    //   APIUtil.get('/Commodity').then((res) => {
    //     console.log(res)
    //     console.log(res.data.Commodity[0])
    //     this.commodityname = res.data.Commodity[0].commodityname
    //   })
    // }
  }
</script>

<style scoped>

</style>
