// [rule: raw ^九宫切图$]
// [rule: raw ^九宫$]
// [rule: raw ^切图$]
//[priority: 350]优先级
// [disable: false] 是否禁用
function main() {
      var userID = GetUserID(); //获取操作者QQ
      sendText("请发送图片给我:")
      sec = input(60000)
      var cont = encodeURI(sec)
       img = cont.match(/http(.*?)term/)[1]
       var reg = RegExp(/qpic.cn/);
       if(reg.exec(img)){ 
             var imgurl = "http" + img + "term=255";
		var data = request({
			//继续请求
			url:
				"http://api.muvip.cn/api/jiugong/?imgurl=" + imgurl + "&id=" + userID,
			
			dataType: "json",
		});
const currentDate = new Date();
const timestamp = currentDate.getTime();

		var content = image(imgurl) + "\n切碎的图片如下\n" + image("http://api.muvip.cn/api/jiugong/img/" + userID  + "_1.png?t=" + timestamp) + image("http://api.muvip.cn/api/jiugong/img/" + userID  + "_2.png?t=" + timestamp) + image("http://api.muvip.cn/api/jiugong/img/" + userID  + "_3.png?t=" + timestamp) + image("http://api.muvip.cn/api/jiugong/img/" + userID  + "_4.png?t=" + timestamp) + image("http://api.muvip.cn/api/jiugong/img/" + userID  + "_5.png?t=" + timestamp) + image("http://api.muvip.cn/api/jiugong/img/" + userID  + "_6.png?t=" + timestamp) + image("http://api.muvip.cn/api/jiugong/img/" + userID  + "_7.png?t=" + timestamp) + image("http://api.muvip.cn/api/jiugong/img/" + userID  + "_8.png?t=" + timestamp) + image("http://api.muvip.cn/api/jiugong/img/" + userID  + "_9.png?t=" + timestamp);
 sendText(content)

     }else{
             sendText("链接获取失败！" )
     }
}
main()