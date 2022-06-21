//[rule: 搜安卓 ? ]
//[rule: 搜apk?]

function main() {
	var text = encodeURI(param(1));
	var data = request({
		method: "GET",
		url:
			"https://cftweb.3g.qq.com/qqappstore_cgi/getSearchSuggest?keyWord=" +
			text +
			"&contextData=&pageSize=12",
		headers: {
			"Accept-Language": "zh-CN,zh-Hans;q=0.9",
			"User-Agent":
				"Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
		},
	});

	var json = JSON.parse(data);
	var total = json.data.appList.length;
	var rts = [];
	for (var i = 0; i < total; i++) {
		var db = json.data.appList[i];
		var icon = db.iconUrl;
		rts.push(
			image(icon) +
				"名称：" +
				db.appName +
				"\n简介：" +
				db.shortDesc.substring(0, 80) +
				"……\n大小：" +
				(db.fileSize / 1048576).toFixed(2) +
				"M\n下载地址：" +
				db.apkUrl +
				"\n\n——————分割线——————"
		);
		if ((i + 1) % 8 == 0) {
			sendText(
				rts.join("\n\n") +
					"\n\n 1分钟内输入【n】查看更多好玩应用，输入其他任意字符退出。"
			);
			rts = [];
			var uin = input(60000);
			if (uin != "n") {
				if (uin.indexOf("iOS应用")) {
					Continue();
				}
				return;
			}
		}
	}
	if (rts.length != 0) {
		sendText(rts.join("\n\n"));
	}
}

main();
