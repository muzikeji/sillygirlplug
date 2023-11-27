// [rule: 网易云]
// [rule: 网抑云]

var data = request({
	"url": "https://api.gmit.vip/Api/HotComments",
   "method": "get", //请求方法
   "dataType": "json", //这里接口直接返回文本，所以不需要指定json类型数据
   })
   var wyy = data.data.text
   sendText( wyy )