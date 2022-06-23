var U=Object.defineProperty,j=Object.defineProperties;var H=Object.getOwnPropertyDescriptors;var E=Object.getOwnPropertySymbols;var F=Object.prototype.hasOwnProperty,_=Object.prototype.propertyIsEnumerable;var C=(s,t,e)=>t in s?U(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,a=(s,t)=>{for(var e in t||(t={}))F.call(t,e)&&C(s,e,t[e]);if(E)for(var e of E(t))_.call(t,e)&&C(s,e,t[e]);return s},h=(s,t)=>j(s,H(t));const q=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function e(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=e(r);fetch(r.href,n)}};q();const y=(s,t)=>{t instanceof HTMLCollection?[...t].forEach(e=>y(s,e)):Array.isArray(t)?t.forEach(e=>y(s,e)):s.appendChild(t instanceof Node?t:document.createTextNode(t))},c=(s,t,...e)=>{const o=document.createElement(s);return Object.entries(t||{}).forEach(([r,n])=>{r.startsWith("on")&&r.toLowerCase()in window&&typeof n=="function"?o.addEventListener(r.toLowerCase().substring(2),n):o.setAttribute(r,n.toString())}),e.forEach(r=>{y(o,r)}),o};var l=(s=>(s.LEFT="LEFT",s.RIGHT="RIGHT",s.ROTATE="ROTATE",s.DOWN="DOWN",s.DROP="DROP",s))(l||{});const v={gridSize:{row:20,col:10},speed:1e3},L=({row:s,col:t})=>new Array(s).fill(0).map(()=>new Array(t).fill(0)),O={I:[[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]],J:[[1,1,0],[1,0,0],[1,0,0]],L:[[1,1,0],[0,1,0],[0,1,0]],O:[[1,1],[1,1]],S:[[1,0,0],[1,1,0],[0,1,0]],SR:[[0,1,0],[1,1,0],[1,0,0]],T:[[0,1,0],[1,1,1],[0,0,0]]},S=()=>{const s=Object.keys(O),t=s[Math.floor(Math.random()*s.length)];return{x:6,y:0,rotation:0,blockCode:t}},T=(s,t)=>{if(t<=0)return s;const e=s[0].map((o,r)=>s.map(n=>n[r]).reverse());return T(e,t-1)},A=s=>s.map(t=>t.map(e=>e)),w=({grid:s,block:{x:t,y:e,blockCode:o,rotation:r}})=>{const n=O[o],i=A(s);return T(n,r).forEach((p,N)=>{const f=e-N;p.forEach((G,D)=>{var k,x;if(!G)return;const m=t-D,I=m<0,M=m>=((k=i==null?void 0:i[f])==null?void 0:k.length),P=f>=i.length;if(I||M||P)throw new Error("OUT_OF_BOUND");if((x=i==null?void 0:i[f])!=null&&x[m])throw new Error("OVERLAP_VALUE");f>=0&&(i[f][m]=o)})}),i},W=s=>{const t=A(s),e=t.filter(r=>!r.every(Boolean)),o=t.length-e.length;return{removedLine:o,grid:[...L({row:o,col:s[0].length}),...e]}},b=()=>{const s=S(),t=L(v.gridSize);return{block:s,solidGrid:t,displayGrid:w({block:s,grid:t}),stopped:!0,score:0}};class J{constructor({onSateChange:t}){this._state=b(),this.onSateChangeCb=()=>{},this.updateBlock=e=>{try{const o=a(a({},this.state.block),e);return w({grid:this.state.solidGrid,block:o}),this.state=h(a({},this.state),{block:o}),!0}catch{return!1}},this.tick=()=>{if(this.state=h(a({},this.state),{score:this.state.score+1}),this.updateBlock({y:this.state.block.y+1}))return;const{solidGrid:e,block:o}=this.state,{grid:r,removedLine:n}=W(w({grid:e,block:o}));this.updateBlock(S())?this.state=h(a({},this.state),{score:this.state.score+n*100,solidGrid:r}):this.state=b()},this.resetClockTick=()=>{clearInterval(this.clock),this.clock=void 0,this.clock=setInterval(this.tick,v.speed)},this.move=e=>{if(this.state.stopped)return;const{block:{rotation:o,x:r,y:n}}=this.state;switch(e){case l.LEFT:return this.updateBlock({x:r-1});case l.RIGHT:return this.updateBlock({x:r+1});case l.DOWN:return this.updateBlock({y:n+1});case l.ROTATE:return this.updateBlock({rotation:o>=3?0:o+1});case l.DROP:{let i=!0,u=n;do i=this.updateBlock({y:u+=1});while(i);this.resetClockTick(),this.tick();break}}},this.start=()=>{this.clock=setInterval(this.tick,v.speed),this.state=h(a({},this.state),{stopped:!1})},this.stop=()=>{clearInterval(this.clock),this.clock=void 0,this.state=h(a({},this.state),{stopped:!0})},this.reset=()=>{this.state=b()},this.onSateChangeCb=t,t(this._state)}get state(){return this._state}set state(t){const e=h(a({},t),{displayGrid:w({grid:t.solidGrid,block:t.block})});this._state=e,this.onSateChangeCb(e)}}class g extends HTMLElement{constructor(){super(...arguments),this.shadow=this.attachShadow({mode:"open"}),this.state={}}get props(){const t=this.getAttributeNames();return Object.fromEntries(t.map(e=>[e,this.getAttribute(e)]))}attributeChangedCallback(t,e,o){this.onPropsChange(t,e,o),this.rerender()}connectedCallback(){this.onMount(),this.rerender();var t=new MutationObserver(e=>{e.some(({type:r})=>r==="attributes")&&this.rerender()});t.observe(this,{attributes:!0})}disconnectedCallback(){this.onUnmount()}rerender(){const t=this.render();this.shadow.innerHTML="",t&&this.shadow.appendChild(t)}setState(t){this.state=a(a({},this.state),t),this.rerender()}onPropsChange(t,e,o){}onMount(){}onUnmount(){}render(){return null}}var R={exports:{}};/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/(function(s){(function(){var t={}.hasOwnProperty;function e(){for(var o=[],r=0;r<arguments.length;r++){var n=arguments[r];if(!!n){var i=typeof n;if(i==="string"||i==="number")o.push(n);else if(Array.isArray(n)){if(n.length){var u=e.apply(null,n);u&&o.push(u)}}else if(i==="object")if(n.toString===Object.prototype.toString)for(var p in n)t.call(n,p)&&n[p]&&o.push(p);else o.push(n.toString())}}return o.join(" ")}s.exports?(e.default=e,s.exports=e):window.classNames=e})()})(R);var B=R.exports;const K=`
  .active {
    color: #f44336;
  }
`;class V extends g{constructor(){super(...arguments),this.handleKeyDown=t=>{var e;if(t.key===((e=this.props.key)==null?void 0:e.toLowerCase())){const o=this.props.active!=="true";this.setState({isActive:o}),this.dispatchEvent(new CustomEvent("change",{detail:o}))}}}onMount(){window.addEventListener("keydown",this.handleKeyDown)}onUmount(){window.removeEventListener("keydown",this.handleKeyDown)}render(){const{key:t,active:e}=this.props;return c("div",null,c("style",null,K),c("div",{class:B({active:e==="true"})},"[",t==null?void 0:t.toUpperCase(),"] ",c("slot",null)))}}customElements.define("flip-switch",V);const $=`
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
`;class z extends g{render(){const{val:t}=this.props;return c("div",null,c("style",null,$),c("div",{class:B("cell",t==null?void 0:t.toUpperCase())},(t==null?void 0:t.toUpperCase())||0,","))}}customElements.define("tetris-cell",z);const Y=`
  .row {
    line-height: 25px;
    display: flex;
  }
`;class X extends g{render(){const{last:t}=this.props;return c("div",null,c("style",null,Y),c("div",{class:"row"},"[",this.children,"] ",t==="true"?"]":","))}}customElements.define("tetris-row",X);const Q=`
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
`;class Z extends g{render(){const{grid:t}=this.props;return c("div",{id:"test"},c("style",null,Q),c("div",{class:"container"},c("div",{class:"grid-start"},"var grid = [\xA0"),c("div",null,JSON.parse(t).map((e,o)=>c("tetris-row",null,e.map(r=>c("tetris-cell",{val:String(r)})))))))}}customElements.define("tetris-grid",Z);const d=new J({onSateChange:({displayGrid:s,score:t,stopped:e})=>{var i;const o=document.querySelector("#grid");if(!o)return;o.innerHTML="";const r=c("tetris-grid",{grid:JSON.stringify(s)});o.appendChild(r);const n=document.querySelector("#score");!n||(n.innerText=t.toString(),(i=document.querySelector("#stop"))==null||i.setAttribute("active",e?"true":"false"))}});window.onload=()=>{var s,t;(s=document.querySelector("#restart"))==null||s.addEventListener("change",e=>{e instanceof CustomEvent&&d.reset()}),(t=document.querySelector("#stop"))==null||t.addEventListener("change",e=>{e instanceof CustomEvent&&(d.state.stopped?d.start():d.stop())})};document.addEventListener("keydown",s=>{switch(s.key){case"ArrowLeft":return d.move(l.LEFT);case"ArrowRight":return d.move(l.RIGHT);case"ArrowDown":return d.move(l.DOWN);case"ArrowUp":return d.move(l.ROTATE);case" ":return d.move(l.DROP)}});
