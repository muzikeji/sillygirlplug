//你不会百度？
// [rule: 百度 ?]


function main() {
  var word = encodeURI(param(1))
  var username = GetUsername()
    sendText( username+"，你好！为你找到以下内容。\n https://m.baidu.com/s?word=" +word)
    
}
main()