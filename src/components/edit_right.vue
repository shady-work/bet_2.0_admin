<template>
      <div id="right">
        <div style="overflow: hidden">
          <el-tree style="float:left;"
            :data="menus"
            show-checkbox
            node-key="id"
            :default-checked-keys="checked_menus"
            ref="tree"
            highlight-current
            :props="defaultProps">
          </el-tree>
          <el-button class="btn btn-success" style="float:left;margin-left:20px;margin-top:20px;" @click="updateAuth" :loading="updateAuthStu">修改权限</el-button>
        </div>
      </div>
</template>

<script>
  export default
  {
      name:'edit_right',
      data()
      {
        let data =
        {
            user_id:0,
            menus: [],
            defaultProps: {
              children: 'child_menus',
              label: 'name'
            },
            checked_menus:[],
            updateAuthStu: false
        };
        return data;
      },
      methods:
      {
          get_auth_tree:function()
          {
            this.$http.get(`${this.api}/admin/authTree?user_id=${this.user_id}`)
              .then(function(res)
              {
                console.log(res.data);
              })
          },
        getMenus: function () {
          let _this = this;
          this.$http.get(`${this.api}/admin/authTree?user_id=${this.user_id}`,
            ).then(function (res) {
            let ret = res.data;
            _this.menus = ret.data.menus;
            _this.checked_menus = ret.data.checked;
          })
        },
        updateAuth: function () {
          this.updateAuthStu = true;
          let _this = this;
          let newAuth = this.$refs.tree.getCheckedKeys();
          this.$http.post(`${this.api}/admin/auth`, {
            user_id: this.user_id,
            auth_ids: newAuth
          }).then(function (res) {
            let ret = res.data;
            if (ret.status == 200) {
              _this.$notify({
                title: '成功',
                message: ret.msg,
                type: 'success'
              });
              _this.checked_menus = ret.data.checked
            } else {
              _this.$notify({
                title: '失败',
                message: ret.msg,
                type: 'error'
              })
            }
            _this.updateAuthStu = false
          })
        },

      },
      created()
      {
        //接收user_id
        this.user_id = this.$route.params.u_id?this.$route.params.u_id:window.sessionStorage.right_uid;
        window.sessionStorage.right_uid = this.user_id;
        this.getMenus();
      },
  }
</script>

<style scoped>
  #right{
    width:10%;
    /*margin-left: 20px;*/
  }
</style>
