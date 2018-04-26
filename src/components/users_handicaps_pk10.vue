<template>
    <div class="personal-handicaps">
        <div class="left">
            <!--choose_lty-->
            <div class="choose_lty">
                <h4 class="text-center" style="margin-bottom: 14px;">北京赛车PK拾</h4>
            </div>
            <!--choose_handicap-->
            <table class="table table-hovor table-bordered table-striped text-center">
                <thead class="bg-primary">
                <tr>
                    <td width="130" style='line-height:30px;'>盘口名称</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(v,k) in handicaps">
                    <td :class="active_array[k]?'text-danger':''" @click='choose_one_ssc(k,v)' style="cursor:pointer;">
                        {{v}}盘 <b v-if="is_custom[k]" class="text-warning">(定制盘)</b>
                    </td>

                </tr>
                </tbody>
            </table>
        </div>

        <div class="right">
            <h4 style="margin-top: 8px;margin-bottom: 14px;">
                用户名：<span class="label label-default">{{user.username}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                状态：<span class="label" :class="user.status==1?'label-success':'label-danger'">{{user.status==1?'启用':'禁用'}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                类型：{{user.type == 0?'会员':(user.type == 1?'代理':(user.type==2?'推广':(user.type == 3?'管理':'')))}}
                <router-link to="users" class="pull-right mr10">返回查看时时彩用户信息</router-link>
            </h4>
            <div class="pk10">
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
                    <tr v-for="(v,k) in odds_ssc_one" v-if=' k < 4'>
                        <td>
                            {{v.mark_b}}
                        </td>
                        <td>
                            <input type="text"  v-model="odds_ssc_one[k].A" class="text-center form-control">
                        </td>
                        <td>
                            <input type="text"  v-model="odds_ssc_one[k].B" class="text-center form-control">
                        </td>

                    </tr>
                    </tbody>
                </table>

                <table class="table table-hovor table-bordered table-striped text-center">
                    <thead class="bg-primary">
                    <tr >
                        <td width="50">球序</td>
                        <td>特码1-10</td>
                        <td>大小单双</td>
                        <td>龙</td>
                        <td>虎</td>
                        <td>单注最小限额</td>
                        <td>单注最大限额</td>
                        <td>单期限额</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(v,k) in odds_ssc_one" v-if='k>=4 && k<14'>
                        <td >
                            {{v.mark_b}}
                        </td>
                        <td>
                            <input type="text"  v-model="odds_ssc_one[k].A" class="text-center form-control" @change="change_1_9_digit(odds_ssc_one[k].A,k)">
                        </td>
                        <td>
                            <input type="text"  v-model="odds_ssc_one[k].K" class="text-center form-control">
                        </td>

                        <td v-if="odds_ssc_one[k].O">
                            <input type="text"  v-model="odds_ssc_one[k].O" class="text-center form-control" v-bind:disabled="odds_ssc_one[k].O == 0.0000">
                        </td>
                        <td v-if="odds_ssc_one[k].P">
                            <input type="text"  v-model="odds_ssc_one[k].P" class="text-center form-control" v-bind:disabled="odds_ssc_one[k].O == 0.0000" >
                        </td>
                        <td>
                            <input type="text" class="form-control text-center"
                                   v-model="odds_ssc_one[k].bet_limit.order_limit_min">

                        </td>
                        <td>
                            <input type="text" class="form-control text-center"
                                   v-model="odds_ssc_one[k].bet_limit.order_limit_max">
                        </td>
                        <td>
                            <input type="text" class="form-control text-center"
                                   v-model="odds_ssc_one[k].bet_limit.expect_limit">
                        </td>

                    </tr>
                    </tbody>
                </table>

                <table class="table table-hovor table-bordered table-striped text-center">
                    <thead class="bg-danger">
                    <tr >
                        <td width="90">冠亚军和-号码</td>
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
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(v,k) in odds_ssc_one" v-if='k==14'>
                        <td >
                            {{v.mark_b}}
                        </td>
                        <td>
                            <input type="text"  v-model="odds_ssc_one[k].K" class="text-center form-control">
                        </td>
                        <td>
                            <input type="text"  v-model="odds_ssc_one[k].L" class="text-center form-control">
                        </td>
                        <td>
                            <input type="text"  v-model="odds_ssc_one[k].M" class="text-center form-control">
                        </td>
                        <td>
                            <input type="text"  v-model="odds_ssc_one[k].N" class="text-center form-control">
                        </td>
                        <td>
                            <input type="text"  v-model="odds_ssc_one[k].O" class="text-center form-control">
                        </td>
                        <td>
                            <input type="text"  v-model="odds_ssc_one[k].P" class="text-center form-control">
                        </td>
                        <td>
                            <input type="text"  v-model="odds_ssc_one[k].Q" class="text-center form-control">
                        </td>
                        <td>
                            <input type="text" class="form-control text-center"
                                   v-model="odds_ssc_one[k].bet_limit.order_limit_min">

                        </td>
                        <td>
                            <input type="text" class="form-control text-center"
                                   v-model="odds_ssc_one[k].bet_limit.order_limit_max">
                        </td>
                        <td>
                            <input type="text" class="form-control text-center"
                                   v-model="odds_ssc_one[k].bet_limit.expect_limit">
                        </td>
                    </tr>
                    </tbody>
                </table>



                <table class="table table-hovor table-bordered table-striped text-center">
                    <thead class="bg-danger">
                    <tr >
                        <td width="90">冠亚军和-号码</td>
                        <td>大</td>
                        <td>小</td>
                        <td>单</td>
                        <td>双</td>
                        <td>单注最小限额</td>
                        <td>单注最大限额</td>
                        <td>单期限额</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(v,k) in odds_ssc_one" v-if='k==15'>
                        <td >
                            {{v.mark_b}}
                        </td>
                        <td>
                            <input type="text"  v-model="odds_ssc_one[k].A" class="text-center form-control">
                        </td>
                        <td>
                            <input type="text"  v-model="odds_ssc_one[k].B" class="text-center form-control">
                        </td>
                        <td>
                            <input type="text"  v-model="odds_ssc_one[k].C" class="text-center form-control">
                        </td>
                        <td>
                            <input type="text"  v-model="odds_ssc_one[k].D" class="text-center form-control">
                        </td>
                        <td>
                            <input type="text" class="form-control text-center"
                                   v-model="odds_ssc_one[k].bet_limit.order_limit_min">

                        </td>
                        <td>
                            <input type="text" class="form-control text-center"
                                   v-model="odds_ssc_one[k].bet_limit.order_limit_max">
                        </td>
                        <td>
                            <input type="text" class="form-control text-center"
                                   v-model="odds_ssc_one[k].bet_limit.expect_limit">
                        </td>
                    </tr>
                    </tbody>
                </table>
                <br>
                <br>
                <br>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'users_handicaps_pk10',
        data() {
            return {
                u_id: 0,
                users_lties: [],//用户已有哪些彩种
                which_lottery: 'pk10',
                active_array: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//active_array;
                odds_ssc_one: [
                    {
                        "id": 1,
                        "mark_a": "返点",
                        "mark_b": "总代",
                        "bet_limit": "",
                        "A": "0.0011",
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
                        "O": "0.0000",
                        "P": "0.0000",
                        "Q": "0.0000"
                    },
                    {
                        "id": 2,
                        "mark_a": "返点",
                        "mark_b": "分代",
                        "bet_limit": "",
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
                        "K": "0.0000",
                        "L": "0.0000",
                        "M": "0.0000",
                        "N": "0.0000",
                        "O": "0.0000",
                        "P": "0.0000",
                        "Q": "0.0000"
                    },
                    {
                        "id": 3,
                        "mark_a": "返点",
                        "mark_b": "推广",
                        "bet_limit": "",
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
                        "K": "0.0000",
                        "L": "0.0000",
                        "M": "0.0000",
                        "N": "0.0000",
                        "O": "0.0000",
                        "P": "0.0000",
                        "Q": "0.0000"
                    },
                    {
                        "id": 4,
                        "mark_a": "返点",
                        "mark_b": "会员",
                        "bet_limit": "",
                        "A": "0.0210",
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
                        "O": "0.0000",
                        "P": "0.0000",
                        "Q": "0.0000"
                    },
                    {
                        "id": 5,
                        "mark_a": "特码",
                        "mark_b": "冠军",
                        "bet_limit": {
                            "order_limit_min": "10",
                            "order_limit_max": "10000",
                            "expect_limit": "20000"
                        },
                        "A": "9.7250",
                        "B": "9.7250",
                        "C": "9.7250",
                        "D": "9.7250",
                        "E": "9.7250",
                        "F": "9.7250",
                        "G": "9.7250",
                        "H": "9.7250",
                        "I": "9.7250",
                        "J": "9.7250",
                        "K": "1.9430",
                        "L": "1.9430",
                        "M": "1.9430",
                        "N": "1.9430",
                        "O": "1.9430",
                        "P": "1.9430",
                        "Q": "0.0000"
                    },
                    {
                        "id": 6,
                        "mark_a": "特码",
                        "mark_b": "亚军",
                        "bet_limit": {
                            "order_limit_min": "10",
                            "order_limit_max": "10000",
                            "expect_limit": "20000"
                        },
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
                        "Q": "0.0000"
                    },
                    {
                        "id": 7,
                        "mark_a": "特码",
                        "mark_b": "第三名",
                        "bet_limit": {
                            "order_limit_min": "10",
                            "order_limit_max": "10000",
                            "expect_limit": "20000"
                        },
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
                        "Q": "0.0000"
                    },
                    {
                        "id": 8,
                        "mark_a": "特码",
                        "mark_b": "第四名",
                        "bet_limit": {
                            "order_limit_min": "10",
                            "order_limit_max": "10000",
                            "expect_limit": "20000"
                        },
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
                        "Q": "0.0000"
                    },
                    {
                        "id": 9,
                        "mark_a": "特码",
                        "mark_b": "第五名",
                        "bet_limit": {
                            "order_limit_min": "10",
                            "order_limit_max": "10000",
                            "expect_limit": "20000"
                        },
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
                        "Q": "0.0000"
                    },
                    {
                        "id": 10,
                        "mark_a": "特码",
                        "mark_b": "第六名",
                        "bet_limit": {
                            "order_limit_min": "10",
                            "order_limit_max": "10000",
                            "expect_limit": "20000"
                        },
                        "A": "9.7250",
                        "B": "9.7250",
                        "C": "9.7250",
                        "D": "9.7250",
                        "E": "9.7250",
                        "F": "9.7250",
                        "G": "9.7250",
                        "H": "9.7250",
                        "I": "9.7250",
                        "J": "9.7250",
                        "K": "1.9430",
                        "L": "1.9430",
                        "M": "1.9430",
                        "N": "1.9430",
                        "O": "0.0000",
                        "P": "0.0000",
                        "Q": "0.0000"
                    },
                    {
                        "id": 11,
                        "mark_a": "特码",
                        "mark_b": "第七名",
                        "bet_limit": {
                            "order_limit_min": "10",
                            "order_limit_max": "10000",
                            "expect_limit": "20000"
                        },
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
                        "O": "0.0000",
                        "P": "0.0000",
                        "Q": "0.0000"
                    },
                    {
                        "id": 12,
                        "mark_a": "特码",
                        "mark_b": "第八名",
                        "bet_limit": {
                            "order_limit_min": "10",
                            "order_limit_max": "10000",
                            "expect_limit": "20000"
                        },
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
                        "O": "0.0000",
                        "P": "0.0000",
                        "Q": "0.0000"
                    },
                    {
                        "id": 13,
                        "mark_a": "特码",
                        "mark_b": "第九名",
                        "bet_limit": {
                            "order_limit_min": "10",
                            "order_limit_max": "10000",
                            "expect_limit": "20000"
                        },
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
                        "O": "0.0000",
                        "P": "0.0000",
                        "Q": "0.0000"
                    },
                    {
                        "id": 14,
                        "mark_a": "特码",
                        "mark_b": "第十名",
                        "bet_limit": {
                            "order_limit_min": "10",
                            "order_limit_max": "10000",
                            "expect_limit": "20000"
                        },
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
                        "O": "0.0000",
                        "P": "0.0000",
                        "Q": "0.0000"
                    },
                    {
                        "id": 15,
                        "mark_a": "特码",
                        "mark_b": "冠亚军和",
                        "bet_limit": {
                            "order_limit_min": "10",
                            "order_limit_max": "10000",
                            "expect_limit": "20000"
                        },
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
                            "order_limit_min": "10",
                            "order_limit_max": "20000",
                            "expect_limit": "20000"
                        },
                        "A": "1.9431",
                        "B": "1.9431",
                        "C": "1.9431",
                        "D": "1.9431",
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
                        "O": "0.0000",
                        "P": "0.0000",
                        "Q": "0.0000"
                    }
                ],
                user: {},//用户信息
                index: 0,//彩种盘口的下标
                is_custom: [],
                handicaps:[],//例如 ['a','b','c','d'....],默认为空数组
            };
        },

        methods:
            {
                change_1_9_digit: function (val, k) {
                    // console.log(val);
                    let array = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
                    for (let i = 0; i < array.length; i++) {
                        this.odds_ssc_one[k][array[i]] = val;
                    }
                },
                change_1_9_half: function (val, k) {
                    // console.log(val);
                    let array = ['K', 'L', 'M', 'N'];
                    for (let i = 0; i < array.length; i++) {
                        this.odds_ssc_one[k][array[i]] = val;
                    }
                },
                change_sum: function (val, k) {
                    // console.log(val);
                    let array = ['A', 'B', 'C', 'D','E','F'];
                    for (let i = 0; i < array.length; i++) {
                        this.odds_ssc_one[k][array[i]] = val;
                    }
                },
                /**
                 * 获取用户的pk10盘口
                 */
                get_systems_handicaps: function (type = 'pk10')
                {
                    this.$http.get(`${this.api}/admin/pk10/odds?user_id=${this.u_id}`)
                        .then(function (res)
                        {
                            // console.log(res.data);
                            if (res.data.status == 200) {
                                //全部赔率列表，有a,b,c,d。。。。。
                                this.ssc_odds_all = res.data.data.odds_list;
                                //要显示的默认选择第一个盘
                                this.odds_ssc_one = this.ssc_odds_all[0].custom_odds?this.ssc_odds_all[0].custom_odds:this.ssc_odds_all[0].odds;
                                //所有的盘口列表 例如 ['a','b','c','d'....],默认为空数组
                                this.handicaps = [];
                                //用户是否定制过的盘口,例如[1,0,1,0...] 1为定制版本，0为没有修改过的版本，默认为空
                                this.is_custom = [];
                                for (var i = 0; i < res.data.data.odds_list.length; i++)
                                {
                                    //所有的盘口列表push盘名称,['a'], ['a','b'], ['a','b','c'] ......
                                    this.handicaps.push(res.data.data.odds_list[i].name);

                                    //判断是否为已定制盘口
                                    if (res.data.data.odds_list[i].custom_odds)
                                    {
                                        this.is_custom.push(1);
                                    }
                                    else
                                    {
                                        this.is_custom.push(0);
                                    }
                                }
                            }
                        });
                },
                //检测用户是否拥有pk10这个彩种
                get_users_lties: function ()
                {
                    this.$http.get(`${this.api}/admin/lotteryList/${this.u_id}`)
                        .then(function (res)
                        {
                            if (res.data.status == 200)
                            {
                                //获取用户的彩种
                                this.users_lties = res.data.data.list;
                                //查看用户是否有cqssc这个彩种
                                if(this.users_lties.indexOf('bjpk10') == -1)
                                {
                                    this.$router.go(-1)
                                }
                                else
                                {
                                    this.get_systems_handicaps();
                                }

                            }

                        });

                },

                /**
                 * ssc切盘口
                 */
                choose_one_ssc: function (index)
                {
                    if (this.ssc_odds_all[index].custom_odds)
                    {
                        this.odds_ssc_one = this.ssc_odds_all[index].custom_odds;
                    }
                    else
                    {
                        this.odds_ssc_one = this.ssc_odds_all[index].odds;
                    }
                    this.active_array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    this.active_array[index] = 1;
                    this.index = index;
                },
                /**
                 * 获取用户的信息
                 */
                get_user_info: function () {
                    this.$http.get(`${this.api}/admin/users/${this.u_id}`)
                        .then(function (res) {

                            if (res.data.status == 200) {
                                this.user = res.data.data.user;
                            }
                        });
                },
                /**
                 * 为用户定制特定的盘口
                 */
                custom_handicap: function ()
                {

                    var data = {};//提交定制的数据
                    data.user_id = this.u_id;
                    data.table = 'pk10' + "_" + this.handicaps[this.index];
                    data.odds = this.odds_ssc_one;
                    // console.log(data);
                    // return;
                    this.$http.post(`${this.api}/admin/pk10/customOdds`, data)
                        .then(function (res) {
                            // console.log(res.data);
                            if (res.data.status == 0 && res.data.msg == 'error') {
                                //修改失败的情况
                                // alert('定制错误！ \n' + this.ssc_odds_all[this.index].odds[res.data.data.invalid[0][0]].mark_b +this.ssc_odds_all[this.index].odds[res.data.data.invalid[0][0]].mark_a + '设置不对，请重新赋值！' +
                                // '\n 注意：值不能超过上级！');
                                this.$message.error('定制错误！ \n' + this.ssc_odds_all[this.index].odds[res.data.data.invalid[0][0]].mark_b + this.ssc_odds_all[this.index].odds[res.data.data.invalid[0][0]].mark_a + '设置不对，请重新赋值！' +
                                    '\n 注意：值不能超过上级！');
                                return;
                            }
                            else if (res.data.status == 200) {
                                // alert('定制成功!');
                                this.$message(
                                    {
                                        message: res.data.msg,
                                        center: true,
                                        type: 'success',
                                    });
                                this.get_users_lties();
                                return;
                            }
                            else {
                                // alert(res.data.msg);
                                this.$message.error(res.data.msg);
                                return;
                            }
                        });
                },
            },

        created() {
            //获取用户的id
            this.u_id = this.$route.params.u_id ? this.$route.params.u_id : window.sessionStorage.handicaps_uid_pk10;
            window.sessionStorage.handicaps_uid_pk10 = this.u_id;
            this.get_users_lties();
            this.get_user_info();
            //this.get_users_handicaps();
        },

    }
</script>

<style scoped>
    .personal-handicaps {
        overflow: hidden;
    }

    .left {
        width: 200px;
        float: left;
        box-sizing: border-box;
        padding-top: 25px;
    }

    .choose_lty {
        width: 100%;
        overflow: hidden;
    }





    .right {
        width: 880px;
        float: left;
        box-sizing: border-box;
        padding-top: 25px;
        margin-left: 15px;
    }

    .right > .form-control {
        text-align: center;
        width: 100%;
        font-size: 12px !important;
        padding: 5px 3px;
    }

    td > input {

    }

    .text-danger {
        font-size: 18px;
        font-weight: 700;
    }
    .form-control{
        font-size: 12px !important;
        padding: 6px 8px;
    }
    table {
        font-size: 12px !important;
        margin-bottom: 0px !important;
    }

    .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
        padding: 8px 2px;
    }
</style>


