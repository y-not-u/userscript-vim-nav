// ==UserScript==
// @name         Vim Style Navigation
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Scroll smoothly. Use (h,j,k,l) to scroll around.  gg to go to top G to to bottom. d to PageDown u to PageUp.
// @author       y-not-u
// @match        http*://*
// @match		 *://*/*
// @match		 *
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  var keyLog = []

	document.onkeypress = function (e) {
		// if user is typing inside of a text box return
		if ( e.target.nodeName == 'INPUT' ) return;
		// event
		e = e || window.event;
		// horizontal and vertical
		var h = 0;
		var v = 0;
		// scroll amount
		keyLog.push(e.keyCode)
// 		console.log(keyLog)
		var sa = 100;
		switch (e.keyCode){
			case 104:	// h
				h -= sa;
				keyLog = [];
				break;
			case 106:	// j
				v += sa;
				keyLog = [];
				break;
			case 107:	// k
				v -= sa;
				keyLog = [];
				break;
			case 108:	// l
				h += sa;
				keyLog = [];
				break;
            case 100: // d
				v = v + sa + 300;
				keyLog = [];
				break;
            case 117: // u
				v = v - sa - 300;
				keyLog = [];
				break;
            case 120: // x
                closeTab()
                window.close()
				break;
			case 103: // gg
				if (keyLog[keyLog.length-2] != 103) {
					break;
				}
				keyLog = [];
                scrollSmoothTo(0);
				return;
			case 71:	// G
                scrollSmoothTo(document.documentElement.scrollHeight)
				keyLog = [];
				return;
			default:
				keyLog = [];
				break;
		}
// 		window.scrollBy(h, v);
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    scrollSmoothTo(v + scrollTop)
	};
})();

var scrollSmoothTo = function (position) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            return setTimeout(callback, 17);
        };
    }
    // 当前滚动高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // 滚动step方法
    var step = function () {
        // 距离目标滚动距离
        var distance = position - scrollTop;
        // 目标滚动位置
        scrollTop = scrollTop + distance / 5;
        if (Math.abs(distance) < 1) {
            window.scrollTo(0, position);
        } else {
            window.scrollTo(0, scrollTop);
            requestAnimationFrame(step);
        }
    };
    step();
};
