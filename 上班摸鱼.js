// [rule: 上班摸鱼]
// [rule: 摸鱼]
function main() {
    
    var data = request({ 
        url: "https://api.j4u.ink/proxy/remote/moyu.json",
        "method": "get",
        "dataType": "json",
    })

   sendImage(data.data.moyu_url)
}

main()