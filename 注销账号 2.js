// [rule: ^注销账号$]
// [rule: ^注销$]
//[priority: 1]优先级


function main() {
    var chatID = GetChatID()
    var VIPchatID = "487640458"//你的VIP群组号
    var username = GetUsername()
    var url = get("murl") 
    var mkey = get("mkey") 
    if (ImType() != "qq") {
       var UIN = GetUserID()
       var userID = get(UIN)
        if (!userID){
sendText("此平台无账号。")
          }else{        
               var userID  = get(UIN)
          }
    } else {            
          var userID = GetUserID()
    }
    var database = request({ // 内置http请求函数
        url: "http://" + url +"/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=cx&qq=" + userID,
        //请求链接
        "method": "get",
        //请求方法
        "dataType": "json",
        //这里接口直接返回文本
    })

    var zcode = database.code
    var daka = database.memo
    var point = database.point
    var coin = database.coin
    var charm = database.charm
    var other = database.other
    if (zcode == 1) { //未注册
        id = sendText(username + "，你还没有账号，你注销个卵啊？")
    } else { // 已注册
      if (zcode == 0) { //已注册非VIP
    sendText("10秒内发送【1】确认注销  |   发送其他内容取消注销。\n⚠警告：账号一经注销所有数据不可复原，再次注册不送积分和金币，请谨慎操作。")
    sr = input(10000)
    if (sr == 1) { 
                var database = request({ // 内置http请求函数
                    url: "http://" + url +"/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + userID + "&point=0&coin=0&prize=0&code=1&name=null&url=null&email=null&qm=null&wx=null&tg=null&money=0&mkey=null",
                    //请求链接
                    "method": "get",
                    //请求方法
                    "dataType": "json",
                    //这里接口直接返回文本，所以不需要指定json类型数据
                })
							var UIN = GetUserID();
							set(UIN, UIN);
                sendText("用户ID：" + UIN + "\n注销状态：注销成功 \n温馨提示：账号所有信息已删除，且再次注册不能恢复。")
      }else{sendText("已退出。")}

            } else { //已注册VIP用户
                if (chatID == VIPchatID) { //是指定群

    sendText("10秒内发送【1】确认注销  |   发送其他内容取消注销。\n⚠警告：账号一经注销所有数据(包括VIP授权)不可复原，再次注册不送积分和金币，请谨慎操作。")
    sr = input(10000)
    if (sr == 1) { 
                var database = request({ // 内置http请求函数
                      url: "http://" + url +"/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + userID + "&point=0&coin=0&prize=0&code=1&name=null&url=null&email=null&qm=null&wx=null&tg=null&money=0&mkey=null",
                    //请求链接
                    "method": "get",
                    //请求方法
                    "dataType": "json",
                    //这里接口直接返回文本，所以不需要指定json类型数据
                })
                						var UIN = GetUserID();
                						set(UIN, UIN);
                sendText("用户ID：" + UIN + "\n注销状态：注销成功 \n温馨提示：账号所有信息已删除，且再次注册不能恢复。")
            sleep(2000)
            sendText("[CQ:at,qq=" + param(1) + ",text=" + param(2) + "](" + param(1) + ") \n你已不再是VIP用户，10秒后你将被移除VIP群组。" )
            sleep(10000) //等待10秒后踢出，让其知道死因。
            GroupKick(userID, reject)
              }else{sendText("已退出。")}
             }else{                sendText("用户ID：" + userID + "\n请在VIP群组内执行操作。")
             }
        }
  }
}

main()