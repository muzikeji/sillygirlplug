//[rule: raw p_skey=(.*); p_uin([\s\S]*)skey=(.*?); ([\s\S]*)]
// [admin: true]

function main() {
    var paypskey = param(1)
    var skey = param(3)
           set("paypskey", paypskey)
            set("skey", skey)
    sendText("已设置一下参数：\npaypskey：" + paypskey + "\nskey："  + skey)
}
main()