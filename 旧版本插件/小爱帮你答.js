// [rule: ?？]其他关键字
// [rule: ?啊]其他关键字
// [rule: 小爱?]其他关键字
// [rule: raw \[CQ:at,qq=1975537275,text=([^\[]+) ([\s\S]*)]
// [rule: raw \[CQ:at,qq=304625534,text=([^\[]+) ([\s\S]*)]
//[disable: false]是否禁用
//[imType:qq] 白名单
function main() {

    var input1 = param(1)
    var input2 = param(2)
    if (param(2) != "") {
        var data = request({
            url: "http://www.tuling123.com/openapi/api?key=77f2530f4d83405bb3a01a30014f6117&info=" + param(2),
            //请求链接
            "method": "get",
            //请求方法
            "dataType": "json",
            //这里接口直接返回文本，所以不需要指定json类型数据
        });

        sendText(data.text)
    } else {
        var data = request({
            url: "http://www.tuling123.com/openapi/api?key=77f2530f4d83405bb3a01a30014f6117&info=" + param(1),
            //请求链接
            "method": "get",
            //请求方法
            "dataType": "json",
            //这里接口直接返回文本，所以不需要指定json类型数据
        });

        sendText(data.text)
    }
}
main()