<template>
      <div id="articles">
        <a class="btn btn-success center-block add-btn" href="#/add_article" >添加文章</a>
        <table class="table table-bordered table-hover table-striped text-center">
          <thead>
          <tr>
            <td>序号</td>
            <td>文章标题</td>
            <td>创建人</td>
            <td>更新时间</td>
            <td>操作</td>
          </tr>
          </thead>
          <tbody>
              <tr v-for="(v,k) in list">
                  <td>{{k}}</td>
                  <td>{{v.title}}</td>
                  <td>{{v.author}}</td>
                  <td>{{v.update_time}}</td>
                  <td>
                    <button class="btn btn-danger btn-sm" @click="delete_artile(v.id)">删除</button>
                    <button class="btn btn-info btn-sm" @click="change_article(v.id)">查看</button>
                  </td>
              </tr>
          </tbody>
        </table>
        <div class="row mt15">
      <div class="col-md-5"></div>
      <div class="col-md-3">

        <button class="btn btn-primary" @click="prevPage()">
          上一页
        </button>

        <button class="btn btn-info"  @click="nextPage()">
          下一页
        </button>

        <span>当前第{{page}}页</span>
      </div>
      <div class="col-md-4"></div>
    </div>
      </div>
</template>


<script>
  export default
  {
     data()
     {
       return{
         list:[],
         page:1,
         per_page:15,
         hasNext:false,
         hasPrev:false,
         nextPageUrl:'',
         prevPageUrl:'',
       };
     },
     created(){
       this.get_articles_list();
     },
     methods:
     {
          get_articles_list : function ()
          {
              this.$http.get(`${this.api}/admin/articles`)
                .then(function(res)
                {
                  console.log(res.data);
                  if(res.data.status == 200)
                    {
                      this.list = res.data.data.articles.list;
                      this.hasPrev = res.data.data.hasPrev;
                      this.hasNext = res.data.data.hasNext;
                      this.prevPageUrl = this.hasPrev?res.data.data.prevPageUrl:'';
                      this.nextPageUrl = this.hasNext?res.data.data.nextPageUrl:'';
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
                     this.list = res.data.data.articles.list;
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
                   this.list = res.data.data.articles.list;
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
  }
</script>


<style scoped>
  .table {
    width: 80%;
    margin: 0 auto;
    margin-top: 5px;
  }
  #articles>.add-btn
  {
    width: 120px;
    margin-top: 15px;
  }
</style>

