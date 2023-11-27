// [rule: ^日历$]
// [rule: ^黄历$]
// [rule: ^节气$]

function main() {
    var username = GetUsername()
    var userID = GetUserID()
    var chatID = GetChatID()
    var user = bucketGet("qq", "masters")
    var murl = get("murl")
    var scode = get("mvip")
    var date = new Date();
    var a = Date.parse(new Date())/1000;
    var year = date.getFullYear()
    var ling = "10"
    var zhi = "1"
    var yue = date.getMonth();
    var yuef = Number(yue) + Number(zhi)
    var strDate = date.getDate()
    if (parseInt(yuef) < parseInt(ling)) {
        var yuefen = "0" + "" + yuef;
    } else {
        var yuefen = yuef;
    }
    if (parseInt(strDate) < parseInt(ling)) {
        var ri = "0" + "" + strDate;
    } else {
        var ri = strDate;
    }
    var databa = request({
        url: "http://" + murl + "/vip/api.php?type=cx&qq=" + user,
        "method": "get",
        "dataType": "json",
    })
    var codes = databa.code
    if (codes != scode) {
        sendText(request({
            url: "http://" + murl + "/vip/tuisong.php",
            dataType: "text"
        }))
    } else {
        var database = request({ // 内置http请求函数
            url: "http://" + murl + "/api/rl/api.php?day=" + year + "" + yuefen + "" + ri,
            //请求链接
            "method": "get",
            //请求方法
            "dataType": "json",
            //这里接口直接返回文本
        })
        var statu = (database.status) //获取状态
        var typename = database.typename //是否工作日
        var day = database.day //查询日期
        var unixtime = database.unixtime //时间戳
        var yearname = database.yearname //干支天地
        var nonglicn = database.nonglicn //农历汉字
        var nongli = database.nongli //农历数字
        var shengxiao = database.shengxiao //生肖
        var jieqi = database.jieqi //节气
        var weekcn = database.weekcn //中文星期几
        var week1 = database.week1 //英文简写周几
        var week2 = database.week2 //数字周几
        var week3 = database.week3 //英文全写周几
        var daynum = database.daynum //今年已过去多少天
        var weeknum = database.weeknum //今年的第几周
        var avoid = database.avoid //禁忌
        var suit = database.suit //适宜
        if (statu == 0) { //获取失败
            sendText(username + "，抱歉！数据获取异常请等待修复！")

        } else { // 获取成功
                    var zhou = Number(weeknum) + Number(zhi)
            var tx = "https://gchat.qpic.cn/gchatpic_new/56794501/3813731210-2902081610-14EF040A78803FA7063368BA8DCC1429/0?term=3"

            var content = image(tx) + "\n日期：" + year + "年" + yuef + "月" + strDate + "日\n农历：" + nonglicn + "(" + nongli + ")\n干支：" + yearname + "\n生肖：" + shengxiao + "\n节气：" + jieqi + "\n工/休/假：" + typename + "\n第几周：" + zhou + "周\n星期几：周" + weekcn + " / " + week1 + "(" + week3 + ")\n今年已过：" + daynum + "天" + (date.getHours()) + "小时" + (date.getMinutes()) + "分钟" + (date.getSeconds()) + "秒\n日时间戳：" + unixtime + "\n秒时间戳：" + a + "\n适宜：" + suit + "\n禁忌：" + avoid + "\n查询时间：" + (date.getFullYear()) + "年" + yuef + "月" + (date.getDate()) + "日 " + (date.getHours()) + ":" + (date.getMinutes()) + ":" + (date.getSeconds())
            sendText(content)

        }
    }
}

main()