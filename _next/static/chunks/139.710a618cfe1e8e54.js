"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[139,611],{611:function(e,t,r){let n,o;r.r(t),r.d(t,{start:function(){return m},stop:function(){return d}});var a=r(2123),l=r(9634),i=r(1343),u=r(7038);let s=Array(8).fill(0).map((e,t)=>"Statement".concat(t+1,".mp3")),c=new Promise((e,t)=>{n=new a.dQ({urls:s,onload:()=>e(),baseUrl:"".concat(l.O,"/audio/index/")}).toDestination()}),m=async e=>{await Promise.all([a.BL(),c]),n.volume.value=-13,o=e,n.player(o).start(a.zO())},d=async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o;n.loaded&&(n.volume.rampTo(-80,l.c),await (0,i.ZP)((0,u.sToMs)(l.c)),n.player(e).stop())}},1343:function(e,t,r){let n=()=>{let e=Error("Delay aborted");return e.name="AbortError",e},o=new WeakMap,a=function({clearTimeout:e,setTimeout:t}={}){return(r,{value:a,signal:l}={})=>{let i,u,s;if(l?.aborted)return Promise.reject(n());let c=e??clearTimeout,m=()=>{c(i),s(n())},d=()=>{l&&l.removeEventListener("abort",m)},p=new Promise((e,n)=>{u=()=>{d(),e(a)},s=n,i=(t??setTimeout)(u,r)});return l&&l.addEventListener("abort",m,{once:!0}),o.set(p,()=>{c(i),i=null,u()}),p}}();t.ZP=a}}]);