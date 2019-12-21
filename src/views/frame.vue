<template>
  <div>
    <Header>
      <div class="layout-logo"></div>
      <div class="layout-title">
        移动旅游出行平台
      </div>
      <div style="text-align: right;font-size: medium;color: white">
      <Dropdown>
          <Avatar icon="ios-person" size="large" />
          {{this.role}}
          <Icon type="ios-arrow-down"></Icon>
        <DropdownMenu slot="list">
          <DropdownItem>基本信息</DropdownItem>
          <DropdownItem>账户信息</DropdownItem>
          <DropdownItem>用户与权限</DropdownItem>
          <DropdownItem divided><Button @click="logout">退出登陆</Button></DropdownItem>
        </DropdownMenu>
      </Dropdown>

      </div>
    </Header>
    <Layout :style="{minHeight: '100vh'}">
      <Sider style="background: white;">
        <Menu ref="menu" :theme="'light'" active-name="'visit'" width="auto" @on-select="onSelected">
          <div v-if="role==='merchant'">
            <MenuItem name="CommodityList">
              <Icon type="md-document"/>
              <span>商品信息查看与上传</span>
            </MenuItem>
            <MenuItem name="OrderList">
              <Icon type="md-document"/>
              <span>订单信息审核</span>
            </MenuItem>
          </div>
          <div v-if="role==='platformManager'">
            <MenuItem name="CommodityReviewList">
              <Icon type="md-pulse"/>
              <span>商品信息审核</span>
            </MenuItem>
            <MenuItem name="QueryAndSort">
              <Icon type="md-pulse"/>
              <span>商家信息查询</span>
            </MenuItem>
          </div>
        </Menu>
      </Sider>
      <Content :style="{padding: '10px 16px 16px'}">
        <router-view/>
      </Content>
    </Layout>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Login from './Login'
  import APIUtil from '../services/APIUtil'

  export default {
    name: 'frame',
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
      logout(){
        this.$router.push({
          name: 'Login'
        })
      },
      checkUpdate () {
        if (this.role === 'platformManager') {
          APIUtil.get('/Tour').then(response => {
            if (response.status === 200) {
              let list = response.data.Tour
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
        if (this.role === 'merchant') {
          APIUtil.get('/Order').then(response => {
            if (response.status === 200) {
              let list = response.data.Order
              /*
               * If count is not equal, get its last item
               */
              if (this.lastCount !== 0 && list.length !== this.lastCount) {
                this.sendNoticeOrder(list[list.length - 1])
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
        let commodityname = newCommodity.name
        //let examinationTime = newCommodity.timestamp * 1000
        this.$Notice.info({
          title: '商品详情：商品 - ' + id,
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
      sendNoticeOrder (newOrder) {
        let id = newOrder.id
        let ordername = newOrder.product_name
        //let examinationTime = newCommodity.timestamp * 1000
        this.$Notice.info({
          title: '订单详情：商品 - ' + id,
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
                      name: 'OrderDetail',
                      params: {
                        id: id
                      }
                    })
                    this.$Notice.close(id)
                  }
                }
              },
              [
                createElement('p', ['商品名称: ' + ordername]),
                //createElement('p', ['开单时间: ' + Util.timeStampFormatter(examinationTime)])
              ])
          }
        })
      }
    },
    mounted () {
      setInterval(() => this.checkUpdate(), 2000)
    }
  }
</script>

<style lang="scss" scoped>

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

  .menu-item {
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
