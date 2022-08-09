(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerpolicy&&(n.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?n.credentials="include":s.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();const g=(i,t)=>{t instanceof HTMLCollection?[...t].forEach(e=>g(i,e)):Array.isArray(t)?t.forEach(e=>g(i,e)):i.appendChild(t instanceof Node?t:document.createTextNode(t))},o=(i,t,...e)=>{const r=document.createElement(i);return Object.entries(t||{}).forEach(([s,n])=>{s.startsWith("on")&&s.toLowerCase()in window&&typeof n=="function"?r.addEventListener(s.toLowerCase().substring(2),n):r.setAttribute(s,n.toString())}),e.forEach(s=>{g(r,s)}),r};var c=(i=>(i.LEFT="LEFT",i.RIGHT="RIGHT",i.ROTATE="ROTATE",i.DOWN="DOWN",i.DROP="DROP",i.SAVE="SAVE",i))(c||{});const w={gridSize:{row:20,col:10},speed:1e3},f={I:[["I","I","I","I"],[0,0,0,0],[0,0,0,0],[0,0,0,0]],J:[["J","J",0],["J",0,0],["J",0,0]],L:[["L","L",0],[0,"L",0],[0,"L",0]],O:[["O","O"],["O","O"]],S:[["S",0,0],["S","S",0],[0,"S",0]],SR:[[0,"SR",0],["SR","SR",0],["SR",0,0]],T:[[0,"T",0],["T","T","T"],[0,0,0]]},v=()=>{const i=Object.keys(f),t=i[Math.floor(Math.random()*i.length)];return{x:6,y:0,rotation:0,blockCode:t}},k=(i,t)=>{if(t<=0)return i;const e=i[0].map((r,s)=>i.map(n=>n[s]).reverse());return k(e,t-1)},S=i=>i.map(t=>t.map(e=>e)),b=({grid:i,block:{x:t,y:e,blockCode:r,rotation:s},override:n=!1})=>{const a=f[r],l=S(i);return k(a,s).forEach((L,T)=>{const d=e-T;L.forEach((B,R)=>{var y,x;if(!B)return;const p=t-R,A=p<0,D=p>=((y=l==null?void 0:l[d])==null?void 0:y.length),I=d>=l.length;if(A||D||I)throw new Error("OUT_OF_BOUND");if(((x=l==null?void 0:l[d])==null?void 0:x[p])&&!n)throw new Error("OVERLAP_VALUE");d>=0&&(l[d][p]=r)})}),l},C=({row:i,col:t})=>new Array(i).fill(0).map(()=>new Array(t).fill(0)),N=i=>{const t=S(i),e=t.filter(s=>!s.every(Boolean)),r=t.length-e.length;return{removedLine:r,grid:[...C({row:r,col:i[0].length}),...e]}},m=()=>({block:v(),nextBlock:v(),grid:C(w.gridSize),savedBlock:null,stopped:!0,score:0,alreadySaved:!1});class P{constructor({onSateChange:t,initialState:e}){this._state=m(),this.onSateChangeCb=()=>{},this.updateBlock=r=>{try{const s={...this.state.block,...r};return b({grid:this.state.grid,block:s}),this.state={...this.state,block:s},!0}catch{return!1}},this.nextBlock=()=>{this.updateBlock(this.state.nextBlock)?this.state={...this.state,nextBlock:v()}:this.reset()},this.tick=()=>{if(this.state={...this.state,score:this.state.score+1},this.updateBlock({y:this.state.block.y+1}))return;const{grid:r,block:s}=this.state,{grid:n,removedLine:a}=N(b({grid:r,block:s}));this.state={...this.state,score:this.state.score+a*100,grid:n,alreadySaved:!1},this.nextBlock()},this.resetClockTick=()=>{clearInterval(this.clock),this.clock=void 0,this.clock=setInterval(this.tick,w.speed)},this.move=r=>{if(this.state.stopped)return;const{block:{rotation:s,x:n,y:a}}=this.state;switch(r){case c.LEFT:return this.updateBlock({x:n-1});case c.RIGHT:return this.updateBlock({x:n+1});case c.DOWN:return this.updateBlock({y:a+1});case c.ROTATE:return this.updateBlock({rotation:s>=3?0:s+1});case c.DROP:{let l=!0,h=a;do l=this.updateBlock({y:h+=1});while(l);this.resetClockTick(),this.tick();break}case c.SAVE:{if(this.state.alreadySaved)return;this.state.savedBlock?this.state={...this.state,block:{...v(),blockCode:this.state.savedBlock},savedBlock:this.state.block.blockCode,alreadySaved:!0}:(this.state={...this.state,savedBlock:this.state.block.blockCode,alreadySaved:!0},this.nextBlock())}}},this.start=()=>{this.clock=setInterval(this.tick,w.speed),this.state={...this.state,stopped:!1}},this.stop=()=>{clearInterval(this.clock),this.clock=void 0,this.state={...this.state,stopped:!0}},this.reset=()=>{this.state=m(),clearInterval(this.clock),this.clock=void 0},this.state=e,this.onSateChangeCb=t}get state(){return this._state}set state(t){this._state=t,this.onSateChangeCb(t)}}const M=(i,t)=>Object.keys(i).length===Object.keys(t).length&&Object.keys(i).every(e=>i[e]===t[e]);class u extends HTMLElement{constructor(){super(...arguments),this.shadow=this.attachShadow({mode:"open"}),this.state={},this.savedProps={...this.props}}get props(){const t=this.getAttributeNames();return Object.fromEntries(t.map(e=>[e,this.getAttribute(e)]))}attributeChangedCallback(t,e,r){this.onPropsChange(t,e,r),this.rerender()}connectedCallback(){this.onMount(),this.rerender();var t=new MutationObserver(e=>{if(e.some(({type:s})=>s==="attributes")){const s=this.props;M(s,this.props)||this.rerender(),this.savedProps={...s}}});t.observe(this,{attributes:!0})}disconnectedCallback(){this.onUnmount()}rerender(){const t=this.render();this.shadow.innerHTML="",t&&this.shadow.appendChild(t)}setState(t){this.state={...this.state,...t},this.rerender()}onPropsChange(t,e,r){}onMount(){}onUnmount(){}render(){return null}}var O={exports:{}};/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/(function(i){(function(){var t={}.hasOwnProperty;function e(){for(var r=[],s=0;s<arguments.length;s++){var n=arguments[s];if(!!n){var a=typeof n;if(a==="string"||a==="number")r.push(n);else if(Array.isArray(n)){if(n.length){var l=e.apply(null,n);l&&r.push(l)}}else if(a==="object")if(n.toString===Object.prototype.toString)for(var h in n)t.call(n,h)&&n[h]&&r.push(h);else r.push(n.toString())}}return r.join(" ")}i.exports?(e.default=e,i.exports=e):window.classNames=e})()})(O);const E=O.exports,J=`
  .active {
    color: #f44336;
  }
`;class U extends u{constructor(){super(...arguments),this.handleKeyDown=t=>{var e;if(t.key===((e=this.props.key)==null?void 0:e.toLowerCase())){const r=this.props.active!=="true";this.setState({isActive:r}),this.dispatchEvent(new CustomEvent("change",{detail:r}))}}}onMount(){this.props.disabled!=="false"&&window.addEventListener("keydown",this.handleKeyDown)}onUnmount(){window.removeEventListener("keydown",this.handleKeyDown)}render(){const{key:t,active:e}=this.props;return o("div",null,o("style",null,J),o("div",{class:E({active:e==="true"})},"[",t==null?void 0:t.toUpperCase(),"] ",o("slot",null)))}}customElements.define("flip-switch",U);const j=`
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
`;class G extends u{render(){const{val:t}=this.props;return o("div",null,o("style",null,j),o("div",{class:E("cell",t==null?void 0:t.toUpperCase())},(t==null?void 0:t.toUpperCase())||0,","))}}customElements.define("tetris-cell",G);const H=`
  .row {
    display: flex;
  }
`;class V extends u{render(){return o("div",null,o("style",null,H),o("div",{class:"row"},"[",this.children,"]"))}}customElements.define("tetris-row",V);const F=`
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
`;class _ extends u{render(){const{grid:t,name:e}=this.props,r=JSON.parse(t);return o("div",null,o("style",null,F),o("div",{class:"container"},o("div",{class:"grid-start"},"var ",e," = [\xA0"),o("div",null,r.map((s,n)=>o("div",{class:"row-wrapper"},s.length?o("tetris-row",null,s.map(a=>o("tetris-cell",{val:String(a)}))):o("div",null),o("span",{class:"suffix"},n===r.length-1?"]":","))))))}}customElements.define("tetris-grid",_);const W=`
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
`;class K extends u{constructor(){super(...arguments),this.state={tetris:null,tetrisState:m()},this.handleRestart=()=>{var t;(t=this.state.tetris)==null||t.reset()},this.handleStartStop=()=>{var t,e;this.state.tetrisState.stopped?(t=this.state.tetris)==null||t.start():(e=this.state.tetris)==null||e.stop()},this.handleSave=()=>{var t;(t=this.state.tetris)==null||t.move(c.SAVE)}}onMount(){const t=m();this.setState({tetris:new P({onSateChange:e=>{this.setState({tetrisState:e})},initialState:t}),tetrisState:t}),document.addEventListener("keydown",e=>{const{tetris:r}=this.state;if(!!r)switch(e.key){case"ArrowLeft":return r.move(c.LEFT);case"ArrowRight":return r.move(c.RIGHT);case"ArrowDown":return r.move(c.DOWN);case"ArrowUp":return r.move(c.ROTATE);case" ":return r.move(c.DROP)}})}render(){const{tetrisState:t}=this.state,e=b({grid:t.grid,block:t.block,override:!0}),r=k(f[t.nextBlock.blockCode],2),s=t.savedBlock?k(f[t.savedBlock],2):[[]];return o("div",{id:"app"},o("style",null,W),o("div",{class:"row"},o("h1",null,"Tetris")),o("div",{class:"row"},o("div",null,o("tetris-grid",{grid:JSON.stringify(e),name:"grid"})),o("div",{class:"control"},o("tetris-grid",{grid:JSON.stringify(r),name:"next"}),o("tetris-grid",{grid:JSON.stringify(s),name:"saved"}),o("div",null,o("h3",null,"Score"),o("div",{class:"score"},t.score),o("h3",null,"Help"),o("flip-switch",{key:"S",active:t.stopped?"true":"false",onChange:this.handleStartStop},"Start/Stop"),o("flip-switch",{key:"R",onChange:this.handleRestart},"Restart"),o("flip-switch",{key:"\u2190",disabled:"true"},"Left"),o("flip-switch",{key:"\u2191",disabled:"true"},"Rotate"),o("flip-switch",{key:"\u2192",disabled:"true"},"Right"),o("flip-switch",{key:"\u2193",disabled:"true"},"Down"),o("flip-switch",{key:"space",disabled:"true"},"Drop to bottom"),o("flip-switch",{key:"C",onChange:this.handleSave,active:t.alreadySaved?"true":"false"},"Save Block")))))}}customElements.define("main-app",K);
