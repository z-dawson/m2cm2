"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[782,38,124],{7038:function(t,e,i){i.r(e),i.d(e,{Loop:function(){return u},RandomMetro:function(){return o},Urn:function(){return r},getNumFilenames:function(){return d},msToS:function(){return h},randomFloat:function(){return a},randomInt:function(){return l},randomRange:function(){return n},sToMs:function(){return c}});let n=(t,e)=>(t=Math.ceil(t),Math.floor(Math.random()*((e=Math.floor(e))-t+1)+t)),r=class{next(){(this.discarded.length>this.waiting||0==this.possible.length)&&(this.possible=this.possible.concat(this.discarded.slice(0,this.reuse)),this.discarded.splice(0,this.reuse));let t=Math.floor(Math.random()*this.possible.length),e=this.possible[t];return this.possible.splice(t,1),this.discarded.push(e),e}constructor(t,e,i=1){this.waiting=e,this.reuse=i,this.possible=Array(t-1-0+1).fill(0).map((t,e)=>0+e),this.discarded=[]}},s=t=>1==t.length?[0,t[0]]:t,a=function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];let[n,r]=s(e);return Math.random()*(r-n)+n},l=function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];let[n,r]=s(e);return Math.floor(a(n,r))},o=class{start(t){let{callback:e}=t||{};e&&(this.callback=e);let{interval:i,clear:n}=this.callback(this)||{};this.callbackClear=n;let r="number"==typeof i?i:l(this.min,this.max);return this.count++,this.delay=setTimeout(this.start.bind(this),r),this}stop(){if(this){var t;return clearTimeout(this.delay),null===this||void 0===this||null===(t=this.callbackClear)||void 0===t||t.call(this),this.count=0,this}}setRange(t,e){Object.assign(this,{min:t,max:e})}constructor(t){this.callback=t,this.delay,this.count=0}},c=t=>1e3*t,h=t=>t/1e3,u=class{init(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.callback=t;let i={interval:c(1)};return Object.assign(this,i,e),this.count=0,this}start(t,e){let i=()=>{this.callbackClear=this.callback(this),this.count+=1};return this.active&&this.clear(),t&&this.init(t,e),i(),this.loopReference=setInterval(()=>{this.count>=this.times?this.clear():i()},this.interval),this.active=!0,this}clear(){var t;return this.count=0,clearInterval(this.loopReference),null===this||void 0===this||null===(t=this.callbackClear)||void 0===t||t.call(this),this.active=!1,this}stop(){return this.clear()}constructor(t,e){this.init(t,e),this.active=!1}},d=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"mp3";return Array.from(Array(t)).map((t,n)=>"".concat(n+e,".").concat(i))}},782:function(t,e,i){let n,r,s;i.r(e),i.d(e,{init:function(){return d},start:function(){return v},stop:function(){return g}});var a=i(2123),l=i(6124),o=i(7038),c=i(9634);let h=["connecting.mp3","connecting5.mp3","connecting4.mp3","connecting3.mp3","connecting2.mp3","connecting1.mp3"],u=new Promise(t=>{n=new a.dQ({urls:h,onload:t,baseUrl:"".concat(c.O,"/audio/Connecting/")}).toDestination()}),d=t=>{t.video.current.loop=!0},p=new l.default([{range:[1,5]}]),f=new l.default([{range:[1,8]}]),m=new l.default([{range:[35,62]}]),b=new o.RandomMetro(()=>{let t=p.next(),e=n.player(t).buffer.duration;return n.player(t).start(),r=e+f.next(),{interval:(0,o.sToMs)(r),clear:()=>{n.player(t).stop()}}}),y=new o.RandomMetro(()=>(n.player(0).start(),s=m.next(),{interval:(0,o.sToMs)(s),clear:()=>{null==n||n.player(0).stop()}})),v=async t=>{await Promise.all([a.BL(),u]),n.player(0).volume.value=-13,b.start(),y.start(),t.current.play()},g=t=>{a.J7.stop(),b.stop(),y.stop(),t.current&&(t.current.pause(),t.current.currentTime=0)}},6124:function(t,e,i){i.r(e),i.d(e,{weightedRandom:function(){return r}});var n=i(7038);let r=t=>{let e;let i=[...t];for(e=1;e<i.length;e++)i[e]+=i[e-1];let n=Math.random()*i[i.length-1];for(e=0;e<i.length&&!(i[e]>n);e++);return e},s=t=>{let{restProbability:e,followedBy:i}=t;return"number"==typeof t||"string"==typeof t?{value:t,type:"value"}:{...t,type:["value","range"].find(e=>void 0!==t[e]),restProbability:e>1?e/100:e,followedBy:i?o(i):void 0}},a=t=>Object.entries(t).map(t=>{let[e,i]=t;return{...s(i),name:e}}),l=t=>t.map((t,e,i)=>{let{length:n}=i;return{name:e,probability:1/n,...s(t)}}),o=t=>(Array.isArray(t)?l:a)(t),c=t=>t.reduce((t,e,i)=>(t[e.name]={...e,index:i},t),{}),h=t=>t.map(t=>t.probability);e.default=class{initCounter(){let{repeat:t}=this.instructions[this.current];this.count=0,this.max=Array.isArray(t)?(0,n.randomInt)(...t):t||0,this.finished=!1}next(){var t;let e=(null===(t=this.instructions)||void 0===t?void 0:t[this.current])||{};if(e.repeat&&!this.finished)this.finished=this.max<=++this.count;else if(e.followedBy&&(e.repeat&&this.finished||!e.repeat)){let{value:i}=e.followedBy[r(h(e.followedBy))];this.current="number"==typeof i?i:this.byName[i].index,this.initCounter()}else this.current=r(this.probabilities),this.initCounter();let s=this.instructions[this.current],{type:a,restProbability:l}=s,o=l&&!r([l,1-l]),c=o?null:"range"==a?(0,n.randomInt)(...s[a]):"value"==a?s[a]:null;return c}constructor(t){this.instructions=o(t),this.probabilities=h(this.instructions),this.byName=c(this.instructions),this.count=this.max=0,this.finished=!1}}}}]);