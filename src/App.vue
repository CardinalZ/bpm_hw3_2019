<template>
  <div id="app">
    <div style="border-bottom: 1px solid red;display: flex;">
      <Input @on-enter="connectIM" v-model="acc_id" placeholder="acc_id"/>
      <Button @click="connectIM()">连接</Button>
      <Button @click="animate(0)">animate1</Button>
      <Button @click="animate(1)">animate2</Button>
    </div>
    <router-view/>
    <div v-if="role==='merchant'" class="msg_body"
         :style="{transform:style_msg_body}">
      <div style="display: flex;align-items: center;
      padding: 5px 8px;border-bottom: 1px gray solid;">
        <div>
          <Button @click="exitChat"
                  size="small" style="background: transparent;" shape="circle" icon="ios-arrow-back"/>
        </div>
        <img style="width: 36px;height: 36px;margin:0 8px;border-radius: 5px;object-fit: cover"
             :src="user.avatar">
        <div style="font-weight: bold;">{{user.name}}</div>
      </div>

      <div id='z-scroll-chat' style="height: 300px;" class="z-scroll">
        <div v-for="item in chat_list">
          <div v-if="!item.isMine" style="text-align: left;margin-bottom: 8px;">
            <div style="padding-left: 3px;font-size: xx-small">{{item.time}}</div>
            <div
              style="background: #2E8B57;margin-right: 48px;padding: 5px 8px;
          border-top-right-radius: 10px;border-bottom-right-radius: 10px;display: inline-block;">
              {{item.text}}
            </div>
          </div>
          <div v-if="item.isMine" style="text-align: right;margin-bottom: 8px;">
            <div style="padding-right: 3px;font-size: xx-small">{{item.time}}</div>
            <div
              style="background: #4169E1;margin-left: 48px;padding: 5px 8px;
          border-top-left-radius: 10px;border-bottom-left-radius: 10px;display: inline-block;">
              {{item.text}}
            </div>
          </div>
        </div>
      </div>

      <div style="display: flex;padding: 8px 8px;border-top: 1px gray solid;">
        <Input @on-enter="sendMsg" v-model="input_msg" placeholder="请输入..."/>
        <Button :loading="loading_send" @click="sendMsg" style="margin-left: 8px;">发送
        </Button>
      </div>

    </div>
    <div v-if="role==='merchant'" class="msg_list"
         :style="{transform:style_msg_list}">
      <div v-for="item in session_list"
           @click="enterChat(item)"
           style="display: flex;align-items: center;border-radius: 5px;cursor: pointer;
           padding: 5px 8px;background: #000c;margin-bottom: 1px;">
        <img style="width: 36px;height: 36px;margin-right: 5px;border-radius: 5px;object-fit: cover"
             :src="user.avatar">
        <div style="width: 320px;display: flex;flex-direction: column;">
          <div style="display: flex;">
            <div>{{user.name}}</div>
            <div style="flex-grow: 1;"></div>
            <div>{{new Date(item.updateTime).format('yyyy-MM-dd hh:mm:ss')}}</div>
          </div>
          <Badge :count="item.unread">
            <div style="text-align: left;">{{item.lastMsg?item.lastMsg.text:''}}</div>
          </Badge>
        </div>
      </div>
    </div>
    <div v-if="role==='merchant'" class="msg_ball">
      <Badge dot>
        <div @animationend='msgAnimationEnd(0)'
             @click="toggleChatting"
             :class="{'animated tada':isAnimating[0]}"
             class="msg_tip_item">
          系统
        </div>
      </Badge>
      <br>
      <Badge dot>
        <div @animationend='msgAnimationEnd(1)'
             @click="toggleChatting"
             :class="{'animated tada':isAnimating[1]}"
             class="msg_tip_item">
          个人
        </div>
      </Badge>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'App',
    data () {
      return {
        user: {
          name: '克里斯多夫',
          avatar: require('./assets/user.png')
        },
        isAnimating: [true, true],
        input_msg: '',
        acc_id: 'test1',
        talk_to: '',
        nim: null,
        loading_send: false,
        chat_list: [
          // {
          //   isMine: false,
          //   from: '',
          //   to: '',
          //   text: 'hello',
          //   time: new Date().format('yyyy-MM-dd hh:mm:ss')
          // },
        ],
        session_list: [
          {
            flow: 'in',
            to: '',
            unread: 1,
            from: '',
            fromNick: '王小波',
            time: new Date().format('yyyy-MM-dd hh:mm:ss'),
            text: '一想到你，我的脸上就泛起微笑',
            avatar: '',
          }
        ],
        isChatting: false,
        isShowChat: false,
        cur_session: null,
      }
    },
    mounted () {
      // this.initIM()
    },
    computed: {
      ...mapGetters([
        'isLogin',
        'role'
      ]),
      style_msg_body () {
        if (this.isShowChat) {
          return this.isChatting ? 'translateX(0px)' : 'translateX(1000px)'
        } else {
          return 'translateX(1000px)'
        }
      },
      style_msg_list () {
        if (this.isShowChat) {
          return this.isChatting ? 'translateX(1000px)' : 'translateX(0px)'
        } else {
          return 'translateX(1000px)'
        }
      },
    },
    methods: {
      resetUnread (session_id) {
        this.nim.resetSessionUnread(session_id)
        let i = 0
        for (; i < this.session_list.length; i++) {
          let sess = this.session_list[i]
          if (sess.id === session_id) {
            break
          }
        }
        this.$set(this.session_list, i, this.session_list[i])
      },
      enterChat (item) {
        if (!item.to) {
          this.$Message.error('这是一个测试会话')
          return
        }
        this.cur_session = item
        this.isChatting = true
        //重置未读数
        this.resetUnread(this.cur_session.id)
        this.getHistoryMsgs()
      },
      getHistoryMsgs () {
        if (this.nim) {
          let _this = this
          this.nim.getHistoryMsgs({
            scene: 'p2p',
            to: this.cur_session.to,
            done (error, obj) {
              console.log('获取p2p历史消息：' + (!error ? '成功' : '失败'))
              console.log(obj)
              if (!error) {
                obj.msgs.forEach(msg => {
                  _this.appendNewMsg(msg, true)
                })
              }
            },//done
          })
        }
      },
      appendNewMsg (msg, front) {
        if (front) {
          this.chat_list.unshift({
            isMine: msg.flow === 'out',
            from: msg.from,
            to: msg.to,
            text: msg.text,
            time: new Date(msg.time).format('yyyy-MM-dd hh:mm:ss')
          })
        } else {
          this.chat_list.push({
            isMine: msg.flow === 'out',
            from: msg.from,
            to: msg.to,
            text: msg.text,
            time: new Date(msg.time).format('yyyy-MM-dd hh:mm:ss')
          })
        }
        let ele = document.getElementById('z-scroll-chat')
        this.$nextTick(() => {
          ele.scrollTop = ele.scrollHeight
        })
      },
      sendMsg () {
        let to = 'test1'
        if (this.acc_id === 'test1') {
          to = 'test2'
        }
        console.log('发送消息给', to)
        if (!this.nim) {
          this.$Message.error('尚未连接IM服务器，尝试重新连接')
          this.connectIM()
          return
        }
        let _this = this
        this.loading_send = true
        this.nim.sendText({
          scene: 'p2p',
          to: to,
          text: this.input_msg,
          done (error, msg) {
            _this.loading_send = false
            if (error) {
              console.log('消息发送失败')
              console.log(error)
            } else {
              _this.appendNewMsg(msg)
            }
          }//done
        })
      },
      connectIM () {
        let token = '219338cb0cda45ac1a7e21a689a4d77e'
        this.talk_to = 'test2'
        if (this.acc_id === 'test2') {
          token = 'a6156a446a50c1f5d014ca3d910092e8'
          this.talk_to = 'test1'
        }
        this.$Message.loading('连接IM服务器')
        let _this = this
        this.nim = this.SDK.NIM.getInstance({
          debug: false,
          appKey: 'afcf5899f1d81c39a6780a7cbbf4b322',
          account: this.acc_id,
          token: token,
          onconnect: (obj) => {
            console.log('IM连接成功', obj)
            _this.$Message.destroy()
          },
          ondisconnect (error) {
            console.log('IM连接失败', error)
            _this.$Message.destroy()
          },
          onwillreconnect (obj) {
            console.log('IM即将重连')
            console.log(obj.retryCount)
            console.log(obj.duration)
          },
          onerror (error) {
            console.log('IM初始化错误')
            console.log(error)
          },
          onmsg: (msg) => {
            console.log('收到消息')
            console.log(msg)
            _this.animate(1)
            if (msg.from === _this.talk_to) {
              _this.appendNewMsg(msg)
            }
            if (_this.isChatting) {
              this.resetUnread(this.cur_session.id)
            }
          },//onmsg
          onsessions (sessions) {
            console.log('收到会话列表：', sessions)
            _this.session_list = sessions
          },
          onupdatesession (session) {
            console.log('会话更新了：', session)
            _this.session_list = _this.nim.mergeSessions(_this.session_list, session)
          },
        })
      },
      animate (i) {
        this.isAnimating[i] = true
        this.isAnimating = [...this.isAnimating]
      },
      msgAnimationEnd (i) {
        this.isAnimating[i] = false
        this.isAnimating = [...this.isAnimating]
      },
      toggleChatting () {
        this.isShowChat = !this.isShowChat
      },
      exitChat () {
        this.isChatting = false
      },
    },
  }
</script>

<style>
  @import "scss/index.css";
</style>

<style lang="scss" scoped>

  .xxs-font {
    font-size: xx-small;
  }

  .z-scroll {
    overflow-y: scroll;

    /*&::-webkit-scrollbar {*/
    /*  display: none;*/
    /*}*/
  }

  .msg_body {
    transition: all .5s;
    width: 400px;
    border-radius: 10px;
    background: #000d;
    position: fixed;
    z-index: 100;
    top: 20px;
    right: 20px;
    color: white;
  }

  .msg_list {
    transition: all .5s;
    padding: 8px;
    border-radius: 10px;
    background: #0007;
    position: fixed;
    z-index: 100;
    top: 20px;
    right: 20px;
    color: white;
  }

  .msg_ball {
    padding: 12px 0;
    border-radius: 10px;
    position: fixed;
    z-index: 100;
    bottom: 20px;
    right: 20px;
    color: white;

    .msg_tip_item {
      background: #0007;
      width: 50px;
      padding: 3px 0;
      border-top-left-radius: 10px;
      border-bottom-right-radius: 10px;
      cursor: pointer;

      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;

      &:hover {
        background: #000a;
      }
    }
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }


</style>
