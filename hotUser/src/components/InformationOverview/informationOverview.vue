<template>
  <div>
    <nav class="main_title">
      <span class="demonstration">供热季:</span>
      <el-select  size="small" v-model="value" @change="change()" placeholder="请选择供热季">
        <el-option v-for="item in quarter" :key="item.value" :label="item.供热季" :value="item.供热季Id">
        </el-option>
      </el-select>
      <label class="padding-left demonstration">地域区域:</label>
      <el-cascader size="small" @change="change()"
                   expand-trigger="click"
                   :options="area"  :props="props" change-on-select  v-model="areavalue"
                   placeholder="请选择地域区域">
      </el-cascader>
      <!--<label class="padding-left"></label>-->
      <!--<el-input style="width:280px !important;" size="small" prefix-icon="el-icon-search" placeholder="请输入查询信息" v-model="searchValue" clearable>-->
      <!--</el-input>-->
      <!--<label style="padding-left:10px"></label>-->
      <!--<el-button type="warning">查询</el-button>-->
    </nav>


    <!-- 内容区域 -->

    <nav >
      <div class="main_charge" >
        <div class="content_title_left">
          <span>收费情况</span>
        </div>
      </div>
      <div class="main_title" style="border-top:0px solid #000;position: relative;">
        <el-row style=" position: relative;">
          <!-- 收费金额 -->
          <el-col :span="15"  ><div class="grid-content bg-purple">
            <div class="border" v-for="(item, key,index) in chartList" :key="key" v-if="index<1">
              <div  class="border-echart" >
                <Chart id='overviewchart' :option="chartData" :style="{width: '100%',top: '10px', height: '300px'}"   :chartList="chartList"/>
              </div>
              <div class="info_txt">
                <div class="h2">应收总额</div>
                <div class="h1">¥{{chartList.sumMoney}}</div>
                <div class="h3-bar"><i class="circle1"></i>已收总金额······¥{{chartList.chargeMoneyList[0]}}万元</div>
                <div class="h3-bar"><i class="circle2"></i>减免总金额······¥{{chartList.chargeMoneyList[1]}}万元</div>
                <div class="h3-bar"><i class="circle3"></i>欠费总金额······¥{{chartList.chargeMoneyList[2]}}万元</div>
              </div>
            </div>
          </div>
          </el-col>
          <!-- 户数比例 -->
          <el-col :span="9"  v-for="(item, key,index) in chartList1" :key="key" v-if="index<1"><div class="grid-content bg-purple-light">
            <div class="border">
              <div  class="border-echart">
                <Chart id='overviewchart1' :option="chartData1" :style="{width: '100%',top: '10px', height: '300px'}" :chartList="chartList1"  />
              </div>
              <div class="info_txt">
                <div class="h3-pie"><i class="circle1"></i>{{chartList.chargeMoneyNumList[0]}}  <div class="h4-pie">已收用户</div></div>
                <div class="h3-pie"><i class="circle2"></i>{{chartList.chargeMoneyNumList[1]}}   <div class="h4-pie">欠费用户</div></div>
                <div class="h3-pie"><i class="circle3"></i>{{chartList.chargeMoneyNumList[2]}}   <div class="h4-pie">减免用户</div></div>
              </div>
            </div>
          </div></el-col>
        </el-row>
      </div>
    </nav>

    <nav>
      <el-row style=" position: relative;"  :gutter="20">
        <el-col :span="11"><div class="grid-content bg-purple">
          <div class="main_state_title" >
            <div class="content_title_left">
              <span>供暖状态情况</span>
            </div>
          </div>
          <div class="main_state" >
            <el-row  style=" position: relative;">
              <!-- 供暖状态情况 -->
              <el-col :span="24" v-for="(item, key,index) in chartList2" :key="key" v-if="index<1"><div class="grid-content bg-purple">
                <div class="" >
                  <div  class="border-echart">
                    <Chart id='overviewchart2' :option="chartData2" :style="{width: '100%',top: '-30px',left:'0px', height: '300px'}" :chartList="chartList2"  />
                  </div>
                </div>
                <div class="state_footer">
                  <div class="h3">  <div class="h4-pie">供暖</div>{{chartList2.heatStatusMap[0]}}</div>
                  <div class="h3"> <div class="h4-pie">停暖</div>{{chartList2.heatStatusMap[1]}} </div>
                  <div class="h3">  <div class="h4-pie">未用暖</div>{{chartList2.heatStatusMap[2]}}</div>
                </div>
              </div></el-col>
            </el-row>
          </div>
        </div>
        </el-col>
        <!-- 室温情况 -->
        <el-col :span="13"><div class="grid-content bg-purple">
          <div class="main_state_title" >
            <div class="content_title_left">
              <span>室温情况</span>
            </div>
          </div>
          <div class="main_state" >
            <el-row style=" position: relative;">
              <el-col :span="24"><div class="grid-content bg-purple">
                <div class=""  v-for="(item, key,index) in chartList3" :key="key" v-if="index<1">
                  <div  class="border-echart">
                    <Chart id='overviewchart3' :option="chartData3" :style="{width: '90%',top: '10px', left:'20px',height: '320px'}" :chartList="chartList3"  />
                  </div>
                </div>
                <div class="temperature_footer">
                  <el-row style="width:100%;">
                    <el-col :span="8"><div class="grid-content bg-purple">
                      <div class="h3-tem"><i class="circle6"></i>低温报警</div>
                    </div>
                    </el-col>
                    <el-col :span="8"><div class="grid-content bg-purple">
                      <div class="h3-tem"><i class="circle5"></i>低温</div>
                    </div>
                    </el-col>
                    <el-col :span="8"><div class="grid-content bg-purple">
                      <div class="h3-tem"><i class="circle4"></i>常温</div>
                    </div>
                    </el-col>
                    <el-col :span="8"><div class="grid-content bg-purple">
                      <div class="h3-tem"><i class="circle3"></i>高温</div>
                    </div>
                    </el-col>
                    <el-col :span="8"><div class="grid-content bg-purple">
                      <div class="h3-tem"><i class="circle2"></i>高温报警</div>
                    </div>
                    </el-col>
                    <el-col :span="8"><div class="grid-content bg-purple">
                      <div class="h3-tem"><i class="circle1"></i>离线</div>
                    </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="temperature_footer">

                </div>
              </div></el-col>
            </el-row>
          </div>
        </div></el-col>
      </el-row>
    </nav>
    <!--  -->
    <nav>
      <el-row style=" position: relative;"  :gutter="20">
        <el-col :span="11"><div class="grid-content bg-purple">
          <div class="main_state_title" style="margin-top:-45px">
            <div class="content_title_left">
              <span>保修情况</span>
            </div>
          </div>
          <div class="main_state" >
            <el-row  style=" position: relative;">
              <!-- 保修情况 -->
              <el-col :span="24" v-for="(item, key,index) in chartList4" :key="key" v-if="index<1" ><div class="grid-content bg-purple-light">
                <div class="border" style="margin: 15px 15px;width: 92%;height: 230px;">
                  <div  class="border-echart" style="width:70%;height: 230px;z-index:999">
                    <Chart id='overviewchart4' :option="chartData4" :style="{width: '100%',top: '0px', left:'-30px', height: '230px'}" :chartList="chartList4"  />
                  </div>
                  <div class="handle_txt">
                    <div class="h3-pie"><i class="circle3"></i>{{chartList4.handleRepairMap[0]}}  <div class="h4-pie">已处理工单</div></div>
                    <div class="h3-pie"><i class="circle2"></i>{{chartList4.handleRepairMap[1]}}  <div class="h4-pie">正在处理工单</div></div>
                  </div>
                </div>
              </div></el-col>
              <el-col :span="24" v-for="(item, key,index) in chartList5" :key="key" v-if="index<1"><div class="grid-content bg-purple-light">
                <div class="border" style="margin: 0px 15px;width: 92%;height: 230px;">
                  <div  class="border-echart" style="width:70%;height: 230px;z-index:999">
                    <Chart id='overviewchart5' :option="chartData5" :style="{width: '100%',top: '0px', left:'-30px', height: '230px'}" :chartList="chartList5"  />
                  </div>
                  <div class="handle_txt">
                    <div class="h3-pie"><i class="circle1"></i>{{chartList4.checkRepairMap[0]}}  <div class="h4-pie">已审核</div></div>
                    <div class="h3-pie"><i class="circle2"></i>{{chartList4.checkRepairMap[1]}}  <div class="h4-pie">未审核</div></div>
                  </div>
                </div>
              </div></el-col>
              <el-col :span="24" v-for="(item, key,index) in chartList6" :key="key" v-if="index<1"><div class="grid-content bg-purple-light">
                <div class="border" style="margin: 15px 15px;width: 92%;height: 280px;">
                  <div  class="border-echart" style="width:70%;height: 280px;z-index: 999;">
                    <Chart id='overviewchart6' :option="chartData6" :style="{width: '100%',top: '0px', left:'0px', height: '280px'}" :chartList="chartList6"  />
                  </div>
                  <div class="rose_txt">
                    <div class="h5-pie"><i class="circle circle1"></i>{{chartList4.repairTypeMap[0]}} %   <span>室内不热</span></div>
                    <div class="h5-pie"><i class="circle circle2"></i>{{chartList4.repairTypeMap[1]}} %   <span>房屋漏水</span></div>
                    <div class="h5-pie"><i class="circle circle3"></i>{{chartList4.repairTypeMap[2]}} %   <span>楼栋漏水</span></div>
                    <div class="h5-pie"><i class="circle circle4"></i>{{chartList4.repairTypeMap[3]}} %   <span>单元漏水</span></div>
                    <div class="h5-pie"><i class="circle circle5"></i>{{chartList4.repairTypeMap[4]}} %   <span>更换配件</span></div>
                    <div class="h5-pie"><i class="circle circle6"></i>{{chartList4.repairTypeMap[5]}} %   <span>开锁闭阀</span></div>
                    <div class="h5-pie"><i class="circle circle7"></i>{{chartList4.repairTypeMap[6]}} %    <span>测温</span></div>
                  </div>
                </div>
              </div></el-col>
            </el-row>
          </div>
        </div>
        </el-col>
        <el-col :span="13"><div class="grid-content bg-purple">
          <div class="main_state_title" >
            <div class="content_title_left">
              <span>采集装置情况</span>
            </div>
          </div>
          <div class="main_state" >
            <el-row  style=" position: relative;">
              <!-- 室温采集器情况 -->
              <el-col :span="24" v-for="(item, key,index) in chartList7" :key="key" v-if="index<1"><div class="grid-content bg-purple-light">
                <div class="border" style="margin: 15px 15px;width: 92%;height: 230px;">
                  <div  class="border-echart" style="width:83%;height: 230px;z-index:999">
                    <Chart id='overviewchart7' :option="chartData7" :style="{width: '100%',top: '10px', left:'10px', height: '230px'}" :chartList="chartList7"  />
                  </div>
                  <div class="collect_txt">
                    <div class="h3-pie"><i class="circle3"></i>{{chartList7.autoValveMap[0]}}  <div class="h4-pie">正常</div></div>
                    <div class="h3-pie"><i class="circle2"></i>{{chartList7.autoValveMap[1]}}   <div class="h4-pie">报警</div></div>
                    <div class="h3-pie"><i class="circle1"></i>{{chartList7.autoValveMap[2]}}   <div class="h4-pie">离线</div></div>
                  </div>
                </div>
              </div></el-col>
              <el-col :span="24" v-for="(item, key,index) in chartList8" :key="key" v-if="index<1" ><div class="grid-content bg-purple-light">
                <div class="border" style="margin: 15px 15px;width: 92%;height: 230px;">
                  <div   class="border-echart" style="width:83%;height: 230px;z-index:999">
                    <Chart id='overviewchart8' :option="chartData8" :style="{width: '100%',top: '10px', left:'10px', height: '230px'}" :chartList="chartList8"  />
                  </div>
                  <div class="collect_txt">
                    <div class="h3-pie"><i class="circle3"></i>{{chartList7.tempControlMap[0]}}  <div class="h4-pie">正常</div></div>
                    <div class="h3-pie"><i class="circle2"></i>{{chartList7.tempControlMap[1]}}   <div class="h4-pie">报警</div></div>
                    <div class="h3-pie"><i class="circle1"></i>{{chartList7.tempControlMap[2]}}   <div class="h4-pie">离线</div></div>
                  </div>
                </div>
              </div></el-col>
              <el-col :span="24" v-for="(item, key,index) in chartList9" :key="key" v-if="index<1"><div class="grid-content bg-purple-light">
                <div class="border" style="margin: 15px 15px;width: 92%;height: 230px;">
                  <div  class="border-echart" style="width:83%;height: 230px;z-index:999">
                    <Chart id='overviewchart9' :option="chartData9" :style="{width: '100%',top: '10px', left:'10px', height: '230px'}" :chartList="chartList9"  />
                  </div>
                  <div class="collect_txt">
                    <div class="h3-pie"><i class="circle3"></i>{{chartList7.tempSensingMap[0]}}  <div class="h4-pie">正常</div></div>
                    <div class="h3-pie"><i class="circle2"></i>{{chartList7.tempSensingMap[1]}}   <div class="h4-pie">报警</div></div>
                    <div class="h3-pie"><i class="circle1"></i>{{chartList7.tempSensingMap[2]}}   <div class="h4-pie">离线</div></div>
                  </div>
                </div>
              </div></el-col>
            </el-row>
          </div>
        </div></el-col>
      </el-row>
    </nav>

  </div>
