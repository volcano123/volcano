<template>
  <div class="main">
    <nav >
      <div class="block main_title">
        <span class="demonstration">操作时间：</span>
        <el-date-picker  size="small"
          v-model="value"
          type="daterange"
          align="right"
          unlink-panels @change="change()"
          range-separator="-"
          start-placeholder="开始日期"   value-format="yyyy-MM-dd hh:mm:ss"
          end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>

      <label class="padding-left"></label>
      <el-input  size="small" style="width:280px !important" prefix-icon="el-icon-search" placeholder="请输入查询信息" v-model="searchValue" clearable>
      </el-input>
      <label style="padding-left:10px"></label>
      <el-button type="warning" @click="change()" class="button-search">查询</el-button>
      </div>
      <el-button type="warning"  @click='exportExcel()' size="small" plain>导出excel</el-button>
    </nav>
    <main>
      <nav >
        <el-table :data="tableData"    stripe id="out-table" border  style="width: 100%"  max-height="500">
          <el-table-column prop="name" label="姓名" ></el-table-column>
          <el-table-column prop="account"  label="操作人工号" ></el-table-column>
          <el-table-column prop="date" label="操作时间" ></el-table-column>
          <el-table-column prop="errorContent" label="异常描述" ></el-table-column>
          <el-table-column prop="isError" label="是否异常" ></el-table-column>
          <el-table-column prop="isJurisdiction" label="操作权限" ></el-table-column>
          <el-table-column prop="funcDetail" label="功能描述" ></el-table-column>
          <el-table-column prop="sysName" label="系统描述" ></el-table-column>
        </el-table>
      </nav></main>
  </div>
  <!--内容区域-->


</template>
<style>
  .el-table thead tr th {
    background-color: #f8faff;
    border-right: 0px solid #ebeef5;
  }
  .el-button--warning {
    border-color: #f6f6f6;
    border-width: 1px;
  }
</style>
<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  import { getData } from "src/util/base.js";
  export default {

    data() {
      return {
        dialogTableVisible: false,
        searchValue: "",
        value: '',
        scrollHeight: 50,
        tableData:[],
      };
    },
    methods: {
      change(){
        if(this.value==null){
          getData("http://172.18.5.182:5999/iheat/htc/houLog/getLogMessage.do", {
            startTime:"",
            endTime:"",
            queryMes:this.searchValue
          }).then(res => {
            this.tableData = res.data.list;
        }).catch(err => {});
        } else{
          getData("http://172.18.5.182:5999/iheat/htc/houLog/getLogMessage.do", {
            startTime:this.value[0],
            endTime:this.value[1],
            queryMes:this.searchValue
          }).then(res => {
            this.tableData = res.data.list;
        }).catch(err => {});
        }

    },
     tofixed:function(row, column) {
      if(row[column.property]!=null){
         var num = row[column.property].toFixed(2);
        return num
      }},
      exportExcel () {
        /* generate workbook object from table */
        var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '日志信息.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      },
    },
    mounted() {
    },
    created() {
      getData("http://172.18.5.182:5999/iheat/htc/houLog/getLogMessage.do", {
        startTime:"2018-04-19 15:14:59",
        endTime:"2018-04-19 15:16:22"
      })
        .then(res => {
        this.tableData = res.data.list;
      console.log(res.data.list)
    })
    .catch(err => {
        console.log(err);
    });
    },
  }
</script>

<style lang="scss" scoped>
  .tableheader{
    background-color: #000;
  }
  .el-button--warning.is-plain {
    margin:15px 0px;
    background: #fff;
  }
  .el-button--warning.is-plain:hover {
    background: #e6a23c;
  }
  .el-button--warning.is-plain:active {
    background: #e6a23c;
  }
  .el-button--warning.is-plain:focus{
    background: #fff;
    color:#e6a23c;
  }
  .button-search {
    color: #fff;
    background: -webkit-linear-gradient(left, #fb816c , #fbb06d);
    padding: 8px 30px;
  }
  .main{
    background-color: #fff;
    padding: 10px 20px;
    min-width: 952px;
    border: 1px solid #cbcbcb;
    width: 100%;
    box-sizing: border-box;
  }
  .main_title {
    background-color: #f6f6f6;
    padding: 10px 20px;
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
  .demonstration{
    color:#5f5f5f;
    font-size: 14px;
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
