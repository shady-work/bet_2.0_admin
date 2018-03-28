<template>
  <div class="components-container">
    <div class="form-group-my mt15">
      <label>请输入标题</label>
      <input type="text" class="form-control" v-model="title">
    </div>
    <div id="editorElem" ></div>
    <button class="btn btn-success center-block mt15 btn-lg" @click="add_article">添加</button>
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


      add_article:function()
      {


         this.$http.post(`${this.api}/admin/articles`,
         {
           title :  this.title,
           content:  this.editorContent,
         })
           .then(function(res)
           {
              console.log(res.data);
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
    },
    mounted()
    {

      var editor = new E('#editorElem');
      editor.customConfig.uploadImgServer = this.api + '/admin/image'; // 上传图片到服务器

      // 通过 url 参数配置 debug 模式。url 中带有 wangeditor_debug_mode=1 才会开启 debug 模式
      editor.customConfig.debug = location.href.indexOf('wangeditor_debug_mode=1') > 0;

      editor.customConfig.uploadImgHeaders = {
        'Authorization': 'bearer '+window.localStorage.token
      };

      editor.customConfig.uploadFileName = 'image[]';


      editor.customConfig.uploadImgHooks =
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

      editor.customConfig.onchange = (html) =>
      {
        this.editorContent = html
      };
      editor.create();
    },
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