</template>

<script>
import Chart from "base/chart/charts";
import {
  option,
  option1,
  option2,
  option3,
  option4,
  option5,
  option6,
  option7,
  option8,
  option9
} from "src/components/informationOverview/option";
import { getData } from "src/util/base.js";
export default {
  data() {
    return {
      value: "",
      activeName: "first",
      quarter: [],
      area: [],
      areavalue: [],
      props: {
        value: "Id",
        label: "text"
      },
      chartData: option,
      chartData1: option1,
      chartData2: option2,
      chartData3: option3,
      chartData4: option4,
      chartData5: option5,
      chartData6: option6,
      chartData7: option7,
      chartData8: option8,
      chartData9: option9,
      /* echart */
      // 初始化空对象
      chart: null,
      // 初始化图表配置
      chartList: [],
      chartList1: [],
      chartList2: [],
      chartList3: [],
      chartList4: [],
      chartList5: [],
      chartList6: [],
      chartList7: [],
      chartList8: [],
      chartList9: [],
      scrollHeight: 50
    };
  },
  components: {
    Chart
  },
  methods: {
    change() {
      this.chart = null;
      this.chartList = [];
      this.chartList1 = [];
      this.chartList2 = [];
      this.chartList3 = [];
      this.chartList4 = [];
      this.chartList5 = [];
      this.chartList6 = [];
      this.chartList7 = [];
      this.chartList8 = [];
      this.chartList9 = [];
      getData(
        "http://172.18.5.182:7001/iheat/htc/mesOverview/getChargeMessage.do",
        {
          //收费图表
          HeatPeroidId: this.value,
          addrZoneId: "231"
        }
      )
        .then(res => {
          this.chartList = res.data.chargeMoneyMap;
          this.chartList1 = res.data.chargeMoneyMap;
        })
        .catch(err => {});
      getData(
        "http://172.18.5.182:7001/iheat/htc/mesOverview/getHeatStatusMessage.do",
        {
          //供暖状态图表
          HeatPeroidId: this.value,
          addrZoneId: "231"
        }
      )
        .then(res => {
          this.chartList2 = res.data;
        })
        .catch(err => {});
      getData(
        "http://172.18.5.182:7001/iheat/htc/mesOverview/getHouseTempMessage.do",
        {
          //室温图表
          HeatPeroidId: this.value,
          addrZoneId: "231"
        }
      )
        .then(res => {
          this.chartList3 = res.data;
        })
        .catch(err => {});
      getData(
        "http://172.18.5.182:7001/iheat/htc/mesOverview/getCustRepairMessage.do",
        {
          //报修情况图表
          HeatPeroidId: this.value,
          addrZoneId: "231"
        }
      )
        .then(res => {
          this.chartList4 = res.data;
          this.chartList5 = res.data;
          this.chartList6 = res.data;
        })
        .catch(err => {});
      getData(
        "http://172.18.5.182:7001/iheat/htc/mesOverview/getCollDeviceMessage.do",
        {
          //采集情况图表
          HeatPeroidId: this.value,
          addrZoneId: "231"
        }
      )
        .then(res => {
          this.chartList7 = res.data;
          this.chartList8 = res.data;
          this.chartList9 = res.data;
        })
        .catch(err => {});
    }
  },
  created() {
    getData("http://172.18.5.182:7001/iheat/htc/htcBase/getAddrzone.do")
      .then(res => {
        //地理区域接口
        this.area = res.data;
      })
      .catch(err => {});
    getData("http://172.18.5.182:7001/iheat/htc/htcBase/getHeatPeroidList.do")
      .then(res => {
        //供热季接口
        this.quarter = res.data.heatPeroidList;
      })
      .catch(err => {});
    getData(
      "http://172.18.5.182:7001/iheat/htc/mesOverview/getChargeMessage.do",
      {
        //收费图表
        HeatPeroidId: "2016",
        addrZoneId: "231"
      }
    )
      .then(res => {
        this.chartList = res.data.chargeMoneyMap;
        this.chartList1 = res.data.chargeMoneyMap;
      })
      .catch(err => {});
    getData(
      "http://172.18.5.182:7001/iheat/htc/mesOverview/getHeatStatusMessage.do",
      {
        //供暖状态图表
        HeatPeroidId: "2016",
        addrZoneId: "231"
      }
    )
      .then(res => {
        this.chartList2 = res.data;
      })
      .catch(err => {});
    getData(
      "http://172.18.5.182:7001/iheat/htc/mesOverview/getHouseTempMessage.do",
      {
        //室温图表
        HeatPeroidId: "2016",
        addrZoneId: "231"
      }
    )
      .then(res => {
        this.chartList3 = res.data;
      })
      .catch(err => {});
    getData(
      "http://172.18.5.182:7001/iheat/htc/mesOverview/getCustRepairMessage.do",
      {
        //报修情况图表
        HeatPeroidId: "2016",
        addrZoneId: "231"
      }
    )
      .then(res => {
        this.chartList4 = res.data;
        this.chartList5 = res.data;
        this.chartList6 = res.data;
      })
      .catch(err => {});
    getData(
      "http://172.18.5.182:7001/iheat/htc/mesOverview/getCollDeviceMessage.do",
      {
        //采集情况图表
        HeatPeroidId: "2016",
        addrZoneId: "231"
      }
    )
      .then(res => {
        this.chartList7 = res.data;
        this.chartList8 = res.data;
        this.chartList9 = res.data;
      })
      .catch(err => {});
  }
};
</script>
<style>
.el-button--warning {
  border-color: #f6f6f6;
  border-width: 1px;
}
.el-select .el-input__inner:focus {
  border: 1px solid #dcdfe6;
}
</style>
<style lang="scss" scoped>
main {
  margin-top: 30px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.main_title {
  background: white;
  padding: 10px 20px;
  border: 1px solid #e0e0e0;
  min-width: 1050px;
  width: 100%;
  box-sizing: border-box;
}
.main_charge {
  background: #f9fafc;
  padding: 10px 20px;
  border: 1px solid #e0e0e0;
  width: 100%;
  min-width: 1050px;
  margin-top: 20px;
  box-sizing: border-box;
}
.main_state {
  background: white;
  /*padding: 10px 20px;*/
  border: 1px solid #e0e0e0;
  width: 100%;
  border-top: 0px solid #000;
  margin-top: 0px;
  position: relative;
  box-sizing: border-box;
}
.main_state_title {
  background: #f9fafc;
  padding: 10px 20px;
  border: 1px solid #e0e0e0;
  width: 100%;
  margin-top: 20px;
  box-sizing: border-box;
}
.padding-left {
  padding-left: 20px;
}
main.p_yulan_main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
main.p_yulan_main nav {
  width: 30%;
  min-width: 270px;
  margin-top: 12px;
  transition: box-shadow 0.4s;
}

/*main.p_yulan_main nav:hover {*/
/*box-shadow: 0px 15px 36px rgba(0, 0, 0, 0.2);*/
/*}*/
.content_title {
  height: 45px;
  line-height: 45px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: white;
  border: 1px solid #eff2f7;
  box-sizing: border-box;
  padding: 0 15px;
}
.content_title i {
  font-size: 25px;
}
.content_title .content_title_left h2 {
  margin: 0;
  font-weight: 400;
}
.content_title .content_title_left {
  display: flex;
}
.content_title .content_title_left > * + * {
  margin-left: 15px !important;
}
.content_title .content_title_left span {
  color: #979797;
}
.content_title .content_title_right i {
  color: #f39b20;
}
.content_echart {
  background: #fafafa;
  box-sizing: border-box;
}
.content_echart h1 {
  text-align: center;
  font-size: 35px;
  margin: 0;
  padding: 10px 0;
}
.content_footer {
  width: 100%;
  background: white;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
}
.content_footer i {
  font-size: 25px;
}
.el-button--warning {
  color: #fff;
  background: -webkit-linear-gradient(left, #fb816c, #fbb06d);
}
.el-button {
  padding: 8px 30px;
}
.el-input__inner {
  height: 35px;
  line-height: 35px;
  padding: 0 30px !important;
}
.h1 {
  font-size: 36px;
  color: #2c333d;
  /* padding: 20px 25px; */
  margin: -10px 25px;
  position: relative;
  border-bottom: 1px solid #e8e9ee;
}
.h2 {
  font-size: 24px;
  color: #5e5e5e;
  margin: 20px 25px;
  font-weight: 600;
  position: relative;
}
.h3 {
  font-size: 24px;
  color: #575757;
  width: 33.333%;
  padding-bottom: 10px;
  position: relative;
}
.h3:before {
  content: "";
  border-right: 1px solid #e3e7f0;
  width: 1px;
  height: 70px;
  margin: -10px 0;
  right: 0%;
  position: absolute;
}
.bg-purple .info_txt {
  float: left;
  position: relative;
  margin-left: 10px;
  background-color: #fafbfd;
  width: 290px;
  height: 300px;
}
.bg-purple-light .info_txt {
  float: left;
  position: relative;
  margin-left: -80px;
  width: 150px;
  height: 300px;
}
.grid-content .border {
  border: 1px solid #e9e9e9;
  height: 300px;
  float: left;
}
.grid-content .border .border-echart {
  width: 300px;
  height: 300px;
  float: left;
  position: relative;
}
.h3-bar {
  font-size: 17px;
  color: #808080;
  margin: 20px 20px 0px 30px;
  padding-bottom: 10px;
  position: relative;
  border-bottom: 1px solid #e8e9ee;
}
.h3-bar .circle1 {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 3px solid #ffc300;
  position: absolute;
  margin-left: -25px;
  margin-top: 6px;
}
.h3-bar .circle2 {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 3px solid #7ec855;
  position: absolute;
  margin-left: -25px;
  margin-top: 6px;
}
.h3-bar .circle3 {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 3px solid #6282ef;
  position: absolute;
  margin-left: -25px;
  margin-top: 6px;
}
.h3-pie {
  font-size: 24px;
  color: #575757;
  margin: 20px 5px 0px 70px;
  padding-bottom: 10px;
  position: relative;
  border-bottom: 1px solid #e8e9ee;
}
.handle_txt .h3-pie {
  font-size: 24px;
  color: #575757;
  margin: 40px 0px;
  padding-bottom: 10px;
  position: relative;
  border-bottom: 0px solid #e8e9ee;
}
.collect_txt .h3-pie {
  font-size: 24px;
  color: #575757;
  margin: 10px 0px;
  padding-bottom: 10px;
  position: relative;
  border-bottom: 0px solid #e8e9ee;
}
.rose_txt {
  margin-top: 30px;
}
.rose_txt .h5-pie {
  font-size: 14px;
  color: #575757;
  margin: 15px 0px;
  font-weight: 800;
  position: relative;
  border-bottom: 0px solid #e8e9ee;
}
.rose_txt .h5-pie span {
  font-size: 14px;
  color: #988f90;
}
.h4-pie {
  font-size: 16px;
  color: #969696;
  white-space: nowrap;
  margin: 0px 0px -10px 0px;
  padding-bottom: 10px;
  font-weight: 500;
  position: relative;
}
.h3-pie .circle1 {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 3px solid #ffc300;
  position: absolute;
  margin-left: -25px;
  margin-top: 10px;
}
.h3-pie .circle2 {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 3px solid #7ec855;
  position: absolute;
  margin-left: -25px;
  margin-top: 10px;
}
.h3-pie .circle3 {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 3px solid #6282ef;
  position: absolute;
  margin-left: -25px;
  margin-top: 10px;
}
.state_footer {
  width: 100%;
  border-top: 1px solid #e3e7f0;
  background: white;
  display: flex;
  height: 50px;
  text-align: center;
  justify-content: space-around;
  padding: 10px 0px;
}
.temperature_footer {
  width: 100%;
  background: white;
  /*display: flex;*/
  height: 50px;
  text-align: center;
  /*justify-content: space-around;*/
  padding: 0px 0px 10px;
}
.temperature_footer .h3-tem {
  font-size: 17px;
  color: #808080;
  text-align: left;
  margin-left: 40%;
  white-space: nowrap;
  padding: 15px 0px;
  position: relative;
}
.temperature_footer .circle1 {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 3px solid #ffc600;
  position: absolute;
  margin-left: -25px;
  margin-top: 6px;
}
.temperature_footer .circle2 {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 3px solid #fa5e5f;
  position: absolute;
  margin-left: -25px;
  margin-top: 6px;
}
.temperature_footer .circle3 {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 3px solid #ff8d8d;
  position: absolute;
  margin-left: -25px;
  margin-top: 6px;
}
.temperature_footer .circle4 {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 3px solid #7ec855;
  position: absolute;
  margin-left: -25px;
  margin-top: 6px;
}
.temperature_footer .circle5 {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 3px solid #a4b8ff;
  position: absolute;
  margin-left: -25px;
  margin-top: 6px;
}
.temperature_footer .circle6 {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 3px solid #6282ef;
  position: absolute;
  margin-left: -25px;
  margin-top: 6px;
}
.h5-pie .circle {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  position: absolute;
  margin-left: -25px;
  margin-top: 4px;
}
.h5-pie .circle1 {
  border: 3px solid #00b2ee;
}
.h5-pie .circle2 {
  border: 3px solid #01cc60;
}
.h5-pie .circle3 {
  border: 3px solid #a485fa;
}
.h5-pie .circle4 {
  border: 3px solid #f18970;
}
.h5-pie .circle5 {
  border: 3px solid #f3da63;
}
.h5-pie .circle6 {
  border: 3px solid #10d1b4;
}
.h5-pie .circle7 {
  border: 3px solid #7bc854;
}
</style>
