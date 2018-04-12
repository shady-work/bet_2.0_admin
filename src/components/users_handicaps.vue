
<template>
  <div class="personal-handicaps">
      <div class="left">
        <!--choose_lty-->
        <div class="choose_lty">
          <h4 class="text-center">彩种</h4>
          <select class="form-control" v-model="which_lottery">
            <option v-for="v in users_lties" v-bind:value="v">{{be_str_lty_name(v)}}</option>
          </select>
        </div>
        <!--choose_handicap-->
        <table class="table table-hovor table-bordered table-striped text-center">
          <thead class="bg-primary">
          <tr >
            <td width="130" style='line-height:30px;'>盘口名称</td>
            <td style='line-height:30px;'>操作</td>
          </tr>
          </thead>
          <tbody>
          <tr  v-for="(v,k) in handicaps" >
            <td :class="active_array[k]?'text-danger':''">
              {{v}}盘 <b v-if="is_custom[k]" class="text-warning">(定制盘)</b>
            </td>
            <td>
              <button class="btn btn-info pull-left btn-sm edit center-block" @click='choose_one_ssc(k,v)'>查看</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="right">
        <h2 style="margin-top: 0px;" >用户名:{{user.username}} 状态：{{user.status==1?'启用':'禁用'}}
          类型：{{user.type == 0?'会员':(user.type == 1?'代理':(user.type==2?'推广':(user.type == 3?'管理':'')))}}
          <router-link to="users" >返来查看用户信息</router-link>
        </h2>
        <div class="cqssc" v-show="which_lottery == 'cqssc'">
          <!--返水-->
          <table class="table table-hovor table-bordered table-striped text-center" style="margin-bottom: 0;">

            <thead class="bg-primary">
            <tr >
              <td colspan="3">
                <!--{{which_one}}盘-->
                <button class="pull-right save  btn btn-success" @click='custom_handicap()'>保存，定制</button>
              </td>
            </tr>
            </thead>
            <thead class="bg-warning">
            <tr >
              <td>级别</td>
              <td>返点</td>
              <td>流水</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(v,k) in odds_ssc_one" v-if=' k < 4'>
              <td>
                {{v.mark_b}}
              </td>
              <td>
                <input type="text" class="form-control" v-model="odds_ssc_one[k].A" style="width: auto;">
              </td>
              <td>
                <input type="text" class="form-control" v-model="odds_ssc_one[k].B" style="width: auto;">
              </td>
            </tr>
            </tbody>
          </table>
          <!--特码-->
          <table class="table table-hovor table-bordered table-striped text-center" style="margin-bottom: 0;font-size: 12px;">
            <thead class="bg-primary">
            <tr >
              <td>球序</td>
              <td>特码0</td>
              <td>特码1</td>
              <td>特码2</td>
              <td>特码3</td>
              <td>特码4</td>
              <td>特码5</td>
              <td>特码6</td>
              <td>特码7</td>
              <td>特码8</td>
              <td>特码9</td>
            </tr>
            </thead>
            <tbody >
            <tr v-for="(v,k) in odds_ssc_one" v-if='k>=4 && k<9' style="font-size: 12px;" >
              <td >
                {{v.mark_b}}
              </td>
              <td>
                <input type="text"  v-model="odds_ssc_one[k].A">
              </td>
              <td>
                <input type="text" v-model="odds_ssc_one[k].B">
              </td>
              <td>
                <input type="text" v-model="odds_ssc_one[k].C">
              </td>
              <td>
                <input type="text" v-model="odds_ssc_one[k].D">
              </td>
              <td>
                <input type="text" v-model="odds_ssc_one[k].E">
              </td>
              <td>
                <input type="text"  v-model="odds_ssc_one[k].F">
              </td>
              <td>
                <input type="text"  v-model="odds_ssc_one[k].G">
              </td>
              <td>
                <input type="text"  v-model="odds_ssc_one[k].H">
              </td>
              <td>
                <input type="text"  v-model="odds_ssc_one[k].I">
              </td>
              <td>
                <input type="text"  v-model="odds_ssc_one[k].J">
              </td>
            </tr>
            </tbody>
          </table>

          <!--总和、龙虎-->
          <table class="table table-hovor table-bordered table-striped text-center" style="margin-bottom: 0;font-size: 12px;">
            <thead class="bg-danger">
            <tr>
              <td>总和、龙虎</td>
              <td>总和单</td>
              <td>总和双</td>
              <td>总和大</td>
              <td>总和小</td>
              <td>总和龙</td>
              <td>总和虎</td>
              <td>和</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(v,k) in odds_ssc_one" v-if='k==9' style="font-size: 12px;" >
              <td >
                {{v.mark_b}}
              </td>
              <td>
                <input type="text"  v-model="odds_ssc_one[k].A">
              </td>
              <td>
                <input type="text"  v-model="odds_ssc_one[k].B">
              </td>
              <td>
                <input type="text"  v-model="odds_ssc_one[k].C">
              </td>
              <td>
                <input type="text"  v-model="odds_ssc_one[k].D">
              </td>
              <td>
                <input type="text"  v-model="odds_ssc_one[k].E">
              </td>
              <td>
                <input type="text"  v-model="odds_ssc_one[k].F">
              </td>
              <td>
                <input type="text"  v-model="odds_ssc_one[k].G">
              </td>

            </tr>
            </tbody>
          </table>
          <!--前三，中三，后三-->
          <table class="table table-hovor table-bordered table-striped text-center" style="margin-bottom: 0;font-size: 12px;">
          <thead class="bg-success">
          <tr >
            <td >前三，中三，后三</td>
            <td>豹子</td>
            <td>顺子</td>
            <td>对子</td>
            <td>半顺</td>
            <td>杂六</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(v,k) in odds_ssc_one" v-if='k>9' style="margin-bottom: 0;font-size: 12px;">
            <td >
              {{v.mark_b}}
            </td>
            <td>
              <input type="text"  v-model="odds_ssc_one[k].A">
            </td>
            <td>
              <input type="text" v-model="odds_ssc_one[k].B">
            </td>
            <td>
              <input type="text" v-model="odds_ssc_one[k].C">
            </td>
            <td>
              <input type="text" v-model="odds_ssc_one[k].D">
            </td>
            <td>
              <input type="text" v-model="odds_ssc_one[k].E">
            </td>
          </tr>
          </tbody>
        </table>
        </div>

        <div class="pk10" v-show="which_lottery == 'bjpk10'">
          <table class="table table-hovor table-bordered table-striped text-center">
            <thead class="bg-primary">
            <tr >
              <td colspan="3">
                <button class="pull-right save  btn btn-success" @click='custom_handicap()'>保存，定制</button>
              </td>
            </tr>
            </thead>
            <thead class="bg-warning">
            <tr >
              <td>级别</td>
              <td>返点</td>
              <td>流水</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(v,k) in odds_pk10_one" v-if=' k < 4'>
              <td>
                {{v.mark_b}}
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].A">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].B">
              </td>
            </tr>
            </tbody>
          </table>

          <table class="table table-hovor table-bordered table-striped text-center">
            <thead class="bg-primary">
            <tr >
              <td >球序</td>
              <td>特码1</td>
              <td>特码2</td>
              <td>特码3</td>
              <td>特码4</td>
              <td>特码5</td>
              <td>特码6</td>
              <td>特码7</td>
              <td>特码8</td>
              <td>特码9</td>
              <td>特码10</td>

            </tr>
            </thead>
            <tbody>
            <tr v-for="(v,k) in odds_pk10_one" v-if='k>=4 && k<14'>
              <td >
                {{v.mark_b}}
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].A">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].B">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].C">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].D">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].E">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].F">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].G">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].H">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].I">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].J">
              </td>

            </tr>
            </tbody>
          </table>
          <table class="table table-hovor table-bordered table-striped text-center">
            <thead class="bg-primary">
            <tr >
              <td >球序</td>
              <td>大</td>
              <td>小</td>
              <td>单</td>
              <td>双</td>
              <td>龙</td>
              <td>虎</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(v,k) in odds_pk10_one" v-if='k>=4 && k<14'>
              <td >
                {{v.mark_b}}
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].K">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].L">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].M">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].N">
              </td>
              <td v-if="odds_pk10_one[k].O">
                <input type="text"  v-model="odds_pk10_one[k].O">
              </td>
              <td v-if="odds_pk10_one[k].P">
                <input type="text"  v-model="odds_pk10_one[k].P">
              </td>
            </tr>
            </tbody>
          </table>
          <table class="table table-hovor table-bordered table-striped text-center">
            <thead class="bg-danger">
            <tr >
              <td >冠亚军和-号码</td>
              <td>13</td>
              <td>14</td>
              <td>15</td>
              <td>16</td>
              <td>17</td>
              <td>18</td>
              <td>19</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(v,k) in odds_pk10_one" v-if='k==14'>
              <td >
                {{v.mark_b}}
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].K">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].L">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].M">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].N">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].O">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].P">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].Q">
              </td>
            </tr>
            </tbody>
          </table>



          <table class="table table-hovor table-bordered table-striped text-center">
            <thead class="bg-danger">
            <tr >
              <td >冠亚军和-号码</td>
              <td>13</td>
              <td>14</td>
              <td>15</td>
              <td>16</td>
              <td>17</td>
              <td>18</td>
              <td>19</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(v,k) in odds_pk10_one" v-if='k==14'>
              <td >
                {{v.mark_b}}
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].K">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].L">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].M">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].N">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].O">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].P">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].Q">
              </td>
            </tr>
            </tbody>
          </table>

          <table class="table table-hovor table-bordered table-striped text-center">
            <thead class="bg-danger">
            <tr >
              <td >冠亚军和-号码</td>
              <td>大</td>
              <td>小</td>
              <td>单</td>
              <td>双</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(v,k) in odds_pk10_one" v-if='k==15'>
              <td >
                {{v.mark_b}}
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].A">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].B">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].C">
              </td>
              <td>
                <input type="text"  v-model="odds_pk10_one[k].D">
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="cake" v-show="which_lottery == 'cakeno'">
          <table class="table table-hovor table-bordered table-striped text-center" style="width: 900px;">
            <thead class="bg-primary">
            <tr >
              <td colspan="3">
                <button class="pull-right save  btn btn-success" @click='custom_handicap()'>保存，定制</button>
              </td>
            </tr>
            </thead>
            <thead class="bg-warning">
            <tr >
              <td>级别</td>
              <td>返点</td>
              <td>流水</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(v,k) in odds_cake_one" v-if=' k < 4'>
              <td>
                {{v.mark_b}}
              </td>
              <td>
                <input type="text"  v-model="odds_cake_one[k].e1">
              </td>
              <td>
                <input type="text"  v-model="odds_cake_one[k].e2">
              </td>
            </tr>
            </tbody>
          </table>

          <table class="table table-hovor table-bordered table-striped text-center" style="width: 900px;">
            <thead class="bg-primary">
            <tr >
              <td width="150">球序</td>
              <td v-for="(v,k,index) in odds_cake_one[4]" v-if='index<14'>特码{{index}}</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td >赔率</td>
              <td v-for="(v,k,index) in odds_cake_one[4]" v-if='index<14'>
                <input type="text"   v-model="odds_cake_one[4]['e' + (index+1)]" >
              </td>
            </tr>
            </tbody>

            <thead class="bg-primary">
            <tr >
              <td width="150">球序</td>
              <td v-for="(v,k,index) in odds_cake_one[4]" v-if='index>=14&&index<28'>特码{{index}}</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td >赔率</td>
              <td v-for="(v,k,index) in odds_cake_one[4]" v-if='index>=14&&index<28'>
                <input type="text"   v-model="odds_cake_one[4]['e' + (index+1)]" >
              </td>
            </tr>
            </tbody>
          </table>

          <table class="table table-hovor table-bordered table-striped text-center" style="width: 900px;">
            <thead class="bg-primary">
            <tr >
              <td width="150">球序</td>
              <td>大</td>
              <td>小</td>
              <td>单</td>
              <td>双</td>
              <td>大单</td>
              <td>大双</td>
              <td>小单</td>
              <td>小双</td>
              <td>极大</td>
              <td>极小</td>
              <td>豹子</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td >赔率</td>
              <td v-for="(v,k,index) in odds_cake_one[5]" v-if='index<10'>
                <input type="text"   v-model="odds_cake_one[5]['e' + (index+1)]" >
              </td>
              <td >
                <input type="text"   v-model="odds_cake_one[7]['e1']" >
              </td>
            </tr>
            </tbody>
          </table>

          <table class="table table-hovor table-bordered table-striped text-center" style="width: 900px;">
            <thead class="bg-primary">
            <tr >
              <td width="150">波色</td>
              <td>红波</td>
              <td>绿波</td>
              <td>蓝波</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td >赔率</td>
              <td v-for="(v,k,index) in odds_cake_one[5]" v-if='index<3'>
                <input type="text"   v-model="odds_cake_one[6]['e' + (index+1)]" >
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="pcegg" v-show="which_lottery == 'pcegg'">
          <table class="table table-hovor table-bordered table-striped text-center" style="width: 900px;">
            <thead class="bg-primary">
            <tr >
              <td colspan="3">
                <button class="pull-right save  btn btn-success" @click='custom_handicap()'>保存，定制</button>
              </td>
            </tr>
            </thead>
            <thead class="bg-warning">
            <tr >
              <td>级别</td>
              <td>返点</td>
              <td>流水</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(v,k) in odds_egg_one" v-if=' k < 4'>
              <td>
                {{v.mark_b}}
              </td>
              <td>
                <input type="text"  v-model="odds_egg_one[k].e1">
              </td>
              <td>
                <input type="text"  v-model="odds_egg_one[k].e2">
              </td>
            </tr>
            </tbody>
          </table>

          <table class="table table-hovor table-bordered table-striped text-center" style="width: 900px;">
            <thead class="bg-primary">
            <tr >
              <td>特码</td>
              <td v-for="(v,k,index) in odds_egg_one[4]" v-if='index<14'>特码{{index}}</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td >赔率</td>
              <td v-for="(v,k,index) in odds_egg_one[4]" v-if='index<14'>
                <input type="text"   v-model="odds_egg_one[4]['e' + (index+1)]" >
              </td>
            </tr>
            </tbody>

            <thead class="bg-primary">
            <tr>
              <td>特码</td>
              <td v-for="(v,k,index) in odds_egg_one[4]" v-if='index>=14&&index<28'>特码{{index}}</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>赔率</td>
              <td v-for="(v,k,index) in odds_egg_one[4]" v-if='index>=14&&index<28'>
                <input type="text"   v-model="odds_egg_one[4]['e' + (index+1)]" >
              </td>
            </tr>
            </tbody>
          </table>

          <table class="table table-hovor table-bordered table-striped text-center" style="width: 900px;">
            <thead class="bg-primary">
            <tr >
              <td>特码</td>
              <td>大</td>
              <td>小</td>
              <td>单</td>
              <td>双</td>
              <td>大单</td>
              <td>大双</td>
              <td>小单</td>
              <td>小双</td>
              <td>极大</td>
              <td>极小</td>
              <td>豹子</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td >赔率</td>
              <td v-for="(v,k,index) in odds_egg_one[5]" v-if='index<10'>
                <input type="text"   v-model="odds_egg_one[5]['e' + (index+1)]" >
              </td>
              <td >
                <input type="text"   v-model="odds_egg_one[7]['e1']" >
              </td>
            </tr>
            </tbody>
          </table>


          <table class="table table-hovor table-bordered table-striped text-center" style="width: 900px;">
            <thead class="bg-primary">
            <tr >
              <td width="150">波色</td>
              <td>红波</td>
              <td>绿波</td>
              <td>蓝波</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td >赔率</td>
              <td v-for="(v,k,index) in odds_egg_one[5]" v-if='index<3'>
                <input type="text"   v-model="odds_egg_one[6]['e' + (index+1)]" >
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
  </div>
