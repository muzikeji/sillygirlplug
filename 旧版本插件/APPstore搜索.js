//[rule: 搜苹果 ? ]
//[rule: 搜iOS?]

function main() {
	var text = param(1);
	var data = request({
		method: "GET",
		url:
			"http://itunes.apple.com/cn/search?term=" +
			text +
			"&media=software&limit=20",
		headers: {
			Origin: "https://m.gofans.cn",
			"Accept-Language": "zh-CN,zh-Hans;q=0.9",
		},
	});

	var json = JSON.parse(data);
	var total = json.results.length;
	var rts = [];
	for (var i = 0; i < total; i++) {
		var db = json.results[i];
		var icon = db.artworkUrl100;
		rts.push(
			image(icon) +
				"名称：" +
				db.trackCensoredName +
				"\n简介：" +
				db.description.substring(0, 80) +
				"……\n价格：" +
				db.formattedPrice +
				"\n下载地址：" +
				db.trackViewUrl +
				"\n\n——————分割线——————"
		);
		if ((i + 1) % 5 == 0) {
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
	sleep(500);
	sendText("结果展示完毕。");
}

main();
