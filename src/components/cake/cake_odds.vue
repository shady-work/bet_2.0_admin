<template>
    <div id='odds'>
        <h3 class="ml10">加拿大28-系统盘口设定</h3>
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
                        <td colspan="3">{{which_one}}盘
                            <button class="pull-right save  btn btn-info" @click='edit_one()'>保存修改</button>
                        </td>
                    </tr>
                    </thead>
                    <thead class="bg-warning">
                    <tr class="h4">
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
                            <input type="text" class="form-control" v-model="list[k].e1">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[k].e2">
                        </td>
                    </tr>
                    </tbody>
                </table>
                <!--0-7-->
                <table class="table table-hovor table-bordered table-striped text-center" style="margin-bottom:0;">
                    <thead class="bg-primary">
                    <tr>
                        <td width="150">选项/球序</td>
                        <td v-for="(v,k,index) in list[4]" v-if='index<8'>特码{{index}}</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>赔率</td>
                        <td v-for="(v,k,index) in list[4]" v-if='index<8'>
                            <input type="text" class="form-control" v-model="list[4]['e' + (index+1)]">
                        </td>
                    </tr>
                    </tbody>


                </table>
                <!--8-16-->
                <table class="table table-hovor table-bordered table-striped text-center" style="margin-bottom:0;">
                    <thead class="bg-primary">
                    <tr>
                        <td width="80">选项/球序</td>
                        <td v-for="(v,k,index) in list[4]" v-if='index<16 && index>=8'>特码{{index}}</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>赔率</td>
                        <td v-for="(v,k,index) in list[4]" v-if='index<16 && index>=8'>
                            <input type="text" class="form-control" v-model="list[4]['e' + (index+1)]">
                        </td>
                    </tr>
                    </tbody>


                </table>
                <!--16-24-->
                <table class="table table-hovor table-bordered table-striped text-center" style="margin-bottom:0;">
                    <thead class="bg-primary">
                    <tr>
                        <td width="80">选项/球序</td>
                        <td v-for="(v,k,index) in list[4]" v-if='index<24 && index>=16'>特码{{index}}</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>赔率</td>
                        <td v-for="(v,k,index) in list[4]" v-if='index<24 && index>=16'>
                            <input type="text" class="form-control" v-model="list[4]['e' + (index+1)]">
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table class="table table-hovor table-bordered table-striped text-center">
                    <thead class="bg-primary">
                    <tr >
                        <td width="80">选项/球序</td>
                        <td v-for="(v,k,index) in list[4]" v-if='index>23 && index<28'>特码{{index}}</td>
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
                        <td v-for="(v,k,index) in list[4]" v-if='index>23 && index<28'>
                            <input type="text" class="form-control" v-model="list[4]['e' + (index+1)]">

                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[4].bet_limit.order_limit_min">

                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[4].bet_limit.order_limit_max">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[4].bet_limit.expect_limit">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="list[4].dec_odds[0].limit">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="list[4].dec_odds[0].dec_odds">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="list[4].dec_odds[1].limit">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="list[4].dec_odds[1].dec_odds">
                        </td>
                    </tr>
                    </tbody>
                </table>

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
                        <td v-for="(v,k,index) in list[5]" v-if='index<10'>
                            <input type="text" class="form-control" v-model="list[5]['e' + (index+1)]">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[7]['e1']">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[5].bet_limit.order_limit_min">

                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[5].bet_limit.order_limit_max">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[5].bet_limit.expect_limit">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="list[5].dec_odds[0].limit">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="list[5].dec_odds[0].dec_odds">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="list[5].dec_odds[1].limit">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="list[5].dec_odds[1].dec_odds">
                        </td>

                    </tr>
                    </tbody>
                </table>


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
                        <td v-for="(v,k,index) in list[6]" v-if='index<3'>
                            <input type="text" class="form-control" v-model="list[6]['e' + (index+1)]">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[6].bet_limit.order_limit_min">

                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[6].bet_limit.order_limit_max">
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="list[6].bet_limit.expect_limit">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="list[6].dec_odds[0].limit">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="list[6].dec_odds[0].dec_odds">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="list[6].dec_odds[1].limit">
                        </td>
                        <td v-if="$store.state.son_off">
                            <input type="text" class="form-control text-center"
                                   v-model="list[5].dec_odds[1].dec_odds">
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
        name: "pcegg_odds",
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
                all_odds: [],
                list:  [
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
            };
        },
        methods: {
            get_all_odds: function () {
                this.$http
                    .get(
                        `${this.api}/admin/cake/odds`
                    )
                    .then(function (res) {
                        if (res.data.status == 200) {
                            this.all_odds = res.data.data.odds_list;
                            this.list = this.all_odds[0].odds;
                            this.collectData();
                        }
                    });
            },
            collectData: function () {
              this.final_list = [];
                for (let i = 0; i < this.all_odds.length; i++) {
                    this.final_list.push(this.all_odds[i].name);
                }
            },
            choose_one: function (whichOne, index) {
                this.active_array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                this.which_one = whichOne;
                this.active_array[index] = 1;
                this.list = this.all_odds[index].odds;
            },
            edit_one: function () {
                this.$http
                    .put(`${this.api}/admin/cake/odds/cake_${this.which_one}`, {
                        odds: this.list
                    })
                    .then(function (res) {
                        if (res.data.status == 201) {
                            // alert(res.data.msg);
                            this.$message(
                                {
                                    message: res.data.msg,
                                    center: true,
                                    type: 'success',
                                });
                            return;
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
            },

            add_one: function () {
                this.$http
                    .post(`${this.api}/admin/cake/odds`, {
                        odds: this.list
                    })
                    .then(function (res) {
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
            delete_one: function (whichOne,e) {
              let event = e||window.event;
              event.cancelBubble = true;
                this.$http
                    .delete(`${this.api}/admin/cake/odds/cake_${whichOne}`)
                    .then(function (res) {
                        if (res.data.status == 200) {
                          this.$message.error('删除成功');
                          this.get_all_odds();
                            return;
                        }
                    });
            }
        }, //end methods
        created: function () {
            this.get_all_odds();
        }
    };
</script>

<style scoped>
    .table
    {
      width: 1065px;
    }
    .nav {
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .text-danger {
        font-size: 18px;
        font-weight: 700;
    }
    #odds{
        width: 1100px;
    }
    input {
        font-size: 12px;
    }

    .form-control {
        padding: 0;
        text-align: center;
    }

    .col-md-10 {
        width: 1100px;
        margin-top: 5px;
        margin-left: 10px;
    }

    .col-md-2 {
        margin-left: 10px;
        width: 1100px;
        margin-top: 5px;
    }
</style>
