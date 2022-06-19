var q=Object.defineProperty;var E=Object.getOwnPropertySymbols;var D=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable;var S=(r,e,t)=>e in r?q(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,h=(r,e)=>{for(var t in e||(e={}))D.call(e,t)&&S(r,t,e[t]);if(E)for(var t of E(e))G.call(e,t)&&S(r,t,e[t]);return r};const H=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}};H();const L={I:[[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]],J:[[1,1,0],[1,0,0],[1,0,0]],L:[[1,1,0],[0,1,0],[0,1,0]],O:[[1,1],[1,1]],S:[[1,0,0],[1,1,0],[0,1,0]],SR:[[0,1,0],[1,1,0],[1,0,0]],T:[[0,1,0],[1,1,1],[0,0,0]]},K=(r,e)=>(Object.entries(r).forEach(([t,n])=>{e(t,r)}),new Proxy(r,{set:function(t,n,s){return t[n]=s,e(n,t),!0}}));const w={gridSize:{row:20,col:10},speed:1e3},A=(r,e)=>{if(e<=0)return r;const t=r[0].map((n,s)=>r.map(o=>o[s]).reverse());return A(t,e-1)},C=r=>r.map(e=>e.map(t=>t)),v=({grid:r,block:{x:e,y:t,blockCode:n,rotation:s}})=>{const o=L[n],i=C(r);return A(o,s).forEach((a,g)=>{const f=t-g;a.forEach((I,N)=>{var x,k;if(!I)return;const p=e-N,P=p<0,R=p>=((x=i==null?void 0:i[f])==null?void 0:x.length),$=f>=i.length;if(P||R||$)throw new Error("OUT_OF_BOUND");if((k=i==null?void 0:i[f])!=null&&k[p])throw new Error("OVERLAP_VALUE");f>=0&&(i[f][p]=n)})}),i},V=({row:r,col:e})=>new Array(r).fill(0).map(()=>new Array(e).fill(0)),z=r=>{const e=C(r),t=e.filter(s=>!s.every(Boolean)),n=e.length-t.length;return{removedLine:n,grid:[...V({row:n,col:r[0].length}),...t]}};class m extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),this.state={}}get props(){const e=this.getAttributeNames();return Object.fromEntries(e.map(t=>[t,this.getAttribute(t)]))}attributeChangedCallback(e,t,n){this.onPropsChange(e,t,n),this.rerender()}connectedCallback(){this.onMount(),this.rerender()}disconnectedCallback(){this.onUnmount()}rerender(){const e=this.render();this.shadow.innerHTML=e}setState(e){this.state=h(h({},this.state),e),this.rerender()}onPropsChange(e,t,n){}onMount(){}onUnmount(){}render(){return""}}var O={exports:{}};/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/(function(r){(function(){var e={}.hasOwnProperty;function t(){for(var n=[],s=0;s<arguments.length;s++){var o=arguments[s];if(!!o){var i=typeof o;if(i==="string"||i==="number")n.push(o);else if(Array.isArray(o)){if(o.length){var l=t.apply(null,o);l&&n.push(l)}}else if(i==="object")if(o.toString===Object.prototype.toString)for(var a in o)e.call(o,a)&&o[a]&&n.push(a);else n.push(o.toString())}}return n.join(" ")}r.exports?(t.default=t,r.exports=t):window.classNames=t})()})(O);var M=O.exports;class F extends m{constructor(){super(),this.handleKeyDown=e=>{var t;if(e.key===((t=this.props.key)==null?void 0:t.toLowerCase())){const n=this.props.active!=="true";this.setState({isActive:n}),this.dispatchEvent(new CustomEvent("change",{detail:n}))}}}static get observedAttributes(){return["active","key","activeColor"]}onMount(){window.addEventListener("keydown",this.handleKeyDown)}onUmount(){window.removeEventListener("keydown",this.handleKeyDown)}render(){const{key:e,active:t}=this.props;return`
      <style>
        .active {
          color: #f44336;
        }
      </style>
      <div class="${M({active:t==="true"})}">[${e==null?void 0:e.toUpperCase()}] <slot></slot></div>
    `}}customElements.define("flip-switch",F);class T extends m{constructor(){super()}static get observedAttributes(){return["val"]}render(){const{val:e}=this.props;return`
      <style>
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
      </style>
      <div class="${M("cell",e==null?void 0:e.toUpperCase())}">${(e==null?void 0:e.toUpperCase())||0},</div>
    `}}customElements.define("tetris-cell",T);class U extends m{constructor(){super()}static get observedAttributes(){return["last"]}render(){const{last:e}=this.props;return`
      <style>
        .row {
          line-height: 25px;
          display: flex;
        }
      </style>
      <div class="row">[<slot></slot>] ${e==="true"?"]":","}</div>
    `}}customElements.define("tetris-row",U);class j extends m{constructor(e){super(),this.state={grid:[]},this.setState({grid:e})}set grid(e){this.setState({grid:e})}render(){const{grid:e}=this.state,t=document.createElement("div");return e.forEach((n,s)=>{const o=new U;o.setAttribute("last",s===e.length-1?"true":"false"),n.forEach(i=>{const l=new T;l.setAttribute("val",String(i)),o.appendChild(l)}),t.appendChild(o)}),`
      <style>
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
      </style>
      <div class='container'>
        <div class="grid-start">var grid = [&nbsp;</div>
        <div>
          ${t.innerHTML}
        </div>
      </div>
    `}}customElements.define("tetris-grid",j);const B=()=>{const r=Object.keys(L),e=r[Math.floor(Math.random()*r.length)];return{x:6,y:0,rotation:0,blockCode:e}},b=()=>{const r=new Array(w.gridSize.row).fill(0).map(()=>new Array(w.gridSize.col).fill(0));return K({block:B(),grid:r,stopped:!0,score:0},(e,{grid:t,block:n,score:s,stopped:o})=>{var i;switch(e){case"grid":case"block":{const l=document.querySelector("#grid");if(!l)return;const a=new j(t),g=v({grid:t,block:n});l.innerHTML="",a.grid=g,l.appendChild(a);break}case"score":{const l=document.querySelector("#score");if(!l)return;l.innerText=s.toString();break}case"stopped":{o?(clearInterval(u),u=void 0):u=setInterval(y,w.speed),(i=document.querySelector("#stop"))==null||i.setAttribute("active",o?"true":"false");break}}})};let u,c=b();const d=r=>{try{const e=h(h({},c.block),r);return v({grid:c.grid,block:e}),c.block=e,!0}catch{return!1}},_=()=>{clearInterval(u),u=void 0,u=setInterval(y,w.speed)},y=()=>{if(c.score+=1,d({y:c.block.y+1}))return;const{grid:r,block:e}=c,{grid:t,removedLine:n}=z(v({grid:r,block:e}));d(B())?(c.score+=n*100,c.grid=t):c=b()};window.onload=()=>{var r,e;c=b(),(r=document.querySelector("#restart"))==null||r.addEventListener("change",t=>{t instanceof CustomEvent&&(c=b())}),(e=document.querySelector("#stop"))==null||e.addEventListener("change",t=>{t instanceof CustomEvent&&(c.stopped=t.detail)})};document.addEventListener("keydown",r=>{if(c.stopped)return;const{block:{rotation:e,x:t,y:n}}=c;switch(r.key){case"ArrowLeft":return d({x:t-1});case"ArrowRight":return d({x:t+1});case"ArrowDown":return d({y:n+1});case"ArrowUp":return d({rotation:e>=3?0:e+1});case" ":{let s=!0,o=n;do s=d({y:o+=1});while(s);_(),y();break}}});
