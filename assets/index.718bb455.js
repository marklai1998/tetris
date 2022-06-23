var M=Object.defineProperty,U=Object.defineProperties;var j=Object.getOwnPropertyDescriptors;var x=Object.getOwnPropertySymbols;var H=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable;var S=(s,t,e)=>t in s?M(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,c=(s,t)=>{for(var e in t||(t={}))H.call(t,e)&&S(s,e,t[e]);if(x)for(var e of x(t))F.call(t,e)&&S(s,e,t[e]);return s},d=(s,t)=>U(s,j(t));const _=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=e(r);fetch(r.href,i)}};_();const b=(s,t)=>{t instanceof HTMLCollection?[...t].forEach(e=>b(s,e)):Array.isArray(t)?t.forEach(e=>b(s,e)):s.appendChild(t instanceof Node?t:document.createTextNode(t))},n=(s,t,...e)=>{const o=document.createElement(s);return Object.entries(t||{}).forEach(([r,i])=>{r.startsWith("on")&&r.toLowerCase()in window&&typeof i=="function"?o.addEventListener(r.toLowerCase().substring(2),i):o.setAttribute(r,i.toString())}),e.forEach(r=>{b(o,r)}),o};var l=(s=>(s.LEFT="LEFT",s.RIGHT="RIGHT",s.ROTATE="ROTATE",s.DOWN="DOWN",s.DROP="DROP",s))(l||{});const v={gridSize:{row:20,col:10},speed:1e3},C={I:[[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]],J:[[1,1,0],[1,0,0],[1,0,0]],L:[[1,1,0],[0,1,0],[0,1,0]],O:[[1,1],[1,1]],S:[[1,0,0],[1,1,0],[0,1,0]],SR:[[0,1,0],[1,1,0],[1,0,0]],T:[[0,1,0],[1,1,1],[0,0,0]]},E=()=>{const s=Object.keys(C),t=s[Math.floor(Math.random()*s.length)];return{x:6,y:0,rotation:0,blockCode:t}},O=(s,t)=>{if(t<=0)return s;const e=s[0].map((o,r)=>s.map(i=>i[r]).reverse());return O(e,t-1)},L=s=>s.map(t=>t.map(e=>e)),g=({grid:s,block:{x:t,y:e,blockCode:o,rotation:r}})=>{const i=C[o],a=L(s);return O(i,r).forEach((h,B)=>{const p=e-B;h.forEach((G,N)=>{var y,k;if(!G)return;const w=t-N,I=w<0,D=w>=((y=a==null?void 0:a[p])==null?void 0:y.length),P=p>=a.length;if(I||D||P)throw new Error("OUT_OF_BOUND");if((k=a==null?void 0:a[p])!=null&&k[w])throw new Error("OVERLAP_VALUE");p>=0&&(a[p][w]=o)})}),a},T=({row:s,col:t})=>new Array(s).fill(0).map(()=>new Array(t).fill(0)),W=s=>{const t=L(s),e=t.filter(r=>!r.every(Boolean)),o=t.length-e.length;return{removedLine:o,grid:[...T({row:o,col:s[0].length}),...e]}},f=()=>{const s=E(),t=T(v.gridSize);return{block:s,solidGrid:t,displayGrid:g({block:s,grid:t}),stopped:!0,score:0}};class J{constructor({onSateChange:t,initialState:e}){this._state=f(),this.onSateChangeCb=()=>{},this.updateBlock=o=>{try{const r=c(c({},this.state.block),o);return g({grid:this.state.solidGrid,block:r}),this.state=d(c({},this.state),{block:r}),!0}catch{return!1}},this.tick=()=>{if(this.state=d(c({},this.state),{score:this.state.score+1}),this.updateBlock({y:this.state.block.y+1}))return;const{solidGrid:o,block:r}=this.state,{grid:i,removedLine:a}=W(g({grid:o,block:r}));this.updateBlock(E())?this.state=d(c({},this.state),{score:this.state.score+a*100,solidGrid:i}):this.state=f()},this.resetClockTick=()=>{clearInterval(this.clock),this.clock=void 0,this.clock=setInterval(this.tick,v.speed)},this.move=o=>{if(this.state.stopped)return;const{block:{rotation:r,x:i,y:a}}=this.state;switch(o){case l.LEFT:return this.updateBlock({x:i-1});case l.RIGHT:return this.updateBlock({x:i+1});case l.DOWN:return this.updateBlock({y:a+1});case l.ROTATE:return this.updateBlock({rotation:r>=3?0:r+1});case l.DROP:{let u=!0,h=a;do u=this.updateBlock({y:h+=1});while(u);this.resetClockTick(),this.tick();break}}},this.start=()=>{this.clock=setInterval(this.tick,v.speed),this.state=d(c({},this.state),{stopped:!1})},this.stop=()=>{clearInterval(this.clock),this.clock=void 0,this.state=d(c({},this.state),{stopped:!0})},this.reset=()=>{this.state=f(),clearInterval(this.clock),this.clock=void 0},this.state=e,this.onSateChangeCb=t}get state(){return this._state}set state(t){const e=d(c({},t),{displayGrid:g({grid:t.solidGrid,block:t.block})});this._state=e,this.onSateChangeCb(e)}}const K=(s,t)=>Object.keys(s).length===Object.keys(t).length&&Object.keys(s).every(e=>s[e]===t[e]);class m extends HTMLElement{constructor(){super(...arguments),this.shadow=this.attachShadow({mode:"open"}),this.state={},this.savedProps=c({},this.props)}get props(){const t=this.getAttributeNames();return Object.fromEntries(t.map(e=>[e,this.getAttribute(e)]))}attributeChangedCallback(t,e,o){this.onPropsChange(t,e,o),this.rerender()}connectedCallback(){this.onMount(),this.rerender();var t=new MutationObserver(e=>{if(e.some(({type:r})=>r==="attributes")){const r=this.props;K(r,this.props)||this.rerender(),this.savedProps=c({},r)}});t.observe(this,{attributes:!0})}disconnectedCallback(){this.onUnmount()}rerender(){const t=this.render();this.shadow.innerHTML="",t&&this.shadow.appendChild(t)}setState(t){this.state=c(c({},this.state),t),this.rerender()}onPropsChange(t,e,o){}onMount(){}onUnmount(){}render(){return null}}var R={exports:{}};/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/(function(s){(function(){var t={}.hasOwnProperty;function e(){for(var o=[],r=0;r<arguments.length;r++){var i=arguments[r];if(!!i){var a=typeof i;if(a==="string"||a==="number")o.push(i);else if(Array.isArray(i)){if(i.length){var u=e.apply(null,i);u&&o.push(u)}}else if(a==="object")if(i.toString===Object.prototype.toString)for(var h in i)t.call(i,h)&&i[h]&&o.push(h);else o.push(i.toString())}}return o.join(" ")}s.exports?(e.default=e,s.exports=e):window.classNames=e})()})(R);var A=R.exports;const V=`
  .active {
    color: #f44336;
  }
`;class $ extends m{constructor(){super(...arguments),this.handleKeyDown=t=>{var e;if(t.key===((e=this.props.key)==null?void 0:e.toLowerCase())){const o=this.props.active!=="true";this.setState({isActive:o}),this.dispatchEvent(new CustomEvent("change",{detail:o}))}}}onMount(){window.addEventListener("keydown",this.handleKeyDown)}onUnmount(){window.removeEventListener("keydown",this.handleKeyDown)}render(){const{key:t,active:e}=this.props;return n("div",null,n("style",null,V),n("div",{class:A({active:e==="true"})},"[",t==null?void 0:t.toUpperCase(),"] ",n("slot",null)))}}customElements.define("flip-switch",$);const z=`
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
`;class Y extends m{render(){const{val:t}=this.props;return n("div",null,n("style",null,z),n("div",{class:A("cell",t==null?void 0:t.toUpperCase())},(t==null?void 0:t.toUpperCase())||0,","))}}customElements.define("tetris-cell",Y);const q=`
  .row {
    line-height: 25px;
    display: flex;
  }
`;class X extends m{render(){const{last:t}=this.props;return n("div",null,n("style",null,q),n("div",{class:"row"},"[",this.children,"] ",t==="true"?"]":","))}}customElements.define("tetris-row",X);const Q=`
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
`;class Z extends m{render(){const{grid:t}=this.props;return n("div",{id:"test"},n("style",null,Q),n("div",{class:"container"},n("div",{class:"grid-start"},"var grid = [\xA0"),n("div",null,JSON.parse(t).map((e,o)=>n("tetris-row",null,e.map(r=>n("tetris-cell",{val:String(r)})))))))}}customElements.define("tetris-grid",Z);const tt=`
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
`;class et extends m{constructor(){super(...arguments),this.state={tetris:null,tetrisState:f()},this.handleRestart=()=>{var t;(t=this.state.tetris)==null||t.reset()},this.handleStartStop=()=>{var t,e;this.state.tetrisState.stopped?(t=this.state.tetris)==null||t.start():(e=this.state.tetris)==null||e.stop()}}onMount(){const t=f();this.setState({tetris:new J({onSateChange:e=>{this.setState({tetrisState:e})},initialState:t}),tetrisState:t}),document.addEventListener("keydown",e=>{const{tetris:o}=this.state;if(!!o)switch(e.key){case"ArrowLeft":return o.move(l.LEFT);case"ArrowRight":return o.move(l.RIGHT);case"ArrowDown":return o.move(l.DOWN);case"ArrowUp":return o.move(l.ROTATE);case" ":return o.move(l.DROP)}})}render(){const{tetrisState:t}=this.state;return n("div",{id:"app"},n("style",null,tt),n("div",{class:"row"},n("h1",null,"Tetris")),n("div",{class:"row"},n("div",null,n("tetris-grid",{grid:JSON.stringify(this.state.tetrisState.displayGrid)})),n("div",{class:"control"},n("h3",null,"Score"),n("div",{id:"score"},t.score),n("h3",null,"Help"),n("flip-switch",{id:"stop",key:"S",active:t.stopped?"true":"false",onChange:this.handleStartStop},"Start/Stop"),n("flip-switch",{id:"restart",key:"R",onChange:this.handleRestart},"Restart"))))}}customElements.define("main-app",et);
