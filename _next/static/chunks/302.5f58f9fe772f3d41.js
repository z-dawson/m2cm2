"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[302,38,124],{7038:function(t,e,i){i.r(e),i.d(e,{Loop:function(){return c},RandomMetro:function(){return o},Urn:function(){return n},getNumFilenames:function(){return d},msToS:function(){return h},randomFloat:function(){return a},randomInt:function(){return l},randomRange:function(){return r},sToMs:function(){return u}});let r=(t,e)=>(t=Math.ceil(t),Math.floor(Math.random()*((e=Math.floor(e))-t+1)+t)),n=class{next(){(this.discarded.length>this.waiting||0==this.possible.length)&&(this.possible=this.possible.concat(this.discarded.slice(0,this.reuse)),this.discarded.splice(0,this.reuse));let t=Math.floor(Math.random()*this.possible.length),e=this.possible[t];return this.possible.splice(t,1),this.discarded.push(e),e}constructor(t,e,i=1){this.waiting=e,this.reuse=i,this.possible=Array(t-1-0+1).fill(0).map((t,e)=>0+e),this.discarded=[]}},s=t=>1==t.length?[0,t[0]]:t,a=function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];let[r,n]=s(e);return Math.random()*(n-r)+r},l=function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];let[r,n]=s(e);return Math.floor(a(r,n))},o=class{start(t){let{callback:e}=t||{};e&&(this.callback=e);let{interval:i,clear:r}=this.callback(this)||{};this.callbackClear=r;let n="number"==typeof i?i:l(this.min,this.max);return this.count++,this.delay=setTimeout(this.start.bind(this),n),this}stop(){if(this){var t;return clearTimeout(this.delay),null===this||void 0===this||null===(t=this.callbackClear)||void 0===t||t.call(this),this.count=0,this}}setRange(t,e){Object.assign(this,{min:t,max:e})}constructor(t){this.callback=t,this.delay,this.count=0}},u=t=>1e3*t,h=t=>t/1e3,c=class{init(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.callback=t;let i={interval:u(1)};return Object.assign(this,i,e),this.count=0,this}start(t,e){let i=()=>{this.callbackClear=this.callback(this),this.count+=1};return this.active&&this.clear(),t&&this.init(t,e),i(),this.loopReference=setInterval(()=>{this.count>=this.times?this.clear():i()},this.interval),this.active=!0,this}clear(){var t;return this.count=0,clearInterval(this.loopReference),null===this||void 0===this||null===(t=this.callbackClear)||void 0===t||t.call(this),this.active=!1,this}stop(){return this.clear()}constructor(t,e){this.init(t,e),this.active=!1}},d=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"mp3";return Array.from(Array(t)).map((t,r)=>"".concat(r+e,".").concat(i))}},1302:function(t,e,i){let r,n;i.r(e),i.d(e,{init:function(){return c},start:function(){return g},stop:function(){return w}});var s=i(2123),a=i(6124),l=i(7038),o=i(9634);let u=["empty.mp3",...(0,l.getNumFilenames)(56)],h=new Promise(t=>{r=new s.dQ({urls:u,onload:t,baseUrl:"".concat(o.O,"/audio/Sleep/")}).toDestination()});r.fadeOut=.02,r.fadeIn=.02;let c=t=>{(n=t.video).current.loop=!0},d=new a.default([{value:1,probability:.5,name:"normalShuffle"},{value:2,probability:.25,repeat:[3,15],name:"glitchedShuffle"},{value:null,probability:.25,name:"rest"}]),f=new a.default([{range:[1,56]}]),p=new a.default([{range:[80,190]}]),b=new a.default([{range:[1.5,4.5]}]),m=1,y=new l.RandomMetro(()=>{let t;r.player(0).volume.value=-13;let e=d.next(),i=(0,l.msToS)(p.next());r.player(m).stop(),m=f.next();let a=r.player(m);a.start(s.zO());let o=a.buffer.duration;switch(console.log({shuffleState:e}),e){case null:t=o+b.next();break;case 1:t=o;break;case 2:n.current.currentTime=1,t=i,console.log("glitch")}return{interval:(0,l.sToMs)(t)}}),v=new s.rN(t=>{r.player(0).start(t),v.interval=120,r.player(0).stop(t+r.player(0).buffer.duration)}),g=async t=>{await Promise.all([s.BL(),h]),s.J7.start(),y.start(),v.start(60),t.current.currentTime=0,t.current.play()},w=t=>{t.current&&(t.current.pause(),t.current.currentTime=0),y.stop(),v.stop(),r.player(m).stop(),r.player(0).stop(),s.J7.stop()}},6124:function(t,e,i){i.r(e),i.d(e,{weightedRandom:function(){return n}});var r=i(7038);let n=t=>{let e;let i=[...t];for(e=1;e<i.length;e++)i[e]+=i[e-1];let r=Math.random()*i[i.length-1];for(e=0;e<i.length&&!(i[e]>r);e++);return e},s=t=>{let{restProbability:e,followedBy:i}=t;return"number"==typeof t||"string"==typeof t?{value:t,type:"value"}:{...t,type:["value","range"].find(e=>void 0!==t[e]),restProbability:e>1?e/100:e,followedBy:i?o(i):void 0}},a=t=>Object.entries(t).map(t=>{let[e,i]=t;return{...s(i),name:e}}),l=t=>t.map((t,e,i)=>{let{length:r}=i;return{name:e,probability:1/r,...s(t)}}),o=t=>(Array.isArray(t)?l:a)(t),u=t=>t.reduce((t,e,i)=>(t[e.name]={...e,index:i},t),{}),h=t=>t.map(t=>t.probability);e.default=class{initCounter(){let{repeat:t}=this.instructions[this.current];this.count=0,this.max=Array.isArray(t)?(0,r.randomInt)(...t):t||0,this.finished=!1}next(){var t;let e=(null===(t=this.instructions)||void 0===t?void 0:t[this.current])||{};if(e.repeat&&!this.finished)this.finished=this.max<=++this.count;else if(e.followedBy&&(e.repeat&&this.finished||!e.repeat)){let{value:i}=e.followedBy[n(h(e.followedBy))];this.current="number"==typeof i?i:this.byName[i].index,this.initCounter()}else this.current=n(this.probabilities),this.initCounter();let s=this.instructions[this.current],{type:a,restProbability:l}=s,o=l&&!n([l,1-l]),u=o?null:"range"==a?(0,r.randomInt)(...s[a]):"value"==a?s[a]:null;return u}constructor(t){this.instructions=o(t),this.probabilities=h(this.instructions),this.byName=u(this.instructions),this.count=this.max=0,this.finished=!1}}}}]);