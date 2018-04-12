<template>

    <div>
      <div class="xy-list">
        <a :class="table_lotterys[0]?'active':''" @click="tab_lottery(0)">
          本周报表
        </a>
        <a :class="table_lotterys[1]?'active':''" @click="tab_lottery(1)">
          上周报表
        </a>
      </div>
      <table class="table table-bordered">
        <thead>
        <tr>
          <td>日期</td>
          <td>下注条数</td>
          <td>下注总金额</td>
          <td>盈亏</td>
          <td>返水</td>
          <td>退水后盈亏</td>
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


      <table class="table table-bordered" v-show="details_show" style="font-size: 12px;">
        <tr>
          <td>彩种</td>
          <td>期数</td>
          <td>注单号</td>
          <td>时间</td>
          <td>下注内容</td>
          <td>下注金额</td>
          <td>中奖结果</td>
        </tr>
        <tr v-for="v in details_data">
          <td>{{v.lty_name}}</td>
          <td>{{v.expect}}</td>
          <td>{{v.order_no}}</td>
          <td>{{v.create_time}}</td>
          <td>{{v.mark_a}}{{v.mark_b}}({{v.rate}})</td>
          <td>{{v.money}}</td>
          <td>{{v.open_ret==1?'中奖':'未中奖'}}</td>
        </tr>
      </table>

      <div class="page-xy" v-show="details_show">
        <span @click="prev_page">◀</span>
        <input type="text" v-model="page"  disabled>
        <span @click="next_page">▶</span>
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
          else alert('没有下一页');

        },
        //上一页
        prev_page:function(){
          if(this.prev_url) this.list = this.get_details('',this.api + this.prev_url);
          else alert('没有上一页');
        },



        /**
         * 获取上周和本周的下注统计
         */
        get_all_data:function()
        {
          this.$http.get(`${this.api}/admin/clearList?user_id=${this.user_id}`).then(function(res)
          {
            console.log(res.data.data);
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
              console.log(res.data.data);
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

      },//methods end
    created:function()
    {
      this.user_id = this.$route.params.u_id?this.$route.params.u_id:window.sessionStorage.sum_uid;
      window.sessionStorage.sum_uid = this.user_id;
      console.log(this.user_id)
      this.get_all_data();
    },
  }

</script>


<style scoped>
  .xy-list>.active
  {
    font-size: 18px;
    font-weight: 700;
  }

  .page-xy>input
  {
    width: 40px;
    height: 20px;

  }

</style>
