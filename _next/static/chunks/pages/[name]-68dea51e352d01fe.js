(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[104],{3454:function(e,t,n){"use strict";var r,o;e.exports=(null==(r=n.g.process)?void 0:r.env)&&"object"==typeof(null==(o=n.g.process)?void 0:o.env)?n.g.process:n(7663)},4167:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[name]",function(){return n(4090)}])},9634:function(e,t,n){"use strict";n.d(t,{O:function(){return o},c:function(){return i}});var r=n(3454);let o=r.env.NEXT_PUBLIC_BASE_PATH||"",i=.05},442:function(e,t,n){"use strict";n.d(t,{$:function(){return o},o:function(){return r}});let r=e=>new Promise(t=>{if(4===e.readyState)t();else{let n=()=>{t(),removeEventListener("loadeddata",n,!0)};e.addEventListener("loadeddata",n,!0)}}),o=e=>{if(0==e.length)return 0;let t=[...e].sort((e,t)=>e-t),n=-1;for(let r=0;r<t.length;++r)if(t[r]!=r){n=r;break}return -1==n&&(n=t[t.length-1]+1),n}},4090:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return h},default:function(){return p}});var r=n(5893),o=n(9634),i=n(442),c=n(7294),s=n(5738),u=n.n(s),a=n(1163),l=n(9008),f=n.n(l);let d=e=>{let{name:t,play:s,onFinish:l}=e,[d,v]=(0,c.useState)({}),[h,p]=(0,c.useState)(!1),m=(0,c.useRef)(),w=(0,c.useRef)(),_=(0,c.useRef)(),y=(0,a.useRouter)(),j=()=>{y.push("/")},E=function(){let[e,t]=(0,c.useState)({width:void 0,height:void 0});return(0,c.useEffect)(()=>{function e(){t({width:window.innerWidth,height:window.innerHeight})}return window.addEventListener("resize",e),e(),()=>window.removeEventListener("resize",e)},[]),e}();(0,c.useEffect)(()=>{var e;null==d||null===(e=d.onResize)||void 0===e||e.call(d,E)},[E,d]);let b=(0,c.useCallback)(()=>{var e;null==d||null===(e=d.start)||void 0===e||e.call(d,m)},[d]),x=(0,c.useCallback)(()=>{var e;null==d||null===(e=d.stop)||void 0===e||e.call(d,m)},[d]);return(0,c.useEffect)(()=>x,[x]),(0,c.useEffect)(()=>{(s?b:x)()},[s,b]),(0,c.useEffect)(()=>{(async()=>{var e;let r=await n(4578)("./".concat(t,".js"));await (0,i.o)(m.current,_.current),null==r||null===(e=r.init)||void 0===e||e.call(r,{video:m,video2:w,onFinish:l}),p(!0),v(r)})()},[t]),(0,r.jsxs)("div",{className:u().container,children:[(0,r.jsx)(f(),{children:(0,r.jsx)("title",{children:t+" - music to compose music to"})}),(0,r.jsx)("button",{className:u().back,onClick:j,children:"←"}),(0,r.jsx)("video",{className:u().video,ref:m,loop:!0,onPause:()=>{m.current.play()},children:(0,r.jsx)("source",{src:"".concat(o.O,"/videos/").concat(t,".mp4"),type:"video/mp4"})}),"concert"==t&&(0,r.jsx)("video",{muted:!0,className:u().video,style:{visibility:"hidden"},ref:w,children:(0,r.jsx)("source",{src:"".concat(o.O,"/videos/concert2.mp4"),type:"video/mp4"})})]})},v=e=>{let{name:t}=e,[n,o]=(0,c.useState)(!1);return(0,c.useEffect)(()=>(o(!0),()=>o(!1)),[]),(0,r.jsx)(d,{name:t,play:n})};var h=!0,p=v},5738:function(e){e.exports={video:"Room_video__YcupO",container:"Room_container__0WUmo",back:"Room_back__u9OGJ"}},7663:function(e){!function(){var t={229:function(e){var t,n,r,o=e.exports={};function i(){throw Error("setTimeout has not been defined")}function c(){throw Error("clearTimeout has not been defined")}function s(e){if(t===setTimeout)return setTimeout(e,0);if((t===i||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(r){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:i}catch(e){t=i}try{n="function"==typeof clearTimeout?clearTimeout:c}catch(r){n=c}}();var u=[],a=!1,l=-1;function f(){a&&r&&(a=!1,r.length?u=r.concat(u):l=-1,u.length&&d())}function d(){if(!a){var e=s(f);a=!0;for(var t=u.length;t;){for(r=u,u=[];++l<t;)r&&r[l].run();l=-1,t=u.length}r=null,a=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===c||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(r){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function v(e,t){this.fun=e,this.array=t}function h(){}o.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new v(e,t)),1!==u.length||a||s(d)},v.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=h,o.addListener=h,o.once=h,o.off=h,o.removeListener=h,o.removeAllListeners=h,o.emit=h,o.prependListener=h,o.prependOnceListener=h,o.listeners=function(e){return[]},o.binding=function(e){throw Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw Error("process.chdir is not supported")},o.umask=function(){return 0}}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var i=n[e]={exports:{}},c=!0;try{t[e](i,i.exports,r),c=!1}finally{c&&delete n[e]}return i.exports}r.ab="//";var o=r(229);e.exports=o}()},9008:function(e,t,n){e.exports=n(3121)},1163:function(e,t,n){e.exports=n(880)},4578:function(e,t,n){var r={"./apartment.js":[4260,123,260],"./common.js":[7038],"./concert.js":[5811,123,811],"./connecting.js":[782,123,782],"./index.js":[611,123,139],"./lobby.js":[8715,123,715],"./nowhere.js":[7362,123,362],"./sleep.js":[1302,123,302],"./sonyEricsson.js":[5219,123,219],"./stochastic.js":[6124,124],"./tab-audio.js":[5369,123,369],"./travel.js":[1828,123,828],"./vacation.js":[8082,123,82],"./workspace.js":[146,123,146]};function o(e){if(!n.o(r,e))return Promise.resolve().then(function(){var t=Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t});var t=r[e],o=t[0];return Promise.all(t.slice(1).map(n.e)).then(function(){return n(o)})}o.keys=function(){return Object.keys(r)},o.id=4578,e.exports=o}},function(e){e.O(0,[774,888,179],function(){return e(e.s=4167)}),_N_E=e.O()}]);