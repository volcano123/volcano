<template>
  <div>
    <nav class="main_title">
      供热季:
      <el-select v-model="value" placeholder="请选择供热季">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
      <label class="padding-left">地域区域:</label>
      <el-select v-model="value" placeholder="请选择地域区域">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <label class="padding-left"></label>
      <el-input style="width:280px !important" placeholder="请输入内容" v-model="searchValue" clearable>
      </el-input>
      <label style="padding-left:10px"></label>
      <el-button type="warning">查询</el-button>
    </nav>

    <!-- 内容区域 -->
    <main class="p_yulan_main">
      <nav v-for="(item, index) in chartList" :key="index">
        <div class="content_title">
          <div class="content_title_left">
            <i class="iconfont icon-fangchanfangzi"></i>
            <h2>吴占华</h2>
            <span>118474</span>
          </div>
          <div class="content_title_right">
            <i class="iconfont icon-xinxi3" @click="dialogTableVisible = true"></i>
          </div>
        </div>
        <div class="content_echart" style="width:100%;">
          <h1>22˚C</h1>
          <div style="width:100%;">
            <Chart :id='`chartMain${index}`' :option="chartData" :chartList="chartList[index]" />
        </div>
        </div>
        <div class="content_footer">
          <i class="iconfont icon-caijiguanli"></i>
          <i class="iconfont icon-fangchanfangzi"></i>
          <i class="iconfont icon-famen"></i>
        </div>
      </nav>
    </main>

    <!-- 弹框 -->
    <el-dialog title="详细信息" :visible.sync="dialogTableVisible">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基础信息" name="first">
          <el-table :data="gridData">
            <el-table-column property="date" label="房屋编号" width="150"></el-table-column>
            <el-table-column property="name" label="姓名" width="200"></el-table-column>
            <el-table-column property="address" label="房屋类型"></el-table-column>
            <el-table-column property="mianji" label="面积"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="收费情况" name="second">收费情况</el-tab-pane>
        <el-tab-pane label="报修情况" name="third">报修情况</el-tab-pane>
        <el-tab-pane label="开关阀情况" name="fourth">开关阀情况</el-tab-pane>
        <el-tab-pane label="室温情况" name="five">室温情况</el-tab-pane>
      </el-tabs>

    </el-dialog>
  </div>
</template>

<script>
import Chart from "base/chart/charts";
import { option } from "src/components/hotHomePreview/option";
import { postData } from "src/util/base.js";
export default {
  data() {
    return {
      value: "",
      activeName: "first",
      dialogTableVisible: false,
      chartData: option,
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          mianji: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          mianji: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          mianji: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          mianji: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      searchValue: "",
      /* echart */
      // 初始化空对象
      chart: null,
      // 初始化图表配置
      chartList: [],
      scrollHeight: 50
    };
  },
  components: {
    Chart
  },
  methods: {},
  // keypoint：执行方法
  // “将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。”
  created() {
    postData("http://rap2api.taobao.org/app/mock/8179/POST/searchUser.vue", {
      id: 1,
      username: "123"
    })
      .then(res => {
        this.chartList = res.data.list;
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    // 缓存指针
    let _this = this;
    // 设置一个开关来避免重负请求数据
    let sw = true;
    // 注册scroll事件并监听
    document
      .getElementsByTagName("main")[0]
      .addEventListener("scroll", function() {
        // 判断是否滚动到底部
        if (
          document.getElementsByTagName("main")[0].scrollTop >=
          _this.scrollHeight
        ) {
          // 如果开关打开则加载数据
          if (sw == true) {
            // 将开关关闭
            sw = false;
            postData(
              "http://rap2api.taobao.org/app/mock/8179/POST/searchUser.vue",
              { id: 1 }
            )
              .then(res => {
                _this.scrollHeight += document.getElementsByTagName(
                  "main"
                )[0].clientHeight;
                _this.chartList = _this.chartList.concat(res.data.list);
                // 数据更新完毕，将开关打开
                sw = true;
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        }
      });
  }
};
</script>

<style lang="scss" scoped>
.main_title {
  background: white;
  padding: 10px 20px;
  border: 1px solid #e0e0e0;
  min-width: 952px;
  width: 100%;
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

main.p_yulan_main nav:hover {
  box-shadow: 0px 15px 36px rgba(0, 0, 0, 0.2);
}
.content_title {
  height: 75px;
  line-height: 75px;
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
</style>
