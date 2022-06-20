var q=Object.defineProperty;var S=Object.getOwnPropertySymbols;var D=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable;var C=(r,e,t)=>e in r?q(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,p=(r,e)=>{for(var t in e||(e={}))D.call(e,t)&&C(r,t,e[t]);if(S)for(var t of S(e))G.call(e,t)&&C(r,t,e[t]);return r};const H=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}};H();const v=(r,e)=>{e instanceof HTMLCollection?[...e].forEach(t=>v(r,t)):Array.isArray(e)?e.forEach(t=>v(r,t)):r.appendChild(e instanceof Node?e:document.createTextNode(e))},c=(r,e,...t)=>{const o=document.createElement(r);return Object.entries(e||{}).forEach(([n,s])=>{n.startsWith("on")&&n.toLowerCase()in window&&typeof s=="function"?o.addEventListener(n.toLowerCase().substring(2),s):o.setAttribute(n,s.toString())}),t.forEach(n=>{v(o,n)}),o},A={I:[[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]],J:[[1,1,0],[1,0,0],[1,0,0]],L:[[1,1,0],[0,1,0],[0,1,0]],O:[[1,1],[1,1]],S:[[1,0,0],[1,1,0],[0,1,0]],SR:[[0,1,0],[1,1,0],[1,0,0]],T:[[0,1,0],[1,1,1],[0,0,0]]},J=(r,e)=>(Object.entries(r).forEach(([t,o])=>{e(t,r)}),new Proxy(r,{set:function(t,o,n){return t[o]=n,e(o,t),!0}}));const m={gridSize:{row:20,col:10},speed:1e3},O=(r,e)=>{if(e<=0)return r;const t=r[0].map((o,n)=>r.map(s=>s[n]).reverse());return O(t,e-1)},M=r=>r.map(e=>e.map(t=>t)),x=({grid:r,block:{x:e,y:t,blockCode:o,rotation:n}})=>{const s=A[o],i=M(r);return O(s,n).forEach((d,y)=>{const h=t-y;d.forEach((j,B)=>{var E,L;if(!j)return;const w=e-B,I=w<0,P=w>=((E=i==null?void 0:i[h])==null?void 0:E.length),R=h>=i.length;if(I||P||R)throw new Error("OUT_OF_BOUND");if((L=i==null?void 0:i[h])!=null&&L[w])throw new Error("OVERLAP_VALUE");h>=0&&(i[h][w]=o)})}),i},K=({row:r,col:e})=>new Array(r).fill(0).map(()=>new Array(e).fill(0)),V=r=>{const e=M(r),t=e.filter(n=>!n.every(Boolean)),o=e.length-t.length;return{removedLine:o,grid:[...K({row:o,col:r[0].length}),...t]}};class g extends HTMLElement{constructor(){super(...arguments),this.shadow=this.attachShadow({mode:"open"}),this.state={}}get props(){const e=this.getAttributeNames();return Object.fromEntries(e.map(t=>[t,this.getAttribute(t)]))}attributeChangedCallback(e,t,o){this.onPropsChange(e,t,o),this.rerender()}connectedCallback(){this.onMount(),this.rerender();var e=new MutationObserver(t=>{t.some(({type:n})=>n==="attributes")&&this.rerender()});e.observe(this,{attributes:!0})}disconnectedCallback(){this.onUnmount()}rerender(){const e=this.render();this.shadow.innerHTML="",e&&this.shadow.appendChild(e)}setState(e){this.state=p(p({},this.state),e),this.rerender()}onPropsChange(e,t,o){}onMount(){}onUnmount(){}render(){return null}}var T={exports:{}};/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/(function(r){(function(){var e={}.hasOwnProperty;function t(){for(var o=[],n=0;n<arguments.length;n++){var s=arguments[n];if(!!s){var i=typeof s;if(i==="string"||i==="number")o.push(s);else if(Array.isArray(s)){if(s.length){var a=t.apply(null,s);a&&o.push(a)}}else if(i==="object")if(s.toString===Object.prototype.toString)for(var d in s)e.call(s,d)&&s[d]&&o.push(d);else o.push(s.toString())}}return o.join(" ")}r.exports?(t.default=t,r.exports=t):window.classNames=t})()})(T);var N=T.exports;class z extends g{constructor(){super(...arguments),this.handleKeyDown=e=>{var t;if(e.key===((t=this.props.key)==null?void 0:t.toLowerCase())){const o=this.props.active!=="true";this.setState({isActive:o}),this.dispatchEvent(new CustomEvent("change",{detail:o}))}}}onMount(){window.addEventListener("keydown",this.handleKeyDown)}onUmount(){window.removeEventListener("keydown",this.handleKeyDown)}render(){const{key:e,active:t}=this.props;return c("div",null,c("style",null,`
      .active {
        color: #f44336;
      }
    `),c("div",{class:N({active:t==="true"})},"[",e==null?void 0:e.toUpperCase(),"] ",c("slot",null)))}}customElements.define("flip-switch",z);const F=`
  .cell {
    text-align: center;
    height: 25px;
    width: 25px;
    line-height: 25px;
    display: inline-block;
    margin: 1px;
  }
  .I {
    box-shadow: 0 0 0 1px #00bcd4 inset;
    color: #00bcd4;
  }
  
  .J {
    box-shadow: 0 0 0 1px #3f51b5 inset;
    color: #3f51b5;
  }
  
  .L {
    box-shadow: 0 0 0 1px #ff9800 inset;
    color: #ff9800;
  }
  
  .O {
    box-shadow: 0 0 0 1px #ffeb3b inset;
    color: #ffeb3b;
  }
  
  .S {
    box-shadow: 0 0 0 1px #4caf50 inset;
    color: #4caf50;
  }
  
  .SR {
    box-shadow: 0 0 0 1px #f44336 inset;
    color: #f44336;
  }
  
  .T {
    box-shadow: 0 0 0 1px #9c27b0 inset;
    color: #9c27b0;
  }
`;class _ extends g{render(){const{val:e}=this.props;return c("div",null,c("style",null,F),c("div",{class:N("cell",e==null?void 0:e.toUpperCase())},(e==null?void 0:e.toUpperCase())||0,","))}}customElements.define("tetris-cell",_);const Y=`
  .row {
    line-height: 25px;
    display: flex;
  }
`;class $ extends g{render(){const{last:e}=this.props;return c("div",null,c("style",null,Y),c("div",{class:"row"},"[",this.children,"] ",e==="true"?"]":","))}}customElements.define("tetris-row",$);const W=`
  .container {
    display: flex;
  }
  .grid-start {
    line-height: 25px;
  }

  .grid-end {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
  }
`;class X extends g{render(){const{grid:e}=this.props;return c("div",{id:"test"},c("style",null,W),c("div",{class:"container"},c("div",{class:"grid-start"},"var grid = [\xA0"),c("div",null,JSON.parse(e).map((t,o)=>c("tetris-row",null,t.map(n=>c("tetris-cell",{val:String(n)})))))))}}customElements.define("tetris-grid",X);const U=()=>{const r=Object.keys(A),e=r[Math.floor(Math.random()*r.length)];return{x:6,y:0,rotation:0,blockCode:e}},b=()=>{const r=new Array(m.gridSize.row).fill(0).map(()=>new Array(m.gridSize.col).fill(0));return J({block:U(),grid:r,stopped:!0,score:0},(e,{grid:t,block:o,score:n,stopped:s})=>{var i;switch(e){case"grid":case"block":{const a=document.querySelector("#grid");if(!a)return;const d=x({grid:t,block:o});a.innerHTML="";const y=c("tetris-grid",{grid:JSON.stringify(d)});a.appendChild(y);break}case"score":{const a=document.querySelector("#score");if(!a)return;a.innerText=n.toString();break}case"stopped":{s?(clearInterval(f),f=void 0):f=setInterval(k,m.speed),(i=document.querySelector("#stop"))==null||i.setAttribute("active",s?"true":"false");break}}})};let f,l=b();const u=r=>{try{const e=p(p({},l.block),r);return x({grid:l.grid,block:e}),l.block=e,!0}catch{return!1}},Q=()=>{clearInterval(f),f=void 0,f=setInterval(k,m.speed)},k=()=>{if(l.score+=1,u({y:l.block.y+1}))return;const{grid:r,block:e}=l,{grid:t,removedLine:o}=V(x({grid:r,block:e}));u(U())?(l.score+=o*100,l.grid=t):l=b()};window.onload=()=>{var r,e;l=b(),(r=document.querySelector("#restart"))==null||r.addEventListener("change",t=>{t instanceof CustomEvent&&(l=b())}),(e=document.querySelector("#stop"))==null||e.addEventListener("change",t=>{t instanceof CustomEvent&&(l.stopped=t.detail)})};document.addEventListener("keydown",r=>{if(l.stopped)return;const{block:{rotation:e,x:t,y:o}}=l;switch(r.key){case"ArrowLeft":return u({x:t-1});case"ArrowRight":return u({x:t+1});case"ArrowDown":return u({y:o+1});case"ArrowUp":return u({rotation:e>=3?0:e+1});case" ":{let n=!0,s=o;do n=u({y:s+=1});while(n);Q(),k();break}}});
