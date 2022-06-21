// [rule: raw QQ查询手机 (\d+)]
// [rule: raw QQ查询手机(\d+)]

function main() {
    var chatID = GetChatID()
    var username = GetUsername()
    var userID = GetUserID()
    var admin = bucketGet("qq", "masters")
    var str = param(1) 
    if (!str|| str == admin) {
        var userID = GetUserID()
    }else{
        var userID = param(1) 
    }
    var data = request({ 
             url: "https://zy.xywlapi.cc/qqapi?qq="+userID, 
           //请求链接
            "method": "get",
            //请求方法
            "dataType": "json",
            //返回json
        })
     var reg = RegExp(/成功/);
     if(reg.exec(data.message)){
           sendText("目标QQ：" + data.qq + " \n查询结果：" + data.message +"\n绑定手机："+data.phone+"\n归属地区："+ data.phonediqu)
       }else{
       sendText("抱歉\n" + data.message)
       }
}
main() 