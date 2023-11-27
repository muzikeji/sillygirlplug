//[rule:AI你好]
//[rule:ai你好]
var begin = ""
var s = Sender
const prompt = "这是一个机器人";
const apiurl = "https://zili.ml";
var apikey = "sk-0zZG3WCOE***********************";
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
        "messages": [{ "role": "system", "content": prompt }, { "role": "user", "content": "你好" }],
        "temperature": 0.7,
         "max_tokens": 150,
      }

    }

  );
  console.log(JSON.parse(data))
  var godata = JSON.parse(data);
  var content = godata.choices[0].message.content;

  if (!content) {
    return "系统故障。"
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
         "max_tokens": 150,
      }

    }

  );
  console.log(JSON.parse(data))
  var godata = JSON.parse(data);
  if (!godata) {
    return "数据太长发送失败。"
  }
  var content = godata.choices[0].message.content;

  if (!content) {
    return "系统故障。"
  }
  sendText(content)
    uid = s.GetUserID()
    if (!stop) {
      return GoAgain(begin)
    }
    return begin
  })
  sleep(1000)
}
var strings = {
  Contains: function(a, b) {
    return a.indexOf(b) != -1;
  }
};
sendText(main())