(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405,369],{5557:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(7324)}])},5369:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return s}});var r=n(2123),i=n(9634),a=n(7038);let o=(0,a.getNumFilenames)(20);class s{async load(){return this.players=await this.playersPromise,this.players.fadeOut=.02,this.players.fadeIn=.02,this.players.volume.value=-8,this}play(e){let t=(0,a.randomInt)(this.available.length),n=this.available[t];return this.indexMapping[e]=n,this.discarded.push(this.available.splice(t,1)[0]),this.players.player(n).start(),this.players.player(n).loop=!0,n}stop(e){let t=this.indexMapping[e];this.available.push(this.discarded.splice(this.discarded.indexOf(t),1)[0]),this.players.player(t).stop()}restart(e){let t=this.indexMapping[e];this.players.player(t).seek(0)}stopAll(){this.players.stopAll()}constructor(){this.players,this.playersPromise=new Promise(e=>{let t=new r.dQ({urls:o,onload:()=>{e(t)},baseUrl:"".concat(i.O,"/audio/experience/")}).toDestination()}),this.indexMapping={},this.available=Array.from(Array(20)).map((e,t)=>t),this.discarded=[]}}},9634:function(e,t,n){"use strict";n.d(t,{O:function(){return i},c:function(){return a}});var r=n(3454);let i=r.env.NEXT_PUBLIC_BASE_PATH||"",a=1},442:function(e,t,n){"use strict";n.d(t,{$:function(){return i},o:function(){return r}});let r=e=>new Promise(t=>{if(4===e.readyState)t();else{let n=()=>{t(),removeEventListener("loadeddata",n,!0)};e.addEventListener("loadeddata",n,!0)}}),i=e=>{if(0==e.length)return 0;let t=[...e].sort((e,t)=>e-t),n=-1;for(let r=0;r<t.length;++r)if(t[r]!=r){n=r;break}return -1==n&&(n=t[t.length-1]+1),n}},7324:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return U}});var r=n(5893),i=n(7038),a=n(6869),o=n.n(a),s=n(7294);let l=e=>[[1,1],[1,-1],[-1,-1],[-1,1]][e],c=e=>{let{running:t}=e,[n,a]=(0,s.useState)([]),c=(0,s.useRef)(0),u=(0,s.useRef)([0,0]),h=e=>l(c.current%4).map(t=>e*t+100*(t<0?.5:0));return(0,s.useEffect)(()=>{let e=new i.RandomMetro(()=>{a(t?Array(16).fill(0):[]);let e=(0,i.sToMs)(2.6),n=setTimeout(()=>a([]),e);return c.current=(0,i.randomInt)(4),u.current[0]=(0,i.randomInt)(100),{clear:()=>{clearTimeout(n),a([])},interval:e+(0,i.sToMs)((0,i.randomInt)(3,5))}}).start();return()=>{e.stop()}},[t]),(0,r.jsx)("div",{className:o().container,children:n.map((e,t,n)=>{let i=u.current[0]+50*t/n.length,[a,s]=h(i);return(0,r.jsx)("div",{style:{top:"".concat(a,"%"),left:"".concat(s,"%"),width:"calc(30% + 50px)",opacity:t/(n.length-1),animationName:"blink-animation",animationDuration:"".concat(n.length-t+10,"s"),animationDelay:"".concat(t/10,"s"),animationPlayState:"running",animationTimingFunction:"step-start"},className:o().box},t)})})};var u=n(442),h=n(5743),d=n(4969),m=n(8371),p=n(4660);n(9962);var f=n(5369),g=n(9634);let x=e=>{let{onAllClosed:t}=e,[n,a]=(0,s.useState)([]),[o,l]=(0,s.useState)(0),c=(0,s.useRef)(!1),x=(0,s.useRef)(),y=(0,s.useRef)(!0),v=(0,s.useRef)([]),_=(0,s.useRef)(),b=(0,s.useRef)([]);(0,s.useEffect)(()=>(x.current=new f.default,x.current.load().then(()=>{c.current=!0,w()}),()=>{x.current.stopAll()}),[]);let w=e=>{if(!c.current)return;let t="number"==typeof e?e:30;a(e=>{let n=(0,i.randomInt)(100)<t&&e.length<10,r=Array.from(Array(n?(0,i.randomInt)(2,6):1)).reduce(e=>{let t=(0,u.$)(e);return v.current[t]=x.current.play(t),b[t]=[(0,i.randomInt)(-10,40),(0,i.randomInt)(-10,40)],[...e,t]},[...e]);return l(r.length-1),y.current=!1,r})},j=e=>r=>{r.stopPropagation(),c.current&&(x.current.stop(n[e]),a(n=>{let r=[...n];return r.splice(e,1),l(t=>e<t||t===r.length?t-1:t),(0,i.randomInt)(100)<(y.current?80:30)?_.current=setTimeout(()=>{w(100)},(0,i.sToMs)(.5)):0==r.length&&(clearTimeout(_.current),t()),y.current=!1,r}))};return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(p.mQ,{style:{width:"100%",height:"100%",userSelect:"none"},selectedIndex:o,onSelect:e=>{l(e)},children:[(0,r.jsxs)(p.td,{children:[n.map((e,t)=>(0,r.jsxs)(p.OK,{onClick:()=>{x.current.restart(e)},children:["Tab ",e+1," ",(0,r.jsx)(h.Z,{onClick:j(t)})]},e)),n.length<20&&(0,r.jsx)(m.ZP,{icon:(0,r.jsx)(d.Z,{}),type:"text",onClick:w})]}),n.map(e=>{let t=v.current[e];return console.log({scoreIndex:t,tabToAudioMapping:v.current}),(0,r.jsx)(p.x4,{style:{height:"90vh",padding:"1rem"},children:(0,r.jsx)("img",{src:"".concat(g.O,"/scores/single_note/").concat(t+1,".svg"),alt:"score",style:{marginLeft:"".concat(b[e][0],"vw"),marginTop:"".concat(b[e][1],"vh")}})},e)})]})})};var y=n(1343);let v=["listen to the music as you relax in your environment.","listen to the music as you attend other activities.","listen to the music as you get distracted. ","to listen to the music, click through to enter.","listen to the music while you daydream.","listen to the music as you full asleep.","listen to the music actively and attentively.","to listen to the music, click through to enter.","listen to the music passively and inattentively.","listen to the music as you compose music.","listen to the music as you think about this text.","to listen to the music, click through to enter.","listen to the music as you consider what a website is.","listen to the music and forget about everything.","listen to the music and remember who you are.","to listen to the music, click through to enter.","listen to the music and be aware of your surroundings.","listen to the music and get lost on the journey. ","listen to the music as you forget who you are. ","to listen to the music, click through to enter.","listen to the music as you lose sense of your surroundings. "].map(e=>e.split(" ")),_={position:"fixed",top:0,left:0,right:0,bottom:0,width:"100vw",height:"100vh",backgroundColor:"white",zIndex:100,display:"flex",justifyContent:"center",alignItems:"center",fontSize:"2rem",cursor:"pointer"},b=e=>{let{onClick:t}=e,[n,a]=(0,s.useState)(""),o=(0,s.useRef)((0,i.randomInt)(v.length)),l=(0,s.useRef)(-1),c=(0,s.useCallback)(async()=>{let e=v[o.current];l.current>=e.length&&(l.current=-1,o.current=(0,i.randomInt)(v.length)),a(e.slice(0,l.current+1).join(" ")),await (0,y.ZP)(l.current<0?1e3:200*e[l.current].length),l.current++,c()},[]);return(0,s.useEffect)(()=>{o.current=(0,i.randomInt)(v.length),c()},[]),(0,r.jsx)("div",{onClick:t,style:_,children:(0,r.jsx)("div",{style:{width:"100%",maxWidth:1200,overflow:"hidden",justifyContent:"center",display:"flex",padding:"0 10px"},children:n})})};var w=n(221),j=n.n(w);let T=e=>{let{children:t}=e;return(0,r.jsx)("div",{className:j().backdrop,children:(0,r.jsx)("div",{className:j().popup,children:t})})};var k=[[2,.918104,.232438,.622396,.691917,.273917,.069646,.089708,.431771,1.1465,.25925,.338313,.330729,4.845313,.61746,.212948,.356054,.199773,.13737,.467642,.529524,.806871,.20517,.257302,.294785,.793741,1.221338,.179705,.612449,.286281,.669796,.223243,.188322,.288231,.520884,.149093,.096939,.613197,4.80195,.234626,.118798,.375714,.669819,.216553,.198027,.23127,.726531,.274354,.164195,2.12381,.182608,.226304,.186213,.203946,1.296054,.344036,.167506,.185102,2.125238,.13907,.368549,.915351,.185782,.850159,.24127,.656576,.829478,.433878,.245624,.16771,.767574,.152426,.370023,.833741,.387029,.417982,.63254,.277438,.240816,.728186,5.257755,.281746,.36161,.937347,.225533,.676916,.191134,.495397,.504308,.604603,3.630771,.098413,.642812,.773583,.285669,1.004444,.129161,.738798,.172834,.55093,.02542,2.3,.29839,.70712,.312857,.113878,.527619,.124807,.066145,1.066463,.193946,.322472,.77415,1.768571,.160952,.724127,.30059,.414422,.15356,.925011,.2,.166259,.291655,1.017732,.125374,1.534376,.353129,.465102,.220839,.846349,.19805,.296757,2.621383,.620794,.971361,.374989,.11771,.414059,.284943,.102041,.359909,.596349,.617188,.561361,2.707914],[2,.509342,.879093,.201655,.671451,.747075,.516531,.21458,.177596,.676576,.119796,.251043,.757891,.192698,.140544,.400091,.131134,3.166689,1.139569,.68805,.179138,.14585,.874331,.438163,.163424,.087687,.692562,1.624014,.161474,.291655,.270794,.144104,.710113,.219796,.280227,.249977,.133855,.544785,1.446372,.229184,.176054,.754172,.414853,.159841,1.524172,.342154,.149501,.229161,.502789,.466576,4.567052,.140091,.678934,1.077256,.1922,.581066,.299093,.100385,.099796,.49932,.468707,1.080748,.24585,.347982,.567098,.10585,.372018,.33517,.203673,3.600113,.301406,.347415,.206848,.133265,.625011,.645805,1.044286,.229637,.094807,.393243,1.996848,.90263,.218231,.157279,.897234,.218413,.145488,.694444,.306213,.173197,.326327,.270816,.13127,.711701,2.858594,.984875,.196372,.29576,.356281,.393764,.897914,.209751,.652585,.283469,.817687,.555782,.247347,.365102,3.736349,.42424,1.111701,.929206,.737506,.241633,.573946,2.946893],[2.270313,.183979,.864313,.194979,.164646,.262125,.396438,.275125,.747333,.166813,.996458,.133958,.721708,.238292,.461417,.632542,3.368396,.168979,.678021,.262042,.736604,.693188,.171146,.847,.257792,2.106896,1.207375,.303271,.684521,1.054917,.091042,.292438,.225313,.153813,.140813,1.914688,1.090313,.59175,.55225,.108104,.135146,.612542,2.873438,.459417,1.25925,.25,.463438,.180167,.180188,.522458,.306271,.27025,.5585,.504438,.288271,.108104,2.618125,.687688,.279271,.450396,.180167,.162167,.490417,.167146,.882771,.180188,.594521,.477417,2.432083,.612542,.108104,.585521,.189167,.198188,.540479,.216208,3.576042,.666583,.162167,.180167,.504438,.226646,.78225,1.255],[2,.333333,.224989,.117188,.204535,.369932,.62619,3.623787,.229161,.202063,.193787,.703107,1.276054,.509365,.407302,3.479184,.274989,.200431,.161451,1.176689,.629138,.226531,.484921,.574989,2.741111,.363061,.249864,.245465,.363197,.48102,3.327098,.229184,.270839,.577052,.251565,.183855,.430726,2.049456],[2,.777098,.78254,.190363,.198957,.638526,.193855,1.101542,4.150431,.282721,.447438,.130295,.15254,.495283,.312517,.27576,.286735,.799478,.119796,1.640612,.161497,1.0078,.20415,.462472,.208345,.125057,2.333333,.336463,.242177,.163537,.457302,.241882,.612789,.162404,.679297,.445782,.226576,1.96771,.193265,.221361,.367483,.135714,.797098,.19966,.225215,.57424,.89585,.833356,.276259,.251406,.639388,2.38551,.171882,.634671,.682494,.247211,.301723,.95102,.307166,.244898,.206621,.970499,.171247,.274558,.121338,.838662,3.364966,.215873,1.126508,.178413,.276077,.18678,.319977,.585941,.203197,.261383,.354807,.291043,.235488,.55619,.228209,.730113,.146122,.27356,.800091,.224853,.137415,.522041,4.663039,.229819,.597256,.16771,.643243,.247937,.471905,.708322,.218889,.100454,.808594,.247732,1.071633,.36517,.809841,.655737,3.638526],[2,.819093,.228277,.880204,.208481,.742562,.242721,.909887,.177098,.319478,.17619,.71263,.594263,.222177,.236644,.634376,3.932812,.256803,.458844,.167732,.160249,.684535,2.239524,.201587,.344965,.360204,.179206,.174172,.589365,4.172925,.160385,1.28424,.18483,.697574,.15966,1.361179,.239569,.600476,1.920363,.154694,1.189592,.186939,.19898,.658957,.55873,.145873,1.520771,.309773,.093878,4.346372,1.009546,.485238,.450499,.172925,.344263,1.531247,.307506,.270839,.564762,.158889,.337982,.306304,.210045,.829025,.208299,.505964,.446168,.500091,.115374,.40839,.294785,.562494,.979161,1.148639,.136236,.466916,.075306,.901474,4.250567,.330726,.679637,.70941,.382608,.120136,.420703,.10678,.141678,.842653,3.296893],[2,.366122,.16805,2.456961,.209796,.213107,3.577075,.283855,.191678,.496871,.748957,1.341134],[2,.168231,.665624,.720839,.552063,.1622,.605533,3.096871,.864036,.406803,.2,1.029161,1.000023,1.00932,.990658,.7422,1.278617,.979206,.624921,.220385,.609342,4.045329,.13805,.736916,.197392,.108367,.393175,.092744,.475011,.448934,.54322,.437506,.663537,.17034,1.302426,.120023,.222313,3.950023,.624966,.354172,.634512,.677937,.179705,.278639,.423401,.1,.449501,.509773,.132404,2.415624,.104172,2.131769,.608322,.875034,.198435,.83,.603855,.673946,3.205193,.151633,.732948,.603923,.535488,.228005,.706213,.246395,.601134,.649864,.186463,.518254,.765624,.233039,.762766,.507823,.156848,.57381,.203152,.610431,1.486077]],C=n(2730),A=n(3256),I=n.n(A),E=n(9972);let N=()=>{let e=[{dictionaries:[E.Dv,[...E.O9,...E.yd]],separator:"_",length:2},{dictionaries:[E.O9,E.yd,[92,99,11,53,45,2323,7777,"__","/////"].map(e=>e.toString())],separator:"",style:"capital"}];return(0,E._8)(e[(0,i.randomInt)(e.length)])},R=new i.Urn(k.length,k.length-1),P=["music to compose music to is a digital manifestation of real world environments. Music is one form of many cultural artefacts that has been copied, duplicated, and shared through multiple peer-to-peer networks in the digital age. There are more copies than there are originals on the internet. But what is an original? Who is the author? The mass circulation of information and cultural exchange, such as the virality of image files, has become central to our online worlds. Real world environments are recreated in 3D rendered video format. The spaces replicate our imagination of spaces in the real world. All material on the internet is a manifestation of our offline world. The internet has created an environment for the mass distribution of music. More music is distributed than ever before. Aesthetic experience reached a point where the image determines consumer decision making.","Our experience of cultural artefacts exists via a capture of that experience in the form of documentation. Documentation exists as a digitised copy of the original work. But where does the original work end and the copy begin? What is uploaded onto the platform? Where is the music coming from? The virtual manifestation of spaces and the in real life manifestation of those spaces is said to be merging. I exist as a computer generated manifestation of a real person. Interaction with the offline world is understood more and more through the online world. Projections of our real world experience is captured and disseminated online to unknown others. Shared experiences influences engagement and behaviour IRL.","The composition of the World Wide Web influenced the formalisation of music to compose music to. The internet and digital technologies are structured by categorisation. Categorisation brings inherent functionality to the form of a website. Functionality directs users to a central message. User interactivity is measured by the direct and clear message portrayed through a website. Attention is gained through a balance of familiarity and unique selling points. Creating a space on the internet is fundamental. Everything on the internet is marketable and financialised.","Where are we in our virtual environment? What is the material differentiation between media formats? How are you experiencing music to compose music to? Where is my voice coming from? For how long will you stay here?","Aesthetic experience is the foundation of contemporary living. The screen is a window through which we experience the world. The mediascape is flattened by the screen. All forms of media are mutable and intersect into one another. When an image is circulated it can become entirely extracted from its original context. The aesthetic spaces you are experiencing here have been manipulated to serve a particular purpose. An explanation of how the media content you are viewing has been processed and programmed is more significant than the content itself. All content on music to compose music to is extracted and reappropriated from completely unrelated contexts.","Material is extracted from material and manipulated to form new material removed from its original context. What becomes of the original context? At what point is the context lost? The transformation of material is recontextualised though visual content. The transformation of that visual content is recontextualised through the screen. Extraction takes place in many forms. I am generated in written form and extracted as spoken text using a text-to-speech converter, manipulated to serve a particular context. All material objects serve the purpose of a particular goal.","Where am I? Where are you? How has your experience been?","The internet enabled access to infinite content. Content, such as music, videos, images, books, personal information, secrets, exists in multiple locations. The original and the copy of many files across many formats are indistinguishable on the internet. music to compose music to may become an altered version of itself. A derivative. Elements documented and distributed across various platforms. The original content featured on music to compose music to itself derives from material existing in digital and physical locations."].map(e=>e.split(/[\s-]/)),W=e=>{let{reading:t,soundEngine:n}=e,{chat:a,setChat:o}=(0,s.useContext)(C.GlobalContext),l=(0,s.useRef)(R.next()),c=(0,s.useRef)(0),u=(0,s.useRef)(),h=(0,s.useRef)([,,,,,].fill("")),d=(0,s.useCallback)(()=>{o(e=>{let t=[...e,[]].filter((e,t,n)=>{let{length:r}=n;return t>r-5});return t}),l.current=R.next(),c.current=0},[o]),m=(0,s.useCallback)(()=>{let e=k[l.current][c.current],t=P[l.current],n=t.length-1<=c.current;u.current=setTimeout(()=>{o(e=>{let r=[...e];return r[r.length-1].push(t[c.current]),n?d():c.current+=1,h.current=h.current.map(N),n?(0,y.ZP)((0,i.sToMs)((0,i.randomInt)(10,45))).then(p):m(),r})},(0,i.sToMs)(e))},[n]),p=(0,s.useCallback)(()=>{console.log("start Reading"),(async()=>{var e;await (null==n?void 0:null===(e=n.start)||void 0===e?void 0:e.call(n,l.current)),m()})()},[n]);return(0,s.useEffect)(()=>()=>{var e;clearTimeout(u.current),console.log("stop Reading"),null==n||null===(e=n.stop)||void 0===e||e.call(n)},[n]),(0,s.useEffect)(()=>(h.current=h.current.map(N),()=>{o(e=>{let t=[...e];return t[t.length-1]=structuredClone(P[l.current]),t}),d()}),[]),(0,s.useEffect)(()=>{if(t&&n&&p(),!t&&n){var e;clearTimeout(u.current),null==n||null===(e=n.stop)||void 0===e||e.call(n)}},[t,n]),(0,r.jsx)("div",{className:I().container,children:(0,r.jsx)("div",{className:I().expandingContainer,children:a.map((e,t)=>(0,r.jsxs)("p",{className:I().paragraph,children:[a[t].length?(0,r.jsxs)("strong",{className:I().username,children:[h.current[t%h.current.length],":"," "]}):(0,r.jsx)("em",{className:"delay",children:"typing..."}),(0,r.jsx)("br",{}),e.map((e,t)=>(0,r.jsxs)(s.Fragment,{children:[(0,r.jsx)("span",{children:e})," "]},t))]},t))})})};var M=[{name:"apartment"},{name:"sleep"},{name:"lobby"},{name:"concert"},{name:"nowhere"},{name:"vacation"},{name:"travel"},{name:"workspace"}],S=n(3915),O=n.n(S),H=n(9008),F=n.n(H),L=n(1664),D=n.n(L),B=n(1163),U=function(){let[e,t]=(0,s.useState)(),{entered:a,setEntered:o,nextPopupIn:l,setNextPopupIn:u}=(0,s.useContext)(C.GlobalContext),h=(0,B.useRouter)(),d=(0,s.useRef)(),[m,p]=(0,s.useState)(!1),f=(0,s.useRef)();(0,s.useEffect)(()=>{(async()=>{let e=await n.e(611).then(n.bind(n,611));t(e)})()},[e]),(0,s.useEffect)(()=>{M.forEach(e=>{let{name:t}=e;h.prefetch("/".concat(t))})},[h]);let g=()=>{clearTimeout(f.current),h.push("/".concat(d.current))},y=t=>{var n;d.current=t,null==e||null===(n=e.stop)||void 0===n||n.call(e),0===l?(p(!0),f.current=setTimeout(()=>g(d.current),(0,i.sToMs)(120)),u((0,i.randomInt)(3,6))):(u(e=>e-1),g())};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(F(),{children:[(0,r.jsx)("title",{children:"music to compose music to"}),(0,r.jsx)("meta",{name:"description",content:"music to compose music to"}),(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"})]}),!a&&(0,r.jsx)(b,{onClick:()=>{o(!0)}}),m&&(0,r.jsx)(T,{children:(0,r.jsx)(x,{onAllClosed:g})}),(0,r.jsxs)("div",{className:O().container,children:[(0,r.jsx)("nav",{className:O().nav,children:(0,r.jsx)("ul",{children:M.map((e,t)=>e.file?(0,r.jsx)("li",{children:(0,r.jsx)(D(),{href:e.name,children:(0,r.jsx)("div",{children:e.name})})},t):(0,r.jsx)("li",{children:(0,r.jsx)("a",{onClick:()=>y(e.name),children:(0,r.jsx)("div",{children:e.name})})},t))})}),(0,r.jsx)("main",{className:O().main,children:(0,r.jsx)("div",{className:O().bottomLayer,children:(0,r.jsx)("div",{className:O().animation,children:(0,r.jsx)(c,{running:a})})})}),(0,r.jsx)("aside",{className:O().aside,children:(0,r.jsx)(W,{reading:a&&!m,soundEngine:e})})]})]})}},6869:function(e){e.exports={container:"Animation_container__GLDWx",box:"Animation_box__r5Pbg"}},3915:function(e){e.exports={container:"Home_container__Ennsq",nav:"Home_nav__UxFnO",main:"Home_main__EtNt2",layer2:"Home_layer2__UbhXX",layer1:"Home_layer1__rXPmk",animation:"Home_animation__bZp8l",mountain:"Home_mountain__wP20V",subtitle:"Home_subtitle__xVO9d",aside:"Home_aside__BBKI_"}},221:function(e){e.exports={popup:"Popup_popup__W0kWh",backdrop:"Popup_backdrop__msH2h",skipAd:"Popup_skipAd__SALuG"}},3256:function(e){e.exports={expandingContainer:"Text_expandingContainer__Oq_0w",container:"Text_container__uugPw",paragraph:"Text_paragraph__JItl5",username:"Text_username__gcc8x"}}},function(e){e.O(0,[123,13,774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);