<template>
  <div>
    <!-- 搜索区 -->
    <el-row style="margin-top: 10px">
      <el-col :span="6" style="padding-right: 20px; padding-left: 5px">
        <el-input v-model="input" placeholder="请输入要查询的用户id" />
      </el-col>
      <el-col :span="1" style="margin-right : 20px">
        <el-button type="primary" @click="getUser(input)">搜索</el-button>
      </el-col>
      <el-col :span="1" style="margin-right : 20px">
        <el-button type="success" @click="getAllUser()">刷新</el-button>
      </el-col>
      <el-col :span="1">
        <el-button type="warning" @click="handleAddUser">添加</el-button>
      </el-col>
    </el-row>
    <el-row />
    <!-- 用户列表区域 -->
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="用户ID"
        width="100px"
      >
        <template slot-scope="scope">
          <span style="margin-left: 20px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户账号"
        width="180"
      >
        <template slot-scope="scope">
          <span style="margin-left: 0px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户角色"
        width="180"
      >
        <template slot-scope="scope">
          <span style="margin-left: 0px">{{ scope.row.role }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="用户邮件"
        width="180"
      >
        <template slot-scope="scope">
          <span style="margin-left: 0px">{{ scope.row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="用户电话"
        width="180"
      >
        <template slot-scope="scope">
          <span style="margin-left: 0px">{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="showEditDialog(scope.row.id)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="removeUserById(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区 -->
    <!-- <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
    /> -->
    <!-- 添加用户提示区 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 用户提示区 -> 内容主题区域 -->
      <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" />
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile" />
        </el-form-item>
      </el-form>

      <!-- 用户提示区 -> 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 内容主体 -->
      <el-form
        ref="editUserFormRef"
        :model="editUserForm"
        :rules="editUserFormRules"
        label-width="70px"
      >
        <el-form-item label="用户名">
          <el-input v-model="editUserForm.username" disabled />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email" />
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editUserForm.mobile" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser()">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import { getAllUser, getUser, addUser, deleteUser, updateUser } from '@/api/user'

// const defaultUser = {
//   username: '',
//   roles: '',
//   mobile: '',
//   email: ''
// }

export default {
  data() {
    // 验证邮箱规则
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback()
      }
      callback(new Error('请输入合法邮箱'))
    }
    // 验证手机号规则
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/
      if (regMobile.test(value)) {
        return callback()
      }
      // 返回一个错误提示
      callback(new Error('请输入合法的手机号码'))
    }
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userlist: [],
      total: 0,
      input: '',
      tableData: [{
        id: '1',
        username: 'clientone',
        role: 'client'
      }, {
        id: '2',
        username: 'clienttwo',
        role: 'client'
      }, {
        id: '3',
        username: 'clientthree',
        role: 'client'
      }, {
        id: '4',
        username: 'clientfour',
        role: 'client'
      }],
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        role: 'client',
        email: '',
        mobile: ''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名的长度在3-10个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码的长度在6-15个字符之间', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 修改用户
      editDialogVisible: false,
      editUserForm: {},
      // 编辑用户表单验证
      editUserFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    this.getAllUser()
  },
  methods: {
    // 获取用户列表
    async getAllUser() {
      const res = await getAllUser()
      this.tableData = res.data
    },
    // 获取单个用户，实现搜索功能
    async getUser(id) {
      const { data } = await getUser(id)
      this.tableData = data
    },
    // 点击添加按钮，显示添加用户弹窗
    handleAddUser() {
      this.addDialogVisible = true
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮，添加新用户
    async addUser() {
      const { data } = await addUser(this.addForm)
      console.log('zhegeshi')
      console.log(data)
      this.$message.success('添加用户成功！')
      // 隐藏添加用户对话框
      this.addDialogVisible = false
      this.getAllUser()
    },
    // 点击编辑按钮
    async showEditDialog(id) {
      const res = await getUser(id)
      // if (res.meta.status !== 200) {
      //   return this.$message.error('查询用户信息失败！')
      // }
      this.editUserForm = res.data[0]
      console.log(this.editUserForm)
      this.editDialogVisible = true
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editUserFormRef.resetFields()
    },
    // 编辑用户数据
    async updateUser() {
      const res = await updateUser(this.editUserForm)
      console.log(res)
      this.editDialogVisible = false
      this.$message.success('更新用户信息成功！')
      this.getAllUser()
    },
    // 删除用户
    async removeUserById(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      // 点击确定 返回值为：confirm
      // 点击取消 返回值为： cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const data = await deleteUser(id)
      // console.log(data)
      if (data.meta.code !== 200) return this.$message.error('删除用户失败！')
      this.$message.success('删除用户成功！')
      this.getAllUser()
    }
  }
}
</script>
