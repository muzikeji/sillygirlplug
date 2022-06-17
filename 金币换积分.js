// [rule: ^金币换分$]
// [rule: ^币换积分$]
//[priority: 1]优先级

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
    var url = get("murl") 
    var mkey = get("mkey") 
    var username = GetUsername()
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
        var zuixiao = "1"
        if (zcode == 1) { //未注册
            sendText(username + "，你还没有账号，请先发送【注册】注册一个账号吧！")

        } else {

            if (parseInt(coin) < parseInt(zuixiao)) {
                sendText("你没有足够金币了，请参与每日打卡赚取金币！")
            } else {

                sendText("请问你准备用多少金币去换积分？\n1 金币 = 20 积分 。\n你当前有" + coin + "枚金币 ｜ "+ point +"积分，最多可输入" + coin + "\n无论你输入的是整数、小数 都向下取整操作，请谨慎输入！")

                sec = input()
                if (sec == "" || sec == "0" || isNaN(sec)) {
                    sendText("你输入有误，输入应为小于等于" + coin + "(当前金币)且大于0的数字。请重新开始！")
                } else {
                    var Num = parseInt(Number(sec) * 20)
                    var zong = Number(coin) - Number(sec)
                    var zong1 = Number(point) + Number(Num)
                    if (parseInt(sec) > parseInt(coin)) {
                        sendText("你的金币没这么多，输入应小于等于" + coin + "(当前金币)且大于0。请重新开始！")
                    } else {

                        if (parseInt(sec) < parseInt(zuixiao)) {
                            sendText("你输入了一个负数，输入应小于等于" + coin + "(当前金币)且大于0。请重新开始！")
                        } else {
                            var content = request({
                                           url: "http://" + url +"/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + userID + "&point=" + zong1,
                                "method": "get",
                                "dataType": "json",
                            })

                                sendText( "回执通知：兑换成功！\n操作者ID：" + userID + "\n兑换积分：" + Num + "\n现有积分：" + zong1 + "\n扣除金币：" + sec + " \n金币剩余：" + zong + "\n请发送【我的信息】查看到账情况。")

                                var database = request({ // 内置http请求函数
                                    url: "http://" + url +"/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + userID + "&coin =" + zong,
                                    //请求链接
                                    "method": "get",
                                    //请求方法
                                    "dataType": "json",
                                    //这里接口直接返回文本，所以不需要指定json类型数据
                                })
                        } //输入小于0
                    } //输入大余金币
                } //非法输入
            } //有积分
        } //注册判断结束
} //框架结束
main()