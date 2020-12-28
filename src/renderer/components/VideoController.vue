<template>
  <!-- <div> -->
  <div class="VideoController">
    <div class="selectArea" v-if="!videoUrl" @click="clickVideo">开始摸鱼吧！</div>
    <video class="selectArea" id="videoFake" v-else :muted="muted">
      <source :src="videoUrl" type="video/mp4" />
    </video>
    <video class="trueVideo" id="video" v-if="videoUrl" :muted="muted">
      <source :src="videoUrl" type="video/mp4" />
    </video>
    <canvas id="canvas" v-show="false" width="50" height="50"></canvas>
    <input
      type="file"
      @change="selectVideo"
      accept="video/mp4"
      name="videoSelect"
      id="videoSelect"
      style="opacity: 0"
    />
  </div>
  <!-- </div> -->
</template>

<script>
const pathes = require("path");
const fs = require("fs");
var ipc = require("electron").ipcRenderer;
var videoFileUrl1 = pathes.resolve(__dirname, "./tempFile1.jpeg");
var videoFileUrl2 = pathes.resolve(__dirname, "./tempFile2.jpeg");
var fileStatus = true;
var imgs = new Image();
export default {
  name: "VideoController",
  data() {
    return {
      videoEl: undefined,
      videoFakeEl: undefined,
      currentUrl: "",
      videoUrl: undefined,
      selectEl: undefined,
      status: undefined,
      canvasEl: undefined,
      canvasCtx: undefined,
      // rate: 100,
      process: undefined,
    };
  },
  props: {
    rate: {
      type: [Number, String],
      default: 90,
    },
    muted: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    rates() {
      return parseInt(this.rate || 50) * 10;
    },
  },
  mounted() {
    this.selectEl = document.getElementById("videoSelect");
    this.canvasEl = document.getElementById("canvas");
    this.canvasCtx = this.canvasEl.getContext("2d");
  },
  methods: {
    eventEnter(e) {
      console.log(e);
    },
    selectVideo(e) {
      let files = e.target.files[0];
      if (!files) {
        return this.$message.warning("取消选择");
      }
      let url = URL.createObjectURL(files);
      this.videoUrl = url;
      this.$message.success("读取完毕");
    },
    reset() {
      this.videoUrl = undefined;
      this.process = undefined;
      this.$message.success("重置成功");
    },
    videoControl(action) {
      this.videoEl = document.getElementById("video");
      this.videoFakeEl = document.getElementById("videoFake");
      if (!this.videoEl) {
        return this.$message.warning("请先选择视频");
      }
      let that = this;
      switch (action) {
        case "play":
          if (!this.videoUrl) {
            return this.$message.warning("无可播放视频！");
          }
          this.videoEl.play();
          this.videoFakeEl.play();
          this.$message.success("开始播放");
          this.process = setInterval(() => {
            this.setIcon();
          }, this.rates);
          break;
        case "pause":
          if (!this.videoUrl) {
            return this.$message.warning("无正在播放视频！");
          }
          this.videoEl.pause();
          this.videoFakeEl.pause();
          clearInterval(this.process);
          this.process = undefined;
          break;
        case "mute":
          this.muted = !this.muted;
          break;
      }
    },
    async videoToCanvas() {
      // this.process = setInterval(() => {
      return new Promise((resolve, reject) => {
        this.canvasCtx.drawImage(this.videoEl, 0, 0, 50, 50);
        let url = this.canvasEl.toDataURL("image / jpeg");
        resolve(url);
      });
      // }, this.rate);
    },
    async setIcon() {
      this.videoToCanvas().then((res) => {
        var base64 = res.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = Buffer.from(base64, "base64");
        fs.writeFile(
          fileStatus ? videoFileUrl1 : videoFileUrl2,
          dataBuffer,
          function (err) {
            if (err) {
              console.error(err);
            } else {
              ipc.send("setIcon", fileStatus ? videoFileUrl1 : videoFileUrl2);
              fileStatus = !fileStatus;
            }
          }
        );
      });
      return;
    },
    test() {
      console.log(pathes.resolve(__dirname, "./test"));
      var paths = pathes.resolve(__dirname, "./jifeaosifj.png"); //路径从app.js级开始找--
      console.log(paths);
    },
    clickVideo() {
      this.selectEl.click();
    },
  },
};
</script>

<style lang="scss" scoped>
.VideoController {
  width: 100%;
  height: 100%;
  background-color: #0fbcf9;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .selectArea {
    width: 400px;
    height: 400px;
    // background-color: rgba(216, 205, 205, 0.445);
    background-color: #4bcffa;
    text-align: center;
    line-height: auto;
    cursor: pointer;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
}
input {
  position: absolute;
}
.trueVideo {
  position: absolute;
  left: 10px;
  background: red;
  top: 10px;
  width: 50px;
  height: 50px;
}
</style>
