<template>
  <div id="cqssc_history">
    <h3>加拿大28用户下注历史</h3>
    <table class="table table-bordered table-hover table-striped text-center">
      <thead>
      <tr>
        <td>用户名-昵称</td>
        <td>期数</td>
        <td>订单号</td>
        <td>下注内容</td>
        <td>下注金额</td>
        <td>是否结算</td>
        <td>是否中奖</td>
        <td>是否转盘</td>
        <td>状态</td>
        <td>更新时间</td>
        <td>操作</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(v,k) in history_codes">
        <td>{{v.username}}-{{v.nickname}}</td>
        <td>{{v.expect}}</td>
        <td>{{v.order_no}}</td>
        <td>{{v.mark_a}}-{{v.mark_b}}</td>
        <td>{{v.money}}</td>
        <td>{{v.open_stu==0?'未结算':'已结算'}}</td>
        <td>{{v.open_ret==0?'未中奖':'中奖'}}</td>
        <td>{{v.trad_stu==0?'未转':'转盘'}}</td>
          <td>{{v.status==1?"已开奖":(v.status==0?'未开奖':'已取消')}}</td>
        <td>{{v.update_time}}</td>
        <td>
          <button class="btn btn-primary btn-sm" @click="show_details(v)">查看详情</button>
        </td>
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


    <div id="myModal" v-show="isShow" @click="close()">
      <div class="panel panel-info center-block" @click="stop_cancel()">

        <div class="panel-heading">xw</div>

        <div class="panel-body form-horizontal">

          <div class="form-group">
            <label  class="col-sm-3 control-label">用户名-昵称</label>
            <div class="col-sm-8">
              <p class="form-control">{{username+'-'+nickname}}</p>
            </div>
          </div>

          <div class="form-group">
            <label  class="col-sm-3 control-label">期数</label>
            <div class="col-sm-8">
              <p class="form-control">{{expect}}</p>
            </div>
          </div>

          <div class="form-group">
            <label  class="col-sm-3 control-label">订单号</label>
            <div class="col-sm-8">
              <p class="form-control">{{order_no}}</p>
            </div>
          </div>

          <div class="form-group">
            <label  class="col-sm-3 control-label">下注内容</label>
            <div class="col-sm-8">
              <p class="form-control">{{mark_a}}-{{mark_b}}</p>
            </div>
          </div>

          <div class="form-group">
            <label  class="col-sm-3 control-label">下注金额</label>
            <div class="col-sm-8">
              <p class="form-control">{{money}}</p>
            </div>
          </div>

          <div class="form-group">
            <label  class="col-sm-3 control-label">是否结算</label>
            <div class="col-sm-8">
              <p class="form-control">{{open_stu==0?'未结算':'已结算'}}</p>
            </div>
          </div>

          <div class="form-group">
            <label  class="col-sm-3 control-label">是否中奖</label>
            <div class="col-sm-8">
              <p class="form-control">{{open_ret==0?'未中奖':'中奖'}}</p>
            </div>
          </div>

          <div class="form-group">
            <label  class="col-sm-3 control-label">是否转盘</label>
            <div class="col-sm-8">
              <p class="form-control">{{trad_stu==0?'未转':'转盘'}}</p>
            </div>
          </div>
          <div class="form-group">
            <label  class="col-sm-3 control-label">开奖号码</label>
            <div class="col-sm-8">
              <p class="form-control">{{open_code}}</p>
            </div>
          </div>
          <div class="form-group">
            <label  class="col-sm-3 control-label">输赢额</label>
            <div class="col-sm-8">
              <p class="form-control">{{open_win}}</p>
            </div>
          </div>
          <div class="form-group" v-if="$store.state.son_off">
            <label  class="col-sm-3 control-label">转盘金额</label>
            <div class="col-sm-8">
              <p class="form-control">{{trad_val}}</p>
            </div>
          </div>
          <div class="form-group" v-if="$store.state.son_off">
            <label  class="col-sm-3 control-label">转盘API</label>
            <div class="col-sm-8">
              <p class="form-control">{{trad_url}}</p>
            </div>
          </div>
          <div class="form-group" v-if="$store.state.son_off">
            <label  class="col-sm-3 control-label">转盘密钥</label>
            <div class="col-sm-8">
              <p class="form-control">{{trad_tokensup}}</p>
            </div>
          </div>
          <div class="form-group" v-if="$store.state.son_off">
            <label  class="col-sm-3 control-label">转盘返回信息</label>
            <div class="col-sm-8">
              <p class="form-control">{{trad_return}}</p>
            </div>
          </div>
        </div>
        <div class="panel-footer">
          <button class="btn btn-info pull-right mr10" @click="isShow = false">关闭</button>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
    <br>
    <br>


  </div>
