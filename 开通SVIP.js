// [rule: ^开通SVIP$]
// [rule: ^开通svip$]
// [rule: ^购买SVIP$]
// [rule: ^购买svip$]  
// [disable: false] 是否禁用  
function main() {
    var mkey = get("mkey")
    var murl = get("murl")
    var userID = bucketGet("qq", "masters")
    var paypskey = get("paypskey")
    var why = encodeURI((GetContent().replace(/\ /g, ""))) //收钱原因原因
    var chatID = GetChatID() //获取群号
    var username = GetUsername()
    if (ImType() != "qq") {
       var UIN = GetUserID()
       var qq = get(UIN)
        if (!qq){
sendText("此平台无账号。")
          }else{        
               var qq  = get(UIN)
          }
        }else{             
           if (isAdmin()) {
                var qq = "731428866"
           }else{
                var qq = GetUserID()
           }
    }
    function randomString(len) {　　len = len || 32;　　
            var $chars = 'ABCDEFGHIJKMNPQRSTWXYZ23456789'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            　　
            var maxPos = $chars.length;　　
            var pwd = '';　　
            for (i = 0; i < len; i++) {　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　
            }　　
            return pwd;
        }
    var codes = "MKEY" + (randomString(11));
    var database = request({ // 内置http请求函数
        url: "http://" + murl + "/vip/api.php?type=cx&qq=" + qq,
        //请求链接
        "method": "get",
        //请求方法
        "dataType": "json",
        //这里接口直接返回文本
    })

    var zcode = database.code
    var APIkey = database.mkey
    if (zcode == 1) { //未注册
        sendText(username + "，你还没有账号，请先发送【注册】注册一个账号吧！")

    } else { // 已注册
       if (zcode == 1 || zcode == 0 ) { //非VIP购买
         var jine = "40"
         }else if (isAdmin()) {
        var jine = "0.1"
        } else { //VIP购买
          var jine = "30"
        }
     var reg = RegExp(/KEY/);
       if(reg.exec(APIkey)){
                id = sendText("你已是SVIP无需再次购买。")
          }else{
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
                var content = image(qrcode) + "\n请在60s内打开支傅寳app并扫描二维码傅錢或点击链接跳转傅錢。\n傅錢链接：" + qr + "\n待支付人ID：" + qq + "\n傅錢完成后，发送任意内容或者等倒计时结束均可自动授权。";
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
                            url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + qq + "&mkey=" + codes,
                            //请求链接
                            "method": "get",
                            //请求方法
                            "dataType": "json",
                            //这里接口直接返回文本，所以不需要指定json类型数据
                        })
            sendText(username + " 傅錢成功，详情已发送的邮箱：" +  qq + "@qq.com，请按邮件内容操作")
var content = "请加QQ群466631952<br>请对你的机器人说：<br>set otto mkey " + codes + "<br>set otto murl muvip.cn<br>入群后看公告提示操作<br>注意上面key非常重要，千万不能泄露，若需修改或者忘记请联系群主！"
         
    var databa = request({ // 内置http请求函数
        url: "http://" + murl + "/api/email/api.php?address="+ qq + "@qq.com&name=用户系统key信息&certno=" + content,
        //请求链接
        "method": "get",
        //请求方法
        "dataType": "json",
        //指定json类型数据
    })
    
            notifyMasters(username +"(" + qq +")购买了mkey\n他的key是：" + codes)
                    } else {
                        sendText(username + " 授权失败，傅錢记录不存在，若有异议请联系群主。")
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
                    sendText(username + "(" + qq + ")" + "\n订单" + statss + "\n"+ stats +"，支付限时30s")
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
                        sendText(username + "(" + qq + ")\n支付状态：" + "\n订单" + statss + "，收款" + stats)
                    } else {
                        var reg = RegExp(/已支付/);
                        if (reg.exec(statss)) {
                        var database = request({ // 内置http请求函数
                            url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + qq + "&mkey=" + codes,
                            //请求链接
                            "method": "get",
                            //请求方法
                            "dataType": "json",
                            //这里接口直接返回文本，所以不需要指定json类型数据
                        })
            sendText(username + " 傅錢成功，详情已发送的邮箱：" +  qq + "@qq.com，请按邮件内容操作")
var content = "请加QQ群466631952<br>请对你的机器人说：<br>set otto mkey " + codes + "<br>set otto murl muvip.cn<br>入群后看公告提示操作<br>注意上面key非常重要，千万不能泄露，若需修改或者忘记请联系群主！"
         
    var databa = request({ // 内置http请求函数
        url: "http://" + murl + "/api/email/api.php?address="+ qq + "@qq.com&name=用户系统key信息&certno=" + content,
        //请求链接
        "method": "get",
        //请求方法
        "dataType": "json",
        //指定json类型数据
    })
    
            notifyMasters(username +"(" + qq +")购买了mkey\n他的key是：" + codes)
                        } else {}
                    }
                } else {
                    var reg = RegExp(/已支付/);
                    if (reg.exec(statss)) {
                        var database = request({ // 内置http请求函数
                            url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + qq + "&mkey=" + codes,
                            //请求链接
                            "method": "get",
                            //请求方法
                            "dataType": "json",
                            //这里接口直接返回文本，所以不需要指定json类型数据
                        })
            sendText(username + " 傅錢成功，详情已发送的邮箱：" +  qq + "@qq.com，请按邮件内容操作")
var content = "请加QQ群466631952<br>请对你的机器人说：<br>set otto mkey " + codes + "<br>set otto murl muvip.cn<br>入群后看公告提示操作<br>注意上面key非常重要，千万不能泄露，若需修改或者忘记请联系群主！"
         
    var databa = request({ // 内置http请求函数
        url: "http://" + murl + "/api/email/api.php?address="+ qq + "@qq.com&name=用户系统key信息&certno=" + content,
        //请求链接
        "method": "get",
        //请求方法
        "dataType": "json",
        //指定json类型数据
    })
    
            notifyMasters(username +"(" + qq +")购买了mkey\n他的key是：" + codes)
                    } else {}
                }
              }
             }else if(iii ==3) {//微信支付
               var img = "https://gchat.qpic.cn/gchatpic_new/56794501/1018242024-3004643862-B4090DF402D7EEFDC63C6CBB1F5E6F65/0?term=255";
//图文消息
                var content = image(img) + "\n请1分钟内用微信扫上面码支付" + jine +" 元，支付完成后截图联系群主。";
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
                            url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + qq + "&mkey=" + codes + "&money=" +zong ,
                            //请求链接
                            "method": "get",
                            //请求方法
                            "dataType": "json",
                            //这里接口直接返回文本，所以不需要指定json类型数据
                        })
            sendText(username + " 傅錢成功，详情已发送的邮箱：" +  qq + "@qq.com，请按邮件内容操作")
var content = "请加QQ群466631952<br>请对你的机器人说：<br>set otto mkey " + codes + "<br>set otto murl muvip.cn<br>入群后看公告提示操作<br>注意上面key非常重要，千万不能泄露，若需修改或者忘记请联系群主！"
         
    var databa = request({ // 内置http请求函数
        url: "http://" + murl + "/api/email/api.php?address="+ qq + "@qq.com&name=用户系统key信息&certno=" + content,
        //请求链接
        "method": "get",
        //请求方法
        "dataType": "json",
        //指定json类型数据
    })
    
            notifyMasters(username +"(" + qq +")购买了mkey\n他的key是：" + codes)

                     }else{
                         sendText("余额不足请充值后再来！")
                     }
             }else{
                 sendText("已退出支付。")
            }
        }
    }
}
main()