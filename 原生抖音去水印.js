// [rule: raw (https?://v\.douyin\.com/\w+/?)]
//[priority: 6]优先级
/*author∶木子李
QQ∶56794501
tg∶https://t.me/muziyuan
*/
function main() {
	data = request({
		url: param(1),
		dataType: "location",
	});
	var ids = data.match(/video\/(\S*)\/\?/)[1];
	var url =
		"https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=" + ids;
	var json = request({
		url: url,
		method: "get",
		headers: {
			"User-Agent":
				"Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
			"Accept-Language": "zh-CN,zh-Hans;q=0.9",
		},
	});
	var json = JSON.parse(json);
	var playurl = json.item_list[0].video.play_addr.url_list[0];
	sendText(playurl.replace("playwm", "play"));
}

main();
