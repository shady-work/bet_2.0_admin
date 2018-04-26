<template>
      <div id="articles">
        <a class="btn btn-success center-block add-btn" @click="turnTo()" >添加文章</a>
        <table class="table table-bordered table-hover table-striped text-center">
          <thead>
          <tr>
            <td>序号</td>
            <td>充值类型</td>
            <td>充值标题</td>
            <td>创建人</td>
            <td>更新时间</td>
            <td>操作</td>
          </tr>
          </thead>
          <tbody>
              <tr v-for="(v,k) in list">
                  <td>{{k}}</td>
                  <td>{{v.type==0?'银行':(v.type==1?'线下':'第三方')}}</td>
                  <td>{{v.title}}</td>
                  <td>{{v.author}}</td>
                  <td>{{v.update_time}}</td>
                  <td>
                    <button class="btn btn-danger btn-sm" @click="delete_artile(v.id,v.title)">删除</button>
                    <button class="btn btn-info btn-sm" @click="check_article(v.id)">查看</button>
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
        

        <!-- element dialog -->
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
</el-dialog>
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
         isShow:false,
         dialogVisible: false
       };
     },
     created(){
       this.get_articles_list();
     },
     methods:
     {

        turnTo:function()
        {
          window.sessionStorage.a_id = '';
          delete window.sessionStorage.a_id;
          this.$router.push('add_article');
        },
        get_articles_list : function ()
        {
            this.$http.get(`${this.api}/admin/articles`)
              .then(function(res)
              {

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
                   this.list = res.data.data.articles.list;
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
                 this.list = res.data.data.articles.list;
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
       /**
        * 查看文章id
        * @param a_id
        */
        check_article:function(a_id)
        {
          /**
           * 不能只单单写path，
           * 不然会拿不到数据，
           * 必须是path,name，
           * params一起写
           */
          this.$router.push({
             path:'add_article',
             name:'add_article',
             params:{article_id : a_id}
           });

        },
       /**
        * 删除文章
        * @param a_id
        */
        delete_artile:function(a_id,title)
        {
          // confirm('是否删除标题为' + title + '的文章?')
          this.$confirm('确认删除？')
          .then(_ => 
          {
            this.$http.delete(`${this.api}/admin/articles/${a_id}`)
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
                   // alert(res.data.msg);
                   this.get_articles_list();
                   this.dialogVisible = false;
                 }

              });
          })
          .catch(_ => {});
          return;
          
         
        }
     },
  }
</script>


<style scoped>
  .table {
    width:1200px;
   margin-left:10px;
    margin-top: 5px;
  }
  #articles>.add-btn
  {
    width: 120px;
    margin-top: 15px;
  }
  #articles a{
    margin-left:550px;
    margin-bottom:15px;
  }
  .row{
    width:1200px;
     margin-left:25px;
  }
</style>

