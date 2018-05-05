<template>
    <div class="personal-handicaps">
        <div class="left">
            <!--choose_lty-->
            <div class="choose_lty">
                <h4 class="text-center" style="margin-bottom: 14px;">加拿大28</h4>
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
                <router-link to="cake" class="pull-right mr10">返回查看时时彩用户信息</router-link>
            </h4>
            <div class="cqssc" >
                <!--返水-->
                <table class="table table-hovor table-bordered table-striped text-center" style="margin-bottom: 0;">

                    <thead class="bg-primary">
                    <tr>
                        <td colspan="3">
                            <!--{{which_one}}盘-->
                            <button class="pull-right save  btn btn-success" @click='custom_handicap()'>保存，定制</button>
                        </td>
                    </tr>
                    </thead>
                    <thead class="bg-warning">
                    <tr>
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
                            <input type="text" class="form-control text-center" v-model="odds_ssc_one[k].e1">
                        </td>
                        <td>
                            <input type="text" class="form-control text-center" v-model="odds_ssc_one[k].e2">
                        </td>
                    </tr>
                    </tbody>
                </table>

                <!--特码-->
                <table class="table table-hovor table-bordered table-striped text-center" style="margin-bottom:0;">
                    <thead class="bg-primary">
                    <tr>
                        <td width="70">选项/球序</td>
                        <td v-for="(v,k,index) in odds_ssc_one[4]" v-if='index<8'>特码{{index}}</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>赔率</td>
                        <td v-for="(v,k,index) in odds_ssc_one[4]" v-if='index<8'>
                            <input type="text" class="text-center  form-control" v-model="odds_ssc_one[4]['e' + (index+1)]">
                        </td>
                    </tr>
                    </tbody>


                </table>

                <table class="table table-hovor table-bordered table-striped text-center" style="margin-bottom:0;">
                    <thead class="bg-primary">
                    <tr>
                        <td width="70">选项/球序</td>
                        <td v-for="(v,k,index) in odds_ssc_one[4]" v-if='index<16 && index>=8'>特码{{index}}</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>赔率</td>
                        <td v-for="(v,k,index) in odds_ssc_one[4]" v-if='index<16 && index>=8'>
                            <input type="text" class="text-center  form-control" v-model="odds_ssc_one[4]['e' + (index+1)]">
                        </td>
                    </tr>
                    </tbody>


                </table>

                <table class="table table-hovor table-bordered table-striped text-center" style="margin-bottom:0;">
                    <thead class="bg-primary">
                    <tr>
                        <td width="70">选项/球序</td>
                        <td v-for="(v,k,index) in odds_ssc_one[4]" v-if='index<24 && index>=16'>特码{{index}}</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>赔率</td>
                        <td v-for="(v,k,index) in odds_ssc_one[4]" v-if='index<24 && index>=16'>
                            <input type="text" class="text-center  form-control" v-model="odds_ssc_one[4]['e' + (index+1)]">
                        </td>
                    </tr>
                    </tbody>


                </table>

                <table class="table table-hovor table-bordered table-striped text-center">
                    <thead class="bg-primary">
                    <tr >
                        <td width="70">选项/球序</td>
                        <td v-for="(v,k,index) in odds_ssc_one[4]" v-if='index>23 && index<28'>特码{{index}}</td>
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
                        <td v-for="(v,k,index) in odds_ssc_one[4]" v-if='index>23 && index<28'>
                            <input type="text" class="text-center form-control" v-model="odds_ssc_one[4]['e' + (index+1)]">

                        </td>
                        <td>
                            <input type="text" class="text-center form-control" v-model="odds_ssc_one[4].bet_limit.order_limit_min">

                        </td>
                        <td>
                            <input type="text" class="text-center form-control" v-model="odds_ssc_one[4].bet_limit.order_limit_max">
                        </td>
                        <td>
                            <input type="text" class="text-center form-control" v-model="odds_ssc_one[4].bet_limit.expect_limit">

                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="odds_ssc_one[4].dec_odds[0].limit">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="odds_ssc_one[4].dec_odds[0].dec_odds">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="odds_ssc_one[4].dec_odds[1].limit">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="odds_ssc_one[4].dec_odds[1].dec_odds">
                        </td>
                    </tr>
                    </tbody>
                </table>

                <!--总和、龙虎-->
                <table class="table table-hovor table-bordered table-striped text-center">
                    <thead class="bg-primary">
                    <tr >
                        <td width="70">特码/球序</td>
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
                        <td v-for="(v,k,index) in odds_ssc_one[5]" v-if='index<10'>
                            <input type="text" class="text-center form-control" v-model="odds_ssc_one[5]['e' + (index+1)]">
                        </td>
                        <td>
                            <input type="text" class="text-center form-control" v-model="odds_ssc_one[7]['e1']">
                        </td>
                        <td>
                            <input type="text" class="text-center form-control" v-model="odds_ssc_one[5].bet_limit.order_limit_min">

                        </td>
                        <td>
                            <input type="text" class="text-center form-control" v-model="odds_ssc_one[5].bet_limit.order_limit_max">
                        </td>
                        <td>
                            <input type="text" class="text-center form-control" v-model="odds_ssc_one[5].bet_limit.expect_limit">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="odds_ssc_one[5].dec_odds[0].limit">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="odds_ssc_one[5].dec_odds[0].dec_odds">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="odds_ssc_one[5].dec_odds[1].limit">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="odds_ssc_one[5].dec_odds[1].dec_odds">
                        </td>


                    </tr>
                    </tbody>
                </table>
                <!--前三，中三，后三-->
                <table class="table table-hovor table-bordered table-striped text-center">
                    <thead class="bg-primary">
                    <tr >
                        <td width="70">波色</td>
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
                        <td v-for="(v,k,index) in odds_ssc_one[5]" v-if='index<3'>
                            <input type="text" class="text-center form-control" v-model="odds_ssc_one[6]['e' + (index+1)]">
                        </td>
                        <td>
                            <input type="text" class="text-center form-control" v-model="odds_ssc_one[6].bet_limit.order_limit_min">

                        </td>
                        <td>
                            <input type="text" class="text-center form-control" v-model="odds_ssc_one[6].bet_limit.order_limit_max">
                        </td>
                        <td>
                            <input type="text" class="text-center form-control" v-model="odds_ssc_one[6].bet_limit.expect_limit">

                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="odds_ssc_one[6].dec_odds[0].limit">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="odds_ssc_one[6].dec_odds[0].dec_odds">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="odds_ssc_one[6].dec_odds[1].limit">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="odds_ssc_one[6].dec_odds[1].dec_odds">
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
        name: 'users_handicaps_cake',
        data() {
            return {
                u_id: 0,
                users_lties: [],//用户已有哪些彩种
                which_lottery: 'cake',
                active_array: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//active_array;
                odds_ssc_one:
                    [
                        {
                            "id": 1,
                            "mark_a": "返点",
                            "mark_b": "总代",
                            "bet_limit": null,
                            "dec_odds": null,
                            "e1": "0.0010",
                            "e2": "0.0010",
                            "e3": null,
                            "e4": null,
                            "e5": null,
                            "e6": null,
                            "e7": null,
                            "e8": null,
                            "e9": null,
                            "e10": null,
                            "e11": null,
                            "e12": null,
                            "e13": null,
                            "e14": null,
                            "e15": null,
                            "e16": null,
                            "e17": null,
                            "e18": null,
                            "e19": null,
                            "e20": null,
                            "e21": null,
                            "e22": null,
                            "e23": null,
                            "e24": null,
                            "e25": null,
                            "e26": null,
                            "e27": null,
                            "e28": null
                        },
                        {
                            "id": 2,
                            "mark_a": "返点",
                            "mark_b": "分代",
                            "bet_limit": null,
                            "dec_odds": null,
                            "e1": "0.0010",
                            "e2": "0.0010",
                            "e3": null,
                            "e4": null,
                            "e5": null,
                            "e6": null,
                            "e7": null,
                            "e8": null,
                            "e9": null,
                            "e10": null,
                            "e11": null,
                            "e12": null,
                            "e13": null,
                            "e14": null,
                            "e15": null,
                            "e16": null,
                            "e17": null,
                            "e18": null,
                            "e19": null,
                            "e20": null,
                            "e21": null,
                            "e22": null,
                            "e23": null,
                            "e24": null,
                            "e25": null,
                            "e26": null,
                            "e27": null,
                            "e28": null
                        },
                        {
                            "id": 3,
                            "mark_a": "返点",
                            "mark_b": "推广",
                            "bet_limit": null,
                            "dec_odds": null,
                            "e1": "0.0010",
                            "e2": "0.0010",
                            "e3": null,
                            "e4": null,
                            "e5": null,
                            "e6": null,
                            "e7": null,
                            "e8": null,
                            "e9": null,
                            "e10": null,
                            "e11": null,
                            "e12": null,
                            "e13": null,
                            "e14": null,
                            "e15": null,
                            "e16": null,
                            "e17": null,
                            "e18": null,
                            "e19": null,
                            "e20": null,
                            "e21": null,
                            "e22": null,
                            "e23": null,
                            "e24": null,
                            "e25": null,
                            "e26": null,
                            "e27": null,
                            "e28": null
                        },
                        {
                            "id": 4,
                            "mark_a": "返点",
                            "mark_b": "会员",
                            "bet_limit": null,
                            "dec_odds": null,
                            "e1": "0.0210",
                            "e2": "0.0010",
                            "e3": null,
                            "e4": null,
                            "e5": null,
                            "e6": null,
                            "e7": null,
                            "e8": null,
                            "e9": null,
                            "e10": null,
                            "e11": null,
                            "e12": null,
                            "e13": null,
                            "e14": null,
                            "e15": null,
                            "e16": null,
                            "e17": null,
                            "e18": null,
                            "e19": null,
                            "e20": null,
                            "e21": null,
                            "e22": null,
                            "e23": null,
                            "e24": null,
                            "e25": null,
                            "e26": null,
                            "e27": null,
                            "e28": null
                        },
                        {
                            "id": 5,
                            "mark_a": "特码",
                            "mark_b": "特码",
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
                            "e1": "500.0000",
                            "e2": "100.0000",
                            "e3": "50.0000",
                            "e4": "40.0000",
                            "e5": "30.0000",
                            "e6": "20.0000",
                            "e7": "17.0000",
                            "e8": "16.0000",
                            "e9": "15.0000",
                            "e10": "15.0000",
                            "e11": "14.0000",
                            "e12": "14.0000",
                            "e13": "13.0000",
                            "e14": "13.0000",
                            "e15": "14.0000",
                            "e16": "14.0000",
                            "e17": "14.0000",
                            "e18": "14.0000",
                            "e19": "15.0000",
                            "e20": "15.0000",
                            "e21": "16.0000",
                            "e22": "17.0000",
                            "e23": "20.0000",
                            "e24": "30.0000",
                            "e25": "40.0000",
                            "e26": "50.0000",
                            "e27": "100.0000",
                            "e28": "500.0000"
                        },
                        {
                            "id": 6,
                            "mark_a": "两面",
                            "mark_b": "两面",
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
                            "e1": "3.0000",
                            "e2": "2.0000",
                            "e3": "2.0000",
                            "e4": "2.0000",
                            "e5": "4.3000",
                            "e6": "4.2000",
                            "e7": "4.2000",
                            "e8": "4.3000",
                            "e9": "13.0000",
                            "e10": "13.0000",
                            "e11": null,
                            "e12": null,
                            "e13": null,
                            "e14": null,
                            "e15": null,
                            "e16": null,
                            "e17": null,
                            "e18": null,
                            "e19": null,
                            "e20": null,
                            "e21": null,
                            "e22": null,
                            "e23": null,
                            "e24": null,
                            "e25": null,
                            "e26": null,
                            "e27": null,
                            "e28": null
                        },
                        {
                            "id": 7,
                            "mark_a": "波色",
                            "mark_b": "波色",
                            "bet_limit": {
                                "order_limit_min": 20,
                                "order_limit_max": 300,
                                "expect_limit": 1000
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
                            "e1": "2.5000",
                            "e2": "2.5000",
                            "e3": "2.5000",
                            "e4": null,
                            "e5": null,
                            "e6": null,
                            "e7": null,
                            "e8": null,
                            "e9": null,
                            "e10": null,
                            "e11": null,
                            "e12": null,
                            "e13": null,
                            "e14": null,
                            "e15": null,
                            "e16": null,
                            "e17": null,
                            "e18": null,
                            "e19": null,
                            "e20": null,
                            "e21": null,
                            "e22": null,
                            "e23": null,
                            "e24": null,
                            "e25": null,
                            "e26": null,
                            "e27": null,
                            "e28": null
                        },
                        {
                            "id": 8,
                            "mark_a": "豹子",
                            "mark_b": "豹子",
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
                            "e1": "30.0000",
                            "e2": null,
                            "e3": null,
                            "e4": null,
                            "e5": null,
                            "e6": null,
                            "e7": null,
                            "e8": null,
                            "e9": null,
                            "e10": null,
                            "e11": null,
                            "e12": null,
                            "e13": null,
                            "e14": null,
                            "e15": null,
                            "e16": null,
                            "e17": null,
                            "e18": null,
                            "e19": null,
                            "e20": null,
                            "e21": null,
                            "e22": null,
                            "e23": null,
                            "e24": null,
                            "e25": null,
                            "e26": null,
                            "e27": null,
                            "e28": null
                        },
                        {
                            "id": 9,
                            "mark_a": "特码三压一",
                            "mark_b": "特码三压一",
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
                            "e1": "3.0000",
                            "e2": null,
                            "e3": null,
                            "e4": null,
                            "e5": null,
                            "e6": null,
                            "e7": null,
                            "e8": null,
                            "e9": null,
                            "e10": null,
                            "e11": null,
                            "e12": null,
                            "e13": null,
                            "e14": null,
                            "e15": null,
                            "e16": null,
                            "e17": null,
                            "e18": null,
                            "e19": null,
                            "e20": null,
                            "e21": null,
                            "e22": null,
                            "e23": null,
                            "e24": null,
                            "e25": null,
                            "e26": null,
                            "e27": null,
                            "e28": null
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
                 * 获取用户的ssc盘口
                 */
                get_systems_handicaps: function (type = 'cake')
                {
                    this.$http.get(`${this.api}/admin/cake/odds?user_id=${this.u_id}`)
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
                //检测用户是否拥有cake这个彩种
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
                                if(this.users_lties.indexOf('cakeno') == -1)
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
                    data.table = 'cake' + "_" + this.handicaps[this.index];
                    data.odds = this.odds_ssc_one;
                    this.$http.post(`${this.api}/admin/cake/customOdds`, data)
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
            this.u_id = this.$route.params.u_id ? this.$route.params.u_id : window.sessionStorage.handicaps_uid_cake;
            window.sessionStorage.handicaps_uid_cake = this.u_id;
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

    .form-control {

        padding:6px 0px;
    }
    td > input {

    }
    .form-control{
        font-size: 12px !important;
    }
    .text-danger {
        font-size: 18px;
        font-weight: 700;
    }

    table {
        font-size: 12px !important;
        margin-bottom: 0px !important;
    }

    .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
        padding: 8px 2px;
    }
</style>


