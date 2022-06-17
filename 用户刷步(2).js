// [rule: ^刷步$]
// [cron: 31 20 * * *]
//[priority: 100]优先级
// [disable: false] 是否禁用
function main() {
	var chatID = GetChatID(); //获取当前群号
	var userID = GetUserID(); //获取操作者QQ
	var murl = get("murl");
	var mkey = get("mkey");
	var username = GetUsername();
	if (userID == "") {
		//判定为定时任务
		var phone = "188888888888"; //内置账号
		var pwd = "123456"; //内置密码
		var min = 60000,
			//最小步数
			max = 90000; //最大步数
		var steps = Math.floor(Math.random() * (max - min) + min); //随机步数
		var database = request({
			// 内置http请求函数
			//url: "https://api.kit9.cn/api/Xiaomisteps/?xmmobile=" + phone + "&xmpsw=" + pwd + "&xmstep=" + steps,
			url:
				"http://api." +
				murl +
				"/api/shuabu/bu.php?u=" +
				phone +
				"&p=" +
				pwd +
				"&s=" +
				steps,
			//备用接口
			//请求链接
			method: "get",
			//请求方法
			dataType: "json",
			//指定json类型数据
		});
		var msg = database.msg;
		notifyMasters(msg); //通知管理员刷步情况
	} else {
		if (ImType() != "qq") {
			var UIN = GetUserID();
			var userID = get(UIN);
			if (!userID) {
				sendText("此平台无账，请先发送【注册】注册账号。");
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
				murl +
				"/svip/xin/api.php?apikey="+ mkey + "&user="+bucketGet("qq","masters")+"&type=cx&qq=" +
				userID,
			//请求链接
			method: "get",
			//请求方法
			dataType: "json",
			//这里接口直接返回文本
		});

		var zcode = database.code;
		var phone = database.xmuser;
		var pwd = decodeURIComponent(database.xmpwd);

		if (zcode == 1) {
			//未注册
			id = sendText(
				username + "，你还没有账号，请先发送【注册】，注册一个账号吧！"
			);
		} else {
			// 已注册
			var reg = /^1[34578][0-9]{9}$/;
			if (reg.test(phone)) {
				sendText(
					username +
						"，在30秒内输入你要刷的步数或者输入q退出，注意应该小于98000，如果大于则随机30000-90000步之间。\n请输入："
				);

				var steps = input(30000); //匹配的步数
				var xian = "98000"; //设定一个值，当步数小于此值时随机步数
				if (
					steps == "" ||
					steps == "0" ||
					isNaN(steps) ||
					steps == "q" ||
					steps == "Q"
				) {
					sendText("已退出");
				} else {
					if (parseInt(xian) < parseInt(steps)) {
						var min = 30000,
							//最小步数
							max = 90000; //最大步数
						var steps = Math.floor(
							Math.random() * (max - min) + min
						); //随机步数
						var database = request({
							// 内置http请求函数
							//url: "https://api.kit9.cn/api/Xiaomisteps/?xmmobile=" + phone + "&xmpsw=" + pwd + "&xmstep=" + steps,
							url:
								"http://api." +
								murl +
								"/api/shuabu/bu.php?u=" +
								phone +
								"&p=" +
								pwd +
								"&s=" +
								steps,
							//请求链接
							method: "get",
							//请求方法
							dataType: "json",
							//指定json类型数据
						});
						var msg = database.msg;
						sendText(msg); //通知操作者
					} else {
						var database = request({
							// 内置http请求函数
							//url: "https://api.kit9.cn/api/Xiaomisteps/?xmmobile=" + phone + "&xmpsw=" + pwd + "&xmstep=" + steps,
							url:
								"http://api." +
								murl +
								"/api/shuabu/bu.php?u=" +
								phone +
								"&p=" +
								pwd +
								"&s=" +
								steps,
							//请求链接
							method: "get",
							//请求方法
							dataType: "json",
							//指定json类型数据
						});
						var msg = database.msg;
						sendText(msg); //通知操作者
					}
				}
			} else {
				sendText(
					username +
						"，你还没有添加小米运动账号，请打开\n https://你的前端页面地址。\n添加一个账号吧！"
				);
			}
		}
	}
}

main();
