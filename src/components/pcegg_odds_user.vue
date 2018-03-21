<template>
  <div id='cqssc_odds_user'>
    <table class="table table-hover table-bordered table-striped text-center">
      <thead>
      <tr>
        <td>序号</td>
        <td>用户名</td>
        <td>昵称</td>
        <td>默认盘口</td>
        <td>操作</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(v,k) in list">
        <td>{{k}}</td>
        <td>{{v.user.username}}</td>
        <td>{{v.user.nickname}}</td>
        <td>
          <select  class="form-control" v-model="v.ratewin_name">
            <option v-for="(val,key) in all_handicap" v-bind:value="val">{{val}}</option>
          </select>
        </td>
        <td>
          <button class="btn btn-info" @click="add_hancicap(v.ratewin_name,v.id)">添加</button>
          <button class="btn btn-primary" @click="change_handicap(v.ratewin_name,v.id)">修改</button>
        </td>
      </tr>
      </tbody>
    </table>



    <div id="myModal" v-show="isShow" @click="close()">
      <div class="panel panel-info center-block" @click="stop_cancel()">

        <div class="panel-heading">添加盘口</div>

        <div class="panel-body form-horizontal">

          <div class="form-group" >
            <button  v-for="(val,key) in all_handicap" class="btn btn-warning center-block" v-if="val != user_has_handicap" @click="do_add(val)">
                添加{{val}}盘
            </button>
          </div>

        </div>

        <div class="panel-footer">
          <button class="btn btn-info pull-right mr10" @click="isShow = false">取消</button>
          <div class="clearfix"></div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'pk10_odds_user',
    data: function () {
      return {
        list: [],
        all_handicap:[],
        isShow:false,
        user_has_handicap:'',
        user_id:0,
        ratewin_name:'',
      };
    },
    created: function () {
      this.get_all();
      this.get_all_handicap();
    },
    methods: {
      get_all_handicap: function () {
        this.$http.get(`${this.api}/admin/egg/odds`)
          .then(function (res) {
            if (res.data.status == 200) {
                for(let i = 0;i<res.data.data.odds_list.length;i++)
                {
                   this.all_handicap.push((res.data.data.odds_list[i].name).toUpperCase());
                }
            }
            else {
              console.log(`盘口加载失败`);
            }
          })
      },
      get_all: function () {
        this.$http.get(`${this.api}/admin/egg/ratelist`)
          .then(function (res) {
            if (res.data.status == 200) {
              this.list = res.data.data.ratelist;
            }
            else {
              console.log(`加载失败`);
            }
          });
      },
      change_handicap:function(val,handicap_id){
          this.$http.put(`${this.api}/admin/egg/ratelist/${handicap_id}`,{"ratewin_name":val,sel:1})
            .then(function(res)
            {
                if(res.data.status == 201)
                {
                  alert(res.data.msg);
                  return;
                }
                else
                {
                  alert('修改失败');
                }
            });
      },
      delete_handicap:function(handicap_id){
        this.$http.put(`${this.api}/admin/egg/ratelist/${handicap_id}`)
          .then(function(res)
          {
            console.log(res.data);
            if(res.data.status == 201)
            {
              alert(res.data.msg);
              return;
            }
            else
            {
              alert('删除失败');
            }
          });
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
      add_hancicap:function(user_s_handicap,user_id)
      {
        this.isShow = true;
        this.user_has_handicap = user_s_handicap;
        this.user_id = user_id;
      },
      do_add:function(handicap_id){
         this.$http.post(`${this.api}/admin/egg/ratelist/`,{
           user_id:this.user_id,
           ratewin_name:handicap_id,
           sel:0,
         }).then(function(res){
            if(res.data.status == 200)
            {
              alert(res.data.msg);
              return;
            }
            else
            {
              alert(res.data.msg);
              return;
            }
         });
      }
    },
  }
</script>

<style scoped>
  .table {
    width: 80%;
    margin: 0 auto;
    margin-top: 50px;
  }
  #myModal>.panel
  {
    width: 600px;
    margin-top: 150px;
  }
</style>
