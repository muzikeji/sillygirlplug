//频道:https://t.me/sillyGirl_Plugin，欢迎反馈

//[rule:^交换\s\d+\s\d+$]			
//交换两个账号顺序,不支持多容器
//例：交换 2 13

//[rule:^\S+,JD_COOKIE已失效。$]	
//通知特定客户ck失效
//使用方式-将傻妞通知“xxx,JD_COOKIE已失效。"重新复制粘贴发回给傻妞

//[rule:^移动\s\S+\s\d+$]  		
//移动环境变量位置，支持使用变量名、序号、备注，如是JD_COOKIE变量也可使用pt_pin值

//[rule:^通知失效$]
//一键通知所有CK失效账户,如需在群组通知请使用命令"set GroupNotify ? ?“设置通知群组，例set GroupNotify qq 12345678，设置后将仅在群组通知，取消命令将设置命令中的set改为delete即可

//[rule:^删除失效$]
//一键删除所有处于禁用状态的CK，需具备失效ck自动禁用

//[rule:^备份青龙变量$]
//可使用delete qinglong backup命令清除备份

//[rule:^恢复青龙变量$]
//恢复备份后会自动清除备份记录，即每个备份仅能恢复一次

//[rule:^导出客户Q绑$]

//[rule:^导入客户Q绑[\s\S]+]
//例：导入客户Q绑 xxx，需搭配“导出客户Q绑”命令使用

//[rule:^导出监控配置$]

//[rule:^导入监控配置[\s\S]+]
//例：导入监控配置 xxx
//社交平台消息长度限制，监控变量过多时可能无法发出导入数据，如无法导入可自行将导出信息添加到傻妞数据管理后台jd_cookie env_listens项

//[rule:^豆\d+$]
//[rule:^豆\s[\d]+\s[\d]+$]
//例：豆1，查看账号1的今日收入详情，单容器使用，若含多容器默认显示容器1
//例：豆 2 1，多容器使用，查看容器2账号1的京豆今日收入详情

//[rule:^保存客户昵称$]
//失效ck无法获取用户昵称，必须事先保存

// [admin: true] 是否只允许管理员使用


//-------难产项目---------//QQ有消息长度限制

//[:^导出青龙环境变量$]
//一键导出青龙环境变量,支持完整导出与最小化导出
//完整导出：多容器完整信息，可用于用于导入多容器

//[:^导入青龙环境变量 ?]
//命令：导入青龙环境变量 xxxxxxxx，xxxxxxx为"导出青龙环境变量"所导出的信息
//导入信息为多容器且傻妞绑定多个青龙容器时需一一选择导入容器



//2022-6-9 v1.3 修复多容器重复失效账号重复通知的问题
//2022-6-9 v1.4 添加对新版青龙支持，交互优化与代码优化，并为群发失效通知添加随机延时
//2022-6-10 v1.4.1 修复'xxx,JD_COOKIE已失效。'命令无反馈的问题
//2022-6-11 v.1.4.2 修复'xxx,JD_COOKIE已失效。'部分账号匹配失败的问题,并优化交互
//2022-6-12 v1.4.3 玄学优化,可能减少了一些bug，也可能增加了一些bug
//2022-6-20 v1.5 添加青龙环境变量备份与恢复、客户Q绑导出与导入功能
//2022-6-20 v1.5.1 添加监控配置导出与导入功能，残废
//2022-6-20 v1.5.2 恢复备份自动清除备份信息，防止不良插件窃取ck
//2022-6-21 v1.5.3 修改移动ck为移动环境变量，修复青龙存在其他变量时移动京东ck时的序号问题，可用于移动其他环境变量
//2022-6-26 v1.5.4 延长通知所有客户的随机延时，以降低冻结风险
//2022-6-30 v1.5.5 修复傻妞部分规则未录入的问题
//2022-7-2 v1.6.0 添加群组通知功能
//2022-7-22 v1.7.0 添加京豆详情查看
//2022-7-25 v1.7.1 玄学优化，部分代码优化与交互优化，修改客户通知为账号昵称
//2022-7-25 v1.7.2 修复未保存客户昵称导致通知报错的问题



	
var ql_host=""
var ql_client_id=""
var ql_client_secret=""
var ql_token=""


