<template>
  <div class="content-info">
    <el-table :data="tableData">
      <el-table-column prop="pid" label="PID" width="100"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="300"> </el-table-column>
      <el-table-column prop="image" label="图片" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="url" label="网址" show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "../../api";
export default {
  name: "ContentInfo",
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.$bus.$on("contentInfo", (node) => {
      api
        .selectTbContentAllByCategoryId({
          pid: node.pid,
        })
        .then((res) => {
          this.tableData = res.data.result;
        });
    });
  },
  methods: {},
};
</script>

<style>
</style>