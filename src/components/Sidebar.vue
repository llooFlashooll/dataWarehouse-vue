<template>

  <el-aside class="sidebar">

    <el-menu router :default-active="activeIndex" :collapse="this.$store.state.sideBarCollapse">
      <img src="../assets/tongji_logo.png" class="avatar"/>

      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <a slot="title">首页</a>
      </el-menu-item>

      <el-submenu index="/" class="submenu">
        <template slot="title">
            <i class="el-icon-s-custom"></i>
        </template>
        <el-menu-item index="/user">
            <i class="el-icon-user-solid"></i>
            <a slot="title">用户信息</a>
        </el-menu-item>
      </el-submenu>

      <el-menu-item index="/problemList">
        <i class="el-icon-s-order"></i>
        <a slot="title">库存</a>
      </el-menu-item>

    </el-menu>
  </el-aside>

</template>

<script>
export default {
  name: 'Sidebar',
  computed:{
  },
  data () {
    return {
      // 初始化选中tab格
      activeIndex: "/"
    }
  },
  methods:{
  }
}
</script>

<!-- 导入sidebar css -->
<style scoped src="../assets/css/sidebar.css"></style>

<style>
    .el-submenu__title {
        color: rgb(191, 203, 217);
    }
</style>