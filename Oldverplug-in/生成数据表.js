// [rule: 生成数据表]
// [rule: 创建数据表]
// [rule: 建立数据表]

//[priority: 10000]优先级

function main() {
    var url = get("murl") 
    var mkey = get("mkey") 
if(!param(1)){
             if (ImType() != "qq") {
         var UIN = GetUserID()
         var qq = get(UIN)
             if (!qq){
              sendText("此平台无账号。")
              }else{        
               var userID  = get(UIN) //获取操作者QQ
              }
          } else {            
          var userID = GetUserID() //获取操作者QQ
          }
}else{
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
            url: "http://" + url +"/svip/xin/zzjb.php?qq=" + userID + "&mkey=" + usermkey,
            //请求链接
            "method": "get",
            //请求方法
            "dataType": "text",
            //这里接口直接返回文本，所以不需要指定json类型数据
        })
    var reg = RegExp(/query/);
    if (reg.exec(database)){
sendText( "创建数据表失败！\n请检查你提交的数据库参数是否正确，端口是否开放！")
return;
}

        var data1 =  database.replace("<br/>", "\n").replace("already exists", "已经存在。").replace("Table", "表")
        var database = request({ // 内置http请求函数
            url: "http://" + url +"/svip/card/zzjb.php?qq=" + userID + "&mkey=" + usermkey,
            //请求链接
            "method": "get",
            //请求方法
            "dataType": "text",
            //这里接口直接返回文本，所以不需要指定json类型数据
        })
        var data2 = database.replace("<br/>", "\n").replace("already exists", "已经存在。").replace("Table", "表")
        var database = request({ // 内置http请求函数
            url: "http://" + url +"/svip/cdkind/zzjb.php?qq=" + userID + "&mkey=" + usermkey,
            //请求链接
            "method": "get",
            //请求方法
            "dataType": "text",
            //这里接口直接返回文本，所以不需要指定json类型数据
        })
        var data3 = database.replace("<br/>", "\n").replace("already exists", "已经存在。").replace("Table", "表")

        var database = request({ // 内置http请求函数
            url: "http://" + url +"/svip/menu/zzjb.php?qq=" + userID + "&mkey=" + usermkey,
            //请求链接
            "method": "get",
            //请求方法
            "dataType": "text",
            //这里接口直接返回文本，所以不需要指定json类型数据
        })
        var data4 = database.replace("<br/>", "\n").replace("already exists", "已经存在。").replace("Table", "表")
sendText(data1+"\n"+ data2 +"\n"+data3+"\n"+ data4)

    } else {
        sendText("你不是SVIP用户无法使用此功能。")
    }
}
} //平台判定结束
} //框架结束
main()