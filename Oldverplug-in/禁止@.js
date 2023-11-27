// [rule: raw \[CQ:at,qq=56794501,text=([^\[]+) ([\s\S]*)]
//[priority: 199]优先级
// [disable: true] 是否禁用  
//[imType:qq] 白名单
function main() {
    var chatID = GetChatID()
    var username = GetUsername()
    var userID = GetUserID()
    var murl = get("murl") 
    var mkey = get("mkey") 
        var database = request({ // 内置http请求函数
            url: "http://" + murl + "/vip/api.php?type=cx&qq=" + userID,
            //请求链接
            "method": "get",
            //请求方法
            "dataType": "json",
            //这里接口直接返回文本
        })

        var zcode = database.code
        if (zcode == 1 || zcode == 0) {            
            var wt = param(2);
            var word = encodeURI(wt)
            var username = GetUsername()
            GroupBan(userID, "300")
            sendText("恭喜你成功获得答案，请冷静看完答案: https://m.baidu.com/s?word=" + word)
        } else {

        }
        // 包含
}
main()