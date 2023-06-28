//[rule:AI回话]

var begin = ""
var s = Sender
const prompt = "这是一个机器人";
const apiUrl = "https://zili.ml";
var apikey = "";
const username = GetUsername()
if (!apikey) {
  var apikey = bucketGet("otto", "apikey")
  if (!apikey) {
    sendText("请请在脚本开头的apikey内配置你的key或者使用命令'set otto apikey ?'设置你的key")

  }
}

function main() {
  var id = "" + new Date().getTime()
  var data = request(
    {
      url: apiurl + "/v1/chat/completions",
      method: "post",
      headers: {
        "Content-Type": 'application/json',
        "Authorization": "Bearer " + apikey,
      },
      body: {
        "model": "gpt-3.5-turbo",
        "messages": [{ "role": "system", "content": prompt }, { "role": "user", "content": ct }],
        "temperature": 0.7,
      }

    }

  );
  console.log(JSON.parse(data))
  var godata = JSON.parse(data);
  var content = godata.choices[0].message.content;

  if (!begin) {
    return "游戏故障。"
  }
  sendText(content)
  var stop = false
  var uid = s.GetUserID()
  s.Await(0, true, function(s) {
    var ct = s.GetContent()
    var me = s.GetUserID() == uid

    if (strings.Contains(ct, "退出会话")) {
      if (me || s.IsAdmin()) {
        stop = true
        return
      } else {
        return GoAgain("这不是你发起的会话，你不可以退出哦～")
      }
    }
    uid = s.GetUserID()
    if (!stop) {
      return GoAgain(data)
    }
    return data
  })
  sleep(1000)
}

sendText(main())