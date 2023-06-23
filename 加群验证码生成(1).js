// [rule: raw \[CQ:at,qq=(\d+)]\s*欢迎入群([\s\S]*)]
// [priority: 520] 优先级
// [disable: false] 是否禁用
// [imType:qq] 白名单

function main() {
  if (GetUserID() == "2854196310") {
    var userId = param(1)
    var userName = param(2)
    var murl = get("murl") 
    var mkey = get("mkey") 

    function RndNum(n) {
      var rnd = "";
      for (var i = 0; i < n; i++)
        rnd += Math.floor(Math.random() * 10);
      return rnd;
    }

    var a = (RndNum(2));
    var b = (RndNum(2));
    var c = "100000";
    var codes = Number(a) + Number(b) + Number(c)

    var database = request({ // 内置http请求函数
      url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=sc&qq=" + userId + "&code=" + codes + "&tg=888888",
      //请求链接
      "method": "get",
      //请求方法
      "dataType": "json",
      //指定json类型数据
    })

    var databa = request({ // 内置http请求函数
      url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + userId + "&code=" + codes + "&tg=888888",
      //请求链接
      "method": "get",
      //请求方法
      "dataType": "json",
      //指定json类型数据
    })

    var img = "https://api." + murl + "/api/qqda/api.php?qq=" + userId + "&topic1=" + a + "&topic2=" + b + "&times=90"
    sendImage(img)

    sleep(60000)

    var database = request({ // 内置http请求函数
      url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=cx&qq=" + userId,
      //请求链接
      "method": "get",
      //请求方法
      "dataType": "json",
      //这里接口直接返回文本
    })

    var zcode = database.code
    if (zcode == "1" || zcode == "0") { //已验证
    } else {
      var img = "https://api." + murl + "/api/qqda/api.php?qq=" + userId + "&topic1=" + a + "&topic2=" + b + "&times=30"
      sendText("[CQ:at,qq=" + userId + ",text=@" + userName + "] \n题目见下图：\n" + image(img))

      sleep(35000)

      var database = request({ // 内置http请求函数
        url: "http://" + murl +"/svip/" + mkey + ".php?type=cx&qq=" + userId,
        //请求链接
        "method": "get",
        //请求方法
        "dataType": "json",
        //这里接口直接返回文本
      })

      var zcode = database.code
      if (zcode == "1" || zcode == "0") { //已验证
      } else {
        sendText("[CQ:at,qq=" + userId + ",text=@" + userName + "]\n验证超时，再给你3秒钟补答，其后你将被移除群聊！")
        sleep(5000)

        var database = request({ // 内置http请求函数
          url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=cx&qq=" + userId,
          //请求链接
          "method": "get",
          //请求方法
          "dataType": "json",
          //这里接口直接返回文本
        })

        var zcode = database.code
        if (zcode == "1" || zcode == "0") { //未注册
        } else { // 已注册
          sendText("[CQ:at,qq=" + userId + ",text=@" + userName + "]已被移除群聊。")
          var database = request({ // 内置http请求函数
            url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=kill&qq=" + userId,
            //请求链接={
            "method": "get",
            //请求方法
            "dataType": "json",
            //这里接口直接返回文本，所以不需要指定json类型数据
          })
          sleep(100)
          GroupKick(userId, false)
        }
      }
    }
  } else {
    /*url = "http://api.wpbom.com/api/bucket.php?msg=欢迎入群";
    var content = request({
        url: url
    })
    img = content.match(/^((ht|f)tps?):\/\/[\w-]+(\.[\w-]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/)
    sendImage(img)*/
    sendText ("欢迎加入！")
  }
}

main()