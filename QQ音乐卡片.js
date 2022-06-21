//音乐搜索
//[priority: 1]优先级
// [rule: 听 ?]
// [rule: 点歌 ?]
// [rule: 听歌 ?]
// [rule: raw ^点歌([\s\S]*)]
//[imType:qq] 白名单
function main() {
    var chatID = GetChatID()
    var username = GetUsername()
    var userID = bucketGet("qq","masters")
    var url = get("murl") 
    var scode = get("mvip") 
    var keyword = encodeURI(param(1))
    var database = request({ 
        url: "http://" + url +"/vip/api.php?type=cx&qq=" + userID,
        "method": "get",
        "dataType": "json",
    })
    var codes = database.code
    if (codes != scode) { 
            sendText(request({
                url: "http://" + url +"/vip/tuisong.php",
                dataType: "text"
            }))
        } else {             
           var data = request({
                   url: "http://" + url +"/api/qqyy1.php?msg=" + keyword + "&n=1",
                   "method": "get",
                   "dataType": "json",
                })
          var ID = data.id
             if (ImType() == "qq") {
                sendText("[CQ:music,type=qq,id=" + ID + "]")
            } else {
         var content =data.wx
                sendText(content)
            }
        }
}



main()