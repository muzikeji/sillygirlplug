// [rule: 报时] 
// [cron: 0 1-23/1 * * * ] 每天小时推送
//[imType:qq] 白名单
function main() {
    var chatID = GetChatID()
    var murl = get("murl")
    var date = new Date();
    var year = date.getFullYear()
    var zhi = "1"
    var yue = date.getMonth();
    var yuef = Number(yue) + Number(zhi)
    var strDate = date.getDate()
    var hour = (date.getHours())
    var mae = ''
    if (hour >= 6 && hour < 11) {
        mae = '上午'
    } else if (hour >= 11 && hour < 13) {
        mae = '中午'
    } else if (hour >= 13 && hour < 18) {
        mae = '下午'
    } else if ((hour >= 18 && hour < 24) || hour < 6) {
        mae = '晚上'
    }

    var a = ["日", "一", "二", "三", "四", "五", "六"];
    var week = new Date().getDay();
    var str = "  星期" + a[week]; //星期
    var riqi = year + "年" + yuef + "月" + date.getDate() + "日";
    var shijian = date.getHours() + "点" + date.getMinutes() + "分" + date.getSeconds() + "秒";
    var quan = "现在是北京时间" + riqi + shijian + str;
    var url = "http://tts.youdao.com/fanyivoice?word=" + quan + "&le=zh&keyfrom=speaker-target"
    var burl = encodeURI(url)
    var durl = request({
        url: "http://api." + murl + "/api/dwz/?url=" + burl.replace(/&/g, "%26"),
        dataType: "json"
    })
    var mcurl = durl.url
    var img = "https://s2.loli.net/2022/04/29/hfPnwLNbrRXI4vO.jpg";

    var a = "[CQ:xml,data=<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\" ?><msg serviceID=\"2\" templateID=\"12345\" action=\"web\" brief=\"&#91;语音&#93;"
    var b = "\" sourceMsgId=\"0\" url=\""
    var c = "\" flag=\"0\" adverSign=\"0\" multiMsgFlag=\"0\"><item layout=\"2\"><audio cover=\""
    var d = "\" src=\""
    var e = "\" /><title>" +  shijian + "</title><summary>"
    var f = str + "     " + mae + "\n\n " + riqi + " </summary></item><source name=\"木子科技\" icon=\"https://muziii.com/wp-content/uploads/2022/04/0e03c1ae94a0.png\" action=\"app\" appid=\"1101079856\" /></msg>,type=normal]"
    var content = a + shijian + b + mcurl + c + img + d + mcurl + e + f;
    var imType = ImType();
    if (imType == "fake") {
        var groups = [{
            imType: "tg",
            groupCode: -1001573562538,
        }, {
            imType: "qq",
            groupCode: 323731210,
        }, {
            imType: "qq",
            groupCode: 1137215778,
        }, {
            imType: "wx",
            groupCode: 17658549996,
        }]
        for (var i = 0; i < groups.length; i++) {
            groups[i]["content"] = content
            push(groups[i])
        }
    } else {
        sendText(content)
    }
}
main()