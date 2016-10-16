// ==UserScript==
// @name         匿名版.草榴
// @namespace    http://zhihaofans.com
// @version      0.1
// @description  try to take over the world!
// @author       zhihaofans
// @match        https://h.nimingban.com/Forum
// @match        http://www.kukuku.cc/
// @match        http://h.adnmb.com/Forum
// @grant        none
// @icon         https://h.nimingban.com/Public/img/ac-bitmap.png
// @note         开源地址:https://github.com/zhihaofans/Acfun/blob/master/h.nimingban.com/nmb.caoliu.js
// @note         Greasyfork地址:https://greasyfork.org/zh-CN/scripts/24050
// ==/UserScript==
$(document).ready(function () {
    switch(location.href)
    {
    case "https://h.nimingban.com/Forum":
      var startlink="/f/%E7%BB%BC%E5%90%88%E7%89%881";
      break;
    case "http://www.kukuku.cc/":
      var startlink="/%E7%BB%BC%E5%90%88%E7%89%881";
      break;
    case "http://h.adnmb.com/Forum":
      var startlink="/f/%E7%BB%BC%E5%90%88";
      break;
    default:
      var startlink="/";
    }
    var caoliu='<br><style type="text/css">a{text-decoration:none;color:#0000FF}\na:hover{text-decoration:underline;}</style></head><body bgcolor="#FFFFFF" text="#000000"><p align="center"><img border="0" src="https://ooo.0o0.ooo/2016/10/16/5802eb2d2d6b4.gif"></p><p align="center"><font color="#FF0000"><b>警告 / WARNING </b><br></font><br>本物品內容可能令人反感；不可將本物品內容派發，傳閱，出售，出租，交給<br>或出借予年齡未滿 18 歲的人士出示，播放或播映。<br><br><font size="1" face="Verdana">This article contains material which may offernd and may not be <br>distributed, circulated, sold, hired, given, lent, shown, <br><br>played or projected to a person under the age of 18 years. All models are 18 or <br>older. </font><br></p><p align="center"><b><font size="7" face="Verdana"><a href="'+startlink+'">__ 滿 18 歲,請按此 __</a></font></b><br><br></p>';
    $(".uk-container.uk-container-center").html(caoliu);
});
