// [rule: ^用户中心$]
// [disable: false] 是否禁用  
// [admin: false]

function main() {
    sendText("请选择~\n🔸1 . 注册账号\n🔸2 . 打卡/签到\n🔸3 . 修改资料\n🔸4 . 用户信息\n🔸5 . 开通SVIP\n🔸6 . VIP状态\n🔸7 . 金币榜\n🔸8 . 魅力榜\n🔸9 . 积分榜\n🔸10 . 拼手气赢积分\n🔸11 . 注销账号\n🔸12 . 积分换币\n🔸13 . 币换积分\n🔸14 . 领QQ名片赞\n请在10秒内从中选择一个：");
    iii = input(10000)
    if (iii == 1) { //注册
   importJs('注册.js')
    } else if (iii == 2) { //打卡
   importJs('打卡.js')
    } else if (iii == 3) { //修改资料
   importJs('修改用户资料.js')
    } else if (iii == 4) { //信息查询
   importJs('我的信息.js')
    } else if (iii == 5) { //开SVIP
   importJs('开通SVIP.js')
    } else if (iii == 6) { //授权查询
   importJs('授权查询.js')
    } else if (iii == 7) { //金币榜
   importJs('金币榜.js')
    } else if (iii == 8) { //魅力榜
   importJs('魅力榜.js')
    } else if (iii == 9) {//积分榜
   importJs('积分榜.js')
    } else if (iii == 10) { //拼手气
   importJs('抽奖.js')
    } else if (iii == 11) { //注销账号
   importJs('注销账号.js')
    } else if (iii == 12) {//积分换币
   importJs('积分换币.js')
    } else if (iii == 13) { //币换积分
   importJs('币换积分.js')
    } else if (iii == 14) { //领QQ赞
   importJs('领赞插件.js')
    } else {
       var value = "q"
    }
    if (value == "q" || value == "Q" || value == "" || (!value)) {
        sendText("已退出。")
    } else {
    }
}
main()