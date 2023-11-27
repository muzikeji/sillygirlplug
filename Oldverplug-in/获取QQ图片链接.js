// [rule: raw ^传图$]
//[priority: 350]优先级
// [disable: false] 是否禁用
function main() {
      sendText("请发送图片给我:")
      sec = input(60000)
      var cont = encodeURI(sec)
       img = cont.match(/http(.*?)term/)[1]
       var reg = RegExp(/qpic.cn/);
       if(reg.exec(img)){ 
             sendText("http" + img + "term=255")
     }else{
             sendText("链接获取失败！" + cont)
     }
}
main()