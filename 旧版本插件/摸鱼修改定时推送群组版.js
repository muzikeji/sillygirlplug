//[rule: 摸鱼]
//[cron: 30 9,11,13,15,19 * * * ] 每天9/11/13/15/19点半推送
//[priority: 1]优先级
/* 
 *@author:  Mol
 *@create: 2021-11-24-20/20-20
 */
var fishMan = new Date();
var year = fishMan.getFullYear();
var month = fishMan.getMonth() + 1;
var day = fishMan.getDate();
var hour = fishMan.getHours();
var item = fishMan.getDay()
var msg = '';
var zuixiao = '0';
var shizhi = '24';
var nian = '365';
var imType = ImType();
var a = ["日", "一", "二", "三", "四", "五", "六"];
var week = new Date().getDay();
var str = "星期" + a[week];
var nongli = request({ // 内置http请求函数
            url: "https://api.xlongwei.com/service/datetime/convert.json",
            //请求链接
            "method": "get",
            //请求方法
            "dataType": "json",
            //这里接口直接返回文本
        })
    var chinese = nongli.chinese
    var ganzhi = nongli.ganzhi
    var sheng = nongli.shengxiao

if (sheng == "undefined") {
    var neirong = "抱歉农历获取失败"
} else {
    var shengxiao = sheng.replace("鼠", "鼠 🐭").replace("牛", "牛 🐮").replace("虎", "虎 🐯").replace("兔", "兔 🐰").replace("龙", "龙 🐲").replace("蛇", "蛇 🐍").replace("马", "马 🐴").replace("羊", "羊 🐑").replace("猴", "猴 🐒").replace("鸡", "鸡 🐔").replace("狗", "狗 🐶").replace("猪", "猪 🐷")
    var neirong = chinese + "\n天干地支："+ ganzhi + "\n生肖：" + shengxiao
}
if (imType == "fake") {
    var username = "各位群友"
} else {
    var username = GetUsername()
}
function main() {
    headInfo();
    weekend();
    festival('儿童节', 6, 1);
    festival('中秋节', 9, 10);
    festival('国庆节', 10, 1);
    festival('圣诞节', 12, 25);
    festival('元旦', 1, 1);
    festival('春节', 1, 22);
    festival('元宵节', 2, 5);
    festival('清明节', 4, 5);
    festival('劳动节', 5, 1);
    lastInfo();
    if (imType == "fake") {
        var groups = [{
            imType: "tg",
            //tg群
            groupCode: -1001573562538,
            //tg群号
        }, {
            imType: "qq",
            //QQ群
            groupCode: 323731210,
            //QQ群号
        }, {
            imType: "qq",
            //QQ群
            groupCode: 1137215778,
            //QQ群号
        }, {
            imType: "wx",
            //微信群
            groupCode: 17658549996,
            //微信群号
        }]
        for (var i = 0; i < groups.length; i++) {
            groups[i]["content"] = msg
            push(groups[i])
        }
    } else {
        sendText(msg)
    }
}

function headInfo() {
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

    var info = image("https://ae01.alicdn.com/kf/Hf0318464d87f4d57b8640901c94b13caO.png") + "\n" + username + ", " + mae + "好！\n" + year + "年" + month + "月" + day + "日," + str + "\n农历: "  + neirong +"\n"
    msg += info
    return info
}

function lastInfo() {
    var info = "工作再累，一定不要忘记摸鱼哦！有事没事起身去茶水间， 去厕所， 去廊道走走别老在工位上坐着， 钱是老板的, 但命是自己的!\n上班是帮老板赚钱，摸鱼是赚老板的钱！最后，祝愿天下所有摸鱼人，都能愉快的渡过每一天！"
    msg += info
    return info
}

function weekend() {
    var item = fishMan.getDay()
    var info = ""
    if (item > 0 && item <= 5) {
        item = 5 - item
        if (item == 0) {
            info = "明天就是周末啦！加油💪！\n";
        } else {
            var hour = Number(shizhi) - hour;
            info = "距离周末还有" + item + "天多\n";
        }
    } else {
        info = '今天是周末，好好睡一觉吧！\n';
    }
    msg += info
    return info
}

function festival(chinese, fmonth, fday) {
    var startDate = Date.parse(fishMan);
    var info = "";
    var newfestival = new Date(year, fmonth - 1, fday);
    var endDate = Date.parse(newfestival);
    var days = Math.round((endDate - startDate) / (1 * 24 * 60 * 60 * 1000));
    if (parseInt(days) < parseInt(zuixiao)) {
        var days = Number(days) + Number(nian)
        info = "距离" + chinese + "还有" + days + "天\n"
    } else {
        if (month == fmonth && day == fday) {
            info = "今天就是" + chinese + "，好好享受！\n"
        } else {
            info = "距离" + chinese + "还有" + days + "天\n"
        }
    }
    msg += info
    return info
}

main()