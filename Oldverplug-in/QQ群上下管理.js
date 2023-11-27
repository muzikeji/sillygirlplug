// [rule: raw \[CQ:at,qq=(\d+),text=([^\[]+)]\s*权限(\d+)]
//[priority: 50]优先级
// [admin: true]

function main() {
	var skey = get("skey");
	var paypskey = get("paypskey");
	var userID = bucketGet("qq", "masters");
	var username = GetUsername();
	var time = "360000";
	var qq = param(1); //QQ号
	var kt = param(3); //权限
	var chatID = GetChatID(); //获取群号
	var murl = get("murl");
	if (kt == "3") {
		GroupBan(param(1), +time);

sendText("QQ："+ qq+"\n已被禁言3600秒！")

	} else if (kt == "4") {
		GroupKick(param(1), "true");

sendText("QQ："+ qq+"\n已被踢出群聊并拉黑！！")

	} else {
		var data = request({
			//继续请求
			url:
				"http://lkaa.top/API/quns/api.php?qq=" +
				userID +
				"&skey=" +
				skey +
				"&pskey=" +
				paypskey +
				"&group=" +
				chatID +
				"&uin=" +
				qq +
				"&kt=" +
				kt,
			//kt类型，1为上管理，2为取消管理
			dataType: "json",
		});
		var code = data.code; //获取状态码
		var text = data.text; //获取状态
		if (code != 1) {
			sendText(
				"[CQ:at,qq=" +
					userID +
					",text=@" +
					username +
					"]\n你的QQkey已过期请重新抓取。"
			);
		} else {
			sendText(
				"[CQ:at,qq=" + userID + ",text=@" + username + "]\n" + text
			);
		}
	}
}
main();
