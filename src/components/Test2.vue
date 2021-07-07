<template>

 <div id="touchView"   @touchstart="TouchStartHandler" @touchmove="TouchMoveHandler"     @touchend="TouchEndHandler" >
    <h1>Current IP: {{ip}}</h1>
    <h1>Current PORT: {{port}}</h1>
    <h1>Canvas Width: {{windowWidth}}</h1>
    <h1>Current Height: {{windowHeight}}</h1>
    <h1>Touch Event: {{touchEvent}}</h1>
    <h1>Touch Position: x = {{x_touch}}, y = {{y_touch}}</h1>
    
 </div>™
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      ispreparing: 1,
      touchEvent:'none',
      x_touch: 1,
      y_touch: 1,
      ws: WebSocket,
      ip: '192.168.1.111',
      port: '5555',
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
    }
  },
  watch: {
    // windowHeight(val) {
    //   let that = this;
    //   // console.log("实时屏幕高度：", val, that.windowHeight);
    // },
    // windowWidth(val) {
    //   let that = this;
    //   // console.log("实时屏幕宽度：", val, that.windowHeight);
    // },
    ip(str) {
      localStorage.setItem("ip", str);
    },
    port(str) {
      localStorage.setItem("port", str);
    }
  },
  methods: {
    StartEventHandler() {

      var height = document.body.offsetHeight;
      console.log(height);


      this.StartWebSocket();
      // alert("Function!");
      // alert(this.ip);
    },
    // ClickEventHandler(e) {
    //   var x = e.x //获取鼠标的X坐标（鼠标与屏幕左侧的距离，单位为px）
    //   var y = e.y //获取鼠标的Y坐标（鼠标与屏幕顶部的距离，单位为px）

    //   this.x_touch = x;
    //   this.y_touch = y;
    //   var jsonObj = {
    //     eventType:"Click",
    //     x: this.x_touch,
    //     y: this.y_touch
    //   };

    //   this.ws.send(JSON.stringify(jsonObj));
    // },
    TouchStartHandler(e) {
      var x = parseInt(e.touches[0].clientX); //获取鼠标的X坐标（鼠标与屏幕左侧的距离，单位为px）
      var y = parseInt(e.touches[0].clientY); //获取鼠标的Y坐标（鼠标与屏幕顶部的距离，单位为px）

      this.x_touch = x;
      this.y_touch = y;
      this.touchEvent = 'TouchStart';

      var jsonObj = {
        eventType:"TouchStart",
        x: this.x_touch,
        y: this.y_touch
      };

      this.ws.send(JSON.stringify(jsonObj));

    },
    TouchMoveHandler(e) {
      var x = parseInt(e.touches[0].clientX) //获取鼠标的X坐标（鼠标与屏幕左侧的距离，单位为px）
      var y = parseInt(e.touches[0].clientY); //获取鼠标的Y坐标（鼠标与屏幕顶部的距离，单位为px）

      this.x_touch = x;
      this.y_touch = y;
      this.touchEvent = 'TouchMove';

      var jsonObj = {
        eventType:"TouchMove",
        x: this.x_touch,
        y: this.y_touch
      };
      

      console.log('move x:' + this.x_touch);

      this.ws.send(JSON.stringify(jsonObj));
    },
    TouchEndHandler(e) {
      var x = parseInt(e.changedTouches[0].clientX); //获取鼠标的X坐标（鼠标与屏幕左侧的距离，单位为px）
      var y = parseInt(e.changedTouches[0].clientY); //获取鼠标的Y坐标（鼠标与屏幕顶部的距离，单位为px）

      this.x_touch = x;
      this.y_touch = y;
      this.touchEvent = 'TouchEnd';

      var jsonObj = {
        eventType:"TouchEnd",
        x: this.x_touch,
        y: this.y_touch
      };

      console.log('end x:' + this.x_touch);

      this.ws.send(JSON.stringify(jsonObj));

      // // 还原交互信息
      // this.touchEvent = 'None';
      // jsonObj = {
      //   eventType:"None",
      //   x: 0,
      //   y: 0
      // };

      // console.log('none:' + 0);

      // this.ws.send(JSON.stringify(jsonObj));
      
    },
    StartWebSocket() {
      var target = "ws://" + this.ip + ":" + this.port;
      console.log(target);
      this.ws = new WebSocket(target);
      this.ws.onopen = function () {
        console.log('connection to server');
      }

    },
    SendMessage(value) {
      this.ws.send(value);
    }
  },
  mounted() {

    //StartEventHandler();

      document.body.onselectstart = function () { 
          return false; 
      };
    //禁止滚动
    document.body.addEventListener('touchmove', function(e){
      e.preventDefault();
    },{passive: false});

    // // 读取上次的ip和port
    // if (localStorage.getItem("ip") != null) {
    //   this.ip = localStorage.getItem("ip");
    // }

    // if (localStorage.getItem("port") != null) {
    //   this.port = localStorage.getItem("port");
    // }

    this.ip = '192.168.1.111';
    this.port = '5555';
    


    // 读取分辨率
    var that = this;
    // <!--把window.onresize事件挂在到mounted函数上-->  
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        that.windowHeight = window.fullHeight; // 高  
        that.windowWidth = window.fullWidth; // 宽  
      })()
    }

    this.StartWebSocket();
  }
}

</script>

<style>
html{
  overflow: hidden;
}
div {
  width: 100vw;
  height:100vh;
  background-color: black;
}

#test1{
  margin-top: 300px;
  padding-top: 300px;
}

#touchView{
  -webkit-touch-callout:none;  /*系统默认菜单被禁用*/   
  -webkit-user-select:none; /*webkit浏览器*/   
  -khtml-user-select:none; /*早期浏览器*/   
  -moz-user-select:none;/*火狐*/   
  -ms-user-select:none; /*IE10*/   
  user-select:none; 
  text-align: left;
}
</style>