<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item index="/"
      ><i class="el-icon-menu"></i>{{ $t("message.project") }}</el-menu-item
    >
    <el-menu-item index="/params"
      ><i class="el-icon-document"></i>{{ $t("message.params") }}</el-menu-item
    >
    <el-menu-item index="/content"
      ><i class="el-icon-setting"></i>{{ $t("message.content") }}</el-menu-item
    >
    <div class="user">
      <router-link to="/ucenter" tag="span" class="user-name">{{
        user.username
      }}</router-link>
      <el-button class="logout" @click="logoutHandle">退出</el-button>
    </div>
    <el-menu-item class="set-lang">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    语言环境
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="zh">中文</el-dropdown-item>
                    <el-dropdown-item command="en">英文</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-menu-item>
  </el-menu>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      activeIndex: "1",
    };
  },
  computed: {
    ...mapState("loginModule", {
      user: (state) => state.user,
    }),
  },
  methods: {
    ...mapMutations("loginModule", ["clearUser"]),
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    logoutHandle() {
      this.clearUser();
      localStorage.removeItem("ego");
      this.$router.push("/login");
    },
    handleCommand(command) {
      this.$i18n.locale = command
      localStorage.setItem('lang',command)
    },
  },
};
</script>

<style scoped lang="less">
.user {
  float: right;
  margin-right: 20px;
  line-height: 60px;
  .user-name {
    color: #fff;
    margin-right: 10px;
    font-size: 15px;
    display: inline-block;
    line-height: 40px;
  }
}

.set-lang {
  float: right !important;
}

.el-dropdown-link {
  color: #fff;
}
</style>