<template>
   <div id='cqssc_odds'>
       

        <div class="row">
            <div class="col-md-2">
                <table class="table table-hovor table-bordered table-striped text-center">
                            <thead class="bg-primary">
                                <tr >
                                    <td width="130" style='line-height:30px;'>盘口名称</td>
                                    <td style='line-height:30px;'>操作  
                                        <button class="btn-sm btn btn-warning pull-right" @click='add_one()'>+</button>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                 <tr  v-for="(v,k) in final_list" >
                                     <td :class="active_array[k]?'text-danger':''">
                                         {{v}}盘
                                     </td>
                                     <td>
                                          <button class="btn btn-danger btn-sm pull-left mr10 edit" @click='delete_one(v)' v-if="v != 'a'">删除</button>
                                          <button class="btn btn-danger btn-sm pull-left mr10 edit"   v-if="v == 'a'" disabled readonly>删除</button>
                                          <button class="btn btn-info pull-left btn-sm    edit" @click='choose_one(v,k)'>查看</button>
                                     </td>
                                 </tr>
                            </tbody>
                        </table>
            </div>
            <div class="col-md-10">
                                    
                        <table class="table table-hovor table-bordered table-striped text-center">
                            <thead class="bg-primary">
                                <tr class="h4">
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
                                <tr class="h4">
                                    <td width="150">特码/球序</td>
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
                            <tbody>
                                <tr v-for="(v,k) in list" v-if='k>=4 && k<9'>
                                    <td >
                                        {{v.mark_b}}
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].A">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].B">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].C">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].D">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].E">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].F">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].G">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].H">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].I">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].J">
                                    </td>
                                </tr>
                            </tbody>
                        </table>


                        <table class="table table-hovor table-bordered table-striped text-center">
                            <thead class="bg-danger">
                                <tr class="h4">
                                    <td width="150">总和、龙虎</td>
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
                                <tr v-for="(v,k) in list" v-if='k==9'>
                                    <td >
                                        {{v.mark_b}}
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].A">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].B">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].C">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].D">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].E">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].F">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].G">
                                    </td>

                                </tr>
                            </tbody>
                        </table>


                        <table class="table table-hovor table-bordered table-striped text-center">
                            <thead class="bg-success">
                                <tr class="h4">
                                    <td width="150">总和、龙虎</td>
                                    <td>豹子</td>
                                    <td>顺子</td>
                                    <td>对子</td>
                                    <td>半顺</td>
                                    <td>杂六</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(v,k) in list" v-if='k>9'>
                                    <td >
                                        {{v.mark_b}}
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].A">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].B">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].C">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].D">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="list[k].E">
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
      list: [
        {
          id: 1,
          mark_a: "返点",
          mark_b: "总代",
          A: "0.0011",
          B: "0.0012",
          C: "0.0010",
          D: "0.0000",
          E: "0.0000",
          F: "0.0000",
          G: "0.0000",
          H: "0.0000",
          I: "0.0000",
          J: "0.0000",
          K: null,
          L: null,
          M: null,
          N: null,
          O: null
        },
        {
          id: 2,
          mark_a: "返点",
          mark_b: "分代",
          A: "0.0010",
          B: "0.0020",
          C: "0.0000",
          D: "0.0000",
          E: "0.0000",
          F: "0.0000",
          G: "0.0000",
          H: "0.0000",
          I: "0.0000",
          J: "0.0000",
          K: null,
          L: null,
          M: null,
          N: null,
          O: null
        },
        {
          id: 3,
          mark_a: "返点",
          mark_b: "推广",
          A: "0.0010",
          B: "0.0030",
          C: "0.0000",
          D: "0.0000",
          E: "0.0000",
          F: "0.0000",
          G: "0.0000",
          H: "0.0000",
          I: "0.0000",
          J: "0.0000",
          K: null,
          L: null,
          M: null,
          N: null,
          O: null
        },
        {
          id: 4,
          mark_a: "返点",
          mark_b: "会员",
          A: "0.0210",
          B: "0.0000",
          C: "0.0000",
          D: "0.0000",
          E: "0.0000",
          F: "0.0000",
          G: "0.0000",
          H: "0.0000",
          I: "0.0000",
          J: "0.0000",
          K: null,
          L: null,
          M: null,
          N: null,
          O: null
        },
        {
          id: 5,
          mark_a: "特码",
          mark_b: "第一球",
          A: "9.7150",
          B: "9.7150",
          C: "9.7150",
          D: "9.7150",
          E: "9.7150",
          F: "9.7150",
          G: "9.7150",
          H: "9.7150",
          I: "9.7150",
          J: "9.7150",
          K: "1.9430",
          L: "1.9430",
          M: "1.9430",
          N: "1.9430",
          O: null
        },
        {
          id: 6,
          mark_a: "特码",
          mark_b: "第二球",
          A: "9.7150",
          B: "9.7150",
          C: "9.7150",
          D: "9.7150",
          E: "9.7150",
          F: "9.7150",
          G: "9.7150",
          H: "9.7150",
          I: "9.7150",
          J: "9.7150",
          K: "1.9430",
          L: "1.9430",
          M: "1.9430",
          N: "1.9430",
          O: null
        },
        {
          id: 7,
          mark_a: "特码",
          mark_b: "第三球",
          A: "9.7150",
          B: "9.7150",
          C: "9.7150",
          D: "9.7150",
          E: "9.7150",
          F: "9.7150",
          G: "9.7150",
          H: "9.7150",
          I: "9.7150",
          J: "9.7150",
          K: "1.9430",
          L: "1.9430",
          M: "1.9430",
          N: "1.9430",
          O: null
        },
        {
          id: 8,
          mark_a: "特码",
          mark_b: "第四球",
          A: "9.7150",
          B: "9.7150",
          C: "9.7150",
          D: "9.7150",
          E: "9.7150",
          F: "9.7150",
          G: "9.7150",
          H: "9.7150",
          I: "9.7150",
          J: "9.7150",
          K: "1.9430",
          L: "1.9430",
          M: "1.9430",
          N: "1.9430",
          O: null
        },
        {
          id: 9,
          mark_a: "特码",
          mark_b: "第五球",
          A: "9.7150",
          B: "9.7150",
          C: "9.7150",
          D: "9.7150",
          E: "9.7150",
          F: "9.7150",
          G: "9.7150",
          H: "9.7150",
          I: "9.7150",
          J: "9.7150",
          K: "1.9430",
          L: "1.9430",
          M: "1.9430",
          N: "1.9430",
          O: null
        },
        {
          id: 10,
          mark_a: "两面",
          mark_b: "总和、龙虎",
          A: "1.9430",
          B: "1.9430",
          C: "1.9430",
          D: "1.9430",
          E: "1.9430",
          F: "1.9430",
          G: "9.6700",
          H: null,
          I: null,
          J: null,
          K: null,
          L: null,
          M: null,
          N: null,
          O: null
        },
        {
          id: 11,
          mark_a: "两面",
          mark_b: "前三",
          A: "96.7000",
          B: "16.1170",
          C: "3.5810",
          D: "2.6860",
          E: "3.2230",
          F: null,
          G: null,
          H: null,
          I: null,
          J: null,
          K: null,
          L: null,
          M: null,
          N: null,
          O: null
        },
        {
          id: 12,
          mark_a: "两面",
          mark_b: "中三",
          A: "96.7000",
          B: "16.1170",
          C: "3.5810",
          D: "2.6860",
          E: "3.2230",
          F: null,
          G: null,
          H: null,
          I: null,
          J: null,
          K: null,
          L: null,
          M: null,
          N: null,
          O: null
        },
        {
          id: 13,
          mark_a: "两面",
          mark_b: "后三",
          A: "96.7000",
          B: "16.1170",
          C: "3.5810",
          D: "2.6860",
          E: "3.2230",
          F: null,
          G: null,
          H: null,
          I: null,
          J: null,
          K: null,
          L: null,
          M: null,
          N: null,
          O: null
        }
      ] //end list
    };
  },
  methods: {
    get_all_odds:function(){
        this.$http
        .get(
          `${this.api}/admin/ssc/odds`
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
          if (res.data.status == 201) {
            alert(res.data.msg);
            return;
          }
        });
    },

    add_one: function() {
      this.$http
        .post(`${this.api}/admin/ssc/odds`, {
          odds: this.list
        })
        .then(function(res) {
          if (res.data.status == 200) {
            alert("添加成功");
            this.$router.go(0);
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
            alert("删除成功");
            this.$router.go(0);
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
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
}
.text-danger
{
    font-size: 18px;
    font-weight: 700;
}
</style>
