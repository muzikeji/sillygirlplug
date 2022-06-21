// [rule: 油价 ?]
// [rule: ?油价]

// [disable: true] 是否禁用 

/*
使用的天行数据API，需要申请天行key并申请使用此接口才能用。申请地址https://www.tianapi.com 
设置key方法 set otto tianapi_key ? 
*/
function main() {
      var userID = bucketGet("qq", "masters");
      var inputs = param(1);
      var apikey = get("tianapi_key");
      var murl = get("murl");
      var mkey = get("mkey") 
      var databas = request({ // 内置http请求函数
		url: "http://api.tianapi.com/oilprice/index?key=" + apikey + "&prov=" + inputs,
		// set otto tianapi_key ? //请求链接
		"method": "get",
		//请求方法
		"dataType": "text",
		//这里接口直接返回文本，所以不需要指定json类型数据
	});
	var data = databas.replace("}]", "").replace("[{", '"0",');
	var databa = eval("(" + data + ")");
	var msg = databa.msg;
	var reg = RegExp(/success/);
	if (reg.exec(msg)) {
		var p0 = databa.p0
		var p89 = databa.p89
		var p92 = databa.p92
		var p95 = databa.p95
		var p98 = databa.p98
		var time = databa.time
		var database = request({ // 内置http请求函数
			url: "http://" + murl + "/vip/api.php?type=cx&qq=" + userID,
			//请求链接
			"method": "get",
			//请求方法
			"dataType": "json",
			//这里接口直接返回文本
		});
		var zcode = database.code
		if (zcode != "1" || zcode != "0") {
			sendText("今日" + inputs + "油价如下\n⛽️零 号柴油：" + p0 + "元\n⛽️89号汽油：" + p89 + "元\n⛽️92号汽油：" + p92 + "元\n⛽️95号汽油：" + p95 + "元\n⛽️98号汽油：" + p98 + "元\n更新时间：" + time)
		} else {
			sendText(request({
				url: "http://" + url + "/vip/tuisong.txt",
				dataType: "text"
			}))
		}
	} else {
		sendText("你查询的地区暂不支持，请输入中国省份名查询。\n例如：浙江油价   或者  油价 浙江")
	}
}
main()