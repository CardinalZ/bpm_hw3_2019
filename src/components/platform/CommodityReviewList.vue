<template>
  <div>
    <Card v-for="commodity in commodityList"
          :key="commodity.id"
          class="card">
      <p slot="title" style="text-align:left">
        <Icon type="ios-film-outline"></Icon>
        {{commodity.name}}
      </p>
      <a href="#" slot="extra" @click.prevent="handleClick(commodity.id)">
        审核
      </a>
      <div style="text-align:left">
        <!--        <p>预定时间： {{order.timestamp | beijing}}</p>-->
        <p>商品名称： {{commodity.name}}</p>
        <p>商家： {{commodity.merchant_name}}</p>
        <p>类别： 定制游</p>
      </div>
    </Card>
    <Card v-for="commodity1 in commodityList1"
          :key="commodity1.id"
          class="card">
      <p slot="title" style="text-align:left">
        <Icon type="ios-film-outline"></Icon>
        {{commodity1.name}}
      </p>
      <a href="#" slot="extra" @click.prevent="handleClick(commodity1.id)">
        审核已通过
      </a>
      <div style="text-align:left">
        <!--        <p>预定时间： {{order.timestamp | beijing}}</p>-->
        <p>商品名称： {{commodity1.name}}</p>
        <p>商家： {{commodity1.merchant_name}}</p>
        <p>类别： 定制游</p>
      </div>
    </Card>
  </div>
</template>

<script>
  import APIUtil from '../../services/APIUtil'

  export default {
    name: 'CommodityReviewList',
    data () {
      return {
        commodityList: [],
        commodityList1: []
      }
    },
    methods: {
      handleClick (id) {
        this.$router.push({
          name: 'CommodityDetail',
          params: {
            id: id
          }
        })
      }
    },
    mounted () {
      var reviewItems = []
      var reviewedItems = []
      APIUtil.get('/Tour').then(res => {
          res.data.Tour.forEach(item => {
            if (item.review_status === 'review') {
              reviewItems.push(item)
            }
          })
        }
      )
      this.commodityList = reviewItems
      APIUtil.get('/Tour').then(res => {
          res.data.Tour.forEach(item => {
            if (item.review_status === 'pass') {
              reviewedItems.push(item)
            }
          })
        }
      )
      this.commodityList1 = reviewedItems
    }
  }
</script>

<style scoped>

</style>
