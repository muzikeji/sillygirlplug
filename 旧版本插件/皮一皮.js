//听说你很喜欢皮？
// [rule: 皮一皮]


function main() {
    var data = request({
        url: "http://xiaoapi.cn/api/pp.php?id=2",
        "dataType": "text"
    })
sendText(data.replace(/\\n/g, "\n"))
}
main()