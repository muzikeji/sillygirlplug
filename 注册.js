// [rule: ^注册$]
// [rule: ^注册账户$]
//[priority: 1]优先级

function main() {
	var chatID = GetChatID();
	var username = GetUsername();
	var murl = get("murl");
	var mkey = get("mkey");
	var date = new Date();
	var strDate = date.getDate();
	if (ImType() == "tg") {
		sendText(
			"是否与 QQ 平台数据同步？\n 1.同步回复「y」或者「Y」\n 2.不同步回复「n」或者「N」\n 3.取消注册请回复其他内容。"
		);
		xz = input(30000);
		if (xz == "n" || xz == "N") {
			var userID = GetUserID();
			var UIN = GetUserID();
			set(UIN, GetUserID());
			var database = request({
				// 内置http请求函数
				url:
					"http://" +
					murl +
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
			if (zcode != 1) {
				sendText(username + "，你已有账号无需再次注册！");
				return;
			}
		} else if (xz == "y" || xz == "Y") {
			if (ImType() != "qq") {
				var UIN = GetUserID();
				var userID = get(UIN);
				if (!userID || userID == GetUserID()) {
					sendText(
						"绑定QQ账号(QQ号将作为你的ID账号)，请在30s内发送你的QQ号给我。你的QQ号码是:"
					);
					QQ = input(30000);
					var userqq = QQ.match(/[1-9][0-9]{4,10}/); //验证码
					if (userqq == "null" || !userqq) {
						sendText("输入超时或输入的不是QQ号码，已退出");
						return;
					} else {
						function randomWord(length = 32) {
							//默认32位
							//由以下元素组成
							let arr = [
								"0",
								"1",
								"2",
								"3",
								"4",
								"5",
								"6",
								"7",
								"8",
								"9",
							];
							let num = "";
							for (let i = 0; i < length; i++) {
								num +=
									arr[parseInt(Math.random() * arr.length)];
							}
							return num;
						}
						var codes = randomWord(6); //生成12位随机数
						var content =
							"你的验证码是： " +
							codes +
							"<br>请复制此码发送给机器人进行效验。";

						var databa = request({
							// 内置http请求函数
							url:
								"http://" +
								murl +
								"/api/em/?address=" +
								userqq +
								"@qq.com&name=MUZI用户系统注册验证码&content=" +
								content,
							//请求链接
							method: "get",
							//请求方法
							dataType: "json",
							//指定json类型数据
						});
						sendText(
							username +
								" 验证码已发送的邮箱：" +
								userqq +
								"@qq.com，为验证QQ号为你本人所有，请回复验证码："
						);
						xcode = input(120000);
						var regCode = xcode.match(/^\d{6}$/); //验证码
						if (regCode == codes) {
							var UIN = GetUserID();
							set(UIN, userqq);
							var userID = get(UIN);
						} else {
							sendText(
								"验证失败，你重新开始注册！务必正确填写验证码。"
							);
							return;
						}
					}
				}
			} else {
				var userID = get(UIN);
			}
		} else {
			sendText("主动取消或输入超时，已退出");
			return;
		}
	} else {
		var userID = GetUserID();
		var UIN = GetUserID();
	}
	if (userID == "null" || !userID) {
	} else {
		var database = request({
			// 内置http请求函数
			url:
				"http://" +
				murl +
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
		if (zcode != 1) {
			if (ImType() != "qq") {
				sendText(username + "， 绑定 QQ 账号成功。");
				var database = request({
					// 内置http请求函数
					url:
						"http://" +
						murl +
						"/svip/xin/api.php?apikey=" +
						mkey +
						"&user=" +
						bucketGet("qq", "masters") +
						"&type=gb&qq=" +
						userID +
						"&" +
						ImType() +
						"=" +
						UIN,
					//请求链接
					method: "get",
					//请求方法
					dataType: "json",
					//指定json类型数据
				});
			} else {
				sendText(username + "，你已有账号无需再次注册！");
				return;
			}
		} else {
			// 判断为没有账号

			var database = request({
				// 内置http请求函数
				url:
					"http://" +
					murl +
					"/svip/xin/api.php?apikey=" +
					mkey +
					"&user=" +
					bucketGet("qq", "masters") +
					"&type=sc&qq=" +
					userID +
					"&code=0&point=100&coin=5&memo=0&name=" +
					encodeURIComponent(username) +
					"&" +
					ImType() +
					"=" +
					UIN,
				//请求链接
				method: "get",
				//请求方法
				dataType: "json",
				//指定json类型数据
			});
			var CODE = database.code;
			if (CODE == 0) {
				sleep(1000);
				var head =
					"https://q.qlogo.cn/headimg_dl?dst_uin=" +
					userID +
					"&spec=100";
				sendText(
					image(head) +
						"\n通知：注册成功！\n用户昵称：" +
						username +
						"\n用户ID：" +
						userID +
						"\n送积分：100分\n送金币：5枚\n提示：资料可发送【修改资料】修改！"
				);
			} else {
				var database = request({
					// 内置http请求函数
					url:
						"http://" +
						murl +
						"/svip/xin/api.php?apikey=" +
						mkey +
						"&user=" +
						bucketGet("qq", "masters") +
						"&type=gb&qq=" +
						userID +
						"&code=0",
					//请求链接
					method: "get",
					//请求方法
					dataType: "json",
					//指定json类型数据
				});
				var CODE = database.code;
				if (CODE == 0) {
					sleep(1000);
					sendText(
						"通知：账号恢复成功！\n用户昵称：" +
							username +
							"\n用户ID：" +
							userID
					);
				} else {
					sendText("系统故障，请稍后再试。");
				}
			}
		}
	}
}
main();
