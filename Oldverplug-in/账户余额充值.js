// [rule: raw 充值 (\d+)]
// [rule: raw 充值(\d+)]
// [rule: raw 余额充值 (\d+)]
// [rule: raw 余额充值(\d+)]
// [rule: raw 充值余额 (\d+)]
// [rule: raw 充值余额(\d+)]
//[priority: 1]优先级
// [disable: false] 是否禁用

function main() {
    var mkey = get("mkey")
    var paypskey = get("paypskey")
    var userID = bucketGet("qq", "masters")
    var jine = param(1)
    if (jine == "" || jine == "0" || isNaN(jine) || parseInt(jine) < parseInt("1") || parseInt(jine) > parseInt("2000")) {
        sendText("充值金额应在1-2000之间的整数，请重新开始。")
    } else {
        var jine = param(1)
        if (ImType() != "qq") {
            var UIN = GetUserID()
            var qq = get(UIN)
            if (!qq) {
                sendText("此平台无账号。")
            } else {
                var qq = get(UIN) //获取操作者QQ
            }
        } else {
            var qq = GetUserID() //获取操作者QQ
        }

        var name = GetUsername()
        var why = encodeURI((GetContent().replace(/\ /g, ""))) //收钱原因原因
        var chatID = GetChatID() //获取群号
        var murl = get("murl")
        var database = request({ // 内置http请求函数
            url: "http://" + murl + "/vip/api.php?type=cx&qq=" + qq,
            //请求链接
            "method": "get",
            //请求方法
            "dataType": "json",
            //这里接口直接返回文本
        })

        var zcode = database.code
        var yue = database.money
        if (zcode == 1) { //未注册
            sendText(name + "，你还没有账号，请先发送【注册】注册一个账号吧！")

        } else { // 已注册
            sendText("请选择支付方式~\n1 . 支付宝支付(自助充值)\n2 . QQ支付(自助充值)\n3 . 微信支付(人工充值)\n4 . 取消充值\n请在10秒内从1-4中选择一个：");
            iii = input(10000)
            if (iii == 1) { //支付宝支付
                var database = request({ // 内置http请求函数
                    url: "http://" + murl + "/api/pay.php?name=余额充值&amount=" + jine,
                    //请求链接
                    "method": "get",
                    //请求方法
                    "dataType": "json",
                    //指定json类型数据
                })
                var qr = database.url
                var id = database.qid
                var qrcode = "http://" + murl + "/api/qr.php?text=" + qr;
                var content = image(qrcode) + "\n请在60s内打开支傅寳app并扫描二维码傅錢或点击链接跳转傅錢。\n傅錢链接：" + qr + "\n待支付人ID：" + qq + "\n傅錢完成后，发送任意内容或者等倒计时结束均可自动到账。";
                xx = sendText(content)
                sec = input(60000)

                var data = request({ // 内置http请求函数
                    url: "http://" + murl + "/pay/stats.php?tid=" + id,
                    //请求链接
                    "method": "get",
                    //请求方法
                    "dataType": "json",
                    //指定json类型数据
                })
                var stats = data.stats
                if (stats == 666) { //已傅錢
                    var money = Number(yue) + Number(jine)
                    var database = request({ // 内置http请求函数
                        url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + qq + "&money=" + money,
                        //请求链接
                        "method": "get",
                        //请求方法
                        "dataType": "json",
                        //这里接口直接返回文本，所以不需要指定json类型数据
                    })
                    sendText(name + " 傅錢成功，已为你完成充值。\n充值账户：" + qq + "\n充值金额：" + jine + "MB\n账户金额：" + money + "MB\n请注意查收！")

                    notifyMasters(name + "(" + qq + ")充值了余额\n金额为：" + jine)

                } else {
                    sendText(name + "，傅錢记录不存在，若有异议请联系群主。")
                }
                RecallMessage(xx)
                RecallMessage(GetMessageID())

            } else if (iii == 2) {
                var data = request({ //继续请求
                    url: "http://" + murl + "/api/qqkey/pay/index.php?title=" + why + "&uin=" + userID + "&pskey=" + paypskey + "&group=" + chatID + "&qq=" + qq + "&select=1&je=" + jine,
                    //select类型，1为发起，2为查询，3为催收，4为取消
                    dataType: "json"
                })
                var code = data.code //获取状态码
                var text = data.text //获取状态
                var uin = data.uin //收款人QQ
                var money = data.money //收款金额
                var pay_uin = data.pay_uin //需支付人QQ
                var pay_id = data.pay_id //订单号
                var reg = RegExp(/已过期/);
                if (reg.exec(text)) {
                    sendText("状态：订单发起失败！\n建议：使用支傅寳傅䥗！\n[CQ:at,qq=" + userID + ",text=@木子李]\n你的QQkey已过期请重新抓取。")
                } else {
                    sendText("订单状态：" + text + "\n收款金额：" + money + " 元\n支付限时：1分钟内支付\n注：傅錢完成后发任意内容或倒计时结束自动验证傅錢结果。")
                    sec = input(30000)
                    var data = request({ // 内置http请求函数
                        url: "http://" + murl + "/api/qqkey/pay/index.php?title=" + why + "&uin=" + userID + "&pskey=" + paypskey + "&group=" + chatID + "&qq=" + qq + "&select=2&je=" + sec + "&payid=" + pay_id,
                        //请求链接
                        "method": "get",
                        //请求方法
                        "dataType": "json",
                        //指定json类型数据
                    })
                    var statss = data.text
                    var reg = RegExp(/未支付/);
                    if (reg.exec(statss)) {

                        var data = request({ // 内置http请求函数
                            url: "http://" + murl + "/api/qqkey/pay/index.php?title=" + why + "&uin=" + userID + "&pskey=" + paypskey + "&group=" + chatID + "&qq=" + qq + "&select=3&je=" + jine + "&payid=" + pay_id,
                            //请求链接
                            "method": "get",
                            //请求方法
                            "dataType": "json",
                            //指定json类型数据
                        })
                        var stats = data.text
                        sendText(name + "(" + qq + ")" + "\n订单" + statss + "\n" + stats + "，支付限时30s")
                        sec = input(30000)
                        var data = request({ // 内置http请求函数
                            url: "http://" + murl + "/api/qqkey/pay/index.php?title=" + why + "&uin=" + userID + "&pskey=" + paypskey + "&group=" + chatID + "&qq=" + qq + "&select=2&je=" + sec + "&payid=" + pay_id,
                            //请求链接
                            "method": "get",
                            //请求方法
                            "dataType": "json",
                            //指定json类型数据
                        })
                        var statss = data.text
                        var reg = RegExp(/未支付/);
                        if (reg.exec(statss)) {

                            var data = request({ // 内置http请求函数
                                url: "http://" + murl + "/api/qqkey/pay/index.php?title=" + why + "&uin=" + userID + "&pskey=" + paypskey + "&group=" + chatID + "&qq=" + qq + "&select=4&je=" + jine + "&payid=" + pay_id,
                                //请求链接
                                "method": "get",
                                //请求方法
                                "dataType": "json",
                                //指定json类型数据
                            })
                            var stats = data.text
                            sendText(name + "(" + qq + ")\n支付状态：" + "\n订单" + statss + "，收款" + stats)
                        } else {
                            var reg = RegExp(/已支付/);
                            if (reg.exec(statss)) {
                                var money = Number(yue) + Number(jine)
                                var database = request({ // 内置http请求函数
                                    url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + qq + "&money=" + money,
                                    //请求链接
                                    "method": "get",
                                    //请求方法
                                    "dataType": "json",
                                    //这里接口直接返回文本，所以不需要指定json类型数据
                                })
                                sendText(name + " 傅錢成功，已为你完成充值。\n充值账户：" + qq + "\n充值金额：" + jine + "MB\n账户金额：" + money + "MB\n请注意查收！")

                                notifyMasters(name + "(" + qq + ")充值了余额\n金额为：" + jine)
                            } else {}
                        }
                    } else {
                        var reg = RegExp(/已支付/);
                        if (reg.exec(statss)) {
                            var money = Number(yue) + Number(jine)
                            var database = request({ // 内置http请求函数
                                url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + qq + "&money=" + money,
                                //请求链接
                                "method": "get",
                                //请求方法
                                "dataType": "json",
                                //这里接口直接返回文本，所以不需要指定json类型数据
                            })
                            sendText(name + " 傅錢成功，已为你完成充值。\n充值账户：" + qq + "\n充值金额：" + jine + "MB\n账户金额：" + money + "MB\n请注意查收！")

                            notifyMasters(name + "(" + qq + ")充值了余额\n金额为：" + jine)
                        } else {}
                    }
                }
            } else if (iii == 3) { //微信支付
                var img = "https://gchat.qpic.cn/gchatpic_new/56794501/1018242024-3004643862-B4090DF402D7EEFDC63C6CBB1F5E6F65/0?term=255";
                //图文消息
                var content = image(img) + "\n请1分钟内用微信扫上面码支付 " + jine + "元 ，支付完成后截图联系群主。";
                id = sendText(content)
                input(60000)
                RecallMessage(id)
            } else if (iii == 4) {
                sendText("已退出支付。")
            } else {
                sendText("已退出支付。")
            }
        }
    }
}
main()