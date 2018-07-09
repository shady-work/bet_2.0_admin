<template>
    <div id="index">
      <!--头部-->
      <my-head></my-head>
      <!--左边导航栏-->
      <my-left></my-left>
      <!--主内容区域-->
      <div id="center">
      <router-view/>
      </div>
    </div>
</template>

<script>
  import head from "../components/head"
  import left from "../components/left"
  export default
  {
    name:'Index',
    components:
    {
      "my-head":head,
      "my-left":left
    },
    data()
    {
      return{
        timeId:0,//定时器的id
      }
    },
    methods:
    {
        // 获取管理员信息
       get_admin_info:function()
       {
          this.$http.get(`${this.api}/user`).then(function(res)
          {

            if(res.data.status == 200)
            {
              //赋值username给全局变量
              this.$set(this.$store.state,"admin_name",res.data.data.user.username);
              //设置用户的类型：管理员，代理，总代
              this.$set(this.$store.state,"admin_type",res.data.data.user.type)
            }
            else
            {
              this.$message.error('请重新登录！');
              this.$router.push('login');
            }
          });
       },

       get_lty_list:function()
       {
         this.$http.get(`${this.api}/admin/lotteryList/${this.$store.state.admin_id}`).then(function(res)
         {
           if(res.data.status == 200)
           {
             this.$set(this.$store.state,'has_lotteries',res.data.data.list)
           }
         });
       },
    },
    created:function()
    {
       //is_login
       if(this.$store.state.admin_id || window.sessionStorage.admin_id)
       {
          console.log('欢迎回来.....admin_id:' + (this.$store.state.admin_id || window.sessionStorage.admin_id) );
          this.get_admin_info();
          this.get_lty_list();
       }
       else
       {
         this.$router.push('login');
       }
       let that = this;
       this.timeId = setInterval(()=>
       {
        that.get_admin_info();
       },10000);
    },
    //离开这个页面的时候触发的函数
    destroyed()
    {
        clearInterval(this.timeId);//清除定时器
    }
  }
</script>
<style>
  #index
  {
    background: #fff;
  }
  #center
  {
    position: fixed;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding:60px 20px 20px 220px;
    overflow:auto;
  }
  #user
  {
    width: 100%;
    height:100%;
    overflow: hidden;
  }
</style>
