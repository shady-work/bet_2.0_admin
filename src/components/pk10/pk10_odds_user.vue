<template>
  <div id='cqssc_odds_user'>
    <table class="table table-hover table-bordered table-striped text-center">
      <thead>
      <tr>
        <td>序号</td>
        <td>用户名</td>
        <td>昵称</td>
        <td>所选盘口</td>
        <td>操作</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(v,k) in list">
        <td>{{k}}</td>
        <td>{{v.username}}</td>
        <td>{{v.nickname}}</td>
        <td>
          <div v-for="(val,key) in all_handicap" class="pull-left ml10">
            <div class="hide">
              {{v.pk10_ratelist[key]?v.pk10_ratelist[key]:(v.pk10_ratelist[key]={})}}
            </div>
            <input type="checkbox"   v-model="list[k].pk10_ratelist[key].ratewin_name" v-bind:value="val"   >

            {{val}}盘
          </div>
        </td>
        <td>
          <button class="btn btn-primary" @click="change_handicap(v.user_id,k)">修改</button>
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
    name: 'cqssc_odds_user',
    data: function () {
      return {
        list: [],
        all_handicap:[],
        isShow:false,
        user_has_handicap:'',
        user_id:0,
        ratewin_name:'',
        user_choose:[],
        num:0,
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
    created: function () {

      this.get_all_handicap();
    },
    methods: {
      test:function(){
        console.log(1);
      },

      get_all_handicap: function () {
        this.$http.get(`${this.api}/admin/pk10/odds`)
          .then(function (res) {
            if (res.data.status == 200) {
              this.all_handicap = [];
              for(let i = 0;i<res.data.data.odds_list.length;i++)
              {
                this.all_handicap.push((res.data.data.odds_list[i].name).toUpperCase());
              }
            }
            else {
              console.log(`盘口加载失败`);
            }
          }).then(function(){
          this.get_all();
        });
      },
      get_all: function () {
        this.$http.get(`${this.api}/admin/pk10/ratelist`)
          .then(function (res) {
            console.log(res.data);
            if (res.data.status == 200) {
              this.list = res.data.data.list;
              for(let i = 0 ; i<this.list.length;i++)
              {
                this.list[i].oldpk = [];
                for (let j = 0;j<this.all_handicap.length;j++)
                {
                  if(this.list[i].pk10_ratelist[j] && this.list[i].pk10_ratelist[j].ratewin_name)
                  {
                    this.list[i].oldpk.push(this.list[i].pk10_ratelist[j].ratewin_name);
                  }
                  else
                  {
                    this.list[i].oldpk.push(false);
                  }
                }

              }
              this.hasPrev = res.data.data.hasPrev;
              this.hasNext = res.data.data.hasNext;
              this.sum = res.data.data.sum;
              this.pageNum = res.data.data.pageNum;
              this.prevPageUrl = this.hasPrev? res.data.data.prevPageUrl:'';
              this.nextPageUrl = this.hasNext? res.data.data.nextPageUrl:'';
            }
            else {
              console.log(`加载失败`);
            }
          });
      },
      change_handicap:function(user_id,index){

        for(let i = 0;i<this.list[index].pk10_ratelist.length;i++)
        {

          if(this.list[index].oldpk[i])
          {
            if(this.list[index].pk10_ratelist[i].ratewin_name === false)
            {
              this.delete_handicap(this.list[index].pk10_ratelist[i].id);
            }
          }
          if(this.list[index].pk10_ratelist[i].ratewin_name === true)
          {
            if(this.list[index].oldpk[i])
            {
              console.log('以前就有的');
            }
            else
            {
              this.$http.post(`${this.api}/admin/pk10/ratelist`,
                {
                  "ratewin_name":this.all_handicap[i],
                  sel:0,
                  user_id:user_id
                })
                .then(function(res)
                {
                  if(res.data.status == 201)
                  {
                    alert(this.all_handicap[i]+"盘:"+res.data.msg);
                    return;
                  }
                  else
                  {
                    alert(this.all_handicap[i]+"盘:"+res.data.msg);
                  }
                });
            }
          }
          /* var that = this;
           setTimeout(function(){
             that.$router.go(0);
           },500);*/


        }

        return;
      },
      delete_handicap:function(handicap_id){
        this.$http.delete(`${this.api}/admin/pk10/ratelist/${handicap_id}`)
          .then(function(res)
          {
            console.log(res.data);
            if(res.data.status == 200)
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
        this.$http.post(`${this.api}/admin/pk10/ratelist/`,{
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
      },
      prevPage:function()
      {
        if(this.prevPageUrl == '')
        {
          alert('没有上一页了');
          return;
        }
        else
        {
          this.page--;
          this.$http.get(`${this.api}${this.prevPageUrl}`)
            .then(function(res){
              if(res.data.status == 200)
              {
                this.list = res.data.data.list;
                for(let i = 0 ; i<this.list.length;i++)
                {
                  this.list[i].oldpk = [];
                  for (let j = 0;j<this.all_handicap.length;j++)
                  {
                    if(this.list[i].pk10_ratelist[j] && this.list[i].pk10_ratelist[j].ratewin_name)
                    {
                      this.list[i].oldpk.push(this.list[i].pk10_ratelist[j].ratewin_name);
                    }
                    else
                    {
                      this.list[i].oldpk.push(false);
                    }
                  }

                }
                this.hasPrev = res.data.data.hasPrev;
                this.hasNext = res.data.data.hasNext;
                this.sum = res.data.data.sum;
                this.pageNum = res.data.data.pageNum;
                this.prevPageUrl = this.hasPrev? res.data.data.prevPageUrl:'';
                this.nextPageUrl = this.hasNext? res.data.data.nextPageUrl:'';
              }
              else
              {
                console.log('the codes of cqssc\'s history was load failed');
              }
            });
        }
      },
      nextPage:function()
      {
        if(this.nextPageUrl == '')
        {
          alert('没有下一页了');
          return;
        }
        else
        {
          this.page++;
          this.$http.get(`${this.api}${this.nextPageUrl}`)
            .then(function(res){
              if(res.data.status == 200)
              {
                this.list = res.data.data.list;
                for(let i = 0 ; i<this.list.length;i++)
                {
                  this.list[i].oldpk = [];
                  for (let j = 0;j<this.all_handicap.length;j++)
                  {
                    if(this.list[i].pk10_ratelist[j] && this.list[i].pk10_ratelist[j].ratewin_name)
                    {
                      this.list[i].oldpk.push(this.list[i].pk10_ratelist[j].ratewin_name);
                    }
                    else
                    {
                      this.list[i].oldpk.push(false);
                    }
                  }

                }
                this.hasPrev = res.data.data.hasPrev;
                this.hasNext = res.data.data.hasNext;
                this.sum = res.data.data.sum;
                this.pageNum = res.data.data.pageNum;
                this.prevPageUrl = this.hasPrev? res.data.data.prevPageUrl:'';
                this.nextPageUrl = this.hasNext? res.data.data.nextPageUrl:'';
              }
              else
              {
                console.log('the codes of pk10c\'s history was load failed');
              }
            });
        }
      },
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
