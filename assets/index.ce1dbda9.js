var N=Object.defineProperty,_=Object.defineProperties;var U=Object.getOwnPropertyDescriptors;var m=Object.getOwnPropertySymbols;var C=Object.prototype.hasOwnProperty,M=Object.prototype.propertyIsEnumerable;var B=(t,e,n)=>e in t?N(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,a=(t,e)=>{for(var n in e||(e={}))C.call(e,n)&&B(t,n,e[n]);if(m)for(var n of m(e))M.call(e,n)&&B(t,n,e[n]);return t},p=(t,e)=>_(t,U(e));const T=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerpolicy&&(c.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?c.credentials="include":o.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}};T();const z=(t,e)=>{t.innerHTML="",e.forEach((n,i)=>{const o=document.createElement("div");o.className="grid-row",o.id="R"+i,n.forEach((c,l)=>{const s=document.createElement("cell");s.textContent=String(c),s.id="R"+i+"C"+l,s.className=`grid-cell ${c?`gc-${c}`:""}`,o.appendChild(s)}),t.appendChild(o)})},k={gridSize:{row:20,col:10},speed:1e3},w=(t,e)=>{if(e<=0)return t;const n=t[0].map((i,o)=>t.map(c=>c[o]).reverse());return w(n,e-1)},G={I:[[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]],J:[[0,1,0],[0,1,0],[1,1,0]],L:[[1,0,0],[1,0,0],[1,1,0]],O:[[1,1],[1,1]],S:[[1,0,0],[1,1,0],[0,1,0]],SR:[[0,1,0],[1,1,0],[1,0,0]],T:[[0,1,0],[1,1,1],[0,0,0]]},u=({grid:t,block:{x:e,y:n,blockCode:i,rotation:o},dryRun:c})=>{const l=G[i];return w(l,o).forEach((S,L)=>{const d=n-L;if(d>=t.length)throw new Error("OUT_OF_BOUND");d>=0&&S.forEach((O,y)=>{if(!O)return;const R=e-y<0,A=e-y>=t[d].length;if(R||A)throw new Error("OUT_OF_BOUND");const g=e-y;if(t[d][g])throw new Error("OVERLAP_VALUE");c||(t[d][g]=i)})}),t},h=({row:t,col:e})=>new Array(t).fill(0).map(()=>new Array(e).fill(0)),q=()=>{const t=Object.keys(G);return t[Math.floor(Math.random()*t.length)]},b=(t,e)=>e.map((n,i)=>n.map((o,c)=>t[i][c]||o)),E=()=>({x:6,y:0,rotation:0,blockCode:q()}),x=()=>({solidGrid:h(k.gridSize),currentGrid:h(k.gridSize),currentBlock:E(),clock:void 0,stopped:!0,score:0});let r=x();const f=()=>{const t=u({grid:h(k.gridSize),block:r.currentBlock}),e=b(t,r.solidGrid);r.currentGrid=t;const n=document.querySelector("#grid");!n||z(n,e)},F=()=>{try{const t=r.currentBlock.y+1;u({dryRun:!0,grid:r.solidGrid,block:p(a({},r.currentBlock),{y:t})}),r.currentBlock.y=t}catch{r.solidGrid=b(r.currentGrid,r.solidGrid),r.currentBlock=E()}finally{r.score=r.score+1,f()}},v=()=>{var e;const t=(e=document.querySelector("#stop"))==null?void 0:e.classList;!t||(r.stopped?(clearInterval(r.clock),r.clock=void 0,t.add("active")):(r.clock=setInterval(F,k.speed),t.remove("active")))};window.onload=()=>{f(),v()};document.addEventListener("keydown",t=>{switch(t.key){case"s":r.stopped=!r.stopped,v();break;case"ArrowUp":{if(r.stopped)return;try{const e=r.currentBlock.rotation+1>3?0:r.currentBlock.rotation+1;u({dryRun:!0,grid:r.solidGrid,block:a({},r.currentBlock)}),r.currentBlock.rotation=e}catch{}finally{f()}break}case"ArrowLeft":{if(r.stopped)return;try{const e=r.currentBlock.x-1;u({dryRun:!0,grid:r.solidGrid,block:p(a({},r.currentBlock),{x:e})}),r.currentBlock.x=e}catch{}finally{f()}break}case"ArrowRight":{if(r.stopped)return;try{const e=r.currentBlock.x+1;u({dryRun:!0,grid:r.solidGrid,block:p(a({},r.currentBlock),{x:e})}),r.currentBlock.x=e}catch{}finally{f()}break}}});
