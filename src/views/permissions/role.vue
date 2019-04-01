<template>
  <div class="">
    <div class="loading_box"
      v-loading="loading"
      v-show="loading"></div>
    <div class="head-wrap">
      <h2 class="SubCaption">角色列表</h2>
      <div class="btn-wrap">
        <el-button size="small"
          type="primary"
          @click='open'>新增角色</el-button>
        <el-button size="small"
          type="primary"
          @click='recover'>刷新</el-button>
      </div>
    </div>

    <!-- 角色列表 -->
    <div class="notice_item_body">
      <el-table class="m-t-lg"
        v-loading="loading"
        :data="rolelist"
        stripe>
        <el-table-column fixed
          prop="roleId"
          label="角色编号"
          width="100"
          align="center"></el-table-column>
        <el-table-column prop="roleName"
          label="角色名"
          width="100"
          align="center"></el-table-column>
        <el-table-column prop="module"
          label="模块权限"
          width="auto"
          align="center">
        </el-table-column>
        <el-table-column prop="createTime"
          label="创建时间"
          width="auto"
          align="center">
          <template slot-scope="scope">
            {{ scope.row.createTime | convert }}
          </template>
        </el-table-column>
        <el-table-column label="操作"
          width="auto"
          align="center">
          <template slot-scope="scope">
            <el-button @click="redact(scope.row.roleId, scope.row.modulars, scope.row.roleName, scope.row.interfaceIds)">编辑</el-button>
            <el-button @click="secondary_confirmation(scope.row.roleId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页 -->
      <el-pagination class="m-t"
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :current-page.sync="pageNum"
        :page-count="pageTotal"
        @current-change="PageChange">
      </el-pagination>
    </div>
    <!-- 弹框 -->
    <el-dialog :title="title"
      :visible.sync="dialogVisible"
      width="60%"
      @close="init">
      <el-form :model="Form"
        ref="Form"
        :label-position="'left'"
        label-width="100px">
        <el-form-item label="角色名称">
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="10">
            <el-form-item label="页面权限"
              prop="type">
              <el-tree :data="menuList"
                @node-click="print"
                @check="print"
                show-checkbox
                node-key="id"
                ref="tree"
                :default-checked-keys="[]"
                :props="defaultProps">
              </el-tree>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button type="danger"
          @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="Save">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除提示"
      :visible.sync="Dialog_stat"
      width="25%"
      center>
      <span>是否确定删除该角色</span>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="Dialog_stat = false">取 消</el-button>
        <el-button type="primary"
          @click="del">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { limitApi } from '../../api/index'
// import modulars from '../../dataTools/modulars.json'
// import interfacelist from '../../dataTools/interface.json'
import data from './data.js'

