var J=Object.defineProperty,U=Object.defineProperties;var G=Object.getOwnPropertyDescriptors;var O=Object.getOwnPropertySymbols;var H=Object.prototype.hasOwnProperty,V=Object.prototype.propertyIsEnumerable;var E=(s,t,e)=>t in s?J(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,l=(s,t)=>{for(var e in t||(t={}))H.call(t,e)&&E(s,e,t[e]);if(O)for(var e of O(t))V.call(t,e)&&E(s,e,t[e]);return s},h=(s,t)=>U(s,G(t));const F=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=e(r);fetch(r.href,n)}};F();const b=(s,t)=>{t instanceof HTMLCollection?[...t].forEach(e=>b(s,e)):Array.isArray(t)?t.forEach(e=>b(s,e)):s.appendChild(t instanceof Node?t:document.createTextNode(t))},o=(s,t,...e)=>{const i=document.createElement(s);return Object.entries(t||{}).forEach(([r,n])=>{r.startsWith("on")&&r.toLowerCase()in window&&typeof n=="function"?i.addEventListener(r.toLowerCase().substring(2),n):i.setAttribute(r,n.toString())}),e.forEach(r=>{b(i,r)}),i};var d=(s=>(s.LEFT="LEFT",s.RIGHT="RIGHT",s.ROTATE="ROTATE",s.DOWN="DOWN",s.DROP="DROP",s.SAVE="SAVE",s))(d||{});const y={gridSize:{row:20,col:10},speed:1e3},k={I:[["I","I","I","I"],[0,0,0,0],[0,0,0,0],[0,0,0,0]],J:[["J","J",0],["J",0,0],["J",0,0]],L:[["L","L",0],[0,"L",0],[0,"L",0]],O:[["O","O"],["O","O"]],S:[["S",0,0],["S","S",0],[0,"S",0]],SR:[[0,"SR",0],["SR","SR",0],["SR",0,0]],T:[[0,"T",0],["T","T","T"],[0,0,0]]},m=()=>{const s=Object.keys(k),t=s[Math.floor(Math.random()*s.length)];return{x:6,y:0,rotation:0,blockCode:t}},g=(s,t)=>{if(t<=0)return s;const e=s[0].map((i,r)=>s.map(n=>n[r]).reverse());return g(e,t-1)},L=s=>s.map(t=>t.map(e=>e)),x=({grid:s,block:{x:t,y:e,blockCode:i,rotation:r},override:n=!1})=>{const a=k[i],c=L(s);return g(a,r).forEach((A,D)=>{const p=e-D;A.forEach((I,N)=>{var S,C;if(!I)return;const v=t-N,P=v<0,M=v>=((S=c==null?void 0:c[p])==null?void 0:S.length),j=p>=c.length;if(P||M||j)throw new Error("OUT_OF_BOUND");if(((C=c==null?void 0:c[p])==null?void 0:C[v])&&!n)throw new Error("OVERLAP_VALUE");p>=0&&(c[p][v]=i)})}),c},T=({row:s,col:t})=>new Array(s).fill(0).map(()=>new Array(t).fill(0)),_=s=>{const t=L(s),e=t.filter(r=>!r.every(Boolean)),i=t.length-e.length;return{removedLine:i,grid:[...T({row:i,col:s[0].length}),...e]}},w=()=>({block:m(),nextBlock:m(),grid:T(y.gridSize),savedBlock:null,stopped:!0,score:0,alreadySaved:!1});class W{constructor({onSateChange:t,initialState:e}){this._state=w(),this.onSateChangeCb=()=>{},this.updateBlock=i=>{try{const r=l(l({},this.state.block),i);return x({grid:this.state.grid,block:r}),this.state=h(l({},this.state),{block:r}),!0}catch{return!1}},this.nextBlock=()=>{this.updateBlock(this.state.nextBlock)?this.state=h(l({},this.state),{nextBlock:m()}):this.reset()},this.tick=()=>{if(this.state=h(l({},this.state),{score:this.state.score+1}),this.updateBlock({y:this.state.block.y+1}))return;const{grid:i,block:r}=this.state,{grid:n,removedLine:a}=_(x({grid:i,block:r}));this.state=h(l({},this.state),{score:this.state.score+a*100,grid:n,alreadySaved:!1}),this.nextBlock()},this.resetClockTick=()=>{clearInterval(this.clock),this.clock=void 0,this.clock=setInterval(this.tick,y.speed)},this.move=i=>{if(this.state.stopped)return;const{block:{rotation:r,x:n,y:a}}=this.state;switch(i){case d.LEFT:return this.updateBlock({x:n-1});case d.RIGHT:return this.updateBlock({x:n+1});case d.DOWN:return this.updateBlock({y:a+1});case d.ROTATE:return this.updateBlock({rotation:r>=3?0:r+1});case d.DROP:{let c=!0,u=a;do c=this.updateBlock({y:u+=1});while(c);this.resetClockTick(),this.tick();break}case d.SAVE:{if(this.state.alreadySaved)return;this.state.savedBlock?this.state=h(l({},this.state),{block:h(l({},m()),{blockCode:this.state.savedBlock}),savedBlock:this.state.block.blockCode,alreadySaved:!0}):(this.state=h(l({},this.state),{savedBlock:this.state.block.blockCode,alreadySaved:!0}),this.nextBlock())}}},this.start=()=>{this.clock=setInterval(this.tick,y.speed),this.state=h(l({},this.state),{stopped:!1})},this.stop=()=>{clearInterval(this.clock),this.clock=void 0,this.state=h(l({},this.state),{stopped:!0})},this.reset=()=>{this.state=w(),clearInterval(this.clock),this.clock=void 0},this.state=e,this.onSateChangeCb=t}get state(){return this._state}set state(t){this._state=t,this.onSateChangeCb(t)}}const K=(s,t)=>Object.keys(s).length===Object.keys(t).length&&Object.keys(s).every(e=>s[e]===t[e]);class f extends HTMLElement{constructor(){super(...arguments),this.shadow=this.attachShadow({mode:"open"}),this.state={},this.savedProps=l({},this.props)}get props(){const t=this.getAttributeNames();return Object.fromEntries(t.map(e=>[e,this.getAttribute(e)]))}attributeChangedCallback(t,e,i){this.onPropsChange(t,e,i),this.rerender()}connectedCallback(){this.onMount(),this.rerender();var t=new MutationObserver(e=>{if(e.some(({type:r})=>r==="attributes")){const r=this.props;K(r,this.props)||this.rerender(),this.savedProps=l({},r)}});t.observe(this,{attributes:!0})}disconnectedCallback(){this.onUnmount()}rerender(){const t=this.render();this.shadow.innerHTML="",t&&this.shadow.appendChild(t)}setState(t){this.state=l(l({},this.state),t),this.rerender()}onPropsChange(t,e,i){}onMount(){}onUnmount(){}render(){return null}}var B={exports:{}};/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/(function(s){(function(){var t={}.hasOwnProperty;function e(){for(var i=[],r=0;r<arguments.length;r++){var n=arguments[r];if(!!n){var a=typeof n;if(a==="string"||a==="number")i.push(n);else if(Array.isArray(n)){if(n.length){var c=e.apply(null,n);c&&i.push(c)}}else if(a==="object")if(n.toString===Object.prototype.toString)for(var u in n)t.call(n,u)&&n[u]&&i.push(u);else i.push(n.toString())}}return i.join(" ")}s.exports?(e.default=e,s.exports=e):window.classNames=e})()})(B);var R=B.exports;const $=`
  .active {
    color: #f44336;
  }
`;class z extends f{constructor(){super(...arguments),this.handleKeyDown=t=>{var e;if(t.key===((e=this.props.key)==null?void 0:e.toLowerCase())){const i=this.props.active!=="true";this.setState({isActive:i}),this.dispatchEvent(new CustomEvent("change",{detail:i}))}}}onMount(){this.props.disabled!=="false"&&window.addEventListener("keydown",this.handleKeyDown)}onUnmount(){window.removeEventListener("keydown",this.handleKeyDown)}render(){const{key:t,active:e}=this.props;return o("div",null,o("style",null,$),o("div",{class:R({active:e==="true"})},"[",t==null?void 0:t.toUpperCase(),"] ",o("slot",null)))}}customElements.define("flip-switch",z);const Y=`
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
`;class q extends f{render(){const{val:t}=this.props;return o("div",null,o("style",null,Y),o("div",{class:R("cell",t==null?void 0:t.toUpperCase())},(t==null?void 0:t.toUpperCase())||0,","))}}customElements.define("tetris-cell",q);const X=`
  .row {
    display: flex;
  }
`;class Q extends f{render(){return o("div",null,o("style",null,X),o("div",{class:"row"},"[",this.children,"]"))}}customElements.define("tetris-row",Q);const Z=`
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
  
  .row-wrapper {
    display: flex;
    line-height: 25px;
    flex-shrink: 0;
  }

  .suffix {
    margin-left: 4px
  }
`;class tt extends f{render(){const{grid:t,name:e}=this.props,i=JSON.parse(t);return o("div",null,o("style",null,Z),o("div",{class:"container"},o("div",{class:"grid-start"},"var ",e," = [\xA0"),o("div",null,i.map((r,n)=>o("div",{class:"row-wrapper"},r.length?o("tetris-row",null,r.map(a=>o("tetris-cell",{val:String(a)}))):o("div",null),o("span",{class:"suffix"},n===i.length-1?"]":","))))))}}customElements.define("tetris-grid",tt);const et=`
  h1 {
    display: inline-block;
  }

  h4 {
    display: inline-block;
  }
  
  h3 {  
    margin: 16px 0 8px 0;
  }
  

  .row {
    display: flex;
    justify-content: center;
  }

  .score{
    margin-bottom: 16px;
  }

  .header {
    margin: 50px 0;
  }

  .control {
    margin-left: 16px;
    min-width: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;class st extends f{constructor(){super(...arguments),this.state={tetris:null,tetrisState:w()},this.handleRestart=()=>{var t;(t=this.state.tetris)==null||t.reset()},this.handleStartStop=()=>{var t,e;this.state.tetrisState.stopped?(t=this.state.tetris)==null||t.start():(e=this.state.tetris)==null||e.stop()},this.handleSave=()=>{var t;(t=this.state.tetris)==null||t.move(d.SAVE)}}onMount(){const t=w();this.setState({tetris:new W({onSateChange:e=>{this.setState({tetrisState:e})},initialState:t}),tetrisState:t}),document.addEventListener("keydown",e=>{const{tetris:i}=this.state;if(!!i)switch(e.key){case"ArrowLeft":return i.move(d.LEFT);case"ArrowRight":return i.move(d.RIGHT);case"ArrowDown":return i.move(d.DOWN);case"ArrowUp":return i.move(d.ROTATE);case" ":return i.move(d.DROP)}})}render(){const{tetrisState:t}=this.state,e=x({grid:t.grid,block:t.block,override:!0}),i=g(k[t.nextBlock.blockCode],2),r=t.savedBlock?g(k[t.savedBlock],2):[[]];return o("div",{id:"app"},o("style",null,et),o("div",{class:"row"},o("h1",null,"Tetris")),o("div",{class:"row"},o("div",null,o("tetris-grid",{grid:JSON.stringify(e),name:"grid"})),o("div",{class:"control"},o("tetris-grid",{grid:JSON.stringify(i),name:"next"}),o("tetris-grid",{grid:JSON.stringify(r),name:"saved"}),o("div",null,o("h3",null,"Score"),o("div",{class:"score"},t.score),o("h3",null,"Help"),o("flip-switch",{key:"S",active:t.stopped?"true":"false",onChange:this.handleStartStop},"Start/Stop"),o("flip-switch",{key:"R",onChange:this.handleRestart},"Restart"),o("flip-switch",{key:"\u2190",disabled:"true"},"Left"),o("flip-switch",{key:"\u2191",disabled:"true"},"Rotate"),o("flip-switch",{key:"\u2192",disabled:"true"},"Right"),o("flip-switch",{key:"\u2193",disabled:"true"},"Down"),o("flip-switch",{key:"space",disabled:"true"},"Drop to bottom"),o("flip-switch",{key:"C",onChange:this.handleSave,active:t.alreadySaved?"true":"false"},"Save Block")))))}}customElements.define("main-app",st);
