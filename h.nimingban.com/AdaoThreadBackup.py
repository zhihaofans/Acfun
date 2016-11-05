#!/usr/bin/python2
# -*-coding:utf-8 -*-
# ProjectName:A岛串备份
# Author:zhihaofans
# Github:https://github.com/zhihaofans/acfun/blob/master/h.nimingban.com/AdaoThreadBackup.py
# PythonVersion:2.x
import urllib
import urllib2
import cookielib
import os
import json
import math
def getjson(_tid,_page):
    url="http://h.nimingban.com/Api/thread?id="+_tid+"&page="+str(_page)
    cj = cookielib.LWPCookieJar()  #创建cookies
    proxy = urllib2.ProxyHandler({'http': 'http://127.0.0.1:1080'})  #代理设置,需要代理请使用该行代码并注释下下行代码
    opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj),proxy)  #需要代理请使用该行代码并注释下一行代码
    #opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))  #需要代理请使用该行代码并注释上面两行代码
    req = urllib2.Request(url) 
    response = opener.open(req)
    return response.read()
def main():
    downpath="download/"    #下载目录
    inputid=raw_input("Input the thread id:")  #判断是否输入串的id
    if inputid=="":
        print u"→ Error:Please input the thread id"
        raw_input("Press \"enter\" key to exit:")
        exit()
    tid=inputid
    page=1
    url="http://h.nimingban.com/Api/thread?id="+tid+"&page="+str(page)
    rejson=getjson(tid,page)
    if rejson=="\"\u8be5\u4e3b\u9898\u4e0d\u5b58\u5728\"":  #判断主题是否存在
        print u"Not found the thread"
        raw_input("Press \"enter\" key to exit:")
        exit()
    reinfo  = json.loads(rejson)
    count=int(math.ceil( int(reinfo['replyCount'])/19))
    print "This thread has ",reinfo['replyCount']," replys"
    print "This thread has ",count," pages"
    replys=reinfo['replys']
    print "Page:",page,"(replys:",len(replys),") success"
    thread=reinfo
    page=2
    while (page <= count):
        url="http://h.nimingban.com/Api/thread?id="+tid+"&page="+str(page)
        reinfos  = json.loads(getjson(tid,page), encoding="utf-8")
        rerepys=reinfos['replys']
        ncount=len(rerepys)
        print "Page:",page,"(replys:",len(rerepys),") success"
        n=0
        while (n < ncount):
            replys.append(rerepys[n])
            n=n+1
        if page == count:
            thread=reinfos
            thread['replys']=replys
        page = page + 1
    fo = open(downpath+tid+".json", "w")
    print u"Save to: ", fo.name
    fo.write(json.dumps(thread))
    fo.close()
    exit()
if __name__=='__main__':  
    main()
