<template>
  <div class="el-header" style="width:100%">
    <ake-header-left></ake-header-left>
    <ake-header-right></ake-header-right>
  </div>
</template>

<script>
import akeHeaderLeft from "components/header/headerLeft";
import akeHeaderRight from "components/header/headerRight";
export default {
  components: {
    akeHeaderLeft,
    akeHeaderRight
  }
};
</script>

<style scoped>
.el-header {
  padding: 0;
}

.container_title {
  display: flex;
  justify-content: space-between;
  background: #f5f6fa;
  padding: 8px 20px;
  font-size: 14px;
  border-bottom: 1px solid #bfbfbf;
  min-height: 20px;
}
</style>


