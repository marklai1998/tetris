var P=Object.defineProperty;var M=(r,e,t)=>e in r?P(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var a=(r,e,t)=>(M(r,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerpolicy&&(i.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?i.credentials="include":s.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const m=(r,e)=>{e instanceof HTMLCollection?[...e].forEach(t=>m(r,t)):Array.isArray(e)?e.forEach(t=>m(r,t)):r.appendChild(e instanceof Node?e:document.createTextNode(e))},n=(r,e,...t)=>{const o=document.createElement(r);return Object.entries(e||{}).forEach(([s,i])=>{s.startsWith("on")&&s.toLowerCase()in window&&typeof i=="function"?o.addEventListener(s.toLowerCase().substring(2),i):o.setAttribute(s,i.toString())}),t.forEach(s=>{m(o,s)}),o};var c=(r=>(r.LEFT="LEFT",r.RIGHT="RIGHT",r.ROTATE="ROTATE",r.DOWN="DOWN",r.DROP="DROP",r.SAVE="SAVE",r))(c||{});const b={gridSize:{row:20,col:10},speed:1e3},v={I:[["I","I","I","I"],[0,0,0,0],[0,0,0,0],[0,0,0,0]],J:[["J","J",0],["J",0,0],["J",0,0]],L:[["L","L",0],[0,"L",0],[0,"L",0]],O:[["O","O"],["O","O"]],S:[["S",0,0],["S","S",0],[0,"S",0]],SR:[[0,"SR",0],["SR","SR",0],["SR",0,0]],T:[[0,"T",0],["T","T","T"],[0,0,0]]},k=()=>{const r=Object.keys(v),e=r[Math.floor(Math.random()*r.length)];return{x:6,y:0,rotation:0,blockCode:e}},w=(r,e)=>{if(e<=0)return r;const t=r[0].map((o,s)=>r.map(i=>i[s]).reverse());return w(t,e-1)},C=r=>r.map(e=>e.map(t=>t)),y=({grid:r,block:{x:e,y:t,blockCode:o,rotation:s},override:i=!1})=>{const l=v[o],d=C(r);return w(l,s).forEach((T,B)=>{const h=t-B;T.forEach((R,A)=>{var S,x;if(!R)return;const f=e-A,D=f<0,I=f>=((S=d==null?void 0:d[h])==null?void 0:S.length),N=h>=d.length;if(D||I||N)throw new Error("OUT_OF_BOUND");if(((x=d==null?void 0:d[h])==null?void 0:x[f])&&!i)throw new Error("OVERLAP_VALUE");h>=0&&(d[h][f]=o)})}),d},O=({row:r,col:e})=>new Array(r).fill(0).map(()=>new Array(e).fill(0)),J=r=>{const e=C(r),t=e.filter(s=>!s.every(Boolean)),o=e.length-t.length;return{removedLine:o,grid:[...O({row:o,col:r[0].length}),...t]}},g=()=>({block:k(),nextBlock:k(),grid:O(b.gridSize),savedBlock:null,stopped:!0,score:0,alreadySaved:!1});class U{constructor({onSateChange:e,initialState:t}){a(this,"clock");a(this,"_state",g());a(this,"onSateChangeCb",()=>{});a(this,"updateBlock",e=>{try{const t={...this.state.block,...e};return y({grid:this.state.grid,block:t}),this.state={...this.state,block:t},!0}catch{return!1}});a(this,"nextBlock",()=>{this.updateBlock(this.state.nextBlock)?this.state={...this.state,nextBlock:k()}:this.reset()});a(this,"tick",()=>{if(this.state={...this.state,score:this.state.score+1},this.updateBlock({y:this.state.block.y+1}))return;const{grid:e,block:t}=this.state,{grid:o,removedLine:s}=J(y({grid:e,block:t}));this.state={...this.state,score:this.state.score+s*100,grid:o,alreadySaved:!1},this.nextBlock()});a(this,"resetClockTick",()=>{clearInterval(this.clock),this.clock=void 0,this.clock=setInterval(this.tick,b.speed)});a(this,"move",e=>{if(this.state.stopped)return;const{block:{rotation:t,x:o,y:s}}=this.state;switch(e){case c.LEFT:return this.updateBlock({x:o-1});case c.RIGHT:return this.updateBlock({x:o+1});case c.DOWN:return this.updateBlock({y:s+1});case c.ROTATE:return this.updateBlock({rotation:t>=3?0:t+1});case c.DROP:{let i=!0,l=s;do i=this.updateBlock({y:l+=1});while(i);this.resetClockTick(),this.tick();break}case c.SAVE:{if(this.state.alreadySaved)return;this.state.savedBlock?this.state={...this.state,block:{...k(),blockCode:this.state.savedBlock},savedBlock:this.state.block.blockCode,alreadySaved:!0}:(this.state={...this.state,savedBlock:this.state.block.blockCode,alreadySaved:!0},this.nextBlock())}}});a(this,"start",()=>{this.clock=setInterval(this.tick,b.speed),this.state={...this.state,stopped:!1}});a(this,"stop",()=>{clearInterval(this.clock),this.clock=void 0,this.state={...this.state,stopped:!0}});a(this,"reset",()=>{this.state=g(),clearInterval(this.clock),this.clock=void 0});this.state=t,this.onSateChangeCb=e}get state(){return this._state}set state(e){this._state=e,this.onSateChangeCb(e)}}const j=(r,e)=>Object.keys(r).length===Object.keys(e).length&&Object.keys(r).every(t=>r[t]===e[t]);class u extends HTMLElement{constructor(){super(...arguments);a(this,"shadow",this.attachShadow({mode:"open"}));a(this,"state",{});a(this,"savedProps",{...this.props})}get props(){const t=this.getAttributeNames();return Object.fromEntries(t.map(o=>[o,this.getAttribute(o)]))}attributeChangedCallback(t,o,s){this.onPropsChange(t,o,s),this.rerender()}connectedCallback(){this.onMount(),this.rerender();var t=new MutationObserver(o=>{if(o.some(({type:i})=>i==="attributes")){const i=this.props;j(i,this.props)||this.rerender(),this.savedProps={...i}}});t.observe(this,{attributes:!0})}disconnectedCallback(){this.onUnmount()}rerender(){const t=this.render();this.shadow.innerHTML="",t&&this.shadow.appendChild(t)}setState(t){this.state={...this.state,...t},this.rerender()}onPropsChange(t,o,s){}onMount(){}onUnmount(){}render(){return null}}var E={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(r){(function(){var e={}.hasOwnProperty;function t(){for(var o=[],s=0;s<arguments.length;s++){var i=arguments[s];if(!!i){var l=typeof i;if(l==="string"||l==="number")o.push(i);else if(Array.isArray(i)){if(i.length){var d=t.apply(null,i);d&&o.push(d)}}else if(l==="object"){if(i.toString!==Object.prototype.toString&&!i.toString.toString().includes("[native code]")){o.push(i.toString());continue}for(var p in i)e.call(i,p)&&i[p]&&o.push(p)}}}return o.join(" ")}r.exports?(t.default=t,r.exports=t):window.classNames=t})()})(E);const L=E.exports,G=`
  .active {
    color: #f44336;
  }
`;class H extends u{constructor(){super(...arguments);a(this,"handleKeyDown",t=>{var o;if(t.key===((o=this.props.key)==null?void 0:o.toLowerCase())){const s=this.props.active!=="true";this.setState({isActive:s}),this.dispatchEvent(new CustomEvent("change",{detail:s}))}})}onMount(){this.props.disabled!=="false"&&window.addEventListener("keydown",this.handleKeyDown)}onUnmount(){window.removeEventListener("keydown",this.handleKeyDown)}render(){const{key:t,active:o}=this.props;return n("div",null,n("style",null,G),n("div",{class:L({active:o==="true"})},"[",t==null?void 0:t.toUpperCase(),"] ",n("slot",null)))}}customElements.define("flip-switch",H);const V=`
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
`;class F extends u{render(){const{val:e}=this.props;return n("div",null,n("style",null,V),n("div",{class:L("cell",e==null?void 0:e.toUpperCase())},(e==null?void 0:e.toUpperCase())||0,","))}}customElements.define("tetris-cell",F);const _=`
  .row {
    display: flex;
  }
`;class W extends u{render(){return n("div",null,n("style",null,_),n("div",{class:"row"},"[",this.children,"]"))}}customElements.define("tetris-row",W);const K=`
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
`;class $ extends u{render(){const{grid:e,name:t}=this.props,o=JSON.parse(e);return n("div",null,n("style",null,K),n("div",{class:"container"},n("div",{class:"grid-start"},"var ",t," = [\xA0"),n("div",null,o.map((s,i)=>n("div",{class:"row-wrapper"},s.length?n("tetris-row",null,s.map(l=>n("tetris-cell",{val:String(l)}))):n("div",null),n("span",{class:"suffix"},i===o.length-1?"]":","))))))}}customElements.define("tetris-grid",$);const z=`
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
`;class Y extends u{constructor(){super(...arguments);a(this,"state",{tetris:null,tetrisState:g()});a(this,"handleRestart",()=>{var t;(t=this.state.tetris)==null||t.reset()});a(this,"handleStartStop",()=>{var t,o;this.state.tetrisState.stopped?(t=this.state.tetris)==null||t.start():(o=this.state.tetris)==null||o.stop()});a(this,"handleSave",()=>{var t;(t=this.state.tetris)==null||t.move(c.SAVE)})}onMount(){const t=g();this.setState({tetris:new U({onSateChange:o=>{this.setState({tetrisState:o})},initialState:t}),tetrisState:t}),document.addEventListener("keydown",o=>{const{tetris:s}=this.state;if(!!s)switch(o.key){case"ArrowLeft":return s.move(c.LEFT);case"ArrowRight":return s.move(c.RIGHT);case"ArrowDown":return s.move(c.DOWN);case"ArrowUp":return s.move(c.ROTATE);case" ":return s.move(c.DROP)}})}render(){const{tetrisState:t}=this.state,o=y({grid:t.grid,block:t.block,override:!0}),s=w(v[t.nextBlock.blockCode],2),i=t.savedBlock?w(v[t.savedBlock],2):[[]];return n("div",{id:"app"},n("style",null,z),n("div",{class:"row"},n("h1",null,"Tetris")),n("div",{class:"row"},n("div",null,n("tetris-grid",{grid:JSON.stringify(o),name:"grid"})),n("div",{class:"control"},n("tetris-grid",{grid:JSON.stringify(s),name:"next"}),n("tetris-grid",{grid:JSON.stringify(i),name:"saved"}),n("div",null,n("h3",null,"Score"),n("div",{class:"score"},t.score),n("h3",null,"Help"),n("flip-switch",{key:"S",active:t.stopped?"true":"false",onChange:this.handleStartStop},"Start/Stop"),n("flip-switch",{key:"R",onChange:this.handleRestart},"Restart"),n("flip-switch",{key:"\u2190",disabled:"true"},"Left"),n("flip-switch",{key:"\u2191",disabled:"true"},"Rotate"),n("flip-switch",{key:"\u2192",disabled:"true"},"Right"),n("flip-switch",{key:"\u2193",disabled:"true"},"Down"),n("flip-switch",{key:"space",disabled:"true"},"Drop to bottom"),n("flip-switch",{key:"C",onChange:this.handleSave,active:t.alreadySaved?"true":"false"},"Save Block")))))}}customElements.define("main-app",Y);
