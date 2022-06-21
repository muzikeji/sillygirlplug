//音乐搜索
// [rule: MV ?]
// [rule: mv ?]

/*
name=QQ、酷狗、网易、酷我音乐，QQ、酷狗MV;
parameter=msg、n、type，msg为必填值，即歌曲名或mv名；n为数字，无n参数时返回列表，有n时返回n所代表的内容；type为数据来源，type为必填值，可为qq、kg、kw、wy、qqmv、kgmv;
code=20为正常，201为获取出错，202为参数错误;
*/

function main() {
    var type = get("music") ;
    var keyword = encodeURI(param(1))
    var data = request({
        url: "https://api.womc.cn/api/yy/yy.php?type="+type+"&msg=" + keyword +"&n=",
        "dataType": "text"
    })
    var total = data.length
    if (!total) {
        sendText("抱歉，没有找到相关歌曲。")
        return
    }
 sendText( data )
    sleep(1000)
        sendText("请发送你要听的歌曲序号")
        sec = input()
    if (sec > 30) {
        sendText("没有找到对应的歌曲。")
        return
    }
    var database = request({ 
        url: "https://api.womc.cn/api/yy/api.php?type="+type+"&msg=" + keyword +"&n=" + sec, dataType: "json" 
    })
sendText(image(database.pic) +"\n歌名：" + database.song +"\n歌手：" +  database.singer + "\n播放链接："+ database.url)
   
}

main()