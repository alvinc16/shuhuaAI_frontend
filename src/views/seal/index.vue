<template>
  <div class="seal-container">
    <!-- 印章图片上传 -->
    <el-upload
      ref="upload"
      action="/SealUpload"
      list-type="picture-card"
      :auto-upload="false"
      :data="form"
      :headers="myHeaders"
      :http-request="uploadFile"
      :limit="1"
      style="margin-left : 40%; margin-top : 50px; padding-bottom : 50px"
    >
      <i slot="default" class="el-icon-plus" />
      <div slot="file" slot-scope="{file}">
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          alt=""
        >
        <span class="el-upload-list__item-actions">
          <!-- 预览图片 -->
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in" />
          </span>
          <!--  下载图片-->
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download" />
          </span>
          <!-- 删除图片 -->
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete" />
          </span>
        </span>
      </div>
    </el-upload>
    <!-- 印章配置表格 -->
    <el-form ref="form" :model="form" label-width="80px" style="margin-left : 30%">
      <!-- 书画作家 -->
      <el-form-item label="书画作家">
        <el-select v-model="form.authorname" placeholder="选取该作品的作家">
          <el-option
            v-for="item in option.authorname"
            :key="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- 算法模型 -->
      <el-form-item label="算法模型">
        <el-select v-model="form.model" placeholder="请选择算法模型">
          <el-option
            v-for="item in option.model"
            :key="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- 印章字体 -->
      <el-form-item label="印章字体">
        <el-select v-model="form.font" placeholder="请选择印章字体">
          <el-option
            v-for="item in option.font"
            :key="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- 印章尺寸 -->
      <el-form-item label="印章尺寸" style="width : 55%">
        <!-- <el-input v-model="form.sealsize" placeholder="请输入印章尺寸" /> -->
        <el-select v-model="form.sealsize" placeholder="请选择印章尺寸">
          <el-option
            v-for="item in option.sealsize"
            :key="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!--  印章结构-->
      <el-form-item label="印章结构" style="width : 55%">
        <!-- <el-input v-model="form.sealstruc" placeholder="请输入印章结构" /> -->
        <el-select v-model="form.sealstruc" placeholder="请选择印章结构">
          <el-option
            v-for="item in option.sealstruc"
            :key="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- 崩边权重 -->
      <el-form-item label="崩边权重" style="width : 55%">
        <el-input v-model="form.bengbian" placeholder="请输入印章的崩边权重（输入范围：0-100）" />
      </el-form-item>
      <!-- 印色权重 -->
      <el-form-item label="印色权重" style="width : 55%">
        <el-input v-model="form.sealcolor" placeholder="请输入印章的印色权重（输入范围：0-100）" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">开始识别</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <!-- 印章识别报告 -->
    <el-dialog
      title="识别报告"
      :visible.sync="reportVisible"
      width="50%"
      @close="reportClosed"
    >
      <!-- 印章识别报告 -> 内容主题区域 -->
      <el-row ref="report" v-model="reportFrom">
        <div>结果： {{ reportFrom.result }}</div>
        <div>准确度： {{ reportFrom.accuracy }}</div>
      </el-row>

      <!-- 印章识别报告 -> 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button> -->
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { sealUpload } from '@/api/seal'
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      myHeaders: {
        cookie: 'mycookie'
      },
      option: {
        authorname: [
          { value: '张大千' },
          { value: '王大壮' },
          { value: '张大万' },
          { value: '张千千' }
        ],
        model: [
          { value: 'CNN1' },
          { value: 'CNN2' },
          { value: 'CNN3' }
        ],
        font: [
          { value: 'null' },
          { value: '楷体' },
          { value: '小篆' },
          { value: '行楷' }
        ],
        sealsize: [
          { value: 'null' },
          { value: '一分' },
          { value: '四分' },
          { value: '五分' },
          { value: '七分' },
          { value: '八分' },
          { value: '九分' },
          { value: '一寸' }
        ],
        sealstruc: [
          { value: 'null' },
          { value: '圆章' },
          { value: '方章' }
        ]
      },
      form: {
        authorname: '',
        model: '',
        font: '',
        sealsize: '',
        sealstruc: '',
        bengbian: '',
        sealcolor: ''
      },
      // 识别报告是否打开
      reportVisible: false,
      // 识别报告内容
      reportFrom: {
        result: '真',
        accuracy: '80%'
      }
    }
  },
  created() {},
  mounted() {
  },
  methods: {
    handleRemove(file) {
      this.$refs.upload.clearFiles()
    },
    handlePictureCardPreview(file) {
      console.log('我点开了handlepicturecardpreview')
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    onSubmit() {
      // console.log(this.$refs.upload)
      this.$refs.upload.submit()
      // this.reportVisible = true
    },
    reportClosed() {
      this.reportVisible = false
    },
    async uploadFile(params) {
      console.log(params)
      const formdata = new FormData()
      const file = params.file
      const data = params.data
      formdata.append('file', file)
      formdata.append('authorname', data.authorname)
      formdata.append('model', data.model)
      formdata.append('font', data.font)
      formdata.append('sealsize', data.sealsize)
      formdata.append('sealstruc', data.sealstruc)
      formdata.append('bengbian', data.bengbian)
      formdata.append('sealcolor', data.sealcolor)
      console.log('this is formdata')
      console.log(formdata.get('file'))
      console.log(formdata.get('model'))
      console.log(formdata)

      const res = await sealUpload(formdata)
      console.log(res)

      // axios
      //   .post('/api/EmlUploadController/uploadFile?userName=' + this.userSO_json.userName, formdata, {
      //     headers: {
      //       // 头部信息
      //       'Content-Type': 'multipart/form-data',
      //       token: this.userSO_json.token
      //     }
      //   })
      //   .then(response => {
      //     this.$message({
      //       showClose: true,
      //       message: '恭喜你，邮件上传成功',
      //       type: 'success'
      //     })
      //   })
      //   .catch(error => {
      //     // 前端的token留在点击退出按钮那里删除，这里就只是提示过期
      //     if (error.message != '') {
      //       this.$message.warning('此封一模一样邮件你已经上传过了')
      //     } else {
      //       this.$message.warning('后端token过期，请重新登录')
      //     }
      //   })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
