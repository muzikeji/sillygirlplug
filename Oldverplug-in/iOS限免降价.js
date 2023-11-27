//[rule: iOS限免降价 ]
//[rule: 今日限免 ]
//[rule: 今日降价]
// iOS限免降价应用查询

function main() {
	var data = request({
		method: "GET",
		url: "https://api.gofans.cn/v1/m/app_records?page=1&limit=50",
		headers: {
			Origin: "https://m.gofans.cn",
			"Accept-Language": "zh-CN,zh-Hans;q=0.9",
		},
	});

	var json = JSON.parse(data);
	var total = json.data.length;
	var rts = [];
	for (var i = 0; i < total; i++) {
		var db = json.data[i];
		var kind = db.kind;
		if (kind == 1) {
			var kind = "MacOS";
		} else {
			var kind = "iOS";
		}
		var uuid = db.uuid;
		var icon = db.icon;
		var data2 = request({
			method: "GET",
			url: "https://api.gofans.cn/v1/m/apps/" + uuid,
			headers: {
				Origin: "https://m.gofans.cn",
				"Accept-Language": "zh-CN,zh-Hans;q=0.9",
			},
		});

		var json2 = JSON.parse(data2);
		var track_url = json2.track_url;

		rts.push(
			image(icon) +
				"名称：" +
				db.name +
				"\n简介：" +
				db.description.substring(0, 80) +
				"……\n价格：" +
				db.original_price +
				"¥  →  " +
				db.price +
				"¥\n支持系统：" +
				kind +
				"\n下载地址：" +
				track_url +
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
	sleep(500);
	sendText("结果展示完毕。");
}

main();
