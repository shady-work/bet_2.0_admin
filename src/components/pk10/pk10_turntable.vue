<template>
    <div id="cqssc_turntable">
         <button class="btn btn-success center-block mt5" @click="isShow=true;isEdit=false;">添加转盘接口</button>
          <table class="table table-hover table-bordered table-striped text-center" style="margin-top: 15px;">
              <thead>
                <tr>
                  <td>转盘名称</td>
                  <td>转盘地址</td>
                  <td>转盘token</td>
                  <td>操作</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(v,k) in list">
                  <td>{{v.trad_name}}</td>
                  <td>{{v.trad_url}}</td>
                  <td>{{v.trad_tokensup}}</td>
                  <td>
                      <button class="btn btn-danger" @click="deleteOne(v.id,v.trad_name)">删除</button>
                  </td>
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
      name:'pk10_turntable',
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
            this.$http.get(`${this.api}/admin/pk10/tradlist`)
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
            this.$http.post(`${this.api}/admin/pk10/tradlist`,
              {
                trad_name:this.trad_name,
                trad_tokensup:this.trad_tokensup,
                trad_url:this.trad_url,
              })
              .then(function(res)
              {
                console.log(res.data);
                if(res.data.status == 200)
                {
                  // alert('添加成功');
                  this.$message(
                    {
                        message:res.data.msg,
                        center:true,
                        type:'success',
                    });
                  this.get_turntable();
                  this.isShow = false;
                }
                else
                {
                  // alert('添加失败');
                  this.$message.error('添加失败');
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
            this.$http.post(`${this.api}/admin/pk10/tradlist`,
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
          deleteOne:function(t_id,name)
          {
            const h = this.$createElement;
            this.$msgbox({
              title: '提示',
              type:"warning",
              message: h('p', null, [
                h('span', null, '确定删除转盘名称为： '),
                h('i', { style: 'color: teal' }, name),
                h('span', null, '  的接口吗？ ')
              ]),
              showCancelButton: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                  instance.confirmButtonLoading = true;
                  instance.confirmButtonText = '删除中...';
                  setTimeout(() => {
                    done();
                    setTimeout(() => {
                      instance.confirmButtonLoading = false;
                    }, 300);
                  }, 3000);
                } else {
                  done();
                }
              }
            }).then(() => {
              this.$http.delete(`${this.api}/admin/pk10/tradlist/${t_id}`)
                .then(function(res)
                {
                  if(res.data.status  ==  200)
                  {
                    this.$notify({
                      title: '成功',
                      message: res.data.msg,
                      type: 'success'
                    });
                  }
                  else
                  {
                    this.$notify({
                      title: '失败',
                      message: res.data.msg,
                      type: 'info'
                    });
                  }

                  this.get_turntable();
                });
            });
            return;

          },
      },
      created()
      {
          this.get_turntable();
      },
  }
</script>

<style scoped>
  .table
  {
    margin-top: 50px;
  }

  #myModal>.panel
  {
    width: 600px;
    margin-top: 80px;
  }
  #cqssc_turntable{
    margin-left:10px;
    width:1100px;
  }
</style>
