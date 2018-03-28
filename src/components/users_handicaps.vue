<template>
  <div class="personal-handicaps">
    <ul class="nav nav-tabs my-nav  nav-justified">
      <li role="presentation" class="active"><a >重庆时时彩</a></li>
      <li role="presentation" ><a >北京赛车PK拾</a></li>
      <li role="presentation" ><a>PC蛋蛋</a></li>
      <li role="presentation" ><a >加拿大28</a></li>
    </ul>
    <div class="row">
      <div class="col-md-2 text-center">所有盘口</div>
      <div class="col-md-8">
        <button class="btn btn-sm btn-primary">a盘</button>
        <button class="btn btn-sm btn-primary">b盘</button>
        <button class="btn btn-sm btn-primary">c盘</button>
        <button class="btn btn-sm btn-primary">d盘</button>
        <button class="btn btn-sm btn-info">自定义盘口1</button>
      </div>
    </div>

    <table class="table table-hovor table-bordered table-striped text-center">

    </table>
  </div>
</template>


<script>
  export default
  {
    name:'users_handicaps',
    data()
    {
      return{

      };
    },

    methods:
    {

    },

    created()
    {

    },
  }
</script>


<style scoped>
  .personal-handicaps
  {
    width: 1200px;
    margin:15px auto;
  }
  .my-nav
  {
    width: 1200px;
    margin:15px auto;
  }
</style>
