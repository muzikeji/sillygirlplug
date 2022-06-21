// [rule: raw \[CQ:face,id=(\d+)]
// [disable: true] 是否禁用

function main() {
    var sec = param(1)
if (ImType() == "qq") {
        sendText("[CQ:face,id=" + sec + "]")
    }else{
            }
}

main()