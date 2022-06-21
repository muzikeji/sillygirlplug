// [rule: 语音 ?]
// [rule: 快说?]
// [rule: 。?]
// [rule: -?]
//[priority: -116]优先级
//[imType:qq] 白名单
function main() {
    var qqID = GetUserID()
    var muzi = get("mzvip") ;
    var text = param(1)
    var username = GetUsername() //获取用户
    var url = "http://tts.youdao.com/fanyivoice?word="+text+"&le=zh&keyfrom=speaker-target"
    var burl = encodeURI(url)
    var durl = request({
            url: "http://api.muvip.cn/api/dwz/?url=" + burl.replace(/&/g, "%26"),
            dataType: "json"
        })
   var mcurl = durl.url
    var userimg = "https://q1.qlogo.cn/g?b=qq&s=100&nk=" + qqID;
    var txurl = encodeURI(userimg)
    var tdurl = request({
            url: "http://api.muvip.cn/api/dwz/?url=" + txurl.replace(/&/g, "%26"),
            dataType: "json"
        })
   var useimg = tdurl.url
   var a = "[CQ:xml,data=<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\" ?><msg serviceID=\"2\" templateID=\"12345\" action=\"web\" brief=\"&#91;新消息&#93;"
   var b = "\" sourceMsgId=\"0\" url=\""
   var c = "\" flag=\"0\" adverSign=\"0\" multiMsgFlag=\"0\"><item layout=\"2\"><audio cover=\""
   var d = "\" src=\""
   var e = "\" /><title>你有一条新消息请查收！</title><summary>"
   var f = text + "\n    --"+username +" \n你可以点击卡片收听！</summary></item><source name=\"木子科技\" icon=\"https://muziii.com/wp-content/uploads/2022/04/0e03c1ae94a0.png\" action=\"app\" appid=\"1101079856\" /></msg>,type=normal]"
sendText(a+ text +b+mcurl +c+useimg+d+mcurl +e+f)
}
main() 