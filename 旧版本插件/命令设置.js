// [rule: ^命令设置$]
// [rule: ^修改设置$]
// [rule: ^傻妞设置$] 
// [rule: ^命令更改$] 
// [disable: false] 是否禁用  
// [admin: true]
/*此js设置未加任何过滤匹配，请认真输入，否则导致傻妞崩溃概不负责。*/

function main() {
    var userID = bucketGet("qq", "masters")
    sendText("请选择你要设置的参数~\n1 . 更改京豆查询命令\n2 . 更改手机号码输入提示语\n3 . 更改短信输入提示语\n4 . 更改短信登录成功广告\n5 . 更改京豆查询间隔时间\n6 . 更改傻妞后台密码\n7 . 更改傻妞下载代理\n8 . 是否启用傻妞http服务\n9 . 设置QQ机器人主QQ号\n10 . 设置傻妞端口(port)\n11 . 开启或者关闭芝士\n请在10秒内从中选择一个：");
    iii = input(10000)
    if (iii == 1) { //查询
        sendText("请15秒内输入新命令，输入q取消设置。")
        var old = bucketGet("jd_cookie","asset_query_alias") //取值
        var value = input(15000)
        var bucket = "jd_cookie"
        var newkey = "asset_query_alias"
    } else if (iii == 2) { //登录提示
        sendText("请30秒内输入新命令，输入q取消设置。")
        var old = bucketGet("jd_cookie", "login_tip") //取值
        var value = input(30000)
        var bucket = "jd_cookie"
        var newkey = "login_tip"
    } else if (iii == 3) { //验证码提示
        sendText("请30秒内输入新命令，输入q取消设置。")
        var old = bucketGet("jd_cookie", "sms_tip") //取值
        var value = input(30000)
        var bucket = "jd_cookie"
        var newkey = "sms_tip"
    } else if (iii == 4) { //广告
        sendText("请30秒内输入新广告，输入q取消设置。")
        var old = bucketGet("jd_cookie", "ad") //取值
        var value = input(30000)
        var bucket = "jd_cookie"
        var newkey = "ad"
    } else if (iii == 5) { //查询间隔
        sendText("请30秒内输入一个数值，单位为秒(s)，输入q取消设置。")
        var old = bucketGet("jd_cookie", "query_wait_time") //取值
        var value = input(30000)
        var bucket = "jd_cookie"
        var newkey = "query_wait_time"
    } else if (iii == 6) { //后台密码
        sendText("请30秒内输入新密码，输入q取消设置。")
        var old = bucketGet("sillyGirl", "adminPassword") //取值
        var value = input(30000)
        var bucket = "sillyGirl"
        var newkey = "adminPassword"
    } else if (iii == 7) { //下载代理
        sendText("请30秒内输入新的代理地址，输入q取消设置。")
        var old = bucketGet("sillyGirl", "download_prefix") //取值
        var value = input(30000)
        var bucket = "sillyGirl"
        var newkey = "download_prefix"
    } else if (iii == 8) { //http服务
        sendText("请30秒内输入是或者否，输入q或者其他取消设置。")

        var old = bucketGet("sillyGirl", "enable_http_server") //取值
        var sec = input(30000)
             if (sec == "是" || sec == "否" ) {
                 var value = sec.replace("是", "true").replace("否", "false")
              }else{
                  var value = "q"
               }
        var bucket = "sillyGirl"
        var newkey = "enable_http_server"
    } else if (iii == 9) {
        sendText("请30秒内输入新的主QQ号，输入q取消设置。")
        var old = bucketGet("qq", "default_bot") //取值
        var value = input(30000)
        var bucket = "qq"
        var newkey = "default_bot"
    } else if (iii == 10) { //端口
        sendText("请15秒内输入新端口，输入q取消设置。")
        var old = bucketGet("sillyGirl", "port") //取值
        var value = input(15000)
        var bucket = "sillyGirl"
        var newkey = "port"
    } else if (iii == 11) { //芝士开关
        sendText("请30秒内输入开或者关，输入q或者其他取消设置。")
        var old = bucketGet("jd_cookie", "enable_jd_cookie") //取值
        var sec = input(30000)
             if (sec == "开" || sec == "关" ) {
                 var value = sec.replace("开", "true").replace("关", "false")
              }else{
                  var value = "q"
               }
        var bucket = "jd_cookie"
        var newkey = "enable_jd_cookie"

    } else {
       var value = "q"
    }
    if (value == "q" || value == "Q" || value == "" || (!value)) {
        sendText("已退出设置。")
    } else {
        sendText("设置已由【" + old + "】更改为【" + value + "】\n是否确认设置？y/n ?")
        var yes = input(30000)
        if (yes == "Y" || yes == "y") {
            bucketSet(bucket, newkey, value)
            sendText("设置成功，若未生效，请重启傻妞！")
        } else {
            sendText("已取消设置。")
        }
    }
}
main()