(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405,38,369],{5557:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(7324)}])},7038:function(e,t,n){"use strict";n.r(t),n.d(t,{Loop:function(){return h},RandomMetro:function(){return l},Urn:function(){return r},getNumFilenames:function(){return d},msToS:function(){return u},randomFloat:function(){return s},randomInt:function(){return o},randomRange:function(){return i},sToMs:function(){return c}});let i=(e,t)=>(e=Math.ceil(e),Math.floor(Math.random()*((t=Math.floor(t))-e+1)+e)),r=class{next(){(this.discarded.length>this.waiting||0==this.possible.length)&&(this.possible=this.possible.concat(this.discarded.slice(0,this.reuse)),this.discarded.splice(0,this.reuse));let e=Math.floor(Math.random()*this.possible.length),t=this.possible[e];return this.possible.splice(e,1),this.discarded.push(t),t}constructor(e,t,n=1){this.waiting=t,this.reuse=n,this.possible=Array(e-1-0+1).fill(0).map((e,t)=>0+t),this.discarded=[]}},a=e=>1==e.length?[0,e[0]]:e,s=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];let[i,r]=a(t);return Math.random()*(r-i)+i},o=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];let[i,r]=a(t);return Math.floor(s(i,r))},l=class{start(e){let{callback:t}=e||{};t&&(this.callback=t);let{interval:n,clear:i}=this.callback(this)||{};this.callbackClear=i;let r="number"==typeof n?n:o(this.min,this.max);return this.count++,this.delay=setTimeout(this.start.bind(this),r),this}stop(){if(this){var e;return clearTimeout(this.delay),null===this||void 0===this||null===(e=this.callbackClear)||void 0===e||e.call(this),this.count=0,this}}setRange(e,t){Object.assign(this,{min:e,max:t})}constructor(e){this.callback=e,this.delay,this.count=0}},c=e=>1e3*e,u=e=>e/1e3,h=class{init(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.callback=e;let n={interval:c(1)};return Object.assign(this,n,t),this.count=0,this}start(e,t){let n=()=>{this.callbackClear=this.callback(this),this.count+=1};return this.active&&this.clear(),e&&this.init(e,t),n(),this.loopReference=setInterval(()=>{this.count>=this.times?this.clear():n()},this.interval),this.active=!0,this}clear(){var e;return this.count=0,clearInterval(this.loopReference),null===this||void 0===this||null===(e=this.callbackClear)||void 0===e||e.call(this),this.active=!1,this}stop(){return this.clear()}constructor(e,t){this.init(e,t),this.active=!1}},d=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"mp3";return Array.from(Array(e)).map((e,i)=>"".concat(i+t,".").concat(n))}},5369:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return o}});var i=n(2123),r=n(9634),a=n(7038);let s=(0,a.getNumFilenames)(20);class o{async load(){return this.players=await this.playersPromise,this.players.fadeOut=.02,this.players.fadeIn=.02,this.players.volume.value=-8,this}play(e){let t=(0,a.randomInt)(this.available.length),n=this.available[t];return this.indexMapping[e]=n,this.discarded.push(this.available.splice(t,1)[0]),this.players.player(n).start(),this.players.player(n).loop=!0,t}stop(e){let t=this.indexMapping[e];this.available.push(this.discarded.splice(this.discarded.indexOf(t),1)[0]),this.players.player(t).stop()}restart(e){let t=this.indexMapping[e];this.players.player(t).seek(0)}stopAll(){this.players.stopAll()}constructor(){this.players,this.playersPromise=new Promise(e=>{let t=new i.dQ({urls:s,onload:()=>{e(t)},baseUrl:"".concat(r.O,"/audio/experience/")}).toDestination()}),this.indexMapping={},this.available=Array.from(Array(20)).map((e,t)=>t),this.discarded=[]}}},9634:function(e,t,n){"use strict";n.d(t,{O:function(){return r}});var i=n(3454);let r=i.env.NEXT_PUBLIC_BASE_PATH||""},442:function(e,t,n){"use strict";n.d(t,{$:function(){return r},o:function(){return i}});let i=e=>new Promise(t=>{if(4===e.readyState)t();else{let n=()=>{t(),removeEventListener("loadeddata",n,!0)};e.addEventListener("loadeddata",n,!0)}}),r=e=>{if(0==e.length)return 0;let t=[...e].sort((e,t)=>e-t),n=-1;for(let i=0;i<t.length;++i)if(t[i]!=i){n=i;break}return -1==n&&(n=t[t.length-1]+1),n}},7324:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return B}});var i=n(5893),r=n(7038),a=n(6869),s=n.n(a),o=n(7294);let l=e=>[[1,1],[1,-1],[-1,-1],[-1,1]][e],c=e=>{let{running:t}=e,[n,a]=(0,o.useState)([]),c=(0,o.useRef)(0),u=(0,o.useRef)([0,0]),h=e=>l(c.current%4).map(t=>e*t+100*(t<0?.5:0));return(0,o.useEffect)(()=>{let e=new r.RandomMetro(()=>{a(t?Array(16).fill(0):[]);let e=(0,r.sToMs)(2.6),n=setTimeout(()=>a([]),e);return c.current=(0,r.randomInt)(4),u.current[0]=(0,r.randomInt)(100),{clear:()=>{clearTimeout(n),a([])},interval:e+(0,r.sToMs)((0,r.randomInt)(3,5))}}).start();return()=>{e.stop()}},[t]),(0,i.jsx)("div",{className:s().container,children:n.map((e,t,n)=>{let r=u.current[0]+50*t/n.length,[a,o]=h(r);return(0,i.jsx)("div",{style:{top:"".concat(a,"%"),left:"".concat(o,"%"),width:"calc(30% + 50px)",opacity:t/(n.length-1),animationName:"blink-animation",animationDuration:"".concat(n.length-t+10,"s"),animationDelay:"".concat(t/10,"s"),animationPlayState:"running",animationTimingFunction:"step-start"},className:s().box},t)})})};var u=n(442),h=n(5743),d=n(4969),m=n(8371),p=n(4660);n(9962);var f=n(5369),g=n(9634);let x=e=>{let{onAllClosed:t}=e,[n,a]=(0,o.useState)([]),[s,l]=(0,o.useState)(0),c=(0,o.useRef)(!1),x=(0,o.useRef)(),v=(0,o.useRef)(!0),y=(0,o.useRef)([]),b=(0,o.useRef)(),_=(0,o.useRef)([]);(0,o.useEffect)(()=>(x.current=new f.default,x.current.load().then(()=>{c.current=!0,w()}),()=>{x.current.stopAll()}),[]);let w=e=>{if(!c.current)return;let t="number"==typeof e?e:30;a(e=>{let n=(0,r.randomInt)(100)<t&&e.length<10,i=Array.from(Array(n?(0,r.randomInt)(2,6):1)).reduce(e=>{let t=(0,u.$)(e);return y.current[t]=x.current.play(t),_[t]=[(0,r.randomInt)(-10,40),(0,r.randomInt)(-10,40)],[...e,t]},[...e]);return l(i.length-1),v.current=!1,i})},j=e=>i=>{i.stopPropagation(),c.current&&(x.current.stop(n[e]),a(n=>{let i=[...n];return i.splice(e,1),l(t=>e<t||t===i.length?t-1:t),(0,r.randomInt)(100)<(v.current?80:30)?b.current=setTimeout(()=>{w(100)},(0,r.sToMs)(.5)):0==i.length&&(clearTimeout(b.current),t()),v.current=!1,i}))};return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)(p.mQ,{style:{width:"100%",height:"100%",userSelect:"none"},selectedIndex:s,onSelect:e=>{l(e)},children:[(0,i.jsxs)(p.td,{children:[n.map((e,t)=>(0,i.jsxs)(p.OK,{onClick:()=>{x.current.restart(e)},children:["Tab ",e+1," ",(0,i.jsx)(h.Z,{onClick:j(t)})]},e)),n.length<20&&(0,i.jsx)(m.ZP,{icon:(0,i.jsx)(d.Z,{}),type:"text",onClick:w})]}),n.map(e=>{let t=y.current[e];return console.log({scoreIndex:t,tabToAudioMapping:y.current}),(0,i.jsx)(p.x4,{style:{height:"90vh",padding:"1rem"},children:(0,i.jsx)("img",{src:"".concat(g.O,"/scores/single_note/").concat(t+1,".svg"),alt:"score",style:{marginLeft:"".concat(_[e][0],"vw"),marginTop:"".concat(_[e][1],"vh")}})},e)})]})})};var v=n(1343);let y=["listen to the music as you relax in your environment.","listen to the music as you attend other activities.","listen to the music as you get distracted. ","to listen to the music, click through to enter.","listen to the music while you daydream.","listen to the music as you full asleep.","listen to the music actively and attentively.","to listen to the music, click through to enter.","listen to the music passively and inattentively.","listen to the music as you compose music.","listen to the music as you think about this text.","to listen to the music, click through to enter.","listen to the music as you consider what a website is.","listen to the music and forget about everything.","listen to the music and remember who you are.","to listen to the music, click through to enter.","listen to the music and be aware of your surroundings.","listen to the music and get lost on the journey. ","listen to the music as you forget who you are. ","to listen to the music, click through to enter.","listen to the music as you lose sense of your surroundings. "].map(e=>e.split(" ")),b={position:"fixed",top:0,left:0,right:0,bottom:0,width:"100vw",height:"100vh",backgroundColor:"white",zIndex:100,display:"flex",justifyContent:"center",alignItems:"center",fontSize:"2rem",cursor:"pointer"},_=e=>{let{onClick:t}=e,[n,a]=(0,o.useState)(""),s=(0,o.useRef)((0,r.randomInt)(y.length)),l=(0,o.useRef)(-1),c=(0,o.useCallback)(async()=>{let e=y[s.current];l.current>=e.length&&(l.current=-1,s.current=(0,r.randomInt)(y.length)),a(e.slice(0,l.current+1).join(" ")),await (0,v.ZP)(l.current<0?1e3:200*e[l.current].length),l.current++,c()},[]);return(0,o.useEffect)(()=>{s.current=(0,r.randomInt)(y.length),c()},[]),(0,i.jsx)("div",{onClick:t,style:b,children:(0,i.jsx)("div",{style:{width:"100%",maxWidth:1200,overflow:"hidden",justifyContent:"center",display:"flex",padding:"0 10px"},children:n})})};var w=n(221),j=n.n(w);let k=e=>{let{children:t}=e;return(0,i.jsx)("div",{className:j().backdrop,children:(0,i.jsx)("div",{className:j().popup,children:t})})};var T=[[2,.918104,.232438,.622396,.691917,.273917,.069646,.089708,.431771,1.1465,.25925,.338313,.330729,4.845313,.61746,.212948,.356054,.199773,.13737,.467642,.529524,.806871,.20517,.257302,.294785,.793741,1.221338,.179705,.612449,.286281,.669796,.223243,.188322,.288231,.520884,.149093,.096939,.613197,4.80195,.234626,.118798,.375714,.669819,.216553,.198027,.23127,.726531,.274354,.164195,2.12381,.182608,.226304,.186213,.203946,1.296054,.344036,.167506,.185102,2.125238,.13907,.368549,.915351,.185782,.850159,.24127,.656576,.829478,.433878,.245624,.16771,.767574,.152426,.370023,.833741,.387029,.417982,.63254,.277438,.240816,.728186,5.257755,.281746,.36161,.937347,.225533,.676916,.191134,.495397,.504308,.604603,3.630771,.098413,.642812,.773583,.285669,1.004444,.129161,.738798,.172834,.55093,.02542,2.3,.29839,.70712,.312857,.113878,.527619,.124807,.066145,1.066463,.193946,.322472,.77415,1.768571,.160952,.724127,.30059,.414422,.15356,.925011,.2,.166259,.291655,1.017732,.125374,1.534376,.353129,.465102,.220839,.846349,.19805,.296757,2.621383,.620794,.971361,.374989,.11771,.414059,.284943,.102041,.359909,.596349,.617188,.561361,2.707914],[2,.509342,.879093,.201655,.671451,.747075,.516531,.21458,.177596,.676576,.119796,.251043,.757891,.192698,.140544,.400091,.131134,3.166689,1.139569,.68805,.179138,.14585,.874331,.438163,.163424,.087687,.692562,1.624014,.161474,.291655,.270794,.144104,.710113,.219796,.280227,.249977,.133855,.544785,1.446372,.229184,.176054,.754172,.414853,.159841,1.524172,.342154,.149501,.229161,.502789,.466576,4.567052,.140091,.678934,1.077256,.1922,.581066,.299093,.100385,.099796,.49932,.468707,1.080748,.24585,.347982,.567098,.10585,.372018,.33517,.203673,3.600113,.301406,.347415,.206848,.133265,.625011,.645805,1.044286,.229637,.094807,.393243,1.996848,.90263,.218231,.157279,.897234,.218413,.145488,.694444,.306213,.173197,.326327,.270816,.13127,.711701,2.858594,.984875,.196372,.29576,.356281,.393764,.897914,.209751,.652585,.283469,.817687,.555782,.247347,.365102,3.736349,.42424,1.111701,.929206,.737506,.241633,.573946,2.946893],[2.270313,.183979,.864313,.194979,.164646,.262125,.396438,.275125,.747333,.166813,.996458,.133958,.721708,.238292,.461417,.632542,3.368396,.168979,.678021,.262042,.736604,.693188,.171146,.847,.257792,2.106896,1.207375,.303271,.684521,1.054917,.091042,.292438,.225313,.153813,.140813,1.914688,1.090313,.59175,.55225,.108104,.135146,.612542,2.873438,.459417,1.25925,.25,.463438,.180167,.180188,.522458,.306271,.27025,.5585,.504438,.288271,.108104,2.618125,.687688,.279271,.450396,.180167,.162167,.490417,.167146,.882771,.180188,.594521,.477417,2.432083,.612542,.108104,.585521,.189167,.198188,.540479,.216208,3.576042,.666583,.162167,.180167,.504438,.226646,.78225,1.255],[2,.333333,.224989,.117188,.204535,.369932,.62619,3.623787,.229161,.202063,.193787,.703107,1.276054,.509365,.407302,3.479184,.274989,.200431,.161451,1.176689,.629138,.226531,.484921,.574989,2.741111,.363061,.249864,.245465,.363197,.48102,3.327098,.229184,.270839,.577052,.251565,.183855,.430726,2.049456],[2,.777098,.78254,.190363,.198957,.638526,.193855,1.101542,4.150431,.282721,.447438,.130295,.15254,.495283,.312517,.27576,.286735,.799478,.119796,1.640612,.161497,1.0078,.20415,.462472,.208345,.125057,2.333333,.336463,.242177,.163537,.457302,.241882,.612789,.162404,.679297,.445782,.226576,1.96771,.193265,.221361,.367483,.135714,.797098,.19966,.225215,.57424,.89585,.833356,.276259,.251406,.639388,2.38551,.171882,.634671,.682494,.247211,.301723,.95102,.307166,.244898,.206621,.970499,.171247,.274558,.121338,.838662,3.364966,.215873,1.126508,.178413,.276077,.18678,.319977,.585941,.203197,.261383,.354807,.291043,.235488,.55619,.228209,.730113,.146122,.27356,.800091,.224853,.137415,.522041,4.663039,.229819,.597256,.16771,.643243,.247937,.471905,.708322,.218889,.100454,.808594,.247732,1.071633,.36517,.809841,.655737,3.638526],[2,.819093,.228277,.880204,.208481,.742562,.242721,.909887,.177098,.319478,.17619,.71263,.594263,.222177,.236644,.634376,3.932812,.256803,.458844,.167732,.160249,.684535,2.239524,.201587,.344965,.360204,.179206,.174172,.589365,4.172925,.160385,1.28424,.18483,.697574,.15966,1.361179,.239569,.600476,1.920363,.154694,1.189592,.186939,.19898,.658957,.55873,.145873,1.520771,.309773,.093878,4.346372,1.009546,.485238,.450499,.172925,.344263,1.531247,.307506,.270839,.564762,.158889,.337982,.306304,.210045,.829025,.208299,.505964,.446168,.500091,.115374,.40839,.294785,.562494,.979161,1.148639,.136236,.466916,.075306,.901474,4.250567,.330726,.679637,.70941,.382608,.120136,.420703,.10678,.141678,.842653,3.296893],[2,.366122,.16805,2.456961,.209796,.213107,3.577075,.283855,.191678,.496871,.748957,1.341134],[2,.168231,.665624,.720839,.552063,.1622,.605533,3.096871,.864036,.406803,.2,1.029161,1.000023,1.00932,.990658,.7422,1.278617,.979206,.624921,.220385,.609342,4.045329,.13805,.736916,.197392,.108367,.393175,.092744,.475011,.448934,.54322,.437506,.663537,.17034,1.302426,.120023,.222313,3.950023,.624966,.354172,.634512,.677937,.179705,.278639,.423401,.1,.449501,.509773,.132404,2.415624,.104172,2.131769,.608322,.875034,.198435,.83,.603855,.673946,3.205193,.151633,.732948,.603923,.535488,.228005,.706213,.246395,.601134,.649864,.186463,.518254,.765624,.233039,.762766,.507823,.156848,.57381,.203152,.610431,1.486077]],A=n(2730),C=n(3256),I=n.n(C),R=n(9972);let E=()=>{let e=[{dictionaries:[R.Dv,[...R.O9,...R.yd]],separator:"_",length:2},{dictionaries:[R.O9,R.yd,[92,99,11,53,45,2323,7777,"__","/////"].map(e=>e.toString())],separator:"",style:"capital"}];return(0,R._8)(e[(0,r.randomInt)(e.length)])},M=new r.Urn(T.length,T.length-1),N=["music to compose music to is a digital manifestation of real world environments. Music is one form of many cultural artefacts that has been copied, duplicated, and shared through multiple peer-to-peer networks in the digital age. There are more copies than there are originals on the internet. But what is an original? Who is the author? The mass circulation of information and cultural exchange, such as the virality of image files, has become central to our online worlds. Real world environments are recreated in 3D rendered video format. The spaces replicate our imagination of spaces in the real world. All material on the internet is a manifestation of our offline world. The internet has created an environment for the mass distribution of music. More music is distributed than ever before. Aesthetic experience reached a point where the image determines consumer decision making.","Our experience of cultural artefacts exists via a capture of that experience in the form of documentation. Documentation exists as a digitised copy of the original work. But where does the original work end and the copy begin? What is uploaded onto the platform? Where is the music coming from? The virtual manifestation of spaces and the in real life manifestation of those spaces is said to be merging. I exist as a computer generated manifestation of a real person. Interaction with the offline world is understood more and more through the online world. Projections of our real world experience is captured and disseminated online to unknown others. Shared experiences influences engagement and behaviour IRL.","The composition of the World Wide Web influenced the formalisation of music to compose music to. The internet and digital technologies are structured by categorisation. Categorisation brings inherent functionality to the form of a website. Functionality directs users to a central message. User interactivity is measured by the direct and clear message portrayed through a website. Attention is gained through a balance of familiarity and unique selling points. Creating a space on the internet is fundamental. Everything on the internet is marketable and financialised.","Where are we in our virtual environment? What is the material differentiation between media formats? How are you experiencing music to compose music to? Where is my voice coming from? For how long will you stay here?","Aesthetic experience is the foundation of contemporary living. The screen is a window through which we experience the world. The mediascape is flattened by the screen. All forms of media are mutable and intersect into one another. When an image is circulated it can become entirely extracted from its original context. The aesthetic spaces you are experiencing here have been manipulated to serve a particular purpose. An explanation of how the media content you are viewing has been processed and programmed is more significant than the content itself. All content on music to compose music to is extracted and reappropriated from completely unrelated contexts.","Material is extracted from material and manipulated to form new material removed from its original context. What becomes of the original context? At what point is the context lost? The transformation of material is recontextualised though visual content. The transformation of that visual content is recontextualised through the screen. Extraction takes place in many forms. I am generated in written form and extracted as spoken text using a text-to-speech converter, manipulated to serve a particular context. All material objects serve the purpose of a particular goal.","Where am I? Where are you? How has your experience been?","The internet enabled access to infinite content. Content, such as music, videos, images, books, personal information, secrets, exists in multiple locations. The original and the copy of many files across many formats are indistinguishable on the internet. music to compose music to may become an altered version of itself. A derivative. Elements documented and distributed across various platforms. The original content featured on music to compose music to itself derives from material existing in digital and physical locations."].map(e=>e.split(/[\s-]/)),P=e=>{let{reading:t,soundEngine:n}=e,{chat:a,setChat:s}=(0,o.useContext)(A.EnteredContext),l=(0,o.useRef)(M.next()),c=(0,o.useRef)(0),u=(0,o.useRef)(),h=(0,o.useRef)([,,,,,].fill("")),d=(0,o.useCallback)(()=>{s(e=>{let t=[...e,[]].filter((e,t,n)=>{let{length:i}=n;return t>i-5});return t}),l.current=M.next(),c.current=0},[s]),m=(0,o.useCallback)(()=>{let e=T[l.current][c.current],t=N[l.current],n=t.length-1<=c.current;u.current=setTimeout(()=>{s(e=>{let i=[...e];return i[i.length-1].push(t[c.current]),n?d():c.current+=1,h.current=h.current.map(E),n?(0,v.ZP)((0,r.sToMs)((0,r.randomInt)(10,45))).then(p):m(),i})},(0,r.sToMs)(e))},[n]),p=(0,o.useCallback)(()=>{console.log("start Reading"),(async()=>{var e;await (null==n?void 0:null===(e=n.start)||void 0===e?void 0:e.call(n,l.current)),m()})()},[n]);return(0,o.useEffect)(()=>()=>{var e;clearTimeout(u.current),console.log("stop Reading"),null==n||null===(e=n.stop)||void 0===e||e.call(n)},[n]),(0,o.useEffect)(()=>(h.current=h.current.map(E),()=>{s(e=>{let t=[...e];return t[t.length-1]=structuredClone(N[l.current]),t}),d()}),[]),(0,o.useEffect)(()=>{if(t&&n&&p(),!t&&n){var e;clearTimeout(u.current),null==n||null===(e=n.stop)||void 0===e||e.call(n)}},[t,n]),(0,i.jsx)("div",{className:I().container,children:(0,i.jsx)("div",{className:I().expandingContainer,children:a.map((e,t)=>(0,i.jsxs)("p",{className:I().paragraph,children:[a[t].length?(0,i.jsxs)("strong",{className:I().username,children:[h.current[t%h.current.length],":"," "]}):(0,i.jsx)("em",{className:"delay",children:"typing..."}),(0,i.jsx)("br",{}),e.map((e,t)=>(0,i.jsxs)(o.Fragment,{children:[(0,i.jsx)("span",{children:e})," "]},t))]},t))})})};var W=[{name:"apartment"},{name:"sleep"},{name:"lobby"},{name:"concert"},{name:"nowhere"},{name:"vacation"},{name:"travel"},{name:"workspace"}],O=n(3915),S=n.n(O),H=n(9008),F=n.n(H),L=n(1664),D=n.n(L),U=n(1163),B=function(){let[e,t]=(0,o.useState)(),{entered:a,setEntered:s}=(0,o.useContext)(A.EnteredContext),l=(0,U.useRouter)(),u=(0,o.useRef)(),[h,d]=(0,o.useState)(!1),m=(0,o.useRef)();(0,o.useEffect)(()=>{(async()=>{let e=await n.e(139).then(n.bind(n,611));t(e)})()},[e]),(0,o.useEffect)(()=>{W.forEach(e=>{let{name:t}=e;l.prefetch("/".concat(t))})},[l]);let p=()=>{clearTimeout(m.current),l.push("/".concat(u.current))},f=t=>{var n;u.current=t,null==e||null===(n=e.stop)||void 0===n||n.call(e),30>(0,r.randomInt)(100)?(d(!0),m.current=setTimeout(()=>p(u.current),(0,r.sToMs)(120))):p()};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(F(),{children:[(0,i.jsx)("title",{children:"music to compose music to"}),(0,i.jsx)("meta",{name:"description",content:"music to compose music to"}),(0,i.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"})]}),!a&&(0,i.jsx)(_,{onClick:()=>{s(!0)}}),h&&(0,i.jsx)(k,{children:(0,i.jsx)(x,{onAllClosed:p})}),(0,i.jsxs)("div",{className:S().container,children:[(0,i.jsx)("nav",{className:S().nav,children:(0,i.jsx)("ul",{children:W.map((e,t)=>e.file?(0,i.jsx)("li",{children:(0,i.jsx)(D(),{href:e.name,children:(0,i.jsx)("div",{children:e.name})})},t):(0,i.jsx)("li",{children:(0,i.jsx)("a",{onClick:()=>f(e.name),children:(0,i.jsx)("div",{children:e.name})})},t))})}),(0,i.jsx)("main",{className:S().main,children:(0,i.jsx)("div",{className:S().bottomLayer,children:(0,i.jsx)("div",{className:S().animation,children:(0,i.jsx)(c,{running:a})})})}),(0,i.jsx)("aside",{className:S().aside,children:(0,i.jsx)(P,{reading:a&&!h,soundEngine:e})})]})]})}},6869:function(e){e.exports={container:"Animation_container__GLDWx",box:"Animation_box__r5Pbg"}},3915:function(e){e.exports={container:"Home_container__Ennsq",nav:"Home_nav__UxFnO",main:"Home_main__EtNt2",layer2:"Home_layer2__UbhXX",layer1:"Home_layer1__rXPmk",animation:"Home_animation__bZp8l",mountain:"Home_mountain__wP20V",subtitle:"Home_subtitle__xVO9d",aside:"Home_aside__BBKI_"}},221:function(e){e.exports={popup:"Popup_popup__W0kWh",backdrop:"Popup_backdrop__msH2h",skipAd:"Popup_skipAd__SALuG"}},3256:function(e){e.exports={expandingContainer:"Text_expandingContainer__Oq_0w",container:"Text_container__uugPw",paragraph:"Text_paragraph__JItl5",username:"Text_username__gcc8x"}}},function(e){e.O(0,[123,13,774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);