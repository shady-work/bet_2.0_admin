<template>
  <div id="left">
      <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick"  :accordion="true" :highlight-current="true"></el-tree>
    <!--:highlight-current="true"-->
  </div>
</template>
<script>
  import '../assets/js/jquery.min.js';
  export default
  {
      data()
      {
         return{
           isShowCqssc:false,
           tree:
           [
             //用户管理
             {
                label: '用户管理',
                children:
                [
                  {
                    label: '查看用户信息',
                    href:'users',
                  },
                  {
                    label: '添加用户',
                    href:'add_user',
                  }
               ]
             },
             //资金明细
             {
               label: '资金明细',
               href : 'recharge',
             },
             //实时订单
             {
               label:"实时订单",
               href:'watch_order'
             },
             //充值管理
             {
               label:"充值管理",
               href:'articles'
             },
               {
                   label:"报表",
                   href:'chart'
               }
           ],//end of tree data
           defaultProps:
           {
             children: 'children',
             label: 'label'
           },
           //控制是否要加入这个彩种
          //重庆时时彩
          cqssc:
          {
            label: '重庆时时彩',
              children:
            [
              {
                label: '用户注额列表',
                href:'cqssc',
              },
              {
                label: '赔率列表',
                href:'cqssc_odds',
              },
              {
                label: '开奖历史',
                href:'cqssc_history',
              },
              {
                label: '下注历史',
                href:'cqssc_history_bet',
              },
              // {
              //   label: '转盘列表',
              //   href:'cqssc_turntable',
              // }
            ]
          },
          //北京赛车PK拾
           bjpk10:{
            label: '北京赛车PK拾',
              children:
            [
              {
                label: '用户注额列表',
                href:'pk10',
              },
              {
                label: '赔率列表',
                href:'pk10_odds',
              },
              {
                label: '开奖历史',
                href:'pk10_history',
              },
              {
                label: '下注历史',
                href:'pk10_history_bet',
              },
              // {
              //   label: '转盘列表',
              //   href:'pk10_turntable',
              // }
            ]
          },
          //PC蛋蛋
          pcegg:{
            label: 'PC蛋蛋',
              children:
            [
              {
                label: '用户注额列表',
                href:'pcegg',
              },
              {
                label: '赔率列表',
                href:'pcegg_odds',
              },
              {
                label: '开奖历史',
                href:'pcegg_history',
              },
              {
                label: '下注历史',
                href:'pcegg_history_bet',
              },
              // {
              //   label: '转盘列表',
              //   href:'pcegg_turntable',
              // }
            ]
          },
          //加拿大28
          cakeno:{
            label: '加拿大28',
              children:
            [
              {
                label: '用户注额列表',
                href:'cake',
              },
              {
                label: '赔率列表',
                href:'cake_odds',
              },
              {
                label: '开奖历史',
                href:'cake_history',
              },
              {
                label: '下注历史',
                href:'cake_history_bet',
              },
              // {
              //   label: '转盘列表',
              //   href:'cakeno_turntable',
              // }
            ]
          },
         }

      },
      methods:
      {
        isJoinThisLottery:function()
        {
          //先获取用户的类型，如果是管理员，就直接加入四个彩种，不然就获取用户拥有哪些彩种
          this.$http.get(`${this.api}/user`).then(function(res)
          {
            if(res.data.status == 200)
            {
              //设置用户的类型：管理员，代理，总代
              this.$set(this.$store.state,"admin_type",res.data.data.user.type)
            }
          })
          .then(function()
          {
            if(this.$store.state.admin_type == 3 || this.$store.state.admin_id == 1)
            {
              this.tree.push(this.cqssc);
              this.tree.push(this.bjpk10);
              this.tree.push(this.pcegg);
              this.tree.push(this.cakeno);
            }
            else
            {
              //获取用户的拥有的彩种，有的话，添加到左侧的导航栏中;
              this.$http.get(`${this.api}/admin/lotteryList/${this.$store.state.admin_id?this.$store.state.admin_id:window.sessionStorage.admin_id}`).then(function(res)
              {
                if(res.data.status == 200)
                {
                  let lotteries = ['cqssc','bjpk10','pcegg','cakeno'];
                  for(let i=0;i<lotteries.length;i++)
                  {
                    let isExist = res.data.data.list.indexOf(lotteries[i]);
                    if(isExist == -1)
                    {
                      continue;
                    }
                    else
                    {
                      this.tree.push(this[lotteries[i]]);
                    }
                  }
                }
              });
            }
          });
        },

        //tree被点击时触发的事件
        handleNodeClick(self)
        {
          if(self.href)
          {
            this.$router.push(self.href);
          }
        },

        //
      },
     created()
     {
        this.isJoinThisLottery();
     }

  };


</script>

<style scoped>
  #left {
    position: fixed;
    height: 100%;
    width: 200px;
    left: 0;
    top: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: #333;
    border: 1px solid #222;
    padding-top: 55px;
    padding-left:4px;
    padding-right:4px;
    color: #fff;
    z-index: 2;
  }

  #left > .list-group, #left > .list-group > li {
    background: #333;
    color: #fff;
    border: none;
    box-sizing: border-box;
  }

  #left > .list-group > li {
    border-bottom: 1px solid #f3f3f3;
    border-top: 1px solid #f3f3f3;
    height: auto!important;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
  }

  .c-3f
  {
    color: #fff;
  }
  .list-admin
  {
    height: 45px;
    line-height: 45px;
    text-indent:25px;
    font-weight: 700;
    font-size: 16px;
    border-bottom: 1px solid #222;
    cursor:pointer;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  #left .active
  {
    background: #777!important;
  }
  .list-admin-items
  {
    border-bottom: 1px solid gray;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  .list-admin-items>a
  {
    display: block;
    width: 100%;
    padding-left:35px;
    padding-top: 5px;
    padding-bottom: 5px;
    color: #fff;
    text-decoration: none!important;
    background: #000;
    height:40px;
    line-height:30px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  .list-admin-items>a:hover
  {
    text-decoration: none!important;
  }
  .list-admin-items>.active
  {
    background: #777;
  }
</style>
<style>
  .el-tree
  {
    background: #333!important;
    color:#e5e5e5;
  }
  .el-tree-node
  {
    border-bottom:1px solid #222;
    background: #333!important;
  }
  .el-tree-node__content
  {
    display: block;
    width: 100%;
    padding-top: 5px;
    padding-bottom: 5px;
    color: #e5e5e5;
    text-decoration: none!important;
    height:40px;
    line-height:30px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;


  }
  .el-tree-node__content .el-tree-node__label
  {
    font-size: 16px;
    font-weight: 700;
  }
  .el-tree-node__content:hover
  {
    background: #636363;
  }
  .el-tree-node__children .el-tree-node__label
  {
    font-size: 14px;
    font-weight: normal;
  }
  .is-expanded, .is-current, .is-focusable
  {
    background: none;
  }
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content
  {
    background: #636363;
  }
  .el-message-box
  {
    width:600px;
  }
</style>
