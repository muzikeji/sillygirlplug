//骰子游戏，木子李2021.12.12制作！
// [rule: raw 翻翻乐 (\d+)]
// [rule: raw 翻翻乐(\d+)]
// [rule: ^梭哈$]
// [rule: ^全压$]
//[priority: 1]优先级
// [disable: false] 是否禁用

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
    var jishu = "10000000"
    var chushi = "10"
    var canshu = param(1)
    var beishu = "2"
    var baoji = "4"
    var zuixiao = "2"
    var ling = "1"
    var date = new Date();
    var strDate = date.getDate();
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
    var zuida = parseInt(Number(point)/2)
    var prize = database.prize
    if (zcode == 1) { //未注册
        sendText(username + "，你还没有账号，请先发送【注册】注册一个账号吧！")

        } else {
        if ((daka * 1) != strDate || (daka * 1) == "null") {
            sendText(username + "，请先完成每日打卡，重置游戏次数后再来！")

    } else {

            if (parseInt(prize) < parseInt(ling)) {            sendText(username + "，你今日游戏次数已用完！")
        } else {       
    if (parseInt(point) < parseInt(zuixiao)) {
        sendText("你没有积分了，请参与每日打卡赚取积分！")
    } else {
            if (parseInt(canshu) > parseInt(zuida)) {
                sendText("你的积分没这么多，参数应小于等于当前积分一半("+ zuida +")分。")
            } else {
                    var xprize = Number(prize) - Number(ling)
               if (canshu !== "") {
                var zhi = param(1)
                var jf = Number(zhi) * Number(beishu)
            } else {                   
                var jf = Number(zuida) * Number(beishu)               
            }

            var shu = Math.floor(Math.random() * 7 + 1);

            if (shu == "1" ||  shu == "5") { // 翻倍成功

                    var zong = Number(point) + Number(jf)

            var database = request({ // 内置http请求函数
                url: "http://" + url +"/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + userID + "&point=" + zong + "&prize=" + xprize,
                //请求链接
                "method": "get",
                //请求方法
                "dataType": "json",
                //这里接口直接返回文本，所以不需要指定json类型数据
            })

                    id=sendText("结果：恭喜你翻倍成功！\n通知：积分加" + jf + "\n原有积分：" + point + "\n当前积分：" + zong + "\n用户ID：" + userID + "\n剩余次数：" + xprize)
            } else if (shu == "3" ){ // 爆击
               if (canshu !== "") {
                var zhi = param(1)
                var jf = Number(zhi) * Number(baoji)
            } else {                   
                var jf = Number(zuida) * Number(baoji)               
            }
                    var zong = Number(point) + Number(jf)
            var database = request({ // 内置http请求函数
                url: "http://" + url +"/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + userID + "&point=" + zong + "&prize=" + xprize,
                //请求链接
                "method": "get",
                //请求方法
                "dataType": "json",
                //这里接口直接返回文本，所以不需要指定json类型数据
            })

                    id=sendText("结果：恭喜你获🉐️幸运暴击！\n通知：积分加" + jf + "\n原有积分：" + point + "\n当前积分：" + zong + "\n用户ID：" + userID + "\n剩余次数：" + xprize)
            
            } else { // 猜错
// 猜错未玩过
                    var zong = Number(point) - Number(jf)

            var database = request({ // 内置http请求函数
                url: "http://" + url +"/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + userID + "&point=" + zong + "&prize=" + xprize,
                //请求链接
                "method": "get",
                //请求方法
                "dataType": "json",
                //这里接口直接返回文本，所以不需要指定json类型数据
            })



                    id=sendText("结果：你翻倍失败了！\n通知：积分减" + jf + "\n原有积分：" + point + "\n当前积分：" + zong + "\n用户ID：" + userID + "\n剩余次数：" + xprize)
            }//猜的结果判断结束
               sleep(30000)
               RecallMessage(id)
               RecallMessage(GetMessageID())
          }//输入积分未大于一半
        }//有积分
       }//有游戏次数
      }//没打卡
    }//注册判断结束
}//框架结束
main()