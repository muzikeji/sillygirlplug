//音乐搜索
// [rule: 随机音乐]


/*下面接口参数不要改，目前只能返回网易云*/

function main() {
  function RndNum(n)
{
    var rnd="";
    for(var i=0;i<n;i++)
        rnd+=Math.floor(Math.random()*10);
    return rnd;
}


var database = (RndNum(5));
sendText("[CQ:music,type=qq,id="+database+"]")
   
}

main()