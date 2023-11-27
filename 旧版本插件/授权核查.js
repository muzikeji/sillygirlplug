// [rule: ^授权核查$]
// [rule: ^对接核查$]
// [rule: ^授权查询$]
// [admin: true]
function main() {
    var username = GetUsername()
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
    var iurl = "muvip.cn"
    var mastersID = bucketGet("qq", "masters");//管理员账号
    var murl = get("murl");//设置的URL
    var mvip = get("mvip");//设置的授权码
    var mkey = get("mkey");//设置的对接key
    if(mkey){
         this.pmkey = mkey.substring(0,3)+'****'+mkey.substring(7,10)+ "***"+mkey.substring(14,15);
     }else{
                 this.pmkey = "暂无key"
     }
    var database = request({ // 内置http请求函数
        url: "http://muvip.cn/vip/api.php?type=cx&qq=" + userID,
        //请求链接
        "method": "get",
        //请求方法
        "dataType": "json",
        //这里接口直接返回文本
    })
    var zcode = database.code;//实际授权码
    var apikey = database.mkey
     if (zcode == "1" || zcode == "0") {
         var sqzt = "🔴（未授权）"
      } else { // 已授权
         var sqzt = "🟢（正常）"
      var reg = RegExp(/KEY/);
       if(reg.exec(apikey)){
                 this.svip = apikey.substring(0,3)+'****'+apikey.substring(7,10)+ "***"+apikey.substring(14,15);
          }else{
                 this.svip = "暂无key"
         }
        if (murl == iurl ||  murl == "jjysq.cn") {
            var urlzt = "🟢（正常）"
        } else {
            var urlzt = "🔴（错误）"
        }
        if (zcode == mvip) { 
            var vipzt = "🟢（正常）"
        } else {
            var vipzt = "🔴（错误）"
        }
        if (userID == mastersID ) {
            var sqqqzt = "🟢（正常）"
        } else {
            var sqqqzt = "🔴（错误）"
        }
        if (mkey == apikey) { 
            var keyzt = "🟢（正常）"
        } else {
             if (this.pmkey == this.svip) { 
             var keyzt = "🟡（未开通）"
              } else {
              var keyzt = "🔴（错误）"
              }
        }

    var content = "配置核对开始\n━━━━━━━━━━━\n授权状态：" + sqzt +"\n━━━━━━━━━━━\n授权码状态："  + vipzt + "\n设置信息：" + mvip + "\n授权信息：" + zcode + "\n━━━━━━━━━━━\n授权ID状态：" + sqqqzt + "\n设置信息：" + mastersID + "\n授权信息：" + userID + "\n━━━━━━━━━━━\nURL状态："  + urlzt + "\n设置信息：" + murl + "\n授权信息：muvip.cn ｜ jjysq.cn\n━━━━━━━━━━━\nMKEY状态：" + keyzt + "\n设置信息：" + this.pmkey + "\n授权信息：" + this.svip + "\n━━━━━━━━━━━\n配置核对结束"
      id = sendText(content)

    }
               sleep(600000)
               RecallMessage(id)
               RecallMessage(GetMessageID())
}

main()