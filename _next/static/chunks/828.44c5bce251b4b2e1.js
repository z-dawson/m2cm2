"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[828,38,124],{7038:function(t,e,i){i.r(e),i.d(e,{Loop:function(){return u},RandomMetro:function(){return o},Urn:function(){return n},getNumFilenames:function(){return d},msToS:function(){return c},randomFloat:function(){return l},randomInt:function(){return a},randomRange:function(){return r},sToMs:function(){return h}});let r=(t,e)=>(t=Math.ceil(t),Math.floor(Math.random()*((e=Math.floor(e))-t+1)+t)),n=class{next(){(this.discarded.length>this.waiting||0==this.possible.length)&&(this.possible=this.possible.concat(this.discarded.slice(0,this.reuse)),this.discarded.splice(0,this.reuse));let t=Math.floor(Math.random()*this.possible.length),e=this.possible[t];return this.possible.splice(t,1),this.discarded.push(e),e}constructor(t,e,i=1){this.waiting=e,this.reuse=i,this.possible=Array(t-1-0+1).fill(0).map((t,e)=>0+e),this.discarded=[]}},s=t=>1==t.length?[0,t[0]]:t,l=function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];let[r,n]=s(e);return Math.random()*(n-r)+r},a=function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];let[r,n]=s(e);return Math.floor(l(r,n))},o=class{start(t){let{callback:e}=t||{};e&&(this.callback=e);let{interval:i,clear:r}=this.callback(this)||{};this.callbackClear=r;let n="number"==typeof i?i:a(this.min,this.max);return this.count++,this.delay=setTimeout(this.start.bind(this),n),this}stop(){if(this){var t;return clearTimeout(this.delay),null===this||void 0===this||null===(t=this.callbackClear)||void 0===t||t.call(this),this.count=0,this}}setRange(t,e){Object.assign(this,{min:t,max:e})}constructor(t){this.callback=t,this.delay,this.count=0}},h=t=>1e3*t,c=t=>t/1e3,u=class{init(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.callback=t;let i={interval:h(1)};return Object.assign(this,i,e),this.count=0,this}start(t,e){let i=()=>{this.callbackClear=this.callback(this),this.count+=1};return this.active&&this.clear(),t&&this.init(t,e),i(),this.loopReference=setInterval(()=>{this.count>=this.times?this.clear():i()},this.interval),this.active=!0,this}clear(){var t;return this.count=0,clearInterval(this.loopReference),null===this||void 0===this||null===(t=this.callbackClear)||void 0===t||t.call(this),this.active=!1,this}stop(){return this.clear()}constructor(t,e){this.init(t,e),this.active=!1}},d=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"mp3";return Array.from(Array(t)).map((t,r)=>"".concat(r+e,".").concat(i))}},6124:function(t,e,i){i.r(e),i.d(e,{weightedRandom:function(){return n}});var r=i(7038);let n=t=>{let e;let i=[...t];for(e=1;e<i.length;e++)i[e]+=i[e-1];let r=Math.random()*i[i.length-1];for(e=0;e<i.length&&!(i[e]>r);e++);return e},s=t=>{let{restProbability:e,followedBy:i}=t;return"number"==typeof t||"string"==typeof t?{value:t,type:"value"}:{...t,type:["value","range"].find(e=>void 0!==t[e]),restProbability:e>1?e/100:e,followedBy:i?o(i):void 0}},l=t=>Object.entries(t).map(t=>{let[e,i]=t;return{...s(i),name:e}}),a=t=>t.map((t,e,i)=>{let{length:r}=i;return{name:e,probability:1/r,...s(t)}}),o=t=>(Array.isArray(t)?a:l)(t),h=t=>t.reduce((t,e,i)=>(t[e.name]={...e,index:i},t),{}),c=t=>t.map(t=>t.probability);e.default=class{initCounter(){let{repeat:t}=this.instructions[this.current];this.count=0,this.max=Array.isArray(t)?(0,r.randomInt)(...t):t||0,this.finished=!1}next(){var t;let e=(null===(t=this.instructions)||void 0===t?void 0:t[this.current])||{};if(e.repeat&&!this.finished)this.finished=this.max<=++this.count;else if(e.followedBy&&(e.repeat&&this.finished||!e.repeat)){let{value:i}=e.followedBy[n(c(e.followedBy))];this.current="number"==typeof i?i:this.byName[i].index,this.initCounter()}else this.current=n(this.probabilities),this.initCounter();let s=this.instructions[this.current],{type:l,restProbability:a}=s,o=a&&!n([a,1-a]),h=o?null:"range"==l?(0,r.randomInt)(...s[l]):"value"==l?s[l]:null;return h}constructor(t){this.instructions=o(t),this.probabilities=c(this.instructions),this.byName=h(this.instructions),this.count=this.max=0,this.finished=!1}}},1828:function(t,e,i){let r;i.r(e),i.d(e,{init:function(){return d},start:function(){return p},stop:function(){return b}});var n=i(2123),s=i(6124),l=i(7038),a=i(9634);let o=["travel5.mp3","travel4.mp3","travel3.mp3","travel2.mp3","travel1.mp3","waiting.mp3"],h=new Promise(t=>{r=new n.dQ({urls:o,onload:t,baseUrl:"".concat(a.O,"/audio/travel/")}).toDestination()}),c=new s.default([{range:[0,4],probability:1,name:"drone",followedBy:["text"]},{value:5,name:"text",probability:0,followedBy:["drone"]}]),u=new s.default([{range:[-5,3],probability:1,name:"drone",followedBy:["text"]},{range:[-3,2],name:"text",probability:0,followedBy:["drone"]}]),d=t=>{t.video.current.loop=!0},f=new l.RandomMetro(()=>{let t=c.next(),e=u.next();console.log(e);let i=r.player(t),n=i.buffer.duration;return console.log("playerduration "+n),i.start(),{interval:(0,l.sToMs)(Math.ceil(n)+e)}}),p=async t=>{await Promise.all([n.BL(),h]),n.J7.start(),f.start(),t.current.currentTime=0,t.current.play()},b=t=>{t.current&&(t.current.pause(),t.current.currentTime=0),f.stop(),n.J7.stop(),r.stopAll()}}}]);