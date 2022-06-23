var M=Object.defineProperty,U=Object.defineProperties;var j=Object.getOwnPropertyDescriptors;var x=Object.getOwnPropertySymbols;var H=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable;var S=(e,t,s)=>t in e?M(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,c=(e,t)=>{for(var s in t||(t={}))H.call(t,s)&&S(e,s,t[s]);if(x)for(var s of x(t))F.call(t,s)&&S(e,s,t[s]);return e},d=(e,t)=>U(e,j(t));const _=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=s(r);fetch(r.href,i)}};_();const b=(e,t)=>{t instanceof HTMLCollection?[...t].forEach(s=>b(e,s)):Array.isArray(t)?t.forEach(s=>b(e,s)):e.appendChild(t instanceof Node?t:document.createTextNode(t))},n=(e,t,...s)=>{const o=document.createElement(e);return Object.entries(t||{}).forEach(([r,i])=>{r.startsWith("on")&&r.toLowerCase()in window&&typeof i=="function"?o.addEventListener(r.toLowerCase().substring(2),i):o.setAttribute(r,i.toString())}),s.forEach(r=>{b(o,r)}),o};var l=(e=>(e.LEFT="LEFT",e.RIGHT="RIGHT",e.ROTATE="ROTATE",e.DOWN="DOWN",e.DROP="DROP",e))(l||{});const v={gridSize:{row:20,col:10},speed:1e3},C={I:[[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]],J:[[1,1,0],[1,0,0],[1,0,0]],L:[[1,1,0],[0,1,0],[0,1,0]],O:[[1,1],[1,1]],S:[[1,0,0],[1,1,0],[0,1,0]],SR:[[0,1,0],[1,1,0],[1,0,0]],T:[[0,1,0],[1,1,1],[0,0,0]]},E=()=>{const e=Object.keys(C),t=e[Math.floor(Math.random()*e.length)];return{x:6,y:0,rotation:0,blockCode:t}},O=(e,t)=>{if(t<=0)return e;const s=e[0].map((o,r)=>e.map(i=>i[r]).reverse());return O(s,t-1)},L=e=>e.map(t=>t.map(s=>s)),w=({grid:e,block:{x:t,y:s,blockCode:o,rotation:r}})=>{const i=C[o],a=L(e);return O(i,r).forEach((h,B)=>{const p=s-B;h.forEach((G,N)=>{var y,k;if(!G)return;const m=t-N,I=m<0,D=m>=((y=a==null?void 0:a[p])==null?void 0:y.length),P=p>=a.length;if(I||D||P)throw new Error("OUT_OF_BOUND");if((k=a==null?void 0:a[p])!=null&&k[m])throw new Error("OVERLAP_VALUE");p>=0&&(a[p][m]=o)})}),a},T=({row:e,col:t})=>new Array(e).fill(0).map(()=>new Array(t).fill(0)),W=e=>{const t=L(e),s=t.filter(r=>!r.every(Boolean)),o=t.length-s.length;return{removedLine:o,grid:[...T({row:o,col:e[0].length}),...s]}},g=()=>{const e=E(),t=T(v.gridSize);return{block:e,solidGrid:t,displayGrid:w({block:e,grid:t}),stopped:!0,score:0}};class J{constructor({onSateChange:t,initialState:s}){this._state=g(),this.onSateChangeCb=()=>{},this.updateBlock=o=>{try{const r=c(c({},this.state.block),o);return w({grid:this.state.solidGrid,block:r}),this.state=d(c({},this.state),{block:r}),!0}catch{return!1}},this.tick=()=>{if(this.state=d(c({},this.state),{score:this.state.score+1}),this.updateBlock({y:this.state.block.y+1}))return;const{solidGrid:o,block:r}=this.state,{grid:i,removedLine:a}=W(w({grid:o,block:r}));this.updateBlock(E())?this.state=d(c({},this.state),{score:this.state.score+a*100,solidGrid:i}):this.state=g()},this.resetClockTick=()=>{clearInterval(this.clock),this.clock=void 0,this.clock=setInterval(this.tick,v.speed)},this.move=o=>{if(this.state.stopped)return;const{block:{rotation:r,x:i,y:a}}=this.state;switch(o){case l.LEFT:return this.updateBlock({x:i-1});case l.RIGHT:return this.updateBlock({x:i+1});case l.DOWN:return this.updateBlock({y:a+1});case l.ROTATE:return this.updateBlock({rotation:r>=3?0:r+1});case l.DROP:{let u=!0,h=a;do u=this.updateBlock({y:h+=1});while(u);this.resetClockTick(),this.tick();break}}},this.start=()=>{this.clock=setInterval(this.tick,v.speed),this.state=d(c({},this.state),{stopped:!1})},this.stop=()=>{clearInterval(this.clock),this.clock=void 0,this.state=d(c({},this.state),{stopped:!0})},this.reset=()=>{this.state=g(),clearInterval(this.clock),this.clock=void 0},this.state=s,this.onSateChangeCb=t}get state(){return this._state}set state(t){const s=d(c({},t),{displayGrid:w({grid:t.solidGrid,block:t.block})});this._state=s,this.onSateChangeCb(s)}}const K=(e,t)=>Object.keys(e).length===Object.keys(t).length&&Object.keys(e).every(s=>e[s]===t[s]);class f extends HTMLElement{constructor(){super(...arguments),this.shadow=this.attachShadow({mode:"open"}),this.state={},this.savedProps=c({},this.props)}get props(){const t=this.getAttributeNames();return Object.fromEntries(t.map(s=>[s,this.getAttribute(s)]))}attributeChangedCallback(t,s,o){this.onPropsChange(t,s,o),this.rerender()}connectedCallback(){this.onMount(),this.rerender();var t=new MutationObserver(s=>{if(s.some(({type:r})=>r==="attributes")){const r=this.props;K(r,this.props)||this.rerender(),this.savedProps=c({},r)}});t.observe(this,{attributes:!0})}disconnectedCallback(){this.onUnmount()}rerender(){const t=this.render();this.shadow.innerHTML="",t&&this.shadow.appendChild(t)}setState(t){this.state=c(c({},this.state),t),this.rerender()}onPropsChange(t,s,o){}onMount(){}onUnmount(){}render(){return null}}var R={exports:{}};/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/(function(e){(function(){var t={}.hasOwnProperty;function s(){for(var o=[],r=0;r<arguments.length;r++){var i=arguments[r];if(!!i){var a=typeof i;if(a==="string"||a==="number")o.push(i);else if(Array.isArray(i)){if(i.length){var u=s.apply(null,i);u&&o.push(u)}}else if(a==="object")if(i.toString===Object.prototype.toString)for(var h in i)t.call(i,h)&&i[h]&&o.push(h);else o.push(i.toString())}}return o.join(" ")}e.exports?(s.default=s,e.exports=s):window.classNames=s})()})(R);var A=R.exports;const V=`
  .active {
    color: #f44336;
  }
`;class $ extends f{constructor(){super(...arguments),this.handleKeyDown=t=>{var s;if(t.key===((s=this.props.key)==null?void 0:s.toLowerCase())){const o=this.props.active!=="true";this.setState({isActive:o}),this.dispatchEvent(new CustomEvent("change",{detail:o}))}}}onMount(){window.addEventListener("keydown",this.handleKeyDown)}onUnmount(){window.removeEventListener("keydown",this.handleKeyDown)}render(){const{key:t,active:s}=this.props;return n("div",null,n("style",null,V),n("div",{class:A({active:s==="true"})},"[",t==null?void 0:t.toUpperCase(),"] ",n("slot",null)))}}customElements.define("flip-switch",$);const z=`
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
`;class Y extends f{render(){const{val:t}=this.props;return n("div",null,n("style",null,z),n("div",{class:A("cell",t==null?void 0:t.toUpperCase())},(t==null?void 0:t.toUpperCase())||0,","))}}customElements.define("tetris-cell",Y);const q=`
  .row {
    line-height: 25px;
    display: flex;
  }
`;class X extends f{render(){const{last:t}=this.props;return n("div",null,n("style",null,q),n("div",{class:"row"},"[",this.children,"] ",t==="true"?"]":","))}}customElements.define("tetris-row",X);const Q=`
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
`;class Z extends f{render(){const{grid:t}=this.props;return n("div",{id:"test"},n("style",null,Q),n("div",{class:"container"},n("div",{class:"grid-start"},"var grid = [\xA0"),n("div",null,JSON.parse(t).map((s,o)=>n("tetris-row",null,s.map(r=>n("tetris-cell",{val:String(r)})))))))}}customElements.define("tetris-grid",Z);const tt=`
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

  .header {
    margin: 50px 0;
  }

  .control {
    margin-left: 16px;
  }
`;class et extends f{constructor(){super(...arguments),this.handleStateChange=t=>{this.setState({tetrisState:t})},this.initialState=g(),this.state={tetris:new J({onSateChange:this.handleStateChange,initialState:this.initialState}),tetrisState:this.initialState},this.handleRestart=()=>{this.state.tetris.reset()},this.handleStartStop=()=>{this.state.tetrisState.stopped?this.state.tetris.start():this.state.tetris.stop()}}onMount(){document.addEventListener("keydown",t=>{switch(t.key){case"ArrowLeft":return this.state.tetris.move(l.LEFT);case"ArrowRight":return this.state.tetris.move(l.RIGHT);case"ArrowDown":return this.state.tetris.move(l.DOWN);case"ArrowUp":return this.state.tetris.move(l.ROTATE);case" ":return this.state.tetris.move(l.DROP)}})}render(){const{tetrisState:t}=this.state;return n("div",{id:"app"},n("style",null,tt),n("div",{class:"row"},n("h1",null,"Tetris")),n("div",{class:"row"},n("div",null,n("tetris-grid",{grid:JSON.stringify(this.state.tetrisState.displayGrid)})),n("div",{class:"control"},n("h3",null,"Score"),n("div",{id:"score"},t.score),n("h3",null,"Help"),n("flip-switch",{id:"stop",key:"S",active:t.stopped?"true":"false",onChange:this.handleStartStop},"Start/Stop"),n("flip-switch",{id:"restart",key:"R",onChange:this.handleRestart},"Restart"))))}}customElements.define("main-app",et);
