// [rule: 域名 raw ([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?)]
function main() {
	var chatID = GetChatID();
	var username = GetUsername();
	var userID = bucketGet("qq", "masters");
	var murl = get("murl");
	var code = get("mvip");
	var keyword = param(1).replace(" ", "");
	var icp = request({
		url:
			"http://api." +
			murl +
			"/api/shoulu?domain=" +
			keyword +
			"&type=icp",
		method: "get",
		dataType: "text",
	});
	var employ = request({
		url: "http://api." + murl + "/api/shoulu/baidu.php?domain=" + keyword,
		method: "get",
		dataType: "json",
	});
	var whois = request({
		url:
			"http://api." +
			murl +
			"/api/shoulu?domain=" +
			keyword +
			"&type=whois",
		method: "get",
		dataType: "text",
	});
	var tdk = request({
		url:
			"http://api." +
			murl +
			"/api/shoulu?domain=" +
			keyword +
			"&type=tdk",
		method: "get",
		dataType: "text",
	});
	var ping = request({
		url: "http://ovooa.com/API/ping/?url=" + keyword + "&num=5",
		method: "get",
		dataType: "json",
	});
	if (!ping || ping.code == -1) {
		sendText("域名打开失败，无法获取数据。");
	} else {
		sendText(
			"域名【" +
				keyword +
				"】信息如下：\n🔲站点信息\n" +
				tdk +
				"\n┄┅┄┅┄┅┄┅┄┅┄┅┄┅┄\n🔲收录信息\n域名：" +
				keyword +
				"\n百度收录：" +
				employ.data +
				" 条\n┄┅┄┅┄┅┄┅┄┅┄┅┄┅┄\n🔲超级ping\n域名：" +
				ping.data.url +
				"\n归属地：" +
				ping.data.address +
				"\n最小延迟：" +
				ping.data.small +
				"Ms\n最大延迟：" +
				ping.data.max +
				"Ms\n平均延迟：" +
				ping.data.average +
				"Ms\n发送包数量：" +
				ping.data.num +
				"\n接收包数量：" +
				ping.data.receive +
				"\n丢包率：" +
				ping.data.abandon +
				"\n总耗时：" +
				ping.data.Times +
				"Ms\n┄┅┄┅┄┅┄┅┄┅┄┅┄┅┄\n🔲WHOIS信息\n" +
				whois +
				"\n┄┅┄┅┄┅┄┅┄┅┄┅┄┅┄\n🔲备案信息\n" +
				icp +
				"\n信息采集于国家网络安全查询平台！"
		);
	}
}

main();
