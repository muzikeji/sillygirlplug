// [rule: ?？]其他关键字
// [rule: ?吗]其他关键字
// [rule: 小爱?]其他关键字
// [rule: raw \[CQ:at,qq=1975537275,text=([^\[]+) ([\s\S]*)]
// [rule: raw \[CQ:at,qq=304625534,text=([^\[]+) ([\s\S]*)]
// [rule: raw \[CQ:at,qq=731428866,text=([^\[]+) ([\s\S]*)]
//[disable: false]是否禁用
//[imType:qq] 白名单
function main() {

    var input1 = param(1)
    var input2 = param(2)
    if (param(2) != "") {
var text = input2
   } else {var text = input2
}
  var data = request(
    {
      url: "http://openapi.turingapi.com/openapi/api/v2",
      method: "post",
      headers: {
        "Content-Type": 'application/json',
      },
body: JSON.stringify({
    reqType: 0,
    perception: {
      inputText: {
        text: text
      }
    },
    userInfo: {
      apiKey: "",//图灵apikey
      userId: "460134"
    }
  })

}  );

 

var data = JSON.parse(data)
              sendText(data.results[0].values.text)
}
main()