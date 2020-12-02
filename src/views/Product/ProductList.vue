<template>
  <el-table class="product-container" :data="tableData">
    <el-table-column
      show-overflow-tooltip
      prop="id"
      label="商品ID"
      width="100"
    ></el-table-column>
    <el-table-column
      show-overflow-tooltip
      prop="title"
      label="商品名称"
      width="200"
    ></el-table-column>
    <el-table-column
      show-overflow-tooltip
      prop="image"
      label="商品图片"
      width="100"
    ></el-table-column>
    <el-table-column
      show-overflow-tooltip
      prop="sellPoint"
      label="商品卖点"
      width="300"
    ></el-table-column>
    <el-table-column
      show-overflow-tooltip
      prop="price"
      label="商品价格"
      width="100"
    ></el-table-column>
    <el-table-column
      show-overflow-tooltip
      prop="num"
      label="商品数量"
      width="100"
    ></el-table-column>
    <el-table-column show-overflow-tooltip prop="descs" label="商品描述">
      <template slot-scope="scope">
        <div v-html="scope.row.descs"></div>
      </template>
    </el-table-column>
     <el-table-column label="操作" width='180px'>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
  </el-table>
</template>

<script>
import api from "../../api";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  
  methods: {
    http(page) {
      //启动loading加载
       const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

      api
        .getSelectTbItemAllByPage({
          page,
        })
        .then((res) => {
          loading.close();
          this.tableData=res.data
          // console.log(this.tableData);
        });
    },
     //编辑
    handleEdit(index, row) {
      // console.log(index, row);
      this.$bus.$emit('onEditor',row)

      
    },
    //删除
    handleDelete(index, row) {
      // console.log(index, row);
      api.deleteItemById({
        id:row.id
      }).then(res=>{
        if (res.data.status===200) {
          this.$message.success("删除成功");
          this.http(1)
        }else{
          this.$message.error("删除失败");
        }
      }).then(
          api.getTotal().then(res=>{
            console.log(res.data.result[0]["count(*)"]);
            this.$bus.$emit('newPage',res.data.result[0]["count(*)"])
          })
        )
    },
  },
  mounted() {
    this.http(1);
    this.$bus.$on('page',page=>{
        this.http(page)
    }); 
    this.$bus.$on('searchData',data=>{
      this.tableData=data
    });
    this.$bus.$on('onRef',data=>{
      this.http(1)
    })
  },
};
</script>

<style scoped>
</style>