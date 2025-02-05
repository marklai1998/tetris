var P=Object.defineProperty;var M=(s,e,t)=>e in s?P(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var l=(s,e,t)=>M(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=t(r);fetch(r.href,n)}})();const w=(s,e)=>{e instanceof HTMLCollection?[...e].forEach(t=>w(s,t)):Array.isArray(e)?e.forEach(t=>w(s,t)):s.appendChild(e instanceof Node?e:document.createTextNode(e))},i=(s,e,...t)=>{const o=document.createElement(s);return Object.entries(e||{}).forEach(([r,n])=>{r.startsWith("on")&&r.toLowerCase()in window&&typeof n=="function"?o.addEventListener(r.toLowerCase().substring(2),n):o.setAttribute(r,n.toString())}),t.forEach(r=>{w(o,r)}),o};var d=(s=>(s.LEFT="LEFT",s.RIGHT="RIGHT",s.ROTATE="ROTATE",s.DOWN="DOWN",s.DROP="DROP",s.SAVE="SAVE",s))(d||{});const y={gridSize:{row:20,col:10},speed:1e3},f={I:[["I","I","I","I"],[0,0,0,0],[0,0,0,0],[0,0,0,0]],J:[["J","J",0],["J",0,0],["J",0,0]],L:[["L","L",0],[0,"L",0],[0,"L",0]],O:[["O","O"],["O","O"]],S:[["S",0,0],["S","S",0],[0,"S",0]],SR:[[0,"SR",0],["SR","SR",0],["SR",0,0]],T:[[0,"T",0],["T","T","T"],[0,0,0]]},m=()=>{const s=Object.keys(f);return{x:6,y:0,rotation:0,blockCode:s[Math.floor(Math.random()*s.length)]}},k=(s,e)=>{if(e<=0)return s;const t=s[0].map((o,r)=>s.map(n=>n[r]).reverse());return k(t,e-1)},O=s=>s.map(e=>e.map(t=>t)),b=({grid:s,block:{x:e,y:t,blockCode:o,rotation:r},override:n=!1})=>{const a=f[o],c=O(s);return k(a,r).forEach((T,B)=>{const h=t-B;T.forEach((R,A)=>{var S,x;if(!R)return;const p=e-A,D=p<0,I=p>=((S=c==null?void 0:c[h])==null?void 0:S.length),N=h>=c.length;if(D||I||N)throw new Error("OUT_OF_BOUND");if((x=c==null?void 0:c[h])!=null&&x[p]&&!n)throw new Error("OVERLAP_VALUE");h>=0&&(c[h][p]=o)})}),c},E=({row:s,col:e})=>new Array(s).fill(0).map(()=>new Array(e).fill(0)),_=s=>{const e=O(s),t=e.filter(r=>!r.every(Boolean)),o=e.length-t.length;return{removedLine:o,grid:[...E({row:o,col:s[0].length}),...t]}},v=()=>({block:m(),nextBlock:m(),grid:E(y.gridSize),savedBlock:null,stopped:!0,score:0,alreadySaved:!1});class j{constructor({onSateChange:e,initialState:t}){l(this,"clock");l(this,"_state",v());l(this,"onSateChangeCb",()=>{});l(this,"updateBlock",e=>{try{const t={...this.state.block,...e};return b({grid:this.state.grid,block:t}),this.state={...this.state,block:t},!0}catch{return!1}});l(this,"nextBlock",()=>{this.updateBlock(this.state.nextBlock)?this.state={...this.state,nextBlock:m()}:this.reset()});l(this,"tick",()=>{if(this.state={...this.state,score:this.state.score+1},this.updateBlock({y:this.state.block.y+1}))return;const{grid:e,block:t}=this.state,{grid:o,removedLine:r}=_(b({grid:e,block:t}));this.state={...this.state,score:this.state.score+r*100,grid:o,alreadySaved:!1},this.nextBlock()});l(this,"resetClockTick",()=>{clearInterval(this.clock),this.clock=void 0,this.clock=setInterval(this.tick,y.speed)});l(this,"move",e=>{if(this.state.stopped)return;const{block:{rotation:t,x:o,y:r}}=this.state;switch(e){case d.LEFT:return this.updateBlock({x:o-1});case d.RIGHT:return this.updateBlock({x:o+1});case d.DOWN:return this.updateBlock({y:r+1});case d.ROTATE:return this.updateBlock({rotation:t>=3?0:t+1});case d.DROP:{let n=!0,a=r;do n=this.updateBlock({y:a+=1});while(n);this.resetClockTick(),this.tick();break}case d.SAVE:{if(this.state.alreadySaved)return;this.state.savedBlock?this.state={...this.state,block:{...m(),blockCode:this.state.savedBlock},savedBlock:this.state.block.blockCode,alreadySaved:!0}:(this.state={...this.state,savedBlock:this.state.block.blockCode,alreadySaved:!0},this.nextBlock())}}});l(this,"start",()=>{this.clock=setInterval(this.tick,y.speed),this.state={...this.state,stopped:!1}});l(this,"stop",()=>{clearInterval(this.clock),this.clock=void 0,this.state={...this.state,stopped:!0}});l(this,"reset",()=>{this.state=v(),clearInterval(this.clock),this.clock=void 0});this.state=t,this.onSateChangeCb=e}get state(){return this._state}set state(e){this._state=e,this.onSateChangeCb(e)}}const J=(s,e)=>Object.keys(s).length===Object.keys(e).length&&Object.keys(s).every(t=>s[t]===e[t]);class u extends HTMLElement{constructor(){super(...arguments);l(this,"shadow",this.attachShadow({mode:"open"}));l(this,"state",{});l(this,"savedProps",{...this.props})}get props(){const t=this.getAttributeNames();return Object.fromEntries(t.map(o=>[o,this.getAttribute(o)]))}attributeChangedCallback(t,o,r){this.onPropsChange(t,o,r),this.rerender()}connectedCallback(){this.onMount(),this.rerender();var t=new MutationObserver(o=>{if(o.some(({type:n})=>n==="attributes")){const n=this.props;J(n,this.props)||this.rerender(),this.savedProps={...n}}});t.observe(this,{attributes:!0})}disconnectedCallback(){this.onUnmount()}rerender(){const t=this.render();this.shadow.innerHTML="",t&&this.shadow.appendChild(t)}setState(t){this.state={...this.state,...t},this.rerender()}onPropsChange(t,o,r){}onMount(){}onUnmount(){}render(){return null}}function U(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var g={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/var C;function G(){return C||(C=1,function(s){(function(){var e={}.hasOwnProperty;function t(){for(var n="",a=0;a<arguments.length;a++){var c=arguments[a];c&&(n=r(n,o(c)))}return n}function o(n){if(typeof n=="string"||typeof n=="number")return n;if(typeof n!="object")return"";if(Array.isArray(n))return t.apply(null,n);if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]"))return n.toString();var a="";for(var c in n)e.call(n,c)&&n[c]&&(a=r(a,c));return a}function r(n,a){return a?n?n+" "+a:n+a:n}s.exports?(t.default=t,s.exports=t):window.classNames=t})()}(g)),g.exports}var V=G();const L=U(V),F=`
  .active {
    color: #f44336;
  }
`;class H extends u{constructor(){super(...arguments);l(this,"handleKeyDown",t=>{var o;if(t.key===((o=this.props.key)==null?void 0:o.toLowerCase())){const r=this.props.active!=="true";this.setState({isActive:r}),this.dispatchEvent(new CustomEvent("change",{detail:r}))}})}onMount(){this.props.disabled!=="false"&&window.addEventListener("keydown",this.handleKeyDown)}onUnmount(){window.removeEventListener("keydown",this.handleKeyDown)}render(){const{key:t,active:o}=this.props;return i("div",null,i("style",null,F),i("div",{class:L({active:o==="true"})},"[",t==null?void 0:t.toUpperCase(),"] ",i("slot",null)))}}customElements.define("flip-switch",H);const W=`
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
`;class K extends u{render(){const{val:e}=this.props;return i("div",null,i("style",null,W),i("div",{class:L("cell",e==null?void 0:e.toUpperCase())},(e==null?void 0:e.toUpperCase())||0,","))}}customElements.define("tetris-cell",K);const $=`
  .row {
    display: flex;
  }
`;class q extends u{render(){return i("div",null,i("style",null,$),i("div",{class:"row"},"[",this.children,"]"))}}customElements.define("tetris-row",q);const z=`
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
`;class Y extends u{render(){const{grid:e,name:t}=this.props,o=JSON.parse(e);return i("div",null,i("style",null,z),i("div",{class:"container"},i("div",{class:"grid-start"},"var ",t," = [ "),i("div",null,o.map((r,n)=>i("div",{class:"row-wrapper"},r.length?i("tetris-row",null,r.map(a=>i("tetris-cell",{val:String(a)}))):i("div",null),i("span",{class:"suffix"},n===o.length-1?"]":","))))))}}customElements.define("tetris-grid",Y);const X=`
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
`;class Q extends u{constructor(){super(...arguments);l(this,"state",{tetris:null,tetrisState:v()});l(this,"handleRestart",()=>{var t;(t=this.state.tetris)==null||t.reset()});l(this,"handleStartStop",()=>{var t,o;this.state.tetrisState.stopped?(t=this.state.tetris)==null||t.start():(o=this.state.tetris)==null||o.stop()});l(this,"handleSave",()=>{var t;(t=this.state.tetris)==null||t.move(d.SAVE)})}onMount(){const t=v();this.setState({tetris:new j({onSateChange:o=>{this.setState({tetrisState:o})},initialState:t}),tetrisState:t}),document.addEventListener("keydown",o=>{const{tetris:r}=this.state;if(r)switch(o.key){case"ArrowLeft":return r.move(d.LEFT);case"ArrowRight":return r.move(d.RIGHT);case"ArrowDown":return r.move(d.DOWN);case"ArrowUp":return r.move(d.ROTATE);case" ":return r.move(d.DROP)}})}render(){const{tetrisState:t}=this.state,o=b({grid:t.grid,block:t.block,override:!0}),r=k(f[t.nextBlock.blockCode],2),n=t.savedBlock?k(f[t.savedBlock],2):[[]];return i("div",{id:"app"},i("style",null,X),i("div",{class:"row"},i("h1",null,"Tetris")),i("div",{class:"row"},i("div",null,i("tetris-grid",{grid:JSON.stringify(o),name:"grid"})),i("div",{class:"control"},i("tetris-grid",{grid:JSON.stringify(r),name:"next"}),i("tetris-grid",{grid:JSON.stringify(n),name:"saved"}),i("div",null,i("h3",null,"Score"),i("div",{class:"score"},t.score),i("h3",null,"Help"),i("flip-switch",{key:"S",active:t.stopped?"true":"false",onChange:this.handleStartStop},"Start/Stop"),i("flip-switch",{key:"R",onChange:this.handleRestart},"Restart"),i("flip-switch",{key:"←",disabled:"true"},"Left"),i("flip-switch",{key:"↑",disabled:"true"},"Rotate"),i("flip-switch",{key:"→",disabled:"true"},"Right"),i("flip-switch",{key:"↓",disabled:"true"},"Down"),i("flip-switch",{key:"space",disabled:"true"},"Drop to bottom"),i("flip-switch",{key:"C",onChange:this.handleSave,active:t.alreadySaved?"true":"false"},"Save Block")))))}}customElements.define("main-app",Q);
