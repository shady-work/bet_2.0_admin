<template>
  <div id="cqssc">
    <table class="table table-bordered table-striped table-hover">
      <thead>
      <tr class="text-center">
        <td> 序号</td>
        <td>用户名</td>
        <td>昵称</td>
        <td>最小下注额</td>
        <td>最大下注额</td>
        <td>最大中奖额</td>
        <td>转盘比例</td>
        <td>中奖大于多少转盘</td>
        <td>转盘密钥</td>
        <td>下注大于多少转盘</td>
        <td>转盘API地址</td>
        <td>操作</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(v,k) in list" class="text-center" v-if="v.user">
        <td>{{k+1}}</td>
        <td>{{v.user.username}}</td>
        <td>{{v.user.nickname}}</td>
        <td>{{v.money_min}}</td>
        <td>{{v.money_max}}</td>
        <td>{{v.money_win}}</td>
        <td>{{v.trad_rate}}</td>
        <td>{{v.trad_win}}</td>
        <td>{{v.trad_tokensup?v.trad_tokensup:'尚未设定'}}</td>
        <td>{{v.trad_max}}</td>
        <td>{{v.trad_url?v.trad_url:'尚未设定'}}</td>
        <td>
          <button class="btn btn-primary" @click="edit_one(v.id)">编辑</button>
        </td>
      </tr>
      </tbody>
    </table>

    <div id="myModal" v-show="isShow" @click="close()">
      <div class="panel panel-info center-block" @click="stop_cancel()">
        <div class="panel-heading">修改用户注额</div>

        <div class="panel-body form-horizontal">
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">最小下注额</label>
            <div class="col-sm-10">
              <input type="text" v-model="money_min" class="form-control" id="inputEmail3" placeholder="请输入">
            </div>
          </div>
        </div>

        <div class="panel-body form-horizontal">
          <div class="form-group">
            <label for="inputEmail4" class="col-sm-2 control-label">最大下注额</label>
            <div class="col-sm-10">
              <input type="text" v-model="money_max" class="form-control" id="inputEmail4" placeholder="请输入">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail4" class="col-sm-2 control-label">最大下注额</label>
            <div class="col-sm-10">
              <input type="text" v-model="money_max" class="form-control" id="inputEmail4" placeholder="请输入">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail5" class="col-sm-2 control-label">最大中奖额</label>
            <div class="col-sm-10">
              <input type="text" v-model="money_win" class="form-control" id="inputEmail5" placeholder="请输入">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail5" class="col-sm-2 control-label">转盘比例</label>
            <div class="col-sm-10">
              <input type="text" v-model="trad_rate" class="form-control" id="inputEmail5" placeholder="请输入">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail6" class="col-sm-2 control-label">中奖大于多少转盘</label>
            <div class="col-sm-10">
              <input type="text" v-model="trad_win" class="form-control" id="inputEmail6" placeholder="请输入">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail7" class="col-sm-2 control-label">下注大于多少转盘</label>
            <div class="col-sm-10">
              <input type="text" v-model="trad_max" class="form-control" id="inputEmail7" placeholder="请输入">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail8" class="col-sm-2 control-label">转盘API地址</label>
            <div class="col-sm-10">
              <input type="text" v-model="trad_url" class="form-control" id="inputEmail8" placeholder="请输入">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail9" class="col-sm-2 control-label">转盘密钥</label>
            <div class="col-sm-10">
              <input type="text" v-model="trad_tokensup" class="form-control" id="inputEmail9" placeholder="请输入">
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

  </div> <!--end #cqssc-->
</template>

<script>
  export default {
    name: "pcegg",
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
        one_id: ""
      };
    },
    created() {
      this.get_user_bet_rules();
    },
    methods: {
      /**@augments none   load all user's bet_rules */
      get_user_bet_rules: function (param) {
        this.$http.get(this.api + "/admin/cake/user").then(function (res) {
          if (res.data.status == 200) {
            this.list = res.data.data.list;
          }
        });
      },
      /**@augments rule_id   load someone's cqssc rule,show the edit DIV */
      edit_one: function (rule_id) {
        this.$http
          .get(`${this.api}/admin/cake/user/${rule_id}/edit`)
          .then(function (res) {
            let data = res.data;
            if (data.status == 200) {
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
            } else {
              console.log("load failed");
            }
          });
      },
      /**@description   prevent bubble events */
      stop_cancel: function (e) {
        let event = e || window.event;
        event.cancelBubble = true;
      },
      /**@description  hide DIV */
      close: function (e) {
        this.isShow = false;
        let event = e || window.event;
        event.cancelBubble = true;
      },
      /**@description    edit someone's rule,hide DIV */
      do_edit: function () {
        this.$http
          .put(`${this.api}/admin/cake/user/${this.one_id}`, {
            money_max: this.money_max,
            money_min: this.money_min,
            money_win: this.money_win,
            trad_max: this.trad_max,
            trad_rate: this.trad_rate,
            trad_tokensup: this.trad_tokensup,
            trad_url: this.trad_url,
            trad_win: this.trad_win
          })
          .then(function (res) {
            if (res.data.status == 0) {
              this.get_user_bet_rules();
              this.isShow = false;
              alert("修改成功");
              return;
            }
          });
      }
    } //end methods
  };
</script>

<style scoped>
  #myModal > .panel {
    width: 800px;
    margin-top: 50px;
  }

  .table {
    width: 80%;
    margin: 0 auto;
    margin-top: 50px;
  }
</style>
