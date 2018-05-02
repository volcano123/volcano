<template>
  <div>
    <el-container>
      <el-header>
        <!-- 左边收缩图标 -->
        <div class="leftCollapse">
          <i class="el-icon-tickets" @click="showCollapse"></i>
        </div>
        <header-right></header-right>
      </el-header>
      <el-container>
          <!-- 左边导航栏 -->
        <el-aside width="200px">
          <el-menu default-active="1" :router="true"  class="el-menu-vertical-demo" :collapse="isCollapse">

            <el-menu-item index="/alarmManagement">
              <i class="el-icon-menu"></i>
              <span slot="title">报警管理</span>
            </el-menu-item>
            <el-menu-item index="/hotHomePreview" >
              <i class="el-icon-document"></i>
              <span slot="title">热户预览</span>
            </el-menu-item>
            <el-menu-item index="/informationLog">
              <i class="el-icon-setting"></i>
              <span slot="title">信息日志</span>
            </el-menu-item>
            <el-menu-item index="/statistics">
              <i class="el-icon-setting"></i>
              <span slot="title">数据统计</span>
            </el-menu-item>
            <el-menu-item index="/informationOverview">
              <i class="el-icon-setting"></i>
              <span slot="title">信息总览</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 中间切换页面 -->
        <el-container>
          <div class="container_title">
            <div>
              你好，系统管理员!
            </div>
            <div>
              2018-02-27 11:41:25 星期二
            </div>
          </div>

          <el-main>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import hotHomePreview from "./hotHomePreview/hotHomePreview";
import headerRight from "components/header/headerRight";
export default {
  name: "Index",
  components: {
    hotHomePreview,
    headerRight
  },
  data() {
    return {
      isCollapse: false,
      mainWidth: document.body.clientWidth
    };
  },
  mounted: function() {
    const that = this;
  },
  methods: {
    showCollapse() {
      /* 实现点击toogle方法 点击缩小放大左边导航栏 */
      if (this.isCollapse) {
        /* 放大导航栏 */
        this.isCollapse = false;
        /* 点击图片背景变大 */
        document.getElementsByClassName("leftCollapse")[0].style.width =
          200 + "px";
        document.querySelector(".el-aside").style.width = 200 + "px";
        document.getElementsByClassName("rightCollapse")[0].style.width =
          "calc(100% - 200px)";
      } else {
        document.getElementsByClassName("leftCollapse")[0].style.width =
          64 + "px";
        this.isCollapse = true;
        document.querySelector(".el-aside").style.width = 64 + "px";
        /* title上面右边div宽度 */
        document.getElementsByClassName("rightCollapse")[0].style.width =
          "calc(100% - 64px)";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container_title {
  display: flex;
  justify-content: space-between;
  background: #f5f6fa;
  padding: 8px 20px;
  font-size: 14px;
  border-bottom: 1px solid #bfbfbf;
  min-height: 20px;
}
.el-aside {
  transition: all 0.42s;
}
.el-header {
  padding: 0;
}
.leftCollapse {
  width: 200px;
  background: #e9720c;
  transition: all 0.42s;
  text-align: center;
}
.rightCollapse {
  display: flex;
  justify-content: space-between;
  width: calc(100% - 200px);
  transition: all 0.42s;
}
.el-container {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.title {
  font-size: 25px;
  padding-left: 20px;
  a {
    font-size: 14px;
    color: #e9720c;
    text-decoration: none;
  }
}
.userOperating {
  float: right;
}
.userOperating .userOperating_menu {
  background: transparent !important;
  border: 0;
}
</style>
