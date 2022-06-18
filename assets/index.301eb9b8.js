var R=Object.defineProperty;var E=Object.getOwnPropertySymbols;var D=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable;var S=(r,e,t)=>e in r?R(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,f=(r,e)=>{for(var t in e||(e={}))D.call(e,t)&&S(r,t,e[t]);if(E)for(var t of E(e))G.call(e,t)&&S(r,t,e[t]);return r};const H=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}};H();const L={I:[[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]],J:[[1,1,0],[1,0,0],[1,0,0]],L:[[1,1,0],[0,1,0],[0,1,0]],O:[[1,1],[1,1]],S:[[1,0,0],[1,1,0],[0,1,0]],SR:[[0,1,0],[1,1,0],[1,0,0]],T:[[0,1,0],[1,1,1],[0,0,0]]},K=(r,e)=>(Object.entries(r).forEach(([t,s])=>{e(t,r)}),new Proxy(r,{set:function(t,s,n){return t[s]=n,e(s,t),!0}}));const w={gridSize:{row:20,col:10},speed:1e3},A=(r,e)=>{if(e<=0)return r;const t=r[0].map((s,n)=>r.map(o=>o[n]).reverse());return A(t,e-1)},C=r=>r.map(e=>e.map(t=>t)),b=({grid:r,block:{x:e,y:t,blockCode:s,rotation:n}})=>{const o=L[s],i=C(r);return A(o,n).forEach((a,g)=>{const h=t-g;a.forEach((N,P)=>{var x,k;if(!N)return;const p=e-P,$=p<0,j=p>=((x=i==null?void 0:i[h])==null?void 0:x.length),q=h>=i.length;if($||j||q)throw new Error("OUT_OF_BOUND");if((k=i==null?void 0:i[h])!=null&&k[p])throw new Error("OVERLAP_VALUE");h>=0&&(i[h][p]=s)})}),i},V=({row:r,col:e})=>new Array(r).fill(0).map(()=>new Array(e).fill(0)),z=r=>{const e=C(r),t=e.filter(n=>!n.every(Boolean)),s=e.length-t.length;return{removedLine:s,grid:[...V({row:s,col:r[0].length}),...t]}};class v extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),this.state={}}get props(){const e=this.getAttributeNames();return Object.fromEntries(e.map(t=>[t,this.getAttribute(t)]))}attributeChangedCallback(e,t,s){this.onPropsChange(e,t,s),this.rerender()}connectedCallback(){this.onMount(),this.rerender()}disconnectedCallback(){this.onUnmount()}rerender(){const e=this.render();this.shadow.innerHTML=e}setState(e){this.state=f(f({},this.state),e),this.rerender()}onPropsChange(e,t,s){}onMount(){}onUnmount(){}render(){return""}}var O={exports:{}};/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/(function(r){(function(){var e={}.hasOwnProperty;function t(){for(var s=[],n=0;n<arguments.length;n++){var o=arguments[n];if(!!o){var i=typeof o;if(i==="string"||i==="number")s.push(o);else if(Array.isArray(o)){if(o.length){var l=t.apply(null,o);l&&s.push(l)}}else if(i==="object")if(o.toString===Object.prototype.toString)for(var a in o)e.call(o,a)&&o[a]&&s.push(a);else s.push(o.toString())}}return s.join(" ")}r.exports?(t.default=t,r.exports=t):window.classNames=t})()})(O);var M=O.exports;class F extends v{constructor(){super(),this.handleKeyDown=e=>{var t;if(e.key===((t=this.props.key)==null?void 0:t.toLowerCase())){const s=this.props.active!=="true";this.setState({isActive:s}),this.dispatchEvent(new CustomEvent("change",{detail:s}))}}}static get observedAttributes(){return["active","key","activeColor"]}onMount(){window.addEventListener("keydown",this.handleKeyDown)}onUmount(){window.removeEventListener("keydown",this.handleKeyDown)}render(){const{key:e,active:t}=this.props;return`
        <style>
            .active {
                color: #f44336;
            }
        </style>
        <div class="${M({active:t==="true"})}">[${e==null?void 0:e.toUpperCase()}] <slot></slot></div>
    `}}customElements.define("flip-switch",F);class T extends v{constructor(){super()}static get observedAttributes(){return["val"]}render(){const{val:e}=this.props;return`
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
    `}}customElements.define("tetris-cell",T);class U extends v{constructor(){super()}static get observedAttributes(){return["last"]}render(){const{last:e}=this.props;return`
      <style>
        .row {
          line-height: 25px;
          display: flex;
        }
      </style>
      <div class="row">[<slot></slot>] ${e==="true"?"]":","}</div>
    `}}customElements.define("tetris-row",U);class B extends v{constructor(e){super(),this.state={grid:[]},this.setState({grid:e})}set grid(e){this.setState({grid:e})}render(){const{grid:e}=this.state,t=document.createElement("div");return e.forEach((s,n)=>{const o=new U;o.setAttribute("last",n===e.length-1?"true":"false"),s.forEach(i=>{const l=new T;l.setAttribute("val",String(i)),o.appendChild(l)}),t.appendChild(o)}),`
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
    `}}customElements.define("tetris-grid",B);const I=()=>{const r=Object.keys(L),e=r[Math.floor(Math.random()*r.length)];return{x:6,y:0,rotation:0,blockCode:e}},m=()=>{const r=new Array(w.gridSize.row).fill(0).map(()=>new Array(w.gridSize.col).fill(0));return K({block:I(),grid:r,stopped:!0,score:0},(e,{grid:t,block:s,score:n,stopped:o})=>{var i;switch(e){case"grid":case"block":{const l=document.querySelector("#grid");if(!l)return;const a=new B(t),g=b({grid:t,block:s});l.innerHTML="",a.grid=g,l.appendChild(a);break}case"score":{const l=document.querySelector("#score");if(!l)return;l.innerText=n.toString();break}case"stopped":{o?(clearInterval(u),u=void 0):u=setInterval(y,w.speed),(i=document.querySelector("#stop"))==null||i.setAttribute("active",o?"true":"false");break}}})};let u,c=m();const d=r=>{try{const e=f(f({},c.block),r);return b({grid:c.grid,block:e}),c.block=e,!0}catch{return!1}},_=()=>{clearInterval(u),u=void 0,u=setInterval(y,w.speed)},y=()=>{if(c.score+=1,d({y:c.block.y+1}))return;const{grid:r,block:e}=c,{grid:t,removedLine:s}=z(b({grid:r,block:e}));d(I())?(c.score+=s*100,c.grid=t):c=m()};window.onload=()=>{var r,e;c=m(),(r=document.querySelector("#restart"))==null||r.addEventListener("change",t=>{t instanceof CustomEvent&&(c=m())}),(e=document.querySelector("#stop"))==null||e.addEventListener("change",t=>{t instanceof CustomEvent&&(c.stopped=t.detail)})};document.addEventListener("keydown",r=>{if(c.stopped)return;const{block:{rotation:e,x:t,y:s}}=c;switch(r.key){case"ArrowLeft":return d({x:t-1});case"ArrowRight":return d({x:t+1});case"ArrowDown":return d({y:s+1});case"ArrowUp":return d({rotation:e>=3?0:e+1});case" ":{let n=!0,o=s;do n=d({y:o+=1});while(n);_(),y();break}}});
