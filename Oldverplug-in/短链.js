// [rule: 短 ?]
function main() {
    var long_url = param(1)
    var data = request({
        url: "http://if4.cc/api.php?url=" + long_url,
        "method": "get",
        "dataType": "json",
    });
    
    sendText(data.shorturl)
}
main()