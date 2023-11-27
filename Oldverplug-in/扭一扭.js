// 扭一扭
// [rule: 扭一扭]
function main() {
    var murl = get("murl") 
    var url = "http://" + murl + "/admin/WM/video.php?t=" + Date.now();
    data = request({
		url: url,
		dataType: "location",
	});
    sendVideo(data)
   
}

main()