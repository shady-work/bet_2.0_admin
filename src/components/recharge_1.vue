<template>
    <div id="recharge">
      <!--header-->
      <ul class="nav nav-tabs my-nav nav-justified">
        <li role="presentation" class="active">
          <a >充值</a>
        </li>
        <li role="presentation"><a href="#/withdraw">提現</a></li>
      </ul>
      <!--section-->
      <table class="table table-hover table-bordered table-striped text-center middle">
        <thead>
        <tr class="middle">
          <th>序号</th>
          <th>用户名/昵称</th>
          <th>充值金额</th>
          <th>充值类型</th>
          <th>充值信息</th>
          <th>状态</th>
          <th>时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(v,k) in list">
          <td>{{k}}</td>
          <td>{{v.username}}/{{v.nickname}}</td>
          <td>{{v.money}}</td>
          <td>{{v.con}}</td>
          <td>{{v.tp_mark}}</td>
          <td>
            <b v-if="v.tp_stu == 1">待审核</b>
            <b v-if="v.tp_stu == 0">充值不通过</b>
            <b v-if="v.tp_stu == 2">充值通过</b>
          </td>
          <td>{{v.tp_time}}</td>
          <td v-if="v.tp_stu == 1">
            <button class="btn btn-primary btn-sm" @click="review_recharge(v.id,2)">通过</button>
            <button class="btn btn-primary btn-sm" @click="review_recharge(v.id,0)">拒绝</button>
            <button class="btn btn-danger btn-sm" @click="delete_one(v.id)">删除</button>
          </td>
          <td v-if="v.tp_stu != 1">
            <button class="btn btn-danger btn-sm" @click="delete_one(v.id)">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
      <!--分页-->
      <div class="row mt15">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <span>当前第 {{page}} 页</span>
          <span>共 {{pageNum}} 页</span>
          <button class="btn btn-primary bnt-xs" @click="prevPage()" v-if="hasPrev">上一页</button>
          <button class="btn btn-primary bnt-xs" @click="nextPage()" v-if="hasNext">下一页</button>
          <span> 共 {{sum}} 条</span>
        </div>
        <div class="col-md-4"></div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "recharge_1",
      data:function(){
          return{
            list:[],//列表
            list_all_back_up: [], //all recharge lit back up;
            page:1,
            pre_page:15,
            hasNext:false,
            hasPrev:false,
            sum:0,
            pageNum:0,
            nextPageUrl:'',
            prevPageUrl:'',
          }
      },
      methods:{
        /*初始化获取数据*/
        get_recharge_list:function(){
          this.$http.get(this.api + '/admin/topups').then(function(result){
            // console.log(result);
            if(result.data.status == 200){
              this.list=result.data.data.topups.list;
              this.hasNext=result.data.data.topups.hasNext;
              this.hasPrev=result.data.data.topups.hasPrev;
              this.sum=result.data.data.topups.sum;
              this.pageNum=result.data.data.topups.pageNum;
              this.nextPageUrl=this.hasNext? result.data.data.topups.nextPageUrl:'';
              this.prevPageUrl = this.hasPrev? result.data.data.topups.prevPageUrl:'';
            };
          });
        },
        //删除指定行
        delete_one:function(reg_id){
          this.$http.delete(this.api + '/admin/topups' + reg_id).then(function(res){
            // console.log(res);
            if(res.data.status == 200){
              // console.log(res.data.msg);
              this.$message({
                message:res.data.msg,
                center:true,
                type:'success',
              });
            }else{
              this.$message.error(res.data.msg);
            };
            this.get_recharge_list();
          })
        },
        //审核：通过或者拒绝
        review_recharge:function(reg_id,review_state){
          this.$http.put(this.api + '/admin/topups' + reg_id,{pass:review_state}).then(function(res){
            console.log(res);
            if(res.data.status == 200){
              this.$message({
                message:res.data.msg,
                center:true,
                type:'success',
              })
            }else{
              this.$message.error(res.data.msg);
            }
            this.get_recharge_list();
          })
        },
        //上一页，下一页
        nextPage:function(){
          if(this.nextPageUrl == ''){
            this.$message.error('没有下一页了');
            // return;
          }else{
            this.page++;
            this.$http.get(this.api + this.nextPageUrl).then(function(res){
              console.log(res);
              if(res.data.status == 200){
                this.list=res.data.data.topups.list;
                this.hasNext=res.data.data.topups.hasNext;
                this.hasPrev=res.data.data.topups.hasPrev;
                // this.sum=res.data.data.topups.sum;
                // this.pageNum=res.data.data.topups.pageNum;
                this.nextPageUrl=this.hasNext? res.data.data.topups.nextPageUrl:'';
                this.prevPageUrl = this.hasPrev? res.data.data.topups.prevPageUrl:'';
              }else{
                this.$message.error('数据加载失败');
              }
            })
          }
        },
        prevPage:function(){
          if(this.prevPageUrl == ''){
            this.$message.error('没有上一页了');
            // return;
          }else{
            this.page--;
            this.$http.get(this.api + this.prevPageUrl).then(function(res){
              console.log(res);
              if(res.data.status == 200){
                this.list=res.data.data.topups.list;
                this.hasNext=res.data.data.topups.hasNext;
                this.hasPrev=res.data.data.topups.hasPrev;
                // this.sum=res.data.data.topups.sum;
                // this.pageNum=res.data.data.topups.pageNum;
                this.nextPageUrl=this.hasNext? res.data.data.topups.nextPageUrl:'';
                this.prevPageUrl = this.hasPrev? res.data.data.topups.prevPageUrl:'';
              }else{
                this.$message.error('数据加载失败');
              }
            })
          }
        },
      },
      /*初始化*/
      created:function(){
          this.get_recharge_list();
      }
    };
</script>

<style scoped>

</style>
