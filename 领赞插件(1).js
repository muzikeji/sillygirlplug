// [rule: ^领赞$]
// [rule: ^名片赞$]
//[priority: 1]优先级
var Token = "957051a3ffdbde53e4cc77b9281dba0e"//去三三哪里买，群号820323177

function main() {
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
    var username = GetUsername()
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
        var daka = database.memo
        var point = database.point
        var coin = database.coin
        var zuixiao = "0"
        if (zcode == 1) { //未注册
            sendText(username + "，你还没有账号，请先发送【注册】注册一个账号吧！")

        } else {

            if (parseInt(point) < parseInt(zuixiao)) {
                sendText("你没有金币了，请参与每日打卡赚取积分！")
            } else {

                sendText("1 金币 = 200 赞 。\n你有" + coin + "枚金币。\n最多可输入" + coin + "。\n请问你准备用多少金币去刷赞？")

                sec = input()
                let reg=RegExp(/-/)
                if (sec == "" || sec == "0" || isNaN(sec)) {
                    sendText("你输入有误，输入应为小于等于" + coin + "(当前金币)且大于0的数字。请重新开始！")
                } else {
                    var Num = parseInt(Number(sec) * 200)
                    var zong = Number(coin) - Number(sec)

                    if (parseInt(sec) > parseInt(coin)) {
                        sendText("你的金币没这么多，输入应小于等于" + coin + "(当前金币)且大于0。请重新开始！")
                    } else {

                        if (reg.test(sec)) {
                            sendText("你输入了一个负数，输入应小于等于" + coin + "(当前金币)且大于0。请重新开始！")
                        } else {
                            var content = request({
                                "url": "http://ovooa.com/API/praise/?Uin=" + userID + "&token=" + Token + "&num=" + Num,
                                "method": "get",
                                "dataType": "json",
                            })
                            var data = '';
    var total = content
    if (!total) {
        sendText(username + " 抱歉，对接社区暂时关闭。\n金币已返还请稍后再试！")
        return
    }
                            if (content.code == -11) {
                                data = username + "，你好！\n上次刷赞还没结束，本次未能执行，金币返还。"
                            } else if (content.code == 1) {
                                var list = content.data;
                                data = "回执通知：领取成功！\n领取 I D：" + userID + "\n当前刷赞：" + list.num + "\n扣除金币：" + sec + " \n金币剩余：" + zong + "\n赞池剩余：" + list.quantity + "\n提示：过程较长、请耐心等待\n说明：务必开启允许附近人赞我"

                                var database = request({ // 内置http请求函数
                                    url: "http://" + url +"/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + userID + "&coin =" + zong,
                                    //请求链接
                                    "method": "get",
                                    //请求方法
                                    "dataType": "json",
                                    //这里接口直接返回文本，所以不需要指定json类型数据
                                })

                            } else {
                                data = "机器人接口异常，请稍后再试，修复需要亿点点时间;金币已返还。"
                            }
                            sendText(data)
                        } //输入小于0
                    } //输入大余金币
                } //非法输入
            } //有积分
        } //注册判断结束
} //框架结束
main()