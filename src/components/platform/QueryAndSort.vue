<template>
  <div>
    <Row>
      <Col span="24">
        <Input v-model="name" placeholder="商家名称" style="width: 300px"></Input>
        <Input v-model="category" placeholder="商品类别" style="width: 300px"></Input>
        <Button type="primary" style="width: 100px" @click="query">查找</Button>
<!--        <Button type="primary" style="width: 100px" @click="addCommodity">添加商品信息</Button>-->
      </Col>
    </Row>
    <br>
    <div v-if="this.name!==''">
      <Card v-for="merchant in merchantList"
            :key="merchant.id"
            class="card">
        <p slot="title" style="text-align:left">
          <Icon type="ios-film-outline"></Icon>
          {{merchant.name}}
        </p>
        <a href="#" slot="extra" @click.prevent="handleClick(merchant.id)">
          查看详情
        </a>
        <div style="text-align:left">
          <!--        <p>预定时间： {{order.timestamp | beijing}}</p>-->
          <p>商家名： {{merchant.name}}</p>
          <p>联系人： {{merchant.contact_name}}</p>
          <p>联系电话： {{merchant.contact_phone}}</p>
        </div>
      </Card>
    </div>
    <div v-if="category!==''">
      <Card v-for="commodity in commodityList"
            :key="commodity.id"
            class="card">
        <p slot="title" style="text-align:left">
          <Icon type="ios-film-outline"></Icon>
          {{commodity.name}}
        </p>
        <a href="#" slot="extra" @click.prevent="handleClick(commodity.id)">
          查看详情
        </a>
        <div style="text-align:left">
          <!--        <p>预定时间： {{order.timestamp | beijing}}</p>-->
          <p>商品名： {{commodity.name}}</p>
          <p>商品类别： 定制游</p>
          <p>价格： {{commodity.price}}</p>
        </div>
      </Card>
    </div>
  </div>

</template>

<script>
  import APIUtil from '../../services/APIUtil'

  export default {
    name: 'QueryAndSort',
    data() {
      return{
        merchantList:[],
        commodityList: [],
        name: '',
        category: ''
      }
    },
    methods:{
      query(){
        if (this.name!==''){
          APIUtil.get("/Merchant",{
            'Merchant.name':this.name.trim()
          }).then(res=>{
            this.merchantList = res.data.Merchant
          })
        }else if(this.category!==''){
          APIUtil.get("/Tour").then(res=>{
            console.log(res)
            this.commodityList = res.data.Tour
          })
        }
      },
      handleClick(id){
        this.$router.push({
          name: 'CommodityDetail',
          params: {
            id: id
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
