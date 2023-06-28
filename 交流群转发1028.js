// [rule: raw ([\s\S]*)]
var message = param(1)
var chatID = GetChatID()
var imType = ImType()
var userID = +GetUserID()
var username = GetUsername()
var groups = [
    { imType: "qq", groupCode: 493514629 },
    { imType: "tg", groupCode: -1001569610841 },
    { imType: "wx", groupCode: 22988725866 },
]

function main() {
    if (["查询", "订阅"].indexOf(message) != -1) {
        Continue()
        return
    }
    if (chatID) {
        var go = false
        for (var i = 0; i < groups.length; i++) {
            if (groups[i].imType == imType && chatID == groups[i].groupCode) {
                go = true
                break
            }
        }
        if (go) {
            var prefix = "来自" + imType.toUpperCase() + "[" + username + "]的消息:\n"
            for (var i = 0; i < groups.length; i++) {
                if (groups[i].imType == imType && chatID == groups[i].groupCode) {
                    continue
                }
                groups[i]["content"] = prefix + message
                push(groups[i])
            }
        } else {
            Continue()
        }
    } else {
        Continue()
    }
}

main()