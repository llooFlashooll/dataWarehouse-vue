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
            <i class="el-icon-video-camera"></i>检索
        </template>
        <el-menu-item index="mysql_movieCondition">
            <i class="el-icon-video-camera-solid"></i>
            <a slot="title">电影条件查询mysql</a>
        </el-menu-item>
        <el-menu-item index="neo4j_movieCondition">
            <i class="el-icon-video-camera-solid"></i>
            <a slot="title">电影条件查询neo4j</a>
        </el-menu-item>
        <el-menu-item index="/movieCondition3">
            <i class="el-icon-video-camera-solid"></i>
            <a slot="title">电影条件查询hive</a>
        </el-menu-item>
        <el-menu-item index="/movieCollection">
            <i class="el-icon-video-camera"></i>
            <a slot="title">分类查询</a>
        </el-menu-item>

        <el-menu-item index="/cooperation">
            <i class="el-icon-video-camera"></i>
            <a slot="title">合作关系查询</a>
        </el-menu-item>
        <el-menu-item index="/topCooperation">
          <i class="el-icon-video-camera"></i>
          <a slot="title">最多合作查询</a>
        </el-menu-item>
        <el-menu-item index="/sameSeriesMovie">
          <i class="el-icon-video-camera"></i>
          <a slot="title">同系列电影</a>
        </el-menu-item>
        <el-menu-item index="/movieProduct">
          <i class="el-icon-video-camera"></i>
          <a slot="title">电影产品查询</a>
        </el-menu-item>

      </el-submenu>


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
