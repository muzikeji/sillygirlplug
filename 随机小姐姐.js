// [rule: 小姐姐]
// [rule: 扭一扭]
// [rule: 抖一抖]
function main() {
  var qqID = bucketGet("qq", "masters")
  var codes = get("mzvip");
  if (ImType() == "qq") { sendText("不支持QQ使用请到TG使用\nTG频道»https://t.me/muzikejipd\nTG群组 »https://t.me/muzikeji") } else {
    var url = "http://api.qemao.com/api/douyin/"
    red = request({
      url: url,
      dataType: "location",
    })
    if (red.indexOf("./") != -1) {
      url = url + red.replace("./", "")
      sendVideo(url)
    }
  }
}
main()