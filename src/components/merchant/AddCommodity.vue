<template>
  <div>
    <h3 style="text-align: left">创建商品信息</h3>
    <div>
      <Divider>
        <h5>基本信息</h5>
      </Divider>
      <div class="add-item">
        <div class="label">商品名称：</div>
        <Input class="input" placeholder="Enter something..."/>
        <div class="label">商品价格：</div>
        <Input style="width: 30%;" class="input" placeholder="Enter something..."/>
      </div>
      <div class="add-item">
        <div class="label">商品标签：</div>
        <div style="display: flex;flex-wrap: wrap;padding: 5px;">
          <Tag type="border" closable color="blue">标签一</Tag>
          <Tag type="border" closable color="blue">标签一</Tag>
          <Tag type="border" closable color="blue">标签一</Tag>
          <Tag type="border" closable color="blue">标签一</Tag>
          <Tag type="border" closable color="blue">标签一</Tag>
          <!--          添加Tag部分-->
          <div>
            <i-select :model.sync="selectTag" clearable style="width:100px">
              <i-option v-for="item in tagList" :value="item">{{ item }}</i-option>
            </i-select>
            <Button icon="ios-plus-empty" type="dashed" size="small" @click="count += 1">
              添加标签
            </Button>
          </div>
        </div>

      </div>
      <!--      景点风光-->
      <div class="add-item" style="display: block;">
        <div class="label">景点风光：</div>
        <div class="img-box">
          <img :src="img1"/>
          <img :src="img2"/>
          <img :src="img2"/>
          <img :src="img1"/>
        </div>
        <div style="display: flex;align-items: center;padding: 8px 0;justify-content: center;">
          <div class="label">图片url：</div>
          <Input style="width: 300px;" placeholder="Enter something..."></Input>
          <Button style="margin-left: 16px">添加图片</Button>
        </div>
      </div>
      <!--      行程路线-->
      <Divider>
        <h5>行程路线</h5>
      </Divider>

      <div class="day-item">
        <img :src="img1"/>
        <div class="text-part">
          <div class="activity">Day 1 远眺四姑凉山</div>
          <div class="description">这里是内容描述</div>
        </div>
        <div id="map1" style="width: 100px;height: 100px;"></div>
      </div>

      <!--      添加新日程-->
      <div style="border-radius: 10px;padding: 8px;background: #efefef">
        <div style="text-align: left;font-weight: bold;">添加新日程</div>
        <div class="add-item" style="justify-content: center;">
          <div class="label">活动名称：</div>
          <Input style="width: 300px;" placeholder="Enter something..."></Input>
        </div>
        <div class="add-item" style="justify-content: center;">
          <div class="label">活动描述：</div>
          <Input type="textarea" style="width: 300px;" placeholder="Enter something..."></Input>
        </div>
        <div class="add-item" style="justify-content: center;">
          <div class="label">活动图片：</div>
          <Input style="width: 300px;" placeholder="请输入图片地址"></Input>
        </div>
        <div id="add-map" style="height: 150px;"></div>
        <Button style="margin-top:8px;width: 100px;" type="primary">添加</Button>
      </div>

      <!--      套餐类型-->
      <Divider>
        <h5>套餐类型</h5>
      </Divider>
      <div class="add-item">
        <div class="label">套餐类型：</div>
        <div style="display: flex;flex-wrap: wrap;padding: 5px;">
          <Tag type="border" closable color="blue">仅游玩菇凉山</Tag>
          <Tag type="border" closable color="blue">菇凉山+阿里山</Tag>
          <Tag type="border" closable color="blue">套餐一</Tag>
          <!--          添加Tag部分-->
          <div>
            <Input style="width: 100px;" placeholder="请输入套餐名称"></Input>
            <Button icon="ios-plus-empty" type="dashed" size="small" @click="count += 1">
              添加套餐
            </Button>
          </div>
        </div>
      </div>

      <div style="padding: 16px;">
        <Button style="width: 300px;" type="primary" long>上传</Button>
      </div>


      <!--      原来部分 未修改-->
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
      <Input v-model="flight" show-word-limit placeholder="Enter something..."
             style="width: 200px;text-align: center"/>
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
  import AMap from 'AMap' // 引入高德地图
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
        merchant_name: '',

        selectTag: '',
        tagList: ['爬山', '徒步', '风光'],

        img1: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577237025&di=5b8a84bbfae15af2a24f3e6c64c71f88&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1304%2F06%2Fc4%2F19579216_19579216_1365288471360_mthumb.jpg',//删除
        img2: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576642390353&di=0ce238c5f8b0c4a169817ec87b9e16ef&imgtype=0&src=http%3A%2F%2Fpic.qjimage.com%2Fph115%2Fhigh%2Fph5417-p06013.jpg',//删除
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
          'merchant_name': '携程伴你行'
        }).then((res) => {
          if (res.status === 200) {
            alert('上传成功')
          }
        })
      },//upload
      initMap () {
        let map = new AMap.Map('map1', {
          zoom: 11,//级别
          center: [116.397428, 39.90923],//中心点坐标
          viewMode: '3D'//使用3D视图
        })
        let marker = new AMap.Marker({
          position: new AMap.LngLat(116.397428, 39.90923),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: '北京',
          map: map,
        })
        new AMap.Map('add-map', {
          zoom: 11,//级别
          center: [116.397428, 39.90923],//中心点坐标
          viewMode: '3D'//使用3D视图
        })
      }
    },
    mounted () {
      this.initMap()

      // APIUtil.get('/Commodity').then((res) => {
      //   console.log(res)
      //   console.log(res.data.Commodity[0])
      //   this.commodityname = res.data.Commodity[0].commodityname
      // })
    },
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
