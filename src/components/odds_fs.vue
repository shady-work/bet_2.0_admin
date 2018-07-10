<template>
    <div id="odds_fs">
      <h3 class="ml10">系统盘口设定</h3>
      <ol class="type_name">
        <!--彩种列表-->
        <li v-for="(v,k) in type_list">
            <button style="padding:10px 20px;border:0;font-size:18px" class="btn"
                    :class="type_on[k] == 1? 'btn-success': 'btn-primary'"
                    @click="choose_type_one(k)">{{v}}</button>
        </li>
      </ol>
      <!--列表内容-->
      <div class="section">
        <nav>
          <!--每个彩种对应的盘口列表-->
          <div class="list">
            <div v-for="(v,k) in nav_list" :class="nav_active[k] == 1 ?'active': ''"
              @click="choose_nav_one(v,k)"
            >{{toUp(v)}}盘
              <el-button class="icon" type="danger"
                         @click="delete_nav_one(v,$event)"
                         icon="el-icon-delete" circle size="mini"></el-button>
            </div>
          </div>
          <div class="add" @click="add_nav()">添加盘口</div>
          <div class="save" @click="save()">保存修改</div>
        </nav>
        <section>
          <!--时时彩table群-->
          <div class="" v-if="which_type_one == 'ssc'">
            <!-- 统一 流水、返点table-->
            <table class="table table-hover table-bordered table-striped text-center">
              <thead class="bg-warning">
              <tr >
                <td width="180">级别</td>
                <td>返点</td>
                <td>流水</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(v,k) in odds_detail_list" v-if="k<4">
                <td>{{v.mark_b}}</td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].A">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].B">
                </td>
              </tr>
              </tbody>
            </table>
            <!--球序table-->
            <table class="table table-hover table-bordered text-center table-striped">
              <thead class="bg-primary">
              <tr >
                <td width="60">球序</td>
                <td>特码0-9</td>
                <td>大</td>
                <td>小</td>
                <td>单</td>
                <td>双</td>
                <td>单注最小限额</td>
                <td>单注最大限额</td>
                <td>单期限额</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(v,k) in odds_detail_list" v-if='k>=4 && k<9'>
                <td >
                  {{v.mark_b}}
                </td>
                <td style="font-size:12px;">
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].A" @change="change_1_9_digit(odds_detail_list[k].A,k)">
                </td>

                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].K">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].L">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].M">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].N">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].bet_limit.order_limit_min">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].bet_limit.order_limit_max">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].bet_limit.expect_limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="list[k].dec_odds[0].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="list[k].dec_odds[0].dec_odds">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="list[k].dec_odds[1].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="list[k].dec_odds[1].dec_odds">
                </td>
              </tr>
              </tbody>
            </table>
            <!--总和、龙虎table-->
            <table class="table table-bordered table-hover table-striped text-center">
              <thead class="bg-danger">
              <tr>
                <td width="100">总和、龙虎</td>
                <td>总和单</td>
                <td>总和双</td>
                <td>总和大</td>
                <td>总和小</td>
                <td>总和龙</td>
                <td>总和虎</td>
                <td>和</td>
                <td>单注最小限额</td>
                <td>单注最大限额</td>
                <td>单期限额</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(v,k) in odds_detail_list" v-if='k==9'>
                <td >
                  {{v.mark_b}}
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].A">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].B">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].C">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].D">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].E">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].F">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].G">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].bet_limit.order_limit_min">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].bet_limit.order_limit_max">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].bet_limit.expect_limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="list[k].dec_odds[0].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="list[k].dec_odds[0].dec_odds">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="list[k].dec_odds[1].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="list[k].dec_odds[1].dec_odds">
                </td>
              </tr>
              </tbody>
            </table>
            <!--豹子、顺子table-->
            <table class="table table-hover table-bordered table-striped text-center">
              <thead class="bg-success">
              <tr >
                <td width="100">总和、龙虎</td>
                <td>豹子</td>
                <td>顺子</td>
                <td>对子</td>
                <td>半顺</td>
                <td>杂六</td>
                <td>单注最小限额</td>
                <td>单注最大限额</td>
                <td>单期限额</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(v,k) in odds_detail_list" v-if='k>9'>
                <td >
                  {{v.mark_b}}
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].A">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].B">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].C">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].D">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].E">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].bet_limit.order_limit_min">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].bet_limit.order_limit_max">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].bet_limit.expect_limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="list[k].dec_odds[0].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="list[k].dec_odds[0].dec_odds">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="list[k].dec_odds[1].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="list[k].dec_odds[1].dec_odds">
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--pk10 table群-->
          <div class="table_box" v-else-if="which_type_one == 'pk10'">
            <!-- 统一 流水、返点table-->
            <table class="table table-hover table-bordered table-striped text-center">
              <thead class="bg-warning">
              <tr >
                <td width="180">级别</td>
                <td>返点</td>
                <td>流水</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(v,k) in odds_detail_list" v-if="k<4">
                <td>{{v.mark_b}}</td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].A">
                </td>
                <td>
                  <input type="text" class="form-control text-center" v-model="odds_detail_list[k].B">
                </td>
              </tr>
              </tbody>
            </table>
            <!--球序table-->
            <table class="table table-hovor table-bordered table-striped text-center">
              <thead class="bg-primary">
              <tr>
                <td width="180">特码/球序</td>
                <td>特码1-10</td>
                <td>大小单双</td>
                <td>龙</td>
                <td>虎</td>
                <td>单注最小限额</td>
                <td>单注最大限额</td>
                <td>单期限额</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(v,k) in odds_detail_list" v-if='k>=4 && k<14' class="text-center">
                <td >
                  {{v.mark_b}}
                </td>
                <td>
                  <input type="text"   class="text-center form-control" v-model="odds_detail_list[k].A" @change="change_1_9_digit(odds_detail_list[k].A,k)">
                </td>
                <td>
                  <input type="text"  class="text-center form-control" v-model="odds_detail_list[k].K" @change="change_1_9_half(odds_detail_list[k].K,k)">
                </td>
                <td>
                  <input type="text"  class="text-center form-control" v-model="odds_detail_list[k].O" v-bind:disabled="odds_detail_list[k].O == 0.0000 || !odds_detail_list[k].O">
                </td>
                <td>
                  <input type="text"  class="text-center form-control" v-model="odds_detail_list[k].P" v-bind:disabled="odds_detail_list[k].P == 0.0000 || !odds_detail_list[k].P">
                </td>

                <td>
                  <input type="text"    class="text-center form-control" v-model="odds_detail_list[k].bet_limit.order_limit_min">
                </td>
                <td>
                  <input type="text"   class="text-center form-control"  v-model="odds_detail_list[k].bet_limit.order_limit_max">
                </td>
                <td>
                  <input type="text"    class="text-center form-control" v-model="odds_detail_list[k].bet_limit.expect_limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[k].dec_odds[0].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[k].dec_odds[0].dec_odds">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[k].dec_odds[1].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[k].dec_odds[1].dec_odds">
                </td>
              </tr>
              </tbody>
            </table>
            <!--冠军和号码-->
            <table class="table table-hovor table-bordered table-striped text-center">
              <thead class="bg-danger">
              <tr >
                <td width="180">冠亚军和-号码</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
                <td>10</td>
                <td>11</td>
                <td>12</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(v,k) in odds_detail_list" v-if='k==14'>
                <td >
                  {{v.mark_b}}
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[14].A">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[14].B">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[14].C">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[14].D">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[14].E">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[14].F">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[14].G">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[14].H">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[14].I">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[14].J">
                </td>
              </tr>
              </tbody>
            </table>
            <!--冠军和号码-->
            <table class="table table-hovor table-bordered table-striped text-center">
              <thead class="bg-danger">
              <tr >
                <td width="180">冠亚军和-号码</td>
                <td>13</td>
                <td>14</td>
                <td>15</td>
                <td>16</td>
                <td>17</td>
                <td>18</td>
                <td>19</td>
                <td>单注最小限额</td>
                <td>单注最大限额</td>
                <td>单期限额</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(v,k) in odds_detail_list" v-if='k==14'>
                <td >
                  {{v.mark_b}}
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[14].K">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[14].L">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[14].M">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[14].N">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[14].O">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[14].P">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[14].Q">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[14].bet_limit.order_limit_min">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[14].bet_limit.order_limit_max">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[14].bet_limit.expect_limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[k].dec_odds[0].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[k].dec_odds[0].dec_odds">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[k].dec_odds[1].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[k].dec_odds[1].dec_odds">
                </td>
              </tr>
              </tbody>
            </table>
            <!--冠军和号码 大小 单双-->
            <table class="table table-hovor table-bordered table-striped text-center">
              <thead class="bg-danger">
              <tr >
                <td >冠亚军和-号码</td>
                <td>大小单双</td>
                <td>单注最小限额</td>
                <td>单注最大限额</td>
                <td>单期限额</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(v,k) in odds_detail_list" v-if='k==15'>
                <td >
                  {{v.mark_b}}
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[k].A" @change="change_sum(odds_detail_list[k].A,k)">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[k].bet_limit.order_limit_min">

                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[k].bet_limit.order_limit_max">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[k].bet_limit.expect_limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[k].dec_odds[0].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[k].dec_odds[0].dec_odds">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[k].dec_odds[1].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[k].dec_odds[1].dec_odds">
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--PC蛋蛋 table群-->
          <div class="table_box" v-else-if="which_type_one == 'egg'">
            <!-- 统一 流水、返点table-->
            <table class="table table-hovor table-bordered table-striped text-center">
              <thead class="bg-warning">
              <tr class="h4">
                <td>级别</td>
                <td>返点</td>
                <td>流水</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(v,k) in odds_detail_list" v-if=' k < 4'>
                <td>
                  {{v.mark_b}}
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[k].e1">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[k].e2">
                </td>
              </tr>
              </tbody>
            </table>
            <!--球序特码 0-9 table-->
            <table class="table table-hovor table-bordered table-striped text-center" style="margin-bottom:0;">
              <thead class="bg-primary">
              <tr>
                <td width="80">特码/球序</td>
                <td v-for="(v,k,index) in odds_detail_list[4]" v-if='index<10'>特码{{index}}</td>

              </tr>
              </thead>
              <tbody>
              <tr>
                <td>赔率</td>
                <td v-for="(v,k,index) in odds_detail_list[4]" v-if='index<10'>
                  <input type="text" class="form-control" v-model="odds_detail_list[4]['e' + (index+1)]">
                </td>

              </tr>
              </tbody>
            </table>
            <!--球序特码 10-19 table-->
            <table style="margin-bottom: 0" class="table table-hover table-bordered table-striped text-center">
              <thead class="bg-primary">
              <tr >
                <td width="80">特码/球序</td>
                <td v-for="(v,k,index) in odds_detail_list[4]" v-if='index>=10&&index<20'>特码{{index}}</td>

              </tr>
              </thead>
              <tbody>
              <tr>
                <td>赔率</td>
                <td v-for="(v,k,index) in odds_detail_list[4]" v-if='index>=10&&index<20'>
                  <input type="text" class="form-control" v-model="odds_detail_list[4]['e' + (index+1)]">
                </td>
              </tr>
              </tbody>
            </table>
            <!--球序特码 20-27 及下单限额 table-->
            <table class="table table-hovor table-bordered table-striped text-center">
              <thead class="bg-primary">
              <tr >
                <td width="80">特码/球序</td>
                <td v-for="(v,k,index) in odds_detail_list[4]" v-if='index>=20&&index<28'>特码{{index}}</td>
                <td>单注最小限额</td>
                <td>单注最大限额</td>
                <td>单期限额</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>赔率</td>
                <td v-for="(v,k,index) in odds_detail_list[4]" v-if='index>=20&&index<28'>
                  <input type="text" class="form-control" v-model="odds_detail_list[4]['e' + (index+1)]">

                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[4].bet_limit.order_limit_min">

                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[4].bet_limit.order_limit_max">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[4].bet_limit.expect_limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[4].dec_odds[0].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[4].dec_odds[0].dec_odds">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[4].dec_odds[1].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[4].dec_odds[1].dec_odds">
                </td>
              </tr>
              </tbody>
            </table>
            <!--单双 table -->
            <table class="table table-hovor table-bordered table-striped text-center">
              <thead class="bg-primary">
              <tr >
                <td width="80">特码/球序</td>
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
                <td>单注最小限额</td>
                <td>单注最大限额</td>
                <td>单期限额</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>赔率</td>
                <td v-for="(v,k,index) in odds_detail_list[5]" v-if='index<10'>
                  <input type="text" class="form-control" v-model="odds_detail_list[5]['e' + (index+1)]">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[7]['e1']">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[5].bet_limit.order_limit_min">

                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[5].bet_limit.order_limit_max">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[5].bet_limit.expect_limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[5].dec_odds[0].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[5].dec_odds[0].dec_odds">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[5].dec_odds[1].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[5].dec_odds[1].dec_odds">
                </td>
              </tr>
              </tbody>
            </table>
            <!--波色  table-->
            <table class="table table-hovor table-bordered table-striped text-center">
              <thead class="bg-primary">
              <tr >
                <td width="150">波色</td>
                <td>红波</td>
                <td>绿波</td>
                <td>蓝波</td>
                <td>单注最小限额</td>
                <td>单注最大限额</td>
                <td>单期限额</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>赔率</td>
                <td v-for="(v,k,index) in odds_detail_list[6]" v-if='index<3'>
                  <input type="text" class="form-control" v-model="odds_detail_list[6]['e' + (index+1)]">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[6].bet_limit.order_limit_min">

                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[6].bet_limit.order_limit_max">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[6].bet_limit.expect_limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[6].dec_odds[0].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[6].dec_odds[0].dec_odds">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[6].dec_odds[1].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[6].dec_odds[1].dec_odds">
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--加拿大28 table 群-->
          <div class="table_box" v-else-if="which_type_one == 'cake'">
            <!-- 统一 流水、返点table-->
            <table class="table table-hovor table-bordered table-striped text-center">
              <thead class="bg-warning">
              <tr class="h4">
                <td>级别</td>
                <td>返点</td>
                <td>流水</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(v,k) in odds_detail_list" v-if=' k < 4'>
                <td>
                  {{v.mark_b}}
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[k].e1">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[k].e2">
                </td>
              </tr>
              </tbody>
            </table>
            <!--0-9-->
            <table class="table table-hovor table-bordered table-striped text-center" style="margin-bottom:0;">
              <thead class="bg-primary">
              <tr>
                <td width="150">选项/球序</td>
                <td v-for="(v,k,index) in odds_detail_list[4]" v-if='index<10'>特码{{index}}</td>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>赔率</td>
                <td v-for="(v,k,index) in odds_detail_list[4]" v-if='index<10'>
                  <input type="text" class="form-control" v-model="odds_detail_list[4]['e' + (index+1)]">
                </td>
              </tr>
              </tbody>


            </table>
            <!--10-19-->
            <table class="table table-hovor table-bordered table-striped text-center" style="margin-bottom:0;">
              <thead class="bg-primary">
              <tr>
                <td width="80">选项/球序</td>
                <td v-for="(v,k,index) in odds_detail_list[4]" v-if='index<20 && index>=10'>特码{{index}}</td>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>赔率</td>
                <td v-for="(v,k,index) in odds_detail_list[4]" v-if='index<20 && index>=10'>
                  <input type="text" class="form-control" v-model="odds_detail_list[4]['e' + (index+1)]">
                </td>
              </tr>
              </tbody>
            </table>
            <!--20-27  下单限额-->
            <table class="table table-hovor table-bordered table-striped text-center">
              <thead class="bg-primary">
              <tr >
                <td width="80">选项/球序</td>
                <td v-for="(v,k,index) in odds_detail_list[4]" v-if='index>=20 && index<28'>特码{{index}}</td>
                <td>单注最小限额</td>
                <td>单注最大限额</td>
                <td>单期限额</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>赔率</td>
                <td v-for="(v,k,index) in odds_detail_list[4]" v-if='index>=20 && index<28'>
                  <input type="text" class="form-control" v-model="odds_detail_list[4]['e' + (index+1)]">

                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[4].bet_limit.order_limit_min">

                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[4].bet_limit.order_limit_max">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[4].bet_limit.expect_limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[4].dec_odds[0].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[4].dec_odds[0].dec_odds">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[4].dec_odds[1].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[4].dec_odds[1].dec_odds">
                </td>
              </tr>
              </tbody>
            </table>
            <!--大小  单双  豹子-->
            <table class="table table-hovor table-bordered table-striped text-center">
              <thead class="bg-primary">
              <tr >
                <td width="80">选项/球序</td>
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
                <td>单注最小限额</td>
                <td>单注最大限额</td>
                <td>单期限额</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>赔率</td>
                <td v-for="(v,k,index) in odds_detail_list[5]" v-if='index<10'>
                  <input type="text" class="form-control" v-model="odds_detail_list[5]['e' + (index+1)]">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[7]['e1']">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[5].bet_limit.order_limit_min">

                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[5].bet_limit.order_limit_max">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[5].bet_limit.expect_limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[5].dec_odds[0].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[5].dec_odds[0].dec_odds">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[5].dec_odds[1].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[5].dec_odds[1].dec_odds">
                </td>
              </tr>
              </tbody>
            </table>
            <!--波色-->
            <table class="table table-hovor table-bordered table-striped text-center">
              <thead class="bg-primary">
              <tr >
                <td width="80">波色</td>
                <td>红波</td>
                <td>绿波</td>
                <td>蓝波</td>
                <td>单注最小限额</td>
                <td>单注最大限额</td>
                <td>单期限额</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
                <td colspan="2" v-if="$store.state.son_off">金额/跌倍</td>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>赔率</td>
                <td v-for="(v,k,index) in odds_detail_list[6]" v-if='index<3'>
                  <input type="text" class="form-control" v-model="odds_detail_list[6]['e' + (index+1)]">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[6].bet_limit.order_limit_min">

                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[6].bet_limit.order_limit_max">
                </td>
                <td>
                  <input type="text" class="form-control" v-model="odds_detail_list[6].bet_limit.expect_limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[6].dec_odds[0].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[6].dec_odds[0].dec_odds">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[6].dec_odds[1].limit">
                </td>
                <td v-if="$store.state.son_off">
                  <input type="text" class="form-control text-center"
                         v-model="odds_detail_list[5].dec_odds[1].dec_odds">
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>

