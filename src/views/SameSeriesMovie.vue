<template>
  <div>
    <el-card>
      <div>
        <span>电影名称</span>
      </div>
      <el-form>
        <el-form-item>
          <el-input
              v-model="name"
              placeholder="请输入名称"
              clearable
              suffix-icon="el-icon-edit"
          />
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" plain @click="handleQuery" />
        </el-form-item>
        <br>
        <el-form-item label="查询时间: ">
          <el-tag>{{ queryTime }} ms</el-tag>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <div>数量:{{resultcnt}}</div>
      <el-table :data="result" stripe>
        <el-table-column prop="title" label="名称" align="center" />
      </el-table>

    </el-card>
  </div>
</template>

<script>
export default {
  name: "SameSeriesMovie",
  data(){
    return{
      name:"",

      //查询结果
      result:[],
      queryTime:0,
      resultcnt:0

    }
  },
  created() {

  },
  methods:{
    handleQuery: function() {

      this.$axios.post("http://localhost:8080/neo4j/getSeriesMovie",
          {title:this.name})
          .then(res=>{
            console.log(res);
            const data = res.data
            if(data.msg == "ok") {
              this.queryTime = data.queryTime
              this.result = data.obj
              this.resultcnt=this.result.length
              alert("查询完成")
            }
          })
          .catch(Error=>{
            console.log(Error)
          })
    },

  }
}
</script>

<style scoped>

</style>
