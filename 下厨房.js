//[rule: 菜谱 ? ]
//[rule: ?怎么做]

// 搜索页option
var options = {
          'method': 'GET',
		  'url': "https://www.xiachufang.com/search/?keyword=" + encodeURI(param(1)),
          'headers': {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
          },
     };
var imType = ImType();
var groudID = 18813517373;
var step = [];
var title = "";
// var url = "https://www.xiachufang.com/search/?keyword=" + encodeURI(param(1));

request(options, (error,response,body) => {

    if (error || response.statusCode != 200) {
            return
    }

    var b = body.replace(/\n/g, '');
	var item = b.match(/<p class="name">(.*?)<\/p>/g)[0].match(/href="(.*?)"/)[1]
	// 详情页option
	var optionD = {
		'method': 'GET',
		'url': 'https://www.xiachufang.com' + item,
		'headers': {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
          },
	}
    request(optionD, (error, response, body) => {
		
		if (error || response.statusCode != 200) {
           return
		}
		var d = body.replace(/\n/g, '');
		var name = d.match(/<h2 id="steps">(.*?)<\/h2>/g)
		title = name[0].split("          ")[1].split("        ")[0].replace("&nbsp;", "")
		var steps = d.match(/<p class="text" style="">(.*?)<\/p>/g)
		
		for (i = 0; i < steps.length; i++){
			step.push(`${i+1}. ${steps[i].replace('<p class="text" style="">','').replace('</p>','')}` )
		}

		if (imType == "fake") {
			var groups = [{
				imType: "wx",
				groupCode: groudID,
				}]
			for (var i = 0; i < groups.length; i++) {
				groups[i]["content"] = name + "\n" + step.join("\n")
				push(groups[i])
			}
		} else {
			sendText((title + "\n" + step.join("\n")).replace(/<br>/g, '\n').replace(/&nbsp;/g, ''))
		}
		
	})
		
	})
	// if (imType == "fake") {
	// 	var groups = [{
	// 		imType: "wx",
	// 		groupCode: groudID,
	// 		}]
	// 	for (var i = 0; i < groups.length; i++) {
	// 		groups[i]["content"] = title + "\n" + step.join("\n")
	// 		push(groups[i])
	// 	}
	// } else {
	// 	sendText('1')
	// }

