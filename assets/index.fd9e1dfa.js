var _=Object.defineProperty;var h=Object.getOwnPropertySymbols;var q=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable;var m=(e,t,o)=>t in e?_(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,p=(e,t)=>{for(var o in t||(t={}))q.call(t,o)&&m(e,o,t[o]);if(h)for(var o of h(t))G.call(t,o)&&m(e,o,t[o]);return e};const U=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))s(c);new MutationObserver(c=>{for(const n of c)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(c){const n={};return c.integrity&&(n.integrity=c.integrity),c.referrerpolicy&&(n.referrerPolicy=c.referrerpolicy),c.crossorigin==="use-credentials"?n.credentials="include":c.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(c){if(c.ep)return;c.ep=!0;const n=o(c);fetch(c.href,n)}};U();const P=(e,t)=>{e.innerHTML="",t.forEach((o,s)=>{const c=document.createElement("div");c.className="grid-row",c.id="R"+s,o.forEach((n,i)=>{const a=document.createElement("cell");a.textContent=String(n),a.id="R"+s+"C"+i,a.className=`grid-cell ${n?`gc-${n}`:""}`,c.appendChild(a)}),e.appendChild(c)})},w={gridSize:{row:20,col:10},speed:1e3},B=(e,t)=>{if(t<=0)return e;const o=e[0].map((s,c)=>e.map(n=>n[c]).reverse());return B(o,t-1)},v={I:[[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]],J:[[1,1,0],[1,0,0],[1,0,0]],L:[[1,1,0],[0,1,0],[0,1,0]],O:[[1,1],[1,1]],S:[[1,0,0],[1,1,0],[0,1,0]],SR:[[0,1,0],[1,1,0],[1,0,0]],T:[[0,1,0],[1,1,1],[0,0,0]]},z=e=>e.map(t=>t.map(o=>o)),f=({grid:e,block:{x:t,y:o,blockCode:s,rotation:c}})=>{const n=v[s],i=z(e);return B(n,c).forEach((R,x)=>{const d=o-x;R.forEach((C,I)=>{var g,y;if(!C)return;const u=t-I,N=u<0,M=u>=((g=i==null?void 0:i[d])==null?void 0:g.length),T=d>=i.length;if(N||M||T)throw new Error("OUT_OF_BOUND");if((y=i==null?void 0:i[d])!=null&&y[u])throw new Error("OVERLAP_VALUE");d>=0&&(i[d][u]=s)})}),i},b=({row:e,col:t})=>new Array(e).fill(0).map(()=>new Array(t).fill(0)),D=()=>{const e=Object.keys(v);return e[Math.floor(Math.random()*e.length)]},F=e=>{const t=e.filter(s=>!s.every(Boolean)),o=e.length-t.length;return{removedLine:o,grid:[...b({row:o,col:e[0].length}),...t]}},L=()=>({x:6,y:0,rotation:0,blockCode:D()}),S=()=>({grid:b(w.gridSize),currentBlock:L(),clock:void 0,stopped:!0,score:0});let r=S();const l=e=>{const t=p(p({},r.currentBlock),e);f({grid:r.grid,block:t}),r.currentBlock=t,E()},E=()=>{const e=document.querySelector("#grid");if(!e)return;const t=f({grid:r.grid,block:r.currentBlock});P(e,t)},A=()=>{const e=document.querySelector("#score");!e||(e.innerText=r.score.toString())},k=()=>{clearInterval(r.clock),r=S(),E(),A(),O()},V=()=>{try{r.score+=1,l({y:r.currentBlock.y+1})}catch{const t=f({grid:r.grid,block:r.currentBlock}),{grid:o,removedLine:s}=F(t);r.score+=s*100,r.grid=o;try{l(L())}catch{k()}}finally{A()}},O=()=>{var t;const e=(t=document.querySelector("#stop"))==null?void 0:t.classList;!e||(r.stopped?(clearInterval(r.clock),r.clock=void 0,e.add("active")):(r.clock=setInterval(V,w.speed),e.remove("active")))};window.onload=()=>{k()};document.addEventListener("keydown",e=>{try{switch(e.key){case"s":r.stopped=!r.stopped,O();break;case"r":k();break;case"ArrowUp":{if(r.stopped)return;l({rotation:r.currentBlock.rotation+1>3?0:r.currentBlock.rotation+1});break}case"ArrowLeft":{if(r.stopped)return;l({x:r.currentBlock.x-1});break}case"ArrowRight":{if(r.stopped)return;l({x:r.currentBlock.x+1});break}case"ArrowDown":{if(r.stopped)return;l({y:r.currentBlock.y+1});break}case" ":{if(r.stopped)return;for(;;)l({y:r.currentBlock.y+1});break}}}catch{}});
