<template>
  <div class="main">
    <div class="top-area">
      <div class="panel">
        <div class="main_title">摸鱼小工具beta</div>
        <ul @click="eventController">
          <li>
            <a-button type="primary" style="margin-top: 0" @click.stop="select">
              选择视频
            </a-button>
            <p class="tips">目前仅支持mp4格式</p>
            <p class="tips">播放时候请尽量减少磁盘I/O操作以及复杂CPU运算</p>
          </li>
          <li><a-button type="primary" @click.stop="reset"> 重置 </a-button></li>
          <li>
            <a-button type="primary" id="play"> 播放 </a-button>
          </li>
          <li>
            <a-button type="primary" id="pause"> 暂停 </a-button>
          </li>
          <li>
            <a-button type="primary" @click.stop="clickMuted">
              {{ muted ? "取消静音" : "静音" }}
            </a-button>
          </li>
          <li>
            <a-button type="primary" @click.stop="openMore">
              <!-- 一些可能有用的设置 -->预留
            </a-button>
          </li>
        </ul>
        <div class="second_panel">
          <div class="item">
            <span class="title">
              播放帧率：<span></span>
              <p class="tips">注意：帧率与电脑配置成正比</p>
              <p class="tips">请量力而行！</p>
              <p class="tips">设置后先暂停再播放</p>
            </span>
            <div
              style="
                display: inline-block;
                height: 75px;
                margin-top: -18px;
                margin-left: -15px;
              "
            >
              <a-slider
                :min="9"
                :max="100"
                reverse
                v-model="rate"
                :marks="marks"
                vertical
                :default-value="10"
              />
            </div>
          </div>
        </div>
        <div class="author" @click="toGitHub">
          Power by sqdcmk
          <img src="../assets/GitHub.png" class="icon" alt="github" />
        </div>
      </div>
      <videoController :muted='muted' :rate="rate" ref="videoController" />
    </div>
    <drawer @close="openMore" v-model="showDrawer"></drawer>
  </div>
</template>

<script>
import videoController from "../components/VideoController";
import drawer from "../components/drawer";
export default {
  data() {
    return {
      marks: {
        60: "还行模式",
        100: "乌龟模式",
        9: {
          style: {
            color: "#f50",
          },
          label: "炸机模式",
        },
      },
      showDrawer: false,
      rate: 100,
      muted:false,
    };
  },
  watch: {
    rate(e) {
      if (e <= 9) {
        this.$message.success("还挺牛，居然拉满");
      }
    },
  },
  components: {
    videoController,
    drawer,
  },
  methods: {
    clickMuted(){
      this.muted=!this.muted;
    },
    reset() {
      this.$refs.videoController.reset();
    },
    openMore() {
      return;
      this.showDrawer = !this.showDrawer;
    },
    select() {
      this.$refs.videoController.clickVideo();
    },
    eventController(e) {
      if (e.target.nodeName.toLowerCase() === "button") {
        this.$refs.videoController.videoControl(e.target.id);
      }
    },
    toGitHub() {
      require("electron").shell.openExternal("http://www.baidu.com");
    },
  },
};
</script>

<style lang="scss" scoped>
ul li {
  list-style-type: none;
}
ul {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-left: 0;
  padding: 10px 10%;
  padding-top: 0;
  button {
    width: 100%;
    margin-top: 20px;
  }
}
li {
  margin-top: 8px;
  width: 100%;
}
.main {
  width: 100vw;
  height: 100vh;
  // background-color: #d2dae2;
  background-color: #fff;
  .top-area {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 30% 70%;
  }
  .panel {
    padding-top: 6px;
    width: 100%;
    // height: 100%;
    // background-color: #d2dae2;
    display: flex;
    flex-direction: column;
  }
  .second_panel {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90px;
    justify-content: center;
    padding: 0 20px;
    .item {
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 26px;
      height: 100%;
      border-bottom: 1px solid #d2dae2;
    }
  }
  .title {
    font-size: 18px;
    color: #1a1a1a;
  }
  .tips {
    font-size: 12px;
    color: #adadad;
    margin-top: 4px;
  }
}
p {
  margin-bottom: 0 !important;
}
.author {
  width: 100%;
  padding: 16px;
  text-align: center;
  color: #adadad;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  .icon {
    width: 18px;
    height: 18px;
    margin-left: 4px;
    cursor: pointer;
  }
}
.ant-slider {
  margin-left: -10px !important;
}
.main_title {
  width: 100%;
  text-align: center;
  padding: 8px;
  font-size: 20px;
  font-weight: 600;
}
</style>
