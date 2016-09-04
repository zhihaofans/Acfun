// ==UserScript==
// @name         Acfun自动投香蕉
// @namespace    http://zhihaofans.com
// @version      0.0.5
// @description  Acfun自动投香蕉
// @author       zhihaofans
// @match        http://www.acfun.tv/v/*
// @match        http://www.acfun.tv/a/*
// @match        http://www.aixifan.com/a/*
// @match        http://www.aixifan.com/v/*
// @grant        none
// @note         V0.0.5：文章区改为1蕉
// @icon         http://cdn.aixifan.com/ico/favicon.ico
// ==/UserScript==
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + '=');
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(';', c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return '';
}
function acPostBananas(_cid, _uid, _bananas) {
    $.post("/banana/throwBanana.aspx", {
        count: _bananas,
        contentId: _cid,
        userId: _uid
    },
    function(data, status) {
        console.log("自动5蕉(status：" + status+")");
        if (status == "success") {
            if (data.success === true) {
                $.info("success", "已自动投5蕉");
            } else {
                if (data.info != "该稿件已扔过香蕉") {
                    $.info("error", "自动5蕉：" + data.info);
                }
				else{
					$.info("warning", "自动5蕉：该稿件已扔过香蕉");
				}
            }
        } else {
            $.info("error", "自动5蕉：网络错误");
        }

    });
}
$(document).ready(function() {
    if (getCookie('auth_key') !== "") {
        var url = location.pathname;
        
        if (url.substr(0, 5) == "/v/ac") {
			var nowcid = url.replace("/v/ac", "");
            acPostBananas(nowcid, getCookie('auth_key'),5);
        }
        if (url.substr(0, 5) == "/a/ac") {
			var nowcid = url.replace("/a/ac", "");
            acPostBananas(nowcid, getCookie('auth_key'),1);
        }
    }
});
