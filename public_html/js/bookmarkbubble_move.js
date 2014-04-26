/*
  Copyright 2010 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/** @fileoverview Example of how to use the bookmark bubble. */


// クッキーの書き込み
function saveCookie(n) {
  cName = "count="; // クッキー名
  cDays = 120; // データの保存日数
  setPre = new Date();
  setPre.setTime(setPre.getTime() + (cDays*1000*24*3600));
  prd = setPre.toGMTString();
  document.cookie = cName + n + ";expires=" + prd;
}
// クッキーの読み込み
cName = "count="; // クッキー名
cCookie = document.cookie+";";
str = cCookie.indexOf(cName);
if(str != -1) {
  end = cCookie.indexOf(";",str);
  count = eval(unescape(cCookie.substring(str + cName.length, end)));
  saveCookie(count+1);
	if(count > 3) {
	}else{
		window.addEventListener('load', function() {
		
		  window.setTimeout(function() {
		    
		    var bubble = new google.bookmarkbubble.Bubble();
		
		    bubble.hasHashParameter = function() {};
		
		    bubble.setHashParameter = function() {};
		
		    bubble.getViewportHeight = function() {
		      window.console.log('Example of how to override getViewportHeight.');
		      return window.innerHeight;
		    };
		
		    bubble.getViewportScrollY = function() {
		      window.console.log('Example of how to override getViewportScrollY.');
		      return window.pageYOffset;
		    };
		
		    bubble.registerScrollHandler = function(handler) {
		      window.console.log('Example of how to override registerScrollHandler.');
		      window.addEventListener('scroll', handler, false);
		    };
		
		    bubble.deregisterScrollHandler = function(handler) {
		      window.console.log('Example of how to override deregisterScrollHandler.');
		      window.removeEventListener('scroll', handler, false);
		    };
		
		    bubble.showIfAllowed();
		  }, 1000);
		}, false);
	}
} else {
// 初回は表示
	// bookmarkbubbleここから
window.addEventListener('load', function() {

  window.setTimeout(function() {
    
    var bubble = new google.bookmarkbubble.Bubble();

    bubble.hasHashParameter = function() {};

    bubble.setHashParameter = function() {};

    bubble.getViewportHeight = function() {
      window.console.log('Example of how to override getViewportHeight.');
      return window.innerHeight;
    };

    bubble.getViewportScrollY = function() {
      window.console.log('Example of how to override getViewportScrollY.');
      return window.pageYOffset;
    };

    bubble.registerScrollHandler = function(handler) {
      window.console.log('Example of how to override registerScrollHandler.');
      window.addEventListener('scroll', handler, false);
    };

    bubble.deregisterScrollHandler = function(handler) {
      window.console.log('Example of how to override deregisterScrollHandler.');
      window.removeEventListener('scroll', handler, false);
    };

    bubble.showIfAllowed();
  }, 1000);
}, false);
	// bookmarkbubbleここまで
  saveCookie(1);
}