<template>
    <div id="cqssc_history">
        <table class="table table-bordered table-hover table-striped text-center">
           <thead>
             <tr>
               <td>期数</td>
               <td>开奖号码</td>
               <td colspan="2">总和</td>
               <td>波色</td>
               <td>开奖时间</td>
             </tr>
           </thead>
          <tbody>
              <tr v-for="(v,k) in history_codes">
                <td>{{v.expect}}</td>
                <td class="text-center" width="120">
                    <b v-for="(val,key) in v.details.ball_0" v-if="isNumb(val)" :class="returnColor(val)" class="open-code">{{val}}</b>
                </td>
                <td >{{v.details.ball_1}}</td>
                <td class="text-left" width="170" style="text-indent: 20px;">{{v.details.ball_2}}</td>
                <td>{{v.details.ball_3}}</td>

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
    name:'pcegg_history',
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
         data:[],
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
            this.$http.get(`${this.api}/admin/egg/history/lottery?page=${page}&per_page=${per_page}`)
              .then(function(res){
                console.log(res.data);
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
                     this.$message.error('数据加载失败');
                   }
              });
        },
        isNumb(v)
        {
          if(isNaN(Number(v)))
          {
            return false;
          }
          if(v == ' ' )
          {
            return false;
          }
          return true;

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
        },
      returnColor:function(num)
      {
        let className = '';
        num = parseInt(num);
        if(num%3 == 0)
        {
          className = 'bg-red';
        }
        if(num%3 == 1)
        {
          className = 'bg-green';
        }
        if(num%3 == 2)
        {
          className = 'bg-blue';
        }

        if(num == 0 || num == 13 || num == 14 || num ==27)
        {
          className = 'bg-white';
        }
        return className;

      },
    },
};
</script>

<style scoped>
  .table {
    
    margin-top: 50px;
    font-size:12px;
  }
  #cqssc_history{
    margin-left:10px;
    width:1200px;
  }
  .bg-red{
      background: #9c464d!important;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      color: #fff;
  }

  .bg-green{
      background: #3b9c6d !important;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      color: #fff;
  }


  .bg-blue{
      background: #285b9c !important;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      color: #fff;
  }
  .bg-white{
      background: #9f9f9f !important;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      color: #fff;
  }
  .open-code {
      float: left;
      width: 25px;
      height: 25px;
      /*background: url('../assets/img/ball.png');*/
      background-size: cover;
      margin-left:5px;
      margin-right: 2px;
      line-height: 25px;
      font-size: 18px;
      font-weight: 700;
      text-align: center;
      color:#fff;
  }
</style>
