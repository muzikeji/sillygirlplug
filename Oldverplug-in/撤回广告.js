// [rule: raw ([\s\S]*)葒笣([\s\S]*)]
// [rule: raw ([\s\S]*)日赚([\s\S]*)]
// [rule: raw ([\s\S]*)代理([\s\S]*)]
// [rule: raw ([\s\S]*)钱([\s\S]*)]
// [rule: raw ([\s\S]*)日结([\s\S]*)]
// [rule: raw ([\s\S]*)共同富裕([\s\S]*)]
// [rule: raw ([\s\S]*)💰([\s\S]*)]
// [rule: raw ([\s\S]*)元/月([\s\S]*)]
// [rule: raw ([\s\S]*)元/年([\s\S]*)]
// [rule: raw ([\s\S]*)元/永久([\s\S]*)]
// [rule: raw ([\s\S]*)元/日([\s\S]*)]
// [rule: raw ([\s\S]*)月入([\s\S]*)]
// [rule: raw ([\s\S]*)一天可赚([\s\S]*)]
// [rule: raw ([\s\S]*)本金([\s\S]*)]
// [rule: raw ([\s\S]*)门槛([\s\S]*)]
// [rule: raw ([\s\S]*)联系([\s\S]*)]
// [rule: raw ([\s\S]*)单日([\s\S]*)]
// [rule: raw ([\s\S]*)提现([\s\S]*)]
// [rule: raw ([\s\S]*)([￥¥])([\s\S]*)]
// [rule: raw ([\s\S]*)([€《￥$₰¥₴¢])([a-zA-Z0-9]{13})([€《￥$₰¥₴¢])([\s\S]*)]
//[priority: 0]优先级
//[imType:qq] 白名单
//[userId-:1301517532,56794501] 黑名单不生效
// [disable: false] 是否禁用
function main() {
    var chatID = GetChatID()
    var username = GetUsername()
    var userID = GetUserID()
    //var time = "60" //禁言时长
    if (isAdmin()) { //QQ等于群主QQ
     sendText("👌")
    } else {//普通用户
        RecallMessage(GetMessageID()) //撤回群消息
        sendText("警告：消息含广告/金钱交易/诈骗/政治敏感/诋毁别人/辱骂/长辈称呼/脏话等内容！凡是与钱有关的东西，请勿相信！")
        //GroupBan(userID, time)
    }

} //框架结束
main()