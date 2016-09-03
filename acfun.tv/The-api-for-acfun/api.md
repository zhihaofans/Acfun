ACfun Api
===========

注意事项
------

- 这些api都是我从acfun.tv网页上抓取下来的，官方随时可能更新，不保证其有效性。
 
- 本项目随时都有可能被官方叫停


适用域名
------

- http://www.acfun.tv

- http://www.aixifan.com

需要登陆认证(cookies)
------
### 账号登陆

账号可以为手机号码

    /login.aspx?password=(明文密码)&username=(账号)
    
成功则返回(json)

    {"img":头像地址,"success":是否成功(true/false),"username":用户名}
    
### 注册

1.检测手机是否可注册(返回`可以注册(true)`/`已被注册(false)`)

    /mobileUnique.aspx?mobile=(手机号)

2.检测用户名是否可注册

    /username_unique.aspx?username=(用户名)
    
- 可以则返回`{"success":true,"result":"验证通过","info":"验证通过","status":200}`

- 不可以则返回`{"success":false,"result":"用户名已被使用","info":"用户名已被使用","status":400}`

3.获取注册验证码(这里为js语句，需调用jQuery库)

    "/captcha.svl?d="+$.now(); 
    
- 返回图片
 
4.发送手机验证码

    /mobileValidate.aspx?mobile=(手机号)&captcha=(注册验证码)
    
- 参数captcha所输入的注册验证码由上一个api获取
 
5.手机注册(post提交)

    /mobileRegister.aspx?code=(手机收到的验证码)&mobile=(手机号码)&password=(密码)&password2=(密码)&username=(用户名)

### 在线检测

参数uid:用户id(固定,不会随着用户改名而改变。亲测参数cid可不加)

    /online.aspx?uid=(用户id)
    
成功则返回(json)

    {"success":是否成功(true/false),"isdisabled":false,"level":当前等级,"status":200,"duration":本次在线时间(秒)}
    
未登陆则返回(json)

    {"success":false,"isdisabled":false,"level":0,"status":401,"duration":0,"result":"请先登陆","info":"请先登陆"}
    
### 获取未读信息

参数uid:用户id(固定,不会随着用户改名而改变。亲测参数cid可不加)

    /member/unRead.aspx?uid=(用户id)

无未读信息时返回(json)

    {"special":[],"newPush":(推送数量),"newFollowed":(新听众数量),"success":(是否成功，true/false),"bangumi":[],"unReadMail":(未读私信数量),"mention":(被at数量),"setting":(新设置提醒数量)}

有未读信息时返回(json)

    待研究
    
### 添加收藏(post提交)

参数cId:稿件id(固定。注意：cId中间的字母是大写的，小写时出错)

    /member/collect.aspx?cId=(cid)&operate=1(0为取消,1为收藏)
    
成功返回

    {"result":true,"success":true}
    
失败返回

    {"result":false,"success":false}

### 获取用户收藏

稿件收藏

    /member/collection.aspx?count=(每页显示多少,默认与最高皆为20)&pageNo=(第几页)&channelId=(频道,默认0)
    
剧集收藏

    /bangumi/bangumi/stow/page?type=(频道/分类;空白为所有,1动画,2电影,3综艺,4电视剧)&sort=(暂时没研究出该参数用处,默认7)&pageSize=(每页显示多少,默认20)&pageNo=(第多少页，默认1)

合辑收藏

    /member/specialCollectList.aspx?pageSize=(每页显示多少,默认20)&pageNo=(第几页)
    
### 每日签到(这里为js语句，需调用jQuery库)

    "/webapi/record/actions/signin?channel=0&date=" + $.now()
    
返回数据有三种可能(第三种为成功?待深入研究)

    {"code":200,"data":false,"message":"OK"}

    {"code":200,"data":true,"message":"OK"}

    {"code":200,"data":{"count":3,"msg":"签到成功，已领取3蕉"},"message":"OK"}

无需登陆认证
------
### 获取用户投稿

    /u/contributeList.aspx?userId=(用户id)&pageSize=(每页显示多少投稿,默认20)&pageNo=(第几页)&channelId=(频道,默认0)

### 获取用户信息

    /usercard.aspx?username=(用户名)

### 获取用户听众列表

    /friendExt.aspx?name=getFollowedList&userId=(用户id)&pageNo=(页数)&pageSize=(每页显示多少,默认20)

### 获取用户关注列表

    /api/friendExt.aspx?name=getFollowingList&userId=(用户id)&pageNo=(页数)&pageSize=(每页显示多少,默认20)

### 获取投稿评论

参数contentId:稿件id(固定。注意：有字母是大写的，小写时出错)

    /comment_list_json.aspx?contentId=(cid)&currentPage=(页数)

### 获取视频弹幕

    http://danmu.aixifan.com/V3/(分P视频id)_2/(页数)/(每页弹幕数)

### 获取视频信息

    /video/getVideo.aspx?id=(分p视频id)

### 检测视频是否存在

    /video/checkVideo.aspx?id=(视频id)

### 获取视频投稿的tag

    /member/collect_up_exist.aspx?contentId=(投稿id)

### 获取用户的用户组，手机与邮箱是否验证

    /member/getUserGroupLevel.aspx
