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
      <el-button type="warning"  @click='downloadMater()'size="small" plain>导出excel</el-button>
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
          <el-table-column label="操作"       fixed="right">
            <template slot-scope="scope" >
              <el-button type="warning"  size="small" @click="downloadMater()" plain>图示</el-button>
            </template>
          </el-table-column>
        </el-table>
      </nav>
    <nav>
      <el-table :data="tableData1"    stripe id="out-table1" border  style="width: 100%"  max-height="500">
        <el-table-column prop="name" label="姓名" ></el-table-column>
        <el-table-column prop="account"  label="操作人工号" ></el-table-column>
        <el-table-column prop="date" label="操作时间" ></el-table-column>
        <el-table-column prop="errorContent" label="异常描述" ></el-table-column>
        <el-table-column prop="isError" label="是否异常" ></el-table-column>
        <el-table-column prop="isJurisdiction" label="操作权限" ></el-table-column>
        <el-table-column prop="funcDetail" label="功能描述" ></el-table-column>
        <el-table-column prop="sysName" label="系统描述" ></el-table-column>
        <el-table-column label="操作"       fixed="right">
          <template slot-scope="scope" >
            <el-button type="warning" size="small"  @click="downloadMater()" plain>图示</el-button>
          </template>
        </el-table-column>
      </el-table>
    </nav>
    </main>
  </div>
  <!--内容区域-->


</template>

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
        tableData:[{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        tableData1:[{
          date: '2016-05-03',
          name: '111',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '111',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '2016',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '2016',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '2016',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '2016',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '2016',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      };
    },
    methods: {

      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
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
        var num = row[column.property].toFixed(2);
        return num
      },
      downloadMater (){
        const defaultCellStyle =  { font: { name: "Verdana", sz: 11, color: "FF00FF88"}, fill: {fgColor: {rgb: "FFFFAA00"}}};
        const wopts = { bookType:'xlsx', bookSST:false, type:'binary', defaultCellStyle: defaultCellStyle, showGridLines: false};
        const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} };
        console.log(wb)
        let data = this.tableData
        wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data)
        //创建二进制对象写入转换好的字节流
        let tmpDown =  new Blob([this.s2ab(XLSX.write(wb, wopts))], { type: "application/octet-stream" })
        FileSaver.saveAs(tmpDown, "日志信息.xlsx");
      },
      //字符串转字符流
      s2ab (s) {
        if (typeof ArrayBuffer !== 'undefined') {
          var buf = new ArrayBuffer(s.length);
          var view = new Uint8Array(buf);
          for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
          return buf;
        } else {
          var buf = new Array(s.length);
          for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
          return buf;
        }
      },
      exportExcel () {
        /* generate workbook object from table */
        var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        console.log(wb)
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        console.log(wbout)
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '日志信息.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      },
    },
    mounted() {
    },
    created() {

    },
  }
</script>
<style>
  .el-row {
    margin-bottom: 20px;}
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-tabs__item{
    color:#5f5f5f;
  }
  .el-button--warning {
    border-color: #f6f6f6;
    border-width: 1px;
  }
  .el-dialog__title{
    font-size:14px;
    color: #5f5f5f;
    line-height: 10px;
  }
  .el-dialog__body{
    padding: 20px 0px 10px;
  }
  .el-dialog{
    width:70%
  }
  .el-select .el-input__inner:focus{
    border: 1px solid #dcdfe6;
  }
  .el-table th, .el-table td {
    padding: 5px 0;
  }
  .el-table thead tr th {
    background-color: #f8faff;
    border-right: 0px solid #ebeef5;
  }
  .el-table thead tr th:last-child {
    background-color: #f8faff;
    border-right: 1px solid #ebeef5;
  }
  .el-tabs__header {
    margin: -10px -20px 15px;
    background-color: #f6f6f6;
  }
  .el-dialog__header {
    background-color: #f6f6f6;
    border-bottom: 1px solid #e0e0e0;
  }
  .el-tabs__nav{
    margin-left:30px;
  }
  .el-table .cell{
    white-space: nowrap;
  }
</style>
<style lang="scss" scoped>

  .tableheader{
    background-color: #000;
  }
  .text{
    color:#7dc855;
  }
  .el-button--warning.is-plain {
    margin:15px 0px 0px 0px;
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
    z-index: 9999999;
    position: inherit;
  }
  .main_content {
    background-color: white;
    padding: 10px 10px;
    min-width: 952px;
    width: 100%;
    border: 1px solid #e0e0e0;
    color: #5f5f5f;
    box-sizing: border-box;
  }
  .main_charge{
    background: #f9fafc;
    padding: 10px 15px;
    border: 1px solid #e0e0e0;
    width: 100%;
    color:#5f5f5f;
    font-size: 14px;
    min-width: 952px;
    margin-top:20px;
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
  .rose_txt{
    margin-top:25px;
  }
  .rose_txt  .h5-pie{
    font-size: 14px;
    color: #575757;
    margin: 15px  0px;
    font-weight:800;
    position: relative;
    border-bottom: 0px solid #e8e9ee;
  }
  .rose_txt  .h5-pie span{
    font-size: 14px;
    color: #988f90;
  }
  .h5-pie .circle{
    width: 7px;
    height: 7px;
    border-radius: 50%;
    position: absolute;
    margin-left: -25px;
    margin-top:4px;
    border: 3px solid #00b2ee;
  }
  .h5-pie .circle1{
    border: 3px solid #01cc60;
  }
  .h5-pie .circle2{
    border: 3px solid #a485fa;
  }
  .h5-pie .circle3{
    border: 3px solid #f18970;
  }
  .h5-pie .circle4{
    border: 3px solid #f3da63;
  }
  .h5-pie .circle5{
    border: 3px solid #10d1b4;
  }
  .h5-pie .circle6{
    border: 3px solid #7bc854;
  }
  .h5-pie .circle7{
    border: 3px solid #63ecf3;
  }
  .grid-content .border{
    float: left;
  }
  .grid-content .border .border-echart{
    float: left; position: relative;
  }
</style>
