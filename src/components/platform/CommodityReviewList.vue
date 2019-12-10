<template>
  <div>
    <Card v-for="commodity in commodityList"
          :key="commodity.id"
          class="card">
      <p slot="title" style="text-align:left">
        <Icon type="ios-film-outline"></Icon>
        {{commodity.commodityname}}
      </p>
      <a href="#" slot="extra" @click.prevent="handleClick(commodity.id)">
        审核
      </a>

      <div style="text-align:left">
        <!--        <p>预定时间： {{order.timestamp | beijing}}</p>-->
        <p>商品名称： {{commodity.commodityname}}</p>
        <p>商家： {{commodity.merchant_name}}</p>
        <p>类别： {{commodity.category}}</p>
      </div>
    </Card>
  </div>
</template>

<script>
  import APIUtil from '../../services/APIUtil'
  import CommodityData from '../../mock/commodity_mock_data'

  export default {
    name: 'CommodityRewiew',
    data () {
      return {
        commodityList: []
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
      APIUtil.get('/Commodity').then(res => {
          res.data.Commodity.forEach(item => {
            if (item.review_status === 'review') {
              reviewItems.push(item)
            }
          })
        }
      )
      this.commodityList = reviewItems
    }
  }
</script>

<style scoped>

</style>
