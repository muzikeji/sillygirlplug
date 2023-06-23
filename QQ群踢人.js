// [rule: raw \[CQ:at,qq=(\d+)]\s*/kick([\s\S]*)]
// [rule: raw \[CQ:at,qq=(\d+)]\s*踢([\s\S]*)]
// [rule: raw \[CQ:at,qq=(\d+)]\s*举报([\s\S]*)]
//[priority: 50]优先级

function main() {
    var userID = GetUserID() //获取操作者QQ
    var username = GetUsername()
    var why = param(3) //踢出原因
    var chufa = GetContent() //触发条件
    if (isAdmin()) { //机器人管理员操作
        sendText("是否拉黑此用户？发送【1】拉黑  |   发送其他不拉黑！")
        sr = input()
        if (sr == 1) { //确认拉黑
            var reject = "true"
            var tishi = "，并拉黑"
        } else { //不拉黑
            var reject = "false"
            var tishi = "，未拉黑"
        }
        if (why == "") { //原因为空，给其设置一个值。
            var why = "其他" //无原因赋予一个值其他。
            sendText("[CQ:at,qq=" + param(1) + ",text=" + param(2) + "] \n违规事件：" + why + "\n处理方式：移出群聊" + tishi + "。\n执行人：" + username + "(" + userID + ")" /*执行人信息自行修改一下，原因目前无法获取机器人信息*/ )
            sleep(3000) //等待3秒后踢出，让其知道死因。
            GroupKick(param(1), reject)
        } else { //有踢出原因获取并填充。
            sendText("[CQ:at,qq=" + param(1) + ",text=" + param(2) + "](" + param(1) + ") \n违规事件：" + why + "\n处理方式：移出群聊" + tishi + "。\n执行人：" + username + "(" + userID + ")" /*执行人信息自行修改一下，原因目前无法获取机器人信息*/ )
            sleep(3000) //等待3秒后踢出，让其知道死因。
            GroupKick(param(1), reject)
        }

    } else { //不是机器人管理员操作
        var reg = RegExp(/举报/);
        if (reg.exec(chufa)) { //普通用户举报别的用户，不弹出无权限提示
        } else { //普通用户执行踢人，弹出无权限提示
            sendText("你不是我的管理员，我没法帮你做这么重要的事情，不过我会帮你把此事反映给群主！")
        }
        if (why == "") { //原因为空，要求输入举报原因
            sendText("你没有写此用户违规信息哦！\n请将用户违规原因发给我！输入“q”取消举报！")
            sec = input()
            if (sec == "q" || sec == "Q" || sec == "") { //输入为Q或者空取消操作！
                sendText("已取消")
            } else { //输入了举报原因执行举报！
                sendText("结果：举报成功！\n昵称：" + param(2) + "\nID：" + param(1) + "\n违规事件：" + sec + "\n举报者：" + userID + "\n群主已收到通知，请等待处决！")
                notifyMasters("\n用户：" + param(1) + "\n违反：" + sec + "\n举报者：" + userID)
            }
        } else { //原因不为空，直接执行举报
            sendText("结果：举报成功！\n昵称：" + param(2) + "\nID：" + param(1) + "\n违规事件：" + why + "\n举报者：" + userID + "\n群主已收到通知，请等待处决！")
            notifyMasters("\n用户：" + param(1) + "\n违反：" + why + "\n举报者：" + userID)
        }
    }
}
main()