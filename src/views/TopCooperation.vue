<template>
  <div>
    <el-card>
      <div>
        <span>合作关系</span>
      </div>
      <el-form :inline="true" size="small">
        <el-form-item>
          <el-switch
              v-model="role1"
              active-text="导演"
              active-value="director"
              inactive-text="演员"
              inactive-value="actor"
              :width="20"
          />
        </el-form-item>
        <el-form-item label="与">
          <el-switch
              v-model="role2"
              active-text="导演"
              active-value="director"
              inactive-text="演员"
              inactive-value="actor"
              :width="20"
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
      <el-table :data="cooperation" stripe>
        <el-table-column prop="name" label="名字" align="center" />
        <el-table-column prop="count" label="合作次数" align="center" />
      </el-table>

    </el-card>
  </div>
</template>

<script>
export default {
  name: "TopCooperation",
  data(){
    return{
      role1:"",
      role2:"",

      //查询结果
      cooperation:[],
      queryTime:0

    }
  },
  created() {

  },
  methods:{
    handleQuery: function() {

      this.$axios.post("http://localhost:8080/neo4j/getTopCooperation",
          {role1:this.role1,role2:this.role2})
          .then(res=>{
            console.log(res);
            const data = res.data
            if(data.msg == "ok") {
              this.queryTime = data.queryTime
              this.cooperation = data.obj
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
