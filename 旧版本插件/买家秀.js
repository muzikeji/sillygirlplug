//[rule: raw ±img=(.*)±\[(.*)\]]
//[rule: 买家秀]
    var chatID = GetChatID()
     var username = GetUsername()
    var userID = GetUserID()
    if (ImType() == "qq") {sendText("不支持QQ使用请到TG使用\nTG频道»https://t.me/muzikejipd\nTG群组 »https://t.me/muzikeji")}else{
if (GetContent() == "买家秀") {
     breakIn(request({
          url: "http://jiuli.xiaoapi.cn/i/mjx.php",
     }))
} else {
     sendText(image(param(1)) + "\n" + param(2))
}
}