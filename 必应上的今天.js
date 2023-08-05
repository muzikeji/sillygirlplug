// [rule: 必应]
// [rule: 必应一图]
// [rule: ?日必应]
// [rule: ?天必应]

function main() {
    var chatID = GetChatID()
    var murl = get("murl")
    var riqi = param(1)
    if (riqi== "今") {
       var day = "0"
    }else if (riqi== "昨") {
       var day = "-1"
    }else if (riqi== "前") {
       var day = "1"
    }else if (riqi== "大前") {
       var day = "2"
    }else if (riqi== "大大前") {
       var day = "3"
    }else if (riqi== "大大大前") {
       var day = "4"
    }else if (riqi== "大大大大前") {
      var day = "5"
    }else{
      var day = "0"
    }
    var data = request({
        url: "http://api." + murl + "/api/bing/index.php?info=true&day="+day +"&t=" + Date.now(),
        //请求链接
        "method": "get",
        //请求方法
        "dataType": "json",
        //这里接口直接返回文本
    })
       
    if (!data) {
        sendText("抱歉，数据获取失败！")
        return
    }
    var title = data.title
    var url = data.link
    var img = data.url
   
    sendText(image(img) + "\n主题：" + title + "\n详情页：" + url)
}
main()