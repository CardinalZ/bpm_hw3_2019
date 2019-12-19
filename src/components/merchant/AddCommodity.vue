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
          <Tag v-for=" tag1 in tagList" v-bind:key="tag1" type="border" closable color="blue">{{tag1}}</Tag>
          <!--          添加Tag部分-->
          <div>
            <i-select v-model="selectTag" clearable style="width:100px">
              <i-option v-for="item in tagOptions" :value="item " :key="item">{{ item }}</i-option>
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
      <!--      添加新日程-->
      <div style="border-radius: 10px;padding: 8px;background: #efefef">
        <div style="text-align: left;font-weight: bold;">添加新日程</div>
        <div class="add-item" style="justify-content: center;">
          <div class="label">活动名称：</div>
          <Input v-model="dayItem.activity" style="width: 300px;" placeholder="Enter something..."></Input>
        </div>
        <div class="add-item" style="justify-content: center;">
          <div class="label">活动描述：</div>
          <Input v-model="dayItem.description" type="textarea" style="width: 300px;"
                 placeholder="Enter something..."></Input>
        </div>
        <div class="add-item" style="justify-content: center;">
          <div class="label">活动图片：</div>
          <Input v-model="dayItem.img" style="width: 300px;" placeholder="请输入图片地址"></Input>
        </div>
        <div id="add-map" style="height: 150px;"></div>
        <Button style="margin-top:8px;width: 100px;" type="primary"
                @click="addActivity">
          添加日程
        </Button>
      </div>

      <!--      套餐类型-->
      <Divider>
        <h5>套餐类型</h5>
      </Divider>
      <div class="add-item">
        <div class="label">套餐类型：</div>
        <div style="display: flex;flex-wrap: wrap;padding: 5px;">
          <Tag
            v-for="item in selectionList"
            type="border" closable color="blue">{{item}}
          </Tag>
          <!--          添加Tag部分-->
          <div>
            <Input v-model="inputSelection"
                   style="width: 100px;"
                   placeholder="请输入套餐名称"/>
            <Button icon="ios-plus-empty"
                    type="dashed" size="small"
                    @click="addSelection">
              添加套餐
            </Button>
          </div>
        </div>
      </div>

      <div style="padding: 16px;">
        <Button style="width: 300px;" type="primary" @click="upload">上传</Button>
      </div>
      <div>
        <Input v-model="inputTourId"/>
        <Button type="primary" @click="clear">清空项</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import APIUtil from '../../services/APIUtil'
  import AMap from 'AMap' // 引入高德地图

  let img1 = 'https://n1-q.mafengwo.net/s11/M00/FB/CB/wKgBEFrQbruAITyhAADoL22YR4A40.jpeg'
  let img2 = 'https://p1-q.mafengwo.net/s7/M00/9C/19/wKgB6lUE9XyAO7g9AASnYV5jUB897.jpeg'
  let img3 = 'https://b1-q.mafengwo.net/s9/M00/B5/5C/wKgBs1ePnxOATWfyAA-Z_X0kY4U06.jpeg'

  export default {
    name: 'AddCommodity',
    data () {
      return {
        inputTourId: '',//测试

        name: '西安直飞丽江+大理/泸沽湖/香格里拉7天自由行',
        price: '2580',
        tagList: ['家庭亲子', '游船环湖', '篝火晚会'],
        img_list: [
          'https://n1-q.mafengwo.net/s11/M00/FB/CB/wKgBEFrQbruAITyhAADoL22YR4A40.jpeg',
          'https://p1-q.mafengwo.net/s7/M00/9C/19/wKgB6lUE9XyAO7g9AASnYV5jUB897.jpeg',
          'https://b1-q.mafengwo.net/s9/M00/B5/5C/wKgBs1ePnxOATWfyAA-Z_X0kY4U06.jpeg',
        ],
        details: [
          {
            activity: '丽江自由行',
            description: '住丽江古城特色客栈，夜游古城赏夜景品小吃',
            img: 'http://n1-q.mafengwo.net/s14/M00/06/60/wKgE2lz7luCAJxXPAA2QE1CbP3I441.jpg',
            lnglat: [100.235295, 26.870272],
          },
          {
            activity: '登顶玉龙雪山',
            description: '十三座雪峰连绵不绝，宛若一条巨龙腾跃飞舞。',
            img: 'http://b1-q.mafengwo.net/s12/M00/0C/95/wKgED1vuIRWAOQSVAAhK4xMZrXM62.jpeg',
            lnglat: [100.201152, 27.133846],
          },
          // {
          //   activity: '大理/泸沽湖',
          //   description: '大理，一个风花雪月的地方。',
          //   img: 'http://n1-q.mafengwo.net/s12/M00/71/0B/wKgED1wbRsCABIaZAAfeiae_PmM46.jpeg',
          //   lnglat: [100.231877, 25.58998],
          // },
          // {
          //   activity: '香格里拉',
          //   description: '香格里拉大家向往的滇北高原小城，四季变幻。',
          //   img: 'http://p1-q.mafengwo.net/s12/M00/49/D6/wKgED1wNxn6AEwupAAzyTLtn2rc499.png',
          //   lnglat: [99.486317, 28.343369],
          // },
        ],
        selectionList: [
          '【洱语】丽江+大理+泸沽湖',
          '【文吟】丽江+大理+香格里拉',
          '【邂逅】丽江+泸沽湖+香格里拉',
        ],

        img_address:
          '',
        tagOptions:
          ['爬山', '出游', '远行'],
        selectTag:
          '',
        dayItem:
          {
            activity: '',
            description:
              '',
            img:
              '',
            lnglat:
              [116.397428, 39.90923],
          }
        ,
        item: '',
        addMap:
          null,
        addMarker:
          null,
        inputSelection:
          ''
      }
    },
    methods: {
      upload () {
        APIUtil.post('/Tour', {
          name: this.name,
          price: this.price,
          details: JSON.stringify(this.details),//字符串序列化
          img_list: JSON.stringify(this.img_list),
          tags: JSON.stringify(this.tagList),
          review_status: 'review',
          merchant_name: '携程伴你行',
          selections: JSON.stringify(this.selectionList),
        }).then((res) => {
          console.log(res)
          if (res.status === 200) {
            this.$Message.success('上传成功')
          } else {
            this.$Message.error('上传失败')
          }
        })
      },//upload
      addSelection () {
        if (!this.inputSelection) {
          this.$Message.error('请输入套餐名称')
          return
        }
        this.selectionList.push(this.inputSelection)
      },
      addActivity () {
        if (!(this.dayItem.activity && this.dayItem.description && this.dayItem.img)) {
          this.$Message.error('请填写完全！')
          return
        }
        this.details.push(this.dayItem)
        this.$nextTick(this.updateDayItemMap)
      },
      addImag () {
        this.img_list.push(this.img_address)
      },
      addTag () {
        this.tagList.push(this.selectTag)
        console.log(this.tagList)
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
      initAddMap () {
        this.addMap = new AMap.Map('add-map', {
          zoom: 11,
          center: [116.397428, 39.90923],
          viewMode: '3D'
        })
        this.addMap.on('click', ev => {
          // console.log(ev)
          if (this.addMarker) {
            this.addMap.remove(this.addMarker)
          }
          let lnglat = [ev.lnglat.lng, ev.lnglat.lat]
          console.log(lnglat)
          this.dayItem.lnglat = lnglat
          this.addMarker = new AMap.Marker({
            position: lnglat,
            title: '北京',
            map: this.addMap,
          })
        })
      },

      clear () {
        APIUtil.delete(`tour/${this.inputTourId}`)
          .then(res => {
            if (res.status === 200) {
              this.$Message.success('删除成功')
            } else {
              this.$Message.error('删除失败')
            }
          })
      },
    },
    mounted () {
      this.initAddMap()
      this.updateDayItemMap()
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
