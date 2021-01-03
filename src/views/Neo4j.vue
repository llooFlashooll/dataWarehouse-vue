<template>
  <div class="neo4j_container">
    <el-row :gutter="20">

      <!-- 选择查询命令 -->
      <el-col :span="12" :xs="24">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">查询条件</div>
          <el-form :inline="true" size="small">
            <el-form-item>
              <el-select v-model="field" placeholder="请选择属性域" clearable filterable>
                <el-option v-for="item in fieldList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="condition" placeholder="请选择判别条件" clearable filterable>
                <el-option v-for="item in conditionList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="value" placeholder="请输入属性值" clearable suffix-icon="el-icon-edit" />
            </el-form-item>
            <!-- 增加 command-->
            <el-form-item>
              <el-button icon="el-icon-plus" plain @click="handleCommandAdd" />
            </el-form-item>

          </el-form>

        </el-card>
      </el-col>

      <el-col :span="12" :xs="24">

        <el-card class="box-card" shadow="hover">
          <!-- command查询命令展示 -->
          <el-table :data="commandList" stripe>
            <el-table-column prop="field" label="属性域" align="center" />
            <el-table-column prop="condition" label="条件" align="center" />
            <el-table-column prop="value" label="值" align="center" />
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-delete" @click="handleCommandDelete(scope.$index)" />
              </template>
            </el-table-column>
          </el-table>
          <!-- 查询 -->
          <el-button icon="el-icon-search" plain @click="handleQueryNumber">查询电影数量和对应产品数量</el-button>

          <el-button icon="el-icon-search" plain @click="handleQueryInformation">查询部分满足的电影信息</el-button>

        </el-card>
      </el-col>

    </el-row>

    <el-card class="box-card" body-style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" shadow="hover">
      <div slot="header" class="clearfix">
        <span>查询结果</span>
      </div>
      <br>
      <el-form :inline="true" size="small">
        <el-form-item label="查询时间:">
          <el-tag>{{ queryTime }} ms</el-tag>
        </el-form-item>
        <br>
        <el-form-item label="电影总数: ">
          <el-tag>{{ movieNum }} 个</el-tag>
        </el-form-item>
        <el-form-item label="产品总数: ">
          <el-tag>{{ productNum }} 个</el-tag>
        </el-form-item>
      </el-form>

      <el-table :data="movies">
        <el-table-column prop="title" label="标题" align="center" />
        <el-table-column prop="actor" label="演员" align="center" />
        <el-table-column prop="director" label="导演" align="center" />
        <el-table-column prop="genre" label="类别" align="center" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Neo4j",
  data(){
    return{
      commandList: [],
      field: '',
      condition: '',
      /*
      * command的值
      * */
      value: '',
      fieldList: [
        { label: '标题', value: 'title' },
        { label: '评分', value: 'rate' },
        { label: '电影时长', value: 'runtime' },
        { label: '上映年份', value: 'year' },
        { label: '上映月份', value: 'month' },
        { label: '上映日期', value: 'day' },
        { label: '上映星期', value: 'week' },
        { label: '语言', value: 'language' },
        { label: '媒介', value: 'binding' },
        { label: '类型', value: 'genre' },
        { label: '导演名', value: 'director' },
        { label: '演员名', value: 'actor' },
      ],
      conditionList: [
        { label: '大于等于', value: "greater" },
        { label: '等于', value: "equal" },
        { label: '小于等于', value: "less" },
        { label: '包含' ,value:'contain'}
      ],

      //查询结果
      queryTime: 0,
      movieNum: 0,
      productNum: 0,
      movies:[]
    }
  },
  created() {

  },
  methods:{
    handleCommandAdd: function() {

      this.commandList.push({
        field: this.field,
        condition: this.condition,
        value: this.value
      })
    }, handleCommandDelete: function(index, row) {
      this.commandList.splice(index, 1)
      console.log(index, row)
    },
    handleQueryNumber: function() {

      this.$axios.post("http://localhost:8080/neo4j/getMovieNumByCondition", this.commandList)
          .then(res=>{
            console.log(res);
            const data = res.data
            if(data.msg == "ok") {
              this.queryTime = data.queryTime
              this.movieNum = data.obj.movieNum
              this.productNum = data.obj.productNum
              alert("数量查询完成")
            }
          })
          .catch(Error=>{
            console.log(Error)
          })
    },
    handleQueryInformation: function() {

      this.$axios.post("http://localhost:8080/neo4j/getMovieByCondition", this.commandList)
          .then(res=>{
            console.log(res);
            const data = res.data
            if(data.msg == "ok") {
              this.queryTime = data.queryTime
              this.movies = data.obj
              alert("信息查询完成")
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
.neo4j_container {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
