// [rule:jx ?]
// [rule: raw [\s\S]*[#|@|$|%|¥|￥|（]([0-9a-zA-Z]{11,14})[#|@|$|%|¥|￥|）][\s\S]*]
// [rule: raw ([\s\S]*)([€《￥$₰¥₴¢（）()])([a-zA-Z0-9]{11,14})([€《￥$₰¥₴¢（）()])([\s\S]*)]
//[priority: 66]优先级
/*请先去申请Token
申请tg https://t.me/WALL_E_API   
插件作者：木子李
QQ：56794501
TG体验群组：https://t.me/muzitg
完成后set otto WALL 你的token*/
function main() {
	var jcode = GetContent();
	var WALLToken = get("WALL");
	var headers = {
		"User-Agent":
			"Mozilla/5.0 (Linux; U; Android 11; zh-cn; KB2000 Build/RP1A.201005.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 HeyTapBrowser/40.7.19.3 uuid/cddaa248eaf1933ddbe92e9bf4d72cb3",
		"Content-Type": "application/json;charset=utf-8",
		token: WALLToken,
	};
	try {
		var data = request({
			url: "http://158.101.153.139:19840/jCommand",
			headers: headers,
			method: "post",
			dataType: "json",
			body: { code: jcode },
		});

		if (data.code == "200") {
			var jdurl = data.data.jumpUrl;
			var title = data.data.title;
				sendText("活动名称：" + title + "\n活动链接：" + jdurl + "\n更多好物推荐：https://u.jd.com/cL58yXa");

		}
	} catch (e) {
		sendText("无法响应！！！");
	}
}
main();