</template>

<script>
  export default
  {
    name:'pcegg_history_bet',
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
        isShow:false,
        create_time:'',
        expect:'',
        fs_a:'',
        fs_av:'',
        fs_g:'',
        fs_gv:'',
        fs_m:'',
        fs_mv:'',
        fs_s:'',
        fs_sv:'',
        id:'',
        ls_a:'',
        ls_av:'',
        ls_g:'',
        ls_gv:'',
        ls_m:'',
        ls_mv:'',
        ls_s:'',
        ls_sv:'',
        lty_name:'',
        mark_a:'',
        mark_b:'',
        money:'',
        nickname:'',
        open_code:'',
        open_ret:'',
        open_stu:'',
        open_win:'',
        order_no:'',
        rate:'',
        status:'',
        trad_return:'',
        trad_stu:'',
        trad_tokensup:'',
        trad_url:'',
        trad_val:'',
        update_time:'',
        username:'',
        win:'',
        sum:0,
        pageNum:0,
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
          this.$http.get(`${this.api}/admin/cake/history/order`)
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
                  this.$message.error('数据加载失败');
                }
              });
          }
        },
        stop_cancel:function(e)
        {
          let event = e || window.event;
          event.cancelBubble = true;
        },
        close:function(e)
        {
          this.isShow = false;
          let event = e || window.event;
          event.cancelBubble = true;
        },
        show_details:function(val)
        {
          this.win = val.win;
          this.username = val.username;
          this.update_time = val.update_time;
          this.trad_val = val.trad_val;
          this.trad_url = val.trad_url;
          this.trad_tokensup = val.trad_tokensup;
          this.trad_stu = val.trad_stu;
          this.trad_return = val.trad_return;
          this.status = val.status;
          this.rate = val.rate;
          this.open_win = val.open_win;
          this.order_no = val.order_no;
          this.open_stu = val.open_stu;
          this.open_ret = val.open_ret;
          this.open_code = val.open_code;
          this.nickname = val.nickname;
          this.money = val.money;
          this.mark_b = val.mark_b;
          this.mark_a = val.mark_a;
          this.lty_name = val.lty_name;
          this.ls_sv = val.ls_sv;
          this.ls_s = val.ls_s;
          this.ls_mv = val.ls_mv;
          this.ls_m = val.ls_m;
          this.ls_gv = val.ls_gv;
          this.ls_g = val.ls_g;
          this.ls_av = val.ls_av;
          this.ls_a = val.ls_a;
          this.id = val.id;
          this.fs_sv = val.fs_sv;
          this.fs_s = val.fs_mv;
          this.fs_m = val.fs_m;
          this.fs_gv = val.fs_gv;
          this.fs_av = val.fs_av;
          this.fs_a = val.fs_a;
          this.expect = val.expect;
          this.create_time = val.create_time;
          this.isShow = true;
        },
      },
  };
</script>

<style scoped>
  .table {
    margin-top: 20px;
    font-size: 12px;
  }
  #myModal>.panel
  {
    width: 600px;
    margin-top: 50px;
  }
  .form-group
  {
    margin-bottom:0;
  }
  #cqssc_history{
    margin-left:10px;
    width:1100px;
  }
</style>
