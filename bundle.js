(()=>{"use strict";var r={192:(r,a,e)=>{e.d(a,{Z:()=>o});var m=e(81),t=e.n(m),n=e(645),k=e.n(n)()(t());k.push([r.id,"*{font-family:'Arima', cursive}body{margin:0px;padding:0px;height:100vh;width:100vw;color:#000;background-color:#d5dbeb}.container{display:grid;grid-template-rows:minmax(10px, 8vh) minmax(200px, 84vh) minmax(10px, 8vh)}.container .header{background:#001733;background:linear-gradient(180deg, #001733 0%, #d5dbeb 100%);grid-row:1}.container .header h1{text-align:center;text-shadow:2px 2px white}.container .playerSelection{justify-items:center;align-content:center;grid-row:2}.container .playerSelection p{text-align:center}.container .gameBoard{grid-row:2}.container .gameBoard .player0 p{text-align:center;color:#005ddf;text-shadow:1px 1px black}.container .gameBoard .player1 p{text-align:center;color:#f07716;text-shadow:1px 1px black}.container .gameBoard p{font-size:17px;font-weight:bold;text-align:center;text-shadow:1px 1px white}.container .footer{background:#001733;background:linear-gradient(0deg, #001733 0%, #d5dbeb 100%);justify-items:center;align-content:center;grid-row:3}.container .footer h4{text-align:center;text-shadow:1px 1px white}.playerSelection{display:grid}.playerSelection .gameType{display:grid}.playerSelection .twoPNames{display:none}.playerSelection .onePName{display:none}.gameBoard{display:none;grid-template-columns:minmax(50px, 1fr) minmax(500px, 9fr) minmax(50px, 1fr);grid-template-rows:1fr}.gameBoard #board{display:grid;gap:5px;height:100%;grid-template-columns:repeat(12, minmax(10px, 1fr));grid-template-rows:repeat(12, minmax(10px, 1fr))}.gameBoard #board .square{height:6vh;width:6vh;border-radius:15px;border:2px black solid}.gameBoard #board .X{background-color:#f07716}.gameBoard #board .O{background-color:#005ddf}.gameBoard .player1turn .square:hover{background-color:#0082c4}.gameBoard .player1turn .O:hover{background-color:#005ddf}.gameBoard .player1turn .X:hover{background-color:#f07716}.gameBoard .player0turn .square:hover{background-color:#ee7f1b}.gameBoard .player0turn .O:hover{background-color:#005ddf}.gameBoard .player0turn .X:hover{background-color:#f07716}#board{justify-self:center}\n",""]);const o=k},645:r=>{r.exports=function(r){var a=[];return a.toString=function(){return this.map((function(a){var e="",m=void 0!==a[5];return a[4]&&(e+="@supports (".concat(a[4],") {")),a[2]&&(e+="@media ".concat(a[2]," {")),m&&(e+="@layer".concat(a[5].length>0?" ".concat(a[5]):""," {")),e+=r(a),m&&(e+="}"),a[2]&&(e+="}"),a[4]&&(e+="}"),e})).join("")},a.i=function(r,e,m,t,n){"string"==typeof r&&(r=[[null,r,void 0]]);var k={};if(m)for(var o=0;o<this.length;o++){var s=this[o][0];null!=s&&(k[s]=!0)}for(var c=0;c<r.length;c++){var i=[].concat(r[c]);m&&k[i[0]]||(void 0!==n&&(void 0===i[5]||(i[1]="@layer".concat(i[5].length>0?" ".concat(i[5]):""," {").concat(i[1],"}")),i[5]=n),e&&(i[2]?(i[1]="@media ".concat(i[2]," {").concat(i[1],"}"),i[2]=e):i[2]=e),t&&(i[4]?(i[1]="@supports (".concat(i[4],") {").concat(i[1],"}"),i[4]=t):i[4]="".concat(t)),a.push(i))}},a}},81:r=>{r.exports=function(r){return r[1]}},379:r=>{var a=[];function e(r){for(var e=-1,m=0;m<a.length;m++)if(a[m].identifier===r){e=m;break}return e}function m(r,m){for(var n={},k=[],o=0;o<r.length;o++){var s=r[o],c=m.base?s[0]+m.base:s[0],i=n[c]||0,l="".concat(c," ").concat(i);n[c]=i+1;var d=e(l),u={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==d)a[d].references++,a[d].updater(u);else{var p=t(u,m);m.byIndex=o,a.splice(o,0,{identifier:l,updater:p,references:1})}k.push(l)}return k}function t(r,a){var e=a.domAPI(a);return e.update(r),function(a){if(a){if(a.css===r.css&&a.media===r.media&&a.sourceMap===r.sourceMap&&a.supports===r.supports&&a.layer===r.layer)return;e.update(r=a)}else e.remove()}}r.exports=function(r,t){var n=m(r=r||[],t=t||{});return function(r){r=r||[];for(var k=0;k<n.length;k++){var o=e(n[k]);a[o].references--}for(var s=m(r,t),c=0;c<n.length;c++){var i=e(n[c]);0===a[i].references&&(a[i].updater(),a.splice(i,1))}n=s}}},569:r=>{var a={};r.exports=function(r,e){var m=function(r){if(void 0===a[r]){var e=document.querySelector(r);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(r){e=null}a[r]=e}return a[r]}(r);if(!m)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");m.appendChild(e)}},216:r=>{r.exports=function(r){var a=document.createElement("style");return r.setAttributes(a,r.attributes),r.insert(a,r.options),a}},565:(r,a,e)=>{r.exports=function(r){var a=e.nc;a&&r.setAttribute("nonce",a)}},795:r=>{r.exports=function(r){var a=r.insertStyleElement(r);return{update:function(e){!function(r,a,e){var m="";e.supports&&(m+="@supports (".concat(e.supports,") {")),e.media&&(m+="@media ".concat(e.media," {"));var t=void 0!==e.layer;t&&(m+="@layer".concat(e.layer.length>0?" ".concat(e.layer):""," {")),m+=e.css,t&&(m+="}"),e.media&&(m+="}"),e.supports&&(m+="}");var n=e.sourceMap;n&&"undefined"!=typeof btoa&&(m+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(n))))," */")),a.styleTagTransform(m,r,a.options)}(a,r,e)},remove:function(){!function(r){if(null===r.parentNode)return!1;r.parentNode.removeChild(r)}(a)}}}},589:r=>{r.exports=function(r,a){if(a.styleSheet)a.styleSheet.cssText=r;else{for(;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(document.createTextNode(r))}}}},a={};function e(m){var t=a[m];if(void 0!==t)return t.exports;var n=a[m]={id:m,exports:{}};return r[m](n,n.exports,e),n.exports}e.n=r=>{var a=r&&r.__esModule?()=>r.default:()=>r;return e.d(a,{a}),a},e.d=(r,a)=>{for(var m in a)e.o(a,m)&&!e.o(r,m)&&Object.defineProperty(r,m,{enumerable:!0,get:a[m]})},e.o=(r,a)=>Object.prototype.hasOwnProperty.call(r,a),e.nc=void 0,(()=>{var r=e(379),a=e.n(r),m=e(795),t=e.n(m),n=e(569),k=e.n(n),o=e(565),s=e.n(o),c=e(216),i=e.n(c),l=e(589),d=e.n(l),u=e(192),p={};p.styleTagTransform=d(),p.setAttributes=s(),p.insert=k().bind(null,"head"),p.domAPI=t(),p.insertStyleElement=i(),a()(u.Z,p),u.Z&&u.Z.locals&&u.Z.locals;const y=(()=>{var r,a=document.getElementById("board"),e=[],m=[],t=2,n=2;const k=(r,a)=>{let e;if(!(m.length>1))return e=0==m.length?1:2,""==r&&(r=`Player ${m.length+1}`),{name:r,type:a,score:0,mark:e,plusScore:function(r){this.score+=r},clearScore:function(){this.score=0}}},o=(n,k)=>{let o=`X${n}Y${k}`;function s(r){let e=document.getElementById(`square${r.id}`);if(null==e){let e=document.createElement("div");e.id=`square${o}`,e.className="square",e.innerText="",r.mark=0,e.onclick=function(){r.setMark()},a.appendChild(e)}else 1==r.mark&&(e.className="square O"),2==r.mark&&(e.className="square X"),0==r.mark&&(e.className="square")}return{id:o,x:n,y:k,mark:"",resetMark:function(){this.mark=0,s(this)},setMark:function(){let n=document.getElementById("player1score"),k=document.getElementById("player2score");if(""==this.mark)if(2==t)s(this);else{1==t&&(a.className="player1turn"),0==t&&(a.className="player0turn"),this.mark=m[t].mark;let o=i(e,this.x,this.y,!1);if(s(this),0==t){if(m[0].plusScore(o.score),n.innerText=`Score: ${m[0].score}`,t=1,1==o.reset&&(l(),1==t&&"ai"==r))return console.log("1"),e[6][6].mark=m[1].mark,s(e[6][6]),t=0,void(a.className="player1turn");if("ai"==r&&0==o.reset){let r=c(JSON.parse(JSON.stringify(e)),0,!0,this.x,this.y,-1/0,1/0);e[r.x][r.y].mark=m[1].mark;let n=i(e,r.x,r.y,!1);return m[1].plusScore(n.score),k.innerText=`Score: ${m[1].score}`,s(e[r.x][r.y]),a.className="player1turn",1==n.reset?(l(),void(1==t&&(e[6][6].mark=m[1].mark,console.log("2"),s(e[6][6]),t=0,a.className="player1turn"))):void(t=0)}return}if(1==t)return m[1].plusScore(o.score),k.innerText=`Score: ${m[1].score}`,t=0,void(1==o.reset&&l());m[0].score>=100&&m[0],m[1].score>=100&&m[1]}}}};function s(r,a,e){let m,t=0,n=0,k=!0;for(let o=0;o<12;o++)for(let c=0;c<12;c++)if(0!=r[o][c].mark){a.push({x:o,y:c});for(let i=-1;i<2;i++)for(let l=-1;l<2;l++){t=o+i,n=c+l;for(let r=0;r<a.length;r++)if(a[r].x==t&&a[r].y==n){k=!1;break}1==k&&t>=0&&t<=11&&n>=0&&n<=11&&(0==r[t][n].mark?(e.push({x:t,y:n}),a.push({x:t,y:n})):(a.push({x:t,y:n}),m=s(r,a,e),a=m.checked,e=m.moves)),k=!0}}return{moves:e,checked:a}}function c(r,a,e,m,t,n,k){let o,l,d,u=i(r,m,t,!0),p=s(r,[],[]).moves;if(1==u.reset||4==a){if(0==e){if(u.erased.length>0)for(let a=0;a<u.erased.length;a++)r[u.erased[a].x][u.erased[a].y].mark=2;return{score:u.score,x:m,y:t,erased:u.erased}}if(1==e){if(u.erased.length>0)for(let a=0;a<u.erased.length;a++)r[u.erased[a].x][u.erased[a].y].mark=1;return{score:-u.score,x:m,y:t,erased:u.erased}}}if(0==a&&(u.score=0),1==e){d=-1/0;for(let e=0;e<p.length;e++)if(0==r[p[e].x][p[e].y].mark){r[p[e].x][p[e].y].mark=2;let m=c(r,a+1,!1,p[e].x,p[e].y,n,k);if(r[p[e].x][p[e].y].mark=0,+m.score-+u.score>d&&(o=p[e].x,l=p[e].y,d=+m.score-+u.score),+m.score-+u.score>=n&&(n=m.score-u.score),m.erased.length>0)for(let a=0;a<m.erased.length;a++)r[m.erased[a].x][m.erased[a].y].mark=1;if(k<n)break}return{score:d,x:o,y:l,erased:u.erased}}if(0==e){d=1/0;for(let e=0;e<p.length;e++)if(0==r[p[e].x][p[e].y].mark){r[p[e].x][p[e].y].mark=1;let m=c(r,a+1,!0,p[e].x,p[e].y,n,k);if(r[p[e].x][p[e].y].mark=0,m.score+u.score<d&&(o=p[e].x,l=p[e].y,d=m.score+u.score),m.score+u.score<=k&&(k=m.score+u.score),m.erased.length>0)for(let a=0;a<m.erased.length;a++)r[m.erased[a].x][m.erased[a].y].mark=2;if(k<n)break}return{score:d,x:o,y:l,erased:u.erased}}}function i(r,a,e,m){let t=0,n=!1,k=[];return a<9&&r[a][e].mark==r[a+1][e].mark&&r[a+1][e].mark==r[a+2][e].mark&&r[a+2][e].mark==r[a+3][e].mark&&(t+=3),a>2&&r[a][e].mark==r[a-1][e].mark&&r[a-1][e].mark==r[a-2][e].mark&&r[a-2][e].mark==r[a-3][e].mark&&(t+=3),e<9&&r[a][e].mark==r[a][e+1].mark&&r[a][e+1].mark==r[a][e+2].mark&&r[a][e+2].mark==r[a][e+3].mark&&(t+=3),e>2&&r[a][e].mark==r[a][e-1].mark&&r[a][e-1].mark==r[a][e-2].mark&&r[a][e-2].mark==r[a][e-3].mark&&(t+=3),a<9&&e<9&&r[a][e].mark==r[a+1][e+1].mark&&r[a+1][e+1].mark==r[a+2][e+2].mark&&r[a+2][e+2].mark==r[a+3][e+3].mark&&(t+=3),a>2&&e>2&&r[a][e].mark==r[a-1][e-1].mark&&r[a-1][e-1].mark==r[a-2][e-2].mark&&r[a-2][e-2].mark==r[a-3][e-3].mark&&(t+=3),a>2&&e<9&&r[a][e].mark==r[a-1][e+1].mark&&r[a-1][e+1].mark==r[a-2][e+2].mark&&r[a-2][e+2].mark==r[a-3][e+3].mark&&(t+=3),a<9&&e>2&&r[a][e].mark==r[a+1][e-1].mark&&r[a+1][e-1].mark==r[a+2][e-2].mark&&r[a+2][e-2].mark==r[a+3][e-3].mark&&(t+=3),a<10&&a>0&&r[a][e].mark==r[a-1][e].mark&&r[a][e].mark==r[a+1][e].mark&&r[a+1][e].mark==r[a+2][e].mark&&(t+=3),a>1&&a<11&&r[a][e].mark==r[a+1][e].mark&&r[a][e].mark==r[a-1][e].mark&&r[a-1][e].mark==r[a-2][e].mark&&(t+=3),e<10&&e>0&&r[a][e].mark==r[a][e-1].mark&&r[a][e].mark==r[a][e+1].mark&&r[a][e+1].mark==r[a][e+2].mark&&(t+=3),e>1&&e<11&&r[a][e].mark==r[a][e+1].mark&&r[a][e].mark==r[a][e-1].mark&&r[a][e-1].mark==r[a][e-2].mark&&(t+=3),a<10&&e<10&&a>0&&e>0&&r[a][e].mark==r[a-1][e-1].mark&&r[a][e].mark==r[a+1][e+1].mark&&r[a+1][e+1].mark==r[a+2][e+2].mark&&(t+=3),a>1&&e>1&&a<11&&e<11&&r[a][e].mark==r[a+1][e+1].mark&&r[a][e].mark==r[a-1][e-1].mark&&r[a-1][e-1].mark==r[a-2][e-2].mark&&(t+=3),a>1&&e<10&&a<11&&e>0&&r[a][e].mark==r[a+1][e-1].mark&&r[a][e].mark==r[a-1][e+1].mark&&r[a-1][e+1].mark==r[a-2][e+2].mark&&(t+=3),a<10&&e>1&&a>0&&e<11&&r[a][e].mark==r[a-1][e+1].mark&&r[a][e].mark==r[a+1][e-1].mark&&r[a+1][e-1].mark==r[a+2][e-2].mark&&(t+=3),a<9&&r[a][e].mark!=r[a+1][e].mark&&0!=r[a+1][e].mark&&r[a+1][e].mark==r[a+2][e].mark&&r[a][e].mark==r[a+3][e].mark&&(t+=2,1==m?(r[a+1][e].mark=0,r[a+2][e].mark=0,k.push({x:r[a+1][e].x,y:r[a+1][e].y}),k.push({x:r[a+2][e].x,y:r[a+2][e].y})):(r[a+1][e].resetMark(),r[a+2][e].resetMark())),a>2&&r[a][e].mark!=r[a-1][e].mark&&0!=r[a-1][e].mark&&r[a-1][e].mark==r[a-2][e].mark&&r[a][e].mark==r[a-3][e].mark&&(t+=2,1==m?(r[a-1][e].mark=0,r[a-2][e].mark=0,k.push({x:r[a-1][e].x,y:r[a-1][e].y}),k.push({x:r[a-2][e].x,y:r[a-2][e].y})):(r[a-1][e].resetMark(),r[a-2][e].resetMark())),e<9&&r[a][e].mark!=r[a][e+1].mark&&0!=r[a][e+1].mark&&r[a][e+1].mark==r[a][e+2].mark&&r[a][e].mark==r[a][e+3].mark&&(t+=2,1==m?(r[a][e+1].mark=0,r[a][e+2].mark=0,k.push({x:r[a][e+1].x,y:r[a][e+1].y}),k.push({x:r[a][e+2].x,y:r[a][e+2].y})):(r[a][e+1].resetMark(),r[a][e+2].resetMark())),e>2&&r[a][e].mark!=r[a][e-1].mark&&0!=r[a][e-1].mark&&r[a][e-1].mark==r[a][e-2].mark&&r[a][e].mark==r[a][e-3].mark&&(t+=2,1==m?(r[a][e-1].mark=0,r[a][e-2].mark=0,k.push({x:r[a][e-1].x,y:r[a][e-1].y}),k.push({x:r[a][e-2].x,y:r[a][e-2].y})):(r[a][e-1].resetMark(),r[a][e-2].resetMark())),a<9&&e<9&&r[a][e].mark!=r[a+1][e+1].mark&&0!=r[a+1][e+1].mark&&r[a+1][e+1].mark==r[a+2][e+2].mark&&r[a][e].mark==r[a+3][e+3].mark&&(t+=2,1==m?(r[a+1][e+1].mark=0,r[a+2][e+2].mark=0,k.push({x:r[a+1][e+1].x,y:r[a+1][e+1].y}),k.push({x:r[a+2][e+2].x,y:r[a+2][e+2].y})):(r[a+1][e+1].resetMark(),r[a+2][e+2].resetMark())),a>2&&e>2&&r[a][e].mark!=r[a-1][e-1].mark&&0!=r[a-1][e-1].mark&&r[a-1][e-1].mark==r[a-2][e-2].mark&&r[a][e].mark==r[a-3][e-3].mark&&(t+=2,1==m?(r[a-1][e-1].mark=0,r[a-2][e-2].mark=0,k.push({x:r[a-1][e-1].x,y:r[a-1][e-1].y}),k.push({x:r[a-2][e-2].x,y:r[a-2][e-2].y})):(r[a-1][e-1].resetMark(),r[a-2][e-2].resetMark())),a>2&&e<9&&r[a][e].mark!=r[a-1][e+1].mark&&0!=r[a-1][e+1].mark&&r[a-1][e+1].mark==r[a-2][e+2].mark&&r[a][e].mark==r[a-3][e+3].mark&&(t+=2,1==m?(r[a-1][e+1].mark=0,r[a-2][e+2].mark=0,k.push({x:r[a-1][e+1].x,y:r[a-1][e+1].y}),k.push({x:r[a-2][e+2].x,y:r[a-2][e+2].y})):(r[a-1][e+1].resetMark(),r[a-2][e+2].resetMark())),a<9&&e>2&&r[a][e].mark!=r[a+1][e-1].mark&&0!=r[a+1][e-1].mark&&r[a+1][e-1].mark==r[a+2][e-2].mark&&r[a][e].mark==r[a+3][e-3].mark&&(t+=2,1==m?(r[a+1][e-1].mark=0,r[a+2][e-2].mark=0,k.push({x:r[a+1][e-1].x,y:r[a+1][e-1].y}),k.push({x:r[a+2][e-2].x,y:r[a+2][e-2].y})):(r[a+1][e-1].resetMark(),r[a+2][e-2].resetMark())),a<8&&r[a][e].mark==r[a+1][e].mark&&r[a+1][e].mark==r[a+2][e].mark&&r[a+2][e].mark==r[a+3][e].mark&&r[a+3][e].mark==r[a+4][e].mark&&(t+=2,n=!0),a>3&&r[a][e].mark==r[a-1][e].mark&&r[a-1][e].mark==r[a-2][e].mark&&r[a-2][e].mark==r[a-3][e].mark&&r[a-3][e].mark==r[a-4][e].mark&&(t+=2,n=!0),e<8&&r[a][e].mark==r[a][e+1].mark&&r[a][e+1].mark==r[a][e+2].mark&&r[a][e+2].mark==r[a][e+3].mark&&r[a][e+3].mark==r[a][e+4].mark&&(t+=2,n=!0),e>3&&r[a][e].mark==r[a][e-1].mark&&r[a][e-1].mark==r[a][e-2].mark&&r[a][e-2].mark==r[a][e-3].mark&&r[a][e-3].mark==r[a][e-4].mark&&(t+=2,n=!0),a<8&&e<8&&r[a][e].mark==r[a+1][e+1].mark&&r[a+1][e+1].mark==r[a+2][e+2].mark&&r[a+2][e+2].mark==r[a+3][e+3].mark&&r[a+3][e+3].mark==r[a+4][e+4].mark&&(t+=2,n=!0),a>3&&e>3&&r[a][e].mark==r[a-1][e-1].mark&&r[a-1][e-1].mark==r[a-2][e-2].mark&&r[a-2][e-2].mark==r[a-3][e-3].mark&&r[a-3][e-3].mark==r[a-4][e-4].mark&&(t+=2,n=!0),a>3&&e<8&&r[a][e].mark==r[a-1][e+1].mark&&r[a-1][e+1].mark==r[a-2][e+2].mark&&r[a-2][e+2].mark==r[a-3][e+3].mark&&r[a-3][e+3].mark==r[a-4][e+4].mark&&(t+=2,n=!0),a<8&&e>3&&r[a][e].mark==r[a+1][e-1].mark&&r[a+1][e-1].mark==r[a+2][e-2].mark&&r[a+2][e-2].mark==r[a+3][e-3].mark&&r[a+3][e-3].mark==r[a+4][e-4].mark&&(t+=2,n=!0),a<9&&a>0&&r[a][e].mark==r[a-1][e].mark&&r[a][e].mark==r[a+1][e].mark&&r[a+1][e].mark==r[a+2][e].mark&&r[a+2][e].mark==r[a+3][e].mark&&(t-=1,n=!0),a>2&&a<11&&r[a][e].mark==r[a+1][e].mark&&r[a][e].mark==r[a-1][e].mark&&r[a-1][e].mark==r[a-2][e].mark&&r[a-2][e].mark==r[a-3][e].mark&&(t-=1,n=!0),e<9&&e>0&&r[a][e].mark==r[a][e-1].mark&&r[a][e].mark==r[a][e+1].mark&&r[a][e+1].mark==r[a][e+2].mark&&r[a][e+2].mark==r[a][e+3].mark&&(t-=1,n=!0),e>2&&e<11&&r[a][e].mark==r[a][e+1].mark&&r[a][e].mark==r[a][e-1].mark&&r[a][e-1].mark==r[a][e-2].mark&&r[a][e-2].mark==r[a][e-3].mark&&(t-=1,n=!0),a<9&&e<9&&a>0&&e>0&&r[a][e].mark==r[a-1][e-1].mark&&r[a][e].mark==r[a+1][e+1].mark&&r[a+1][e+1].mark==r[a+2][e+2].mark&&r[a+2][e+2].mark==r[a+3][e+3].mark&&(t+=2,n=!0),a>2&&e>2&&a<11&&e<11&&r[a][e].mark==r[a+1][e+1].mark&&r[a][e].mark==r[a-1][e-1].mark&&r[a-1][e-1].mark==r[a-2][e-2].mark&&r[a-2][e-2].mark==r[a-3][e-3].mark&&(t+=2,n=!0),a>2&&e<9&&a<11&&e>0&&r[a][e].mark==r[a+1][e-1].mark&&r[a][e].mark==r[a-1][e+1].mark&&r[a-1][e+1].mark==r[a-2][e+2].mark&&r[a-2][e+2].mark==r[a-3][e+3].mark&&(t+=2,n=!0),a<9&&e>2&&a>0&&e<11&&r[a][e].mark==r[a-1][e+1].mark&&r[a][e].mark==r[a+1][e-1].mark&&r[a+1][e-1].mark==r[a+2][e-2].mark&&r[a+2][e-2].mark==r[a+3][e-3].mark&&(t+=2,n=!0),a>1&&a<10&&r[a][e].mark==r[a+1][e].mark&&r[a][e].mark==r[a+2][e].mark&&r[a][e].mark==r[a-1][e].mark&&r[a][e].mark==r[a-2][e].mark&&(t-=1,n=!0),e>1&&e<10&&r[a][e].mark==r[a][e-1].mark&&r[a][e].mark==r[a][e-2].mark&&r[a][e].mark==r[a][e+1].mark&&r[a][e].mark==r[a][e+2].mark&&(t-=1,n=!0),a>1&&e<10&&a<10&&e>1&&r[a][e].mark==r[a+1][e-1].mark&&r[a][e].mark==r[a+2][e-2].mark&&r[a][e].mark==r[a-1][e+1].mark&&r[a][e].mark==r[a-2][e+2].mark&&(t-=1,n=!0),a>1&&e<10&&a<10&&e>1&&r[a][e].mark==r[a+1][e+1].mark&&r[a][e].mark==r[a+2][e+2].mark&&r[a][e].mark==r[a-1][e-1].mark&&r[a][e].mark==r[a-2][e-2].mark&&(t-=1,n=!0),{erased:k,reset:n,score:t}}function l(){e=[],t=2,0==n?n=1:(1==n||2==n)&&(n=0),a.innerHTML="",function(){let r=[];for(let a=0;a<12;a++){r=[];for(let e=0;e<12;e++)r.push(o(a,e)),r[e].setMark();e.push(r)}}(),1==(t=n)&&(a.className="player0turn"),0==t&&(a.className="player1turn")}return l(),{setGameType:function(a){r="ai"==a?"ai":"twoPlayers"},newPlayers:function(){let a=document.getElementById("playerSelection"),e=document.getElementById("player1name"),t=document.getElementById("player2name");"ai"==r?(m.push(k(`${a.player.value}`,"human")),m.push(k("AI","ai"))):(m.push(k(`${a.player1.value}`,"human")),m.push(k(`${a.player2.value}`,"human"))),e.innerText=`${m[0].name}`,t.innerText=`${m[1].name}`}}})();function f(){const r=document.getElementById("playerSelection"),a=document.querySelector(".gameBoard"),e=document.querySelector(".onePName"),m=document.querySelector(".twoPNames");a.style.display="grid",e.style.display="none",m.style.display="none",r.style.display="none",y.newPlayers()}const x=document.getElementById("twoPlayers"),h=document.getElementById("ai"),g=document.getElementById("startGame"),v=document.getElementById("startGameAi");g.addEventListener("click",f),v.addEventListener("click",f),h.addEventListener("click",(function(){const r=document.querySelector(".gameType"),a=document.querySelector(".onePName");r.style.display="none",a.style.display="grid",y.setGameType("ai")})),x.addEventListener("click",(function(){const r=document.querySelector(".gameType"),a=document.querySelector(".twoPNames");r.style.display="none",a.style.display="grid",y.setGameType("two")}))})()})();