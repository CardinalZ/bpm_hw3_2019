<template>
  <div>
    <Card style="width: 30%;margin: 15% auto;" class="card">
      <div style="font-weight: bold;" slot="title">后台系统登录</div>
      <div>
        <Input v-model="name" prefix="ios-contact" placeholder="Username"/>
        <Input v-model="password" type="password" prefix="ios-lock" placeholder="Password"
               style="margin-top: 10px"/>
      </div>
      <Button type="primary" style="width: 100px; margin-top: 40px" @click="login">登录</Button>
    </Card>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        name: 'merchant',
        password: '123456',
      }
    },
    methods: {
      login () {
        if (this.name === 'platform' && this.password === '123456') {
          // 平台管理者
          this.$store.dispatch('changeLoginState', true)
          this.$store.dispatch('changeRole', 'platformManager')
          this.$router.push({
            name: 'CommodityReviewList'
          })
        } else if (this.name === 'merchant' && this.password === '123456') {
          this.$store.dispatch('changeLoginState', true)
          this.$store.dispatch('changeRole', 'merchant')
          this.$router.push({
            name: 'CommodityList'
          })
        }
      }
    }
  }
</script>
