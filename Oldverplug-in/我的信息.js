// [rule: ^我的信息$]
// [rule: ^余额查询$]
// [rule: ^信息查询$]
// [rule: ^积分查询$]
// [rule: ^金币查询$]
// [rule: ^查询$]
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
    var chatID = GetChatID()
    var url = get("murl") 
    var mkey = get("mkey") 
    var date = new Date();
    var year = date.getFullYear()
    var zhi = "1"
    var yue = date .getMonth();
    var yuef = Number(yue) + Number(zhi)
    var strDate = date.getDate()
    var database = request({ // 内置http请求函数
        url: "http://" + url +"/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=cx&qq=" + userID,
        //请求链接
        "method": "get",
        //请求方法
        "dataType": "json",
        //这里接口直接返回文本
    })

    var zcode = database.code
    var daka = database.memo
    var point = database.point
    var coin = database.coin
    var prize = database.prize
    var money = database.money
    var TG = database.tg
    var WX = database.wx
     if(WX){
           var wxid= WX.substring(0,3)+'****'+WX.substring(7,10)+ "***"+WX.substring(14,19);
       }else{
           var wxid=  "暂无绑定"
       }
    var name = decodeURIComponent(database.name)
    var charm = database.charm
    var img = decodeURIComponent(database.url)
    var email = decodeURIComponent(database.email)
    var qm = decodeURIComponent(database.qm)
    var apikey = database.mkey
    if (zcode == 1) { //未注册
        id = sendText(username + "，你还没有账号，请先发送【注册】注册一个账号吧！")

    } else { // 已注册
        if ((daka * 1) == strDate) {
            var ka = "已打卡"
            var prize = prize
        } else {
            var ka = "未打卡"
            var prize = "10"
        }
        if (zcode == 0) { //已注册非VIP打卡
            var vip = "未经授权"

        } else { //已注册VIP用户打卡
            var vip = "正版授权"
        }
        Email = email.match(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/);
        var reg = RegExp(/@/);		
        if(reg.exec(Email)){//输入了一个链接
             var email = email
         } else {
              var email = userID + "@qq.com"
         }
        touxiang = img.match(/^((ht|f)tps?):\/\/[\w-]+(\.[\w-]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/)
        var reg = RegExp(/http/);
        if(reg.exec(touxiang)){//输入了一个链接
             var tx = touxiang
         } else {
              var tx = "https://q.qlogo.cn/headimg_dl?dst_uin=" +userID + "&spec=100"
         }
         var reg = RegExp(/MKEY/);
         if(reg.exec(apikey)){
                 this.svip = apikey.substring(0,3)+'****'+apikey.substring(7,10)+ "***"+apikey.substring(14,15);
          }else{
                 this.svip = "暂未对接用户系统"
         }
    var content = image(tx) + "\n用户名称：" + name + "\n用户  I  D：" + userID + "\n用户邮箱：" + email + "\n当前群号：" + chatID + "\n本月魅力：" + charm +"💝\n现有积分：" + point + " 分\n现有金币：" + coin + " 枚\n游戏剩余：" + prize + "次\n用户资产：" + money + " 元\nVIP-状态：" + vip + "\n对接KEY：" + this.svip + "\n打卡状态：" + ka +  "\n已绑 W X：" + wxid +  "\n已绑 T G：" + TG + "\n个性签名：" + qm + "\n查询时间：" + (date.getFullYear()) + "年" + yuef + "月" + (date.getDate()) + "日 " + (date.getHours()) + ":" + (date.getMinutes()) + ":" + (date.getSeconds())
      id = sendText(content)

    }
               sleep(600000)
               RecallMessage(id)
               RecallMessage(GetMessageID())
}

main()