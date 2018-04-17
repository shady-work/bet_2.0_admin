<template>
    <div id="cqssc_turntable">
         <button class="btn btn-success center-block mt5" @click="isShow=true;isEdit=false;">添加转盘接口</button>
          <table class="table table-hover table-bordered table-striped text-center" style="margin-top: 15px;">
              <thead>
                <tr>
                  <td>转盘名称</td>
                  <td>转盘地址</td>
                  <td>转盘token</td>
                  <!--<td>现金额度</td>-->
                  <!--<td>信用额度</td>-->
                  <!--<td>最小下注额度</td>-->
                  <!--<td>最大下注额度</td>-->
                  <!--<td>最大中奖额</td>-->
                  <!--<td>是否默认转盘</td>-->
                  <td>操作</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(v,k) in list">
                  <td>{{v.trad_name}}</td>
                  <td>{{v.trad_url}}</td>
                  <td>{{v.trad_tokensup}}</td>
                  <td>
                    <!--<button class="btn btn-primary" @click="showEdit()">修改</button>-->
                    <button class="btn btn-danger" @click="deleteOne(v.id)">删除</button>
                  </td>
                  <!--<td>{{v.trad_cash}}</td>-->
                  <!--<td>{{v.trad_credit}}</td>-->
                  <!--<td>{{v.trad_min}}</td>-->
                  <!--<td>{{v.trad_max}}</td>-->
                  <!--<td>{{v.trad_win}}</td>-->
                  <!--<td>{{v.sel==0?'否':'是'}}</td>-->
                </tr>
              </tbody>
          </table>


      <div id="myModal" v-show="isShow" @click="close()">
        <div class="panel panel-info center-block" @click="stop_cancel($event)">

          <div class="panel-heading">修改用户信息</div>

          <div class="panel-body form-horizontal">

            <div class="form-group">
              <label for="inputEmail3" class="col-sm-2 control-label">转盘名称</label>
              <div class="col-sm-10">
                <input type="text" v-model="trad_name" class="form-control" id="inputEmail3" placeholder="请输入">
              </div>
            </div>


            <div class="form-group">
              <label for="inputEmail4" class="col-sm-2 control-label">转盘token</label>
              <div class="col-sm-10">
                <input type="text" v-model="trad_tokensup" class="form-control" id="inputEmail4" placeholder="请输入">
              </div>
            </div>

            <div class="form-group">
              <label for="inputEmail5" class="col-sm-2 control-label">转盘url</label>
              <div class="col-sm-10">
                <input type="text" v-model="trad_url" class="form-control" id="inputEmail5" placeholder="请输入">
              </div>
            </div>

          </div>

          <div class="panel-footer">
            <button class="btn btn-primary pull-right" v-if="isEdit" @click="do_edit()">修改</button>
            <button class="btn btn-primary pull-right" v-if="!isEdit" @click="add_trad()">新增</button>
            <button class="btn btn-info pull-right mr10" @click="isShow = false">取消</button>
            <div class="clearfix"></div>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
  export default
  {
      name:'cqssc_turntable',
      data()
      {
          return{
             msg:'xw',
             list:[],
            isShow:false,
            trad_name:'',
            trad_tokensup:'',
            trad_url:'',
            isEdit:false,
          }
      },
      methods:
      {
          get_turntable:function()
          {
            this.$http.get(`${this.api}/admin/ssc/tradlist`)
              .then(function(res)
              {
                  if(res.data.status == 200)
                  {
                    this.list = res.data.data.trad_list;
                  }
                  else
                  {
                    console.log('加载失败');
                  }
              });
          },
          add_trad:function()
          {
            this.$http.post(`${this.api}/admin/ssc/tradlist`,
              {
                trad_name:this.trad_name,
                trad_tokensup:this.trad_tokensup,
                trad_url:this.trad_url,
              })
              .then(function(res)
              {

                if(res.data.status == 200)
                {
                  this.$message(
                    {
                        message:res.data.msg,
                        center:true,
                        type:'success',
                    });
                  this.isShow = false;
                  this.get_turntable();
                }
                else
                {
                   this.$message.error('添加失败');
                  // alert('添加失败');
                }

              });
          },
          close:function(e)
          {
            this.isShow = false;
            let event = e || window.event;
            event.cancelBubble = true;
          },
          stop_cancel:function(e)
          {
            let event = e || window.event;
            event.cancelBubble = true;
          },
          do_edit:function()
          {
            this.$http.post(`${this.api}/admin/ssc/tradlist`,
              {
                trad_name:this.trad_name,
              })
              .then(function(res)
              {
                console.log(res.data);
              });
          },
          showEdit:function()
          {

          },
          deleteOne:function(t_id)
          {
            this.$http.delete(`${this.api}/admin/ssc/tradlist/${t_id}`)
              .then(function(res)
              {
                if(res.data.status  ==  200)
                {
                  alert(res.data.msg);
                }
                else
                {
                  alert(res.data.msg)
                }


                this.get_turntable();
              });
          },
      },
      created()
      {
          this.get_turntable();
      },
  }
</script>

<style scoped>
  #cqssc_turntable{
    width:1200px;
    margin-left:10px;
  }
  .table {
    /*width: 90%;
    margin: 0 auto;*/
    margin-top: 50px;
  }

  #myModal>.panel
  {
    width: 600px;
    margin-top: 80px;
  }
</style>
