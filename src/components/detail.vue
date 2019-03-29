<template>
  <div id="detail">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a> &gt;
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <div class="pic-box">
                <el-carousel>
                  <el-carousel-item v-for="(item,index) in imglist" :key="index">
                    <img :src="item.original_path" alt>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="goods-spec">
                <h1>{{goodsinfo.title}}</h1>
                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <el-input-number v-model="num1" :min="1" :max="10" label="描述文字"></el-input-number>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div id="buyButton" class="btn-buy">
                        <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                        <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="goodsTabs" class="goods-tab bg-wrap">
              <div
                id="tabHead"
                class="tab-head"
                style="position: static; top: 517px; width: 925px;"
              >
                <ul>
                  <li>
                    <a href="javascript:;" class="selected" @click="indexshow=1">商品介绍</a>
                  </li>
                  <li>
                    <a href="javascript:;" @click="indexshow=2">商品评论</a>
                  </li>
                </ul>
              </div>
              <div class="tab-content entry" v-show="indexshow==1" v-html="goodsinfo.content">内容</div>
              <div class="tab-content" v-show="indexshow==2">
                <div class="comment-box">
                  <div id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea
                          v-model.trim="inputcommet"
                          id="txtContent"
                          name="txtContent"
                          sucmsg=" "
                          data-type="*10-1000"
                          nullmsg="请填写评论内容！"
                        ></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input
                          @click="submitcontent"
                          id="btnSubmit"
                          name="submit"
                          type="submit"
                          value="提交评论"
                          class="submit"
                        >
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>
                  <ul id="commentList" class="list-box">
                    <p
                      v-show="!totalcomment"
                      style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                    >暂无评论，快来抢沙发吧！</p>
                    <li v-for="item in commentlist">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{item.user_name}}</span>
                          <span>{{item.reply_time | globalFilters('YYYY年MM月DD日THH:mm:ss')}}</span>
                        </div>
                        <p>{{item.content}}</p>
                      </div>
                    </li>
                  </ul>
                  <div class="page-box" style="margin: 5px 0px 0px 62px;">
                    <!-- <div id="pagination" class="digg">
                      <span class="disabled">« 上一页</span>
                      <span class="current">1</span>
                      <span class="disabled">下一页 »</span>
                    </div>-->
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page=" pageIndex"
                      :page-sizes="[5, 10, 15, 20]"
                      :page-size="100"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalcomment"
                    ></el-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for="(item,index) in hotgoodslist" :key="index">
                    <div class="img-box">
                      <router-link :to="`/detail/${item.id}`">
                        <img :src="item.img_url">
                      </router-link>
                    </div>
                    <div class="txt-box">
                      <router-link :to="`/detail/${item.id}`">{{item.title}}</router-link>
                      <span>{{item.add_time | globalFilters}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "detail",
  data() {
    return {
      goodsinfo: {},
      indexshow: 1,
      hotgoodslist: [],
      imglist: [],

      num1: 0,
      //   输入的评论的内容
      inputcommet: "",
      //  评论当前是第几页
      pageIndex: 1, //默认当前页是第一页
      // 每页显示的条数
      pageSize: 10,

      // 数据的同条数
      totalcomment: 0,
      // 获取的评论的数据
      commentlist: []
    };
  },

  methods: {
    getDetaildata() {
      axios
        .get(
          `http://111.230.232.110:8899/site/goods/getgoodsinfo/${
            this.$route.params.id
          }`
        )
        .then(res => {
          this.goodsinfo = res.data.message.goodsinfo;
          this.hotgoodslist = res.data.message.hotgoodslist;
          this.imglist = res.data.message.imglist;
        });
    },
    getcomment() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(res => {
          this.commentlist = res.data.message;
          this.totalcomment = res.data.totalcount;
          // console.log('ha');
          // console.log(res);
        });
    },
    submitcontent() {
      // 首先判断提交的内容是不是为空
      if (this.inputcommet == "") {
        this.$message.error("输入的内容不能够为空呀！");
      } else {
        this.$axios
          .post(
            `site/validate/comment/post/goods/${this.$route.params.id}`,
            { commenttxt: this.inputcommet }
          )
          .then(res => {
            
            if(res.data.status == 0){
               this.$message({ message: res.data.message, type: "success" });
               this.inputcommet = "";
               this.pageIndex = 1;
                this. getcomment();
            }else{
               this.$message('评论发表失败！');
            }
           
           
          });
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
     this.getcomment();
    }
  },
  created() {
    this.getDetaildata();
    this.getcomment();
  },
  watch: {
    $route: {
      handler(value, valuea) {
        this.getDetaildata();
        this.getcomment();
      },
      deep: true
    },
  }
};
</script>

<style>
.pic-box {
  width: 415px;
  height: 319px;
}
.pic-box .el-carousel {
  width: 100%;
  height: 100%;
}
.pic-box .el-carousel .el-carousel__container {
  height: 100%;
  width: 100%;
}
.pic-box .el-carousel .el-carousel__container .el-carousel__item {
  width: 100%;
  height: 100%;
}
.pic-box .el-carousel .el-carousel__container .el-carousel__item img {
  height: 100%;
  width: 100%;
}
</style>
