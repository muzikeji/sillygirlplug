// [rule: ^重置密码$]
// [rule: ^密码重置$]

function main() {
	var chatID = GetChatID();
	var username = GetUsername();
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
	var url = get("murl");
	var mkey = get("mkey");
	var database = request({
		// 内置http请求函数
		url: "http://" + url + "/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=cx&qq=" + userID,
		//请求链接
		method: "get",
		//请求方法
		dataType: "json",
		//这里接口直接返回文本
	});

	var zcode = database.code;
	if (zcode == 1) {
		//未注册
		sendText(username + "，你还没有账号，请先发送【注册】注册一个账号吧！");
	} else {
		// 已注册

		function randomString(len) {
			len = len || 32;
			var $chars =
				"ABCDEFGHIJKMNPQRSTWXYZ23456789"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
			var maxPos = $chars.length;
			var pwd = "";
			for (i = 0; i < len; i++) {
				pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
			}
			return pwd;
		}
		var pwd = randomString(10);
		var content =
			username +
			"你好！<br>   你的用户密码已重置为〖" +
			pwd +
			"〗，请及时在设置资料页面修改你的密码，谢谢！";
		var databa = request({
			// 内置http请求函数
			url:
				"你的发邮件api的地址?address=" +
				userID + "@qq.com&name=密码重置信息&certno=" +
				content,
			//请求链接
			method: "get",
			//请求方法
			dataType: "json",
			//指定json类型数据
		});
		var database = request({
			// 内置http请求函数
			url:
				"http://" +
				url +
				"/svip/" +
				mkey +
				".php?type=gb&qq=" +
				userID +
				"&pwd=" +
				pwd,
			//请求链接
			method: "get",
			//请求方法
			dataType: "json",
			//这里接口直接返回文本，所以不需要指定json类型数据
		});

		sendText(
			username +
				"，密码重置成功，密码已发送到你的" +
				userID +
				"@qq.com的QQ邮箱，请及时查收并修改新密码！"
		);
	}
}

main();
