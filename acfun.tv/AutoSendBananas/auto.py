#!/usr/bin/python2
# -*-coding:utf-8 -*-
# ProjectName:AutoSendBananas
# Author:zhihaofans
# Github:https://github.com/zhihaofans/acfun/blob/master/acfun.tv/AutoSendBananas/
# PythonVersion:2.x
import urllib
import urllib2
import cookielib
import os
import json
def main():
    cid = 3039236  #从哪个投稿开始
    count = 100  #投蕉次数
    acuser=""  #账号
    acpw=""  #密码
    cj = cookielib.LWPCookieJar()
    #proxy = urllib2.ProxyHandler({'http': 'http://127.0.0.1:1080'})  #代理设置,可注释
    #opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj),proxy)  #需要代理请使用该行代码并注释下一行代码
    opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))
    data={'username':acuser, 'password':acpw}  
    req = urllib2.Request("http://www.acfun.tv/login.aspx") 
    response = opener.open(req, urllib.urlencode(data))  
    rejson  = json.loads(response.read())
    print rejson
    if rejson['success'] != True:  #检测是否登陆成功
        print u"login fail"
        exit()
    print u"login success"
    cj.save('cookiesfile.txt')  #将cookies文件保存在目录下
    fo = open("cookiesfile.txt", "r")  #读取保存在目录的cookies文件
    cookie_data = fo.read()
    fo.close()
    os.remove('cookiesfile.txt')  #删除保存在目录的cookies文件，可删除该行代码
    c_start = cookie_data.find('auth_key=')
    c_end = cookie_data.find(';',c_start)
    uid = cookie_data[c_start+9:c_end]
    print u'userid:'+uid
    n = 0
    while (n < count):  #循环投香蕉。每次投稿id减一(cid)
        req = urllib2.Request("http://www.acfun.tv/banana/throwBanana.aspx")
        data_a = urllib.urlencode({'count':'5', 'contentId':cid-n, 'userId':uid})
		#count:香蕉数(1-5),contentId:投稿id(ac*******的数字，注意不要加ac),userId:你的用户id(自动从cookies获取)
        response = opener.open(req, data_a)
        rejsona = json.loads(response.read())
        if rejson['success'] != True:
            print '(', n+1,"/",count,")Send banana to ",cid-n," fail"
        else:
            print '(', n+1,"/",count,")Send banana to ",cid-n," success"
        n = n + 1
if __name__=='__main__':  
    main()