// [rule: 油价 ?]
// [rule: ?油价]
/*
开通木子VIP即可用。
*/
function main() {
      var userID = bucketGet("qq", "masters");
      var inputs = param(1);
      var murl = get("murl");
      var mkey = get("mkey") 
      var apikey = get("mvip") 
      var data = request({ // 内置http请求函数
		url: "https://api."+murl +"/api/oilcx/?muid="+ userID+"&mkey=" + apikey + "&ct=" + inputs,
		"method": "get",
		//请求方法
		"dataType": "json",
	});

	var msg = data.msg;
	var reg = RegExp(/成功/);
	if (reg.exec(msg)) {
		var p0 = data.p0
		var p90 = data.p90
		var p92 = data.p92
		var p95 = data.p95
		var p98 = data.p98
		var time = data.time

			sendText("今日" + inputs + "油价如下\n⛽️零 号柴油：" + p0 + "元\n⛽️90号汽油：" + p90 + "元\n⛽️92号汽油：" + p92 + "元\n⛽️95号汽油：" + p95 + "元\n⛽️98号汽油：" + p98 + "元\n更新时间：" + time)

	} else {
		sendText("查询失败！\n"+ msg)
	}
}
main()