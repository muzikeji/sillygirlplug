# plug-in
一个傻妞机器人用户系统插件库
第一步搭建傻妞
《傻妞机器人新版安装教程》https://blog.csdn.net/Dch520898/article/details/121169295?utm_source=app&app_version=5.5.0
第二步 安装必备环境
SVIP功能使用流程：
1.群内发开通SVIP，支付开通。QQ群:323731210
TG群：https://t.me/muzitg
2.在你服务器创建一个新的数据库。服务器需要安装phpMyAdmin、nginx以及任意版本PHP。
3.服务器安全组以及宝塔安全里放行3306端口，然后将数据库权限设置为所有人。
4.打开∶https://muvip.cn/svip/user/sql.html ，提交正确的数据库信息。
5.发送【创建数据表】给我机器人。显示创建成功后，即可使用！
重点：购买时给的两个参数必须设置，请私聊设置以免你的mkey泄露导致数据被篡改。
mkey 群内发 【开通SVIP 】支付好会发送到你邮箱！mkey请妥善保管。
第三步安装git
安装git

下面3个命令挨个跑完就好了
`wget http://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm`
`rpm -ivh epel-release-latest-7.noarch.rpm`
`yum install -y git`
第四步拉去本仓库
cd && cd sillyGirl/develop/replies && git clone https://ghproxy.com/https://github.com/muzikeji/plug-in
第五步移动插件到傻妞插件目录
cd && cd sillyGirl/develop  && mv  replies/plug-in/* /root/sillyGirl/develop/replies
第六步 重启傻妞
cd && cd sillyGirl && ./sillyGirl  ##启动傻妞

等待数据库加载完成，按下Ctrl 再按 C 退出
然后执行下面命令 静默挂机
nohup ./sillyGirl 1>/dev/null 2>&1 & #AMD64

到此就部署完成了

后续更新插件库
拉去更新
cd && cd sillyGirl/develop/replies/plug-in && git stash && git pull 
移动到插件目录
cd && cd sillyGirl/develop  && mv  replies/plug-in/* /root/sillyGirl/develop/replies
