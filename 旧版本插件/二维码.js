//二维码生成插件
//[rule: 二维码 ?]
//[priority: 11111]
Sender.Reply(image(`http://jjysq.cn/api/qr.php?text=${param(1)}`))