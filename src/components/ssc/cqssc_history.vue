<template>
    <div id="cqssc_history">

        <table class="table table-bordered table-hover table-striped text-center">
           <thead>
             <tr>
               <td>期数</td>
               <td>开奖号码</td>
               <td>第一球</td>
               <td>第二球</td>
               <td>第三球</td>
               <td>第四球</td>
               <td>第五球</td>
               <td>总和</td>
               <td>前三</td>
               <td>中三</td>
               <td>后三</td>
               <td>后开奖时间</td>
             </tr>
           </thead>
          <tbody>
              <tr v-for="(v,k) in history_codes">
                <td>{{v.expect}}</td>
                <td><b v-for="code in v.open_codes">{{code}}</b></td>
                <td>{{v.details.ball_1}}</td>
                <td>{{v.details.ball_2}}</td>
                <td>{{v.details.ball_3}}</td>
                <td>{{v.details.ball_4}}</td>
                <td>{{v.details.ball_5}}</td>
                <td>{{v.details.dragon_and_tiger}}</td>
                <td>{{v.details.front_3}}</td>
                <td>{{v.details.medium_3}}</td>
                <td>{{v.details.end_3}}</td>
                <td>{{v.opentime}}</td>
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
export default
{
    name:'cqssc_history',
    data()
    {
      return{
         history_codes:[],
         page:1,
         per_page:15,
         hasNext:false,
         hasPrev:false,
         nextPageUrl:'',
         prevPageUrl:'',
         sum:0,
         pageNum:0,
      }
    },
    created()
    {
        this.get_all_history();
    },
    methods:
    {
        get_all_history:function(page = 1,per_page = 15)
        {
            this.$http.get(`${this.api}/admin/ssc/history/lottery/page/${page}/per_page/${per_page}`)
              .then(function(res){
                   if(res.data.status == 200)
                   {
                      this.history_codes = res.data.data.list;
                      this.hasPrev = res.data.data.hasPrev;
                      this.hasNext = res.data.data.hasNext;
                      this.sum = res.data.data.sum;
                      this.pageNum = res.data.data.pageNum;
                      this.prevPageUrl = this.hasPrev?res.data.data.prevPageUrl:'';
                      this.nextPageUrl = this.hasNext?res.data.data.nextPageUrl:'';
                   }
                   else
                   {
                     console.log('the codes of cqssc\'s history was load failed');
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
                    this.history_codes = res.data.data.list;
                    this.hasPrev = res.data.data.hasPrev;
                    this.hasNext = res.data.data.hasNext;
                    this.prevPageUrl = this.hasPrev?res.data.data.prevPageUrl:'';
                    this.nextPageUrl = this.hasNext?res.data.data.nextPageUrl:'';
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
                  this.history_codes = res.data.data.list;
                  this.hasPrev = res.data.data.hasPrev;
                  this.hasNext = res.data.data.hasNext;
                  this.prevPageUrl = this.hasPrev?res.data.data.prevPageUrl:'';
                  this.nextPageUrl = this.hasNext?res.data.data.nextPageUrl:'';
                }
                else
                {
                  console.log('the codes of cqssc\'s history was load failed');
                }
              });
          }
        },
    },
};
</script>

<style scoped>
  .table {
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
    font-size: 12px!important;
  }
</style>
