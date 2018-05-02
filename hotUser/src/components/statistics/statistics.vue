<template>
  <div class="main">
    <nav >
      <div class="" >
        <div class="">
          <el-tabs v-model="activeName" >
            <!--收费情况-->
            <el-tab-pane label="收费情况" name="first">
              <div class="block main_title">
                <el-row >
                  <el-col :span="8"><div class="grid-content bg-purple">
                    <span class="demonstration">供热季:</span>
                    <el-select  size="small" v-model="value" @change="change()" placeholder="请选择供热季">
                      <el-option v-for="item in quarter" :key="item.value" :label="item.供热季" :value="item.供热季Id">
                      </el-option>
                    </el-select>
                  </div></el-col>
                  <el-col :span="8"><div class="grid-content bg-purple">
                    <label class="demonstration" >地域区域:</label>
                    <el-cascader size="small" @change="change()" show-all-levels="false"
                                 expand-trigger="click"  change-on-select  clearable v-model="areavalue"
                                 :options="area"  :props="props"
                                 placeholder="请选择地域区域">
                    </el-cascader>
                  </div></el-col>
                  <el-col :span="8"><div class="grid-content bg-purple">
                    <label class="demonstration">供热状态:</label>
                    <el-select  size="small" v-model="heatvalue"  @change="change()" placeholder="请选择供热状态">
                      <el-option v-for="item in heat" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </div></el-col>
                </el-row>
                <el-row >
                  <el-col :span="8"><div class="grid-content bg-purple">
                <label class=" demonstration">缴费状态:</label>
                <el-select  size="small" v-model="chargevalue" @change="change()" placeholder="请选择缴费状态">
                  <el-option v-for="item in charge" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>      </div></el-col>
                  <el-col :span="10"><div class="grid-content bg-purple">

                <el-input  size="small" style="width:280px !important" prefix-icon="el-icon-search" placeholder="请输入查询信息" v-model="searchValue" clearable>
                </el-input>
                <label style="padding-left:10px"></label>
                <el-button type="warning" @click="change()" class="button-search">查询</el-button>
                  </div>
                  </el-col>
                </el-row>
              </div>
              <el-button type="warning"  style="margin-bottom: 15px;" size="small" @click='exportExcel(0,"收费情况")' plain>导出excel</el-button>
              <el-button type="warning"  style="margin-bottom: 15px;float:right" size="small" @click="chargedialog = true" plain>历史数据</el-button>
              <nav>
                <div class="" style="border-top:0px solid #000;position: relative;">
                  <el-table :data="tableData"   slot="append"   v-loading="loading" stripe id="out-table0" border  style="width: 100%"  max-height="300">
                    <el-table-column prop="code" label="房屋编码" ></el-table-column>
                    <el-table-column prop="name" label="姓名" ></el-table-column>
                    <el-table-column prop="addr" label="地址" ></el-table-column>
                    <el-table-column prop="cutMoney" :formatter="tofixed"   label="减免" ></el-table-column>
                    <el-table-column prop="heatStatus" label="供热状态" ></el-table-column>
                    <el-table-column prop="oweMoney" :formatter="tofixed" label="未缴" ></el-table-column>
                    <el-table-column prop="payMoney" :formatter="tofixed" label="已缴"></el-table-column>
                    <el-table-column prop="sumArea" :formatter="tofixed" label="面积"></el-table-column>
                    <el-table-column prop="sumMoney" :formatter="tofixed" label="应缴"></el-table-column>
                    <el-table-column prop="tapStatus" label="阀门状态"></el-table-column>
                  </el-table>
                </div>
              </nav>
            </el-tab-pane>
            <!--收费情况-->
            <!--报修情况-->
            <el-tab-pane label="报修情况" name="second">
              <div class="block main_title">
                <span class="demonstration">供热季:</span>
                <el-select  size="small" v-model="value1" @change="change1()" placeholder="请选择供热季">
                  <el-option v-for="item in quarter1" :key="item.value" :label="item.供热季" :value="item.供热季Id">
                  </el-option>
                </el-select>
                <label class="padding-left demonstration" >地域区域:</label>
                <el-cascader size="small" @change="change1()"
                             expand-trigger="click"  change-on-select  clearable v-model="areavalue1"
                             :options="area1"  :props="props"
                             placeholder="请选择地域区域">
                </el-cascader>
                <label class="padding-left demonstration">报修状态:</label>
                <el-select  size="small" v-model="rstatusvalue" @change="change1()" placeholder="请选择报修状态">
                  <el-option v-for="item in rstatus" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select><br><br>
                <label class=" demonstration">报修类型:</label>
                <el-select  size="small" v-model="rtypevalue" @change="change1()" placeholder="请选择报修类型">
                  <el-option v-for="item in rtype" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <label class="padding-left"></label>
                <el-input  size="small" style="width:280px !important" prefix-icon="el-icon-search" placeholder="请输入查询信息" v-model="searchValue1" clearable>
                </el-input>
                <label style="padding-left:10px"></label>
                <el-button type="warning" @click="change1()" class="button-search">查询</el-button>
              </div>
              <el-button type="warning"  style="margin-bottom: 15px;" size="small" @click='exportExcel(1,"报修情况")' plain>导出excel</el-button>
              <el-button type="warning"  style="margin-bottom: 15px;float:right" size="small" @click="repairdialog = true" plain>历史数据</el-button>
              <nav>
                <div class="" style="border-top:0px solid #000;position: relative;">
                  <el-table :data="tableData1"       v-loading="loading" stripe id="out-table1" border  style="width: 100%"  max-height="300">
                    <el-table-column prop="acceptDt" label="报修时间" ></el-table-column>
                    <el-table-column prop="addr" label="地址" ></el-table-column>
                    <el-table-column prop="category" label="报修类型" ></el-table-column>
                    <el-table-column prop="code" label="房屋编码" ></el-table-column>
                    <el-table-column prop="followFlag" label="回访情况" ></el-table-column>
                    <el-table-column prop="name" label="姓名" ><template slot-scope="scope"> <span class="text">{{scope.row.name }}</span></template></el-table-column>
                    <el-table-column prop="reviewFlag" label="审核情况"></el-table-column>
                    <el-table-column prop="status" label="处理情况"></el-table-column>
                  </el-table>
                </div>
              </nav>
            </el-tab-pane>
            <!--报修情况-->
            <!--开关阀情况-->
            <el-tab-pane label="开关阀情况" name="third">
              <div class="block main_title">
                <span class="demonstration">供热季:</span>
                <el-select  @change="change2()" size="small" v-model="value2" placeholder="请选择供热季">
                  <el-option v-for="item in quarter2" :key="item.value3" :label="item.供热季" :value="item.供热季Id">
                  </el-option>
                </el-select>
                <label class="padding-left demonstration">地域区域:</label>
                <el-cascader @change="change2()" size="small"
                             expand-trigger="click" change-on-select  clearable v-model="areavalue2"
                              placeholder="请选择地域区域">
                </el-cascader>
                <label class="padding-left demonstration">阀门状态:</label>
                <el-select @change="change2()" size="small" v-model="vstatusvalue" placeholder="请选择报修状态">
                  <el-option v-for="item in vstatus" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select><br><br>
                <label class=""></label>
                <el-input  size="small"  style="width:280px !important" prefix-icon="el-icon-search" placeholder="请输入查询信息" v-model="searchValue2" clearable>
                </el-input>
                <label style="padding-left:10px"></label>
                <el-button type="warning" @click="change2()" class="button-search">查询</el-button>
              </div>
              <el-dropdown>
                <el-button type="warning"  size="small"  plain>导出excel</el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native='exportExcel(2,"开关阀-开阀情况")'>开阀情况</el-dropdown-item>
                  <el-dropdown-item @click.native='exportExcel(3,"开关阀-关阀情况")'>关阀情况</el-dropdown-item>
                  <el-dropdown-item @click.native='exportExcel(4,"开关阀-未用暖情况")'>未用暖情况</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-button type="warning"  style="margin-bottom: 15px;float:right" size="small" @click="switchdialog = true" plain>历史数据</el-button>
              <nav>
                <div class="main_charge" >
                  <div class="content_title_left">
                    <span>开阀情况</span>
                  </div>
                </div>
                <div class="main_content" style="border-top:0px solid #000;position: relative;">
                  <el-table :data="tableData2"    stripe id="out-table2" border  style="width: 100%"  max-height="300">
                    <el-table-column prop="code" label="房屋编码" ></el-table-column>
                    <el-table-column prop="name" label="姓名" ></el-table-column>
                    <el-table-column prop="addr" label="地址" ></el-table-column>
                    <el-table-column prop="dtRestore" label="开阀时间" ></el-table-column>
                    <el-table-column prop="dealStatus" label="处理情况" ></el-table-column>
                    <el-table-column prop="tapStatus" label="阀门状态" ></el-table-column>
                    <el-table-column prop="reviewStatus" label="审核情况"></el-table-column>
                  </el-table>
                </div>
              </nav>
              <nav>
                <div class="main_charge" >
                  <div class="content_title_left">
                    <span>关阀情况</span>
                  </div>
                </div>
                <div class="main_content" style="border-top:0px solid #000;position: relative;">
                  <el-table :data="tableData3"    stripe id="out-table3" border  style="width: 100%"  max-height="300">
                    <el-table-column prop="code" label="房屋编码" ></el-table-column>
                    <el-table-column prop="name" label="姓名" ></el-table-column>
                    <el-table-column prop="addr" label="地址" ></el-table-column>
                    <el-table-column prop="stopDate" label="关阀时间" ></el-table-column>
                    <el-table-column prop="dealStatus" label="处理情况" ></el-table-column>
                    <el-table-column prop="tapStatus" label="阀门状态" ></el-table-column>
                    <el-table-column prop="reviewStatus" label="审核情况"></el-table-column>
                    <el-table-column prop="oweCheck" label="关阀自查情况"></el-table-column>
                    <el-table-column prop="check" label="关阀稽查情况"></el-table-column>
                    <el-table-column prop="checkVerity" label="关阀稽查审核情况"></el-table-column>
                  </el-table>
                </div>
              </nav>
              <nav>
                <div class="main_charge" >
                  <div class="content_title_left">
                    <span>未用暖情况</span>
                  </div>
                </div>
                <div class="main_content" style="border-top:0px solid #000;position: relative;">
                  <el-table :data="tableData4"    stripe id="out-table4" border  style="width: 100%"  max-height="300">
                    <el-table-column prop="code" label="房屋编码" ></el-table-column>
                    <el-table-column prop="name" label="姓名" ></el-table-column>
                    <el-table-column prop="addr" label="地址" ></el-table-column>
                    <el-table-column prop="oweCheck" label="未用暖自查情况" ></el-table-column>
                    <el-table-column prop="tapStatus" label="阀门状态" ></el-table-column>
                    <el-table-column prop="checkVerity" label="未用暖稽查审核情况" ></el-table-column>
                    <el-table-column prop="check" label="未用暖稽查情况"></el-table-column>
                  </el-table>
                </div>
              </nav>
            </el-tab-pane>
            <!--开关阀情况-->
            <!--室温情况-->
            <el-tab-pane label="室温情况" name="fourth">
              <nav>
                <div class="">
                  <div class="block main_title" >
                    <label class=" demonstration">地域区域:</label>
                    <el-cascader size="small"  @change="change3()"
                                 expand-trigger="click"
                                 :options="area3"  :props="props" change-on-select  clearable v-model="areavalue3"
                      placeholder="请选择地域区域">
                    </el-cascader>
                    <label class=" padding-left demonstration">设备状态:</label>
                    <el-select  size="small"  @change="change3()" v-model="dstatusvalue" placeholder="请选择设备状态">
                      <el-option v-for="item in dstatus" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                    <label class="padding-left"></label>
                    <el-input size="small"  style="width:280px !important" prefix-icon="el-icon-search" placeholder="请输入查询信息" v-model="searchValue3" clearable>
                    </el-input>
                    <label style="padding-left:10px"></label>
                    <el-button type="warning"  @click="change3()" class="button-search">查询</el-button>
                  </div>
                    <el-button type="warning"  style="margin-bottom: 15px;" size="small" @click='exportExcel(5,"室温情况")' plain>导出excel</el-button>

                  <nav>
                  <el-table :data="tableData5"    stripe id="out-table5" border  style="width: 100%"  max-height="300">
                    <el-table-column prop="code" label="房屋编码" ></el-table-column>
                    <el-table-column prop="decTemp"  :formatter="tofixed" label="室温设计值" ></el-table-column>
                    <el-table-column prop="addr" label="地址" ></el-table-column>
                    <el-table-column prop="assCode" label="设备编码" ></el-table-column>
                    <el-table-column prop="open"  :formatter="tofixed" label="阀门开度" ></el-table-column>
                    <el-table-column prop="name" label="姓名" ></el-table-column>
                    <el-table-column prop="totalFlow"  :formatter="tofixed" label="流量" ></el-table-column>
                    <el-table-column prop="actualSupplyHeat"  :formatter="tofixed" label="热量" ></el-table-column>
                    <el-table-column prop="setTemp"  :formatter="tofixed" label="室温" ></el-table-column>
                    <el-table-column prop="assType" label="设备类型"></el-table-column>
                    <el-table-column prop="deviceStatus" label="设备状态"></el-table-column>
                    <el-table-column label="操作"       fixed="right">
                      <template slot-scope="scope" >
                        <el-button type="warning"  style="margin: 0px;float:right" size="small"  @click="open1(scope.row.code)" plain>图示</el-button>

                      </template>
                    </el-table-column>
                  </el-table>
                    </nav>
                </div>
              </nav>
            </el-tab-pane>
            <!--室温情况-->
          </el-tabs>
        </div>
      </div>
    </nav>
    <!--收费弹框-->
    <el-dialog title="收费情况图表" :visible.sync="chargedialog" @open="open('charge')" >
      <nav>
        <div class="main_content" style="  min-width: 0px;border:0px solid #000;position: relative;">
          <div class="block main_title" style="margin-bottom: 20px; margin-top:-20px;min-width: 0px;">
            <span class="demonstration">供热季:</span>
            <el-select  size="small" multiple v-model="value3" @change="change4()" placeholder="请选择供热季">
              <el-option v-for="item in quarter3" :key="item.value" :label="item.供热季" :value="item.供热季Id">
              </el-option>
            </el-select>
            <label class="padding-left demonstration" >地域区域:</label>
            <el-cascader size="small" @change="change4()"
                         expand-trigger="click"  change-on-select  clearable v-model="areavalue4"
                         :options="area4"  :props="props"
                         placeholder="请选择地域区域">
            </el-cascader>
          </div>
          <el-row style=" position: relative;margin-top:-50px;">
            <el-col :span="24" v-for="(item, key,index) in chartList" v-if="index<1" :key="key"><div  class="grid-content bg-purple">
              <div class="">
                <div  class="">
                  <Chart id='statisticschart' :option="chartData" :style="{width: '100%',top: '10px', height: '300px'}" :chartList="chartList"  />
                </div>
              </div>
            </div>
            </el-col>
          </el-row>
        </div>
      </nav>
    </el-dialog>
    <!--收费弹框-->
    <!--报修弹框-->
    <el-dialog title="报修情况图表" :visible.sync="repairdialog" @open="open('repair')">
      <nav>
        <div class="main_content" style="min-width: 0px;border:0px solid #000;position: relative;">
          <div class="block main_title" style="margin-bottom: 20px; margin-top:-20px;min-width: 0px;">
            <span class="demonstration">供热季:</span>
            <el-select  size="small" multiple v-model="value4" @change="change5()" placeholder="请选择供热季">
              <el-option v-for="item in quarter4" :key="item.value" :label="item.供热季" :value="item.供热季Id">
              </el-option>
            </el-select>
            <label class="padding-left demonstration" >地域区域:</label>
            <el-cascader size="small" @change="change5()"
                         expand-trigger="click"  change-on-select  clearable v-model="areavalue5"
                         :options="area5"  :props="props"
                         placeholder="请选择地域区域">
            </el-cascader>
          </div>
          <el-row style=" position: relative ;margin-bottom: 30px;margin-top:-50px;">
            <el-col :span="14" v-for="(item, key,index) in chartList1"  :key="key" v-if="index<1"><div class="grid-content bg-purple">
              <div class="">
                <div  class="">
                  <Chart id='statisticschart1' v-on:changecart="changecart" :option="chartData1" :style="{width: '100%',top: '30px', height: '300px'}" :chartList="chartList1"  />
                </div>
              </div>
            </div>
            </el-col>
            <el-col :span="10" ><div class="grid-content bg-purple-light">
              <div class="border" style="margin: 15px 15px;width: 100%;height: 280px;">
                <div v-for="(item1,  key,index) in chartList2" v-if="index<1" :key="key" class="border-echart" style="width:60%;height: 300px;z-index: 999;">
                  <Chart  id='statisticschart2' :option="chartData2" :style="{width: '100%',top: '10px',right:'50px', height: '300px'}" :chartList="chartList2"  />
                </div>
                <div class="rose_txt" >
                  <div class="h5-pie" v-for="(item1,key) in chartList2.repairTypeList" :key="key"><i :class="'circle circle'+key"></i>{{chartList2.repairTimeList[key]}}&nbsp;&nbsp;<span>{{item1}}</span></div>
                </div>
              </div>
            </div></el-col>
          </el-row>
        </div>
      </nav>
    </el-dialog>   
    <!--报修弹框-->
    <!--开关阀弹框-->
    <el-dialog title="开关阀情况图表" :visible.sync="switchdialog" @open="open('switch')" >
      <nav>
        <div class="main_content" style="  min-width: 0px;border:0px solid #000;position: relative;">
          <div class="block main_title" style="margin-bottom: 20px; margin-top:-20px;min-width: 0px;">
            <span class="demonstration">供热季:</span>
            <el-select  size="small" multiple v-model="value5" @change="change6()" placeholder="请选择供热季">
              <el-option v-for="item in quarter5" :key="item.value" :label="item.供热季" :value="item.供热季Id">
              </el-option>
            </el-select>
            <label class="padding-left demonstration" >地域区域:</label>
            <el-cascader size="small" @change="change6()"
                         expand-trigger="click"  change-on-select  clearable v-model="areavalue6"
                         :options="area6"  :props="props"
                         placeholder="请选择地域区域">
            </el-cascader>
          </div>
          <el-row style=" position: relative;margin-top:-50px;">
            <el-col :span="24" v-for="(item, key,index) in chartList3" :key="key" v-if="index<1" ><div class="grid-content bg-purple">
              <div class="">
                <div  class="">
                  <Chart id='statisticschart3' :option="chartData3" :style="{width: '100%',top: '10px', height: '300px'}" :chartList="chartList3"  />
                </div>
              </div>
            </div>
            </el-col>
          </el-row>
        </div>
      </nav>
    </el-dialog>
    <!--开关阀弹框-->
    <!--室温弹框-->
    <el-dialog title="报修情况图表"  :visible.sync="roomdialog"  >
      <nav>
        <div class="main_content" style="  min-width: 0px;border:0px solid #000;position: relative;">
          <div class="block main_title" style="margin-bottom: 20px; margin-top:-20px;min-width: 0px;">
            <span class="demonstration">室温时间:</span>
            <el-date-picker  size="small"
                             v-model="value6"
                             type="daterange"
                             align="right"
                             unlink-panels @change="change7()"
                             range-separator="-"
                             start-placeholder="开始日期"   value-format="yyyy-MM-dd"
                             end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </div>
          <el-row style=" position: relative;margin-top:-50px;">
            <el-col :span="14" v-for="(item, key,index) in chartList4" :key="key" v-if="index<1"><div class="grid-content bg-purple">
              <div class="">
                <div  class="">
                  <Chart id='statisticschart4'  :option="chartData4" :style="{width: '100%',top: '0px', height: '300px'}" :chartList="chartList4"  />
                </div>
              </div>
            </div>
            </el-col>
            <el-col :span="10" ><div class="grid-content bg-purple-light">
              <div class="border" style="margin: 15px 15px;width: 100%;height: 280px;">
                <div  v-for="(item1,  key,index) in chartList5" :key="key" v-if="index<1" class="border-echart" style="width:60%;height: 280px;z-index: 999;">
                  <Chart  id='statisticschart5' :option="chartData5" :style="{width: '100%',right:'40px',top: '10px', height: '300px'}" :chartList="chartList5"  />
                </div>
                <div class="rose_txt" style="  margin-top:30px;"  v-for="(item1,key) in chartList5.tempPerNameList" :key="key">
                  <div class="h5-pie"><i :class="'circle circle'+key"></i>{{chartList5.tempPerList[key]}} %<span>{{item1}}</span></div>
                </div>
              </div>
            </div></el-col>
          </el-row>
        </div>
      </nav>
    </el-dialog>
    <!--室温弹框-->
  </div>
  <!--内容区域-->


