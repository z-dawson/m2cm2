"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[715,38,124],{7038:function(t,e,i){i.r(e),i.d(e,{Loop:function(){return u},RandomMetro:function(){return a},Urn:function(){return n},getNumFilenames:function(){return d},msToS:function(){return h},randomFloat:function(){return o},randomInt:function(){return l},randomRange:function(){return r},sToMs:function(){return c}});let r=(t,e)=>(t=Math.ceil(t),Math.floor(Math.random()*((e=Math.floor(e))-t+1)+t)),n=class{next(){(this.discarded.length>this.waiting||0==this.possible.length)&&(this.possible=this.possible.concat(this.discarded.slice(0,this.reuse)),this.discarded.splice(0,this.reuse));let t=Math.floor(Math.random()*this.possible.length),e=this.possible[t];return this.possible.splice(t,1),this.discarded.push(e),e}constructor(t,e,i=1){this.waiting=e,this.reuse=i,this.possible=Array(t-1-0+1).fill(0).map((t,e)=>0+e),this.discarded=[]}},s=t=>1==t.length?[0,t[0]]:t,o=function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];let[r,n]=s(e);return Math.random()*(n-r)+r},l=function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];let[r,n]=s(e);return Math.floor(o(r,n))},a=class{start(t){let{callback:e}=t||{};e&&(this.callback=e);let{interval:i,clear:r}=this.callback(this)||{};this.callbackClear=r;let n="number"==typeof i?i:l(this.min,this.max);return this.count++,this.delay=setTimeout(this.start.bind(this),n),this}stop(){if(this){var t;return clearTimeout(this.delay),null===this||void 0===this||null===(t=this.callbackClear)||void 0===t||t.call(this),this.count=0,this}}setRange(t,e){Object.assign(this,{min:t,max:e})}constructor(t){this.callback=t,this.delay,this.count=0}},c=t=>1e3*t,h=t=>t/1e3,u=class{init(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.callback=t;let i={interval:c(1)};return Object.assign(this,i,e),this.count=0,this}start(t,e){let i=()=>{this.callbackClear=this.callback(this),this.count+=1};return this.active&&this.clear(),t&&this.init(t,e),i(),this.loopReference=setInterval(()=>{this.count>=this.times?this.clear():i()},this.interval),this.active=!0,this}clear(){var t;return this.count=0,clearInterval(this.loopReference),null===this||void 0===this||null===(t=this.callbackClear)||void 0===t||t.call(this),this.active=!1,this}stop(){return this.clear()}constructor(t,e){this.init(t,e),this.active=!1}},d=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"mp3";return Array.from(Array(t)).map((t,r)=>"".concat(r+e,".").concat(i))}},8715:function(t,e,i){let r,n,s;i.r(e),i.d(e,{init:function(){return v},start:function(){return y},stop:function(){return w}});var o=i(2123),l=i(9634),a=i(7038),c=i(6124);let h=(0,a.getNumFilenames)(124),u=new c.default([80,100,120,132]),d=new Promise(t=>{r=new o.J5({url:"/audio/lobby/recurring.mp3",onload:t}).toDestination()}),f=new a.RandomMetro(t=>{let{count:e}=t;return 0!==e&&(r.start(),console.log("recurring...")),{interval:(0,a.sToMs)(u.next())}}),p=new Promise(t=>{n=new o.dQ({urls:h,onload:t,baseUrl:"".concat(l.O,"/audio/lobby/")}).toDestination()}),b=new a.Urn(h.length,h.length-1),m=[],v=t=>{(s=t.video).current.loop=!0,Object.assign(s.current.style,{objectPosition:"70% 100%"}),s.current.addEventListener("seeked",()=>{var t;(null==s?void 0:null===(t=s.current)||void 0===t?void 0:t.paused)||g()})},y=async()=>{await Promise.all([o.BL(),p,d]),r.volume.value=-13,o.J7.start(),s.current.currentTime=0,s.current.play(),f.start()},g=()=>{m=[b.next(),b.next()],console.log("schedule player ".concat(m[0]," for door opening")),n.player(m[0]).start(o.zO()+.9),console.log("schedule player ".concat(m[1]," for door opening")),n.player(m[1]).start(o.zO()+4.2)},w=t=>{t.current&&(t.current.pause(),t.current.currentTime=0),m.forEach(t=>{n.player(t).stop()}),f.stop(),r.stop(),o.J7.stop()}},6124:function(t,e,i){i.r(e),i.d(e,{weightedRandom:function(){return n}});var r=i(7038);let n=t=>{let e;let i=[...t];for(e=1;e<i.length;e++)i[e]+=i[e-1];let r=Math.random()*i[i.length-1];for(e=0;e<i.length&&!(i[e]>r);e++);return e},s=t=>{let{restProbability:e,followedBy:i}=t;return"number"==typeof t||"string"==typeof t?{value:t,type:"value"}:{...t,type:["value","range"].find(e=>void 0!==t[e]),restProbability:e>1?e/100:e,followedBy:i?a(i):void 0}},o=t=>Object.entries(t).map(t=>{let[e,i]=t;return{...s(i),name:e}}),l=t=>t.map((t,e,i)=>{let{length:r}=i;return{name:e,probability:1/r,...s(t)}}),a=t=>(Array.isArray(t)?l:o)(t),c=t=>t.reduce((t,e,i)=>(t[e.name]={...e,index:i},t),{}),h=t=>t.map(t=>t.probability);e.default=class{initCounter(){let{repeat:t}=this.instructions[this.current];this.count=0,this.max=Array.isArray(t)?(0,r.randomInt)(...t):t||0,this.finished=!1}next(){var t;let e=(null===(t=this.instructions)||void 0===t?void 0:t[this.current])||{};if(e.repeat&&!this.finished)this.finished=this.max<=++this.count;else if(e.followedBy&&(e.repeat&&this.finished||!e.repeat)){let{value:i}=e.followedBy[n(h(e.followedBy))];this.current="number"==typeof i?i:this.byName[i].index,this.initCounter()}else this.current=n(this.probabilities),this.initCounter();let s=this.instructions[this.current],{type:o,restProbability:l}=s,a=l&&!n([l,1-l]),c=a?null:"range"==o?(0,r.randomInt)(...s[o]):"value"==o?s[o]:null;return c}constructor(t){this.instructions=a(t),this.probabilities=h(this.instructions),this.byName=c(this.instructions),this.count=this.max=0,this.finished=!1}}}}]);