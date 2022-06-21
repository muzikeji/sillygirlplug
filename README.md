# plug-in
一个正在学习js的人写的傻妞机器人插件库，由于API具有时效性，若有失效请留言。<br>QQ群:323731210
TG群：https://t.me/muzitg
<h2>第一步搭建傻妞<br></h2>
《傻妞机器人新版安装教程》https://blog.csdn.net/Dch520898/article/details/121169295?utm_source=app&app_version=5.5.0
<br><br><h2>第二步 安装必备环境</h2>(普通用户跳过，需要使用用户系统的的请部署环境。)<br>
SVIP功能使用流程：<br>
1.群内发开通SVIP，支付开通。<br>
<br>2.在你服务器创建一个新的数据库。服务器需要安装phpMyAdmin、nginx以及任意版本PHP。
<br>3.服务器安全组以及宝塔安全里放行3306端口，然后将数据库权限设置为所有人。
<br>4.打开∶https://muvip.cn/svip/user/sql.html ，提交正确的数据库信息。
<br>5.发送【创建数据表】给我机器人。显示创建成功后，即可使用！
<br>重点：购买时给的两个参数必须设置，请私聊设置以免你的mkey泄露导致数据被篡改。
mkey 群内发 【开通SVIP 】支付好会发送到你邮箱！mkey请妥善保管。

自定义插件开发API接口∶http://muvip.cn/svip/xin/api.php?apikey=你的mkey&user=你的授权QQ&type=执行类型&qq=用户QQ<br>
执行类型可选 sc #生成用户信息  gb #修改用户信息  cx #查询用户信息   kill  #删除用户
<br><br><h2>第三步安装git</h2>
安装git
<br>
下面3个命令挨个跑完就好了<br>
`wget http://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm`
<br><br>`rpm -ivh epel-release-latest-7.noarch.rpm`
<br><br>`yum install -y git`
<br><br><h2>第四步拉去本仓库</h2>
<br>`cd && cd sillyGirl/develop/replies && git clone https://ghproxy.com/https://github.com/muzikeji/plug-in`
<br><br><h2>第五步移动插件到傻妞插件目录</h2>
<br><br>`cd && cd sillyGirl/develop  && mv  replies/plug-in/* /root/sillyGirl/develop/replies`
<br><br><h2>第六步 重启傻妞</h2>
<br>`cd && cd sillyGirl && ./sillyGirl  ##启动傻妞`

<br>等待数据库加载完成，按下Ctrl 再按 C 退出
然后执行下面命令 静默挂机
<br>`nohup ./sillyGirl 1>/dev/null 2>&1 & #AMD64`

<br>到此就部署完成了

<br><br>后续更新插件库
<br>拉去更新
<br>`cd && cd sillyGirl/develop/replies/plug-in && git stash && git pull `
<br>移动到插件目录
<br>`cd && cd sillyGirl/develop  && mv  replies/plug-in/* /root/sillyGirl/develop/replies`
