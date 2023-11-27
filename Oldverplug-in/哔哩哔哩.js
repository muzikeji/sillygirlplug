//音乐搜索
// [rule: 哔哩哔哩]
// [rule: 哔哩随机]



function main() {
    
    var database = request({ 
        url: "http://api.klizi.cn/API/video/bilibili.php" , dataType: "json" 
    })
var url = database.video
var name = database.zz
var singer = database.bt
sendText("标题："+singer+"\n作者："+name+"\n播放地址："+url)
sendVideo(url)
   
}

main()