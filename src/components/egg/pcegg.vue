<template>
  <div id="cqssc">

    <table class="table table-bordered table-striped table-hover">
      <thead>
      <tr class="text-center" v-if="$store.state.son_off">
        <td>用户名</td>
        <td>最小下注额</td>
        <td>最大下注额</td>
        <td>最大中奖额</td>
         <td>转盘比例</td>
        <td>中奖大于多少转盘</td>
        <td>下注大于多少转盘</td>
        <td>转盘密钥-转盘API地址</td>
        <td width="180">操作</td>
      </tr>
      <tr class="text-center" v-else>
        <td>用户名</td>
        <td>最小下注额</td>
        <td>最大下注额</td>
        <td>最大中奖额</td>
        <td width="180">操作</td>
      </tr>
      </thead>
      <tbody>

      <tr v-for="(v,k) in list" class="text-center" v-if="v.user" v-show="$store.state.son_off">
          <td>{{v.user.username}}</td>
          <td>{{v.money_min}}</td>
          <td>{{v.money_max}}</td>
          <td>{{v.money_win}}</td>
          <td >{{v.trad_rate}}</td>
          <td>{{v.trad_win}}</td>
          <td>{{v.trad_max}}</td>
          <td>
              <a v-if="v.trad_tokensup" @click="show_users_tokensup(v.trad_tokensup,v.user.username,v.trad_url)" class="pointer">点此查看</a>
              <span v-else>尚未设定</span>
          </td>
          <td>
              <button class="btn btn-primary" @click="edit_one(v.id)">编辑</button>
              <button class="btn btn-warning" @click="check_handicaps(v.user.id)">查看盘口</button>
          </td>
      </tr>
      <tr v-for="(v,k) in list" class="text-center" v-if="v.user" v-show="!$store.state.son_off">
          <td>{{v.user.username}}</td>
          <td>{{v.money_min}}</td>
          <td>{{v.money_max}}</td>
          <td>{{v.money_win}}</td>
          <td>
              <button class="btn btn-primary" @click="edit_one(v.id)">编辑</button>
              <button class="btn btn-warning" @click="check_handicaps(v.user.id)">查看盘口</button>
          </td>
      </tr>
      </tbody>
    </table>

    <div class="task_" v-show="isShow" @click="close()">
      <div class="panel panel-info center-block task-panel" @click="stop_cancel()">
        <div class="panel-heading">修改用户注额</div>
        <div class="panel-body form-horizontal">
          <div class="form-group">
            <label for="inputEmail4" class="col-sm-2 control-label">最小下注额</label>
            <div class="col-sm-10">
              <input type="text" v-model="money_min"  class="form-control" id="inputEmail3" placeholder="请输入">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail4" class="col-sm-2 control-label">最大下注额</label>
            <div class="col-sm-10">
              <input type="text" v-model="money_max"  class="form-control" id="inputEmail4" placeholder="请输入">
            </div>
          </div>

          <div class="form-group">
            <label for="inputEmail5" class="col-sm-2 control-label">最大中奖额</label>
            <div class="col-sm-10">
              <input type="text" v-model="money_win"  class="form-control" id="inputEmail5" placeholder="请输入">
            </div>
          </div>
           <div class="form-group">
            <label for="inputEmail5" class="col-sm-2 control-label">转盘比例</label>
            <div class="col-sm-10">
              <input type="text" v-model="trad_rate"  class="form-control" id="inputEmail5" placeholder="请输入">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail6" class="col-sm-2 control-label">中奖大于多少转盘</label>
            <div class="col-sm-10">
              <input type="text" v-model="trad_win"  class="form-control" id="inputEmail6" placeholder="请输入">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail7" class="col-sm-2 control-label">下注大于多少转盘</label>
            <div class="col-sm-10">
              <input type="text" v-model="trad_max"  class="form-control" id="inputEmail7" placeholder="请输入">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail8" class="col-sm-2 control-label">转盘选择</label>
            <div class="col-sm-10">
              <select class="form-control" v-model="which_trad_rule">
                <option v-bind:value="'xxx'">不设定</option>
                <option v-for="(v,k) in trad_list" v-bind:value="k">{{v.trad_name}}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail8" class="col-sm-2 control-label">转盘API地址</label>
            <div class="col-sm-10">
              <input type="text" readonly v-model="trad_url"  class="form-control" id="inputEmail8" placeholder="">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail9" class="col-sm-2 control-label">转盘密钥</label>
            <div class="col-sm-10">
              <input type="text" readonly v-model="trad_tokensup"  class="form-control" id="inputEmail9" placeholder="">
            </div>
          </div>
        </div>



        <div class="panel-footer">
          <button class="btn btn-primary pull-right" @click="do_edit()">修改</button>
          <button class="btn btn-info pull-right mr10" @click="isShow = false">取消</button>
          <div class="clearfix"></div>
        </div>

      </div>
    </div>

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
  </div> <!--end #cqssc-->
</template>

