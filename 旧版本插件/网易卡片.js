//音乐搜索
// [rule: 网易 ?]


/*下面接口参数不要改，目前只能返回网易云*/

function main() {
    var murl = get("murl")
    var keyword = encodeURI(param(1))
    var data = request({
        url: "http://" + murl + "/api/wyyy.php?type=wy&msg=" + keyword +"&n=",
        "dataType": "text"
    })
    var total = data.length
    if (!total) {
        sendText("抱歉，没有找到相关歌曲。")
        return
    }
 sendText( data + "\n请发送你要听的歌曲序号")
        sec = input()
    if (sec > 30) {
        sendText("没有找到对应的歌曲。")
        return
    }
    var database = request({ 
        url: "http://" + murl + "/api/wyyy.php?type=wy&msg=" + keyword +"&n=" + sec, dataType: "text" 
    })
sendText("[CQ:music,type=163,id="+database+"]")
   
}

main()