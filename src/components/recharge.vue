<style scoped>
.table
  {
    width:100%;
    /*margin-left:10px;*/
    margin-top:10px;
  }
  .my-nav
  {
    width:100%;
    /*margin-left:10px;*/
    margin:30px 0;
  }
  .table thead td{
    padding:15px 0;
    font-size: 16px;
    font-weight: 600;
  }
.row{
  font-size: 16px;
}
</style>

<template>
  <div id="recharge">
      <ul class="nav nav-tabs my-nav  nav-justified">
        <li role="presentation" class="active"><a >充值</a></li>
        <li role="presentation" ><a href="#/withdraw">提现</a></li>
      </ul>
      <table class="table table-hover table-bordered table-striped text-center middle">
          <thead>
            <tr class="middle">
              <td>序号</td>
              <td>用户名/昵称</td>
              <td>充值金额</td>
              <td>充值类型</td>
              <td>充值信息</td>
              <td>状态</td>
              <td>时间</td>
              <td  v-show='!one_user_recharge'>操作</td>
            </tr>
          </thead>
          <tbody class="middle">
            <tr v-for="(v,k) in list" class="middle">
                <td>
                  {{k}}
                </td>
                <td>{{v.username}}/{{v.nickname}}</td>
                <td>
                  {{v.money}}
                </td>
                <td>
                {{v.con}}
                </td>
                <td v-html="v.tp_mark" style="text-align:center;">
                </td>
                <td>
                  <b v-if="v.tp_stu==1" class="text-warning">待审核</b>
                  <b v-if="v.tp_stu==0" class="text-danger">充值不通过</b>
                  <b class="text-info"  v-if="v.tp_stu==2" >充值通过</b>
                </td>
                <td>{{v.tp_time}}</td>
                <td v-if="v.tp_stu==1" style="text-align:center;">
                  <button  class="btn btn-primary btn-sm" @click="review_recharge(v.id,2)">通过</button>
                  <button  class="btn btn-primary btn-sm" @click="review_recharge(v.id,0)">拒绝</button>
                  <button class="btn btn-danger btn-sm"  @click="delete_one(v.id)">删除</button>
                </td>
                 <td v-if="v.tp_stu!=1" style="text-align:center;">
                  <button class="btn btn-danger btn-sm"  @click="delete_one(v.id)">删除</button>
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
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      list: [], //recharge list 初始化的充值列表
      list_all_back_up: [], //all recharge lit back up; element 样式控制
      one_user_recharge: false, //some one's recharge list
      page:1,
      per_page:15,
      hasNext:false,
      hasPrev:false,
      nextPageUrl:'',
      prevPageUrl:'',
       sum:0,
                  pageNum:0,
    };
  },
  methods: {
    /*
     *load all recharge records
     *@augments
     *
     */
    get_recharge_list: function() {
      this.$http.get(this.api + "/admin/topups").then(function(res) {
        if (res.data.status == 200) {
          this.list = res.data.data.topups.list;
          this.list_all_back_up = res.data.data.topups.list;
          this.hasPrev = res.data.data.topups.hasPrev;
          this.hasNext = res.data.data.topups.hasNext;
          this.sum = res.data.data.topups.sum;
          this.pageNum = res.data.data.topups.pageNum;
          this.prevPageUrl = this.hasPrev? res.data.datwia.topups.prevPageUrl:'';
          this.nextPageUrl = this.hasNext? res.data.data.topups.nextPageUrl:'';
        }
      });
    },
    /*刪除*/
    delete_one: function(recharge_id) {
      this.$http.delete(this.api + "/admin/topups/" + recharge_id)
        .then(function(res) {
          if (res.data.status == 200) {
          this.$message(
              {
                  message:res.data.msg,
                  center:true,
                  type:'success',
              });
          } else {
              this.$message.error(res.data.msg);
          }
          this.get_recharge_list();
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
              this.list = res.data.data.topups;
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
              this.list = res.data.data.topups;
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
    review_recharge: function(rechagre_id, review_state) {
      this.$http
        .put(this.api + "/admin/topups/" + rechagre_id, { pass: review_state })
        .then(function(res) {
          if (res.data.status == 200) {
              this.$message(
                  {
                      message:res.data.msg,
                      center:true,
                      type:'success',
                  });
          } else {
              this.$message.error(res.data.msg);
          }
          this.get_recharge_list();
        });
    }
  },
  created: function() {
    this.get_recharge_list();
  }
};
</script>


