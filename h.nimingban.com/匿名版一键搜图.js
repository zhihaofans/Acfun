// ==UserScript==
// @name         匿名版一键搜图
// @namespace    http://zhihaofans.com
// @version      0.2.4
// @description  一键搜图(让盗图狗不再得意，让你不再为祭品信息而烦恼)
// @author       zhihaofans
// @match        https://h.nimingban.com/f/*
// @match        https://h.nimingban.com/t/*
// @grant        none
// @note         V0.1：初始版本，只有百度，不带设置功能
// @note         V0.2：加入谷歌、搜狗，在网页顶端有设置可以切换(设置保存在本地浏览器)
// @note         V0.2.1：修复了编辑时编码格式错误导致乱码
// @note         V0.2.2：修复了保存设置失败的BUG
// @note         V0.2.3：修复了BUG
// @note         V0.2.4：修改了谷歌地址
// @note         安装地址：https://greasyfork.org/zh-CN/users/49955
// ==/UserScript==
var oksi_setting_show=0;
$(document).ready(function () {
	oksi_setting();
	$("#oksi_html_search").hide();
	oksi_start();
	$("#oksi_html_button_setting").click(function () {
		if(oksi_setting_show==0)
		{
			$("#oksi_html_search").show();
			oksi_setting_show=1;
		}
		else
		{
			$("#oksi_html_search").hide();
			oksi_setting_show=0;
		}
	});
	$("#oksi_html_search").change(function () {
		oksi_search_change($("#oksi_html_search").val());
	});

	});
function oksi_setting()
{
	if (localStorage.getItem("oksi_setting_search") == undefined)
	{
		localStorage.setItem("oksi_setting_search","baidu");
	}

	
	switch(localStorage.oksi_setting_search)
	{
	case "baidu":
		var oksi_select = "<select id=\"oksi_html_search\" name=\"oksi_html_search\" onchange=\"oksi_search_change(this.value)\"><option value=\"baidu\" selected=\"selected\">baidu</option><option value=\"google\">google</option><option value=\"sogou\">sogou</option></select>";
		break;
	case "google":
		var oksi_select = "<select id=\"oksi_html_search\" name=\"oksi_html_search\" onchange=\"oksi_search_change(this.value)\"><option value=\"baidu\">baidu</option><option value=\"google\" selected=\"selected\">google</option><option value=\"sogou\">sogou</option></select>";
		break;
	case "sogou":
		var oksi_select = "<select id=\"oksi_html_search\" name=\"oksi_html_search\" onchange=\"oksi_search_change(this.value)\"><option value=\"baidu\">baidu</option><option value=\"google\">google</option><option value=\"sogou\" selected=\"selected\">sogou</option></select>";
		break;
	default:
		var oksi_select = "<select id=\"oksi_html_search\" name=\"oksi_html_search\"><option value=\"baidu\">baidu</option><option value=\"google\">google</option><option value=\"sogou\">sogou</option></select>";
	}
	
	var oksi_li = "<li><a href=\"javascript:void(0)\" id=\"oksi_html_button_setting\">一键搜图</a></li> " + oksi_select;
	$("ul.uk-breadcrumb").append(oksi_li);
}
function oksi_search_change(_search)
{
	localStorage.setItem("oksi_setting_search", _search);
	alert("设置完毕("+_search+")\n即将刷新");
	location.reload();
}
function oksi_start()
{
	oksi_loaded=1;
	var oksi_imgs=$("a.h-threads-img-a");
	var oksi_imgs_num=oksi_imgs.length;
	var oksi_imgs_num_1=oksi_imgs_num-1;
	var oksi_link = "";
	var oksi_a_1=1;
	var oksi_search_sogou="http://pic.sogou.com/ris?query=";
	var oksi_search_baidu="http://image.baidu.com/n/pc_search?queryImageUrl=";
	var oksi_search_google="https://www.google.com/searchbyimage?image_url=";
	switch(localStorage.getItem("oksi_setting_search","baidu"))
	{
	case "baidu":
		var oksi_search=oksi_search_baidu;
		break;
	case "google":
		var oksi_search=oksi_search_google;
		break;
	case "sogou":
		var oksi_search=oksi_search_sogou;
		break;
	default:
		var oksi_search=oksi_search_baidu;
	}
	for(var oksi_a=0;oksi_a<=oksi_imgs_num_1;oksi_a++)
	{
		var oksi_img="";
		oksi_img=$("a.h-threads-img-a:eq("+oksi_a+")");
		oksi_a_1=oksi_a+1;
		oksi_link="<a  target=\"_blank\" id=\"one_key_search_image_"+oksi_a_1+"\" href=\""+oksi_search+oksi_img.attr("href")+"\">(←一键搜图)</a>";
		oksi_img.prop("outerHTML",oksi_link+oksi_img.prop("outerHTML"));
	}
}
