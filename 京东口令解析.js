// 京东口令
// [rule: raw [\s\S]*[(|)|#|@|$|%|¥|￥|!|！]([0-9a-zA-Z]{10,14})[(|)|#|@|$|%|¥|￥|!|！][\s\S]*]
// [rule: raw [\s\S]*[(|)|#|@|$|%|¥|￥|!|！]([0-9a-zA-Z]{10,14})[(|)|#|@|$|%|¥|￥|!|！][\s\S]*]
// [rule:jx ?]
//[priority: 6666666]优先级
/*请先去申请Token
申请tg https://t.me/WALL_E_API   
完成后set otto WALL 你的token
插件作者：木子李
QQ：56794501
插件维护及发布TG群组：https://t.me/muzitg
*/

function GetRequest(urlStr) {
    if (typeof urlStr == "undefined") {
        // 获取url中"?"符后的字符串
        var url = decodeURI(location.search);
    } else {
        var url = "?" + urlStr.split("?")[1];
    }
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(
            strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function main() {
    ti = sendText("正在解析请稍候……")
    var jcode = GetContent();
    try {
        var reg = RegExp(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/);

        if (reg.exec(jcode)) {
            var urlStr = jcode.match(reg)[0];

            var title = "京东活动";
            var Name = GetUsername();
            var Img = "https://c2cpicdw.qpic.cn/offpic_new/56794501//56794501-1551249874-8DA68415682CE9508B9FEED6FA49DFA1/0?term=255";
        } else {
            var WALLToken = get("WALL");
            var headers = {
                "User-Agent": "Mozilla/5.0 (Linux; U; Android 11; zh-cn; KB2000 Build/RP1A.201005.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 HeyTapBrowser/40.7.19.3 uuid/cddaa248eaf1933ddbe92e9bf4d72cb3",
                "Content-Type": "application/json;charset=utf-8",
                token: WALLToken,
            };

            var data = request({
                url: "http://ailoveu.eu.org:19840/jCommand",
                headers: headers,
                method: "post",
                dataType: "json",
                body: {
                    code: jcode
                },
            });

            if (data.code == "200") {

                var urlStr = data.data.jumpUrl;
                var title = data.data.title;
                var Name = data.data.userName;
                var Img = data.data.img;
            }
        }
        RecallMessage(ti);

        let json = GetRequest(urlStr);
        var activateId = '"' + json.activityId + '"';
        var Code = '"' + json.code + '"';
        var reg = RegExp(/https:\/\/cjhydz-isv.isvjcloud.com\/wxTeam\/activity/);
        if (reg.exec(urlStr)) {
            var msg = "【CJ组队瓜分变量】";
            var expo = "export jd_cjhy_activityId=" + activateId;
        } else {
            var reg = RegExp(/https:\/\/lzkjdz-isv.isvjcloud.com\/wxTeam\/activity/);
            if (reg.exec(urlStr)) {
                var msg = "【LZ组队瓜分变量】";
                var expo = "export jd_zdjr_activityId=" + activateId;
            } else {
                var reg = RegExp(/https:\/\/cjhydz-isv.isvjcloud.com\/microDz\/invite\/activity\/wx\/view\/index\/8882761/);
                if (reg.exec(urlStr)) {
                    var msg = "【微定制瓜分变量】";
                    var expo = "export jd_zdjr_activityId=" + activateId;
                } else {
                    var reg = RegExp(/https:\/\/lzkjdz-isv.isvjcloud.com\/wxShareActivity\/activity\/6432842/);
                    if (reg.exec(urlStr)) {
                        var msg = "【LZ分享有礼变量】";
                        var expo = "export jd_fxyl_activityId=" + activateId;
                    } else {
                        var reg = RegExp(/https:\/\/lzkj-isv.isvjd.com\/wxCollectionActivity\/activity2/);
                        if (reg.exec(urlStr)) {
                            var msg = "【M加购任务变量】";
                            var expo = "export M_WX_ADD_CART_URL=" + urlStr;
                        } else {
                            var reg = RegExp(/https:\/\/cjhy-isv.isvjcloud.com\/wxDrawActivity\/activity\/867591/);
                            if (reg.exec(urlStr)) {
                                var msg = "【M转盘抽奖变量】";
                                var expo = "export M_WX_LUCK_DRAW_URL=" + urlStr;
                            } else {
                                var reg = RegExp(/cjwx\/common\/entry.html/);
                                if (reg.exec(urlStr)) {
                                    var msg = "【M转盘抽奖变量】";
                                    var expo = "export M_WX_LUCK_DRAW_URL=" + urlStr;
                                } else {
                                    var reg = RegExp(/https:\/\/lzkj-isv.isvjcloud.com\/wxgame\/activity/);
                                    if (reg.exec(urlStr)) {
                                        var msg = "【通用游戏变量】";
                                        var expo = "export WXGAME_ACT_ID=" + activateId;
                                    } else {
                                        var reg = RegExp(/https:\/\/lzkjdz-isv.isvjcloud.com\/wxShareActivity/);
                                        if (reg.exec(urlStr)) {
                                            var msg = "【Kr分享有礼变量】";
                                            var expo = "export jd_fxyl_activityId=" + activateId;
                                        } else {
                                            var reg = RegExp(/https:\/\/lzkjdz-isv.isvjcloud.com\/wxSecond/);
                                            if (reg.exec(urlStr)) {
                                                var msg = "【读秒变量】";
                                                var expo = "export jd_wxSecond_activityId=" + activateId;
                                            } else {
                                                var reg = RegExp(/https:\/\/jinggengjcq-isv.isvjcloud.com/);
                                                if (reg.exec(urlStr)) {
                                                    var msg = "【大牌联合开卡变量】";
                                                    var expo = "export DPLHTY=" + activateId;
                                                } else {
                                                    var reg = RegExp(/https:\/\/lzkjdz-isv.isvjcloud.com\/wxCartKoi\/cartkoi/);
                                                    if (reg.exec(urlStr)) {
                                                        var msg = "【购物车鲤鱼变量】";
                                                        var expo = "export jd_wxCartKoi_activityId=" + activateId;
                                                    } else {
                                                        var reg = RegExp(/https:\/\/lzkjdz-isv.isvjcloud.com\/wxCollectCard/);
                                                        if (
                                                        reg.exec(urlStr)) {
                                                            var msg = "【集卡抽奖变量】";
                                                            var expo = "export jd_wxCollectCard_activityId=" + activateId;
                                                        } else {
                                                            var reg = RegExp(/https:\/\/lzkj-isv.isvjd.com\/drawCenter/);
                                                            if (
                                                            reg.exec(
                                                            urlStr)) {
                                                                var msg = "【LZ刮刮乐抽奖变量】";
                                                                var expo = "export jd_drawCenter_activityId=" + activateId;
                                                            } else {
                                                                var reg = RegExp(/https:\/\/lzkjdz-isv.isvjcloud.com\/wxFansInterActionActivity/);
                                                                if (
                                                                reg.exec(
                                                                urlStr)) {
                                                                    var msg = "【LZ粉丝互动变量】";
                                                                    var expo = "export jd_wxFansInterActionActivity_activityId=" + activateId;
                                                                } else {
                                                                    var reg = RegExp(/https:\/\/prodev.m.jd.com\/mall\/active\/dVF7gQUVKyUcuSsVhuya5d2XD4F/);
                                                                    if (
                                                                    reg.exec(
                                                                    urlStr)) {
                                                                        var msg = "【邀请好友赢大礼变量】";
                                                                        var expo = "export yhyauthorCode=" + Code;
                                                                    } else {
                                                                        var reg = RegExp(/https:\/\/lzkj-isv.isvjcloud.com\/wxShopFollowActivity/);
                                                                        if (
                                                                        reg.exec(
                                                                        urlStr)) {
                                                                            var msg = "【关注抽奖变量】";
                                                                            var expo = "export jd_wxShopFollowActivity_activityId=" + activateId;
                                                                        } else {
                                                                            var msg = "未匹配到现有活动的变量！";
                                                                            var expo = "";
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
/*			var key1 = Object.keys(json)[0]; //得到第一行数据的键
			var value1 = json[Object.keys(json)[0]]; //得到第一行数据的值
*/
        if (!expo || expo == "") {
            var qlset = "";
        } else {
            var qlset = "傻妞设置变量命令：\nql env set" + expo.replace("export", "").replace("=", " ").replace(/\"/g, '');
        }
        if (ImType() == "pgm") {
            id = sendText(image(Img) + "**活动名称：" + title + "**\n**活动入口：**[点击进入](" + urlStr + ")\n**分享地址：**[长按复制](" + urlStr + ")\n**分享来自：" + Name + "**\n**洞察变量：" + msg + "**\n" + expo + "\n**" + qlset + "**\n**更多好物推荐：[去抢购](https://u.jd.com/cL58yXa)**");
            RecallMessage(sendText(expo))
            sleep(30000)
            RecallMessage(GetMessageID());
            RecallMessage(id);
            sendText("[" + title + "](" + urlStr + ")")

        } else if (GetUserID() == "1748763623") {} else {
            id = sendText(image(Img) + "\n活动名称：" + title + "\n活动入口：" + urlStr + "\n分享来自：" + Name + "\n洞察变量：" + msg + "\n" + expo + "\n" + qlset + "\n更多好物推荐：https://u.jd.com/cL58yXa");
            sleep(30000)
            RecallMessage(GetMessageID());
            RecallMessage(id);
            sendText(title + "：" + urlStr)
        }
    } catch (e) {
        id = sendText("疑似接口凉凉了，无法响应！！！");
        sleep(5000)
        RecallMessage(id);
    }

}
main();