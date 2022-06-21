
// [rule: ^抓绿钻ck$]
// [rule: ^抓绿钻CK$]
function main() {
    var userID = GetUserID()
sendText("请打开链接：https://app.womc.cn/qqkey/ykey.php，使用绿钻QQ扫码登录授权。")
        sendText("扫码登录后发送1继续\n如果能获取到你扫码的QQ号，视为成功。\n发送其他退出。")
       
        sec = input()
    if (sec == "1" ){
        var data = request({ 
        url: "https://app.womc.cn/qqkey/" + userID +".qkey" , dataType: "json" 
})
        sendText(data.uin)}
        
         else{

sendText("已退出")
    }
    

}

main()