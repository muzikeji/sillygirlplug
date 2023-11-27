// [rule: 插表 ?]
 
// [rule: 插表?]

//[priority: 10000]优先级

function main() {
    var url = get("murl") 
    var mkey = get("mkey") 
if(!param(3)){
    var list = param(1)
    var userID = GetUserID(); //获取操作者QQ
}else{
    var list = param(3)
    var userID = param(1); //获取操作者QQ
}
    if (ImType() == "wx") { //不是QQ
        sendText("不支持微信使用请到QQ群323731210或TG群组 https://t.me/muzikeji")
    } else { //是QQ    
var database = request({ // 内置http请求函数
        url: "http://" + url +"/svip/" + mkey + ".php?type=cx&qq=" + userID,
        //请求链接
        "method": "get",
        //请求方法
        "dataType": "json",
        //这里接口直接返回文本
    })

var usermkey = database.mkey

var zcode = database.code

if (zcode == 1) { //未注册
    sendText(param(2) + " 还没有账号，请先发送【注册】注册一个账号吧！")

} else {

         var reg = RegExp(/MKEY/);
         if(reg.exec(usermkey)){

        var database = request({ // 内置http请求函数
            url: "http://" + url +"/svip/xin/zzcb.php?qq=" + userID + "&mkey=" + usermkey + "&list="+list,
            //请求链接
            "method": "get",
            //请求方法
            "dataType": "text",
            //这里接口直接返回文本，所以不需要指定json类型数据
        })
        sendText(database)
    } else {
        sendText("你不是SVIP用户无法使用此功能。")
    }
}
} //平台判定结束
} //框架结束
main()