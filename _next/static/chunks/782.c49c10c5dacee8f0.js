"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[782,124],{782:function(t,e,n){let r,i,o;n.r(e),n.d(e,{init:function(){return d},start:function(){return w},stop:function(){return g}});var s=n(2123),a=n(6124),l=n(7038),u=n(9634),c=n(1343);let p=["connecting.mp3","connecting5.mp3","connecting4.mp3","connecting3.mp3","connecting2.mp3","connecting1.mp3"],h=new Promise(t=>{r=new s.dQ({urls:p,onload:t,baseUrl:"".concat(u.O,"/audio/Connecting/")}).toDestination()}),d=t=>{t.video.current.loop=!0},m=new a.default([{range:[1,5]}]),f=new a.default([{range:[1,8]}]),y=new a.default([{range:[35,62]}]),b=new l.RandomMetro(()=>{let t=m.next(),e=r.player(t).buffer.duration;return r.player(t).start(),i=e+f.next(),{interval:(0,l.sToMs)(i),clear:()=>{r.player(t).stop()}}}),v=new l.RandomMetro(()=>(r.player(0).start(),o=y.next(),{interval:(0,l.sToMs)(o),clear:()=>{null==r||r.player(0).stop()}})),w=async t=>{await Promise.all([s.BL(),h]),r.player(0).volume.value=-13,b.start(),v.start(),t.current.play()},g=async t=>{t.current&&(t.current.pause(),t.current.currentTime=0),r.volume.rampTo(-80,u.c),b.stop(),v.stop(),await (0,c.ZP)((0,l.sToMs)(u.c)),s.J7.stop(),r.stopAll()}},6124:function(t,e,n){n.r(e),n.d(e,{weightedRandom:function(){return i}});var r=n(7038);let i=t=>{let e;let n=[...t];for(e=1;e<n.length;e++)n[e]+=n[e-1];let r=Math.random()*n[n.length-1];for(e=0;e<n.length&&!(n[e]>r);e++);return e},o=t=>{let{restProbability:e,followedBy:n}=t;return"number"==typeof t||"string"==typeof t?{value:t,type:"value"}:{...t,type:["value","range"].find(e=>void 0!==t[e]),restProbability:e>1?e/100:e,followedBy:n?l(n):void 0}},s=t=>Object.entries(t).map(t=>{let[e,n]=t;return{...o(n),name:e}}),a=t=>t.map((t,e,n)=>{let{length:r}=n;return{name:e,probability:1/r,...o(t)}}),l=t=>(Array.isArray(t)?a:s)(t),u=t=>t.reduce((t,e,n)=>(t[e.name]={...e,index:n},t),{}),c=t=>t.map(t=>t.probability);e.default=class{initCounter(){let{repeat:t}=this.instructions[this.current];this.count=0,this.max=Array.isArray(t)?(0,r.randomInt)(...t):t||0,this.finished=!1}next(){var t;let e=(null===(t=this.instructions)||void 0===t?void 0:t[this.current])||{};if(e.repeat&&!this.finished)this.finished=this.max<=++this.count;else if(e.followedBy&&(e.repeat&&this.finished||!e.repeat)){let{value:n}=e.followedBy[i(c(e.followedBy))];this.current="number"==typeof n?n:this.byName[n].index,this.initCounter()}else this.current=i(this.probabilities),this.initCounter();let o=this.instructions[this.current],{type:s,restProbability:a}=o,l=a&&!i([a,1-a]),u=l?null:"range"==s?(0,r.randomInt)(...o[s]):"value"==s?o[s]:null;return u}constructor(t){this.instructions=l(t),this.probabilities=c(this.instructions),this.byName=u(this.instructions),this.count=this.max=0,this.finished=!1}}},1343:function(t,e,n){let r=()=>{let t=Error("Delay aborted");return t.name="AbortError",t},i=new WeakMap,o=function({clearTimeout:t,setTimeout:e}={}){return(n,{value:o,signal:s}={})=>{let a,l,u;if(s?.aborted)return Promise.reject(r());let c=t??clearTimeout,p=()=>{c(a),u(r())},h=()=>{s&&s.removeEventListener("abort",p)},d=new Promise((t,r)=>{l=()=>{h(),t(o)},u=r,a=(e??setTimeout)(l,n)});return s&&s.addEventListener("abort",p,{once:!0}),i.set(d,()=>{c(a),a=null,l()}),d}}();e.ZP=o}}]);