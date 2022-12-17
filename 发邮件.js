// [rule: raw \[CQ:at,qq=(\d+),text=([^\[]+)]\s*邮件([\s\S]*)]
// [rule: raw 发邮件([\s\S]*)]
//[priority: 113]优先级
// [admin: true]

function main() {
    var url = get("murl")
    var user = GetUserID()
    var chatID = GetChatID()
    var username = GetUsername()
    var userID = param(1) + "@qq.com"
    var title = param(3)
    if (ImType() != "qq" || !title  ) {
    var title = param(1)
        sendText("请输入收件人邮箱：\n【H2】〖H3〗『H4』「H5」〔加粗〕br 换行")
    var userID = input(180000)
    } else {}
sendText("请在3分钟输入邮件内容:")
    var content = input(180000)
    var contents = content.replace(/【/g, "<h2>").replace(/】/g, "</h2>").replace(/〖/g, "<h3>").replace(/〗/g, "</h3>").replace(/『/g, "<h4>").replace(/』/g, "</h4>").replace(/「/g, "<h5>").replace(/」/g, "</h5>").replace(/br/g, "<br>").replace(/〔/g, "<b>").replace(/〕/g, "</b>")
    var cont = encodeURI(contents)
    var database = request({ // 内置http请求函数
        url: "http://" + url + "/api/email/api.php?address="+ userID + "&name=" + title + "&certno=" + cont,
        //请求链接
        "method": "get",
        //请求方法
        "dataType": "json",
        //指定json类型数据
    })
sendText((database.msg))
}
main()