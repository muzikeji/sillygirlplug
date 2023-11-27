// [rule: ^开通VIP$]
// [rule: ^开通vip$]
// [rule: ^购买VIP$]
// [rule: ^购买vip$]  
// [disable: false] 是否禁用  
function main() {
    var mkey = get("mkey")
    var paypskey = get("paypskey")
    var userID = bucketGet("qq", "masters")
    if (isAdmin()) {
         var jine = "0.1" //卡密金额
         var qq = "731428866"//如果操作者是你自己，付款人就为机器人号码。
     }else{
         var jine = "15" //卡密金额
         if (ImType() != "qq") {
         var UIN = GetUserID()
         var qq = get(UIN)
             if (!qq){
              sendText("此平台无账号。")
              }else{        
               var qq  = get(UIN) //获取操作者QQ
              }
          } else {            
          var qq = GetUserID() //获取操作者QQ
          }
     }
    var name = GetUsername()
    var why = encodeURI((GetContent().replace(/\ /g, ""))) //收钱原因原因
    var chatID = GetChatID() //获取群号
    var murl = get("murl")

    function randomString(len) {　　len = len || 32;　　
            var $chars = 'ABCDEFGHIJKMNPQRSTWXYZ23456789'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            　　
            var maxPos = $chars.length;　　
            var pwd = '';　　
            for (i = 0; i < len; i++) {　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　
            }　　
            return pwd;
        }
    var codes = (randomString(15));
    var database = request({ // 内置http请求函数
        url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=cx&qq=" + qq,
        //请求链接
        "method": "get",
        //请求方法
        "dataType": "json",
        //这里接口直接返回文本
    })

    var zcode = database.code
    if (zcode == 1) { //未注册
        sendText(name + "，你还没有账号，请先发送【注册】注册一个账号吧！")

    } else { // 已注册
        if (chatID != "487640458") { //是指定群
            if (zcode == 0) {
sendText("请选择支付方式~\n1 . 支付宝支付(自动授权)\n2 . QQ支付(自动授权)\n3 . 微信支付(手动授权)\n4 . 余额支付(自动授权)\n请在10秒内从1-4中选择一个：");
                    iii = input(10000)
                  if(iii ==1 ) { //支付宝支付
                var database = request({ // 内置http请求函数
                    url: "http://" + murl + "/api/pay.php?name=购买MUZI_VIP&amount="+ jine,
                    //请求链接
                    "method": "get",
                    //请求方法
                    "dataType": "json",
                    //指定json类型数据
                })
                var qr = database.url
                var id = database.qid
                var qrcode = "http://" + murl + "/api/qr.php?text=" + qr;
                var content = image(qrcode) + "\n请在60s内打开支傅寳app并扫描二维码傅錢或点击链接跳转傅錢。\n傅錢链接：" + qr + "\n待支付人ID：" + userID + "\n傅錢完成后，发送任意内容或者等倒计时结束均可自动授权。";
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
                        var database = request({ // 内置http请求函数
                            url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + qq + "&code=" + codes,
                            //请求链接
                            "method": "get",
                            //请求方法
                            "dataType": "json",
                            //这里接口直接返回文本，所以不需要指定json类型数据
                        })
                        sendText(name + " 傅錢成功，已为你完成授权。\n对接信息已发送到邮箱：" + qq +"@qq.com，请注意查收！")
    
            notifyMasters(name +"(" + qq +")购买了VIP\n他的入群验证码是：" + codes)
              var content =   "<h2>温馨提示</h2><br>大部分插件只支持一键安装版傻妞，如果你不是此版本请发送【更新】给我机器人，按提示升级，谢谢！<br>你的授权码：" + codes + "<br>请发依次送下面3个命令给你机器人完成设置即可。<br>① set otto mvip " + codes + "<br>② set otto murl "+ murl +"<br>③ set qq masters " + qq +"<br>内部群号：487640458<br>请加群下载插件，验证码写你的授权码！";
         
    var databa = request({ // 内置http请求函数
        url: "http://" + murl + "/api/email/api.php?address="+ qq + "@qq.com&name=MUZI_VIP授权信息&certno=" + content,
        //请求链接
        "method": "get",
        //请求方法
        "dataType": "json",
        //指定json类型数据
    })

                    } else {
                        sendText(name + " 授权失败，傅錢记录不存在，若有异议请联系群主。")
                    }
                   RecallMessage(xx)
               RecallMessage(GetMessageID())        

                  }else if( iii ==2 ){
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
        if (reg.exec(text)) {sendText("状态：订单发起失败！\n建议：使用支傅寳傅䥗！\n[CQ:at,qq=" + userID + ",text=@木子李]\n你的QQkey已过期请重新抓取。")}else{
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
                    sendText(name + "(" + qq + ")" + "\n订单" + statss + "\n"+ stats +"，支付限时30s")
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
                            var database = request({ // 内置http请求函数
                                url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + qq + "&code=" + codes,
                                //请求链接
                                "method": "get",
                                //请求方法
                                "dataType": "json",
                                //这里接口直接返回文本，所以不需要指定json类型数据
                            })
                            sendText(name + " 傅錢成功，已为你完成授权。\n对接信息已发送到邮箱：" + qq + "@qq.com，请注意查收！")
                            var content = "<h2>温馨提示</h2><br>大部分插件只支持一键安装版傻妞，如果你不是此版本请发送【备份升级】给我机器人，按提示升级，谢谢！<br>你的授权码：" + codes + "<br>请发送下面命令给你机器人完成设置即可。<br>① set otto mvip " + codes + "<br>② set otto murl " + murl + "<br>③ set qq masters " + qq + "<br>内部群号：487640458<br>请加群下载插件，验证码写你的授权码！";

                            var databa = request({ // 内置http请求函数
                                url: "http://" + murl + "/api/email/api.php?address=" + qq + "@qq.com&name=MUZI_VIP授权信息&certno=" + content,
                                //请求链接
                                "method": "get",
                                //请求方法
                                "dataType": "json",
                                //指定json类型数据
                            })
                        } else {}
                    }
                } else {
                    var reg = RegExp(/已支付/);
                    if (reg.exec(statss)) {
                        var database = request({ // 内置http请求函数
                            url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + qq + "&code=" + codes,
                            //请求链接
                            "method": "get",
                            //请求方法
                            "dataType": "json",
                            //这里接口直接返回文本，所以不需要指定json类型数据
                        })
                        sendText(name + " 傅錢成功，已为你完成授权。\n对接信息已发送到邮箱：" + qq + "@qq.com，请注意查收！")
                        var content = "<h2>温馨提示</h2><br>大部分插件只支持一键安装版傻妞，如果你不是此版本请发送【备份升级】给我机器人，按提示升级，谢谢！<br>你的授权码：" + codes + "<br>请发送下面命令给你机器人完成设置即可。<br>① set otto mvip " + codes + "<br>② set otto murl " + murl + "<br>③ set qq masters " + qq + "<br>内部群号：487640458<br>请加群下载插件，验证码写你的授权码！";

                        var databa = request({ // 内置http请求函数
                            url: "http://" + murl + "/api/email/api.php?address=" + qq + "@qq.com&name=MUZI_VIP授权信息&certno=" + content,
                            //请求链接
                            "method": "get",
                            //请求方法
                            "dataType": "json",
                            //指定json类型数据
                        })
                    } else {}
                }
              }
             }else if(iii ==3) {//微信支付
               var img = "https://m-1259042548.cos.ap-chengdu.myqcloud.com/img%2FIMG_8846.JPG";
//图文消息
                var content = image(img) + "\n请1分钟内用微信扫上面码支付，支付完成后截图联系群主。";
                 id = sendText(content)
                  input(60000)
                   RecallMessage(id)
             }else if(iii ==4) {
                  var database = request({ // 内置http请求函数
                       url: "http://" + murl +"/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=cx&qq=" + qq,
                   //请求链接
                      "method": "get",
                   //请求方法
                    "dataType": "json",
                  //这里接口直接返回文本
                   })
                 var money = database.money
                    if (parseInt(money) > parseInt(jine)) {
                      var zong = Number(money) - Number(jine)
                       var database = request({ // 内置http请求函数
                            url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + qq + "&code=" + codes + "&money=" + zong,
                            //请求链接
                            "method": "get",
                            //请求方法
                            "dataType": "json",
                            //这里接口直接返回文本，所以不需要指定json类型数据
                        })
                        sendText(name + " 傅錢成功，已为你完成授权。\n对接信息已发送到邮箱：" + qq +"@qq.com，请注意查收！")
    
            notifyMasters(name +"(" + qq +")购买了VIP\n他的入群验证码是：" + codes)
              var content =   "<h2>温馨提示</h2><br>大部分插件只支持一键安装版傻妞，如果你不是此版本请发送【更新】给我机器人，按提示升级，谢谢！<br>你的授权码：" + codes + "<br>请依次发送下面3个命令给你机器人完成设置即可。<br>① set otto mvip " + codes + "<br>② set otto murl "+ murl +"<br>③ set qq masters " + qq +"<br>内部群号：487640458<br>请加群下载插件，验证码写你的授权码！";
         
    var databa = request({ // 内置http请求函数
        url: "http://" + murl + "/api/email/api.php?address="+ qq + "@qq.com&name=MUZI_VIP授权信息&certno=" + content,
        //请求链接
        "method": "get",
        //请求方法
        "dataType": "json",
        //指定json类型数据
    })

                     }else{
                         sendText("余额不足请充值后再来！")
                     }
             }else{
                 sendText("已退出支付。")
            }
          } else {
                id = sendText("你已是VIP无需再次购买。")
          }
        } else {
            sendText("你已在VIP群组，直接发【申请VIP】对接即可！")
        }
    }
}
main()