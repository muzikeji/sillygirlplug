// [rule: ^积分换币$]
// [rule: ^分换金币$]
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
    var username = GetUsername()
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
        var zuixiao = "20"
        var jisuan = parseInt(Number(point) / 20)
        var zuiduo = parseInt(Number(jisuan) * 20)
        if (zcode == 1) { //未注册
            sendText(username + "，你还没有账号，请先发送【注册】注册一个账号吧！")

        } else {

            if (parseInt(point) < parseInt(zuixiao)) {
                sendText("你没有足够积分了，请参与每日打卡赚取积分！")
            } else {

                sendText("请问你准备用多少积分去换金币？\n20 积分 = 1 金币 。\n你当前有" + point + "积分 ｜ "+ coin +"金币，最多可输入" + zuiduo + "\n无论你输入的是整数、小数 都向下取整操作，请谨慎输入！")

                sec = input()
                if (sec == "" || sec == "0" || isNaN(sec)) {
                    sendText("你输入有误，输入应为小于等于" + point + "(当前积分)且大于等于20的数字。请重新开始！")
                } else {

                    if (parseInt(sec) > parseInt(point)) {
                        sendText("你的积分没这么多，输入应小于等于" + point + "(当前积分)且大于等于20。请重新开始！")
                    } else {

                        if (parseInt(sec) < parseInt(zuixiao)) {
                            sendText("你输入有误，输入应小于等于" + point + "(当前积分)且大于等于20。请重新开始！")
                        } else {
                    var Num = parseInt(Number(sec) / 20)
                    var xjf = parseInt(Number(Num) * 20)
                    var zong = Number(coin) + Number(Num)
                    var zong1 = Number(point) - Number(xjf)
                       var content = request({
                                           url: "http://" + url +"/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + userID + "&point=" + zong1,
                                "method": "get",
                                "dataType": "json",
                            })

                                sendText( "回执通知：兑换成功！\n操作者ID：" + userID + "\n兑换金币：" + Num + "\n现有金币：" + zong + "\n扣除积分：" + xjf + " \n积分剩余：" + zong1 + "\n请发送【我的信息】查看到账情况。")

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