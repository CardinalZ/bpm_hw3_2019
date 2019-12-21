<template>
  <div>
    <h3 style="text-align: left">订单信息</h3>
    <div>
      <Divider>
        <h5>基本信息</h5>
      </Divider>
      <div>
        <div><strong>商品名称</strong>： {{order.product_name}}</div>
        <div><strong>用户</strong>： {{order.user_id}}</div>
        <div><strong>商家</strong>： {{order.merchant_name}}</div>
        <div><strong>商品价格</strong>： {{order.price}}</div>
      </div>
      <Divider>
        <h5>商品信息</h5>
      </Divider>
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
      <div v-if="order.state==='review'">
        <Button type="primary" style="width: 100px" @click="reviewPass">审核通过</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import APIUtil from '../../services/APIUtil'
  export default {
    name: 'OrderDetail',
    data() {
      return{
        order: Object,
        id: this.$route.params.id,
        tour: Object,
        tag_list:[],
        img_list: [],
        details: [],
        selectionList: []
      }
    },
    mounted () {
      APIUtil.get('/Order/'+ this.id).then(res=>{
          this.order = res.data
        }),
      APIUtil.get('/Tour').then(res=>{
        res.data.Tour.forEach(item => {
          if (item.name === this.order.product_name) {
            this.tour = item
            this.tag_list = JSON.parse(item.tags)
            this.img_list = JSON.parse(item.img_list)
            this.details = JSON.parse(item.details)
            this.selectionList = JSON.parse(item.selections)
          }
        })
      })
    },
    methods: {
      reviewPass(){
        this.order.state = 'topay'
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

<style lang="scss" scoped>
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
