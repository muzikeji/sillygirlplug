// [rule: ^修改资料$]
// [rule: ^修改信息$]
// [admin: false]
// [disable: false] 是否禁用  
function main() {
    var mkey = get("mkey")
    var paypskey = get("paypskey")
    if (ImType() != "qq") {
       var UIN = GetUserID()
       var userID = get(UIN)
        if (!userID){
sendText("此平台无账号。")
          }else{        
               var userID  = get(UIN)
          }
    } else {            
          var userID = GetUserID()
    }
    var name = GetUsername()
    var murl = get("murl")
    var database = request({ // 内置http请求函数
        url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=cx&qq=" + userID,
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
sendText("请选择修改参数~\n1 . 用户头像\n2 . 用户昵称\n3 . 用户邮箱\n4 . 设置个性签名\n请在10秒内从1-4中选择一个：");
                    iii = input(10000)
                  if(iii ==1 ) { //修改头像
    if (ImType() != "qq") {
                var content = name + "\n请在60秒内输入一个头像图片的链接，输入非链接内容退出修改。\n如果使用QQ头像请输入:\nhttps://q1.qlogo.cn/g?b=qq&s=100&nk=你的QQ号";
            xx = sendText(content)
                sec = input(60000)
                img = sec.match(/^((ht|f)tps?):\/\/[\w-]+(\.[\w-]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/)
      }else{
      sendText("请发送头像图片给我:")
      sec = input(60000)
      var cont = encodeURI(sec)
       tximg = cont.match(/http(.*?)term/)[1]
       var reg = RegExp(/qpic.cn/);
       if(reg.exec(tximg)){ 
             var img = "http" + tximg + "term=255"
     }else{
             var img = "获取失败！"     
    }
  }
var reg = RegExp(/http/);
if(reg.exec(img)){ //输入了一个链接
                        var database = request({ // 内置http请求函数
                            url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + userID + "&url=" + encodeURIComponent(img),
                            //请求链接
                            "method": "get",
                            //请求方法
                            "dataType": "json",
                            //这里接口直接返回文本，所以不需要指定json类型数据
                        })
                        sendText(name + " 头像已修改，预览图片如下："+ image(img));
                    } else {
                        sendText(name + " 你的输入了一个非链接内容，头像修改失败；已退出。")
                    }      
                  }else if( iii ==2 ){

                sendText(name + "请在30秒内输入一个10个字符内的的新昵称或者输入【q】取消设置。")
                sec = input(30000)
                if (sec == "q" || sec == "Q" ||  sec == "" ) {

                    sendText(name + "(" + userID + ")" + "\n已退出修改。")
                    } else {


  var zhifu = sec.replace(/[^\u0000-\u00ff]/g,"aa").length;
  var zuida = "20";
            if (parseInt(zhifu) > parseInt(zuida)) {
                sendText(name + "(" + userID + ")" + "\n你输入的字符过多，未能成功设置，已退出修改。")
            } else {
                        var database = request({ // 内置http请求函数
                            url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + userID + "&name=" + encodeURIComponent(sec),
                            //请求链接
                            "method": "get",
                            //请求方法
                            "dataType": "json",
                            //这里接口直接返回文本，所以不需要指定json类型数据
                        })
                        sendText(name + " \n昵称修改成功，你的新昵称是："+ sec)

              }}
             }else if(iii ==3) {//修改邮箱
              var content = name + "\n请在60秒内输入一个邮箱地址，输入非邮箱地址内容退出修改。";
            xx = sendText(content)
                sec = input(60000)

		var email = this.sec;
		var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
		if(reg.test(email)){
 //输入了一个链接
                        var database = request({ // 内置http请求函数
                            url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + userID + "&email=" + encodeURIComponent(email),
                            //请求链接
                            "method": "get",
                            //请求方法
                            "dataType": "json",
                            //这里接口直接返回文本，所以不需要指定json类型数据
                        })
                        sendText(name + " 邮箱更新成功，新邮箱如下：" + email);
                    } else {
                        sendText(name + " 你的输入了一个非邮箱地址内容，邮箱📮修改失败；已退出。")
                    }      
             }else if( iii ==4 ){
                sendText(name + "请在30秒内输入一个30个字符内的的新签名或者输入【q】取消设置。")
                sec = input(30000)
                if (sec == "q" || sec == "Q" ||  sec == "" ) {

                    sendText(name + "(" + userID + ")" + "\n已退出修改。")
                    } else {
  var zhifu = sec.replace(/[^\u0000-\u00ff]/g,"aa").length;
  var zuida = "60";
            if (parseInt(zhifu) > parseInt(zuida)) {
                sendText(name + "(" + userID + ")" + "\n你输入的字符过多，未能成功设置，已退出修改。")
            } else {
                        var database = request({ // 内置http请求函数
                            url: "http://" + murl + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=gb&qq=" + userID + "&qm=" + encodeURIComponent(sec),
                            //请求链接
                            "method": "get",
                            //请求方法
                            "dataType": "json",
                            //这里接口直接返回文本，所以不需要指定json类型数据
                        })
                        sendText(name + " \n签名修改成功，你的新签名是："+ sec)
                      }
                   }
              }else{sendText("你未选择已退出修改，本次无任何改动。")
            }
    }
}
main()