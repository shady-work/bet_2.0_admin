<template>
    <div id="cqssc_history">
        <h4 style="margin-top: 8px;margin-bottom:35px;clear: both;margin-left:10px;" id="top">
            <span style="margin-top:-15px;">{{when_}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span >开奖历史</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div class="block">
                <!--<span class="demonstration" sty>选择日期</span>-->

                <el-date-picker
                        v-model="value6"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                >
                </el-date-picker>
            </div>
            <el-button type="success" class="pull-left mr10" @click="get_all_history()" >查找</el-button>
            <el-button type="primary" class="pull-left mr10" @click="get_all_history3()" style="margin-left:670px;">今日</el-button>
            <el-button type="info" class="pull-left mr10" @click="get_all_history2()" style="margin-left:750px;">查看以往所有数据</el-button>

        </h4>
        <!--手动开奖-->
        <table class="table table-bordered table-hover table-striped text-center">
            <thead>
            <tr>
                <td>彩票类别</td>
                <td>彩票期号</td>
                <td>第一位</td>
                <td>第二位</td>
                <td>第三位</td>
                <td>操作</td>
            </tr>
            </thead>
            <tbody>
            <tr >
                <td style="vertical-align: middle;">PC蛋蛋</td>
                <td><input type="text" v-model="expect" class="form-control"></td>
                <td v-for="(v,k) in open_codes">
                    <select v-model="open_codes[k]" class="form-control">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                </td>


                <td>
                    <button @click="hand_manual()" class="btn btn-primary btn-xs" style="margin-top:5px;">确定</button>
                </td>
            </tr>
            </tbody>
        </table>


        <table class="table table-bordered table-hover table-striped text-center">
           <thead>
             <tr>
               <td>期数</td>
               <td>开奖号码</td>
               <td colspan="3">总和</td>
               <td>波色</td>
               <td>开奖时间</td>
                 <td>是否开奖</td>
             </tr>
           </thead>
          <tbody>
              <tr v-for="(v,k) in history_codes">
                <td>{{v.expect}}</td>
                <td class="text-center" width="120">
                    <b v-for="(val,key) in v.details.ball_0" v-if="isNumb(val)" :class="returnColor(val)" class="open-code">{{val}}</b>
                </td>
                <td >{{v.details.ball_1}}</td>
                <td class="text-left" width="170" style="text-indent: 20px;">{{v.details.ball_2}}</td>
                <td>{{v.details.ball_4}}</td>
                <td>{{v.details.ball_3}}</td>
                <td>{{v.opentime}}</td>
                  <td v-if="v.is_lottery == 1" >已开</td>
                  <td v-else="v.is_lottery == 0"><button class="btn btn-primary btn-xs" @click="open_prize(v.expect,v.details.ball_0)">手动开奖</button></td>
              </tr>
          </tbody>
        </table>
      <div class="row mt15">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <span>当前第 {{page}} 页</span>
          <span>共 {{pageNum}} 页，</span>
          <button class="btn btn-primary btn-xs" v-if="hasPrev" @click="prevPage()">
            上一页
          </button>

          <button class="btn btn-info btn-xs" v-if="hasNext" @click="nextPage()">
            下一页
          </button>
          <span>共 {{sum}} 条</span>
          <br>
          <br>
        </div>
        <div class="col-md-4"></div>
      </div>
    </div>
</template>

<script>
export default
{
    name:'pcegg_history',
    data()
    {
      return{
         history_codes:[],
         page:1,
         per_page:15,
         hasNext:false,
         hasPrev:false,
         nextPageUrl:'',
         prevPageUrl:'',
         sum:0,
         pageNum:0,
         data:[],

          expect:'',//按期数查找数据
          open_codes:[0,0,0],
          when_:'星期三/04-11',
          value6:null,
      }
    },
    created()
    {
        this.get_all_history();
    },
    methods:
    {
        get_all_history:function(page = 1,per_page = 15)
        {
            let range='today';
            if(this.value6){
                range=this.value6[0]+'_'+this.value6[1];
            }
            this.$http.get(`${this.api}/admin/egg/history/lottery?page=${page}&per_page=${per_page}`,{
                params: {

                    range:range
                }
            })
              .then(function(res){
                console.log(res.data);
                if(res.data.status == 200)
                   {
                      this.history_codes = res.data.data.list;
                      this.hasPrev = res.data.data.hasPrev;
                      this.hasNext = res.data.data.hasNext;
                      this.sum = res.data.data.sum;
                      this.pageNum = res.data.data.pageNum;
                      this.prevPageUrl = this.hasPrev?res.data.data.prevPageUrl:'';
                      this.nextPageUrl = this.hasNext?res.data.data.nextPageUrl:'';
                       let date  = new Date();
                       let month = date.getMonth() + 1;
                       let day   = date.getDate();
                       let week  = date.getDay();
                       let str   = '';
                       if (week == 0) {
                           str = "星期日";
                       } else if (week == 1) {
                           str = "星期一";
                       } else if (week == 2) {
                           str = "星期二";
                       } else if (week == 3) {
                           str = "星期三";
                       } else if (week == 4) {
                           str = "星期四";
                       } else if (week == 5) {
                           str = "星期五";
                       } else if (week == 6) {
                           str = "星期六";
                       }
                       let dateStr =  month + "/" + day + '号' + ' ' +str;
                       this.get_details(dateStr,dateStr);

                   }
                   else
                   {
                     this.$message.error('数据加载失败');
                   }
              });
        },
        isNumb(v)
        {
          if(isNaN(Number(v)))
          {
            return false;
          }
          if(v == ' ' )
          {
            return false;
          }
          return true;

        },
        prevPage:function()
        {
            if(this.prevPageUrl == '')
            {
               this.$message.error('没有上一页了');
               return;
            }
            else
            {
              this.page--;
              this.$http.get(`${this.api}${this.prevPageUrl}`)
                .then(function(res){
                  if(res.data.status == 200)
                  {
                    this.history_codes = res.data.data.list;
                    this.hasPrev = res.data.data.hasPrev;
                    this.hasNext = res.data.data.hasNext;
                    this.prevPageUrl = this.hasPrev?res.data.data.prevPageUrl:'';
                    this.nextPageUrl = this.hasNext?res.data.data.nextPageUrl:'';
                  }
                  else
                  {
                    this.$message.error('数据加载失败');
                  }
                });
            }
        },
        nextPage:function()
        {
          if(this.nextPageUrl == '')
          {
            this.$message.error('没有下一页了');
            return;
          }
          else
          {
            this.page++;
            this.$http.get(`${this.api}${this.nextPageUrl}`)
              .then(function(res){
                if(res.data.status == 200)
                {
                  this.history_codes = res.data.data.list;
                  this.hasPrev = res.data.data.hasPrev;
                  this.hasNext = res.data.data.hasNext;
                  this.prevPageUrl = this.hasPrev?res.data.data.prevPageUrl:'';
                  this.nextPageUrl = this.hasNext?res.data.data.nextPageUrl:'';
                }
                else
                {
                  this.$message.error('数据加载失败。');
                }
              });
          }
        },
      returnColor:function(num)
      {
        let className = '';
        num = parseInt(num);
        if(num%3 == 0)
        {
          className = 'bg-red';
        }
        if(num%3 == 1)
        {
          className = 'bg-green';
        }
        if(num%3 == 2)
        {
          className = 'bg-blue';
        }

        if(num == 0 || num == 13 || num == 14 || num ==27)
        {
          className = 'bg-white';
        }
        return className;

      },
        hand_manual:function(){

            let data = {};
            if(this.open_codes)
            {
                data.open_codes = this.open_codes;
            }
            if(this.expect)
            {
                if(isNaN(Number(this.expect)))
                {
                    this.$message.error('请确保您输入的日期是数据');
                    return;
                }
                data.expect = this.expect;
            }

            this.$http.post(`${this.api}/admin/egg/manLottery`,data).then(function(res) {
                if(res.data.status == 200)
                {
                    console.log(res.data);
                    this.$message(
                        {
                            message:res.data.msg,
                            center:true,
                            type:'success',
                        });

                }else{
                    this.$message.error(res.data.msg);
                }
            });
        },
        open_prize:function (expect,code) {
            center.scrollTo(0,0);
            this.open_codes=code.split(" | ");
            this.expect=expect;
        },
        get_details:function(date_str,str)
        {

            this.when_ = str;
            this.when_ = this.when_.replace('undefined/',"");

            //格式不统一，需要格式化下日期格式，有的是04-10  有的是2018-04-10   正确的数据格式是04-10
            if(date_str.length > 8)
            {
                date_str = date_str.substring(5);
            }
        },
        get_all_history2:function(page = 1,per_page = 15)
        {

            this.$http.get(`${this.api}/admin/egg/history/lottery?page=${page}&per_page=${per_page}`, {

            })
                .then(function(res){
                    if(res.data.status == 200)
                    {
                        console.log(res.data);
                        this.history_codes = res.data.data.list;
                        this.hasPrev = res.data.data.hasPrev;
                        this.hasNext = res.data.data.hasNext;
                        this.sum = res.data.data.sum;
                        this.pageNum = res.data.data.pageNum;
                        this.prevPageUrl = this.hasPrev?res.data.data.prevPageUrl:'';
                        this.nextPageUrl = this.hasNext?res.data.data.nextPageUrl:'';
                    }
                    else
                    {
                        this.$message.error('数据加载失败');
                    }
                });

        },
        get_all_history3:function(page = 1,per_page = 15)
        {


            let range='today';

            this.$http.get(`${this.api}/admin/egg/history/lottery?page=${page}&per_page=${per_page}`,{
                params: {

                    range:range
                }
            })
                .then(function(res){
                    if(res.data.status == 200)
                    {
                        console.log(res.data);
                        this.history_codes = res.data.data.list;
                        this.hasPrev = res.data.data.hasPrev;
                        this.hasNext = res.data.data.hasNext;
                        this.sum = res.data.data.sum;
                        this.pageNum = res.data.data.pageNum;
                        this.prevPageUrl = this.hasPrev?res.data.data.prevPageUrl:'';
                        this.nextPageUrl = this.hasNext?res.data.data.nextPageUrl:'';


                    }
                    else
                    {
                        this.$message.error('数据加载失败');
                    }
                });

        },
    },
};
</script>

<style scoped>
  .table {
    
    margin-top: 20px;
    font-size:12px;
  }
  #cqssc_history{
    margin-left:10px;
    width:1200px;
  }
  .bg-red{
      background: #9c464d!important;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      color: #fff;
  }

  .bg-green{
      background: #3b9c6d !important;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      color: #fff;
  }


  .bg-blue{
      background: #285b9c !important;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      color: #fff;
  }
  .bg-white{
      background: #9f9f9f !important;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      color: #fff;
  }
  .open-code {
      float: left;
      width: 25px;
      height: 25px;
      /*background: url('../assets/img/ball.png');*/
      background-size: cover;
      margin-left:5px;
      margin-right: 2px;
      line-height: 25px;
      font-size: 18px;
      font-weight: 700;
      text-align: center;
      color:#fff;
  }
  .block
  {
      width: 230px;
      margin-left:220px;
      margin-top: -41px;
      /*float: left;*/
      /*margin-right:300px;*/

  }
  .mr10{
      margin-left: 590px;
      margin-top: -41px;
  }
  h4>span{
      height: 45px;
      line-height:45px;
      display: inline-block;

  }
</style>
