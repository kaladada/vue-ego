<template>
  <el-dialog
    title="添加商品"
    :visible.sync="dialogAddVisible"
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
      <el-button @click="dialogAddVisible = false">取 消</el-button>
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
  name: "ProductAdd",
  data() {
    return {
      dialogAddVisible: false,
      dialogUploadVisible: false,
      dialogCategoryVisible: false,
      labelPosition: "left",
      treeData: {},
      upLoadData: {},
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
    this.$bus.$on("productAddVisible", (flag) => {
      this.dialogAddVisible = flag;
    });
    this.$bus.$on("treeData", (data) => {
      this.treeData = data;
    });
  },
  methods: {
    sureSubmit() {
      api
        .insertTbItem({
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
            this.$bus.$emit("onRef", true);
            this.dialogAddVisible = false;
          } else {
            this.$message.error("添加失败");
          }
        })
        .then(
          api.getTotal().then((res) => {
            console.log(res.data.result[0]["count(*)"]);
            this.$bus.$emit("newPage", res.data.result[0]["count(*)"]);
          })
        );
    },
    getCategoryDataHandle() {
      this.dialogCategoryVisible = false;
    },

    handleClose() {
      this.dialogAddVisible = false;
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