<template>
   <div id='cqssc_odds'>
       <h3 class="ml10">重庆时时彩-系统盘口设定</h3>
        <div class="row">
            <div class="col-md-2">
                <table class="table table-hovor table-bordered table-striped text-center">
                            <thead class="bg-primary">
                                <tr>
                                    <td width="70" style='line-height:30px;'>盘口</td>
                                    <td v-for="(v,k) in final_list" :class="active_array[k]?'text-danger':''">
                                      {{toUp(v)}}盘
                                    </td>
                                     <td  colspan="2">
                                       <button v-if="$store.state.admin_type==3" class="btn-sm btn btn-warning" @click='add_one()'>添加盘口</button>
                                     </td>
                                </tr>
                            </thead>
                            <tbody>
                                 <tr>
                                     <td style='line-height:30px;'>操作   
                                    </td>
                                     <td v-for="(v,k) in final_list">
                                         
                                          <button v-if="$store.state.admin_type==3"  class="btn btn-danger btn-sm  mr10  edit m" style="margin-left:3px;" @click='delete_one(v)'>删除</button>
                                           <button class="btn btn-info  btn-sm edit" @click='choose_one(v,k)'>查看</button>
                                     </td>
                                 </tr>
                            </tbody>
                  </table>
            </div>
            <div class="col-md-10">

                        <table class="table table-hovor table-bordered table-striped text-center">
                            <thead class="bg-primary">
                                <tr >
                                    <td colspan="3">{{toUp(which_one)}}盘
                                        <button v-if="$store.state.admin_type==3" class="pull-right save  btn btn-info" @click='edit_one()'>保存修改</button>
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
                                        <input type="text" class="form-control text-center" v-model="list[k].A">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].B">
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table class="table table-hovor table-bordered table-striped text-center">
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
                                <tr v-for="(v,k) in list" v-if='k>=4 && k<9'>
                                    <td >
                                        {{v.mark_b}}
                                    </td>
                                    <td style="font-size:12px;">
                                        <input type="text" class="form-control text-center" v-model="list[k].A" @change="change_1_9_digit(list[k].A,k)">
                                    </td>

                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].K">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].L">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].M">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].N">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].bet_limit.order_limit_min">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].bet_limit.order_limit_max">
                                    </td>
                                     <td>
                                      <input type="text" class="form-control text-center" v-model="list[k].bet_limit.expect_limit">
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
                                <tr v-for="(v,k) in list" v-if='k==9'>
                                    <td >
                                        {{v.mark_b}}
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].A">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].B">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].C">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].D">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].E">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].F">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].G">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].bet_limit.order_limit_min">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].bet_limit.order_limit_max">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].bet_limit.expect_limit">
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
                                <tr v-for="(v,k) in list" v-if='k>9'>
                                    <td >
                                        {{v.mark_b}}
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].A">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].B">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].C">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].D">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].E">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].bet_limit.order_limit_min">

                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].bet_limit.order_limit_max">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-center" v-model="list[k].bet_limit.expect_limit">
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
  name: "cqssc_odds",
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
      list:  [

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
    get_all_odds:function(){
        this.$http
        .get(
          `${this.api}/admin/ssc/odds`
        )
        .then(function(res) {
            if(res.data.status == 200)
            {   
                console.log(res.data);
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
        .put(`${this.api}/admin/ssc/odds/ssc_${this.which_one}`, {
          odds: this.list
        })
        .then(function(res) {
          // 
          if(res.data.status==200){
              console.log(res.data);
              this.$message(
                    {
                        message:res.data.msg,
                        center:true,
                        type:'success',
                    });
          }else{
            this.$message.error(res.data.msg);
          }
          // if (res.data.status == 201) {
          //   alert(res.data.msg);
          //   return;
          // }
        });
    },

    add_one: function()
    {
      this.$http
        .post(`${this.api}/admin/ssc/odds`, {
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
    delete_one: function(whichOne) {
      this.$http
        .delete(`${this.api}/admin/ssc/odds/ssc_${whichOne}`)
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
  created: function()
  {
    this.get_all_odds();
  },
  watch : {
      // "list[4].A":function (n,o) {
      //     for(let i=5;i<9;i++){
      //         this.list[i].A = n;
      //     }
      // },

  }

};

</script>

<style scoped>

.nav {
  margin-top: 15px;
  margin-bottom: 15px;
}
.table {

  font-size: 12px!important;
}
table tr td
{
  font-size: 12px!important;
}
.form-control
{
  font-size: 12px!important;
}
.text-danger
{
    font-size: 18px;
    font-weight: 700;
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
.form-control{
    padding:5px 3px;
}
</style>
