// [rule: raw \[CQ:at,qq=(\d+),text=([^\[]+)]\s*充\s+(\d+)]
//[priority: 100]优先级
// [admin: true]

function main() {
    var url = get("murl") 
    var mkey = get("mkey") 
    var userID = param(1)
    var zhi = param(3)
    var fishMan = new Date();
    var year = fishMan.getFullYear();
    var month = fishMan.getMonth() + 1;
    var day = fishMan.getDate()
    if (ImType() == "wx") { //不是QQ
        sendText("不支持微信使用请到QQ群323731210或TG群组 https://t.me/muzikeji")
    } else { //是QQ    
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
if (zcode == 1) { //未注册
    sendText(param(2) + " 还没有账号，请先发送【注册】注册一个账号吧！")

} else {

    sendText("发送【1】确认充值  |   发送其他内容取消充值")
    sr = input()
    if (sr == 1) { //确认充值
        var zong = Number(point) + Number(zhi)
        var database = request({ // 内置http请求函数
            url: "http://" + url +"/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + userID + "&point=" + zong,
            //请求链接
            "method": "get",
            //请求方法
            "dataType": "json",
            //这里接口直接返回文本，所以不需要指定json类型数据
        })
        sendText("结果：充值成功！\n通知：积分加" + zhi + "\n原有积分：" + point + "\n当前积分：" + zong + "\n用户ID：" + userID + "\n请发【我的信息】查看到账情况。")
        notifyMasters("----------------------\n用户I D：" + userID + "\n充值积分：" + zhi + "\n充值时间：" + year + "年" + month + "月" + day + "日\n发放状态：已完成。")
    } else {
        sendText("已取消操作")
    }
} //账号判定结束
} //平台判定结束
} //框架结束
main()