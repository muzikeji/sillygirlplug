// [rule: raw \[CQ:file,name=(.*?),url=(.*?),size=([\s\S]*)\]]
//[priority: 450]优先级
// [disable: false] 是否禁用
//[show: 获取QQ文件链接] 
//[imType:qq] 白名单,只在qq生效
function main() {
      sec = param(2)
      var wurl = encodeURI(sec)
      sendText(wurl)
}
main()