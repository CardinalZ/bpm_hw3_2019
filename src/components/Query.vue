<template>
  <div>
    <Input v-model="projectName" placeholder="项目名称" style="width: 300px"></Input>
    <Input v-model="unitName" placeholder="单位名称" style="width: 300px"></Input>
    <Button type="primary" style="width: 100px" @click="query">查找</Button>
    <Table :columns="columns" :data="data"></Table>

  </div>
</template>

<script>
import APIUtil from '../services/APIUtil'

export default {
  name: 'Query',
  data () {
    return {
      columns: [
        {
          title: '项目名称',
          key: 'projectName'
        },
        {
          title: '单位名称',
          key: 'unitName'
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
      resultList: [],
      projectName: null,
      unitName: null
    }
  },
  methods: {
    goToDetailPage (index) {
      this.$router.push({
        name: 'QueryDetail',
        params: {
          projectName: this.data[index].projectName
        }
      })
    },
    query () {
      let projectName = ''
      let unitName = ''
      if (this.projectName != null) {
        projectName = this.projectName.trim()
      }
      if (this.unitName != null) {
        unitName = this.unitName.trim()
      }
      APIUtil.get('/searchName', {
        projectName: projectName,
        unitName: unitName
      }).then(response => {
        this.resultList = response.data

        this.data = [] // clean the current data
        this.resultList.forEach(item => {
          this.data.push({
            projectName: item.projectName,
            unitName: item.unitInfo.unitName
          })
        })
      })
    }
  }

}
</script>

<style scoped>

</style>
