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
               <td>第六球</td>
               <td>第七球</td>
               <td>第八球</td>
               <td>第九球</td>
               <td>第十球</td>
               <td>冠亚军</td>
               <td>后开奖时间</td>
             </tr>
           </thead>
          <tbody>
              <tr v-for="(v,k) in history_codes">
                <td>{{v.expect}}</td>
                <td><b v-for="(val,key) in v.open_codes" style="width:30px;height:30px;" :class="'hao'+(val/10*10)">{{val/10*10}}</b></td>
                <td>{{v.details.ball_1}}</td>
                <td>{{v.details.ball_2}}</td>
                <td>{{v.details.ball_3}}</td>
                <td>{{v.details.ball_4}}</td>
                <td>{{v.details.ball_5}}</td>
                <td>{{v.details.ball_6}}</td>
                <td>{{v.details.ball_7}}</td>
                <td>{{v.details.ball_8}}</td>
                <td>{{v.details.ball_9}}</td>
                <td>{{v.details.ball_10}}</td>
                <td>{{get_result(v.open_codes[0],v.open_codes[1])}}</td>
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
    name:'pk10_history',
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
            this.$http.get(`${this.api}/admin/pk10/history/lottery/page/${page}/per_page/${per_page}`)
              .then(function(res){
                if(res.data.status == 200)
                   {
                      console.log(res.data);
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
                     this.$message.error('数据加载失败');
                   }
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
                    this.history_codes = res.data.data.list;
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
                  this.history_codes = res.data.data.list;
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
        get_result:function(first,second)
        {
            let no1 = parseInt(first);
            let no2 = parseInt(second);
            let str = '';
            str += (no1+no2) + '  |   ';
            str += (no1+no2)>11?'大':'小';
            return str;
        }
    },


};
</script>

<style scoped>
  .table {
    /*width: 90%;*/
    /*margin: 0 auto;*/
    margin-top: 50px;
    font-size:12px;
  }
  #cqssc_history{
    margin-left:10px;
    width:1700px;
  }
  #cqssc_history b{
    display:inline-block;
    line-height:30px;
    color:white;
    text-align:center;
    font-size:20px;
    /*width:30px;*/
    /*background:gray;*/
    margin-left:5px;
  }
   .hao1
      {
          background: #959612;
      }
      .hao2
      {
          background: #0060ff;
      }
      .hao3
      {
          background: #4d4d4d;
      }
      .hao4
      {
          background: #ff7300;
      }
      .hao5
      {
          background: #00adad;
      }
      .hao6
      {
          background:#5200ff;
      }
      .hao7
      {
          background: #666666;
      }
      .hao8
      {
          /*background: #ff0000;*/
          background:#9300ffe8;
      }
      .hao9
      {
          background:#760000;
      }
      .hao10
      {
          background:#167301;
      }

</style>
