// [rule: raw ^颜值$]
//[priority: 350]优先级
// [disable: true] 是否禁用
function main() {
      sendText("请发送人脸图片给我:")
      sec = input(60000)
      var cont = encodeURI(sec)
       img = cont.match(/http(.*?)term/)[1]
       var reg = RegExp(/qpic.cn/);
       if(reg.exec(img)){   
       var imgurl = "http" + img + "term=255"
    var data = request({ // 内置http请求函数
        url: "http://mika.ovooa.com/api/image/%E9%A2%9C%E5%80%BC%E9%89%B4%E5%AE%9A.php?url="+ imgurl + "&type=json",
        //请求链接
        "method": "get",
        //请求方法
        "dataType": "json",
        //这里接口直接返回文本
    })
var ttish = data.text
       var reg = RegExp(/获取成功/);
       if(reg.exec(ttish)){ 
var miaoshu = data.data.text
var tu = data.data.image

             sendText(image(tu) + "\n综合评分描述:\n" + miaoshu)
     }else{
             sendText("失败了！可能你发的是外星人照片吧！" )
     }
     }else{
             sendText("链接获取失败！" + cont)
     }
}
main()