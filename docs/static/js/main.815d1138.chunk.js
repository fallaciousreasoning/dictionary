(this.webpackJsonpdictionary=this.webpackJsonpdictionary||[]).push([[0],{26:function(e,t,n){e.exports=n(52)},31:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(21),c=n.n(i),o=(n(31),n(32),n(33),n(3)),u=n.n(o),s=n(5),l=n(4),f=n(8),d=n(6),h=n(12),v=n.n(h),p=n(22),w=n.n(p),m=n(23),b=n.n(m),g=[];window.words=g;var y={};window.entries=y;var E,x=function(){var e=Object(s.a)(u.a.mark((function e(){var t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.getItem("dictionary.json");case 2:if(t=e.sent){e.next=14;break}return e.next=6,fetch("./dictionary.json");case 6:if((n=e.sent).ok){e.next=9;break}return e.abrupt("return",{});case 9:return e.next=11,n.text();case 11:return t=e.sent,e.next=14,v.a.setItem("dictionary.json",t);case 14:return e.abrupt("return",JSON.parse(t));case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(){var e=Object(s.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return E||(E=new Promise(function(){var e=Object(s.a)(u.a.mark((function e(t,n){var r,a,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!g.length){e.next=3;break}return t(),e.abrupt("return");case 3:return e.next=5,x();case 5:r=e.sent,e.t0=u.a.keys(r);case 7:if((e.t1=e.t0()).done){e.next=17;break}if(a=e.t1.value,0!==r.length&&r[a].some((function(e){return e.definition}))){e.next=11;break}return e.abrupt("continue",7);case 11:i=a.toLowerCase(),g.push(i),y[i]=r[a],y[i].word=i,e.next=7;break;case 17:g.sort(),globalThis.words=g,globalThis.entries=y,t();case 21:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}())),e.abrupt("return",E);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();window.findByWildcard=function(e){var t=e.split("*").join(".*").split("?").join(".");return S(t)};var j=function(){function e(t){Object(f.a)(this,e),this.results=void 0,this.maxResults=void 0,this.results=[],this.maxResults=t}return Object(d.a)(e,[{key:"addResult",value:function(e,t){for(var n=0;n<this.results.length&&this.results[n].matchGoodness<=t;)n++;this.results.splice(n,0,{word:e,matchGoodness:t}),this.results.length>this.maxResults&&this.results.pop()}},{key:"toEntries",value:function(){return this.results.map((function(e){return y[e.word]}))}}]),e}(),O=function(){var e=Object(s.a)(u.a.mark((function e(t){var n,r,a,i,c,o,s,l,f,d=arguments;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=d.length>1&&void 0!==d[1]?d[1]:5,e.next=3,k();case 3:for(r=new j(n),a=!0,i=!1,c=void 0,e.prev=7,o=g[Symbol.iterator]();!(a=(s=o.next()).done);a=!0)l=s.value,f=b.a.compareTwoStrings(t,l),r.addResult(l,-f);e.next=15;break;case 11:e.prev=11,e.t0=e.catch(7),i=!0,c=e.t0;case 15:e.prev=15,e.prev=16,a||null==o.return||o.return();case 18:if(e.prev=18,!i){e.next=21;break}throw c;case 21:return e.finish(18);case 22:return e.finish(15);case 23:return e.abrupt("return",r.toEntries());case 24:case"end":return e.stop()}}),e,null,[[7,11,15,23],[16,,18,22]])})));return function(t){return e.apply(this,arguments)}}(),S=function(){var e=Object(s.a)(u.a.mark((function e(t){var n,r,a,i,c,o,s,l,f,d,h,v=arguments;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=v.length>1&&void 0!==v[1]?v[1]:100,"string"===typeof t&&(t=new RegExp(t,"i")),e.next=4,k();case 4:r=new j(n),a=!0,i=!1,c=void 0,e.prev=8,o=g[Symbol.iterator]();case 10:if(a=(s=o.next()).done){e.next=19;break}if(l=s.value,f=t.exec(l)){e.next=15;break}return e.abrupt("continue",16);case 15:r.addResult(l,f.index);case 16:a=!0,e.next=10;break;case 19:e.next=25;break;case 21:e.prev=21,e.t0=e.catch(8),i=!0,c=e.t0;case 25:e.prev=25,e.prev=26,a||null==o.return||o.return();case 28:if(e.prev=28,!i){e.next=31;break}throw c;case 31:return e.finish(28);case 32:return e.finish(25);case 33:if(0===(d=r.toEntries()).length){e.next=36;break}return e.abrupt("return",d);case 36:if((h=w()(t.source))!==t.source){e.next=39;break}return e.abrupt("return",d);case 39:return e.abrupt("return",S(h,n));case 40:case"end":return e.stop()}}),e,null,[[8,21,25,33],[26,,28,32]])})));return function(t){return e.apply(this,arguments)}}();window.findByRegex=S;var R=[],C=function(){var e=function(){var e=document.getSelection();if(!e)return null;if(0===e.rangeCount)return null;var t=e.toString().split(" ").filter((function(e){return e}));if(1!==t.length)return null;var n=t[0].trim();return 0===n.length?null:{word:n,rect:e.getRangeAt(0).getBoundingClientRect()}}(),t=!0,n=!1,r=void 0;try{for(var a,i=R[Symbol.iterator]();!(t=(a=i.next()).done);t=!0){(0,a.value)(e)}}catch(c){n=!0,r=c}finally{try{t||null==i.return||i.return()}finally{if(n)throw r}}};window.addEventListener("scroll",C,{passive:!0}),window.addEventListener("pushState",C),window.addEventListener("replaceState",C),document.addEventListener("selectionchange",C);var L=function(e){e.ctrlKey||(e.preventDefault(),window.history.pushState(null,"",e.currentTarget.href))},N=function(e){var t=e.word;return r.createElement("a",{href:"?query=".concat(t),onClick:L},t)},W=function(e){var t=e.definition;if(!t)return null;var n=t.split(/(___\w+)/g).map((function(e,t){return r.createElement(r.Fragment,{key:t},e.startsWith("___")?r.createElement(N,{word:e.substring("___".length)}):e)}));return r.createElement(r.Fragment,null,n)},_=function(e){var t=e.entry;return r.createElement("div",{className:"search-result"},r.createElement("h2",null,t.word),r.createElement("ul",null,t.map((function(e,t){return r.createElement("li",{key:t},r.createElement(W,{definition:e.definition}))}))))},B=function(e){var t=window.history[e];return function(){var n=t.apply(window.history,arguments),r=new Event(e);return r.arguments=arguments,window.dispatchEvent(r),n}};window.history.pushState=B("pushState"),window.history.replaceState=B("replaceState");var T=[],U=function(){var e=!0,t=!1,n=void 0;try{for(var r,a=T[Symbol.iterator]();!(e=(r=a.next()).done);e=!0){(0,r.value)(window.location.search)}}catch(i){t=!0,n=i}finally{try{e||null==a.return||a.return()}finally{if(t)throw n}}};window.addEventListener("pushState",U),window.addEventListener("replaceState",U),window.addEventListener("hashchange",U),window.addEventListener("popstate",U);var A=function(e){var t=Object(r.useState)(""),n=Object(l.a)(t,2),i=n[0],c=n[1],o=function(){var e=Object(r.useState)(window.location.search),t=Object(l.a)(e,2),n=t[0],a=t[1];return Object(r.useEffect)((function(){return T.push(a),function(){var e=T.indexOf(a);T.splice(e,1)}})),n}(),f=function(e,t){var n=Object(r.useState)(e),a=Object(l.a)(n,2),i=a[0],c=a[1];return Object(r.useEffect)((function(){var n=setTimeout((function(){c(e)}),t);return function(){return clearTimeout(n)}}),[e,t]),i}(i,500),d=Object(r.useState)(!0),h=Object(l.a)(d,2),v=h[0],p=h[1],w=Object(r.useState)([]),m=Object(l.a)(w,2),b=m[0],g=m[1],y=Object(r.useState)([]),E=Object(l.a)(y,2),x=E[0],k=E[1],j=function(){var e=Object(s.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t||(t=i),p(!0),k([]),e.t0=g,e.next=6,S(t);case 6:e.t1=e.sent,(0,e.t0)(e.t1),p(!1),window.history.replaceState({},"Dictionary results for ".concat(t),"?query=".concat(encodeURIComponent(t)));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),R=Object(r.useCallback)(function(){var e=Object(s.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.target.value,c(n),e.next=4,j(n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[]);Object(r.useEffect)((function(){var e=new URLSearchParams(o),t=decodeURIComponent(e.get("query")||"");t!==i&&(c(t),j(t))}),[o]),Object(r.useEffect)((function(){0===b.length&&i===f&&i.length&&O(f).then(k)}),[f,i,b]),Object(r.useEffect)((function(){j()}),[]);var C=0!==x.length&&0===b.length;return a.a.createElement("div",null,a.a.createElement("div",{className:"search-header"},a.a.createElement("input",{className:"search-box",type:"search",value:i,placeholder:"search for words",onChange:R})),a.a.createElement("div",null,v||0!==b.length?b.map((function(e){return a.a.createElement(_,{entry:e,key:e.word})})):a.a.createElement("h2",null,"No results"),C&&a.a.createElement("div",null,a.a.createElement("h2",null,"Did you mean:"),a.a.createElement("ul",null,x.map((function(e){return a.a.createElement("li",{key:e.word},a.a.createElement(N,{word:e.word}))})))),v&&a.a.createElement("div",{className:"spinner"})))},I=n(54),q=function(){function e(t){Object(f.a)(this,e),this.rect=void 0,this.rect=t}return Object(d.a)(e,[{key:"getBoundingClientRect",value:function(){return this.rect}}]),Object(d.a)(e,[{key:"clientWidth",get:function(){return this.getBoundingClientRect().width}},{key:"clientHeight",get:function(){return this.getBoundingClientRect().height}}]),e}(),D=function(e){e.word;var t=function(){var e=Object(r.useState)(null),t=Object(l.a)(e,2),n=t[0],a=t[1];return Object(r.useEffect)((function(){return R.push(a),function(){var e=R.indexOf(a);-1!==e&&R.splice(e,1)}})),n}(),n=Object(r.useCallback)((function(){return window.history.pushState(null,"Dictionary","?query=".concat(encodeURIComponent(t?t.word:"")))}),[t]);if(!t)return null;var i=new q(t.rect);return a.a.createElement(I.a,{referenceElement:i,placement:"bottom"},(function(e){var t=e.ref,r=e.style,i=e.placement;return a.a.createElement("div",{ref:t,style:r,"data-placement":i,className:"word-tip"},a.a.createElement("button",{onClick:n},"Search"))}))};var P=function(){return a.a.createElement("div",{className:"dictionary"},a.a.createElement(A,null),a.a.createElement(D,{word:"foo"}))},J=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function F(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}k(),c.a.render(a.a.createElement(P,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/dictionary",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/dictionary","/service-worker.js");J?(!function(e,t){fetch(e).then((function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):F(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):F(t,e)}))}}()}},[[26,1,2]]]);
//# sourceMappingURL=main.815d1138.chunk.js.map