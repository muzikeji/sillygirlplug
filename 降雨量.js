// [rule: ^降雨量$]
// [cron: 0 8 * * *]
// [disable: false] 是否禁用
function main() {
	var data = request({
		url: "https://api.iyk0.com/jyu/?type=json&t=" + Date.now(),
		dataType: "json",
	});
	var img = data.img;
	var content = image(img);
	var imType = ImType();
	if (imType == "fake") {
		var groups = [
			{
				imType: "tg",
				groupCode: -1001573562538,
			},
			{
				imType: "qq",
				groupCode: 66494848,
			},
		];
		//上面数字改成对应群号
		for (var i = 0; i < groups.length; i++) {
			groups[i]["content"] = content;
			push(groups[i]);
		}
	} else {
		sendText(content);
	}
}
main();
