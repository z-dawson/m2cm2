"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[715,124],{8715:function(t,e,r){let n,i,o;r.r(e),r.d(e,{init:function(){return v},start:function(){return g},stop:function(){return P}});var s=r(2123),l=r(9634),a=r(7038),u=r(6124),c=r(1343);let d=(0,a.getNumFilenames)(124),h=new u.default([80,100,120,132]),m=new Promise(t=>{n=new s.J5({url:"/audio/lobby/recurring.mp3",onload:t}).toDestination()}),p=new a.RandomMetro(t=>{let{count:e}=t;return 0!==e&&(n.start(),console.log("recurring...")),{interval:(0,a.sToMs)(h.next())}}),b=new Promise(t=>{i=new s.dQ({urls:d,onload:t,baseUrl:"".concat(l.O,"/audio/lobby/")}).toDestination()}),f=new a.Urn(d.length,d.length-1),y=[],v=t=>{(o=t.video).current.loop=!0,Object.assign(o.current.style,{objectPosition:"70% 100%"}),o.current.addEventListener("seeked",()=>{var t;(null==o?void 0:null===(t=o.current)||void 0===t?void 0:t.paused)||w()})},g=async()=>{await Promise.all([s.BL(),b,m]),i.volume.value=0,n.volume.value=-13,s.J7.start(),o.current.currentTime=0,o.current.play(),p.start()},w=()=>{y=[f.next(),f.next()],console.log("schedule player ".concat(y[0]," for door opening")),i.player(y[0]).start(s.zO()+.9),console.log("schedule player ".concat(y[1]," for door opening")),i.player(y[1]).start(s.zO()+4.2)},P=async t=>{t.current&&(t.current.pause(),t.current.currentTime=0),i.volume.rampTo(-80,l.c),p.stop(),await (0,c.ZP)((0,a.sToMs)(l.c)),i.stopAll(),n.stop(),s.J7.stop()}},6124:function(t,e,r){r.r(e),r.d(e,{weightedRandom:function(){return i}});var n=r(7038);let i=t=>{let e;let r=[...t];for(e=1;e<r.length;e++)r[e]+=r[e-1];let n=Math.random()*r[r.length-1];for(e=0;e<r.length&&!(r[e]>n);e++);return e},o=t=>{let{restProbability:e,followedBy:r}=t;return"number"==typeof t||"string"==typeof t?{value:t,type:"value"}:{...t,type:["value","range"].find(e=>void 0!==t[e]),restProbability:e>1?e/100:e,followedBy:r?a(r):void 0}},s=t=>Object.entries(t).map(t=>{let[e,r]=t;return{...o(r),name:e}}),l=t=>t.map((t,e,r)=>{let{length:n}=r;return{name:e,probability:1/n,...o(t)}}),a=t=>(Array.isArray(t)?l:s)(t),u=t=>t.reduce((t,e,r)=>(t[e.name]={...e,index:r},t),{}),c=t=>t.map(t=>t.probability);e.default=class{initCounter(){let{repeat:t}=this.instructions[this.current];this.count=0,this.max=Array.isArray(t)?(0,n.randomInt)(...t):t||0,this.finished=!1}next(){var t;let e=(null===(t=this.instructions)||void 0===t?void 0:t[this.current])||{};if(e.repeat&&!this.finished)this.finished=this.max<=++this.count;else if(e.followedBy&&(e.repeat&&this.finished||!e.repeat)){let{value:r}=e.followedBy[i(c(e.followedBy))];this.current="number"==typeof r?r:this.byName[r].index,this.initCounter()}else this.current=i(this.probabilities),this.initCounter();let o=this.instructions[this.current],{type:s,restProbability:l}=o,a=l&&!i([l,1-l]),u=a?null:"range"==s?(0,n.randomInt)(...o[s]):"value"==s?o[s]:null;return u}constructor(t){this.instructions=a(t),this.probabilities=c(this.instructions),this.byName=u(this.instructions),this.count=this.max=0,this.finished=!1}}},1343:function(t,e,r){let n=()=>{let t=Error("Delay aborted");return t.name="AbortError",t},i=new WeakMap,o=function({clearTimeout:t,setTimeout:e}={}){return(r,{value:o,signal:s}={})=>{let l,a,u;if(s?.aborted)return Promise.reject(n());let c=t??clearTimeout,d=()=>{c(l),u(n())},h=()=>{s&&s.removeEventListener("abort",d)},m=new Promise((t,n)=>{a=()=>{h(),t(o)},u=n,l=(e??setTimeout)(a,r)});return s&&s.addEventListener("abort",d,{once:!0}),i.set(m,()=>{c(l),l=null,a()}),m}}();e.ZP=o}}]);