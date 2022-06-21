// [rule: ^新闻$]
// [rule: ^早报$]
// [cron: 0 7 * * *]
var data = request({ url: "https://api.2xb.cn/zaob", dataType: "json" }).imageUrl;
//图文消息
var content = image(data) ;
var imType = ImType();
if (imType == "fake") {
    var groups = [{
        imType: "tg",
        groupCode: -1001573562538,
    },{
        imType: "qq",
        groupCode: 323731210,
    },{
        imType: "qq",
        groupCode: 1137215778,
    },{
        imType: "wx",
        groupCode: 17658549996,
    }
]
    for (var i = 0; i < groups.length; i++) {
        groups[i]["content"] = content
        push(groups[i])
    }
} else {
    sendImage(request({ url: "https://api.2xb.cn/zaob", dataType: "json" }).imageUrl)
}