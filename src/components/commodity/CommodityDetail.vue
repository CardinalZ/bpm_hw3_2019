<template>
  <div>
    <h3 style="text-align: left">商品信息</h3>
    <div>
      <Divider>
        <h5>基本信息</h5>
      </Divider>
      <div class="add-item">
        <div class="label">商品名称：{{tour.name}}</div>
        <div class="label">商品价格：{{tour.price}}</div>
      </div>
      <div class="add-item">
        <div class="label">商品标签：</div>
        <div style="display: flex;flex-wrap: wrap;padding: 5px;">
          <Tag v-for=" tag in tag_list" v-bind:key="tag" type="border" closable color="blue">{{tag}}</Tag>
        </div>
      </div>
      <!--      景点风光-->
      <div class="add-item" style="display: block;">
        <div class="label">景点风光：</div>
        <div class="img-box">
          <img v-for="img in img_list" :src="img"/>
        </div>
      </div>
      行程路线
      <Divider>
        <h5>行程路线</h5>
      </Divider>
      <div v-for="(detail,index) in details" :key="index">
        <div class="day-item">
          <img style="flex-shrink: 0" :src="detail.img"/>
          <div class="text-part">
            <div class="activity">{{detail.activity}}</div>
            <div class="description">{{detail.description}}</div>
          </div>
          <div :id="`map${index}`" style="width: 100px;height: 100px;flex-shrink: 0;"></div>
        </div>
      </div>
      <!--      套餐类型-->
      <Divider>
        <h5>套餐类型</h5>
      </Divider>
      <div class="add-item">
        <div class="label">套餐类型：</div>
        <div style="display: flex;flex-wrap: wrap;padding: 5px;">
          <Tag
            v-for="(item,index) in selectionList" :key="index"
            type="border" closable color="blue">{{item}}
          </Tag>
        </div>
      </div>
      <div v-if="this.role === 'platformManager' && tour.review_status !== 'pass'">
        <Button type="primary" style="width: 100px" @click="reviewPass">审核通过</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import APIUtil from '../../services/APIUtil'
  import AMap from 'AMap' // 引入高德地图
  import {mapGetters} from 'vuex'

  export default {
    name: 'CommodityDetail',
    data () {
      return {
        tour: Object,
        id: this.$route.params.id,
        tag_list: [],
        img_list: [],
        details: [],
        selectionList: []
      }
    },
    computed: {
      ...mapGetters([
        'role'
      ])
    },
    mounted () {
      APIUtil.get('/Tour/' + this.id).then(res => {
          this.tour = res.data
          console.log(res.data.tags)
          this.tag_list = JSON.parse(res.data.tags)
          this.img_list = JSON.parse(res.data.img_list)
          this.details = JSON.parse(res.data.details)
          this.selectionList = JSON.parse(res.data.selections)

        this.$nextTick(this.updateDayItemMap)
          console.log(res.data)
        }
      )
    },
    methods: {
      reviewPass () {
        this.tour.review_status = 'pass'
        APIUtil.put('/Tour/' + this.id, this.tour).then(res => {
            console.log(this.tour)
            if (res.status === 200) {
              alert('审核通过')
            }
            // window.location.reload()
          }
        )
      },
      updateDayItemMap () {
        for (let i = 0; i < this.details.length; i++) {
          let item = this.details[i]
          let map = new AMap.Map(`map${i}`, {
            zoom: 11,
            center: item.lnglat,
            viewMode: '3D'
          })
          new AMap.Marker({
            position: item.lnglat,
            title: item.activity,
            map: map,
          })
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .add-item {
    padding: 5px;
    display: flex;
    align-items: center;
  }

  .label {
    padding-left: 16px;
    text-align: left;
    flex-shrink: 0;
    width: 80px;
    font-weight: bold;
  }

  .img-box {
    display: flex;
    flex-wrap: wrap;

    img {
      box-shadow: 0 0 2px #0007;
      margin: 16px;
      height: 180px;
      width: 180px;
      border-radius: 5px;
      object-fit: cover;
    }
  }

  .day-item {
    margin: 10px auto;
    display: flex;
    border-radius: 5px;
    background: #efefef;
    text-align: center;
    width: 60vw;
    box-shadow: 0 0 1px #0007;


    .activity {
      font-weight: bold;
      padding-top: 5px;
      margin-bottom: -3px;
    }

    .description {
      padding: 5px 3px;
    }

    .text-part {
      flex-grow: 1;
    }

    img {
      border-radius: 5px;
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
  }

</style>
