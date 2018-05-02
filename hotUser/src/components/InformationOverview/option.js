export const option = {
  title: {
    text: '收费金额',
  },
  xAxis: {
    type: "category",
    data: ['已收', '减免', '免费']
  },
  color: ['#3398DB'],
  tooltip : {
    trigger: 'axis',
    formatter: "{c}",
    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  yAxis: {
    type: "value",
    show: true
  },
  grid: {
    left: '10%',
    right: '0%',
    bottom: '10%',
    top:'20%',
    containLabel: true
  },
  series: [{
    data: [1, 160, 150],
    type: 'bar',
    barWidth: '40%',
    itemStyle: {
      normal: {
        //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
        color: function (params) {
          // build a color map as your need.
          var colorList = [
            '#ffc300', '#7ec855', '#6282ef'
          ];
          return colorList[params.dataIndex]
        }
      }
    }
  }]

};
export const option1 = {
  title: {
    text: '户数比例',
  },
  tooltip: {
    trigger: 'item',
    formatter: "{c} ({d}%)"
  },
  xAxis: {
    show: false,
    type: "category",
    boundaryGap: false
  },
  series: [
    {
      data:[
        {value:0},
        {value:0},
        {value:0}
      ],
      smooth: true,
      barGap: "-100%",
      symbolSize: 10,
      animation: true,
      type:'pie',
      radius: ['45%', '70%'],
      itemStyle: {
        normal: {
          //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
          color: function (params) {
            // build a color map as your need.
            var colorList = [
              '#ffc300', '#7ec855', '#6282ef'
            ];
            return colorList[params.dataIndex]
          },
          borderColor: "#FFFFFF", borderWidth: 7,
        }
      },
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '18',
            fontWeight: 'bold'
          }
        }
      },
    }
  ]
};
export const option2 =  {
  title : {
    y:'center',
    x:'center'
  },
  tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  xAxis: {
    show: false,
    type: "category",
    boundaryGap: false
  },
  series : [
    {
      name: '供暖状态情况',
      type: 'pie',
      radius : '60%',
      center: ['50%', '60%'],
      itemStyle: {
        normal: {
          //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
          color: function (params) {
            // build a color map as your need.
            var colorList = [
              '#6282ef' , '#7ec855', '#ffc300'
            ];
            return colorList[params.dataIndex]
          },
          borderColor: "#FFFFFF", borderWidth: 1,
        }
      },
      label: {
        normal: {
          formatter: '{a|{d}%}\n{b|{b}}',
          padding: [50, 0],
          rich: {
            a: {
              fontSize: 16,
              lineHeight: 20
            },
            hr: {
              width: '100%',
              borderWidth: 0.5,
              height: 0
            },
            b: {
              fontSize: 12,
              lineHeight: 20,
              left:'100px',
              color: '#969291'
            }
          }
        }
      },
      data:[
        {value:500, name:'未用暖'},
        {value:210, name:'供暖'},
        {value:135, name:'停暖'}
      ]
    }
  ]
};
export const option3 =  {
  tooltip: {
    trigger: 'axis',
      axisPointer: {
      type: 'shadow',
        formatter: "{a} <br/>{b}"
    }
  },
  grid: {
    left: '3%',
      right: '0%',
      bottom: '5%',
      top:'5%',
      containLabel: true
  },
  xAxis: {
    type: 'value',
      boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
      data: ['离线','高温报警','高温','常温','低温','低温报警']
  },
  series: [
    {
      name: '',
      type: 'bar',
      barWidth: '60%',
      data: [10, 20, 36, 40, 50, 100],
      itemStyle: {
        normal: {
          //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
          color: function (params) {
            // build a color map as your need.
            var colorList = [
              '#e5e5e5', '#fa5e5f' ,'#ff8d8d' , '#7ec855','#a4b8ff','#6282ef'
            ];
            return colorList[params.dataIndex]
          }
        }
      },
    },
  ]
};
export const option4 = {
  title :{
    text :'工单处理\n比例',
    textStyle:{
      color:'#878e98',
      fontSize:'20',
    },
    x:'center',
    y:'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: "{b} <br/>{c} ({d}%)"
  },
  xAxis: {
    show: false,
    type: "category",
    boundaryGap: false
  },
  series: [
    {
      name:'',
      type:'pie',
      radius: ['60%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        normal: {
          //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
          color: function (params) {
            // build a color map as your need.
            var colorList = [
              '#64b9f2', '#a7c563'
            ];
            return colorList[params.dataIndex]
          }
        }
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
        {value:5579, name:'正在处理工单'},
        {value:1335, name:'已处理工单'}
      ]
    }
  ]
};
export const option5 = {
  title :{
    text :'工单审核\n比例',
    x:'center',
    y:'center',
    textStyle:{
      color:'#878e98',
      fontSize:'20',
    }
  },
  xAxis: {
    show: false,
    type: "category",
    boundaryGap: false
  },
  tooltip: {
    trigger: 'item',
    formatter: "{b}<br/> {c} ({d}%)"
  },
  series: [
    {
      name:'',
      type:'pie',
      radius: ['60%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        normal: {
          //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
          color: function (params) {
            // build a color map as your need.
            var colorList = [
              '#ff513e', '#f8bc42'
            ];
            return colorList[params.dataIndex]
          }
        }
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
        {value:1500, name:'已审核'},
        {value:1335, name:'未审核'}
      ]
    }
  ]
};
export const option6 = {
  tooltip : {
    trigger: 'item',
    formatter: "{b}<br/>  ({c}%) "
  },
  xAxis: {
    show: false,
    type: "category",
    boundaryGap: false
  },
  calculable : true,
  series : [
    {
      name:'',
      type:'pie',
      radius : [30, 110],
      center : ['50%', '50%'],
      roseType : 'area',
      itemStyle: {
        normal: {
          shadowBlur: 50,
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
          color: function (params) {
            // build a color map as your need.
            var colorList = [
              '#00b2ee','#01cc60','#a485fa','#f18970','#f3da63','#10d1b4','#7bc854'
            ];
            return colorList[params.dataIndex]
          }
        }
      },
      grid: {
      left: '30%',
      right: '0%',
      bottom: '5%',
      top:'5%',
      containLabel: true
    },
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      data:[
        {value:10, name:'室内不热'},
        {value:11, name:'房屋漏水'},
        {value:12, name:'楼栋漏水'},
        {value:13, name:'单元漏水'},
        {value:14, name:'更换配件'},
        {value:15, name:'开锁闭阀'},
        {value:16, name:'测温'}
      ]
    }
  ]
};

export const option7 = {
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
    text: '9012',
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
      name:'室温采集器情况',
      type:'pie',
      radius: ['42%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        normal: {
          //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
          color: function (params) {
            // build a color map as your need.
            var colorList = [
              '#6282ef', '#ffc300', '#7ec855'
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
        {value:234, name:'报警',selected:true}
      ]
    }
  ]
};
export const option8 = {
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
    text: '9012',
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
      name:'室温控制器情况',
      type:'pie',
      radius: ['42%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        normal: {
          //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
          color: function (params) {
            // build a color map as your need.
            var colorList = [
              '#6282ef', '#ffc300', '#7ec855'
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
        {value:150, name:'报警',selected:true}
      ]
    }
  ]
};
export const option9 = {
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
    text: '9012',
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
      name:'室温采集器情况',
      type:'pie',
      radius: ['42%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        normal: {
          //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
          color: function (params) {
            // build a color map as your need.
            var colorList = [
              '#6282ef', '#ffc300', '#7ec855'
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
        {value:234, name:'报警',selected:true}
      ]
    }
  ]
};

