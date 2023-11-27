//频道:https://t.me/sillyGirl_Plugin，欢迎反馈
//京豆详情独立版，用于查询本人绑定账号收入详情，可供客户使用

//[rule:^豆豆$]

// [disable: false] 是否禁用


//2022-7-26 v1.0
//2022-7-27 v1.1 修复多容器不停重复通知的问题

function main(){
	let record=[]//记录已通知pin，防止多容器重复通知
	let notify=""
	let data=bucketGet("qinglong","QLS")
	if(data==""){
		sendText("醒一醒，你都没对接青龙，使用\"青龙管理\"命令对接青龙")
		return
	}
	var QLS=JSON.parse(data)
	let bind=GetBind(GetImType(),GetUserID())
	if(bind.length==0){
		sendText("您未绑定京东账号，请先使用“登陆”命令进行登陆绑定")
		return
	}
	for(let i=0;i<QLS.length;i++){
		let ql_host=QLS[i].host
		let ql_client_id=QLS[i].client_id
		let ql_client_secret=QLS[i].client_secret
		let ql_token=Get_QL_Token(ql_host,ql_client_id,ql_client_secret)
		if(ql_token==null){
			notify+="容器"+QLS[i].name+"token获取失败,跳过\n"
			continue 
		}
		let envs=Get_QL_env(ql_host,ql_token)
		for(let j=0;j<envs.length;j++){
			if(envs[j].name!="JD_COOKIE")
				continue
			for(let k=0;k<bind.length;k++){
				let pin=envs[j].value.match(/(?<=pt_pin=)[^;]+/g)[0]
				if(pin==bind[k]&&!FindEle(record,pin)){
					sendText(BeanInfo(envs[j].value))
					sleep(Math.random()*5000+1000)
					record.push(pin)
					if(record.length==bind.length)//已通知完
						return	
					break
				}
			}
		}		
	}
	return
}

main()

function FindEle(arr,ele){
	for(let i=0;i<arr.length;i++)
		if(arr[i]==ele)
			return i+1
	return 0
}
function BeanInfo(ck){
	let flag=0
	let page=1
	let info=[]//各项活动详情统计
	let date=new Date()
	let today=date.getDate()
	let sum=0
	let notify="\n【最近收入】\n"
	let latest=3
	while(!flag){
		let body=escape(JSON.stringify({
			"pageSize": "20", 
			"page": page.toString()
			}
		))
		let options = {
			url: "https://api.m.jd.com/client.action?functionId=getJingBeanBalanceDetail",
			method:"post",
			dataType:"json",
			body: "body="+body+"&appid=ld",
			headers: {
				"User-Agent": "jdltapp;iPad;3.7.0;14.4;network/wifi;hasUPPay/0;pushNoticeIsOpen/0;lang/zh_CN;model/iPad7,5;addressid/;hasOCPay/0;appBuild/1017;supportBestPay/0;pv/4.14;apprpd/MyJD_Main;ref/MyJdMTAManager;psq/3;ads/;psn/956c074c769cd2eeab2e36fca24ad4c9e469751a|8;jdv/0|;adk/;app_device/IOS;pap/JA2020_3112531|3.7.0|IOS 14.4;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
				"Host": "api.m.jd.com",
				"Content-Type": "application/x-www-form-urlencoded",
				"Cookie": ck
			}
		}
		let beaninfo=request(options)
		if(beaninfo&&beaninfo.code==0){
			for(let i=0;i< beaninfo.detailList.length;i++){
				let day=beaninfo.detailList[i].date.match(/(?<=-)\d+\s/)
				if(day!=today){
					flag=1
					break
				}
				if(latest-->0){
					notify+=beaninfo.detailList[i].eventMassage+" "+beaninfo.detailList[i].amount+" "+beaninfo.detailList[i].date+"\n"
				}
				sum+=Number(beaninfo.detailList[i].amount)
			
				let find=0
				for(let j=0;j<info.length;j++){
					if(info[j].event==beaninfo.detailList[i].eventMassage){
						info[j].amount+=Number(beaninfo.detailList[i].amount)
						find=1
						break
					}
				}
				if(!find){
					info.push({event:beaninfo.detailList[i].eventMassage,amount:Number(beaninfo.detailList[i].amount)})
				}
			}
		}
		else return "京豆数据获取失败"
		page++
	}
	info.sort(function(a,b){return a.amount-b.amount})
	for(let i=0;i<info.length;i++){
		notify=info[i].event+" "+info[i].amount+"\n"+notify
	}
	let userdata=JD_UserInfo(ck)
	return "账号【"+userdata.data.userInfo.baseInfo.nickname+"】今日收入"+sum+"豆\n"+notify	
}

function RealDay(date){
	let day=date.getDate()
	let hour=date.getHours()
	if(hour>=16)
		return 1
	else
		return 0
}


function GetBind(imtype,uid){
	let allpins=[]//傻妞中绑定该平台的所有pin
	let pin=[]//该用户所绑定pin
	if(imtype=="qq"){
		allpins=bucketKeys("pinQQ")
		for(let i=0;i<allpins.length;i++)
			if(bucketGet("pinQQ",allpins[i])==uid)
				pin.push(allpins[i])
	}
	else if(imtype=="tg"){
		allpins=bucketKeys("pinTG")
		for(let i=0;i<allpins.length;i++)
			if(bucketGet("pinTG",allpins[i])==uid)
				pin.push(allpins[i])
	}
	else if(imtype=="wx"){
		allpins=bucketKeys("pinWX")
		for(let i=0;i<allpins.length;i++)
			if(bucketGet("pinWX",allpins[i])==uid)
				pin.push(allpins[i])
	}
	else if(imtype=="wxmp"){
		allpins=bucketKeys("pinWXMP")
		for(let i=0;i<allpins.length;i++)
			if(bucketGet("pinWXMP",allpins[i])==uid)
				pin.push(allpins[i])
	}
	return pin
}

function Find_env(envs,string){
	for(i=0;i<envs.length;i++){
		if(envs[i].value.match(/(?<=pt_pin=)\S+(?=;)/g)==string|| envs[i].remarks==string||envs[i].name==string)
			return i
	}
	return -1
}

function GetJDUserName(pin){
	let pinNames=bucketGet("jd_cookie","pinName")
	if(pinNames=="")
		return null
	let data=JSON.parse(pinNames)
	for(let i=0;i<data.length;i++)
		if(data[i].pin==pin)
			return data[i].name
	return ""
}

function JD_UserInfo(ck){
	const options = {
      url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
	  method:"get",
	  dataType:"json",
      headers: {
		"User-Agent": "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Cookie": ck
      }
	}
	return request(options)
}

function Get_QL_Token(ql_host,ql_client_id,ql_client_secret){
		let data=request({url:ql_host+"/open/auth/token?client_id="+ql_client_id+"&client_secret="+ql_client_secret})
		data=JSON.parse(data)	
		if(data.code==200)
			return data.data.token
		else return null
}

function Get_QL_env(ql_host,ql_token){
	let response=request({
		url:ql_host+"/open/envs",
		method:"get",
		headers:{
			accept: "application/json",
			Authorization:"Bearer "+ql_token
		},
		dataType: "application/json"
	})
	return JSON.parse(response).data
}