</template>

<script>
    export default {
        name: "odds_fs",
        data() {
          return{
              type_list:['重庆时时彩','北京pk10','PC蛋蛋','加拿大28'],
              type_english_list:['ssc','pk10','egg','cake'],
              which_nav_one:'a',//选中的哪一个盘口
              which_type_one:'ssc',//选中的哪一个彩种
              all_odds:[],//所有数据
              nav_list:[],//对应的每一个盘口
              nav_active:[],//盘口选中数组
              type_on:[1,0,0,0],//选中的彩种数组
              odds_detail_list:[
                {
                  "id": 1,
                  "mark_a": "返点",
                  "mark_b": "总代",
                  "bet_limit": null,
                  "dec_odds": null,
                  "A": "0.0010",
                  "B": "0.0010",
                  "C": "0.0000",
                  "D": "0.0000",
                  "E": "0.0000",
                  "F": "0.0000",
                  "G": "0.0000",
                  "H": "0.0000",
                  "I": "0.0000",
                  "J": "0.0000",
                  "K": null,
                  "L": null,
                  "M": null,
                  "N": null,
                  "O": null
                },
                {
                  "id": 2,
                  "mark_a": "返点",
                  "mark_b": "分代",
                  "bet_limit": null,
                  "dec_odds": null,
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
                  "K": null,
                  "L": null,
                  "M": null,
                  "N": null,
                  "O": null
                },
                {
                  "id": 3,
                  "mark_a": "返点",
                  "mark_b": "推广",
                  "bet_limit": null,
                  "dec_odds": null,
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
                  "K": null,
                  "L": null,
                  "M": null,
                  "N": null,
                  "O": null
                },
                {
                  "id": 4,
                  "mark_a": "返点",
                  "mark_b": "会员",
                  "bet_limit": null,
                  "dec_odds": null,
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
                  "K": null,
                  "L": null,
                  "M": null,
                  "N": null,
                  "O": null
                },
                {
                  "id": 5,
                  "mark_a": "特码",
                  "mark_b": "第一球",
                  "bet_limit": {
                    "order_limit_min": 10,
                    "order_limit_max": 10000,
                    "expect_limit": 20000
                  },
                  "dec_odds": [
                    {
                      "limit": 1000,
                      "dec_odds": 0.1
                    },
                    {
                      "limit": 2000,
                      "dec_odds": 0.2
                    }
                  ],
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
                  "O": null
                },
                {
                  "id": 6,
                  "mark_a": "特码",
                  "mark_b": "第二球",
                  "bet_limit": {
                    "order_limit_min": 10,
                    "order_limit_max": 10000,
                    "expect_limit": 20000
                  },
                  "dec_odds": [
                    {
                      "limit": 1000,
                      "dec_odds": 0.1
                    },
                    {
                      "limit": 2000,
                      "dec_odds": 0.2
                    }
                  ],
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
                  "O": null
                },
                {
                  "id": 7,
                  "mark_a": "特码",
                  "mark_b": "第三球",
                  "bet_limit": {
                    "order_limit_min": 10,
                    "order_limit_max": 10000,
                    "expect_limit": 20000
                  },
                  "dec_odds": [
                    {
                      "limit": 1000,
                      "dec_odds": 0.1
                    },
                    {
                      "limit": 2000,
                      "dec_odds": 0.2
                    }
                  ],
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
                  "L": "2.9430",
                  "M": "1.9430",
                  "N": "1.9430",
                  "O": null
                },
                {
                  "id": 8,
                  "mark_a": "特码",
                  "mark_b": "第四球",
                  "bet_limit": {
                    "order_limit_min": 10,
                    "order_limit_max": 10000,
                    "expect_limit": 20000
                  },
                  "dec_odds": [
                    {
                      "limit": 1000,
                      "dec_odds": 0.1
                    },
                    {
                      "limit": 2000,
                      "dec_odds": 0.2
                    }
                  ],
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
                  "O": null
                },
                {
                  "id": 9,
                  "mark_a": "特码",
                  "mark_b": "第五球",
                  "bet_limit": {
                    "order_limit_min": 10,
                    "order_limit_max": 10000,
                    "expect_limit": 20000
                  },
                  "dec_odds": [
                    {
                      "limit": 1000,
                      "dec_odds": 0.1
                    },
                    {
                      "limit": 2000,
                      "dec_odds": 0.2
                    }
                  ],
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
                  "O": null
                },
                {
                  "id": 10,
                  "mark_a": "两面",
                  "mark_b": "总和、龙虎",
                  "bet_limit": {
                    "order_limit_min": 10,
                    "order_limit_max": 10000,
                    "expect_limit": 20000
                  },
                  "dec_odds": [
                    {
                      "limit": 1000,
                      "dec_odds": 0.1
                    },
                    {
                      "limit": 2000,
                      "dec_odds": 0.2
                    }
                  ],
                  "A": "1.9430",
                  "B": "1.9430",
                  "C": "1.9430",
                  "D": "1.9430",
                  "E": "1.9430",
                  "F": "1.9430",
                  "G": "9.6700",
                  "H": null,
                  "I": null,
                  "J": null,
                  "K": null,
                  "L": null,
                  "M": null,
                  "N": null,
                  "O": null
                },
                {
                  "id": 11,
                  "mark_a": "两面",
                  "mark_b": "前三",
                  "bet_limit": {
                    "order_limit_min": 10,
                    "order_limit_max": 10000,
                    "expect_limit": 20000
                  },
                  "dec_odds": [
                    {
                      "limit": 1000,
                      "dec_odds": 0.1
                    },
                    {
                      "limit": 2000,
                      "dec_odds": 0.2
                    }
                  ],
                  "A": "96.7000",
                  "B": "16.1170",
                  "C": "3.5810",
                  "D": "2.6860",
                  "E": "3.2230",
                  "F": null,
                  "G": null,
                  "H": null,
                  "I": null,
                  "J": null,
                  "K": null,
                  "L": null,
                  "M": null,
                  "N": null,
                  "O": null
                },
                {
                  "id": 12,
                  "mark_a": "两面",
                  "mark_b": "中三",
                  "bet_limit": {
                    "order_limit_min": 10,
                    "order_limit_max": 10000,
                    "expect_limit": 20000
                  },
                  "dec_odds": [
                    {
                      "limit": 1000,
                      "dec_odds": 0.1
                    },
                    {
                      "limit": 2000,
                      "dec_odds": 0.2
                    }
                  ],
                  "A": "96.7000",
                  "B": "16.1170",
                  "C": "3.5810",
                  "D": "2.6860",
                  "E": "3.2230",
                  "F": null,
                  "G": null,
                  "H": null,
                  "I": null,
                  "J": null,
                  "K": null,
                  "L": null,
                  "M": null,
                  "N": null,
                  "O": null
                },
                {
                  "id": 13,
                  "mark_a": "两面",
                  "mark_b": "后三",
                  "bet_limit": {
                    "order_limit_min": 10,
                    "order_limit_max": 10000,
                    "expect_limit": 20000
                  },
                  "dec_odds": [
                    {
                      "limit": 1000,
                      "dec_odds": 0.1
                    },
                    {
                      "limit": 2000,
                      "dec_odds": 0.2
                    }
                  ],
                  "A": "96.7000",
                  "B": "16.1170",
                  "C": "3.5810",
                  "D": "2.6860",
                  "E": "3.2230",
                  "F": null,
                  "G": null,
                  "H": null,
                  "I": null,
                  "J": null,
                  "K": null,
                  "L": null,
                  "M": null,
                  "N": null,
                  "O": null
                }
              ],//赔率的各个详情
          }
        },
        methods:{
          //获取登录账号所拥有的彩种及初始化数据
          get_type:function(){
            if(window.sessionStorage.admin_id != 1){
              this.$http.get(this.api + '/admin/lotteryList/'+window.sessionStorage.admin_id).then(function(res){
                // console.log(res);
                if(res.status == 200){
                  this.type_english_list = res.data.data.list;
                  for(let i=0;i<this.type_english_list.length;i++){
                    if(this.type_english_list[i] == 'cqssc'){
                      this.type_english_list[i] = 'ssc';
                      this.type_list[i]='重庆时时彩';
                    }else if(this.type_english_list[i] == "bjpk10"){
                      this.type_english_list[i] = 'pk10';
                      this.type_list[i]='北京pk10';
                    }else if(this.type_english_list[i] = 'pcegg'){
                      this.type_english_list[i] = 'egg';
                      this.type_list[i]='PC蛋蛋';
                    }else if(this.type_english_list[i] == 'cakeno'){
                      this.type_english_list[i] = 'cake';
                      this.type_list[i]='加拿大28';
                    }
                  }
                  this.which_type_one = this.type_english_list[0];
                  this.get_all_data();
                }
              })
            }else{
             this.get_all_data();
            }
          },
          //首次进入初始化数据 默认重庆时时彩
          get_all_data:function(){
            this.$http.get(this.api + '/admin/'+ this.which_type_one + '/odds').then(function(res){
              console.log(res);
              if(res.status == 200){
                this.all_odds = res.data.data.odds_list;
                this.odds_detail_list =this.all_odds[0].odds;
                this.get_nav_list();
                this.nav_active[0] = 1;
                // console.log(this.nav_active);
              }
            })
          },
          //获取各个盘口
          get_nav_list:function(){
            this.nav_list=[];
            this.nav_active = [];
            for(let i=0;i<this.all_odds.length;i++){
              this.nav_list.push(this.all_odds[i].name);
              this.nav_active.push(0);
            }
          },
          //选择哪一个彩种
          choose_type_one:function(i){
            this.type_on=[0,0,0,0];
            this.type_on[i]=1;
            this.which_type_one = this.type_english_list[i];
            this.get_all_data();
          },
          //选择盘口
          choose_nav_one:function(v,i){
            this.which_nav_one = v;
            this.get_nav_list();
            this.nav_active[i] = 1;
            this.odds_detail_list = this.all_odds[i].odds;
          },
          //删除盘口
          delete_nav_one:function(v,e){
            let event = e || window.event;
            event.cancelBubble = true;
            this.$http.delete(this.api + '/admin/'+ this.which_type_one+ '/odds/' +this.which_type_one+'_'+v).then(function(res){
              console.log(res);
              if(res.status == 200){
                this.$message.error('删除成功');
                this.get_all_data();
                return;
              }
            })
          },
          //  添加盘口
          add_nav:function(){
            this.$http.post(this.api + '/admin/' + this.which_type_one + '/odds',{
              odds:this.odds_detail_list
            }).then(function(res){
              console.log(res);
              if(res.status == 200){
                this.$message({
                  message:res.data.msg,
                  center:true,
                  type:'success',
                });
                this.get_all_data();
                return;
              }else{
                this.$message({
                  message:'添加失败',
                  center:true,
                  type:'danger',
                });
              }
            })
          },
          //  保存
          save:function(){
            this.$http.put(this.api + '/admin/'+this.which_type_one+'/odds/'+this.which_type_one+'_'+this.which_nav_one,{
              odds:this.odds_detail_list
            }).then(function(res){
              console.log(res);
              if(res.status == 200){
                this.$message(
                  {
                    message:res.data.msg,
                    center:true,
                    type:'success',
                  });
                this.get_all_data();
              }else{
                this.$message.error(res.data.msg);
              }
            })
          },
          //  特碼5個球中 每个球，每个码的统一赔率
          change_1_9_digit:function(val,k){
            // console.log(val);
            let array = ['A','B','C','D','E','F','G','H','I','J'];
            for(let i=0;i<array.length;i++){
              this.odds_detail_list[k][array[i]] = val;
            }
          },
          change_1_9_half:function(val,k){
            // console.log(val);
            let array = ['K','L','M','N'];
            for(let i=0;i<array.length;i++){
              this.odds_detail_list[k][array[i]] = val;
            }
          },
          change_sum:function(val,k){
            // console.log(val);
            let array = ['A','B','C','D'];
            for(let i=0;i<array.length;i++){
              this.odds_detail_list[k][array[i]] = val;
            }
          },
        },
        created(){
          this.get_type();
        }
    }
