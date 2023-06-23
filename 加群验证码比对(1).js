//[rule: raw (\d{2,3})$]
//[disable: false] 是否禁用  
var userID = GetUserID();
var username = GetUsername();
var url = get("murl");
var mkey = get("mkey");
var ID = param(1);
var database = request({ // 内置http请求函数
    url: "http://" + url + "/svip/xin/api.php?apikey=" + mkey + "&user=" + bucketGet("qq", "masters") + "&type=cx&qq=" + userID,
    //请求链接
    "method": "get",
    //请求方法
    "dataType": "json",
    //这里接口直接返回文本
});
var tg = database.tg;
var zcode = database.code;
var zhi = "100000";
var he = Number(zhi) + Number(ID);
if (tg == "888888") {
    if ((zcode * 1) == he) {
        sendText("✅恭喜你回答正确！\n欢迎[" + username + "]加入本群！\n请认真阅读群公告，遵守群规，谢谢合作！");

        var database = request({ // 内置http请求函数
            url: "http://" + url + "/svip/xin/api.php?apikey=" + mkey + "&user=" + bucketGet("qq", "masters") + "&type=kill&qq=" + userID,
            //请求链接={
            "method": "get",
            //请求方法
            "dataType": "json",
            //这里接口直接返回文本，所以不需要指定json类型数据
        });
    } else {
        sendText("[CQ:at,qq=" + GetUserID() + ",text=@" + username + "]\n❌答案错了哦！(可以请教计算器哦)\n请重新回答否则你将被移除群聊。");
    }
} 