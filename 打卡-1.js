// [rule: ^打卡$]
// [rule: ^签到$]
//[priority: 1]优先级

function main() {
	var chatID = GetChatID();
	var username = GetUsername();
	var url = get("murl");
	var mkey = get("mkey");
	var date = new Date();
	var year = date.getFullYear();
	var zhi = "1";
	var yue = date.getMonth();
	var yuef = Number(yue) + Number(zhi);
	var jilu = year + yuef;
	var strDate = date.getDate();
	var J1 = "0";
	var J2 = "40";
	var J3 = "20";
	var J4 = "5";
	if (ImType() != "qq") {
		var UIN = GetUserID();
		var userID = get(UIN);
		if (!userID) {
			sendText("此平台无账号。");
		} else {
			var userID = get(UIN);
		}
	} else {
		var userID = GetUserID();
	}
	var database = request({
		// 内置http请求函数
		url:
			"http://" +
			url +
			"/svip/xin/api.php?apikey=" +
			mkey +
			"&user=" +
			bucketGet("qq", "masters") +
			"&type=cx&qq=" +
			userID,
		//请求链接
		method: "get",
		//请求方法
		dataType: "json",
		//这里接口直接返回文本
	});

	var zcode = database.code;
	var daka = database.memo;
	var point = database.point;
	var coin = database.coin;
	var charm = database.charm;
	var other = database.other;
	var money = database.money;

	var apikey = database.mkey;

	var clock = database.clock;
	var days = database.days;
	var days = Number(days) + Number(zhi);
	var img = decodeURIComponent(database.url);
	var touxiang = img.match(
		/^((ht|f)tps?):\/\/[\w-]+(\.[\w-]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/
	);
	var reg = RegExp(/http/);
	if (reg.exec(touxiang)) {
		//输入了一个链接
		var head = touxiang;
	} else {
		var head =
			"https://q.qlogo.cn/headimg_dl?dst_uin=" + userID + "&spec=100";
	}
	var jilu = Number(strDate) - Number(zhi);
	if (jilu == daka) {
		var clock = Number(clock) + Number(zhi);
	} else {
		var clock = zhi;
	}
	if (!money) {
		var money = "0";
	} else {
		var money = money;
	}
	if (zcode == 1) {
		//未注册
		id = sendText(
			username + "，你还没有账号，请先发送【注册】，注册一个账号吧！"
		);
	} else {
		// 已注册
		if (daka * 1 == strDate) {
			id = sendText(username + "，你今天已签过了，每天只可以打卡一次！");
		} else {
			let list = [
				"5",
				"5",
				"5",
				"5",
				"5",
				"4",
				"5",
				"5",
				"5",
				"5",
				"5",
				"3",
				"5",
				"5",
				"4",
				"5",
				"5",
				"5",
				"5",
				"5",
				"4",
				"5",
				"5",
				"5",
				"4",
				"5",
				"5",
				"5",
				"5",
				"5",
				"5",
				"4",
				"5",
				"5",
				"5",
				"5",
				"5",
				"5",
				"4",
				"5",
				"5",
				"5",
				"2",
				"5",
				"5",
				"4",
				"5",
				"5",
				"1",
				"5",
				"5",
				"5",
				"5",
				"5",
				"5",
				"4",
				"5",
				"5",
				"5",
				"5",
				"3",
				"5",
				"4",
				"5",
				"5",
				"5",
				"4",
				"5",
				"5",
				"5",
				"5",
				"5",
				"4",
				"5",
				"5",
				"5",
				"5",
				"5",
				"4",
				"5",
				"5",
				"5",
				"3",
				"5",
				"5",
				"4",
				"5",
				"5",
				"2",
				"5",
				"5",
				"5",
				"5",
				"5",
				"4",
				"5",
				"5",
				"4",
				"5",
				"5",
			];

			// 抽1个
			for (let i = 0; i < 1; i++) {
				const random = Math.floor(Math.random() * list.length);

				var jiangpin = list[random];

				// list.splice(random , 1)
				list[random] = list[list.length - 1];
				list.length--;
			}

			if (jiangpin == "1") {
				var zong = Number(J1) + Number(J1);
				var money = Number(money) + Number("15");
				sendText("🏅️恭喜你获得15.00MB🏅️");
				sendText("已为你充值到账户余额");
			} else if (jiangpin == "2") {
				var zong = Number(J1) + Number(J2);

				sendText("🥈恭喜你额外获得" + J2 + "积分🥈");
			} else if (jiangpin == "3") {
				var zong = Number(J1) + Number(J3);

				sendText("🥉恭喜你额外获得" + J3 + "积分🥉");
			} else if (jiangpin == "4") {
				var zong = Number(J1) + Number(J4);

				sendText("🎁恭喜你额外获得" + J4 + "积分🎁");
			} else {
				var zong = Number(J1) + Number(J1);
			}

			if (jilu * 1 == other) {
				var other = database.other;
				var charm = database.charm;
			} else {
				var other = jilu;
				var charm = "0";
			}

			var reg = RegExp(/MKEY/);
			if (reg.exec(apikey)) {
				var ready = "3";

				var points = "30";
				var coins = "3";
				var userarea = "SVIP用户";

			} else if (zcode == 0) 
			{
				//已注册非VIP打卡
				var points = "10";
				var coins = "1";
				var userarea = "普通用户";

				var ready = "1";
			} else {
				//已注册VIP用户打卡
				var points = "20";
				var coins = "2";
				var userarea = "VIP用户";

				var ready = "2";
			}
			
			var xpoint = Number(point) + Number(points) + Number(zong);
			var xcoin = Number(coin) + Number(coins);
			var database = request({
				// 内置http请求函数
				url:
					"http://" +
					url +
					"/svip/xin/api.php?apikey=" +
					mkey +
					"&user=" +
					bucketGet("qq", "masters") +
					"&type=gb&qq=" +
					userID +
					"&point=" +
					xpoint +
					"&coin=" +
					xcoin +
					"&memo=" +
					strDate +
					"&other=" +
					other +
					"&charm=" +
					charm +
					"&prize=10&money=" +
					money +
					"&days=" +
					days +
					"&clock=" +
					clock +
					"&ready=" +
					ready,
				//请求链接
				method: "get",
				//请求方法
				dataType: "json",
				//这里接口直接返回文本，所以不需要指定json类型数据
			});

			var state = database.code;

			if (state == 0) {
				if (ImType() == "qq") {
					sendText(
						image(head) +
							"[CQ:at,qq=" +
							userID +
							",text=@ ]  \n温馨提示：打卡成功！\n用户  I  D：" +
							userID +
							"\n用户类别：" +
							userarea +
							"\n累计打卡：" +
							days +
							"天\n连续打卡：" +
							clock +
							"天\n金币变动：" +
							coin +
							"枚 → " +
							xcoin +
							"枚\n积分变动：" +
							point +
							"分 → " +
							xpoint +
							"分\n游戏次数：10次\n个人主页：https://"+url+"/admin/" +
							userID
					);
				} else if (ImType() == "wx") {
					sendText(
						"@" +
							username +
							"  \n温馨提示：打卡成功！\n用户  I  D：" +
							userID +
							"\n用户类别：" +
							userarea +
							"\n累计打卡：" +
							days +
							"天\n连续打卡：" +
							clock +
							"天\n金币变动：" +
							coin +
							"枚 → " +
							xcoin +
							"枚\n积分变动：" +
							point +
							"分 → " +
							xpoint +
							"分\n游戏次数：10次\n个人主页：https://"+url+"/admin/" +
							userID
					);
				} else {
					sendText(
						image(head) +
							" \n温馨提示：打卡成功！\n用户  I  D：" +
							userID +
							"\n用户类别：" +
							userarea +
							"\n累计打卡：" +
							days +
							"天\n连续打卡：" +
							clock +
							"天\n金币变动：" +
							coin +
							"枚 → " +
							xcoin +
							"枚\n积分变动：" +
							point +
							"分 → " +
							xpoint +
							"分\n游戏次数：10次\n个人主页：https://"+url+"/admin/" +
							userID
					);
				}
			} else {
				sendText("打卡失败，请稍后再试！");
			}
		}
	}
}

main();