<script>
  export default {
    name: "cqssc",
    data() {
      return {
        list: [], //the bet_rules of list
        money_max: "",
        money_min: "",
        money_win: "",
        trad_max: "",
        trad_rate: "",
        trad_tokensup: "",
        trad_url: "",
        trad_win: "",
        isShow: false,
        one_id: "",
        page:1,
        per_page:15,
        hasNext:false,
        hasPrev:false,
        nextPageUrl:'',
        prevPageUrl:'',
        sum:0,
        pageNum:0,
        trad_list:[],//转盘列表
        which_trad_rule:'xxx',//转盘列表的下标
        users_tokensup:'',//转盘密钥
        users_url:'',//转盘api url
      };
    },
    created()
    {
      this.get_user_bet_rules();
      this.get_trad_list();
    },
    methods: {
      show_users_tokensup(tokensup,username,users_url)
      {
        this.users_tokensup = tokensup;
        this.users_url = users_url;
        this.$alert(this.users_tokensup + '<p>' + this.users_url + '</p>', `用户${username}的转盘密钥-转盘API地址`, {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true,
          // center:'left',
        });
      },
      /**@augments none   load all user's bet_rules */
      get_user_bet_rules: function(param) {
        this.$http.get(this.api + "/admin/egg/user").then(function(res) {
          if (res.data.status == 200) {
            this.list = res.data.data.list;
            this.hasPrev = res.data.data.hasPrev;
            this.hasNext = res.data.data.hasNext;
            this.sum = res.data.data.sum;
            this.pageNum = res.data.data.pageNum;
            this.prevPageUrl = this.hasPrev?res.data.data.prevPageUrl:'';
            this.nextPageUrl = this.hasNext?res.data.data.nextPageUrl:'';
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
                this.list = res.data.data.list;
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
                this.list = res.data.data.list;
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
      /**@augments rule_id   load someone's cqssc rule,show the edit DIV */
      edit_one: function(rule_id) {
        this.$http
          .get(`${this.api}/admin/egg/user/${rule_id}/edit`)
          .then(function(res) {
            let data = res.data;
            if (data.status == 200) {
              this.which_trad_rule = 'xxx';
              this.money_max = data.data.list.money_max;
              this.money_min = data.data.list.money_min;
              this.money_win = data.data.list.money_win;
              this.trad_max = data.data.list.trad_max;
              this.trad_rate = data.data.list.trad_rate;
              this.trad_tokensup = data.data.list.trad_tokensup;
              this.trad_url = data.data.list.trad_url;
              this.trad_win = data.data.list.trad_win;
              this.one_id = data.data.list.id;
              this.isShow = true;
              if(this.trad_url)
              {
                for(let i = 0 ; i < this.trad_list.length;i++)
                {
                  if(this.trad_tokensup == this.trad_list[i].trad_tokensup)
                  {
                    this.which_trad_rule = i ;
                    break;
                  }
                }
              }
            }
            else
            {
              console.log("load failed");
            }
          });
      },
      /**@description   prevent bubble events */
      stop_cancel: function(e) {
        let event = e || window.event;
        event.cancelBubble = true;
      },
      /**@description  hide DIV */
      close: function(e) {
        this.isShow = false;
        let event = e || window.event;
        event.cancelBubble = true;
      },
      /**@description    edit someone's rule,hide DIV */
      do_edit: function() {
        this.$http
          .put(`${this.api}/admin/egg/user/${this.one_id}`, {
            money_max: this.money_max,
            money_min: this.money_min,
            money_win: this.money_win,
            trad_max: this.trad_max,
            trad_rate: this.trad_rate,
            trad_tokensup: this.trad_tokensup,
            trad_url: this.trad_url,
            trad_win: this.trad_win
          })
          .then(function(res) {
            if (res.data.msg == "修改成功") {
               this.get_user_bet_rules();
            this.isShow = false;
            // alert("修改成功");
             this.$message(
                    {
                        message:res.data.msg,
                        center:true,
                        type:'success',
                    });
            return;
            }else{
              this.$message.error('修改失败');
            }
          });
      },
      //跳转到用户盘口
      check_handicaps:function(u_id)
       {
          this.$router.push(
            {
              path:'users_handicaps_egg',
              name:'users_handicaps_egg',
              params:{u_id}
            }
          );
       },
      // 获取转盘列表
      get_trad_list:function()
      {
        this.$http.get(`${this.api}/admin/egg/tradlist`).then(function(res)
        {
          if(res.data.status == 200)
          {
            this.trad_list = res.data.data.trad_list;
          }
          else
          {
            alert('转盘列表加载失败');
          }
        });
      }

    }, //end methods
    watch:
      {
        'which_trad_rule':function(n)
        {
          if(n == 'xxx')
          {
            this.trad_url = '';
            this.trad_tokensup = '';

          }
          else
          {
            this.trad_url = this.trad_list[n].trad_url;
            this.trad_tokensup = this.trad_list[n].trad_tokensup;
          }
        },
      }
  };
</script>

<style scoped>
  #myModal > .panel
  {
    width: 800px;
    margin-top: 50px;
  }
  .table
  {
    font-size: 12px;
  }
  #cqssc{
    width:1100px;
    margin-left:10px;
    margin-top:5px;
  }
</style>
