<template>

    <div style="margin-left:20px;margin-top:10px;">
      <h4 style="margin-top:30px;margin-bottom:30px;width:100%;">
        用户名：<span class="label label-default">{{user.username}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        状态：<span class="label" :class="user.status==1?'label-success':'label-danger'">{{user.status==1?'启用':'禁用'}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
        类型：{{user.type == 0?'会员':(user.type == 1?'代理':(user.type==2?'推广':(user.type == 3?'管理':'')))}}
        <router-link to="users" class="pull-right mr10">返回查看用户列表</router-link>
      </h4>

      <div class="xy-list">
        <a :class="table_lotterys[0]?'active':''" @click="tab_lottery(0)" style="cursor: pointer">
          本周报表
        </a>
        <a :class="table_lotterys[1]?'active':''" @click="tab_lottery(1)" style="cursor: pointer">
          上周报表
        </a>
      </div>
      <table class="table table-bordered">
        <thead>
        <tr>
          <th>日期</th>
          <th>下注条数</th>
          <th>下注总金额</th>
          <th>盈亏</th>
          <th>返水</th>
          <th>退水后盈亏</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(v,k) in data">
          <td>{{v.week_name}}/{{v.date_str }}</td>
          <td>{{v.sum_data.order_num}}</td>
          <td>{{v.sum_data.sum_money}}</td>
          <td>{{v.sum_data.win}}</td>
          <td>{{v.sum_data.fs}}</td>
          <td class="color-red">
            <a @click="get_details(v.date_str)" v-if="v.sum_data.winAndFs != 0" style="font-weight: 700;cursor: pointer;text-decoration:underline;">
              {{v.sum_data.winAndFs}}
            </a>
            <span v-else>
                        {{v.sum_data.winAndFs}}
                      </span>
          </td>
        </tr>
        </tbody>
      </table>


      <table border="1" class="table table-bordered table-hover table-striped text-center" v-show="details_show" style="font-size:14px;">
        <thead>
        <tr >
          <th>彩种</th>
          <th>期数</th>
          <th>注单号</th>
          <th>时间</th>
          <th>下注内容</th>
          <th>下注金额</th>
          <th>中奖结果</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="v in details_data">
          <td>{{v.lty_name}}</td>
          <td>{{v.expect}}</td>
          <td >{{v.order_no}}</td>
          <td>{{v.create_time}}</td>
          <td>{{v.mark_a}}{{v.mark_b}}({{v.rate}})</td>
          <td>{{v.money}}</td>
          <td >{{v.open_ret==1?'中奖':'未中奖'}}</td>
        </tr>
        </tbody>
      </table>

      <div class="page-xy" v-show="details_show">
        <span @click="prev_page" style="cursor:pointer">◀</span>
        <input type="text" v-model="page"  disabled>
        <span @click="next_page" style="cursor:pointer">▶</span>
      </div>
    </div>
</template>


<script>
  export default
  {
    name:"user_sum",
    data:function()
    {
      var data =
        {
          tableArray:[1,0,0],
          table_lotterys:[1,0,0,0],
          next_url:'',
          prev_url:'',
          list:[],
          page :1,
          which_time:'',//查看报表的哪一段时间
          summary:{},//报表数据
          sum_week:{},//本周和上周的结算报表
          data:[],
          details_data:[],
          details_show:false,
          user:{},

        };
      return data;
    },
    methods:
      {

        close:function()
        {
          this.$parent.showArray = [0,0,0,0,0,0,0,0,0];
          this.which_time = '';
        },
        stop:function(event)
        {
          event.cancelBubble = true;
        },
        showOne:function(idx)
        {
          this.tableArray = [0,0,0];
          this.tableArray[idx] = 1;
        },
        tab_lottery:function(idx,str)
        {

          this.table_lotterys = [0,0,0,0];
          this.table_lotterys[idx] = 1;
          this.details_show = false;
          if(idx == 0 )
          {
            this.data = this.sum_week['this_week'];
          }
          if(idx == 1 )
          {
            this.data = this.sum_week['last_week'];
          }
        },
        //下一页
        next_page:function(){
          if(this.next_url) this.list = this.get_details('',this.api + this.next_url);
          else this.$message.error('没有下一页');

        },
        //上一页
        prev_page:function(){
          if(this.prev_url) this.list = this.get_details('',this.api + this.prev_url);
          else this.$message.error('没有上一页');
        },



        /**
         * 获取上周和本周的下注统计
         */
        get_all_data:function()
        {
          this.$http.get(`${this.api}/admin/clearList?user_id=${this.user_id}`).then(function(res)
          {

            if(res.data.status == 200)
            {
              this.sum_week = res.data.data;
              this.data = this.sum_week.this_week;
            }

          });
        },
        get_details:function(date_str,url)
        {
          this.details_show = true;
          if(url)
          {
            this.$http.get(url+'&per_page=10').then(function(res)
            {

              if(res.data.status == 200)
              {
                  // console.log(res.data);
                  let data = res.data.data;
                this.next_url = data.nextPageUrl;
                this.prev_url = data.prevPageUrl;
                this.details_data = data.orders;
                this.page = data.curPage;
              }
            });
          }
          else
          {
            this.$http.get(`${this.api}/admin/details?date=${date_str}&per_page=10&user_id=${this.user_id}`).then(function(res)
            {
              // console.log(res.data.data);
              if(res.data.status == 200)
              {
                let data = res.data.data;
                this.next_url = data.nextPageUrl;
                this.prev_url = data.prevPageUrl;
                this.details_data = data.orders;
                this.page = data.curPage;
              }
            });
          }

        },

        //获取用户的信息
        get_user_info()
        {
           this.$http.get(this.api + "/admin/users/" + this.user_id).then(function(res)
           {
             console.log(res.data);
             if(res.data.status == 200 )
             {
               this.user = res.data.data.user
             }
           })
        }

      },//methods end
    created:function()
    {
      this.user_id = this.$route.params.u_id?this.$route.params.u_id:window.sessionStorage.sum_uid;
      window.sessionStorage.sum_uid = this.user_id;
      this.get_all_data();
      this.get_user_info();
    },
  }

</script>


<style scoped>
  .xy-list{
    padding:10px 0;
  }
  .xy-list>.active
  {
    font-size: 18px;
    font-weight: 700;
  }
  .page-xy{
    margin-left:600px;
  }
  .page-xy>input
  {
    width: 40px;
    height: 25px;
    text-align: center;

  }
  /*.table {*/

    /*font-size: 12px!important;*/
  /*}*/
  table{
    width:100%;
  }
  table thead th{
    padding:10px;
    font-weight:600;
    font-size: 16px;
  }
  table tr td
  {
    font-size: 14px!important;
    padding:8px;
    /*font-weight: 700;*/
  }
</style>
