<template>
    <div>
        <div class="col-md-10">

            <div id="search">

                <div class="expect-input">
                    <el-input
                            placeholder="请输入期号"
                            v-model="expect"
                            clearable>
                    </el-input>
                </div>

                <div class="expect-input">
                    <el-date-picker
                            v-model="value1"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions1">
                    </el-date-picker>
                </div>
                <el-button type="success" class="pull-left mr10" @click="get_all_odds()">查找</el-button>

            </div>

            <h4 style="margin-top: 8px;margin-bottom: 14px;">
                总条数：<span class="label label-default">{{sum.sum_bet_num}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                总金额：<span class="label" style="color:blue">{{sum.sum_bet_money}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                结算后盈亏：<span class="label" style="color:green" v-if="sum.sum_open_win>0">{{sum.sum_open_win}}</span>
                <span class="label" style="color:red" v-else="sum.sum_open_win<0">{{sum.sum_open_win}}</span>

            </h4>


            <table class="table table-hovor table-bordered table-striped text-center">
                <thead class="bg-primary">
                <tr >
                    <td width="130" rowspan="10">玩法</td>

                    <td>赔率</td>
                    <td width="100">下注总条数</td>
                    <td >下注总金额</td>
                    <td>盈亏</td>

                </tr>
                </thead>
                <tbody>
                <tr v-for="(v,k) in all_odds" >
                    <td style="text-align: right">
                        {{v.mark_a}} 【{{v.mark_b}}】
                    </td>

                    <td>
                        {{v.rate}}
                    </td>
                    <td>
                        {{v.bet_num}}
                    </td>
                    <td>
                        {{v.bet_money}}
                    </td>
                    <td>
                        {{v.sum_win}}
                    </td>
                </tr>
                </tbody>
            </table>


            <br>
            <br>
            <br>
            <br>
            <br>
        </div>
    </div>
</template>

<script>
    export default {
        name: "egg_chart",
        data(){
            return{
                all_odds:[],
                sum:'',
                expect:'',//按期数查找数据
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                value1:'',//按日期查找数据
            };
        },
        created()
        {
            this.get_all_odds();
        },
        methods:{
            get_all_odds:function(){

                let data =
                    {
                        params:{}

                    };
                if(this.value1)
                {
                    data.params.range = this.value1;
                }
                if(this.expect)
                {
                    if(isNaN(Number(this.expect)))
                    {
                        this.$message.error('请输入正确期号');
                        return;
                    }
                    data.params.expect = this.expect;
                }

                this.$http.get(`${this.api}/admin/egg/markb`,data)
                    .then(function(res) {
                        if(res.data.status == 200)
                        {
                            console.log(res.data);
                            this.all_odds = res.data.data.list;
                            this.sum=res.data.data.summary;
                        }
                        else
                        {
                            this.$message.error(res.data.msg);
                        }
                    });
            },
        },
    }
</script>

<style scoped>
    .col-md-10{
        margin-left:10px;
        margin-top: 5px;
    }
    #search
    {
        height:40px;
        width: 1200px;
        margin-top: 20px;
        margin-bottom: 26px;
    }
    .expect-input
    {
        width: 220px;
        float: left;
        margin-right: 15px;
    }
</style>