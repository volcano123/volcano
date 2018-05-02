import echarts from "echarts";
export const option = {
  xAxis: {
    type: "category",
    data: ['已收', '减免', '免费']
  },
  color: ['#3398DB'],
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    },
    formatter: function (params) {
      var res='<div id="params"><p><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+params[0].color+';"></span>'+params[0].seriesName+'：'+params[0].value+'</p></div>'
      for(var i=4;i<params.length;i++){
        res+='<p><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+params[i].color+';"></span>'+params[i].seriesName+':'+params[i].value+'</p>'
      }
      return res;
    },
  },
  yAxis: {

  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '10%',
    top:'20%',
    containLabel: true
  },
  series:
    [

      {
        name:'总金额',
        show:false,
        type: 'line',
        color:"#dd6b66",
        data: [220, 182, 191, 234, 290, 330, 310].map(function(val) {
          return val*1
        })
      },
      {
        name:'已缴金额',
        show:false,
        type: 'line',
        color:"#ffc300",
        data: [220, 182, 191, 234, 290, 330, 310].map(function(val) {
          return val*1
        })
      },
      {
        show:false,
        type: 'line',
        color:"#7ec855",
        data: [220, 182, 191, 234, 290, 330, 310].map(function(val) {
          return val*1
        })
      },
      {

        type: 'line',
        color:"#6282ef",
        show:false,
        data: [220, 182, 191, 234, 290, 330, 310].map(function(val) {
          return val*1
        })
      },

      {
        name:'已缴金额',
        type: 'bar',
        stack:'1',
        barWidth:'15%',
        color:"#ffc300",
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name:'欠费金额',
        type: 'bar',
        stack:'1',
        barWidth:'15%',
        color:"#7ec855",
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name:'减免金额',
        type: 'bar',
        stack:'1',
        barWidth:'15%',
        color:"#6282ef",
        data: [220, 182, 191, 234, 290, 330, 310]
      }
    ]
};
export const option1 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        color: '#ddd'
      }
    },
    backgroundColor: 'rgba(255,255,255,1)',
    padding: [15, 10],
    textStyle: {
      color: '#7588E4',
    },
    extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
  },
  xAxis: {
    type: 'category',
    data:[],
    boundaryGap: false,
    splitLine: {
      show: true,
      interval: 'auto',
      lineStyle: {
        color: ['#D4DFF5']
      }
    },
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#609ee9'
      }
    },
    axisLabel: {
      margin: 10,
      textStyle: {
        fontSize: 14
      }
    }
  },
  yAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        color: ['#D4DFF5']
      }
    },
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#609ee9'
      }
    },
    axisLabel: {
      margin: 10,
      textStyle: {
        fontSize: 14
      }
    }
  },
  series: [
    {
      data: [18, 15, 26, 22],
      type: "line",
      smooth: true,
      barGap: "-100%",
      symbolSize: 10,
      animation: true,
      color: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "#86cc62" // 0% 处的颜色
          },
          {
            offset: 1,
            color: "#86cc62" // 100% 处的颜色
          }
        ],
        globalCoord: false // 缺省为 false
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#f0f9f7" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#f0f9f7" // 100% 处的颜色
            }
          ]
        }
      }
    }
  ]
};
export const option2 = {
  title:[{
      text: '报修类型',
      left: '48%',
      top: '49%',
      textAlign: 'center',
      textBaseline: 'middle',
      textStyle: {
        color: '#666',
        fontWeight: '600',
        fontSize: 18
      }
  }],
  xAxis: {
    show: false,
    type: "category",
    boundaryGap: false
  },
  tooltip: {
    trigger: 'item',
    formatter: "{b} <br/> {c} ({d}%)"
  },
  series: [
    {
      name:'报修情况',
      type:'pie',
      radius: ['42%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        normal: {
          //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
          color: function (params) {
            // build a color map as your need.
            var colorList = [
              '#00b2ee','#01cc60','#a485fa','#f18970','#f3da63','#10d1b4','#7bc854','#63ecf3'
            ];
            return colorList[params.dataIndex]
          },
          borderColor: "#FFFFFF", borderWidth: 3,
        },
      },
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: false,
          textStyle: {
            fontSize: '16',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data:[
        {value:335, name:'正常'},
        {value:310, name:'离线'},
        {value:234, name:'报警'}
      ]
    }
  ]
};
export const option3 = {
  xAxis: {
    type: "category",
    data: ['已收', '减免', '免费']
  },
  color: ['#3398DB'],
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    },
    formatter: function (params) {
      var res='<div id="params"></div>'
      for(var i=0;i<params.length;i++){
        res+='<p><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+params[i].color+';"></span>'+params[i].seriesName+':'+params[i].value+'</p>'
      }
      return res;
    },
  },
  yAxis: {

  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '10%',
    top:'20%',
    containLabel: true
  },
  series:
    [

      {
        name:'开阀业务次数',
        show:false,
        type: 'line',
        color:"#ffc300",
        data: [220, 182, 191, 234, 290, 330, 310].map(function(val) {
          return val*1
        })
      },
      { name:'关阀业务次数',
        show:false,
        type: 'line',
        color:"#7ec855",
        data: [220, 182, 191, 234, 290, 330, 310].map(function(val) {
          return val*1
        })
      },
      {
        name:'未用暖业务次数',
        type: 'line',
        color:"#6282ef",
        show:false,
        data: [220, 182, 191, 234, 290, 330, 310].map(function(val) {
          return val*1
        })
      }
    ]
};
export const option4 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        color: '#ddd'
      }
    },
    backgroundColor: 'rgba(255,255,255,1)',
    padding: [15, 10],
    textStyle: {
      color: '#7588E4',
    },
    extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
  },
  grid: {
    bottom:80
  },
  xAxis: {
    type: 'category',
    data:[],
    boundaryGap: false,
    splitLine: {
      show: true,
      interval: 'auto',
      lineStyle: {
        color: ['#D4DFF5']
      }
    },
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#609ee9'
      }
    },
    axisLabel: {
      margin: 10,
      textStyle: {
        fontSize: 14
      }
    }
  },
  yAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        color: ['#D4DFF5']
      }
    },
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#609ee9'
      }
    },
    axisLabel: {
      margin: 10,
      textStyle: {
        fontSize: 14
      }
    }
  },
  dataZoom: [{
    type: "slider",
    show: true,
    xAxisIndex: [0],
    handleSize: 15, //滑动条的 左右2个滑动条的大小
    height: 8, //组件高度
    left: "9%", //左边的距离
    right: "9%", //右边的距离
    bottom: "5%", //右边的距离
    handleColor: "#fff", //h滑动图标的颜色
    handleStyle: {
      borderColor: "#cacaca",
      borderWidth: "1",
      shadowBlur: 2,
      background: "#fff",
      shadowColor: "#fff"
    },
    fillerColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
      //给颜色设置渐变色 前面4个参数，给第一个设置1，第四个设置0 ，就是水平渐变
      //给第一个设置0，第四个设置1，就是垂直渐变
      offset: 0,
      color: "#1eb5e5"
    },
      {
        offset: 1,
        color: "#5ccbb1"
      }
    ]),
    backgroundColor: "#ddd", //两边未选中的滑动条区域的颜色
    showDataShadow: false, //是否显示数据阴影 默认auto
    showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
    handleIcon: "M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z",
    filterMode: "filter"
  },
    //下面这个属性是里面拖到
    {
      type: "inside",
      show: true,
      xAxisIndex: [0],
      start: 1,
      end: 100
    }
  ],
  series: [
    {
      data: [18, 15, 26, 22],
      type: "line",
      smooth: true,
      barGap: "-100%",
      symbolSize: 10,
      animation: true,
      color: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "#86cc62" // 0% 处的颜色
          },
          {
            offset: 1,
            color: "#86cc62" // 100% 处的颜色
          }
        ],
        globalCoord: false // 缺省为 false
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#f0f9f7" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#f0f9f7" // 100% 处的颜色
            }
          ]
        }
      }
    }
  ]
};
export const option5 = {
  title:[{
    text: '室温情况',
    left: '48%',
    top: '49%',
    textAlign: 'center',
    textBaseline: 'middle',
    textStyle: {
      color: '#666',
      fontWeight: '600',
      fontSize: 18
    }
  }],
  xAxis: {
    show: false,
    type: "category",
    boundaryGap: false
  },
  tooltip: {
    trigger: 'item',
    formatter: "{b} <br/> {c} ({d}%)"
  },
  series: [
    {
      name:'室温情况',
      type:'pie',
      radius: ['42%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        normal: {
          //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
          color: function (params) {
            // build a color map as your need.
            var colorList = [
              '#00b2ee','#01cc60','#a485fa','#f18970','#f3da63','#10d1b4','#7bc854'
            ];
            return colorList[params.dataIndex]
          },
          borderColor: "#FFFFFF", borderWidth: 3,
        },
      },
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: false,
          textStyle: {
            fontSize: '16',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data:[
      ]
    }
  ]
};