</script>



<style scoped>
  h3{
    margin:20px 0 10px;
    padding-bottom:10px;
    font-size: 28px;
    border-bottom: 1px dashed #e5e5e5;
  }
  .type_name{
    display:-webkit-flex;
    display:flex;
    /*justify-content: space-between;*/
    padding-bottom: 10px;
    border-bottom: 1px dashed #e5e5e5;
  }
  .type_name li{
    padding-right: 20px;
  }
  div.section{
    display:-webkit-flex;
    display:flex;
  }
  div.section nav{
    width:10%;
    text-align: center;
    font-size: 16px;
  }
  div.section nav div.list{
    border:1px solid #e5e5e5;
    border-radius:5px;
  }
  div.section nav div.list div{
    position:relative;
    height:50px;
    line-height: 50px;
    border-bottom: 1px solid #e5e5e5;
    cursor:pointer;
    color:#337AB7;
  }
  div.section nav div.list div.active{
    background:#337AB7;
    color:#f2f2f2;
  }
  div.section nav div.list div .icon{
    position:absolute;
    top:5px;
    right:8px;
  }
  div.section nav div.list div:last-child{
    border-bottom: 0;
  }
  div.section nav div.add,div.section nav div.save{
    height:50px;
    line-height: 50px;
    cursor:pointer;
    border-radius: 5px;
    margin:20px 0 0;
    background:#51A351;
    color:#f2f2f2;
  }
  div.section nav div.save{
    background:#5BC0DE;
  }
  div.section section{
    width:88%;
    margin-left: 2%;
  }
  .table{
    font-size: 14px;
  }
  .table thead td{
    /*padding:10px 0;*/
    font-size: 16px;
    font-weight: 600;
  }
</style>
