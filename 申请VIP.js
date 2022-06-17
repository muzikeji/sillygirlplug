// [rule: ^申请VIP$]
// [rule: ^申请vip$]
/*注意下面有个指定群号487640458需要换成你的VIP群号*/
function main() {
    var chatID = GetChatID()
    var username = GetUsername()
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
    var url = get("murl") 
    var mkey = get("mkey") 
    var database = request({ // 内置http请求函数
        url: "http://" + url +"/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=cx&qq=" + userID,
        //请求链接
        "method": "get",
        //请求方法
        "dataType": "json",
        //这里接口直接返回文本
    })

    var zcode = database.code
    if (zcode == 1) { //未注册
        sendText(username + "，你还没有账号，请先发送【注册】注册一个账号吧！")

    } else { // 已注册
        if (zcode == 0) { //已注册未授权
            if (chatID == "487640458") { //是指定群


                function randomString(len) {　　len = len || 32;　　
                    var $chars = 'ABCDEFGHIJKMNPQRSTWXYZ23456789'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
                    　　
                    var maxPos = $chars.length;　　
                    var pwd = '';　　
                    for (i = 0; i < len; i++) {　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　
                    }　　
                    return pwd;
                }
                var codes = (randomString(15));
                sendText("              温馨提示\n大部分插件只支持新版傻妞，如果你不是此版本请在下面操作里选择退出。然后发送【更新】按提示升级过后再来授权，谢谢！")
                   sleep(1000)
                   sendText("请依次发送下面3个命令给你机器人，完成后发送【1】继续，发送其他退出。\nset otto mvip " + codes + "\nset otto murl "+ url +"\nset qq masters " + userID)

                sec = input()
                if (sec == 1) {
                        var database = request({ // 内置http请求函数
                            url: "http://" + url +"/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + userID + "&code=" + codes,
                            //请求链接
                            "method": "get",
                            //请求方法
                            "dataType": "json",
                            //这里接口直接返回文本，所以不需要指定json类型数据
                        })

                        sendText("授权成功。\n请把你需要的js文件放到..sillyGirl/develop/replies/目录内，重启傻妞即可使用。\n若遇到插件异常问题，请在群内反馈。")
                } else {
                    sendText("已退出申请")
                }

            } else {
                sendText("请在487640458群发起申请，如果你还不是该群成员，请发送【购买VIP】，购买入群后再试！")

            }
        } else { //已注册已授权
            if (chatID == "487640458") {
                sendText("你已是授权用户无需再次授权\n如果你未在机器人添加授权码\n请重新给机器人发送下面3个命令\nset otto mvip " + zcode + "\nset otto murl "+ url +"\nset qq masters " + userID)
            } else {
                sendText("尊敬的VIP用户你好，你已是授权用户无需再次授权！")
            }
        }
    }


}

main()