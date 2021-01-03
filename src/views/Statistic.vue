<template>
  <div class="statistic_container">
    <div>
      <el-card>
        <el-select v-model="field" placeholder="请选择属性域" clearable filterable>
          <el-option v-for="item in fieldList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <br/>
        <el-button type="primary" @click="handleQuery" >查询</el-button>
      </el-card>
      <div>
        <ve-line :data="chartData"></ve-line>
      </div>
    </div>
    <div>
      <el-card>
        <el-table :data="chartData.rows">
          <el-table-column prop="x" label="属性" align="center" />
          <el-table-column prop="y" label="数量" align="center" />
        </el-table>

      </el-card>
    </div>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
export default {
  name: "Statistic",
  components: { VeLine },
  data () {
    return {
      fieldList: [
        { label: '评分', value: 'rate' },
        { label: '上映年份', value: 'year' },
        { label: '语言', value: 'language' },
        { label: '媒介', value: 'binding' },
        { label: '类型', value: 'genre' },
      ],
      field:"rate",

      chartData: {
        columns: ['x', 'y'],
        rows: []
      }
    }
  },
  created() {

  },
  methods:{
    handleQuery: function() {

      this.$axios.post("http://localhost:8080/neo4j/getStatistic",
          {field:this.field})
          .then(res=>{
            console.log(res);
            const data = res.data
            if(data.msg == "ok") {
              //this.queryTime = data.queryTime
              this.chartData.rows = data.obj
              alert("数量查询完成")
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
.statistic_container {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
