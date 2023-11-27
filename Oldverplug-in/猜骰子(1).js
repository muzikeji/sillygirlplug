//骰子游戏，木子李2021.12.12制作！
// [rule: ^猜骰子$]
// [rule: ^猜点数$]
//[priority: 1]

//[priority: 1]优先级
function main() {
    var userID = GetUserID()
    var url = get("murl") 
    var mkey = get("mkey") 
    if (ImType() != "qq") {sendText("不支持当前平台，请到QQ群使用！")}else{
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

    } else { // 已注册
    if (parseInt(point) < parseInt(zuixiao)) {
        sendText("你没有积分了，请参与每日打卡赚取积分！")}else{

    var shu = Math.floor(Math.random() * 6 + 1);
    sendText("请猜我要转到几？1~6之间哦！猜对＋6分，猜错－1分。")
    sec = input()
    sendText("[CQ:dice,id=" + shu + "]")
    sleep(2000)
    if ((sec * 1) == shu) {//猜对

            var jf = "6"
            var zong = Number(point) + Number(jf)

            var database = request({ // 内置http请求函数
                url: "http://" + url +"/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + userID + "&point=" + zong,
                //请求链接
                "method": "get",
                //请求方法
                "dataType": "json",
                //这里接口直接返回文本，所以不需要指定json类型数据
            })

            sendText("结果：恭喜你猜对了！\n通知：积分 + 6\n原有积分：" + point + "\n当前积分：" + zong + "\n用户ID：" + userID + "\n欢迎再次参与。")

    } else { // 猜错

        var jf = "1"

            var zong = Number(point) - Number(jf)

            var database = request({ // 内置http请求函数
                url: "http://" + url +"/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + userID + "&point=" + zong,
                //请求链接
                "method": "get",
                //请求方法
                "dataType": "json",
                //这里接口直接返回文本，所以不需要指定json类型数据
            })

            sendText("结果：你没有猜对哦！\n通知：积分 - 1\n原有积分：" + point + "\n当前积分：" + zong + "\n用户ID：" + userID + "\n欢迎再次参与。")
        }
      }//有积分
    }//注册判断结束
}//平台判断结束
}//框架结束

main()