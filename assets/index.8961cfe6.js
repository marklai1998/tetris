var U=Object.defineProperty,J=Object.defineProperties;var G=Object.getOwnPropertyDescriptors;var C=Object.getOwnPropertySymbols;var H=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable;var L=(s,t,e)=>t in s?U(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,l=(s,t)=>{for(var e in t||(t={}))H.call(t,e)&&L(s,e,t[e]);if(C)for(var e of C(t))F.call(t,e)&&L(s,e,t[e]);return s},d=(s,t)=>J(s,G(t));const _=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function e(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=e(r);fetch(r.href,i)}};_();const b=(s,t)=>{t instanceof HTMLCollection?[...t].forEach(e=>b(s,e)):Array.isArray(t)?t.forEach(e=>b(s,e)):s.appendChild(t instanceof Node?t:document.createTextNode(t))},n=(s,t,...e)=>{const o=document.createElement(s);return Object.entries(t||{}).forEach(([r,i])=>{r.startsWith("on")&&r.toLowerCase()in window&&typeof i=="function"?o.addEventListener(r.toLowerCase().substring(2),i):o.setAttribute(r,i.toString())}),e.forEach(r=>{b(o,r)}),o};var h=(s=>(s.LEFT="LEFT",s.RIGHT="RIGHT",s.ROTATE="ROTATE",s.DOWN="DOWN",s.DROP="DROP",s))(h||{});const g={gridSize:{row:20,col:10},speed:1e3},y={I:[["I","I","I","I"],[0,0,0,0],[0,0,0,0],[0,0,0,0]],J:[["J","J",0],["J",0,0],["J",0,0]],L:[["L","L",0],[0,"L",0],[0,"L",0]],O:[["O","O"],["O","O"]],S:[["S",0,0],["S","S",0],[0,"S",0]],SR:[[0,"SR",0],["SR","SR",0],["SR",0,0]],T:[[0,"T",0],["T","T","T"],[0,0,0]]},k=()=>{const s=Object.keys(y),t=s[Math.floor(Math.random()*s.length)];return{x:6,y:0,rotation:0,blockCode:t}},x=(s,t)=>{if(t<=0)return s;const e=s[0].map((o,r)=>s.map(i=>i[r]).reverse());return x(e,t-1)},E=s=>s.map(t=>t.map(e=>e)),v=({grid:s,block:{x:t,y:e,blockCode:o,rotation:r},override:i=!1})=>{const c=y[o],a=E(s);return x(c,r).forEach((A,I)=>{const p=e-I;A.forEach((D,N)=>{var S,O;if(!D)return;const m=t-N,P=m<0,M=m>=((S=a==null?void 0:a[p])==null?void 0:S.length),j=p>=a.length;if(P||M||j)throw new Error("OUT_OF_BOUND");if(((O=a==null?void 0:a[p])==null?void 0:O[m])&&!i)throw new Error("OVERLAP_VALUE");p>=0&&(a[p][m]=o)})}),a},T=({row:s,col:t})=>new Array(s).fill(0).map(()=>new Array(t).fill(0)),W=s=>{const t=E(s),e=t.filter(r=>!r.every(Boolean)),o=t.length-e.length;return{removedLine:o,grid:[...T({row:o,col:s[0].length}),...e]}},w=()=>({block:k(),nextBlock:k(),grid:T(g.gridSize),stopped:!0,score:0});class K{constructor({onSateChange:t,initialState:e}){this._state=w(),this.onSateChangeCb=()=>{},this.updateBlock=o=>{try{const r=l(l({},this.state.block),o);return v({grid:this.state.grid,block:r}),this.state=d(l({},this.state),{block:r}),!0}catch{return!1}},this.tick=()=>{if(this.state=d(l({},this.state),{score:this.state.score+1}),this.updateBlock({y:this.state.block.y+1}))return;const{grid:o,block:r}=this.state,{grid:i,removedLine:c}=W(v({grid:o,block:r}));this.state=d(l({},this.state),{score:this.state.score+c*100,grid:i}),this.updateBlock(this.state.nextBlock)?this.state=d(l({},this.state),{nextBlock:k()}):this.reset()},this.resetClockTick=()=>{clearInterval(this.clock),this.clock=void 0,this.clock=setInterval(this.tick,g.speed)},this.move=o=>{if(this.state.stopped)return;const{block:{rotation:r,x:i,y:c}}=this.state;switch(o){case h.LEFT:return this.updateBlock({x:i-1});case h.RIGHT:return this.updateBlock({x:i+1});case h.DOWN:return this.updateBlock({y:c+1});case h.ROTATE:return this.updateBlock({rotation:r>=3?0:r+1});case h.DROP:{let a=!0,u=c;do a=this.updateBlock({y:u+=1});while(a);this.resetClockTick(),this.tick();break}}},this.start=()=>{this.clock=setInterval(this.tick,g.speed),this.state=d(l({},this.state),{stopped:!1})},this.stop=()=>{clearInterval(this.clock),this.clock=void 0,this.state=d(l({},this.state),{stopped:!0})},this.reset=()=>{this.state=w(),clearInterval(this.clock),this.clock=void 0},this.state=e,this.onSateChangeCb=t}get state(){return this._state}set state(t){this._state=t,this.onSateChangeCb(t)}}const V=(s,t)=>Object.keys(s).length===Object.keys(t).length&&Object.keys(s).every(e=>s[e]===t[e]);class f extends HTMLElement{constructor(){super(...arguments),this.shadow=this.attachShadow({mode:"open"}),this.state={},this.savedProps=l({},this.props)}get props(){const t=this.getAttributeNames();return Object.fromEntries(t.map(e=>[e,this.getAttribute(e)]))}attributeChangedCallback(t,e,o){this.onPropsChange(t,e,o),this.rerender()}connectedCallback(){this.onMount(),this.rerender();var t=new MutationObserver(e=>{if(e.some(({type:r})=>r==="attributes")){const r=this.props;V(r,this.props)||this.rerender(),this.savedProps=l({},r)}});t.observe(this,{attributes:!0})}disconnectedCallback(){this.onUnmount()}rerender(){const t=this.render();this.shadow.innerHTML="",t&&this.shadow.appendChild(t)}setState(t){this.state=l(l({},this.state),t),this.rerender()}onPropsChange(t,e,o){}onMount(){}onUnmount(){}render(){return null}}var R={exports:{}};/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/(function(s){(function(){var t={}.hasOwnProperty;function e(){for(var o=[],r=0;r<arguments.length;r++){var i=arguments[r];if(!!i){var c=typeof i;if(c==="string"||c==="number")o.push(i);else if(Array.isArray(i)){if(i.length){var a=e.apply(null,i);a&&o.push(a)}}else if(c==="object")if(i.toString===Object.prototype.toString)for(var u in i)t.call(i,u)&&i[u]&&o.push(u);else o.push(i.toString())}}return o.join(" ")}s.exports?(e.default=e,s.exports=e):window.classNames=e})()})(R);var B=R.exports;const $=`
  .active {
    color: #f44336;
  }
`;class z extends f{constructor(){super(...arguments),this.handleKeyDown=t=>{var e;if(t.key===((e=this.props.key)==null?void 0:e.toLowerCase())){const o=this.props.active!=="true";this.setState({isActive:o}),this.dispatchEvent(new CustomEvent("change",{detail:o}))}}}onMount(){this.props.disabled!=="false"&&window.addEventListener("keydown",this.handleKeyDown)}onUnmount(){window.removeEventListener("keydown",this.handleKeyDown)}render(){const{key:t,active:e}=this.props;return n("div",null,n("style",null,$),n("div",{class:B({active:e==="true"})},"[",t==null?void 0:t.toUpperCase(),"] ",n("slot",null)))}}customElements.define("flip-switch",z);const Y=`
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
`;class q extends f{render(){const{val:t}=this.props;return n("div",null,n("style",null,Y),n("div",{class:B("cell",t==null?void 0:t.toUpperCase())},(t==null?void 0:t.toUpperCase())||0,","))}}customElements.define("tetris-cell",q);const X=`
  .row {
    line-height: 25px;
    display: flex;
  }
`;class Q extends f{render(){const{last:t}=this.props;return n("div",null,n("style",null,X),n("div",{class:"row"},"[",this.children,"] ",t==="true"?"]":","))}}customElements.define("tetris-row",Q);const Z=`
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
`;class tt extends f{render(){const{grid:t,name:e}=this.props;return n("div",{id:"test"},n("style",null,Z),n("div",{class:"container"},n("div",{class:"grid-start"},"var ",e," = [\xA0"),n("div",null,JSON.parse(t).map((o,r)=>n("tetris-row",null,o.map(i=>n("tetris-cell",{val:String(i)})))))))}}customElements.define("tetris-grid",tt);const et=`
  h1 {
    display: inline-block;
  }

  h4 {
    display: inline-block;
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
`;class st extends f{constructor(){super(...arguments),this.state={tetris:null,tetrisState:w()},this.handleRestart=()=>{var t;(t=this.state.tetris)==null||t.reset()},this.handleStartStop=()=>{var t,e;this.state.tetrisState.stopped?(t=this.state.tetris)==null||t.start():(e=this.state.tetris)==null||e.stop()}}onMount(){const t=w();this.setState({tetris:new K({onSateChange:e=>{this.setState({tetrisState:e})},initialState:t}),tetrisState:t}),document.addEventListener("keydown",e=>{const{tetris:o}=this.state;if(!!o)switch(e.key){case"ArrowLeft":return o.move(h.LEFT);case"ArrowRight":return o.move(h.RIGHT);case"ArrowDown":return o.move(h.DOWN);case"ArrowUp":return o.move(h.ROTATE);case" ":return o.move(h.DROP)}})}render(){const{tetrisState:t}=this.state,e=v({grid:t.grid,block:t.block,override:!0}),o=x(y[t.nextBlock.blockCode],2);return n("div",{id:"app"},n("style",null,et),n("div",{class:"row"},n("h1",null,"Tetris")),n("div",{class:"row"},n("div",null,n("tetris-grid",{grid:JSON.stringify(e),name:"grid"})),n("div",{class:"control"},n("tetris-grid",{grid:JSON.stringify(o),name:"next"}),n("div",null,n("h3",null,"Score"),n("div",{class:"score"},t.score),n("flip-switch",{key:"S",active:t.stopped?"true":"false",onChange:this.handleStartStop},"Start/Stop"),n("flip-switch",{key:"R",onChange:this.handleRestart},"Restart"),n("h3",null,"Help"),n("flip-switch",{key:"\u2190",disabled:"true"},"Left"),n("flip-switch",{key:"\u2191",disabled:"true"},"Rotate"),n("flip-switch",{key:"\u2192",disabled:"true"},"Right"),n("flip-switch",{key:"\u2193",disabled:"true"},"Down"),n("flip-switch",{key:"space",disabled:"true"},"Drop to bottom")))))}}customElements.define("main-app",st);
