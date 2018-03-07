<template>
  <div id="left">
      <div class="list-admin c-3f active">
        首页
      </div>

      <div class="list-admin c-3f ">
        首页
      </div>
  </div>
</template>
<script>
  export default {}
</script>

<style scoped>
  #left {
    position: fixed;
    height: 100%;
    width: 200px;
    left: 0;
    top: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: #333;
    border: 1px solid #222;
    padding-top: 55px;
    padding-left:4px;
    padding-right:4px;
  }

  #left > .list-group, #left > .list-group > li {
    background: #333;
    color: #fff;
    border: none;
    box-sizing: border-box;
  }

  #left > .list-group > li {
    border-bottom: 1px solid #f3f3f3;
    border-top: 1px solid #f3f3f3;
    height: auto!important;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
  }
  .bg-333
  {
    background: #333;
    color: #fff;
  }
  .c-3f
  {
    color: #fff;

  }
  .list-admin
  {
    height: 35px;
    line-height: 35px;
    text-indent:25px;
    font-weight: 700;
    font-size: 14px;
    border-bottom: 1px solid #222
  }
  #left>.active
  {
    background: #777;
  }
</style>
