<template>
  <div class="">
    <div class="loading_box" v-loading="loading" v-show="loading"></div>
      <div class="head-wrap">
        <h2 class="SubCaption">管理员列表</h2>
        <div class="btn-wrap">
          <el-button size="small" type="primary" @click='open'>新增管理员</el-button>
          <el-button size="small" type="primary" @click='recover'>刷新</el-button>
        </div>
      </div>

      <!-- 管理员列表 -->
      <div class="notice_item_body">
        <el-table class="m-t-lg"
          v-loading="loading"
          :data="ManageList"
          stripe>
          <el-table-column fixed prop="adminId" label="账号编号" width="80" align="center"></el-table-column>
          <el-table-column prop="roleId" label="角色编号" width="80" align="center"></el-table-column>
          <el-table-column prop="account" label="账号" width="90" align="center"></el-table-column>
          <el-table-column prop="roleName" label="角色名" width="auto" align="center"></el-table-column>
          <el-table-column prop="remark" label="备注" width="auto" align="center"></el-table-column>
          <el-table-column prop="module" label="模块权限" width="auto" align="center"></el-table-column>
          <el-table-column prop="addTime" label="创建时间" width="auto" align="center">
            <template slot-scope="scope">
              {{ scope.row.addTime | convert }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="auto" align="center" >
            <template slot-scope="scope" v-if='scope.row.adminId != 1'>
              <el-button @click="redact(scope.row.adminId, scope.row.roleId, scope.row.account, scope.row.remark)">编辑</el-button>
              <el-button @click="secondary_confirmation(scope.row.adminId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页 -->
        <el-pagination
          class="m-t"
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
      <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" @close='init'>
        <el-form :label-position="'left'" label-width="100px">
          <el-form-item label="账号">
            <el-input v-model="account"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="password"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="remark"></el-input>
          </el-form-item>
          <el-form-item label="相关角色">
            <el-select v-model="roleId" clearable placeholder="请选择">
              <el-option
                v-for="item in rolelist"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="Save">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="删除提示"
        :visible.sync="Dialog_stat"
        width="30%"
        center>
        <span>是否确定删除该管理员</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="Dialog_stat = false">取 消</el-button>
          <el-button type="primary" @click="del">确 定</el-button>
        </span>
      </el-dialog>
 </div>
</template>


<script>
// import { limitApi } from '../../api/index'
// import modulars from '../../dataTools/modulars.json'
// import md5 from 'js-md5';

export default {
  data() {
    return {
      rolelist: [],
      ManageList: [],
      dialogVisible: false,
      pageSize: 10,
      pageNum: 1,
      pageTotal: 0,
      loading: true,
      mark: true,
      centerDialogVisible: false,
      account: '',
      password: '',
      remark: '',
      roleId: '',
      adminId: '',
      modulars: modulars,
      title: '新增管理员',
      pickerOptions1: {
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
      releaseType: '',
      release_time: '',
      id: '',
      Dialog_stat: false,
    }
  },
  mounted() {
    //this.getManageList()
    //this.getRoleList()
  },
  methods: {
    getRoleList() {
      this.loading = true;
      const para = {
        pageSize: 10000
      }
      limitApi.getroleList(para).then(result => {
        let response = result.data;
        if(response.state == 'ok') {
          this.rolelist = response.data.list;
          for(let i in this.rolelist) {
            if(this.rolelist[i].roleName === '超级管理员') {
              this.rolelist[i].disabled = true
            }
          }
        } else{
          this.$message.error(response.message);
        }
        this.loading = false;
      })
    },
    getManageList() {
      this.loading = true;
      const para = {
        pageNum: this.pageNum
      }
      limitApi.getManageList({params: para}).then(result => {
        let response = result.data;
        this.ManageList = response.list;
        this.pageTotal = response.totalPage;
        // this.ManageList = response.data.list;   只在测试服
        // this.pageTotal = response.data.totalPage;
        for(let i in this.ManageList) {
          if(this.ManageList[i].modulars) {
            this.ManageList[i].module = [... new Set(this.ManageList[i].modulars.split(',').map(v => {
              return this.modulars[v]
            }))].join('，')
          }
        }
        // if(response.state == 'ok') {

        // } else{
        //   this.$message.error(response.message);
        // }
        this.loading = false;
      })
    },
    redact(adminId, roleId, account, remark) {
      this.adminId = adminId,
      this.roleId = roleId,
      this.mark = false;
      this.title = '修改管理员'
      this.dialogVisible = true;
      this.account = account;
      this.remark = remark;
      this.getRoleList()
    },
    secondary_confirmation(id) {
      this.id = id
      this.Dialog_stat = true
    },
    del() {
      const para = {
        adminId: this.id
      }
      limitApi.delManage(para).then(result => {
        let response = result.data;
        if(response.state == 'ok') {
          this.pageNum = 1
          this.Dialog_stat = false
          this.getManageList()
        }
      })
    },
    open() {
      this.dialogVisible = true;
      this.getRoleList()
      this.mark = true
    },
    Save() {
      if(!this.account){
        this.$message.error('请填写管理员账号');
        return false;
      }
      // 新增账号时要添加，修改可不填
      if(!this.password && this.mark) {
        this.$message.error('请填写管理员密码');
        return false;
      }

      if(!this.roleId){
        this.$message.error('请填写角色id');
        return false;
      }
      // 防止重复提交
      // if(this.sign) {
      //   return false;
      // }
      this.sign = true
      const para = {
        account: this.account,
        roleId: this.roleId,
        remark: this.remark
      }
      if(this.password) {
        para.password = md5(this.password)
      }
      if(!this.mark) {
        para.adminId = this.adminId
      }
      var option = this.mark ? limitApi.addManage(para) : limitApi.modifyManage(para)
      option.then(result => {
        let response = result.data;
        if(response.state == 'ok') {
          this.dialogVisible = false;
          this.pageNum = 1
          this.getManageList()
        }
      })
    },
    init() {
      this.roleId = ''
      this.account = ''
      this.remark = ''
      this.password = ''
      this.adminId = ''
      this.sign = false
    },
    PageChange(currentPage) {
      console.log(currentPage)
      this.pageNum = currentPage
      this.$nextTick(_ => {
        this.getManageList()
      })
    },
    recover() {
      this.pageNum = 1
      this.$nextTick(_ => {
        this.getManageList()
        this.getRoleList()
      })
    }
  },
}
</script>
