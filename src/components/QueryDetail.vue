<template>
  <div>
    <h1 align="left">项目名称    {{data.projectName}}</h1>
    <div style="margin-bottom: 20px;">
    <h2 align="left"> 申报单位信息 </h2>
    <ul align="left">
      <ol class="margin_50">单位名称    {{data.unitInfo.unitName}} </ol>
      <ol class="margin_50">单位性质    {{data.unitInfo.unitNature}} </ol>
      <ol class="margin_50">单位注册地址    {{data.unitInfo.unitRegistrationAddress}} </ol>
      <ol class="margin_50">单位实验室地址    {{data.unitInfo.unitLabAddress}} </ol>
      <!--TODO: 大小写-->
      <ol class="margin_50">CMA证书编号    {{data.unitInfo.cmanumber}} </ol>
    </ul>
    </div>
    <div style="margin-bottom: 20px;">
    <h2 align="left"> 检测参数信息 </h2>
    <h3 class="margin_20" align="left"> 检测参数1 </h3>
    <ul align="left">
      <ol class="margin_50">参数名称    {{data.parameterList[0].parameterName}} </ol>
      <ol class="margin_50">检测标准及方法    {{data.parameterList[0].parameterDetectMethod}} </ol>
    </ul>
    <h3 class="margin_20" align="left"> 检测参数2 </h3>
    <ul align="left">
      <ol class="margin_50">参数名称    {{data.parameterList[1].parameterName}} </ol>
      <ol class="margin_50">检测标准及方法    {{data.parameterList[1].parameterDetectMethod}} </ol>
    </ul>
    <h3 class="margin_20" align="left"> 检测参数3 </h3>
    <ul align="left">
      <ol class="margin_50">参数名称    {{data.parameterList[2].parameterName}} </ol>
      <ol class="margin_50">检测标准及方法    {{data.parameterList[2].parameterDetectMethod}} </ol>
    </ul>
    </div>
    <div  style="margin-bottom: 20px;">
      <h2 align="left"> 联系人信息 </h2>
      <h3 class="margin_20" align="left"> 联系人1 </h3>
      <ul align="left">
        <ol class="margin_50">姓名    {{data.contactList.length !== 0 && data.contactList[0].name}} </ol>
        <ol class="margin_50">职务    {{data.contactList.length !== 0 && data.contactList[0].position}} </ol>
        <ol class="margin_50">联系电话    {{data.contactList.length !== 0 && data.contactList[0].contactNumber}} </ol>
        <ol class="margin_50">传真    {{data.contactList.length !== 0 && data.contactList[0].fax}} </ol>
        <ol class="margin_50">手机号码   {{data.contactList.length !== 0 && data.contactList[0].phoneNumber}} </ol>
        <ol class="margin_50">电子邮件    {{data.contactList.length !== 0 && data.contactList[0].email}} </ol>
      </ul>
      <h3 class="margin_20" align="left"> 联系人2 </h3>
      <ul align="left">
        <ol class="margin_50">姓名    {{data.contactList.length !== 0 && data.contactList[1].name}} </ol>
        <ol class="margin_50">职务    {{data.contactList.length !== 0 && data.contactList[1].position}} </ol>
        <ol class="margin_50">联系电话    {{data.contactList.length !== 0 && data.contactList[1].contactNumber}} </ol>
        <ol class="margin_50">传真    {{data.contactList.length !== 0 &&  data.contactList[1].fax}} </ol>
        <ol class="margin_50">手机号码   {{data.contactList.length !== 0 &&  data.contactList[1].phoneNumber}} </ol>
        <ol class="margin_50">电子邮件    {{data.contactList.length !== 0 && data.contactList[1].email}} </ol>
      </ul>
    </div>
    <div style="margin-bottom: 20px;">
    <h2 align="left"> 立项依据 </h2>
    <h3 class="margin_20" align="left"> 项目重要性/意义 </h3>
    <div align="left" style="width:500px;overflow-x:scroll;overflow-y:scroll;">
      {{data.basisOfProject.importanceOfProject}}
    </div>
    </div>
    <div style="margin-bottom: 20px;">
    <h3 class="margin_20" align="left"> 项目可行性 </h3>
    <div align="left" style="width:500px;overflow-x:scroll;overflow-y:scroll;">
      {{data.basisOfProject.feasibilityOfProject}}
    </div>
    </div>
    <div style="margin-bottom: 20px;">
    <h2 align="left"> 申报检测资质说明 </h2>
    <ul align="left">
      <ol class="margin_20">机构是否已获得该检测项目的资质认定或认可 {{data.descriptionOfTestQualification.recognitionOfUnitTestProject}}  </ol>
      <ol class="margin_20">机构是否获得能力验证提供者认可资质    {{data.descriptionOfTestQualification.recognitionOfUnit}} </ol>
      <ol class="margin_20">机构是否获得能力验证提供者认可资质    {{data.descriptionOfTestQualification.recognitionOfProject}} </ol>
      <ol class="margin_20">机构是否获得能力验证提供者认可资质    {{data.descriptionOfTestQualification.recognitionOfParameters}} </ol>
      <ol class="margin_20">是否是该项目的相关标准参与/制定者（单位）    {{data.descriptionOfTestQualification.relatedUnitOfProject}} </ol>
      <ol class="margin_20">是否为其他国际相关能力验证提供者    {{data.descriptionOfTestQualification.relatedUnitOfInternational}} </ol>
      <ol class="margin_20">其他    {{data.descriptionOfTestQualification.otherTestDes}} </ol>
    </ul>
    </div>
    <div style="margin-bottom: 20px;">
    <h2 align="left"> 申报单位在该领域组织能力验证的情况说明（限200字） </h2>
    <div class="margin_20" align="left" style="width:500px;overflow-x:scroll;overflow-y:scroll;">
      {{data.capacityDescriptionOfUnitInField}}
    </div>
    </div>
    <div style="margin-bottom: 20px;">
    <h2 align="left"> 申报单位检测能力水平描述 </h2>
    <h3 class="margin_20" align="left"> 标准制修订 </h3>
    <div class="margin_20" align="left" style="width:500px;overflow-x:scroll;overflow-y:scroll;">
      {{data.descriptionOfTestCapacitie.standardRevision}}
    </div>
    <h3 class="margin_20" align="left"> 科研 </h3>
    <div class="margin_20" align="left" style="width:500px;overflow-x:scroll;overflow-y:scroll;">
      {{data.descriptionOfTestCapacitie.research}}
    </div>
    <h3 class="margin_20" align="left"> 其他 </h3>
    <div class="margin_20" align="left" style="width:500px;overflow-x:scroll;overflow-y:scroll;">
      {{data.descriptionOfTestCapacitie.otherDes}}
    </div>
    </div>
    <div style="margin-bottom: 20px;">
    <h2 align="left"> 上海市内获得相关项目资质的检验检测机构数量 </h2>
    <div class="margin_20" align="left" style="width:500px;overflow-x:scroll;overflow-y:scroll;">
      {{data.numberOfRelatedUnit}}
    </div>
    </div>
      <div style="margin-bottom: 20px;">
    <h2 align="left">验证计划类型 </h2>
    <ul align="left">
      <ol class="margin_20">顺序参加  <span style="margin-left: 50px">{{data.typeOfTestProgram.sequantialParticipate}}</span>  </ol>
      <ol class="margin_20">同步参加     <span style="margin-left: 50px">{{data.typeOfTestProgram.synchronousParticipate}}</span> </ol>
      <ol class="margin_20">其他     <span style="margin-left: 50px">{{data.typeOfTestProgram.otherType}}</span> </ol>
    </ul>
      </div>
    <div style="margin-bottom: 20px;">
    <h2 align="left"> 样品测试 </h2>
    <ul align="left">
      <ol class="margin_20">样品名称 <span style="margin-left: 50px">{{data.sampleDesign.sampleName}}</span>  </ol>
      <ol class="margin_20">样品性状    <span style="margin-left: 50px">{{data.sampleDesign.sampleTraits}}</span> </ol>
      <ol class="margin_20">样品制备方法    <span style="margin-left: 25px">{{data.sampleDesign.samplePreparation}}</span> </ol>
      <ol class="margin_20">样品浓度设计    <span style="margin-left: 20px">{{data.sampleDesign.sampleConcentration}}</span> </ol>
      <ol class="margin_20">样品均匀性检验方法<div class="margin_20" style="width:500px;overflow-x:scroll;overflow-y:scroll;">{{data.sampleDesign.methodOfUniformity}}</div> </ol>
      <ol class="margin_20">样品稳定性检验方法    <div class="margin_20" style="width:500px;overflow-x:scroll;overflow-y:scroll;">{{data.sampleDesign.methodOfStability}}</div> </ol>
      <ol class="margin_20">样品储存方式    <span style="margin-left: 25px">{{data.sampleDesign.methodOfStorage}}</span> </ol>
      <ol class="margin_20">样品运输方式    <span style="margin-left: 20px">{{data.sampleDesign.methodOfTransport}}</span> </ol>
      <ol class="margin_20">样品交接方式    <span style="margin-left: 25px">{{data.sampleDesign.methodOfHandover}}</span> </ol>
      <ol class="margin_20">其他    <span style="margin-left: 72px">{{data.sampleDesign.otherOfSample}}</span> </ol>
    </ul>
    </div>
    <div style="margin-bottom: 20px;">
    <h2 align="left"> 统计设计 </h2>
    <ul align="left">
      <ol class="margin_20">定性 <span style="margin-left: 50px">{{data.statisticsDesign.qualitative}}</span>  </ol>
      <ol class="margin_20">差值D    <span style="margin-left: 50px">{{data.statisticsDesign.difference}}</span> </ol>
      <ol class="margin_20">百分相对差D%    <span style="margin-left: 50px">{{data.statisticsDesign.relativePercentageDifference}}</span> </ol>
      <ol class="margin_20">Z比分数   <span style="margin-left: 50px"> {{data.statisticsDesign.ratioScoreOfZ}}</span> </ol>
      <ol class="margin_20">z'比分数    <span style="margin-left: 50px">{{data.statisticsDesign.ratioScoreOfZT}}</span> </ol>
      <ol class="margin_20">ζ比分数   <span style="margin-left: 50px"> {{data.statisticsDesign.ratioScoreOfE}}</span> </ol>
      <ol class="margin_20">En值    <span style="margin-left: 50px">{{data.statisticsDesign.en}}</span> </ol>
      <ol class="margin_20">其他    <span style="margin-left: 50px">{{data.statisticsDesign.otherStatisticsDesign}}</span> </ol>
    </ul>
    </div>
    <div style="margin-bottom: 20px;">
    <h2 align="left"> 指定值的确定 </h2>
    <ul align="left">
      <ol class="margin_20">已知值 <span style="margin-left: 50px">{{data.determinationOfSpecifiedValue.knownValue}}</span>  </ol>
      <ol class="margin_20">有证参考值   <span style="margin-left: 50px">{{data.determinationOfSpecifiedValue.referenceValueOfCertified}}</span> </ol>
      <ol class="margin_20">参考值   <span style="margin-left: 50px">{{data.determinationOfSpecifiedValue.referenceValue}}</span> </ol>
      <ol class="margin_20">专家参加者确定的公议值    <span style="margin-left: 50px">{{data.determinationOfSpecifiedValue.publicValueOfExpert}}</span> </ol>
      <ol class="margin_20">参加者确定的公议值   <span style="margin-left: 50px">{{data.determinationOfSpecifiedValue.publicValueOfParticipant}}</span></ol>
      <ol class="margin_20">其他    <span style="margin-left: 50px">{{data.determinationOfSpecifiedValue.otherValue}}</span> </ol>
    </ul>
    </div>
    <div style="margin-bottom: 20px;">
    <h2 align="left"> 项目经费估算 </h2>
    <ul align="left">
      <ol class="margin_20">样品费  <span style="margin-left: 73px">{{data.projectFunding.feeOfSample}}</span>  </ol>
      <ol class="margin_20">检测费  <span style="margin-left: 73px">{{data.projectFunding.feeOfTest}}</span> </ol>
      <ol class="margin_20">专家评审费    <span style="margin-left: 50px">{{data.projectFunding.feeOfExpert}}</span> </ol>
      <ol class="margin_20">其他    <span style="margin-left: 87px">{{data.projectFunding.otherFee}}</span> </ol>
    </ul>
    </div>
    <h2 align="left"> 其他说明事项 </h2>
    <p align="left" class="margin_20">{{data.others}}</p>

  </div>
</template>

<script>
import APIUtil from '../services/APIUtil'
import Caspanel from 'iview/src/components/cascader/caspanel'

export default {
  name: 'QueryDetail',
  components: {Caspanel},
  data () {
    return {
      projectName: this.$route.params.projectName,
      data: Object
    }
  },
  methods: {

  },
  mounted () {
    APIUtil.get('/searchName', {
      projectName: this.projectName,
      unitName: '',
      parameterList: []
    }).then(response => {
      this.data = response.data[0]
      console.log(this.data)
    })
  }
}
</script>

<style scoped>
  .margin_20{
    margin-left: 20px;
  }
  .margin_50{
    margin-left: 50px;
  }

</style>
