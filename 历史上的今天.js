// [rule: ^历史上的今天$]
function main() {
    var data = request({
        url: "http://ovooa.com/API/lishi/api.php?n=10",
        "method": "get",
        "dataType": "text",
    })
    var text = data.replace(/\\n/g, "\n")
    sendText(text)
}

main()