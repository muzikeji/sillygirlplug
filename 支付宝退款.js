// [rule: raw 退款([\s\S]*)([0-9]{16}$)([\s\S]*)]
// [rule: raw 退钱([\s\S]*)([0-9]{16}$)([\s\S]*)]
// [admin: true]
// [priority: 10000]优先级
function main() {
	var murl = get("murl");

	var chatID = GetChatID();
	var username = GetUsername();
	var ddh = param(2);
	var datas = request({
		// 内置http请求函数
		url: "http://" + murl + "/pay/stats.php?tid=" + ddh,
		//请求链接
		method: "get",
		//请求方法
		dataType: "json",
		//这里接口直接返回文本，所以不需要指定json类型数据
	});

	var stats = datas.stats;
	var time = datas.time;
	if (stats == "create") {
		// 订单未支付

		sendText(
			"订单号：" +
				ddh +
				"\n创建时间：" +
				time +
				" \n订单状态：该订单未支付。"
		);
		return;
	} else if (stats == 666) {
		// 订单已支付

		var m = datas.amount;
	} else {
		// 订单不存在

		sendText(
			"订单号：" +
				ddh +
				"\n创建时间：null \n订单状态：该订单不存在，请核对！"
		);
		return;
	}
	sendText(
		"当前退款订单：" +
			ddh +
			"\n订单金额：" +
			m +
			"元\n确认退款请输入［y］，输入其他内容取消。"
	);
	iii = input(10000);
	if (iii == "y") {
		//确定退款

		var content = request({
			// 内置http请求函数
			url: "http://" + murl + "/pay/refund.php?ddh=" + ddh + "&m=" + m,
			//请求链接
			method: "get",
			//请求方法
			dataType: "json",
			//指定json类型数据
		});

		xxx = sendText(
			"退款订单：" +
				ddh +
				"\n退款状态：" +
				content.state +
				"\n退款金额：" +
				content.jine +
				"元。"
		);
	} else {
		sendText("已退出。");
	}
}

main();
