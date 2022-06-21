// 捷径搜索
// [rule: 捷径 ?]

function main() {
    var keyword = encodeURI(param(1))
    var data = request({
        url: "https://jiejinghe.com/api/shortcuts/search?kw=" + keyword,
        "dataType": "json"
    })
    var total = data.results.length
    if (!total) {
        sendText("抱歉，没有找到相关捷径。")
        return
    }
    var rts = []
    for (var i = 0; i < total; i++) {
        var result = data.results[i]
        rts.push("名称：" + result.shortcut.title + "\n简介：" + result.shortcut.summary + "\n作者： " + result.creator.name + "\n地址：https://jiejinghe.com/shortcuts/" + result.shortcut.uid + "\n―――――――――")
        if ((i + 1) % 5 == 0) {
            sendText(rts.join("\n\n") + "\n\n更多访问https://jiejinghe.com/search?query=" + keyword + "\n\n 1分钟内输入【n】查看更多好玩捷径，输入其他任意字符退出。")
            rts = []
            var uin = input(60000)
            if (uin != "n") {
                if (uin.indexOf("捷径")) {
                    Continue()
                }
                return
            }
        }
    }
    if (rts.length != 0) {
        sendText(rts.join("\n\n"))
    }
    sleep(500)
    sendText("结果展示完毕。")
}

main()