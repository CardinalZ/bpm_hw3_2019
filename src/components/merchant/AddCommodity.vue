<template>
  <div>
    <h3 style="text-align: left">创建商品信息</h3>
    <div>
      <Divider>
        <h5>基本信息</h5>
      </Divider>
      <div class="add-item">
        <div class="label">商品名称：</div>
        <Input class="input" v-model="name" placeholder="Enter something..."/>
        <div class="label">商品价格：</div>
        <Input style="width: 30%;" v-model="price" class="input" placeholder="Enter something..."/>
      </div>
      <div class="add-item">
        <div class="label">商品标签：</div>
        <div style="display: flex;flex-wrap: wrap;padding: 5px;">
          <Tag  v-for=" tag1 in tag" v-bind:key="tag1" type="border" closable color="blue">{{tag1}}</Tag>
          <!--          添加Tag部分-->
          <div>
            <i-select v-model="selectTag" clearable style="width:100px">
              <i-option  v-for="item in tagList" :value="item " :key="item">{{ item }}</i-option>
            </i-select>
            <Button icon="ios-plus-empty" type="dashed" size="small" @click="addTag">
              添加标签
            </Button>
          </div>
        </div>

      </div>
      <!--      景点风光-->
      <div class="add-item" style="display: block;">
        <div class="label">景点风光：</div>
        <div class="img-box">
          <img v-for="img in img_list" :src="img"/>
        </div>
        <div style="display: flex;align-items: center;padding: 8px 0;justify-content: center;">
          <div class="label">图片url：</div>
          <Input v-model="img_address" style="width: 300px;" placeholder="Enter something..."></Input>
          <Button style="margin-left: 16px" @click="addImag">添加图片</Button>
        </div>
      </div>
      <!--      行程路线-->
      <Divider>
        <h5>行程路线</h5>
      </Divider>

      <div v-for="detail in details" v-if="detail.img!=''">
        <div class="day-item">
          <img :src="detail.img"/>
          <div class="text-part">
            <div class="activity">{{detail.activity}}</div>
            <div class="description">{{detail.description}}</div>
          </div>
          <div id="map1" style="width: 100px;height: 100px;"></div>
        </div>
      </div>
      <!--      添加新日程-->
      <div style="border-radius: 10px;padding: 8px;background: #efefef">
        <div style="text-align: left;font-weight: bold;">添加新日程</div>
        <div class="add-item" style="justify-content: center;">
          <div class="label">活动名称：</div>
          <Input v-model="activity1" style="width: 300px;" placeholder="Enter something..."></Input>
        </div>
        <div class="add-item" style="justify-content: center;">
          <div class="label">活动描述：</div>
          <Input v-model="description1" type="textarea" style="width: 300px;" placeholder="Enter something..."></Input>
        </div>
        <div class="add-item" style="justify-content: center;">
          <div class="label">活动图片：</div>
          <Input v-model="img1" style="width: 300px;" placeholder="请输入图片地址"></Input>
        </div>
        <div id="add-map" style="height: 150px;"></div>
        <Button style="margin-top:8px;width: 100px;" type="primary" @click="addActivity">添加</Button>
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
        <Button style="width: 300px;" type="primary" @click="upload">上传</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import APIUtil from '../../services/APIUtil'
  import AMap from 'AMap' // 引入高德地图
  export default {
    name: 'AddCommodity',
    data () {
      return {
        name: '',
        price: '',
        img_address: '',
        img_list: [],
        tag: [],
        selectTag: '',
        details: [{
          activity : '',
          description : '',
          img : ''
        }],
        activity1:'',
        description1 : '',
        img1 : '',
        item: '',
        selectTag: '',
        tagList: ['爬山', '徒步', '风光'],
      }
    },
    methods: {
      addActivity () {
        this.details.push({
          'activity': this.activity1,
          'description': this.description1,
          'img': this.img1
        })
      },
      addImag(){
        this.img_list.push(this.img_address)
      },
      addTag(){
        this.tag.push(this.selectTag)
        console.log(this.tag)
      },
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
      },
      upload () {
        APIUtil.post('/Tour', {
          'name': this.name,
          'price': this.price,
          'details': JSON.stringify(this.details),//字符串序列化
          'img_list': JSON.stringify(this.img_list),
          'tag': JSON.stringify(this.tag),
          'review_status': 'review',
          'merchant_name': '携程伴你行'
        }).then((res) => {
          console.log(res)
          if (res.status === 200) {
            alert('上传成功')
          }
        })
      }//upload
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