export default {
  data() {
    return {
      rolelist: [],
      dialogVisible: false,
      pageSize: 10,
      pageNum: 1,
      pageTotal: 0,
      loading: false,
      sign: true,
      mark: true, // 区别是新增还是修改
      centerDialogVisible: false,
      Form: {},
      id: '',
      roleId: '',
      title: '新增角色',
      Dialog_stat: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultProp: {
        children: 'children',
        label: 'remark'
      },
      InterFace: []
    }
  },
  computed: {
    menuList () {
      return data
    }
  },
  mounted () {
    // this.getRoleList()
    // this.SearchInterface()
  },
  methods: {
    secondary_confirmation (id) {
      this.id = id
      this.Dialog_stat = true
    },
    getRoleList () {
      this.loading = true;
      const para = {
        pageNum: this.pageNum
      }
      limitApi.getroleList({ params: para }).then(result => {
        let response = result.data;
        if (response.state == 'ok') {
          this.rolelist = response.data.list;
          this.pageTotal = response.data.totalPage;
          for (let i in this.rolelist) {
            if (this.rolelist[i].modulars.indexOf(',')) {
              this.rolelist[i].module = [... new Set(this.rolelist[i].modulars.split(',').map(v => {
                return this.modulars[v]
              }))].join('，')
            } else {
              this.rolelist[i].module = [... new Set(this.rolelist[i].modulars.map(v => {
                return this.modulars[v]
              }))].join('，')
            }
          }
        } else {
          this.$message.error(response.message)
        }
        this.loading = false
        this.sign = true
      })
    },
    redact (id, modulars, roleName, interfaceIds) {
      this.roleId = id
      this.mark = false
      this.title = '修改角色'
      this.dialogVisible = true
      this.Form.name = roleName

      this.$nextTick(_ => {
        this.$refs.tree.setCheckedKeys(modulars.split(','));
        this.$refs.InterFace_tree.setCheckedKeys(interfaceIds);
      })
    },
    del () {
      const para = {
        roleId: this.id
      }
      limitApi.delRole(para).then(result => {
        let response = result.data
        if (response.state == 'ok') {
          this.pageNum = 1
          this.getRoleList()
        } else {
          this.$message.error(response.message)
        }
        this.Dialog_stat = false
      })
    },
    open () {
      this.dialogVisible = true
      this.$nextTick(_ => {
        this.$refs.tree.setCheckedKeys([])
      })

      this.mark = true
    },
    Save() {
      var CheckKeys = this.$refs.tree.getCheckedKeys().filter(v => v)

      var InterFace_Key = this.$refs.InterFace_tree.getCheckedKeys().filter(v => v)
      console.log(CheckKeys, InterFace_Key);
      if (CheckKeys.length == 0) {
        this.$message({
          message: '请选择页面权限',
          type: 'warning'
        });
        return false
      }

      if (InterFace_Key.length == 0) {
        this.$message({
          message: '请选择接口权限',
          type: 'warning'
        });
        return false
      }

      // roleId 为1 是超级管理员
      // if (this.roleId == 1) {
      //   InterFace_Key.push(2)
      //   InterFace_Key.push(7)
      // }

      const para = {
        roleName: this.Form.name,
        modulars: CheckKeys.join(','),
        interfaceIds: InterFace_Key.join(','),
      }
      if (this.roleId) {
        para.roleId = this.roleId;
      }
      var option = this.mark ? limitApi.addRole(para) : limitApi.modifyRole(para)
      option.then(result => {
        let response = result.data;
        if (response.state == 'ok') {
          this.dialogVisible = false;
          this.pageNum = 1
          this.getRoleList()
          if (!this.mark) {
            this.RefreshCache()
          }
        } else {
          this.$message.error(response.message);
        }
      })
    },
    init() {
      this.Form.name = ''
      this.roleId = ''
    },
    PageChange(currentPage) {
      this.pageNum = currentPage
      if (!this.sign) {
        return false
      }
      this.$nextTick(_ => {
        this.getRoleList()
      })
    },
    recover() {
      this.pageNum = 1
      this.sign = false
      this.$nextTick(_ => {
        this.getRoleList()
        this.refreshCach()
      })
    },
    print() {
      let Original_data = this.$refs.tree.getCheckedKeys()
      console.log(Original_data)
    },
    refreshCach() {
      limitApi.RefreshCache().then(result => {
        //console.log(result)
      })
    },
    SearchInterface() {
      const para = {
        pageNum: 1
      }
      limitApi.InterfaceSearch({ params: para }).then(result => {
        //console.log(result)
        this.InterFace = result.data.data;
        // this.InterFace.map(v => {
        //   if(v.remark == '管理员账号接口模块' || v.remark == '角色相关接口（添加，修改，删除，查询）') {
        //     v.disabled = true
        //   }
        // })
      })
    },
    RefreshCache() {
      limitApi.RefreshCache().then(result => {
        //console.log(result)
      })
    },
    Calc() {
      let CheckKeylist = this.$refs.tree.getCheckedKeys().filter(v => v)
      this.$refs.InterFace_tree.setCheckedKeys([])
      console.log(CheckKeylist)

      let CalcVal = CheckKeylist.map(v => {
        return this.interfacelist[v]
      })
      let Original_data = this.$refs.InterFace_tree.getCheckedKeys()
      //let Merging_data = Original_data.concat(CalcVal)
      let Merging_data = CalcVal
      // 产品页面对应销量模块(14)和产品模块(19)
      if (CheckKeylist.indexOf(4) > -1) {
        Merging_data.push(14)
      }
      //console.log(Merging_data.map(v => +v))
      //console.log([...new Set(Merging_data.map(v => +v))])
      this.$refs.InterFace_tree.setCheckedKeys([...new Set(Merging_data.map(v => +v))]);
    }
  }
}
</script>