</template>


<script>
  export default
  {
    name:'users_handicaps',
    data()
    {
      return{
          u_id:0,
          users_lties:[],//用户已有哪些盘口
          handicaps:[],//彩种对应的盘口
          ssc_odds_all:[],//所有的赔率设定
          which_lottery:'',
          active_array:[1,0,0,0,0,0,0,0,0,0,0,0],//active_array;
          odds_ssc_one: [
          {
            "id": 1,
            "mark_a": "返点",
            "mark_b": "总代",
            "A": "0.0012",
            "B": "0.0010",
            "C": "0.0000",
            "D": "0.0000",
            "E": "0.0000",
            "F": "0.0000",
            "G": "0.0000",
            "H": "0.0000",
            "I": "0.0000",
            "J": "0.0000",
            "K": "0.0000",
            "L": "0.0000",
            "M": "0.0000",
            "N": "0.0000",
            "O": "0.0000"
          },
          {
            "id": 2,
            "mark_a": "返点",
            "mark_b": "分代",
            "A": "0.0010",
            "B": "0.0020",
            "C": "0.0000",
            "D": "0.0000",
            "E": "0.0000",
            "F": "0.0000",
            "G": "0.0000",
            "H": "0.0000",
            "I": "0.0000",
            "J": "0.0000",
            "K": "0.0000",
            "L": "0.0000",
            "M": "0.0000",
            "N": "0.0000",
            "O": "0.0000"
          },
          {
            "id": 3,
            "mark_a": "返点",
            "mark_b": "推广",
            "A": "0.0010",
            "B": "0.0030",
            "C": "0.0000",
            "D": "0.0000",
            "E": "0.0000",
            "F": "0.0000",
            "G": "0.0000",
            "H": "0.0000",
            "I": "0.0000",
            "J": "0.0000",
            "K": "0.0000",
            "L": "0.0000",
            "M": "0.0000",
            "N": "0.0000",
            "O": "0.0000"
          },
          {
            "id": 4,
            "mark_a": "返点",
            "mark_b": "会员",
            "A": "0.0210",
            "B": "0.0000",
            "C": "0.0000",
            "D": "0.0000",
            "E": "0.0000",
            "F": "0.0000",
            "G": "0.0000",
            "H": "0.0000",
            "I": "0.0000",
            "J": "0.0000",
            "K": "0.0000",
            "L": "0.0000",
            "M": "0.0000",
            "N": "0.0000",
            "O": "0.0000"
          },
          {
            "id": 5,
            "mark_a": "特码",
            "mark_b": "第一球",
            "A": "9.7150",
            "B": "9.7150",
            "C": "9.7150",
            "D": "9.7150",
            "E": "9.7150",
            "F": "9.7150",
            "G": "9.7150",
            "H": "9.7150",
            "I": "9.7150",
            "J": "9.7150",
            "K": "1.9430",
            "L": "1.9430",
            "M": "1.9430",
            "N": "1.9430",
            "O": "0.0000"
          },
          {
            "id": 6,
            "mark_a": "特码",
            "mark_b": "第二球",
            "A": "9.7150",
            "B": "9.7150",
            "C": "9.7150",
            "D": "9.7150",
            "E": "9.7150",
            "F": "9.7150",
            "G": "9.7150",
            "H": "9.7150",
            "I": "9.7150",
            "J": "9.7150",
            "K": "1.9430",
            "L": "1.9430",
            "M": "1.9430",
            "N": "1.9430",
            "O": "0.0000"
          },
          {
            "id": 7,
            "mark_a": "特码",
            "mark_b": "第三球",
            "A": "9.7150",
            "B": "9.7150",
            "C": "9.7150",
            "D": "9.7150",
            "E": "9.7150",
            "F": "9.7150",
            "G": "9.7150",
            "H": "9.7150",
            "I": "9.7150",
            "J": "9.7150",
            "K": "1.9430",
            "L": "1.9430",
            "M": "1.9430",
            "N": "1.9430",
            "O": "0.0000"
          },
          {
            "id": 8,
            "mark_a": "特码",
            "mark_b": "第四球",
            "A": "9.7150",
            "B": "9.7150",
            "C": "9.7150",
            "D": "9.7150",
            "E": "9.7150",
            "F": "9.7150",
            "G": "9.7150",
            "H": "9.7150",
            "I": "9.7150",
            "J": "9.7150",
            "K": "1.9430",
            "L": "1.9430",
            "M": "1.9430",
            "N": "1.9430",
            "O": "0.0000"
          },
          {
            "id": 9,
            "mark_a": "特码",
            "mark_b": "第五球",
            "A": "9.7150",
            "B": "9.7150",
            "C": "9.7150",
            "D": "9.7150",
            "E": "9.7150",
            "F": "9.7150",
            "G": "9.7150",
            "H": "9.7150",
            "I": "9.7150",
            "J": "9.7150",
            "K": "1.9430",
            "L": "1.9430",
            "M": "1.9430",
            "N": "1.9430",
            "O": "0.0000"
          },
          {
            "id": 10,
            "mark_a": "两面",
            "mark_b": "总和、龙虎",
            "A": "1.9430",
            "B": "1.9430",
            "C": "1.9430",
            "D": "1.9430",
            "E": "1.9430",
            "F": "1.9430",
            "G": "9.6700",
            "H": "0.0000",
            "I": "0.0000",
            "J": "0.0000",
            "K": "0.0000",
            "L": "0.0000",
            "M": "0.0000",
            "N": "0.0000",
            "O": "0.0000"
          },
          {
            "id": 11,
            "mark_a": "两面",
            "mark_b": "前三",
            "A": "96.7000",
            "B": "16.1170",
            "C": "3.5810",
            "D": "2.6860",
            "E": "3.2230",
            "F": "0.0000",
            "G": "0.0000",
            "H": "0.0000",
            "I": "0.0000",
            "J": "0.0000",
            "K": "0.0000",
            "L": "0.0000",
            "M": "0.0000",
            "N": "0.0000",
            "O": "0.0000"
          },
          {
            "id": 12,
            "mark_a": "两面",
            "mark_b": "中三",
            "A": "96.7000",
            "B": "16.1170",
            "C": "3.5810",
            "D": "2.6860",
            "E": "3.2230",
            "F": "0.0000",
            "G": "0.0000",
            "H": "0.0000",
            "I": "0.0000",
            "J": "0.0000",
            "K": "0.0000",
            "L": "0.0000",
            "M": "0.0000",
            "N": "0.0000",
            "O": "0.0000"
          },
          {
            "id": 13,
            "mark_a": "两面",
            "mark_b": "后三",
            "A": "96.7000",
            "B": "16.1170",
            "C": "3.5810",
            "D": "2.6860",
            "E": "3.2230",
            "F": "0.0000",
            "G": "0.0000",
            "H": "0.0000",
            "I": "0.0000",
            "J": "0.0000",
            "K": "0.0000",
            "L": "0.0000",
            "M": "0.0000",
            "N": "0.0000",
            "O": "0.0000"
          }
        ],
          odds_pk10_one:[],
          odds_egg_one:[
            {
              "id": 1,
              "mark_a": "返点",
              "mark_b": "总代",
              "A": "0.0011",
              "B": "0.0012",
              "C": null,
              "D": null,
              "E": null,
              "F": null,
              "G": null,
              "H": null,
              "I": null,
              "J": null,
              "K": null,
              "L": null,
              "M": null,
              "N": null,
              "O": null,
              "P": null,
              "Q": null
            },
            {
              "id": 2,
              "mark_a": "返点",
              "mark_b": "分代",
              "A": "0.0012",
              "B": "0.0010",
              "C": null,
              "D": null,
              "E": null,
              "F": null,
              "G": null,
              "H": null,
              "I": null,
              "J": null,
              "K": null,
              "L": null,
              "M": null,
              "N": null,
              "O": null,
              "P": null,
              "Q": null
            },
            {
              "id": 3,
              "mark_a": "返点",
              "mark_b": "推广",
              "A": "0.0013",
              "B": "0.0010",
              "C": null,
              "D": null,
              "E": null,
              "F": null,
              "G": null,
              "H": null,
              "I": null,
              "J": null,
              "K": null,
              "L": null,
              "M": null,
              "N": null,
              "O": null,
              "P": null,
              "Q": null
            },
            {
              "id": 4,
              "mark_a": "返点",
              "mark_b": "会员",
              "A": "0.0210",
              "B": "0.0010",
              "C": null,
              "D": null,
              "E": null,
              "F": null,
              "G": null,
              "H": null,
              "I": null,
              "J": null,
              "K": null,
              "L": null,
              "M": null,
              "N": null,
              "O": null,
              "P": null,
              "Q": null
            },
            {
              "id": 5,
              "mark_a": "特码",
              "mark_b": "冠军",
              "A": "9.7150",
              "B": "9.7150",
              "C": "9.7150",
              "D": "9.7150",
              "E": "9.7150",
              "F": "9.7150",
              "G": "9.7150",
              "H": "9.7150",
              "I": "9.7150",
              "J": "9.7150",
              "K": "1.9430",
              "L": "1.9430",
              "M": "1.9430",
              "N": "1.9430",
              "O": "1.9430",
              "P": "1.9430",
              "Q": null
            },
            {
              "id": 6,
              "mark_a": "特码",
              "mark_b": "亚军",
              "A": "9.7150",
              "B": "9.7150",
              "C": "9.7150",
              "D": "9.7150",
              "E": "9.7150",
              "F": "9.7150",
              "G": "9.7150",
              "H": "9.7150",
              "I": "9.7150",
              "J": "9.7150",
              "K": "1.9430",
              "L": "1.9430",
              "M": "1.9430",
              "N": "1.9430",
              "O": "1.9430",
              "P": "1.9430",
              "Q": null
            },
            {
              "id": 7,
              "mark_a": "特码",
              "mark_b": "第三名",
              "A": "9.7150",
              "B": "9.7150",
              "C": "9.7150",
              "D": "9.7150",
              "E": "9.7150",
              "F": "9.7150",
              "G": "9.7150",
              "H": "9.7150",
              "I": "9.7150",
              "J": "9.7150",
              "K": "1.9430",
              "L": "1.9430",
              "M": "1.9430",
              "N": "1.9430",
              "O": "1.9430",
              "P": "1.9430",
              "Q": null
            },
            {
              "id": 8,
              "mark_a": "特码",
              "mark_b": "第四名",
              "A": "9.7150",
              "B": "9.7150",
              "C": "9.7150",
              "D": "9.7150",
              "E": "9.7150",
              "F": "9.7150",
              "G": "9.7150",
              "H": "9.7150",
              "I": "9.7150",
              "J": "9.7150",
              "K": "1.9430",
              "L": "1.9430",
              "M": "1.9430",
              "N": "1.9430",
              "O": "1.9430",
              "P": "1.9430",
              "Q": null
            },
            {
              "id": 9,
              "mark_a": "特码",
              "mark_b": "第五名",
              "A": "9.7150",
              "B": "9.7150",
              "C": "9.7150",
              "D": "9.7150",
              "E": "9.7150",
              "F": "9.7150",
              "G": "9.7150",
              "H": "9.7150",
              "I": "9.7150",
              "J": "9.7150",
              "K": "1.9430",
              "L": "1.9430",
              "M": "1.9430",
              "N": "1.9430",
              "O": "1.9430",
              "P": "1.9430",
              "Q": null
            },
            {
              "id": 10,
              "mark_a": "特码",
              "mark_b": "第六名",
              "A": "9.7150",
              "B": "9.7150",
              "C": "9.7150",
              "D": "9.7150",
              "E": "9.7150",
              "F": "9.7150",
              "G": "9.7150",
              "H": "9.7150",
              "I": "9.7150",
              "J": "9.7150",
              "K": "1.9430",
              "L": "1.9430",
              "M": "1.9430",
              "N": "1.9430",
              "O": null,
              "P": null,
              "Q": null
            },
            {
              "id": 11,
              "mark_a": "特码",
              "mark_b": "第七名",
              "A": "9.7150",
              "B": "9.7150",
              "C": "9.7150",
              "D": "9.7150",
              "E": "9.7150",
              "F": "9.7150",
              "G": "9.7150",
              "H": "9.7150",
              "I": "9.7150",
              "J": "9.7150",
              "K": "1.9430",
              "L": "1.9430",
              "M": "1.9430",
              "N": "1.9430",
              "O": null,
              "P": null,
              "Q": null
            },
            {
              "id": 12,
              "mark_a": "特码",
              "mark_b": "第八名",
              "A": "9.7150",
              "B": "9.7150",
              "C": "9.7150",
              "D": "9.7150",
              "E": "9.7150",
              "F": "9.7150",
              "G": "9.7150",
              "H": "9.7150",
              "I": "9.7150",
              "J": "9.7150",
              "K": "1.9430",
              "L": "1.9430",
              "M": "1.9430",
              "N": "1.9430",
              "O": null,
              "P": null,
              "Q": null
            },
            {
              "id": 13,
              "mark_a": "特码",
              "mark_b": "第九名",
              "A": "9.7150",
              "B": "9.7150",
              "C": "9.7150",
              "D": "9.7150",
              "E": "9.7150",
              "F": "9.7150",
              "G": "9.7150",
              "H": "9.7150",
              "I": "9.7150",
              "J": "9.7150",
              "K": "1.9430",
              "L": "1.9430",
              "M": "1.9430",
              "N": "1.9430",
              "O": null,
              "P": null,
              "Q": null
            },
            {
              "id": 14,
              "mark_a": "特码",
              "mark_b": "第十名",
              "A": "9.7150",
              "B": "9.7150",
              "C": "9.7150",
              "D": "9.7150",
              "E": "9.7150",
              "F": "9.7150",
              "G": "9.7150",
              "H": "9.7150",
              "I": "9.7150",
              "J": "9.7150",
              "K": "1.9430",
              "L": "1.9430",
              "M": "1.9430",
              "N": "1.9430",
              "O": null,
              "P": null,
              "Q": null
            },
            {
              "id": 15,
              "mark_a": "特码",
              "mark_b": "冠亚军和",
              "A": "43.5150",
              "B": "43.5150",
              "C": "21.7580",
              "D": "21.7580",
              "E": "14.5050",
              "F": "14.5050",
              "G": "10.6370",
              "H": "10.6370",
              "I": "8.7030",
              "J": "10.6370",
              "K": "10.6370",
              "L": "14.5050",
              "M": "14.5050",
              "N": "21.7580",
              "O": "21.7580",
              "P": "43.5150",
              "Q": "43.5150"
            },
            {
              "id": 16,
              "mark_a": "两面",
              "mark_b": "冠亚军和",
              "A": "1.9430",
              "B": "1.9430",
              "C": "1.9430",
              "D": "1.9430",
              "E": null,
              "F": null,
              "G": null,
              "H": null,
              "I": null,
              "J": null,
              "K": null,
              "L": null,
              "M": null,
              "N": null,
              "O": null,
              "P": null,
              "Q": null
            }
          ],//end list
          odds_cake_one: [
            {
              "id": 1,
              "mark_a": "返点",
              "mark_b": "总代",
              "A": "0.0011",
              "B": "0.0012",
              "C": null,
              "D": null,
              "E": null,
              "F": null,
              "G": null,
              "H": null,
              "I": null,
              "J": null,
              "K": null,
              "L": null,
              "M": null,
              "N": null,
              "O": null,
              "P": null,
              "Q": null
            },
            {
              "id": 2,
              "mark_a": "返点",
              "mark_b": "分代",
              "A": "0.0012",
              "B": "0.0010",
              "C": null,
              "D": null,
              "E": null,
              "F": null,
              "G": null,
              "H": null,
              "I": null,
              "J": null,
              "K": null,
              "L": null,
              "M": null,
              "N": null,
              "O": null,
              "P": null,
              "Q": null
            },
            {
              "id": 3,
              "mark_a": "返点",
              "mark_b": "推广",
              "A": "0.0013",
              "B": "0.0010",
              "C": null,
              "D": null,
              "E": null,
              "F": null,
              "G": null,
              "H": null,
              "I": null,
              "J": null,
              "K": null,
              "L": null,
              "M": null,
              "N": null,
              "O": null,
              "P": null,
              "Q": null
            },
            {
              "id": 4,
              "mark_a": "返点",
              "mark_b": "会员",
              "A": "0.0210",
              "B": "0.0010",
              "C": null,
              "D": null,
              "E": null,
              "F": null,
              "G": null,
              "H": null,
              "I": null,
              "J": null,
              "K": null,
              "L": null,
              "M": null,
              "N": null,
              "O": null,
              "P": null,
              "Q": null
            },
            {
              "id": 5,
              "mark_a": "特码",
              "mark_b": "冠军",
              "A": "9.7150",
              "B": "9.7150",
              "C": "9.7150",
              "D": "9.7150",
              "E": "9.7150",
              "F": "9.7150",
              "G": "9.7150",
              "H": "9.7150",
              "I": "9.7150",
              "J": "9.7150",
              "K": "1.9430",
              "L": "1.9430",
              "M": "1.9430",
              "N": "1.9430",
              "O": "1.9430",
              "P": "1.9430",
              "Q": null
            },
            {
              "id": 6,
              "mark_a": "特码",
              "mark_b": "亚军",
              "A": "9.7150",
              "B": "9.7150",
              "C": "9.7150",
              "D": "9.7150",
              "E": "9.7150",
              "F": "9.7150",
              "G": "9.7150",
              "H": "9.7150",
              "I": "9.7150",
              "J": "9.7150",
              "K": "1.9430",
              "L": "1.9430",
              "M": "1.9430",
              "N": "1.9430",
              "O": "1.9430",
              "P": "1.9430",
              "Q": null
            },
            {
              "id": 7,
              "mark_a": "特码",
              "mark_b": "第三名",
              "A": "9.7150",
              "B": "9.7150",
              "C": "9.7150",
              "D": "9.7150",
              "E": "9.7150",
              "F": "9.7150",
              "G": "9.7150",
              "H": "9.7150",
              "I": "9.7150",
              "J": "9.7150",
              "K": "1.9430",
              "L": "1.9430",
              "M": "1.9430",
              "N": "1.9430",
              "O": "1.9430",
              "P": "1.9430",
              "Q": null
            },
            {
              "id": 8,
              "mark_a": "特码",
              "mark_b": "第四名",
              "A": "9.7150",
              "B": "9.7150",
              "C": "9.7150",
              "D": "9.7150",
              "E": "9.7150",
              "F": "9.7150",
              "G": "9.7150",
              "H": "9.7150",
              "I": "9.7150",
              "J": "9.7150",
              "K": "1.9430",
              "L": "1.9430",
              "M": "1.9430",
              "N": "1.9430",
              "O": "1.9430",
              "P": "1.9430",
              "Q": null
            },
            {
              "id": 9,
              "mark_a": "特码",
              "mark_b": "第五名",
              "A": "9.7150",
              "B": "9.7150",
              "C": "9.7150",
              "D": "9.7150",
              "E": "9.7150",
              "F": "9.7150",
              "G": "9.7150",
              "H": "9.7150",
              "I": "9.7150",
              "J": "9.7150",
              "K": "1.9430",
              "L": "1.9430",
              "M": "1.9430",
              "N": "1.9430",
              "O": "1.9430",
              "P": "1.9430",
              "Q": null
            },
            {
              "id": 10,
              "mark_a": "特码",
              "mark_b": "第六名",
              "A": "9.7150",
              "B": "9.7150",
              "C": "9.7150",
              "D": "9.7150",
              "E": "9.7150",
              "F": "9.7150",
              "G": "9.7150",
              "H": "9.7150",
              "I": "9.7150",
              "J": "9.7150",
              "K": "1.9430",
              "L": "1.9430",
              "M": "1.9430",
              "N": "1.9430",
              "O": null,
              "P": null,
              "Q": null
            },
            {
              "id": 11,
              "mark_a": "特码",
              "mark_b": "第七名",
              "A": "9.7150",
              "B": "9.7150",
              "C": "9.7150",
              "D": "9.7150",
              "E": "9.7150",
              "F": "9.7150",
              "G": "9.7150",
              "H": "9.7150",
              "I": "9.7150",
              "J": "9.7150",
              "K": "1.9430",
              "L": "1.9430",
              "M": "1.9430",
              "N": "1.9430",
              "O": null,
              "P": null,
              "Q": null
            },
            {
              "id": 12,
              "mark_a": "特码",
              "mark_b": "第八名",
              "A": "9.7150",
              "B": "9.7150",
              "C": "9.7150",
              "D": "9.7150",
              "E": "9.7150",
              "F": "9.7150",
              "G": "9.7150",
              "H": "9.7150",
              "I": "9.7150",
              "J": "9.7150",
              "K": "1.9430",
              "L": "1.9430",
              "M": "1.9430",
              "N": "1.9430",
              "O": null,
              "P": null,
              "Q": null
            },
            {
              "id": 13,
              "mark_a": "特码",
              "mark_b": "第九名",
              "A": "9.7150",
              "B": "9.7150",
              "C": "9.7150",
              "D": "9.7150",
              "E": "9.7150",
              "F": "9.7150",
              "G": "9.7150",
              "H": "9.7150",
              "I": "9.7150",
              "J": "9.7150",
              "K": "1.9430",
              "L": "1.9430",
              "M": "1.9430",
              "N": "1.9430",
              "O": null,
              "P": null,
              "Q": null
            },
            {
              "id": 14,
              "mark_a": "特码",
              "mark_b": "第十名",
              "A": "9.7150",
              "B": "9.7150",
              "C": "9.7150",
              "D": "9.7150",
              "E": "9.7150",
              "F": "9.7150",
              "G": "9.7150",
              "H": "9.7150",
              "I": "9.7150",
              "J": "9.7150",
              "K": "1.9430",
              "L": "1.9430",
              "M": "1.9430",
              "N": "1.9430",
              "O": null,
              "P": null,
              "Q": null
            },
            {
              "id": 15,
              "mark_a": "特码",
              "mark_b": "冠亚军和",
              "A": "43.5150",
              "B": "43.5150",
              "C": "21.7580",
              "D": "21.7580",
              "E": "14.5050",
              "F": "14.5050",
              "G": "10.6370",
              "H": "10.6370",
              "I": "8.7030",
              "J": "10.6370",
              "K": "10.6370",
              "L": "14.5050",
              "M": "14.5050",
              "N": "21.7580",
              "O": "21.7580",
              "P": "43.5150",
              "Q": "43.5150"
            },
            {
              "id": 16,
              "mark_a": "两面",
              "mark_b": "冠亚军和",
              "A": "1.9430",
              "B": "1.9430",
              "C": "1.9430",
              "D": "1.9430",
              "E": null,
              "F": null,
              "G": null,
              "H": null,
              "I": null,
              "J": null,
              "K": null,
              "L": null,
              "M": null,
              "N": null,
              "O": null,
              "P": null,
              "Q": null
            }
          ],//end list
          user:{},//用户信息
          index:0,//彩种盘口的下标
          is_custom:[],
      };
    },

    methods:
    {
      /**
      * 获取系统的盘口
      */
      get_systems_handicaps:function(type = 'ssc')
      {
      this.$http
      .get(`${this.api}/admin/${type}/odds?user_id=${this.u_id}`)
        .then(function(res)
        {
          if(res.data.status == 200)
          {

            this.ssc_odds_all = res.data.data.odds_list;
            this.handicaps = [];
            this.is_custom = [];
            for(var i = 0;i<res.data.data.odds_list.length;i++)
            {
              this.handicaps.push(res.data.data.odds_list[i].name);
              if(res.data.data.odds_list[i].custom_odds)
              {
                 this.is_custom.push(1);
              }
              else
              {
                this.is_custom.push(0);
              }
            }
            console.log(this.is_custom);
            switch (type)
            {
            case 'pk10':
              if(this.ssc_odds_all[0].custom_odds)
              {
                this.odds_pk10_one = this.ssc_odds_all[0].custom_odds;
              }
              else
              {
                this.odds_pk10_one = this.ssc_odds_all[0].odds;
              }
              break;
            case 'ssc':
              if(this.ssc_odds_all[0].custom_odds)
              {
                this.odds_ssc_one = this.ssc_odds_all[0].custom_odds;
              }
              else
              {
                this.odds_ssc_one = this.ssc_odds_all[0].odds;
              }

              break;
            case 'egg':
              if(this.ssc_odds_all[0].custom_odds)
              {
                this.odds_egg_one = this.ssc_odds_all[0].custom_odds;
              }
              else
              {
                this.odds_egg_one = this.ssc_odds_all[0].odds;
              }

              break;
            case 'cake':
              if(this.ssc_odds_all[0].custom_odds)
              {
                this.odds_cake_one = this.ssc_odds_all[0].custom_odds;
              }
              else
              {
                this.odds_cake_one = this.ssc_odds_all[0].odds;
              }
              break;
            default:
              break;
            };
          }
        });
      },
      /**
      * 获取用户的盘口
      */
      get_users_handicaps:function(type = 'ssc')
      {
      this.$http.get(`${this.api}/admin/ssc/ratelist/${this.u_id}`)
      .then(function(res)
      {
      console.log(res.data);
      })
      },
      /**
      * 获取用户有哪些彩种
      */
      get_users_lties:function()
      {
      this.$http.get(`${this.api}/admin/lotteryList/${this.u_id}`)
      .then(function(res)
      {
      if(res.data.status == 200)
      {
       //获取用户的彩种
       this.users_lties = res.data.data.list;
       this.which_lottery = this.users_lties[0];
      }
      else
      {
       console.log('用户信息加载失败');
      }
      })
      .catch(function()
      {
      alert('没有收到用户的信息，请重试');
      this.$router.push('users');
      });
      },
      /**
      * 将拼音转成中文
      * @param str
      */
      be_str_lty_name : function (str)
      {
      var data = '';
      str = str.toString();
      switch (str)
      {
      case 'bjpk10':
      data = '北京赛车PK拾';
      break;
      case 'cqssc':
      data = '重庆时时彩';
      break;
      case 'pcegg':
      data = 'PC蛋蛋';
      break;
      case 'cakeno':
      data = ' 加拿大28';
      break;
      default:
      break;
      }
      return data;
      },
      /**
      * ssc切盘口
      */
      choose_one_ssc:function(index)
      {
      if(this.which_lottery == 'cqssc')
      {
        if(this.ssc_odds_all[index].custom_odds)
        {
          this.odds_cake_one = this.ssc_odds_all[index].custom_odds;
        }
        else
        {
          this.odds_cake_one = this.ssc_odds_all[index].odds;
        }
      }
      if(this.which_lottery == 'bjpk10')
      {

        if(this.ssc_odds_all[index].custom_odds)
        {
          this.odds_pk10_one = this.ssc_odds_all[index].custom_odds;
        }
        else
        {
          this.odds_pk10_one = this.ssc_odds_all[index].odds;
        }

      }
      if(this.which_lottery == 'cakeno')
      {

        if(this.ssc_odds_all[index].custom_odds)
        {
          this.odds_cake_one = this.ssc_odds_all[index].custom_odds;
        }
        else
        {
          this.odds_cake_one = this.ssc_odds_all[index].odds;
        }
      }
      if(this.which_lottery == 'pcegg')
      {
        if(this.ssc_odds_all[index].custom_odds)
        {
          this.odds_egg_one = this.ssc_odds_all[index].custom_odds;
        }
        else
        {
          this.odds_egg_one = this.ssc_odds_all[index].odds;
        }
      }


      this.active_array = [0,0,0,0,0,0,0,0,0,0,0,0];
      this.active_array[index] = 1;
      this.index = index;
      },
      /**
       * 获取用户的信息
       */
      get_user_info : function ()
      {
         this.$http.get(`${this.api}/admin/users/${this.u_id}`)
           .then(function(res)
           {

              if(res.data.status == 200)
              {
                this.user = res.data.data.user;
              }
           });
      },
      /**
       * 为用户定制特定的盘口
       */
      custom_handicap:function()
      {
        var type = '';//定制的彩种
        var data = {};//提交定制的数据
        data.user_id = this.u_id;
        switch (this.which_lottery)
        {
          case 'bjpk10':
            type = 'pk10';
            break;
          case 'cqssc':
            type = 'ssc';
            break;
          case 'pcegg':
            type = 'egg';
            break;
          case 'cakeno':
            type = 'cake';
            break;
          default:
            break;
        }
        data.table = type + "_" + this.handicaps[this.index];
        data.odds = this.ssc_odds_all[this.index].odds

        this.$http.post(`${this.api}/admin/${type}/customOdds`,data)
          .then(function(res)
          {
            console.log(res.data);
            if(res.data.status == 0 && res.data.msg == 'error')
            {
               //修改失败的情况
               alert('定制错误！ \n' + this.ssc_odds_all[this.index].odds[res.data.data.invalid[0][0]].mark_b +this.ssc_odds_all[this.index].odds[res.data.data.invalid[0][0]].mark_a + '设置不对，请重新赋值！' +
               '\n 注意：值不能超过上级！');

               return;
            }
            else if (res.data.status == 200)
            {
              alert('定制成功!');
              return;
            }
            else
            {
              alert(res.data.msg);
              return;
            }
          });
      },
    },

    created()
    {
        //获取用户的id
        this.u_id = this.$route.params.u_id?this.$route.params.u_id:window.sessionStorage.handicaps_uid;
        window.sessionStorage.handicaps_uid = this.u_id;
        this.get_users_lties();
        this.get_user_info();
        //this.get_users_handicaps();
    },
    watch:
    {
      /**
       * 监听which_lottery的变化
       * @param n
       * @param o
       */
      'which_lottery':function(n,o)
      {
        switch (n)
        {
          case 'bjpk10':
              this.get_systems_handicaps('pk10');
            break;
          case 'cqssc':
            this.get_systems_handicaps('ssc');
            break;
          case 'pcegg':
            this.get_systems_handicaps('egg');
            break;
          case 'cakeno':
            this.get_systems_handicaps('cake');
            break;
          default:
            break;
        }
        this.active_array = [0,0,0,0,0,0,0,0,0,0,0,0];
        this.active_array[0] = 1;
        this.index = 0;

      }
    }
  }
</script>

<style scoped>
  .personal-handicaps
  {
    overflow: hidden;
  }
  .left
  {
    width: 300px;
    float: left;
    box-sizing: border-box;
    padding-top: 25px;
  }
  .choose_lty
  {
    width: 100%;
    overflow: hidden;
  }
  .choose_lty>h4,.choose_lty>.form-control
  {
    float: left;

  }
  .choose_lty>h4
  {
    width: 30%;
  }
  .choose_lty>.form-control
  {
    width: 70%;
  }
  .right
  {
    width: 800px;
    float: left;
    box-sizing: border-box;
    padding-top: 25px;
    margin-left: 15px;
  }
  td>input
  {
    width: 55px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    box-sizing: border-box;
    border: 1px solid #b6b6b6;
    text-align: center;
  }
  .text-danger
  {
    font-size: 18px;
    font-weight: 700;
  }
  table
  {
    font-size: 12px!important;
    margin-bottom: 0px!important;
  }
  .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td
  {
    padding:8px 2px;
  }
</style>


