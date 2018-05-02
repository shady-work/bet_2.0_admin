<template>
  <div id="cqssc_history">

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
              <td style="vertical-align: middle">加拿大28</td>
              <td><input type="text" v-model="expect" class="form-control"></td>
              <td v-for="(v,k) in open_codes" >
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
              <td colspan="2">总和</td>
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
              <td>{{v.details.ball_3}}</td>
              <td>{{v.opentime}}</td>
              <td v-if="v.is_lottery == 1" >已开</td>
              <td v-else="v.is_lottery == 0"><button class="btn btn-primary btn-xs" @click="open_prize(v.expect)">未开</button></td>
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
          this.$http.get(`${this.api}/admin/cake/history/lottery?page=${page}&per_page=${per_page}`)
            .then(function(res){
              if(res.data.status == 200)
              {
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
        get_result:function(first,second)
        {
          let no1 = parseInt(first);
          let no2 = parseInt(second);
          let str = '';
          str += (no1+no2) + '  |   ';
          str += (no1+no2)>11?'大':'小';
          return str;
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

              this.$http.post(`${this.api}/admin/cake/manLottery`,data).then(function(res) {
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
          open_prize:function (res) {
              this.expect=res;
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
</style>
