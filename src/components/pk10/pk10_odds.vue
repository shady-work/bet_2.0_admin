<template>
    <div id='pk10_odds'>
        <h3 class="ml10">北京赛车PK拾-系统盘口设定</h3>
        <div class="row">
            <div class="col-md-2">
              <ul>
                <li
                  v-for="(v,k) in final_list" :class="active_array[k]?'text-danger':''"
                  @click='choose_one(v,k)'
                  class="pull-left text-center pointer mt5"
                  style="margin-left: 3px;width: 210px;height: 40px;line-height: 40px;box-sizing: border-box;border: 1px solid #e5e5e5;position:relative;"
                >
                  {{toUp(v)}}盘
                  <el-button type="danger" icon="el-icon-delete" circle size="mini"
                             style="padding: 3px;position: absolute;top:0;right:0;" @click='delete_one(v,$event)'></el-button>
                  <!--<span style="position:absolute;right:0;top:0;width: 15px;height:15px;line-height:15px;font-size:12px;border-radius: 50%;background:#000;color: #fff;">X</span>-->
                </li>
                <li
                  @click='add_one()'
                  class="pull-left text-center pointer mt5 color-white"
                  style="background: #67C23A;margin-left: 3px;width: 210px;height: 40px;line-height: 40px;box-sizing: border-box;border: 1px solid #e5e5e5;position:relative;"
                >
                  添加盘口
                </li>
              </ul>
              <div class="clear"></div>
            </div>
            <div class="col-md-10">
                <table class="table table-hovor table-bordered table-striped text-center">
                    <thead class="bg-primary">
                    <tr >
                        <td colspan="3">{{toUp(which_one)}}盘
                            <button class="pull-right save  btn btn-info" @click='edit_one()'>保存修改</button>
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
                    <tr v-for="(v,k) in list" v-if=' k < 4'>
                        <td>
                            {{v.mark_b}}
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[k].A">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[k].B">
                        </td>
                    </tr>
                    </tbody>
                </table>

                <table class="table table-hovor table-bordered table-striped text-center">
                    <thead class="bg-primary">
                    <tr style="vertical-align:middle;">
                        <td width="80">特码/球序</td>
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
                    <tr v-for="(v,k) in list" v-if='k>=4 && k<14' class="text-center">
                        <td >
                            {{v.mark_b}}
                        </td>
                        <td>
                            <input type="text"   class="text-center form-control" v-model="list[k].A" @change="change_1_9_digit(list[k].A,k)">
                        </td>
                        <td>
                            <input type="text"  class="text-center form-control" v-model="list[k].K" @change="change_1_9_half(list[k].K,k)">
                        </td>
                        <td>
                            <input type="text"  class="text-center form-control" v-model="list[k].O" v-bind:disabled="list[k].O == 0.0000 || !list[k].O">
                        </td>
                        <td>
                            <input type="text"  class="text-center form-control" v-model="list[k].P" v-bind:disabled="list[k].P == 0.0000 || !list[k].P">
                        </td>


                        <td>
                            <input type="text"    class="text-center form-control" v-model="list[k].bet_limit.order_limit_min">
                        </td>
                        <td>
                            <input type="text"   class="text-center form-control"  v-model="list[k].bet_limit.order_limit_max">
                        </td>
                        <td>
                            <input type="text"    class="text-center form-control" v-model="list[k].bet_limit.expect_limit">
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



                <table class="table table-hovor table-bordered table-striped text-center">
                    <thead class="bg-danger">
                    <tr >
                        <td width="100">冠亚军和-号码</td>
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
                    <tr v-for="(v,k) in list" v-if='k==14'>
                        <td >
                            {{v.mark_b}}
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[14].A">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[14].B">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[14].C">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[14].D">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[14].E">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[14].F">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[14].G">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[14].H">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[14].I">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[14].J">
                        </td>
                    </tr>
                    </tbody>
                </table>

                <table class="table table-hovor table-bordered table-striped text-center">
                    <thead class="bg-danger">
                    <tr >
                        <td width="100">冠亚军和-号码</td>
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
                    <tr v-for="(v,k) in list" v-if='k==14'>
                        <td >
                            {{v.mark_b}}
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[14].K">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[14].L">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[14].M">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[14].N">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[14].O">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[14].P">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[14].Q">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[14].bet_limit.order_limit_min">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[14].bet_limit.order_limit_max">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[14].bet_limit.expect_limit">
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
                    <tr v-for="(v,k) in list" v-if='k==15'>
                        <td >
                            {{v.mark_b}}
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[k].A" @change="change_sum(list[k].A,k)">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[k].bet_limit.order_limit_min">

                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[k].bet_limit.order_limit_max">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[k].bet_limit.expect_limit">
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

                <br>
                <br>
                <button class="center-block save1  btn btn-info" @click='edit_one()'>保存修改</button>
                <br>
                <br>
                <br>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "pk10_odds",
        data() {
            return {
                which_one: "a",
                try_how_much_list: [
                    "a",
                    "b",
                    "c",
                    "d",
                    "e",
                    "f",
                    "g",
                    "h",
                    "i",
                    "j",
                    "k",
                    "l",
                    "m",
                    "n"
                ],
                active_array: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                final_list: [],
                end: 0,
                all_odds:[],
                list:[
                    {
                        "name": "a",
                        "table": "pk10_a",
                        "odds": [
                            {
                                "id": 1,
                                "mark_a": "返点",
                                "mark_b": "总代",
                                "bet_limit": null,
                                "dec_odds": null,
                                "A": "0.0010",
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
                                "id": 2,
                                "mark_a": "返点",
                                "mark_b": "分代",
                                "bet_limit": null,
                                "dec_odds": null,
                                "A": "0.0010",
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
                                "bet_limit": null,
                                "dec_odds": null,
                                "A": "0.0010",
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
                                "bet_limit": null,
                                "dec_odds": null,
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
                                "O": "1.9430",
                                "P": "1.9430",
                                "Q": null
                            },
                            {
                                "id": 6,
                                "mark_a": "特码",
                                "mark_b": "亚军",
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
                                "O": "1.9430",
                                "P": "1.9430",
                                "Q": null
                            },
                            {
                                "id": 7,
                                "mark_a": "特码",
                                "mark_b": "第三名",
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
                                "O": "1.9430",
                                "P": "1.9430",
                                "Q": null
                            },
                            {
                                "id": 8,
                                "mark_a": "特码",
                                "mark_b": "第四名",
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
                                "O": "1.9430",
                                "P": "1.9430",
                                "Q": null
                            },
                            {
                                "id": 9,
                                "mark_a": "特码",
                                "mark_b": "第五名",
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
                                "O": "1.9430",
                                "P": "1.9430",
                                "Q": null
                            },
                            {
                                "id": 10,
                                "mark_a": "特码",
                                "mark_b": "第六名",
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
                                "O": null,
                                "P": null,
                                "Q": null
                            },
                            {
                                "id": 11,
                                "mark_a": "特码",
                                "mark_b": "第七名",
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
                                "O": null,
                                "P": null,
                                "Q": null
                            },
                            {
                                "id": 12,
                                "mark_a": "特码",
                                "mark_b": "第八名",
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
                                "O": null,
                                "P": null,
                                "Q": null
                            },
                            {
                                "id": 13,
                                "mark_a": "特码",
                                "mark_b": "第九名",
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
                                "O": null,
                                "P": null,
                                "Q": null
                            },
                            {
                                "id": 14,
                                "mark_a": "特码",
                                "mark_b": "第十名",
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
                                "O": null,
                                "P": null,
                                "Q": null
                            },
                            {
                                "id": 15,
                                "mark_a": "特码",
                                "mark_b": "冠亚军和",
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
                        ],
                        "custom_odds": null
                    },
                    {
                        "name": "b",
                        "table": "pk10_b",
                        "odds": [
                            {
                                "id": 1,
                                "mark_a": "返点",
                                "mark_b": "总代",
                                "bet_limit": null,
                                "dec_odds": null,
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
                                "bet_limit": null,
                                "dec_odds": null,
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
                                "bet_limit": null,
                                "dec_odds": null,
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
                                "bet_limit": null,
                                "dec_odds": null,
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
                                "O": "1.9430",
                                "P": "1.9430",
                                "Q": null
                            },
                            {
                                "id": 6,
                                "mark_a": "特码",
                                "mark_b": "亚军",
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
                                "O": "1.9430",
                                "P": "1.9430",
                                "Q": null
                            },
                            {
                                "id": 7,
                                "mark_a": "特码",
                                "mark_b": "第三名",
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
                                "O": "1.9430",
                                "P": "1.9430",
                                "Q": null
                            },
                            {
                                "id": 8,
                                "mark_a": "特码",
                                "mark_b": "第四名",
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
                                "O": "1.9430",
                                "P": "1.9430",
                                "Q": null
                            },
                            {
                                "id": 9,
                                "mark_a": "特码",
                                "mark_b": "第五名",
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
                                "O": "1.9430",
                                "P": "1.9430",
                                "Q": null
                            },
                            {
                                "id": 10,
                                "mark_a": "特码",
                                "mark_b": "第六名",
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
                                "O": null,
                                "P": null,
                                "Q": null
                            },
                            {
                                "id": 11,
                                "mark_a": "特码",
                                "mark_b": "第七名",
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
                                "O": null,
                                "P": null,
                                "Q": null
                            },
                            {
                                "id": 12,
                                "mark_a": "特码",
                                "mark_b": "第八名",
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
                                "O": null,
                                "P": null,
                                "Q": null
                            },
                            {
                                "id": 13,
                                "mark_a": "特码",
                                "mark_b": "第九名",
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
                                "O": null,
                                "P": null,
                                "Q": null
                            },
                            {
                                "id": 14,
                                "mark_a": "特码",
                                "mark_b": "第十名",
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
                                "O": null,
                                "P": null,
                                "Q": null
                            },
                            {
                                "id": 15,
                                "mark_a": "特码",
                                "mark_b": "冠亚军和",
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
                        ],
                        "custom_odds": null
                    }
                ],
            };
        },
        methods: {
            change_1_9_digit:function(val,k){
                // console.log(val);
                let array = ['A','B','C','D','E','F','G','H','I','J'];
                for(let i=0;i<array.length;i++){
                    this.list[k][array[i]] = val;
                }
            },
            change_1_9_half:function(val,k){
                // console.log(val);
                let array = ['K','L','M','N'];
                for(let i=0;i<array.length;i++){
                    this.list[k][array[i]] = val;
                }
            },
            change_sum:function(val,k){
                // console.log(val);
                let array = ['A','B','C','D'];
                for(let i=0;i<array.length;i++){
                    this.list[k][array[i]] = val;
                }
            },
            get_all_odds:function(){
                this.$http
                    .get(
                        `${this.api}/admin/pk10/odds`
                    )
                    .then(function(res) {
                        if(res.data.status == 200)
                        {
                            this.all_odds = res.data.data.odds_list;
                            this.list = this.all_odds[0].odds;
                            this.collectData();
                        }
                    });
            },
            collectData:function()
            {
                this.final_list = [];
                for(let i = 0 ;i<this.all_odds.length;i++)
                {
                    this.final_list.push(this.all_odds[i].name);
                }
            },
            choose_one: function(whichOne, index) {
                this.active_array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                this.which_one = whichOne;
                this.active_array[index] = 1;
                this.list = this.all_odds[index].odds;
            },
            edit_one: function() {
                this.$http
                    .put(`${this.api}/admin/pk10/odds/pk10_${this.which_one}`, {
                        odds: this.list
                    })
                    .then(function(res) {
                        if (res.data.status == 200) {
                            this.$message(
                                {
                                    message:res.data.msg,
                                    center:true,
                                    type:'success',
                                });
                            return;
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    });
            },

            add_one: function() {
                this.$http
                    .post(`${this.api}/admin/pk10/odds`, {
                        odds: this.list
                    })
                    .then(function(res) {
                        if (res.data.status == 200) {
                            this.$message(
                                {
                                    message:res.data.msg,
                                    center:true,
                                    type:'success',
                                });
                            this.get_all_odds();
                            return;
                        }
                    });
            },
            delete_one: function(whichOne,e) {
              let event = e||window.event;
              event.cancelBubble = true;
                this.$http
                    .delete(`${this.api}/admin/pk10/odds/pk10_${whichOne}`)
                    .then(function(res) {
                        console.log(res.data);
                        if (res.data.status == 200) {
                            this.$message.error('删除成功');
                            this.get_all_odds();
                            return;
                        }
                    });
            }
        }, //end methods
        created: function() {
            this.get_all_odds();
        }
    };
</script>

<style scoped>

    .nav {
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .table {
        width: 1065px;
        font-size:12px!important;
    }
    #pk10_odds{
        width: 1100px;
    }
    .text-danger
    {
        font-size: 18px;
        font-weight: 700;
    }
    input
    {
        font-size: 12px;
    }
    .form-control
    {
        font-size: 12px!important;
        /*padding: 0;*/
        text-align: center;
        padding:5px 3px;
    }
    .col-md-10{
        width:1100px;
        margin-top:5px;
        margin-left:10px;
    }
    .col-md-2{
        margin-left:10px;
        width:1100px;
    }

</style>
