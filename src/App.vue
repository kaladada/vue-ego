<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return{
      isRouterAlive: true
    }
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive=false;
      this.$nextTick(()=>{
        //执行到这里时DOM刷新完毕
        this.isRouterAlive=true
      })
    },
  },
  components: {},
};
</script>

<style>
</style>
