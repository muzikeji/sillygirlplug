// [rule:^反向ws地址$]
// [admin: true]

function main() {
     var enable_http_server = bucketGet("sillyGirl", "enable_http_server")
     if (enable_http_server != "true") {
          bucketSet("sillyGirl", "enable_http_server", true)
          sendText("已自动为你开启http服务，对我说“重启”生效！！！")
          return
     }
     var ip = "127.0.0.1"
     var port = bucketGet("sillyGirl", "port")
     if (!port) {
          port = "8080"
     }
     sendText("你的node-onebot是在属于那种情形？\n1. 和傻妞在同一台机器上。\n2. 和傻妞在同一个局域网。\n3. 在其他服务器上。")
     var choose = input()
     switch (choose) {
          case "1":
               break;
          case "2":
               sendText("请输入傻妞的局域网IP地址：")
               ip = input()
               break;
          case "3":
               ip = request({ url: "https://imdraw.com/ip" })
               break;
          default:
               sendText("你没有选择，已退出会话。")
               return
     }
     sendText("ws://" + ip + ":" + port + "/qq/receive")
}

main()