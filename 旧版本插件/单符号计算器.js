//[rule: raw (\d+)(.*)(\d+)=([\s\S]*)]
//[priority: 1]优先级
function main() {
    var sec = (GetContent()).replace("[", "【")
    var shu1 = param(1)
    var shu2 = param(3)
    var fuhao = param(2).replace("x", "*").replace("X", "*").replace("÷", "/")
     var shu3 = eval(Number(shu1) + fuhao + Number(shu2))
    sendText(shu1 + fuhao + shu2 + "=" +shu3)
}
main()