// [rule: raw \[CQ:flash,file=([0-9A-Za-z\-]*\.[jpg|gif|png|jpeg]+),url=(https://[0-9A-Za-z\-\.\_/]*\?term=\w)\]]
//[priority: 350]优先级
// [disable: false] 是否禁用
function main() {
      sec = param(2)

             sendImage(sec)
}
main()