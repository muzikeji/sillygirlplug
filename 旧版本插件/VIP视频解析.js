// [rule: 解析 ?]
// [rule: 视频解析 ]
// 解析路线
var parseInterfaces = [{ "name": "线路①(推荐)", "url": "https://okjx.cc/?url=" }, { "name": "线路②", "url": "https://vip.parwix.com:4433/player/?url=" }, { "name": "线路③", "url": "https://vip123kan.vip/m3u8.php?url=" }, { "name": "线路④", "url": "http://17kyun.com/api.php?url=" }, { "name": "线路⑤", "url": "https://vip.mmkv.cn/tv.php?url=" }, { "name": "线路⑥", "url": "https://660e.com/?url=" }, { "name": "线路⑦", "url": "https://jx.618g.com/?url=" }]


function main() {
  var sec = param(1);
  var i = 0
  var reg = /^((ht|f)tps?):\/\/[\w-]+(\.[\w-]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/;
  var parseInterfacesName = parseInterfaces.map(function (v, i) {
    var num = i + 1
    return "" + num + "：" + v.name + ""
  }).join('\n')
  var parseInterfacesUrl = []

  while (sec == "" || sec) {
    i++
    if (i > 6) return sendText("输入错误次数过多，已退出。")
    if (sec === 'q') return sendText("已退出操作")
    if (!reg.test(sec) && !parseInterfacesUrl.length) {
      sendText("请输入正确的链接，输入q退出")
      sec = input()
    }
    else if (Number(sec) >= 0 && Number(sec) <= parseInterfaces.length) {
      sleep(1000)
      sendText("" + parseInterfacesUrl[Number(sec - 1)] + "")
      sec = input()
      return
    } else {
      !parseInterfacesUrl.length && (parseInterfacesUrl = parseInterfaces.map(function (v, i) {
       var jxurl = parseInterfaces[i].url + sec
       var durl = request({
            url: "http://suol.cc/dwz.php?url=" + jxurl,
            dataType: "text"
        })
    if (ImType() != "tg") {
        var tishi = "检测到你使用的平台不支持打开此链接，请复制到浏览器打开。"
    } else {
        var tishi = "请点击播放链接观影。"
    }
         return "播放地址：" + durl + "\n" + tishi
      }))
      sleep(1000)
      sendText("请您选择需要的线路(输入序号)，输入q退出\n" + parseInterfacesName + "")
      sec = input()
    }
  }

}

main()