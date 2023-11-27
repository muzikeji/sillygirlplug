// 时间知觉测试
// [rule: 时间知觉测试 ? ]
// [rule: 时间知觉测试 ]

function main() {
    var sec = param(1);
    var i = 0;
    while (sec == "" || sec == "0" || isNaN(sec)) {
        sendText("请输入你要测试的秒数：")
        i++
        if (i > 5) {
            sendText("输入错误次数过多，您不需要测试。")
            return
        }
        sec = input()
    }
    if (sec > 100) {
        sendText("不支持超过100秒的测试。")
        return
    }
    sendText("请在收到”开始测试“后第" + sec + "秒时发送任意消息，超过规定10秒后自动结束测试。")
    sleep(2000)
    sendText("开始测试！")
    var begin = Date.now()
    input(sec * 1000 + 10000)
    var end = Date.now()
    var cost = end - begin
    var ex = cost - sec * 1000
    if (ex > 0) {
        sendText("总耗时：" + cost + "毫秒,你慢了" + ex + "毫秒。")
    } else {
        sendText("总耗时：" + cost + "毫秒,你快了" + ex + "毫秒。")
    }
    sleep(1000)
    if (Math.abs(ex) < 1000) {
        sendText("阁下的时间知觉达到了深不可测的境界，佩服！佩服！")
    }
}

main()