<template>
  <div id="app">
    <Layout v-if="!isLogin" style="height: 900px">
      <Login/>
    </Layout>

    <div v-if="isLogin" class="layout">
      <Header>
        <div class="layout-logo"></div>
        <div class="layout-title">
          移动旅游出行平台
        </div>
      </Header>
      <Layout :style="{minHeight: '100vh'}">
        <Sider :style="{padding:'10px 0'}" class="white-bg">
            <Menu ref="menu" :theme="'light'" active-name="'visit'" width="auto" @on-select="onSelected">
              <div v-if="role==='merchant'">
                <MenuItem name="CommodityList">
                  <Icon type="md-document" />
                  <span>商品信息查看与上传</span>
                </MenuItem>
                <MenuItem name="OrderList">
                  <Icon type="md-document" />
                  <span>订单信息审核</span>
                </MenuItem>
              </div>
              <div v-if="role==='platformManager'">
                <MenuItem name="CommodityReviewList">
                  <Icon type="md-pulse" />
                  <span>商品信息审核</span>
                </MenuItem>
                <MenuItem name="QueryAndSort">
                  <Icon type="md-pulse" />
                  <span>信息查询及分类</span>
                </MenuItem>
              </div>
            </Menu>
        </Sider>
          <Content :style="{padding: '10px 16px 16px'}">
              <router-view/>
          </Content>
      </Layout>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Login from './components/Login'
import APIUtil from './services/APIUtil'

export default {
  name: 'App',
  components: {Login},
  data () {
    return {
      lastCount: 0
    }
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'role'
    ])
  },
  methods: {
    /**
     * route to sub page
     * @param name router's name
     */
    onSelected (name) {
      this.$router.push({
        name: name
      })
    },
    checkUpdate () {
      if (this.role === 'platformManager') {
        APIUtil.get('/Commodity').then(response => {
          if (response.status === 200) {
            let list = response.data.Commodity
            /*
             * If count is not equal, get its last item
             */
            if (this.lastCount !== 0 && list.length !== this.lastCount) {
              this.sendNoticeCommodity(list[list.length - 1])
            }
            /*
             * Update lastCount
             */
            this.lastCount = list.length
          }
        })
      }
    },
    sendNoticeCommodity (newCommodity) {
      let id = newCommodity.id
      let commodityname = newCommodity.commodityname
      //let examinationTime = newCommodity.timestamp * 1000
      this.$Notice.info({
        title: '商品 - ' + id,
        name: id,
        duration: 0,
        render: createElement => {
          return createElement('div', {
              style: {
                lineHeight: 1.5
              },
              on: {
                click: () => {
                  this.$router.push({
                    name: 'CommodityDetail',
                    params: {
                      id: id
                    }
                  })
                  this.$Notice.close(id)
                }
              }
            },
            [
              createElement('p', ['商品名称: ' + commodityname]),
              //createElement('p', ['开单时间: ' + Util.timeStampFormatter(examinationTime)])
            ])
        }
      })
    },
  },
  mounted () {
    setInterval(() => this.checkUpdate(), 2000)
  }
}
</script>

<style lang="scss" scoped>
  @import "scss/index.css";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .layout-title {
    float: left;
    left: 20px;
    position: relative;
    font-size: 16px;
    color: white;
  }
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
  }
  .menu-item  {
    span {
      display: inline-block;
      overflow: hidden;
      width: 69px;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: bottom;
      transition: width .2s ease .2s;
    }

    i {
      transform: translateX(0px);
      transition: font-size .2s ease, transform .2s ease;
      vertical-align: middle;
      font-size: 16px;
    }
  }

  .collapsed-menu {
    span {
      width: 0;
      transition: width .2s ease;
    }
    i {
      transform: translateX(5px);
      transition: font-size .2s ease .2s, transform .2s ease .2s;
      vertical-align: middle;
      font-size: 22px;
    }
  }

</style>
