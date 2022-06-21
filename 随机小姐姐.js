// [rule: 小姐姐]
// [rule: 扭一扭]
// [rule: 抖一抖]
function main() {
     var qqID = bucketGet("qq","masters")
     var codes = get("mzvip") ;
    if (ImType() == "qq") {sendText("不支持QQ使用请到TG使用\nTG频道»https://t.me/muzikejipd\nTG群组 »https://t.me/muzikeji")}else{
        var database = request({ // 内置http请求函数
               url: "https://api.linhun.vip/api/Littlesistervideo?type=json", //请求链接
              "method": "get", //请求方法
              "dataType": "json", //这里接口直接返回文本，所以不需要指定json类型数据
})
        var url = database.video
          sendVideo(url)
   }
}
main()