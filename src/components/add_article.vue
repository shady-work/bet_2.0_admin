<template>
  <div class="components-container">
    <div class="form-group-my mt15">
      <label>请输入标题</label>
      <input type="text" class="form-control">
    </div>
    <div id="editorElem" ></div>
    <button class="btn btn-success center-block mt15 btn-lg" @click="getContent">添加</button>
  </div>
</template>

<script>
  import E from 'wangeditor'
  export default {
    name: 'add_article',
    data ()
    {
      return {
        editorContent: ''
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
      }
    },
    mounted()
    {
      var editor = new E('#editorElem')
      editor.customConfig.onchange = (html) =>
      {
        this.editorContent = html
      };
      editor.create()
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