</template>

<script>
  import Chart from "base/chart/statistics-charts";
  import { option,option1,option2,option3,option4,option5 } from "src/components/statistics/option";
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  import { getData,postData } from "src/util/base.js";
  export default {
    data() {
      return {
        loading: true,
        chargedialog:false,
        repairdialog:false,
        switchdialog:false,
        roomdialog  :false,
        value: "2016",
        value1: "",
        value2: "",
        value3: [],
        value4: [],
        value5: [],
        value6: "",
        date: '',
        roomdata:'',
        heatvalue:"",
        rstatusvalue:"",
        rtypevalue:"",
        chargevalue:"",
        vstatusvalue:"",
        dstatusvalue:"",
        areavalue: [],
        areavalue1: [],
        areavalue2: [],
        areavalue3: [],
        areavalue4: [],
        areavalue5: [],
        areavalue6: [],
        areavalue7: [],
        chartData: option,
        chartData1: option1,
        chartData2: option2,
        chartData3: option3,
        chartData4: option4,
        chartData5: option5,
        searchValue: "",
        searchValue1: "",
        searchValue2: "",
        searchValue3: "",
        scrollHeight: 50,
        tableData:[],
        tableData1:[],
        tableData2:[],
        tableData3:[],
        tableData4:[],
        tableData5:[],
        chart: null,
        // 初始化图表配置
        chartList: [],
        chartList1: [],
        chartList2: [],
        chartList3: [],
        chartList4: [],
        chartList5: [],
        activeName: 'first',
        quarter: [],
        quarter1: [],
        quarter2:[],
        quarter3:[],
        quarter4:[],
        quarter5:[],
        quarter6:[],
        area:[],
        area1:[],
        area2:[],
        area3:[],
        area4:[],
        area5:[],
        area6:[],
        area7:[],
        heat:[{
          value: '',
          label: '所有'
        }, {
          value: '0',
          label: '供暖'
        }, {
          value: '1',
          label: '停暖'
        }, {
          value: '2',
          label: '未用暖'
        }],
        charge:[{
          value: '',
          label: '所有'
        }, {
          value: '0',
          label: '未缴'
        }, {
          value: '1',
          label: '已缴部分'
        }, {
          value: '2',
          label: '已缴'
        }],
        rstatus:[{
          value: '',
          label: '所有'
        }, {
          value: '11',
          label: '处理中'
        }, {
          value: '12',
          label: '处理完成'
        }, {
          value: '13',
          label: '审核完'
        }, {
          value: '14',
          label: '回访完成'
        }, {
          value: '21',
          label: '处理中'
        }, {
          value: '22',
          label: '处理完成'
        }, {
          value: '23',
          label: '审核完成'
        }, {
          value: '24',
          label: '回访完成'
        }],
        rtype:[{
          value: '',
          label: '所有'
        }, {
          value: '21',
          label: '室内不热'
        }, {
          value: '22',
          label: '房屋漏水'
        }, {
          value: '24',
          label: '单元漏水'
        }, {
          value: '25',
          label: '更换配件'
        }, {
          value: '26',
          label: '开锁闭阀'
        }, {
          value: '27',
          label: '测温'
        }],
        vstatus:[{
            value: '',
            label: '所有'
          }, {
            value: '1',
            label: '阀开'
          }, {
            value: '0',
            label: '阀关'
        }],
        dstatus:[{
          value: '',
          label: '所有'
        }, {
          value: '0',
          label: '正常'
        }, {
          value: '1',
          label: '报警'
        }, {
            value: '2',
            label: '离线'
          }],
        props: {
          value: 'Id',
          label: 'text'
        },

      };
    },
    components: {
      Chart
    },
    methods: {
      open1(data){ //室温曲线接口
        this.chart=null;
        // 初始化图表配置
        this.chartList5=[];
        this.chartList4=[];
        this.roomdata=data;
        this.roomdialog=true;
          function p(s) {
            return s < 10 ? '0' + s: s;
          }
          var myDate = new Date();//获取当前年
          var year=myDate.getFullYear();//获取当前月
          var month=myDate.getMonth()+1;//获取当前日
          var date=myDate.getDate();
          var h=myDate.getHours();       //获取当前小时数(0-23)
          var m=myDate.getMinutes();     //获取当前分钟数(0-59)
          var s=myDate.getSeconds();
          var now=year+'-'+p(month)+"-"+p(date)+" "+"00:00:00"
          var now1=year+'-'+p(month)+"-"+p(date)+" "+"23:59:59";
          getData("http://172.18.5.48:8080/iheat/htc/houData/getTempLine.do", {//室温曲线接口
            houseId: "2382",
            startTime: "2016-12-21 00:00:00",
            endTime:"2016-12-21 23:00:00",
          }).then(res => {
            this.chartList4 = res.data;
          this.chartList5 = res.data;
        }).catch(err => {});},
      changecart:function(data){
        this.chart=null;
        this.chartList2=[];
        getData("http://172.18.5.48:8080/iheat/htc/houData/getRepairPie.do", {//室温比例接口
          heatPeroidId:data,
          addrZoneId: ""
        })
          .then(res => {
          this.chartList2 = res.data;
      }).catch(err => {});
    },
      tofixed:function(row, column) {
      if(row[column.property]!=null){
         var num = row[column.property].toFixed(2);
        return num
      }
      },
      change(){ //收费选择
        this.loading = true;
        getData("http://172.18.5.48:8080/iheat/htc/houData/getChargeMessage.do", { //收费表格接口
          addrZoneId: this.areavalue[this.areavalue.length-1],
          heatPeroidId: this.value,
          heatStatus:this.heatvalue,
          chargeStatus:this.chargevalue,
          queryMes:this.searchValue,
          startNum:"0"
        }).then(res => {
          this.tableData = res.data.chargeList;  this.loading = false;
      }).catch(err => {});},
      change1(){ //报修选择
        this.loading = true;
        getData("http://172.18.5.48:8080/iheat/htc/houData/getRepairMessage.do", { //报修表格接口
          addrZoneId: this.areavalue1[this.areavalue1.length-1],
          heatPeroidId: this.value1,
          repairStatus:this.rstatusvalue,
          repairType:this.rtypevalue,
          queryMes:this.searchValue1,
          startNum:"0"
        }).then(res => {
          this.tableData1 = res.data.repairList;  this.loading = false;
      }).catch(err => {});},
      change2(){ //开关阀选择
        this.loading = true;
        getData("http://172.18.5.48:8080/iheat/htc/houData/getValveMessage.do", { //开关阀表格接口
          addrZoneId: this.areavalue2[this.areavalue2.length-1],
          heatPeroidId: this.value2,
          valveStatus:this.vstatusvalue,
          queryMes:this.searchValue2,
          startNum:"0"
        }).then(res => {
          this.tableData2 = res.data.openValveList; this.tableData3 = res.data.closeValveList;this.tableData4 = res.data.unusedValveList;   this.loading = false;
      }).catch(err => {});},
      change3(){ //室温表格选择
        this.loading = true;
        getData("http://172.18.5.48:8080/iheat/htc/houData/getTempMessage.do", { //室温表格接口
          addrZoneId: this.areavalue3[this.areavalue3.length-1],
          deviceStatus:this.dstatusvalue,
          queryMes:this.searchValue3,
          startNum:"0"
        }).then(res => {
          this.tableData5 = res.data.tempList;  this.loading = false;
      }).catch(err => {});},
      change4(){  //收费曲线选择
        var heatPeroidIdList=""
        this.chart=null;
        // 初始化图表配置
        this.chartList=[];
        for(let i=0;i<this.value3.length;i++){
          if(i==0){heatPeroidIdList+=this.value3[i]}else{heatPeroidIdList+=","+this.value3[i]}}
        getData("http://172.18.5.48:8080/iheat/htc/houData/getChargeLine.do", { //收费曲线接口
          heatPeroidIdList:heatPeroidIdList,
          addrZoneId: this.areavalue4[this.areavalue4.length-1],
        }).then(res => {
          this.chartList = res.data;
      }).catch(err => {});},
      change5(){  //报修曲线选择
        var heatPeroidIdList=""
        this.chart=null;
        // 初始化图表配置
        this.chartList1=[];
        for(let i=0;i<this.value4.length;i++){
          if(i==0){heatPeroidIdList+=this.value4[i]}else{heatPeroidIdList+=","+this.value4[i]}}
        getData("http://172.18.5.48:8080/iheat/htc/houData/getRepairLine.do", { //报修曲线接口
          heatPeroidIdList:heatPeroidIdList,
          addrZoneId: this.areavalue5[this.areavalue5.length-1],
        }).then(res => {
          this.chartList1 = res.data;
          
      }).catch(err => {});},
      change6(){  //开关阀曲线选择
        var heatPeroidIdList=""
        this.chart=null;
        // 初始化图表配置
        this.chartList3=[];
        for(let i=0;i<this.value5.length;i++){
          if(i==0){heatPeroidIdList+=this.value5[i]}else{heatPeroidIdList+=","+this.value5[i]}}
        getData("http://172.18.5.48:8080/iheat/htc/houData/getValveLine.do", { //开关阀曲线接口
          heatPeroidIdList:heatPeroidIdList,
          addrZoneId: this.areavalue6[this.areavalue6.length-1],
        }).then(res => {
          this.chartList3 = res.data;
      }).catch(err => {});},
      change7(){  //室温曲线选择
        this.chart=null;
        // 初始化图表配置
        this.chartList5=[];
        this.chartList4=[];
        getData("http://172.18.5.48:8080/iheat/htc/houData/getTempLine.do", {//室温曲线接口
          houseId:this.roomdata,
          startTime: this.value6[0]+" "+"00:00:00",
          endTime:this.value6[1]+" "+"23:59:00",
        }).then(res => {
          this.chartList4 = res.data;
        this.chartList5 = res.data;
      }).catch(err => {});},
      open(name){ //历史数据
        this.chart=null;
        // 初始化图表配置
        this.chartList=[];
        this.chartList1=[];
        this.chartList2=[];
        this.chartList3=[];
        if(name=="charge"){
          getData("http://172.18.5.48:8080/iheat/htc/houData/getChargeLine.do", {//收费曲线接口
            heatPeroidIdList: this.value,
            addrZoneId: ""
          })
            .then(res => {
            this.chartList = res.data;
        }).catch(err => {});
        }
       else if(name=='repair'){
          getData("http://172.18.5.48:8080/iheat/htc/houData/getRepairLine.do", {//报修曲线接口
            heatPeroidIdList: this.value,
            addrZoneId: ""
          })
            .then(res => {
            this.chartList1 = res.data;
        }).catch(err => {});
        }
        else if(name=="switch"){
          getData("http://172.18.5.48:8080/iheat/htc/houData/getValveLine.do", {//开关阀曲线接口
            heatPeroidIdList: this.value,
            addrZoneId: ""
          })
            .then(res => {
            this.chartList3 = res.data;
        }).catch(err => {});
      }
      },
      exportExcel (num,name) {//导出excel
        /* generate workbook object from table */
        var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'+num+''))
        /* get binary string as output */
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), ''+name+'.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      },
    },
    mounted(){
        let scroll=this;
      let chargepage=0;let repairpage=0;let openpage=0;let closepage=0;let warmpage=0;let roompage=0
        document.querySelectorAll('.el-table__body-wrapper')[0].addEventListener('scroll', function(e) {//收费表格滚动
        const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight;
        if (scrollDistance <= 0) {
          scroll.loading=true;
          chargepage=parseFloat(chargepage)+10
          getData("http://172.18.5.48:8080/iheat/htc/houData/getChargeMessage.do", { //收费表格接口
            addrZoneId: scroll.areavalue[scroll.areavalue.length-1],
            heatPeroidId: scroll.value,
            heatStatus:scroll.heatvalue,
            chargeStatus:scroll.chargevalue,
            queryMes:scroll.searchValue,
            startNum:chargepage+10
          }).then(res => {
            setTimeout(() => {
            for(var i=0;i<res.data.chargeList.length;i++) {scroll.tableData.push(res.data.chargeList[i]);}
            scroll.loading=false;
          }, 200);
        }).catch(err => {});
        }
      });
      document.querySelectorAll('.el-table__body-wrapper')[1].addEventListener('scroll', function(e) {//报修表格滚动
        const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight;
        if (scrollDistance <= 0) {
          scroll.loading=true;
          repairpage=parseFloat(repairpage)+10
          getData("http://172.18.5.48:8080/iheat/htc/houData/getRepairMessage.do", { //报修表格接口
            addrZoneId: scroll.areavalue1[scroll.areavalue1.length-1],
            heatPeroidId: scroll.value1,
            repairStatus:scroll.rstatusvalue,
            repairType:scroll.rtypevalue,
            queryMes:scroll.searchValue1,
            startNum:repairpage
          }).then(res => {
            setTimeout(() => {
            for(var i=0;i<res.data.repairList.length;i++) {scroll.tableData1.push(res.data.repairList[i]);}
            scroll.loading=false;
          }, 200);
        }).catch(err => {});
        }
      });
          document.querySelectorAll('.el-table__body-wrapper')[2].addEventListener('scroll', function(e) {//开关阀表格滚动
        const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight;
        if (scrollDistance <= 0) {
          scroll.loading=true;
          openpage=parseFloat(openpage)+10
          getData("http://172.18.5.48:8080/iheat/htc/houData/getValveMessage.do", { //开关阀表格接口
          addrZoneId: scroll.areavalue2[scroll.areavalue2.length-1],
          heatPeroidId: scroll.value2,
          valveStatus:scroll.vstatusvalue,
          queryMes:scroll.searchValue2,
          startNum:openpage
        }).then(res => {
            setTimeout(() => {
            for(var i=0;i<res.data.openValveList.length;i++) {scroll.tableData2.push(res.data.openValveList[i]);}
            scroll.loading=false;
          }, 200);
        }).catch(err => {});
        }
      });
        document.querySelectorAll('.el-table__body-wrapper')[3].addEventListener('scroll', function(e) {//开关阀表格滚动
        const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight;
        if (scrollDistance <= 0) {
          scroll.loading=true;
          closepage=parseFloat(closepage)+10
          getData("http://172.18.5.48:8080/iheat/htc/houData/getValveMessage.do", { //开关阀表格接口
          addrZoneId: scroll.areavalue2[scroll.areavalue2.length-1],
          heatPeroidId: scroll.value2,
          valveStatus:scroll.vstatusvalue,
          queryMes:scroll.searchValue2,
          startNum:closepage
        }).then(res => {
            setTimeout(() => {
            for(var i=0;i<res.data.closeValveList.length;i++) {scroll.tableData3.push(res.data.closeValveList[i]);}
            scroll.loading=false;
          }, 200);
        }).catch(err => {});
        }
      });
        document.querySelectorAll('.el-table__body-wrapper')[4].addEventListener('scroll', function(e) {//开关阀表格滚动
        const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight;
        if (scrollDistance <= 0) {
          scroll.loading=true;
          warmpage=parseFloat(warmpage)+10
          getData("http://172.18.5.48:8080/iheat/htc/houData/getValveMessage.do", { //开关阀表格接口
          addrZoneId: scroll.areavalue2[scroll.areavalue2.length-1],
          heatPeroidId: scroll.value2,
          valveStatus:scroll.vstatusvalue,
          queryMes:scroll.searchValue2,
          startNum:warmpage
        }).then(res => {
            setTimeout(() => {
            for(var i=0;i<res.data.unusedValveList.length;i++) {scroll.tableData4.push(res.data.unusedValveList[i]);}
            scroll.loading=false;
          }, 200);
        }).catch(err => {});
        }
      });
         document.querySelectorAll('.el-table__body-wrapper')[5].addEventListener('scroll', function(e) {//室温表格滚动
        const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight;
        if (scrollDistance <= 0) {
          scroll.loading=true;
          roompage=parseFloat(roompage)+10
          getData("http://172.18.5.48:8080/iheat/htc/houData/getTempMessage.do", { //室温表格接口
          addrZoneId: scroll.areavalue3[scroll.areavalue3.length-1],
          deviceStatus:scroll.dstatusvalue,
          queryMes:scroll.searchValue3,
          startNum:roompage
        }).then(res => {
            setTimeout(() => {   
            for(var i=0;i<res.data.tempList.length;i++) {scroll.tableData5.push(res.data.tempList[i]);}
            scroll.loading=false;
          }, 200);
        }).catch(err => {});
        }
      });
    },
    created() {
      getData("http://172.18.5.182:7001/iheat/htc/htcBase/getAddrzone.do").then(res => {//地理区域接口
        this.area = res.data;
       this.area1 = res.data;
       this.area2 = res.data;
       this.area3 = res.data;
      this.area4 = res.data;
      this.area5 = res.data;
      this.area6 = res.data;
      this.area7 = res.data;
    }).catch(err => {});
     getData("http://172.18.5.182:7001/iheat/htc/htcBase/getHeatPeroidList.do").then(res => { //供热季接口
  this.quarter = res.data.heatPeroidList;
      this.quarter1 = res.data.heatPeroidList;
      this.quarter2 = res.data.heatPeroidList;
      this.quarter3 = res.data.heatPeroidList;
      this.quarter4 = res.data.heatPeroidList;
      this.quarter5= res.data.heatPeroidList;
      this.quarter6= res.data.heatPeroidList;
    }).catch( err => {});
      getData("http://172.18.5.48:8080/iheat/htc/houData/getChargeMessage.do", { //收费表格接口
        addrZoneId: "",
        heatPeroidId: "2016",
        startNum:"0"
      }).then(res => {
        this.tableData = res.data.chargeList;  this.loading = false;
    }).catch(err => {});
      getData("http://172.18.5.48:8080/iheat/htc/houData/getRepairMessage.do", { //报修表格接口
        addrZoneId: "",
        heatPeroidId: "2016",
        startNum:"0"
      }).then(res => {
        this.tableData1 = res.data.repairList;  this.loading = false;
    }).catch(err => {});
      getData("http://172.18.5.48:8080/iheat/htc/houData/getValveMessage.do", { //开关阀表格接口
        addrZoneId: "",
        heatPeroidId: "2016",
        startNum:"0"
      }).then(res => {
        this.tableData2 = res.data.openValveList; this.tableData3 = res.data.closeValveList; this.tableData4 = res.data.unusedValveList;  this.loading = false;
    }).catch(err => {});
      getData("http://172.18.5.48:8080/iheat/htc/houData/getTempMessage.do", { //室温表格接口
        addrZoneId: "",
        startNum:"0"
      }).then(res => {
        this.tableData5 = res.data.tempList;  this.loading = false;
    }).catch(err => {});
    }
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
