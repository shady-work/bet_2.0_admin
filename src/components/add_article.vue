<template>
  <div class="components-container">
    <div class="form-group-my mt15">
      <label>请输入标题</label>
      <input type="text" class="form-control" v-model="title">
    </div>
    <div id="editorElem" ></div>
    <button v-if="!is_check" class="btn btn-success center-block mt15 btn-lg" @click="add_article">添加</button>
    <button v-if="is_check" class="btn btn-success center-block mt15 btn-lg" @click="change_article">修改</button>
  </div>
</template>

<script>
  import E from 'wangeditor'
  export default {
    name: 'add_article',
    data ()
    {
      return {
        editorContent: '',
        title:'',
        a_id:window.sessionStorage.a_id?window.sessionStorage.a_id:0,
        is_check:false,
        wangEditor:null,
      }
    },
    methods:
    {
      /**
       * 获取富文本编辑器的内容
       */
      getContent: function ()
      {
        alert(this.editorContent)
      },

      /**
       * 添加文章
       */
      add_article:function()
      {
         this.$http.post(`${this.api}/admin/articles`,
         {
           title :  this.title,
           content:  this.editorContent,
         })
           .then(function(res)
           {
              if(res.data.status == 200)
              {
                alert('添加成功');
                this.$router.push('articles');
                return;
              }
              else
              {
                alert('添加失败，请稍后再试');
                return;
              }
           });
      },
      /**
       * 获取单个文章，进行修改
       */
      get_an_article:function(a_id)
      {
        window.sessionStorage.a_id = a_id;
        this.$http.get(`${this.api}/admin/articles/${a_id}`)
          .then(function(res)
          {
             if(res.data.status == 200)
             {
               this.title = res.data.data.article.title;
               this.editorContent = res.data.data.article.content;
               this.$set(this,'editorContent',res.data.data.article.content);
               //赋值给文件框
               document.querySelector('#' + this.wangEditor.textElemId).innerHTML = this.editorContent;
             }
             else
             {
               alert(res.data.msg);
             }
          });
         this.is_check = true;
      },
      /**
       * 修改文章
       */
      change_article:function()
      {
         this.$http.put(`${this.api}/admin/articles/${this.a_id}`,{
           title:this.title,
           content:this.editorContent
         })
           .then(function(res)
           {
              console.log(res.data);
              if(res.data.status == 200)
              {
                alert(res.data.msg);
                window.sessionStorage.a_id = '';
                this.$router.push('articles');
              }
              else
              {
                alert('修改失败');
              }
           });
      },

      /**
       * 初始化wangEditor
       */
      create_wangEditor:function()
      {

        this.wangEditor = new E('#editorElem');
        this.wangEditor.customConfig.uploadImgServer = this.api + '/admin/image'; // 上传图片到服务器

        // 通过 url 参数配置 debug 模式。url 中带有 wangeditor_debug_mode=1 才会开启 debug 模式
        this.wangEditor.customConfig.debug = location.href.indexOf('wangeditor_debug_mode=1') > 0;

        this.wangEditor.customConfig.uploadImgHeaders =
          {
            'Authorization': 'bearer '+window.localStorage.token
          };

        this.wangEditor.customConfig.uploadFileName = 'image[]';


        this.wangEditor.customConfig.uploadImgHooks =
        {
            fail: function (xhr, editor, result)
            {

              alert('图片上传失败')
            },
            error: function (xhr, editor)
            {

              alert('图片上传失败')
            },
            timeout: function (xhr, editor)
            {
              alert('图片上传失败')
            },
          };

        this.wangEditor.customConfig.onchange = (html) =>
        {
          this.editorContent = html;
        };
        this.wangEditor.create();
      },





    },
    mounted()
    {
      /**
       * 初始化wangEditor
       */
      this.create_wangEditor();
    },

    created()
    {
      /**
       * 获取要查看的文章
       */
      if((JSON.stringify(this.$route.params) != "{}" && this.$route.params.article_id))
      {
         this.get_an_article(this.$route.params.article_id);
      }
      else if(this.a_id)
      {
        this.get_an_article(this.a_id);
      }
      else
      {
         console.log('没有传值过来');
         this.is_check = false;
      }

    },
    watch:
    {

    }
  };
</script>


<style scoped>
  #editorElem
  {
    text-align:left;
    width :1000px;
    margin:0 auto;
    margin-top: 25px;
  }

  .form-group-my
  {
    width :1000px;
    height: 100px;
    margin:0 auto;
  }

  .form-group-my>label
  {
    float:left;
    width: 20%;
    text-align: left;
    height: 100px;
    line-height: 100px;

  }
  .form-group-my>input
  {
    float: left;
    width: 80%;
    margin-top: 45px;
  }

</style>
