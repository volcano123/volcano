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
    this.chart.on("click", params => {
      this.$emit("changecart", params.name.split("-")[0]);
    });
    //    this.chart.on('click', function (params) {
    //      ()=>  this.$emit('changecart',params.name.split("-")[0])
    //      });

    window.addEventListener("resize", this.chart.resize);
  },
  methods: {
    emit: function(data) {},
    init: function() {
      var owe = [];
      var reduce = [];
      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption(this.option);

      if (this.id == "statisticschart") {
        for (var i = 0; i < this.chartList.payList.length; i++) {
          owe.push(
            parseFloat(this.chartList.payList[i]) +
              parseFloat(this.chartList.oweList[i])
          );
        }
        for (var i = 0; i < this.chartList.payList.length; i++) {
          reduce.push(
            parseFloat(owe[i]) + parseFloat(this.chartList.reduceList[i])
          );
        }
        this.chart.setOption({
          xAxis: {
            data: this.chartList.heatPeroidList
          },
          animation: true,
          series: [
            { data: this.chartList.tatolList },
            { data: this.chartList.payList },
            { data: owe },
            { data: reduce },
            { data: this.chartList.payList },
            { data: this.chartList.oweList },
            { data: this.chartList.reduceList }
          ]
        });
      } else if (this.id == "statisticschart1") {
        this.chart.setOption({
          xAxis: {
            data: this.chartList.heatPeroidList
          },
          animation: true,
          series: [{ data: this.chartList.timeList }]
        });
      } else if (this.id == "statisticschart2") {
        var arr = [];
        for (var i = 0; i < this.chartList.repairTimeList.length; i++) {
          arr.push({
            value: this.chartList.repairTimeList[i],
            name: this.chartList.repairTypeList[i]
          });
        }
        this.chart.setOption({
          xAxis: {
            data: this.chartList.heatPeroidList
          },
          animation: true,
          series: [{ data: arr }]
        });
      } else if (this.id == "statisticschart3") {
        this.chart.setOption({
          xAxis: {
            data: this.chartList.heatPeroidList
          },
          animation: true,
          series: [
            { data: this.chartList.openValveList },
            { data: this.chartList.closeValveList },
            { data: this.chartList.unusedValveList }
          ]
        });
      } else if (this.id == "statisticschart4") {
        this.chart.setOption({
          xAxis: {
            data: this.chartList.timeList.map(function(str) {
              return str.replace(" ", "\n");
            })
          },
          animation: true,
          series: [{ data: this.chartList.tempList }]
        });
      } else if (this.id == "statisticschart5") {
        var arr = [];
        for (var i = 0; i < this.chartList.tempPerList.length; i++) {
          arr.push({
            value: this.chartList.tempPerList[i],
            name: this.chartList.tempPerNameList[i]
          });
        }
        this.chart.setOption({
          xAxis: {
            data: this.chartList.timeList
          },
          animation: true,
          series: [{ data: arr }]
        });
      }
    }
  }
};
</script>
