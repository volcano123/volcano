<template>
  <!-- 左边收缩图标 -->
  <div class="leftCollapse">
    <i class="el-icon-tickets" @click="showCollapse"></i>
  </div>
</template>

<script>
export default {
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
}
</script>

<style scoped>
.leftCollapse {
  width: 200px;
  background: #e9720c;
  transition: all 0.42s;
  text-align: center;
}
</style>

