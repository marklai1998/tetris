var P=Object.defineProperty;var M=(s,e,t)=>e in s?P(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var a=(s,e,t)=>(M(s,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();const g=(s,e)=>{e instanceof HTMLCollection?[...e].forEach(t=>g(s,t)):Array.isArray(e)?e.forEach(t=>g(s,t)):s.appendChild(e instanceof Node?e:document.createTextNode(e))},n=(s,e,...t)=>{const o=document.createElement(s);return Object.entries(e||{}).forEach(([r,i])=>{r.startsWith("on")&&r.toLowerCase()in window&&typeof i=="function"?o.addEventListener(r.toLowerCase().substring(2),i):o.setAttribute(r,i.toString())}),t.forEach(r=>{g(o,r)}),o};var c=(s=>(s.LEFT="LEFT",s.RIGHT="RIGHT",s.ROTATE="ROTATE",s.DOWN="DOWN",s.DROP="DROP",s.SAVE="SAVE",s))(c||{});const b={gridSize:{row:20,col:10},speed:1e3},v={I:[["I","I","I","I"],[0,0,0,0],[0,0,0,0],[0,0,0,0]],J:[["J","J",0],["J",0,0],["J",0,0]],L:[["L","L",0],[0,"L",0],[0,"L",0]],O:[["O","O"],["O","O"]],S:[["S",0,0],["S","S",0],[0,"S",0]],SR:[[0,"SR",0],["SR","SR",0],["SR",0,0]],T:[[0,"T",0],["T","T","T"],[0,0,0]]},k=()=>{const s=Object.keys(v);return{x:6,y:0,rotation:0,blockCode:s[Math.floor(Math.random()*s.length)]}},w=(s,e)=>{if(e<=0)return s;const t=s[0].map((o,r)=>s.map(i=>i[r]).reverse());return w(t,e-1)},O=s=>s.map(e=>e.map(t=>t)),y=({grid:s,block:{x:e,y:t,blockCode:o,rotation:r},override:i=!1})=>{const l=v[o],d=O(s);return w(l,r).forEach((T,B)=>{const h=t-B;T.forEach((R,A)=>{var S,x;if(!R)return;const f=e-A,D=f<0,I=f>=((S=d==null?void 0:d[h])==null?void 0:S.length),N=h>=d.length;if(D||I||N)throw new Error("OUT_OF_BOUND");if((x=d==null?void 0:d[h])!=null&&x[f]&&!i)throw new Error("OVERLAP_VALUE");h>=0&&(d[h][f]=o)})}),d},C=({row:s,col:e})=>new Array(s).fill(0).map(()=>new Array(e).fill(0)),_=s=>{const e=O(s),t=e.filter(r=>!r.every(Boolean)),o=e.length-t.length;return{removedLine:o,grid:[...C({row:o,col:s[0].length}),...t]}},m=()=>({block:k(),nextBlock:k(),grid:C(b.gridSize),savedBlock:null,stopped:!0,score:0,alreadySaved:!1});class j{constructor({onSateChange:e,initialState:t}){a(this,"clock");a(this,"_state",m());a(this,"onSateChangeCb",()=>{});a(this,"updateBlock",e=>{try{const t={...this.state.block,...e};return y({grid:this.state.grid,block:t}),this.state={...this.state,block:t},!0}catch{return!1}});a(this,"nextBlock",()=>{this.updateBlock(this.state.nextBlock)?this.state={...this.state,nextBlock:k()}:this.reset()});a(this,"tick",()=>{if(this.state={...this.state,score:this.state.score+1},this.updateBlock({y:this.state.block.y+1}))return;const{grid:e,block:t}=this.state,{grid:o,removedLine:r}=_(y({grid:e,block:t}));this.state={...this.state,score:this.state.score+r*100,grid:o,alreadySaved:!1},this.nextBlock()});a(this,"resetClockTick",()=>{clearInterval(this.clock),this.clock=void 0,this.clock=setInterval(this.tick,b.speed)});a(this,"move",e=>{if(this.state.stopped)return;const{block:{rotation:t,x:o,y:r}}=this.state;switch(e){case c.LEFT:return this.updateBlock({x:o-1});case c.RIGHT:return this.updateBlock({x:o+1});case c.DOWN:return this.updateBlock({y:r+1});case c.ROTATE:return this.updateBlock({rotation:t>=3?0:t+1});case c.DROP:{let i=!0,l=r;do i=this.updateBlock({y:l+=1});while(i);this.resetClockTick(),this.tick();break}case c.SAVE:{if(this.state.alreadySaved)return;this.state.savedBlock?this.state={...this.state,block:{...k(),blockCode:this.state.savedBlock},savedBlock:this.state.block.blockCode,alreadySaved:!0}:(this.state={...this.state,savedBlock:this.state.block.blockCode,alreadySaved:!0},this.nextBlock())}}});a(this,"start",()=>{this.clock=setInterval(this.tick,b.speed),this.state={...this.state,stopped:!1}});a(this,"stop",()=>{clearInterval(this.clock),this.clock=void 0,this.state={...this.state,stopped:!0}});a(this,"reset",()=>{this.state=m(),clearInterval(this.clock),this.clock=void 0});this.state=t,this.onSateChangeCb=e}get state(){return this._state}set state(e){this._state=e,this.onSateChangeCb(e)}}const J=(s,e)=>Object.keys(s).length===Object.keys(e).length&&Object.keys(s).every(t=>s[t]===e[t]);class p extends HTMLElement{constructor(){super(...arguments);a(this,"shadow",this.attachShadow({mode:"open"}));a(this,"state",{});a(this,"savedProps",{...this.props})}get props(){const t=this.getAttributeNames();return Object.fromEntries(t.map(o=>[o,this.getAttribute(o)]))}attributeChangedCallback(t,o,r){this.onPropsChange(t,o,r),this.rerender()}connectedCallback(){this.onMount(),this.rerender();var t=new MutationObserver(o=>{if(o.some(({type:i})=>i==="attributes")){const i=this.props;J(i,this.props)||this.rerender(),this.savedProps={...i}}});t.observe(this,{attributes:!0})}disconnectedCallback(){this.onUnmount()}rerender(){const t=this.render();this.shadow.innerHTML="",t&&this.shadow.appendChild(t)}setState(t){this.state={...this.state,...t},this.rerender()}onPropsChange(t,o,r){}onMount(){}onUnmount(){}render(){return null}}function U(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var E={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(s){(function(){var e={}.hasOwnProperty;function t(){for(var o=[],r=0;r<arguments.length;r++){var i=arguments[r];if(i){var l=typeof i;if(l==="string"||l==="number")o.push(i);else if(Array.isArray(i)){if(i.length){var d=t.apply(null,i);d&&o.push(d)}}else if(l==="object"){if(i.toString!==Object.prototype.toString&&!i.toString.toString().includes("[native code]")){o.push(i.toString());continue}for(var u in i)e.call(i,u)&&i[u]&&o.push(u)}}}return o.join(" ")}s.exports?(t.default=t,s.exports=t):window.classNames=t})()})(E);var G=E.exports;const L=U(G),F=`
  .active {
    color: #f44336;
  }
`;class H extends p{constructor(){super(...arguments);a(this,"handleKeyDown",t=>{var o;if(t.key===((o=this.props.key)==null?void 0:o.toLowerCase())){const r=this.props.active!=="true";this.setState({isActive:r}),this.dispatchEvent(new CustomEvent("change",{detail:r}))}})}onMount(){this.props.disabled!=="false"&&window.addEventListener("keydown",this.handleKeyDown)}onUnmount(){window.removeEventListener("keydown",this.handleKeyDown)}render(){const{key:t,active:o}=this.props;return n("div",null,n("style",null,F),n("div",{class:L({active:o==="true"})},"[",t==null?void 0:t.toUpperCase(),"] ",n("slot",null)))}}customElements.define("flip-switch",H);const V=`
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
`;class W extends p{render(){const{val:e}=this.props;return n("div",null,n("style",null,V),n("div",{class:L("cell",e==null?void 0:e.toUpperCase())},(e==null?void 0:e.toUpperCase())||0,","))}}customElements.define("tetris-cell",W);const K=`
  .row {
    display: flex;
  }
`;class $ extends p{render(){return n("div",null,n("style",null,K),n("div",{class:"row"},"[",this.children,"]"))}}customElements.define("tetris-row",$);const z=`
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
`;class Y extends p{render(){const{grid:e,name:t}=this.props,o=JSON.parse(e);return n("div",null,n("style",null,z),n("div",{class:"container"},n("div",{class:"grid-start"},"var ",t," = [ "),n("div",null,o.map((r,i)=>n("div",{class:"row-wrapper"},r.length?n("tetris-row",null,r.map(l=>n("tetris-cell",{val:String(l)}))):n("div",null),n("span",{class:"suffix"},i===o.length-1?"]":","))))))}}customElements.define("tetris-grid",Y);const q=`
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
`;class X extends p{constructor(){super(...arguments);a(this,"state",{tetris:null,tetrisState:m()});a(this,"handleRestart",()=>{var t;(t=this.state.tetris)==null||t.reset()});a(this,"handleStartStop",()=>{var t,o;this.state.tetrisState.stopped?(t=this.state.tetris)==null||t.start():(o=this.state.tetris)==null||o.stop()});a(this,"handleSave",()=>{var t;(t=this.state.tetris)==null||t.move(c.SAVE)})}onMount(){const t=m();this.setState({tetris:new j({onSateChange:o=>{this.setState({tetrisState:o})},initialState:t}),tetrisState:t}),document.addEventListener("keydown",o=>{const{tetris:r}=this.state;if(r)switch(o.key){case"ArrowLeft":return r.move(c.LEFT);case"ArrowRight":return r.move(c.RIGHT);case"ArrowDown":return r.move(c.DOWN);case"ArrowUp":return r.move(c.ROTATE);case" ":return r.move(c.DROP)}})}render(){const{tetrisState:t}=this.state,o=y({grid:t.grid,block:t.block,override:!0}),r=w(v[t.nextBlock.blockCode],2),i=t.savedBlock?w(v[t.savedBlock],2):[[]];return n("div",{id:"app"},n("style",null,q),n("div",{class:"row"},n("h1",null,"Tetris")),n("div",{class:"row"},n("div",null,n("tetris-grid",{grid:JSON.stringify(o),name:"grid"})),n("div",{class:"control"},n("tetris-grid",{grid:JSON.stringify(r),name:"next"}),n("tetris-grid",{grid:JSON.stringify(i),name:"saved"}),n("div",null,n("h3",null,"Score"),n("div",{class:"score"},t.score),n("h3",null,"Help"),n("flip-switch",{key:"S",active:t.stopped?"true":"false",onChange:this.handleStartStop},"Start/Stop"),n("flip-switch",{key:"R",onChange:this.handleRestart},"Restart"),n("flip-switch",{key:"←",disabled:"true"},"Left"),n("flip-switch",{key:"↑",disabled:"true"},"Rotate"),n("flip-switch",{key:"→",disabled:"true"},"Right"),n("flip-switch",{key:"↓",disabled:"true"},"Down"),n("flip-switch",{key:"space",disabled:"true"},"Drop to bottom"),n("flip-switch",{key:"C",onChange:this.handleSave,active:t.alreadySaved?"true":"false"},"Save Block")))))}}customElements.define("main-app",X);
