<template>
    <div :id="id" :style="style" ></div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "Chart",
  data() {
    return {
      //echarts实例
      chart: ""
    };
  },
  props: {
    //父组件需要传递的参数：id，width，height，option
    id: {
      type: String
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "150px"
    },
    option: {
      type: Object
    },
    chartList: {
      type: Object
    }
  },
  computed: {
    style() {
      return {
        height: this.height,
        width: this.width
      };
    }
  },
  mounted() {

    this.init();
    this.chart = echarts.init(document.getElementById(this.id));
//    this.chart.on('click', (params) => {
//      this.$emit('changecart',params.name.split("-")[0])
//  });
////    this.chart.on('click', function (params) {
////      ()=>  this.$emit('changecart',params.name.split("-")[0])
////      });

    window.addEventListener("resize", this.chart.resize);
  },
  methods: {
    init:function() {
      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption(this.option);
      if(this.id=="overviewchart"){
        this.chart.setOption({
          xAxis: {},
          animation:true,
          series: [
            {data: this.chartList.chargeMoneyList}
          ]
        });
      }else if(this.id=="overviewchart1"){
        this.chart.setOption({
          xAxis: {},
          animation:true,
          series: [
            {data: this.chartList.chargeMoneyNumList}
          ]
        });
      }else if(this.id=="overviewchart2"){
        var arr=[]
        arr.push({"value":this.chartList.heatStatusMap[0],"name":"供暖"})
        arr.push({"value":this.chartList.heatStatusMap[1],"name":"停暖"})
        arr.push({"value":this.chartList.heatStatusMap[2],"name":"未用暖"})
        this.chart.setOption({
          xAxis: {},
          animation:true,
          series: [
            {data: arr}
          ]
        });
      }
      else if(this.id=="overviewchart3"){
        this.chart.setOption({
          xAxis: {},
          animation:true,
          series: [
            {data: this.chartList.houseTempMap}
          ]
        });
      }
      else if(this.id=="overviewchart4"){
        var arr=[]
        arr.push({"value":this.chartList.handleRepairMap[0],"name":"正在处理工单"})
        arr.push({"value":this.chartList.handleRepairMap[1],"name":"已处理工单"})
        this.chart.setOption({
          xAxis: {},
          animation:true,
          series: [
            {data: arr}
          ]
        });
      }
      else if(this.id=="overviewchart5"){
        var arr=[]
        arr.push({"value":this.chartList.checkRepairMap[0],"name":"已审核"})
        arr.push({"value":this.chartList.checkRepairMap[1],"name":"未审核"})
        this.chart.setOption({
          xAxis: {},
          animation:true,
          series: [
            {data: arr}
          ]
        });
      }
      else if(this.id=="overviewchart6"){
        var arr=[]
        arr.push({"value":this.chartList.repairTypeMap[0],"name":"室内不热"})
        arr.push({"value":this.chartList.repairTypeMap[1],"name":"房屋漏水"})
        arr.push({"value":this.chartList.repairTypeMap[2],"name":"楼栋漏水"})
        arr.push({"value":this.chartList.repairTypeMap[3],"name":"单元漏水"})
        arr.push({"value":this.chartList.repairTypeMap[4],"name":"更换配件"})
        arr.push({"value":this.chartList.repairTypeMap[5],"name":"开锁闭阀"})
        arr.push({"value":this.chartList.repairTypeMap[6],"name":"测温"})
        arr.push({"value":this.chartList.repairTypeMap[7],"name":"未分户停暖核查"})
        this.chart.setOption({
          xAxis: {},
          animation:true,
          series: [
            {data: arr}
          ]
        });
      }
      else if(this.id=="overviewchart7"){
        var arr=[]
        arr.push({"value":this.chartList.autoValveMap[1],"name":"正常"})
        arr.push({"value":this.chartList.autoValveMap[3],"name":"离线"})
        arr.push({"value":this.chartList.autoValveMap[2],"name":"报警","selected":true})
        this.chart.setOption({
          title:  [{
            text: '自力式调节阀情况',
            textStyle:{
              color:'#3a3a3a',
              fontSize:'20',
              left: 'center'
            }}, {
            text: '装置总数',
            left: '48%',
            top: '42%',
            textAlign: 'center',
            textBaseline: 'middle',
            textStyle: {
              color: '#666',
              fontWeight: '600',
              fontSize: 18
            }
          },{
            text: this.chartList.autoValveMap[0],
            left: '48%',
            top: '52%',
            textAlign: 'center',
            textBaseline: 'middle',
            textStyle: {
              color: '#2f3b4b',
              fontWeight: '600',
              fontSize: 20
            }
          }],
          xAxis: {},
          animation:true,
          series: [
            {data: arr}
          ]
        });
      }
      else if(this.id=="overviewchart8"){
        var arr=[]
        arr.push({"value":this.chartList.tempControlMap[0],"name":"正常"})
        arr.push({"value":this.chartList.tempControlMap[2],"name":"离线"})
        arr.push({"value":this.chartList.tempControlMap[1],"name":"报警","selected":true})
        this.chart.setOption({
          title:  [{
            text: '室温控制器情况',
            textStyle:{
              color:'#3a3a3a',
              fontSize:'20',
              left: 'center'
            }}, {
            text: '装置总数',
            left: '48%',
            top: '42%',
            textAlign: 'center',
            textBaseline: 'middle',
            textStyle: {
              color: '#666',
              fontWeight: '600',
              fontSize: 18
            }
          },{
            text: (parseFloat(this.chartList.tempControlMap[0])+parseFloat(this.chartList.tempControlMap[1])+parseFloat(this.chartList.tempControlMap[2])).toFixed(2),
            left: '48%',
            top: '52%',
            textAlign: 'center',
            textBaseline: 'middle',
            textStyle: {
              color: '#2f3b4b',
              fontWeight: '600',
              fontSize: 20
            }
          }],
          xAxis: {},
          animation:true,
          series: [
            {data: arr}
          ]
        });
      }
      else if(this.id=="overviewchart9"){
        var arr=[]
        arr.push({"value":this.chartList.tempSensingMap[0],"name":"正常"})
        arr.push({"value":this.chartList.tempSensingMap[2],"name":"离线"})
        arr.push({"value":this.chartList.tempSensingMap[1],"name":"报警","selected":true})
        this.chart.setOption({
          title:  [{
            text: '室温传感器情况',
            textStyle:{
              color:'#3a3a3a',
              fontSize:'20',
              left: 'center'
            }}, {
            text: '装置总数',
            left: '48%',
            top: '42%',
            textAlign: 'center',
            textBaseline: 'middle',
            textStyle: {
              color: '#666',
              fontWeight: '600',
              fontSize: 18
            }
          },{
            text: (parseFloat(this.chartList.tempSensingMap[0])+parseFloat(this.chartList.tempSensingMap[1])+parseFloat(this.chartList.tempSensingMap[2])).toFixed(2),
            left: '48%',
            top: '52%',
            textAlign: 'center',
            textBaseline: 'middle',
            textStyle: {
              color: '#2f3b4b',
              fontWeight: '600',
              fontSize: 20
            }
          }],
          xAxis: {},
          animation:true,
          series: [
            {data: arr}
          ]
        });
      }
    }
  }
};
</script>
