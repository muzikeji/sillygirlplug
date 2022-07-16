// [rule: CK检测]
// [rule: 检测]
// [priority: 66]优先级
// [cron: 1 8-22/12 * * *]
// [admin: true]
/*
插件作者：木子李
插件维护及发布TG群组：https://t.me/muzitg
说明:采用京东官方API，请放心使用，建议对接聚合容器，一次检测所有cookie
*/
check();

function check() {
	let ql_name = "";
	let ql_json = bucketGet("qinglong", "QLS");
	var ql_NO = "2"; //自动检测时你想检测那个容器的CK，【青龙管理】返回的容器编号，建议填写聚合容器。
	var ql_data = JSON.parse(ql_json);
	var ql_total = ql_data.length;
	if (ImType() == "fake") {
		var i = Number(ql_NO) - Number("1");
	} else {
		if (!ql_total) {
			sendText("你没有配置青龙，请先发【青龙管理】配置后再来。");
			return;
		} else {
			for (var i = 0; i < ql_total; i++) {
				var name = ql_data[i].name;
				var ii = i + 1;
				ql_name += ii + "." + name + "\n";
			}

			sendText(
				"共有" +
					ql_total +
					"个青龙容器，请选择你要检测那个容器。(发编号)\n" +
					ql_name
			);
			var ii = input(10000);
			if (ii == "" || isNaN(ii)) {
				sendText("输入错误或超时，已退出。");
				return;
			}
		}
	}
	var i = ii - 1;
	//青龙参数
	let ql_ipport = ql_data[i].host;
	let client_id = ql_data[i].client_id;
	let client_secret = ql_data[i].client_secret;
	let adminMsg = "";
	var qltoken = request({
		// 内置http请求函数
		url:
			ql_ipport +
			"/open/auth/token?client_id=" +
			client_id +
			"&client_secret=" +
			client_secret,
		//请求链接
		method: "get",
		//请求方法
		dataType: "json",
		//这里接口直接返回文本
	});
	let token = qltoken.data.token;
	var url = ql_ipport + "/open/envs?searchValue=&t=" + Date.now();
	var json = request({
		url: url,
		method: "get",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: "Bearer " + token,
		},
	});
	var CKarray = JSON.parse(json);
	var total = CKarray.data.length;
	if (!total) {
		sendText("抱歉，没有找到数据。");
		return;
	} else {
		sendText("开始检测，共有" + total + "个JDCOOKIE。");
	}

	for (var i = 0; i < total; i++) {
		var cookie = CKarray.data[i].value;
		var pin = decodeURIComponent(
			cookie.match(/pt_pin=([^; ]+)(?=;?)/) &&
				cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]
		);
		var statejson = request({
			url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
			method: "get",
			headers: {
				"User-Agent":
					"Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
				Cookie: cookie,
			},
		});
		var data = JSON.parse(statejson);
		var state = data.msg;
		if (state == "not login") {
			//QQ绑定
			let user_id = bucketGet("pinQQ", encodeURIComponent(pin));

			//tg绑定
			let tg_user_id = bucketGet("pinTG", encodeURIComponent(pin));
			let msg =
				"您的账号: " +
				pin +
				" ，已过期,\n请您重新登录，若无法登录请发送COOKIE给我。";
			Debug(user_id);
			console.log(msg);
			//给QQ发
			adminMsg += pin + "\n";
			if (user_id) {
				push({
					imType: "qq",
					userID: user_id,
					groupCode: "",
					content: msg,
				});
			}
			//给TG发
			if (tg_user_id) {
				push({
					imType: "tg",
					userID: tg_user_id,
					groupCode: "",
					content: msg,
				});
			}
			sleep(20000); // 20秒后检测下一个
		}
	}
	if (ImType() == "fake") {
		notifyMasters("已经给以下账号\n" + adminMsg + "用户发送账号登陆提醒");
	} else {
		sendText("已经给以下账号\n" + adminMsg + "用户发送账号登陆提醒");
	}
}
