export const option = {
  xAxis: {
    show: false,
    type: "category",
    boundaryGap: false,
    data: ["16:00", "18:00", "20:00", "22:00"]
  },
  tooltip: {
    trigger: "axis",
    formatter: "{b}:00 - {c}˚c"
  },
  yAxis: {
    type: "value",
    show: false
  },
  grid: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
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
            color: "#f3981f" // 0% 处的颜色
          },
          {
            offset: 1,
            color: "#f67913" // 100% 处的颜色
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
              color: "#e68c00" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "white" // 100% 处的颜色
            }
          ]
        }
      }
    }
  ]
};
