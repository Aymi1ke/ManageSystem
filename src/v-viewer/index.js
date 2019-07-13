
import Vue from 'vue';
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'


Vue.use(Viewer);
export default Viewer.setDefaults({
  'inline':false,
  'button':true, //右上角按钮
  "navbar": true, //底部缩略图
  "title": true, //当前图片标题
  "toolbar": true, //底部工具栏
  "tooltip": true, //显示缩放百分比
  "movable": true, //是否可以移动
  "zoomable": true, //是否可以缩放
  "rotatable": true, //是否可旋转
  "scalable": true, //是否可翻转
  "transition": true, //使用 CSS3 过度
  "fullscreen": true, //播放时是否全屏
  "keyboard": true, //是否支持键盘
  "url": "data-source",
  ready: function (e) {
    console.log(e.type,'组件以初始化');
  },
  show: function (e) {
    console.log(e.type,'图片显示开始');
  },
  shown: function (e) {
    console.log(e.type,'图片显示结束');
  },
  hide: function (e) {
    console.log(e.type,'图片隐藏完成');
  },
  hidden: function (e) {
    console.log(e.type,'图片隐藏结束');
  },
  view: function (e) {
    console.log(e.type,'视图开始');
  },
  viewed: function (e) {
    console.log(e.type,'视图结束');
  },
  zoom: function (e) {
    console.log(e.type,'图片缩放开始');
  },
  zoomed: function (e) {
    console.log(e.type,'图片缩放结束');
  }
});
