<template>
  
  <div class="rightCollapse">
    <!-- 标题 -->
    <div class="title">
      吴忠市供热有限责任公司
      <a href="#">切换</a>
    </div>
    <!-- 右边用户操作项 -->
    <div class="userOperating">
      <el-menu class="userOperating_menu" mode="horizontal">
        <el-submenu index="1">
          <template slot="title">系统管理员</template>
          <el-menu-item index="1-1">修改密码</el-menu-item>
          <el-menu-item index="1-2">注销</el-menu-item>
        </el-submenu>
        <el-menu-item index="2">首页</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<style scoped lang="scss">

.rightCollapse {
  display: flex;
  justify-content: space-between;
  width: calc(100% - 200px);
  transition: all 0.42s;
}
.userOperating .userOperating_menu {
  background: transparent !important;
  border: 0;
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
</style>
