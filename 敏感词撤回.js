// [rule: raw ([\s\S]*)你妈([\s\S]*)]
// [rule: raw ([\s\S]*)老子([\s\S]*)]
// [rule: raw ([\s\S]*)母亲([\s\S]*)]
// [rule: raw ([\s\S]*)爷([\s\S]*)]
// [rule: raw ([\s\S]*)操你([\s\S]*)]
// [rule: raw ([\s\S]*)爸([\s\S]*)]
// [rule: raw ([\s\S]*)儿子([\s\S]*)]
// [rule: raw ([\s\S]*)孙子([\s\S]*)]
// [rule: raw ([\s\S]*)死妈([\s\S]*)]
// [rule: raw ([\s\S]*)阴间([\s\S]*)]
// [rule: raw ([\s\S]*)VPN([\s\S]*)]
// [rule: raw ([\s\S]*)毛泽东([\s\S]*)]
// [rule: raw ([\s\S]*)习近平([\s\S]*)]
// [rule: raw ([\s\S]*)共产党([\s\S]*)]
// [rule: raw ([\s\S]*)傻逼([\s\S]*)]
// [rule: raw ([\s\S]*)垃圾([\s\S]*)]
// [rule: raw ([\s\S]*)狗东西([\s\S]*)]
//[priority: 350]优先级
// [disable: false] 是否禁用
function main() {
    var chatID = GetChatID()
    var username = GetUsername()
    var userID = GetUserID()
    var time = "600" //禁言时长
    if (ImType() == "wx" || ImType() == "wxmp") {
     }else{
    if (isAdmin()) { //机器人管理员
     sendText("👌")
    } else {//普通用户
        RecallMessage(GetMessageID()) //撤回群消息
        sendText("警告：请注意你的言词，否则你将！被移除群聊！\n昵称：" + username + "\nID：" + userID + "\n禁言：" + time + "秒！")//发送警告语
        GroupBan(userID, time)//禁言
    }
}
} 
main()