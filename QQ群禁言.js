// [rule: raw \[CQ:at,qq=(\d+),text=([^\[]+)]\s*/ban\s+(\d+)]
// [rule: raw \[CQ:at,qq=(\d+),text=([^\[]+)]\s*禁言\s+(\d+)]
// [admin: true]
GroupBan(param(1), +param(3))
sendText("[CQ:at,qq=" + param(1) + ",text=" + param(2) + "] 已被禁言"+param(3)+"秒。")

