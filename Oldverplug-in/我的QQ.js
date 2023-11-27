// [rule: ^我的QQ$]

function main() {
    var username = GetUsername()
    if (ImType() != "qq") {
       var UIN = GetUserID()
       var userID = get(UIN)
        if (!userID){
sendText("暂未绑定QQ号，请发送〖注册〗进行QQ号绑定。")
return
          }else{        
               var userID  = get(UIN)
          }
    } else {            
          var userID = GetUserID()
    }
	
    var chatID = GetChatID()
    var url = get("murl") 
    var mkey = get("mkey") 
    var date = new Date();
    var year = date.getFullYear()
    var zhi = "1"
    var yue = date .getMonth();
    var yuef = Number(yue) + Number(zhi)
    var strDate = date.getDate()
    var database = request({ // 内置http请求函数
        url: "http://ovooa.com/API/QQ_level/?uin=" + userID,
        //请求链接
        "method": "get",
        //请求方法
        "dataType": "json",
        //这里接口直接返回文本
    })

    var zcode = database.code
    var name = database.data.Name
    var uin = database.data.uin
    var Icon = database.data.Icon
    var Level = database.data.Level
    var head = database.data.head
    var NetworkDay = database.data.NetworkDay
    var Next = database.data.Next

    var content = image(head) + "\nQQ昵称：" + name + "\nQQ号码：" + userID + "\nQQ邮箱：" + uin + "@qq.com\n等级图标：" + Icon + "\nQQ等级：" + Level +"级\n在网时长：" + NetworkDay + " 天\n预计升级：" + Next + " 天后\n查询时间：" + (date.getFullYear()) + "年" + yuef + "月" + (date.getDate()) + "日 " + (date.getHours()) + ":" + (date.getMinutes()) + ":" + (date.getSeconds())
      id = sendText(content)
}

main()