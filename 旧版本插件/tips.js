// [rule: ^提醒(.*)$]
// [rule: tips]
// [cron: 36 11,17 * * *]

/**
 * 
 * 定时推送、手动推送、单一回复三合一，可自行添加图片方式，参考“外卖.js”
 * set otto tips [{imType:"qq","groupCode":}]
 * 自行修改触发词“提醒”、“tips”
 * “提醒推送”可以完成tips范围推送
 * content为发送内容，自行修改
 * 
 */

var content = "提醒:\n我们都是木头人\n不会说话\n不会动\n你动了！Boom！！爆你小鸡鸡";

var isPush = false;
var str = param(1);
var pattern = /推送/;
if (GetUserID() != "") {
    if (isAdmin() && pattern.test(str)) {
        isPush = true
    } else if (str != "") {
        sendText("推送个毛毛")
    }
} else {
    isPush = true
}
if (isPush) {
    var messages = eval('(' + get("tips") + ')');
    for (var i = 0; i < messages.length; i++) {
        message = messages[i]
        message["content"] = content
        push(message)
    }
    sendText("推送完成")
} else if (str == "") {
    sendText(content)
}
