// [rule: raw \[CQ:[image|flash]+,file=[0-9A-Za-z\-]*\.[jpg|gif|png|jpeg]+,url=(https://[0-9A-Za-z\-\.\_/]*\?term=\w)\]]
// [disable: true] 是否禁用

function main() {
    var sec = (GetContent())
if (ImType() == "qq") {
        sendText(sec)
    }else{
            }
}

main()