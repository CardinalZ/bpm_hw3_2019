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
import CommodityData from '../../../mock/commodity_mock_data'
import APIUtil from '../../../services/APIUtil'

export default {
  name: 'CommodityList',
  data () {
    return {
      columns: [
        {
          title: '商品名称',
          key: 'commodityname'
        },
        {
          title: '游玩天数',
          key: 'commoditydays'
        },
        {
          title: '出发地',
          key: 'commodityplace'
        },
        {
          title: '推荐理由',
          key: 'recommendresult'
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            let that = this
            return h('div', [
              h('Button', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    that.goToDetailPage(params.index)
                  }
                }
              }, '查看')])
          }
        }

      ],
      data: [], //  data show in Table
      commodityName: null,
      recommendResult: null
    }
  },
  mounted () {
    APIUtil.get('/Commodity').then(res=>{
        this.data = res.data.Commodity
        console.log(res.data.Commodity)
      }
    )
  },
  methods: {
    goToDetailPage (index) {
      this.$router.push({
        name: 'CommodityDetail',
        params: {
          id: this.data[index].id
        }
      })
    },
    addCommodity() {
      this.$router.push({
        name: 'AddCommodity',
      })
    },
    query () {
      let commodityName = ''
      let recommendResult = ''
      // if (this.commodityName != null) {
      //   commodityName = this.commodityName.trim()
      // }
      // if (this.recommendResult != null) {
      //   recommendResult = this.recommendResult.trim()
      // }
      // APIUtil.get('/searchName', {
      //   commodityName: commodityName,
      //   recommendResult: recommendResult
      // }).then(response => {
      //   this.resultList = response.data
      //
      //   this.data = [] // clean the current data
      //   this.resultList.forEach(item => {
      //     this.data.push({
      //       commodityName: item.commodityName,
      //       recommendResult: item.recommendResult
      //     })
      //   })
      // })
    },
  }
}
</script>

<style scoped>

</style>
