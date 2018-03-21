<template>
   <div id='odds'>

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
                                <input type="text" class="form-control" v-model="list[k].e1">
                            </td>
                            <td>
                              <input type="text" class="form-control" v-model="list[k].e2">
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table class="table table-hovor table-bordered table-striped text-center">
                    <thead class="bg-primary">
                        <tr class="h4">
                            <td width="150">特码/球序</td>
                            <td v-for="(v,k,index) in list[4]" v-if='index<14'>特码{{index}}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td >赔率</td>
                            <td v-for="(v,k,index) in list[4]" v-if='index<14'>
                                <input type="text" class="form-control"  v-model="list[4]['e' + (index+1)]" >
                            </td>
                        </tr>
                    </tbody>

                    <thead class="bg-primary">
                      <tr class="h4">
                        <td width="150">特码/球序</td>
                        <td v-for="(v,k,index) in list[4]" v-if='index>=14&&index<28'>特码{{index}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td >赔率</td>
                        <td v-for="(v,k,index) in list[4]" v-if='index>=14&&index<28'>
                          <input type="text" class="form-control"  v-model="list[4]['e' + (index+1)]" >
                        </td>
                      </tr>
                    </tbody>
                </table>

                <table class="table table-hovor table-bordered table-striped text-center">
                    <thead class="bg-primary">
                    <tr class="h4">
                      <td width="150">特码/球序</td>
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
                      <td v-for="(v,k,index) in list[5]" v-if='index<10'>
                        <input type="text" class="form-control"  v-model="list[5]['e' + (index+1)]" >
                      </td>
                      <td >
                        <input type="text" class="form-control"  v-model="list[7]['e1']" >
                      </td>
                    </tr>
                    </tbody>
                  </table>


              <table class="table table-hovor table-bordered table-striped text-center">
                <thead class="bg-primary">
                <tr class="h4">
                  <td width="150">波色</td>
                  <td>红波</td>
                  <td>绿波</td>
                  <td>蓝波</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td >赔率</td>
                  <td v-for="(v,k,index) in list[5]" v-if='index<3'>
                    <input type="text" class="form-control"  v-model="list[6]['e' + (index+1)]" >
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
      all_odds:[],
      list:   [
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
      ]//end list
    };
  },
  methods: {
    get_all_odds:function(){
        this.$http
        .get(
          `${this.api}/admin/cake/odds`
        )
        .then(function(res) {
            console.log(res.data);
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
        .put(`${this.api}/admin/cake/odds/cake_${this.which_one}`, {
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
        .post(`${this.api}/admin/cake/odds`, {
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
        .delete(`${this.api}/admin/cake/odds/cake_${whichOne}`)
        .then(function(res) {
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
  input
  {
    font-size: 12px;
  }
.form-control
{
  padding: 0;
  text-align: center;
}
</style>
