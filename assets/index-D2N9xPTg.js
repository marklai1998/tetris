var N=Object.defineProperty;var P=(s,e,t)=>e in s?N(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var l=(s,e,t)=>(P(s,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();const g=(s,e)=>{e instanceof HTMLCollection?[...e].forEach(t=>g(s,t)):Array.isArray(e)?e.forEach(t=>g(s,t)):s.appendChild(e instanceof Node?e:document.createTextNode(e))},n=(s,e,...t)=>{const i=document.createElement(s);return Object.entries(e||{}).forEach(([r,o])=>{r.startsWith("on")&&r.toLowerCase()in window&&typeof o=="function"?i.addEventListener(r.toLowerCase().substring(2),o):i.setAttribute(r,o.toString())}),t.forEach(r=>{g(i,r)}),i};var d=(s=>(s.LEFT="LEFT",s.RIGHT="RIGHT",s.ROTATE="ROTATE",s.DOWN="DOWN",s.DROP="DROP",s.SAVE="SAVE",s))(d||{});const w={gridSize:{row:20,col:10},speed:1e3},f={I:[["I","I","I","I"],[0,0,0,0],[0,0,0,0],[0,0,0,0]],J:[["J","J",0],["J",0,0],["J",0,0]],L:[["L","L",0],[0,"L",0],[0,"L",0]],O:[["O","O"],["O","O"]],S:[["S",0,0],["S","S",0],[0,"S",0]],SR:[[0,"SR",0],["SR","SR",0],["SR",0,0]],T:[[0,"T",0],["T","T","T"],[0,0,0]]},v=()=>{const s=Object.keys(f);return{x:6,y:0,rotation:0,blockCode:s[Math.floor(Math.random()*s.length)]}},k=(s,e)=>{if(e<=0)return s;const t=s[0].map((i,r)=>s.map(o=>o[r]).reverse());return k(t,e-1)},x=s=>s.map(e=>e.map(t=>t)),y=({grid:s,block:{x:e,y:t,blockCode:i,rotation:r},override:o=!1})=>{const a=f[i],c=x(s);return k(a,r).forEach((L,T)=>{const h=t-T;L.forEach((B,R)=>{var b,S;if(!B)return;const u=e-R,A=u<0,D=u>=((b=c==null?void 0:c[h])==null?void 0:b.length),I=h>=c.length;if(A||D||I)throw new Error("OUT_OF_BOUND");if((S=c==null?void 0:c[h])!=null&&S[u]&&!o)throw new Error("OVERLAP_VALUE");h>=0&&(c[h][u]=i)})}),c},O=({row:s,col:e})=>new Array(s).fill(0).map(()=>new Array(e).fill(0)),M=s=>{const e=x(s),t=e.filter(r=>!r.every(Boolean)),i=e.length-t.length;return{removedLine:i,grid:[...O({row:i,col:s[0].length}),...t]}},m=()=>({block:v(),nextBlock:v(),grid:O(w.gridSize),savedBlock:null,stopped:!0,score:0,alreadySaved:!1});class _{constructor({onSateChange:e,initialState:t}){l(this,"clock");l(this,"_state",m());l(this,"onSateChangeCb",()=>{});l(this,"updateBlock",e=>{try{const t={...this.state.block,...e};return y({grid:this.state.grid,block:t}),this.state={...this.state,block:t},!0}catch{return!1}});l(this,"nextBlock",()=>{this.updateBlock(this.state.nextBlock)?this.state={...this.state,nextBlock:v()}:this.reset()});l(this,"tick",()=>{if(this.state={...this.state,score:this.state.score+1},this.updateBlock({y:this.state.block.y+1}))return;const{grid:e,block:t}=this.state,{grid:i,removedLine:r}=M(y({grid:e,block:t}));this.state={...this.state,score:this.state.score+r*100,grid:i,alreadySaved:!1},this.nextBlock()});l(this,"resetClockTick",()=>{clearInterval(this.clock),this.clock=void 0,this.clock=setInterval(this.tick,w.speed)});l(this,"move",e=>{if(this.state.stopped)return;const{block:{rotation:t,x:i,y:r}}=this.state;switch(e){case d.LEFT:return this.updateBlock({x:i-1});case d.RIGHT:return this.updateBlock({x:i+1});case d.DOWN:return this.updateBlock({y:r+1});case d.ROTATE:return this.updateBlock({rotation:t>=3?0:t+1});case d.DROP:{let o=!0,a=r;do o=this.updateBlock({y:a+=1});while(o);this.resetClockTick(),this.tick();break}case d.SAVE:{if(this.state.alreadySaved)return;this.state.savedBlock?this.state={...this.state,block:{...v(),blockCode:this.state.savedBlock},savedBlock:this.state.block.blockCode,alreadySaved:!0}:(this.state={...this.state,savedBlock:this.state.block.blockCode,alreadySaved:!0},this.nextBlock())}}});l(this,"start",()=>{this.clock=setInterval(this.tick,w.speed),this.state={...this.state,stopped:!1}});l(this,"stop",()=>{clearInterval(this.clock),this.clock=void 0,this.state={...this.state,stopped:!0}});l(this,"reset",()=>{this.state=m(),clearInterval(this.clock),this.clock=void 0});this.state=t,this.onSateChangeCb=e}get state(){return this._state}set state(e){this._state=e,this.onSateChangeCb(e)}}const j=(s,e)=>Object.keys(s).length===Object.keys(e).length&&Object.keys(s).every(t=>s[t]===e[t]);class p extends HTMLElement{constructor(){super(...arguments);l(this,"shadow",this.attachShadow({mode:"open"}));l(this,"state",{});l(this,"savedProps",{...this.props})}get props(){const t=this.getAttributeNames();return Object.fromEntries(t.map(i=>[i,this.getAttribute(i)]))}attributeChangedCallback(t,i,r){this.onPropsChange(t,i,r),this.rerender()}connectedCallback(){this.onMount(),this.rerender();var t=new MutationObserver(i=>{if(i.some(({type:o})=>o==="attributes")){const o=this.props;j(o,this.props)||this.rerender(),this.savedProps={...o}}});t.observe(this,{attributes:!0})}disconnectedCallback(){this.onUnmount()}rerender(){const t=this.render();this.shadow.innerHTML="",t&&this.shadow.appendChild(t)}setState(t){this.state={...this.state,...t},this.rerender()}onPropsChange(t,i,r){}onMount(){}onUnmount(){}render(){return null}}function J(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var C={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(s){(function(){var e={}.hasOwnProperty;function t(){for(var o="",a=0;a<arguments.length;a++){var c=arguments[a];c&&(o=r(o,i(c)))}return o}function i(o){if(typeof o=="string"||typeof o=="number")return o;if(typeof o!="object")return"";if(Array.isArray(o))return t.apply(null,o);if(o.toString!==Object.prototype.toString&&!o.toString.toString().includes("[native code]"))return o.toString();var a="";for(var c in o)e.call(o,c)&&o[c]&&(a=r(a,c));return a}function r(o,a){return a?o?o+" "+a:o+a:o}s.exports?(t.default=t,s.exports=t):window.classNames=t})()})(C);var U=C.exports;const E=J(U),G=`
  .active {
    color: #f44336;
  }
`;class V extends p{constructor(){super(...arguments);l(this,"handleKeyDown",t=>{var i;if(t.key===((i=this.props.key)==null?void 0:i.toLowerCase())){const r=this.props.active!=="true";this.setState({isActive:r}),this.dispatchEvent(new CustomEvent("change",{detail:r}))}})}onMount(){this.props.disabled!=="false"&&window.addEventListener("keydown",this.handleKeyDown)}onUnmount(){window.removeEventListener("keydown",this.handleKeyDown)}render(){const{key:t,active:i}=this.props;return n("div",null,n("style",null,G),n("div",{class:E({active:i==="true"})},"[",t==null?void 0:t.toUpperCase(),"] ",n("slot",null)))}}customElements.define("flip-switch",V);const F=`
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
`;class H extends p{render(){const{val:e}=this.props;return n("div",null,n("style",null,F),n("div",{class:E("cell",e==null?void 0:e.toUpperCase())},(e==null?void 0:e.toUpperCase())||0,","))}}customElements.define("tetris-cell",H);const W=`
  .row {
    display: flex;
  }
`;class K extends p{render(){return n("div",null,n("style",null,W),n("div",{class:"row"},"[",this.children,"]"))}}customElements.define("tetris-row",K);const $=`
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
`;class z extends p{render(){const{grid:e,name:t}=this.props,i=JSON.parse(e);return n("div",null,n("style",null,$),n("div",{class:"container"},n("div",{class:"grid-start"},"var ",t," = [ "),n("div",null,i.map((r,o)=>n("div",{class:"row-wrapper"},r.length?n("tetris-row",null,r.map(a=>n("tetris-cell",{val:String(a)}))):n("div",null),n("span",{class:"suffix"},o===i.length-1?"]":","))))))}}customElements.define("tetris-grid",z);const Y=`
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
`;class q extends p{constructor(){super(...arguments);l(this,"state",{tetris:null,tetrisState:m()});l(this,"handleRestart",()=>{var t;(t=this.state.tetris)==null||t.reset()});l(this,"handleStartStop",()=>{var t,i;this.state.tetrisState.stopped?(t=this.state.tetris)==null||t.start():(i=this.state.tetris)==null||i.stop()});l(this,"handleSave",()=>{var t;(t=this.state.tetris)==null||t.move(d.SAVE)})}onMount(){const t=m();this.setState({tetris:new _({onSateChange:i=>{this.setState({tetrisState:i})},initialState:t}),tetrisState:t}),document.addEventListener("keydown",i=>{const{tetris:r}=this.state;if(r)switch(i.key){case"ArrowLeft":return r.move(d.LEFT);case"ArrowRight":return r.move(d.RIGHT);case"ArrowDown":return r.move(d.DOWN);case"ArrowUp":return r.move(d.ROTATE);case" ":return r.move(d.DROP)}})}render(){const{tetrisState:t}=this.state,i=y({grid:t.grid,block:t.block,override:!0}),r=k(f[t.nextBlock.blockCode],2),o=t.savedBlock?k(f[t.savedBlock],2):[[]];return n("div",{id:"app"},n("style",null,Y),n("div",{class:"row"},n("h1",null,"Tetris")),n("div",{class:"row"},n("div",null,n("tetris-grid",{grid:JSON.stringify(i),name:"grid"})),n("div",{class:"control"},n("tetris-grid",{grid:JSON.stringify(r),name:"next"}),n("tetris-grid",{grid:JSON.stringify(o),name:"saved"}),n("div",null,n("h3",null,"Score"),n("div",{class:"score"},t.score),n("h3",null,"Help"),n("flip-switch",{key:"S",active:t.stopped?"true":"false",onChange:this.handleStartStop},"Start/Stop"),n("flip-switch",{key:"R",onChange:this.handleRestart},"Restart"),n("flip-switch",{key:"←",disabled:"true"},"Left"),n("flip-switch",{key:"↑",disabled:"true"},"Rotate"),n("flip-switch",{key:"→",disabled:"true"},"Right"),n("flip-switch",{key:"↓",disabled:"true"},"Down"),n("flip-switch",{key:"space",disabled:"true"},"Drop to bottom"),n("flip-switch",{key:"C",onChange:this.handleSave,active:t.alreadySaved?"true":"false"},"Save Block")))))}}customElements.define("main-app",q);