function main(){
	var user_id = GetUserID()
	var group_id = GetChatID()
	var msg_type = ImType()
	var msg=GetContent()
	var msg_id=GetMessageID()
	let data=bucketGet("qinglong","QLS")
	if(data==""){
		sendText("醒一醒，你都没对接青龙，使用\"青龙管理\"命令对接青龙")
		return
	}
	var QLS=JSON.parse(data)
	if(msg.indexOf("交换")!=-1){
		let params=msg.split(" ")
		sendText(Exchange_JDCK(QLS,params[1]-1,params[2]-1))
	}
	
	else if(msg.indexOf("JD_COOKIE")!=-1){
		let pin=msg.match(/^\S+(?=,)/g)
		sendText("已通知:"+pin+"\n"+sillyGirl.session("jd send "+pin +" "+msg)().message)		
	}
	
	else if(msg.indexOf("移动")!=-1){
		let params=msg.split(" ")
		sendText(Move_qlEnv(QLS,params[1],params[2]-1))		
	}
	
	else if(msg=="通知失效")
		sendText(Notify_AllCK_disabled(QLS))
	
	else if(msg=="删除失效")
		sendText(Delete_AllCK_disabled(QLS))
	
	else if(msg=="备份青龙变量")
		sendText(Backup_qlEnv(QLS))
	
	else if(msg=="恢复青龙变量")
		sendText(Recovery_qlEnv(QLS))
		
	else if(msg=="导出客户Q绑")
		sendText(Export_pinQQ())
		
	else if(msg.indexOf("导入客户Q绑")!=-1)
		sendText(Import_pinQQ(msg.match(/(?<=导入客户Q绑 )\S+/g)))
		
	else if(msg=="导出监控配置")
		sendText(bucketGet("jd_cookie","env_listens"))

	else if(msg.indexOf("导入监控配置")!=-1){
		RecallMessage(msg_id)
		sendText(Import_spy(msg.match(/(?<=导入监控配置 )\S+/g)))
	}
		
	else if(msg.indexOf("豆")!=-1){
		RecallMessage(msg_id)
		let params=msg.split(" ")
		if(params.length==3)
			sendText(Bean_Info(QLS,params[1],params[2]))
		else{
			let param=msg.match(/\d+/)
			sendText(Bean_Info(QLS,1,param))
		}
	}
	
	else if(msg=="保存客户昵称")
		sendText(SaveJDUserName(QLS))		
	return
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
 
function Bean_Info(QLS,n,m){
	if(n>QLS.length){
		return "不存在目标容器"
	}
	let flag=0
	let page=1
	let info=[]
	let date=new Date()
	let today=date.getDate()
	let sum=0
	let notify="\n【最近收入】\n"
	let latest=3
	ql_host=QLS[n-1].host
	ql_client_id=QLS[n-1].client_id
	ql_client_secret=QLS[n-1].client_secret
	ql_token=Get_QL_Token()
	if(ql_token==null)
		return "token获取失败"
	let jd_cookies=Get_env(Get_QL_env(),"JD_COOKIE")
	if(m>jd_cookies.length)
		return "该容器不存在该账号"
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
				"Cookie": jd_cookies[m-1].value
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
	return "账号【"+jd_cookies[m-1].value.match(/(?<=pin=)[^;]+/g)+"】今日收入"+sum+"豆\n"+notify
}
function SaveJDUserName(QLS){
	let names=[]
	let notify=""
	for(let i=0;i<QLS.length;i++){
		ql_host=QLS[i].host
		ql_client_id=QLS[i].client_id
		ql_client_secret=QLS[i].client_secret
		ql_token=Get_QL_Token()
		if(ql_token==null){
			notify+="容器【"+QLS[i].name+"】token获取失败,跳过\n"
			continue
		}
		notify+="容器【"+QLS[i].name+"】\n"
		let envs=Get_QL_env()	
		for(let j=0;j<envs.length;j++){
			if(envs[j].name=="JD_COOKIE"&&envs[j].status==0){
				let pin=envs[j].value.match(/(?<=pin=)[^;]+/g)[0]
				notify+="【"+pin+"】-"
				let info=JD_UserInfo(envs[j].value)
				if(info.data){
					let find=0
					for(let k=0;k<names.length;k++)
						if(names[k].pin==pin)
							find=1
					if(!find)
						names.push({pin:pin,name:info.data.userInfo.baseInfo.nickname})
					notify+="【"+info.data.userInfo.baseInfo.nickname+"】\n"
				}
				else
					notify+="数据获取失败\n"
			}
		}
	}
	bucketSet("jd_cookie","pinName",JSON.stringify(names))
	return notify
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
function RealDay(date){
	let day=date.getDate()
	let hour=date.getHours()
	if(hour>=16)
		return 1
	else
		return 0
}

function Recovery_qlEnv(QLS){
	let notify=""
	let data=bucketGet("qinglong","backup")
	if(data=="")
		return "备份不存在耶"
	let backup=JSON.parse(data)
	for(let i=0;i<backup.length;i++){
		if(QLS.length>1)
			sendText("请选择备份容器"+backup[i].container+"的恢复容器\n")
		let choose=Get_QL(QLS)
		if(choose==-1)
			return "获取QLS失败，退出"	
		let count=0	
		ql_token=Get_QL_Token()
		if(ql_token==null)
			return "容器"+QLS[i].name+"token获取失败,退出"
		let envs=Get_QL_env()
		for(let j=0;j<backup[i].envs.length;j++){
			if(IsExist(envs,backup[i].envs[j].name,backup[i].envs[j].value))
				continue
			else{ 
				Add_QL_Env(backup[i].envs[j].name,backup[i].envs[j].value,backup[i].envs[j].remark)
				if(backup[i].envs[i].name=="JD_COOKIE")
					notify+="恢复京东变量:"+backup[i].envs[j].value.match(/(?<=pin=)[^;]+/g)+"\n"
				else
					notify+="恢复变量:"+backup[i].envs[j].name+"\n"
				count++
				sleep(100)
			}
		}
		if(choose==1)
			notify="成功恢复备份容器"+backup[i].container+"的"+count+"个变量至容器"+QLS[GetContent()-1].name+"\n------------------\n"+notify
		else if(choose==0)
			notify="成功恢复备份容器"+backup[i].container+"的"+count+"个变量至容器"+QLS[0].name+"\n------------------\n"+notify			
	}
	bucketSet("qinglong","backup","")
	return notify
}

function Backup_qlEnv(QLS){
	var ql={
			container:"",
			envs:[{
				name:"",
				value:"",
				remark:""
			}]
		}
	var data=[ql]
	let count=0
	let notify=""
	for(let i=0;i<QLS.length;i++){
		if(i>=data.length)
			data.push(ql)
		let counti=0
		data[i].container=QLS[i].name
		ql_host=QLS[i].host
		ql_client_id=QLS[i].client_id
		ql_client_secret=QLS[i].client_secret
		ql_token=Get_QL_Token()
		if(ql_token==null){
			notify+="容器"+QLS[i].name+"token获取失败,跳过\n"
			continue
		}
		let envs=Get_QL_env()
		for(let j=0;j<envs.length;j++){
			if(j>=data[i].envs.length)
				data[i].envs.push({name:"",value:"",remark:""})
			data[i].envs[j].name=envs[j].name
			data[i].envs[j].value=envs[j].value
			data[i].envs[j].remark=envs[j].remarks
			count++,counti++
		}
		notify=notify+"\n\n容器"+QLS[i].name+":"+counti+"个变量"
	}
	bucketSet("qinglong","backup",JSON.stringify(data))
	return "共备份"+QLS.length+"个容器"+count+"个变量:"+notify
}

function Delete_AllCK_disabled(QLS){
	let flag=0
	let dis_pin_num=0
	let notify=""
	for(let j=0;j<QLS.length;j++){
		ql_host=QLS[j].host
		ql_client_id=QLS[j].client_id
		ql_client_secret=QLS[j].client_secret
		ql_token=Get_QL_Token()
		if(ql_token==null){
			notify+="容器"+QLS[i].name+"token获取失败,跳过\n"
			continue
		}
		var JD_COOKIES=Get_env(Get_QL_env(),"JD_COOKIE")	
		notify=notify+"容器"+(j+1)+QLS[j].name+":\n"			
		for(let i=0;i<JD_COOKIES.length;i++){
			if(JD_COOKIES[i].status==true){
				let pt_pin=JD_COOKIES[i].value.match(/(?<=pt_pin=)\S+(?=;)/g)
				notify=notify+(++dis_pin_num)+"、"+pt_pin+"\n"
				if(JD_COOKIES[i]._id)
					Delete_QL_Env(JD_COOKIES[i]._id)
				else
					Delete_QL_Env(JD_COOKIES[i].id)
				flag=1
			}	
		}
	}
	if(!flag)
		return "您的客户全都没有失效耶~"
	else
		return "共删除"+dis_pin_num+"个失效账号，\n"+notify
}

function Notify_AllCK_disabled(QLS){
	let tipid=sendText("正在为您通知，如若失效客户过多将花费较长时间，请耐心等待")
	let flag=0
	let notify="已通知："
	let dis_pin_num=0,notify_num=0
	let toType=bucketKeys("GroupNotify")
	for(let j=0;j<QLS.length;j++){
		ql_host=QLS[j].host
		ql_client_id=QLS[j].client_id
		ql_client_secret=QLS[j].client_secret
		ql_token=Get_QL_Token()
		if(ql_token==null){
			notify+="容器"+QLS[i].name+"token获取失败,跳过\n"
			continue
		}
		var envs=Get_QL_env()
		notify=notify+"\n---------------------\n【"+QLS[j].name+"】\n"
		for(let i=0;i<envs.length;i++){
			if(envs[i].name=="JD_COOKIE"&&envs[i].status==true){
				let pt_pin=envs[i].value.match(/(?<=pt_pin=)\S+(?=;)/g)
				let name=GetJDUserName(pt_pin)
				if(name==""&&pt_pin.indexOf("%"))//未保存该pin账户昵称且pin为中文
						name=decodeURI(pt_pin)
				else if(name==null)//未保存所有账号pin昵称
						name=pt_pin					
				if(notify.indexOf(pt_pin)==-1){//避免多容器重复通知
					notify=notify+"账号"+(i+1)+"【"+pt_pin+"】\n"
					if(toType==""){//一对一通知
						sillyGirl.session("jd send "+pt_pin+" "+"温馨提示，您的账号【"+name+"】已过期，请重新登陆")
						sleep(Math.random()*10000+10000)
					}
					else{//群通知
						for(let k=0;k<toType.length;k++){
							let gid=bucketGet("GroupNotify",toType[k]).split("&")
							for(l=0;l<gid.length;l++)
								if(NotifyInGroup(toType[k],gid[l],pt_pin,"温馨提示，您的账号【"+name+"】已过期，请重新登陆")){
									notify=notify+"★通知"+toType[k]+"群"+gid[l]+"成功\n"
									sleep(Math.random()*5000+5000)
									notify_num++
								}
								else notify=notify+"\n☆通知"+toType[k]+"群失败，该客户未绑定"+toType[k]
						}
					}
					dis_pin_num++
				}
				flag=1
			}
		}
	}
	RecallMessage(tipid)
	if(!flag)
		return "您的客户全都没有失效耶~"
	else
		return "共"+dis_pin_num+"个账号失效，"+notify	
}

function NotifyInGroup(totype,cid,pin,msg){
	let find=0
	if(totype=="qq"){
		let pinQQ=bucketKeys("pinQQ")
		for(let i=0;i<pinQQ.length;i++)
			if(pinQQ[i]==pin){
				find=1
				push({
					imType:totype,
					userID:bucketGet("pinQQ",pin),
					groupCode:cid,
					content:msg
				})
			}
	}
	else if(totype=="tg"){
		let pinTG=bucketKeys("pinTG")
		for(let i=0;i<pinTG.length;i++)
			if(pinTG[i]==pin){
				find=1
				push({
					imType:totype,
					userID:bucketGet("pinTG",pin),
					groupCode:cid,
					content:msg
				})
			}
	}
	else if(totype=="wx"){
		let pinWX=bucketKeys("pinWX")
		for(let i=0;i<pinWX.length;i++)
			if(pinWX[i]==pin){
				find=1
				push({
					imType:totype,
					userID:bucketGet("pinWX",pin),
					groupCode:cid,
					content:msg
				})
			}
	}
	return find
}

function Move_qlEnv(QLS,from,to_index){
	let notify=""
	if(Get_QL(QLS)==-1)
		return "获取QLS失败"
	ql_token=Get_QL_Token()
	if(ql_token==null)
		return "青龙对接失败，请检查青龙管理是否配置有误"
	let envs=Get_QL_env()
	if(to_index>=envs.length)
		return "目标位置有误，超出变量总数"
	if(from.match(/^\d+$/g)!=null){	
		from=from-1
		if(from>=envs.length)
			return "原位置有误，超出变量总数"
		if(envs[from]._id)
			Move_QL_Env(envs[from]._id,from-1,to_index)
		else
			Move_QL_Env(envs[from].id,from-1,to_index)
		let pin=envs[from].value.match(/(?<=pt_pin=)\S+(?=;)/g)
		if(pin!=null)
			notify="账号"+pin+" 移动成功!"
		else
			notify="变量"+envs[from].name+"移动成功"
	}
	else {		
		let from_index=Find_env(envs,from)
		if(from_index==-1)
			return "未找到该变量"
		if(envs[from]._id)
			Move_QL_Env(envs[from_index]._id,from_index,to_index)
		else
			Move_QL_Env(envs[from_index].id,from_index,to_index)			
		let pin=envs[from_index].value.match(/(?<=pt_pin=)\S+(?=;)/g)
		if(pin!=null)
			notify="账号"+pin+" 移动成功!"
		else
			notify="变量"+envs[from_index].name+"移动成功"
	}
	return 	notify
}

function Exchange_JDCK(QLS,x,y){
	ql_host=QLS[0].host
	ql_client_id=QLS[0].client_id
	ql_client_secret=QLS[0].client_secret
	ql_token=Get_QL_Token()
	if(ql_token==null)
		return "token获取失败,退出"
	let envs=Get_env(Get_QL_env(),"JD_COOKIE")	
	if(envs[x]._id){

		Update_QL_Env(envs[y].name,envs[y].value,envs[y].remarks,1,envs[x]._id)
		sleep(20)
		Update_QL_Env(envs[x].name,envs[x].value,envs[x].remarks,1,envs[y]._id)
	}
	else{
		Update_QL_Env(envs[y].name,envs[y].value,envs[y].remarks,0,envs[x].id)
		sleep(20)
		Update_QL_Env(envs[x].name,envs[x].value,envs[x].remarks,0,envs[y].id)
	}
	return "已交换【"+envs[x].value.match(/(?=pin=)[^;]+/)+"】与【"+envs[y].value.match(/(?=pin=)[^;]+/)+"】"
}

function Find_env(envs,string){
	for(i=0;i<envs.length;i++){
		if(envs[i].value.match(/(?<=pt_pin=)\S+(?=;)/g)==string|| envs[i].remarks==string||envs[i].name==string)
			return i
	}
	return -1
}

function Get_QL(QLS){
	if(QLS.length>1){
		let notify="请选择容器(输入q退出)：\n"
		for(let i=0;i<QLS.length;i++){
			notify=notify+(i+1)+"、"+QLS[i].name+"\n"
		}
		sendText(notify)
		let ql_num=input(10000)
		if(ql_num==""||ql_num=="q"||ql_num.match(/^\d+$/g)==null||ql_num>QLS.length)
			return -1
		ql_num=Number(ql_num)-1
		ql_host=QLS[ql_num].host
		ql_client_id=QLS[ql_num].client_id
		ql_client_secret=QLS[ql_num].client_secret
		return 1
	}
	else{
		ql_host=QLS[0].host
		ql_client_id=QLS[0].client_id
		ql_client_secret=QLS[0].client_secret
		return 0
	}
}

function IsExist(Array,name,value){
	for(let i=0;i<Array.length;i++)
		if(Array[i].name==name&&Array[i].value==value)
			return true
	return false
}

function Get_env(envs,name){
	let Hit=[]
	for(let i=0,j=0;i<envs.length;i++){
		if(envs[i].name==name){
			Hit[j]=envs[i]
			j++
		}
	}
	return Hit	
}

function Get_QL_env(){
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

function Get_QL_Token(){
		let data=request({url:ql_host+"/open/auth/token?client_id="+ql_client_id+"&client_secret="+ql_client_secret})
		data=JSON.parse(data)	
		if(data.code==200)
			return data.data.token
		else return null
}


function Add_QL_Env(name,value,remark){
		return request({
		url:ql_host+"/open/envs",
		method:"post",
		headers:{
			accept: "application/json",
			Authorization:"Bearer "+ql_token,
			contentType:"application/json"
		},
		body:[{"value": value,"name": name,"remarks": remark}],
		dataType: "application/json"
	})
}
		
function Update_QL_Env(name,value,remark,is_id,id){
	let body
	if(is_id)
		body={"value": value,"name": name,"remarks": remark,"_id":id}
	else
		body={"value": value,"name": name,"remarks": remark,"id":id}
	return request({
		url:ql_host+"/open/envs",
		method:"put",
		headers:{
			accept: "application/json",
			Authorization:"Bearer "+ql_token,
			contentType:"application/json"
		},
		body:body,
		dataType: "application/json"
	})
}

function Delete_QL_Env(_id){
	return request({
		url:ql_host+"/open/envs",
		method:"delete",
		headers:{
			accept: "application/json",
			Authorization:"Bearer "+ql_token,
			contentType:"application/json"
		},
		body:[_id],
		dataType: "application/json"
	})	
}

function Move_QL_Env(_id,from_index,to_index){
		return request({
		url:ql_host+"/open/envs/"+_id+"/move",
		method:"put",
		headers:{
			accept: "application/json",
			Authorization:"Bearer "+ql_token,
			contentType:"application/json"
		},
		body:{"fromIndex": from_index,"toIndex": to_index},
		dataType: "application/json"
	})	
}

main()



function Export_envs_lite(QLS){
	let envlite=[]
	for(let i=0;i<QLS.length;i++){
		ql_host=QLS[i].host
		ql_client_id=QLS[i].client_id
		ql_client_secret=QLS[i].client_secret
		ql_token=Get_QL_Token()
		let envs=Get_QL_env()
		for(let j=0;j<envs.length;j++){
			delete envs[j]._id
			delete envs[j].created
			delete envs[j].status
			delete envs[j].timestamp
			delete envs[j].position
			envlite[j]=envs[j]
		}
	}
	sendText("共"+envlite.length+"环境变量")
	return JSON.stringify(envlite)
}

function Import_env_lite(QLS,data){
	Get_QL(QLS)
	ql_token=Get_QL_Token()
	let qlenvs=Get_QL_env()
	let backup=JSON.parse(data)
	let count =0
	for(let i=0;i<oldenvs.length;i++){
		if(!IsExist(qlenvs,backup[i].name,backup[i].value)){
			Add_QL_Env(backup[i].name,back[i].value,backup[i].remarks)
			count++
		}
	}
	return "收到"+backup.length+"个青龙变量信息，成功导入"+count+"个变量"
}

function Import_spy(data){
	let spys=JSON.parse(data)
	let count=0
	let notify=""
	for(let i=0;i<spys.length;i++){
		notify=notify+"\n"+(i+1)+"、"+spys[i].name
		count++
	}
	bucketSet("jd_cookie","env_listens",data)
	return "共导入"+count+"个监控信息"+notify
}

function Import_pinQQ(data){
	let notify=""
	let pinQQ=JSON.parse(data)
	let count=0
	for(let i=0;i<pinQQ.length;i++){
		bucketSet("pinQQ",pinQQ[i].pin,pinQQ[i].qq)
		notify=notify+"\n"+pinQQ[i].pin+":"+pinQQ[i].qq
		count++
	}
	return "已导入"+count+"个客户Q绑信息"+notify
}

function Export_pinQQ(){
	let data=[{
		pin:"",
		qq:0
	}]
	let pins=bucketKeys("pinQQ")
	for(let i=0;i<pins.length;i++){
		if(i<data.length){
			data[i].pin=pins[i]
			data[i].qq=bucketGet("pinQQ",pins[i])
		}
		else data.push({pin:pins[i],qq:bucketGet("pinQQ",pins[i])})
	}
	return JSON.stringify(data)
}

