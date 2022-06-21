// 天行数据接口次数查询
// [rule: 接口查询 ? ] 接口查询 104
//自己去 https://www.tianapi.com/apiview/96 申请KEY替换一下
var key=get("tianapi_key");//天行数据申请的key网站https://www.tianapi.com/
function main() {
  var address = param(1) //匹配规则第一个问号的值
  console.log(address)
  var content = request({
    // 内置http请求函数
    url:"http://api.tianapi.com/userinfo/index?key="+key+"&apiid=" + address,//请求链接
    	  method: "get" //请求方法
    "dataType": "json", //这里接口直接返回文本，所以不需要指定json类型数据
  })
  //  if (!content) {
  //    data = "接口异常。" //请求失败时，返回的文字
  //}

  content = JSON.stringify(content)
  content = JSON.parse(content)
	
  if (content["code"] == 200) {
  	content = content.newslist[0]
    sendText(
      "账号剩余的天豆" +
        content.txcoin +
        "\n账号状态:" +
        content.user_level +
        "\n接口类型:" +
        content.api_type +
        "\n接口剩余的免费次数:" +
        content.api_give +
        "\n接口总请求次数:" +
        content.api_getnum +
        "\n更新时间:" +
        content.update_time
    )
  } else {
    sendText(content.msg)
  }
}
main()
