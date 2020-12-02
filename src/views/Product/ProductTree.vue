<template>
  <el-tree
    highlight-current
    :props="defaultProps"
    :load="loadNode"
    lazy
    @node-click="handleNodeClick"
  >
  </el-tree>
</template>

<script>
import api from "../../api";
export default {
  name: "ProductTree",
  data() {
    return {
      defaultProps: {
        label: "name",
        children: "children",
      },
    };
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        api.selectItemCategoryByParentId().then((res) => {
          if (res.data.status === 200) {
            return resolve(res.data.result);
          } else {
            return resolve([]);
          }
        });
      }
      if (node.level >= 1) {
        api
          .selectItemCategoryByParentId({ id: node.data.cid })
          .then((res) => {
            if (res.data.status === 200) {
              return resolve(res.data.result);
            } else {
              return resolve([]);
            }
          })
          .catch((error) => {
            resolve([]);
          });
      }
    },
    handleNodeClick(data) {
        console.log(data);
        this.$bus.$emit('treeData',data)
    },
  },
};
</script>

<style>
</style>