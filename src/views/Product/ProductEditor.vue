<template>
  <el-dialog
    title="编辑商品"
    :visible.sync="dialogEditorVisible"
    width="80%"
    :before-close="handleClose"
  >
    <el-form
      label-width="70px"
      :label-position="labelPosition"
      :model="addForm"
      ref="ruleForm"
    >
      <el-form-item label="商品类目">
        <el-button
          class="category"
          type="primary"
          @click="dialogCategoryVisible = true"
          >类目选择</el-button
        >
        <span class="category">{{ treeData.name }}</span>
        <el-dialog
          width="50%"
          title="类目选择"
          :visible.sync="dialogCategoryVisible"
          append-to-body
        >
          <ProductTree />
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="getCategoryDataHandle"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点" prop="sellPoint">
        <el-input v-model="addForm.sellPoint"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="addForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="num">
        <el-input v-model="addForm.num"></el-input>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-button
          class="category"
          type="primary"
          @click="dialogUploadVisible = true"
          >图片上传</el-button
        >
        <span class="category">{{ upLoadData.url }}</span>
        <el-dialog
          width="50%"
          title="上传图片"
          :visible.sync="dialogUploadVisible"
          append-to-body
          ><ProductUpLoad @upload="getUpload" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品描述">
        <ProductWangEditor @onEditor="getEdiitor" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogEditorVisible = false">取 消</el-button>
      <el-button type="primary" @click="sureSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ProductWangEditor from "./ProductWangEditor";
import ProductUpLoad from "./ProductUpLoad";
import ProductTree from "./ProductTree";
import api from "../../api";
export default {
  name: "ProductEditor",
  data() {
    return {
      dialogEditorVisible: false,
      dialogUploadVisible: false,
      dialogCategoryVisible: false,
      labelPosition: "left",
      treeData: {},
      upLoadData: {},
      currentId: 0,
      editorData: "",
      addForm: {
        name: "",
        sellPoint: "",
        price: "",
        num: "",
      },
    };
  },
  mounted() {
    //编辑显示
    this.$bus.$on("onEditor", (row) => {
      this.dialogEditorVisible = true;
      this.currentId = row.id;
      api
        .preUpdateItem({
          id: row.id,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            let dataArr = res.data.result[0];
            console.log(dataArr);
            this.treeData = {
              name: res.data.cid,
            };
            (this.addForm = {
              name: dataArr.title,
              sellPoint: dataArr.sellPoint,
              price: dataArr.price,
              num: dataArr.num,
            }),
              (this.editorData = dataArr.descs);
            this.upLoadData = {
              url: dataArr.image,
            };
          } else {
            this.$message.error("预更新失败");
          }
        });
    });
  },
  methods: {
    //修改提交
    sureSubmit() {
      api
        .updateTbItem({
          id: this.currentId,
          title: this.addForm.name,
          cid: this.treeData.cid,
          sellPoint: this.addForm.sellPoint,
          price: this.addForm.price,
          num: this.addForm.num,
          desc: this.editorData,
          image: this.upLoadData.url,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.dialogEditorVisible = false;
            this.$bus.$emit("onRef", true);
          } else {
            this.$message.error("修改失败");
          }
        });
    },
    getCategoryDataHandle() {
      this.dialogCategoryVisible = false;
    },

    handleClose() {
      this.dialogEditorVisible = false;
    },
    getUpload(data) {
      // console.log(data);
      this.upLoadData = data;
      this.dialogUploadVisible = false;
    },
    getEdiitor(data) {
      console.log(data);
      this.editorData = data;
    },
  },
  components: {
    ProductWangEditor,
    ProductUpLoad,
    ProductTree,
  },
};
</script>

<style scoped lang="less">
.category {
  float: left;
  margin-right: 20px;
}
.upload-img {
  width: 400px;
  float: left;
}
</style>