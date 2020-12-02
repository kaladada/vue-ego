<template>
  <div class="params-container">
    <element-table :tableData="tableData" :cell-style="cellStyle">
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="规格参数ID"
        width="100"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="itemCatId"
        label="CID"
        width="100"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="paramData"
        label="规格参数"
      ></el-table-column>
    </element-table>
  </div>
</template>

<script>
import api from '../../api'
export default {
  name: "parmas",
  data() {
    return {
      tableData: [],
    };
  },
  mounted(){
    api.selectItemParamAll().then(res=>{
        console.log(res.data);
        this.tableData=res.data.result
    })
  },
  methods: {
    cellStyle() {},
  },
};
</script>

