<template>

  <div class="condition_container">

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

            <!-- 查询提示 -->
            <el-form :inline="true" size="small">
                <el-form-item>
                    查询提示:
                </el-form-item>
                <el-form-item>
                    <el-button plain @click="open1">
                        类别列表
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button plain @click="open2">
                        语言列表
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button plain @click="open3">
                        媒介列表
                    </el-button>
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
                <el-button icon="el-icon-search" plain @click="handleQuery">查询信息</el-button>
            
                <el-button icon="el-icon-search" plain @click="handleQuery2">查询电影详细信息</el-button>
            </el-card>
        </el-col>

    </el-row>

    <!-- movie查询结果展示 -->
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
        <el-table-column prop="rate" label="评分" align="center" />
        <el-table-column prop="runtime" label="电影时长" align="center" />
        <el-table-column prop="releaseYear" label="上映年份" align="center" />
        <el-table-column prop="releaseMonth" label="上映月份" align="center" />
        <el-table-column prop="releaseDay" label="上映日期" align="center" />
        </el-table>

        <!--分页-->
        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :total="total"
            :page-size="pageSize"
            :current-page="pageNum">
        </el-pagination>
    </el-card>
  </div>
</template>

<script>

export default {
  name: "Condition",
  data() {
    return {
        // ==============================================
        //                 查询命令参数
        // ==============================================
        requestBody: {
            "title": null,
            "productId": null,
            "rate": null,
            "runtime": null,
            "releaseYear": null,
            "releaseMonth": null,
            "releaseDay": null,
            "releaseWeekday": null,
            "language": null,
            "format": null,
            "genre": null,
            "director": null,
            "actor": null,

            "rateType": null,
            "runtimeType": null,
            "releaseYearType": null,
            "releaseMonthType": null,
            "releaseDayType": null,
            "releaseWeekdayType": null,

            "pageNum": null,
            "pageSize": null
        },
        commandList: [],
        database: 'mysql',
        // operator: 'and',
        field: '',
        condition: '',
        value: '',
        // ==============================================
        //                  查询域值常量
        // ==============================================
        fieldList: [
        { label: '标题', value: 'title' },
        { label: '产品id', value: 'productId' },
        { label: '评分', value: 'rate' },
        { label: '电影时长', value: 'runtime' },
        { label: '上映年份', value: 'releaseYear' },
        { label: '上映月份', value: 'releaseMonth' },
        { label: '上映日期', value: 'releaseDay' },
        { label: '上映星期', value: 'releaseWeekday' },
        { label: '语言', value: 'language' },
        { label: '媒介', value: 'format' },
        { label: '类型', value: 'genre' },
        { label: '导演名', value: 'director' },
        { label: '演员名', value: 'actor' },
        ],
        conditionList: [
        { label: '大于等于', value: 1 },
        { label: '等于', value: 2 },
        { label: '小于等于', value: 3 },

        ],
        // ==============================================
        //                用于展示可选择的结果
        // ==============================================
        genresList: '',
        languageList: '',
        bindingList: '',
        reviewDetailInfo: '',
        // ==============================================
        //                 统计类查询结果
        // ==============================================
        queryTime: 0,
        movieNum: 0,
        productNum: 0,
        // ==============================================
        //                 信息类查询结果
        // ==============================================
        products: [],
        movies: [],
        reviews: [],
        pageNum: 1,
        pageSize: 10
    }
  },
  created() {

  },
  methods:{
    // 删除 command
    handleCommandDelete: function(index, row) {
        this.commandList.splice(index, 1)
        console.log(index, row)
    },
    // 增加 command
    handleCommandAdd: function() {
        
        this.commandList.push({
            field: this.field,
            condition: this.condition,
            value: this.value
        })
        // 将对应值填入
        switch(this.field) {
            case "title":
                this.requestBody.title = this.value
                break;
            case "productId":
                this.requestBody.productId = this.value
                break;
            case "rate":
                this.requestBody.rate = this.value
                this.requestBody.rateType = this.condition
                break;
            case "runtime":
                this.requestBody.runtime = this.value
                this.requestBody.runtimeType = this.condition
                break;
            case "releaseYear":
                this.requestBody.releaseYear = this.value
                this.requestBody.releaseYearType = this.condition
                break;
            case "releaseMonth":
                this.requestBody.releaseMonth = this.value
                this.requestBody.releaseMonthType = this.condition
                break;
            case "releaseDay":
                this.requestBody.releaseDay = this.value
                this.requestBody.releaseDayType = this.condition
                break;
            case "releaseWeekday":
                this.requestBody.releaseWeekday = this.value
                this.requestBody.releaseWeekdayType = this.condition
                break;
            case "language":
                this.requestBody.language = this.value
                break;
            case "format":
                this.requestBody.format = this.value
                break;
            case "genre":
                this.requestBody.genre = this.value
                break;
            case "director":
                this.requestBody.director = this.value
                break;
            case "actor":
                this.requestBody.actor = this.value
                break;
        }
        
        console.log(this.$data.commandList)
    },
    // 进行电影的查询
    handleQuery: function() {

        console.log(this.requestBody)

        this.$axios.post("http://localhost:8080/mysql/getMoviesCount", this.requestBody)
        .then(res=>{
            console.log(res);
            const data = res.data
            if(data.msg == "ok") {
                this.queryTime = data.queryTime
                this.movieNum = data.obj.movieCount
                this.productNum = data.obj.productCount
            }
        })
        .catch(Error=>{
            console.log(Error)
        })
    },

    handleQuery2: function() {
   
        this.requestBody.pageNum = this.pageNum
        this.requestBody.pageSize = this.pageSize
        console.log(this.requestBody)

        this.$axios.post("http://localhost:8080/mysql/getMovieList", this.requestBody)
        .then(res=>{
            console.log(res);
            const data = res.data
            if(data.msg == "ok") {
                this.queryTime = data.queryTime
                // this.movieNum = data.obj.movieCount
                // this.productNum = data.obj.productCount
                
                console.log(data.obj)
                this.movies = data.obj
                console.log(this.movies)
            }
        })
        .catch(Error=>{
            console.log(Error)
        })
    },

    
    handleCurrentChange:function(newnum){
      this.pageNum = newnum;
      console.log(this.pageNum);
      this.handleQuery2();
    },





    open1() {
        const h = this.$createElement;
        this.$notify({
            title: '类别列表',
            dangerouslyUseHTMLString: true,
            message: '<i>faith<br>fitness<br>variety<br>science fiction<br>war<br>erotic<br>adventure<br>family<br>\
            arts<br>special interest<br>young adult audience<br>international<br>spirituality<br>horror<br>historical<br>fantasy<br>western<br>\
            entertainment<br>animation<br>culture<br>comedy<br>documentary<br>unscripted<br>special interests<br>suspense<br>thrillers<br>arthouse<br>romance<br>lgbtq<br>\
            action<br>kids<br>military<br>anime<br>mystery<br></i>',
        }
        )
    },

    open2() {
        const h = this.$createElement;
        this.$notify({
            title: '语言列表',
            dangerouslyUseHTMLString: true,
            message: '<i>swedish<br>georgian<br>polish<br>hungarian<br>cantonese<br>english<br>mandarin chinese<br>korean<br>\
            italian<br>castilian<br>hebrew<br>german<br>japanese<br>portuguese<br>russian<br>thai<br>arabic<br>\
            greek<br>hindi<br>vietnamese<br>french<br>danish<br>latin<br>czech<br>chinese<br>icelandic<br>dutch<br>none<br>norwegian<br>\
            croatian<br>romanian<br>bulgarian<br>spanish<br>turkish<br>unknown<br>finnish<br></i>',
        }
        )
    },

    open3() {
        const h = this.$createElement;
        this.$notify({
            title: '媒介列表',
            dangerouslyUseHTMLString: true,
            message: '<i>UMD for PSP<br>Interactive DVD<br>DVD-R<br>HD DVD<br>Blu-ray<br>Laser Disc<br>DVD<br>VHS Tape<br>\
            Amazon Video<br></i>',
        }
        )
    },
  }
}
</script>

<style scoped>

.condition_container {
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
}

p {
    font-size: 5dp;
}
</style>