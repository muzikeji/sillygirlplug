// [rule: 收录查询?]
// [rule: 收录查询 ?]
function main() {
  var chatID = GetChatID()
  var username = GetUsername()
  var userID = bucketGet("qq", "masters")
  var mzurl = get("mzurl")
  var code = get("mvip")
  var keyword = (param(1)).replace(" ", "")

  var employ = request({
    url: "https://" + mzurl + "/api/shoulu/api.php?domain=" + keyword,
    "method": "get",
    "dataType": "json",
  })

  sendText("查询域名：" + keyword + "\n百度收录：" + (employ.data) + " 条")
}

main()