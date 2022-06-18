var I=Object.defineProperty;var y=Object.getOwnPropertySymbols;var D=Object.prototype.hasOwnProperty,_=Object.prototype.propertyIsEnumerable;var k=(r,e,t)=>e in r?I(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,p=(r,e)=>{for(var t in e||(e={}))D.call(e,t)&&k(r,t,e[t]);if(y)for(var t of y(e))_.call(e,t)&&k(r,t,e[t]);return r};const G=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}};G();const H=(r,e)=>(Object.entries(r).forEach(([t,s])=>{e(t,r)}),new Proxy(r,{set:function(t,s,n){return t[s]=n,e(s,t),!0}}));const x={gridSize:{row:20,col:10},speed:1e3},E=(r,e)=>{if(e<=0)return r;const t=r[0].map((s,n)=>r.map(o=>o[n]).reverse());return E(t,e-1)},S={I:[[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]],J:[[1,1,0],[1,0,0],[1,0,0]],L:[[1,1,0],[0,1,0],[0,1,0]],O:[[1,1],[1,1]],S:[[1,0,0],[1,1,0],[0,1,0]],SR:[[0,1,0],[1,1,0],[1,0,0]],T:[[0,1,0],[1,1,1],[0,0,0]]},L=r=>r.map(e=>e.map(t=>t)),m=({grid:r,block:{x:e,y:t,blockCode:s,rotation:n}})=>{const o=S[s],i=L(r);return E(o,n).forEach((a,N)=>{const u=t-N;a.forEach((P,R)=>{var g,v;if(!P)return;const h=e-R,$=h<0,j=h>=((g=i==null?void 0:i[u])==null?void 0:g.length),q=u>=i.length;if($||j||q)throw new Error("OUT_OF_BOUND");if((v=i==null?void 0:i[u])!=null&&v[h])throw new Error("OVERLAP_VALUE");u>=0&&(i[u][h]=s)})}),i},A=({row:r,col:e})=>new Array(r).fill(0).map(()=>new Array(e).fill(0)),K=()=>{const r=Object.keys(S);return r[Math.floor(Math.random()*r.length)]},V=r=>{const e=L(r),t=e.filter(n=>!n.every(Boolean)),s=e.length-t.length;return{removedLine:s,grid:[...A({row:s,col:r[0].length}),...t]}};class b extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),this.state={}}get props(){const e=this.getAttributeNames();return Object.fromEntries(e.map(t=>[t,this.getAttribute(t)]))}attributeChangedCallback(e,t,s){this.onPropsChange(e,t,s),this.rerender()}connectedCallback(){this.onMount(),this.rerender()}disconnectedCallback(){this.onUnmount()}rerender(){const e=this.render();this.shadow.innerHTML=e}setState(e){this.state=p(p({},this.state),e),this.rerender()}onPropsChange(e,t,s){}onMount(){}onUnmount(){}render(){return""}}var C={exports:{}};/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/(function(r){(function(){var e={}.hasOwnProperty;function t(){for(var s=[],n=0;n<arguments.length;n++){var o=arguments[n];if(!!o){var i=typeof o;if(i==="string"||i==="number")s.push(o);else if(Array.isArray(o)){if(o.length){var l=t.apply(null,o);l&&s.push(l)}}else if(i==="object")if(o.toString===Object.prototype.toString)for(var a in o)e.call(o,a)&&o[a]&&s.push(a);else s.push(o.toString())}}return s.join(" ")}r.exports?(t.default=t,r.exports=t):window.classNames=t})()})(C);var O=C.exports;class F extends b{constructor(){super(),this.handleKeyDown=e=>{var t;if(e.key===((t=this.props.key)==null?void 0:t.toLowerCase())){const s=this.props.active!=="true";this.setState({isActive:s}),this.dispatchEvent(new CustomEvent("change",{detail:s}))}}}static get observedAttributes(){return["active","key","activeColor"]}onMount(){window.addEventListener("keydown",this.handleKeyDown)}onUmount(){window.removeEventListener("keydown",this.handleKeyDown)}render(){const{key:e,active:t}=this.props;return`
        <style>
            .active {
                color: #f44336;
            }
        </style>
        <div class="${O({active:t==="true"})}">[${e==null?void 0:e.toUpperCase()}] <slot></slot></div>
    `}}customElements.define("flip-switch",F);class M extends b{constructor(){super()}static get observedAttributes(){return["val"]}render(){const{val:e}=this.props;return`
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
      <div class="${O("cell",e==null?void 0:e.toUpperCase())}">${(e==null?void 0:e.toUpperCase())||0},</div>
    `}}customElements.define("tetris-cell",M);class T extends b{constructor(){super()}static get observedAttributes(){return["last"]}render(){const{last:e}=this.props;return`
      <style>
        .row {
          line-height: 25px;
          display: flex;
        }
      </style>
      <div class="row">[<slot></slot>] ${e==="true"?"]":","}</div>
    `}}customElements.define("tetris-row",T);class U extends b{constructor(e){super(),this.state={grid:[]},this.setState({grid:e})}set grid(e){this.setState({grid:e})}render(){const{grid:e}=this.state,t=document.createElement("div");return e.forEach((s,n)=>{const o=new T;o.setAttribute("last",n===e.length-1?"true":"false"),s.forEach(i=>{const l=new M;l.setAttribute("val",String(i)),o.appendChild(l)}),t.appendChild(o)}),`
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
    `}}customElements.define("tetris-grid",U);const B=()=>({x:6,y:0,rotation:0,blockCode:K()});let w;const f=()=>H({grid:A(x.gridSize),block:B(),clock:void 0,stopped:!0,score:0},(r,{grid:e,block:t,score:s,stopped:n})=>{var o;switch(r){case"grid":case"block":{const i=document.querySelector("#grid");if(!i)return;const l=new U(e),a=m({grid:e,block:t});i.innerHTML="",l.grid=a,i.appendChild(l);break}case"score":{const i=document.querySelector("#score");if(!i)return;i.innerText=s.toString();break}case"stopped":{n?(clearInterval(w),w=void 0):w=setInterval(z,x.speed),(o=document.querySelector("#stop"))==null||o.setAttribute("active",n?"true":"false");break}}});let c=f();const d=r=>{const e=p(p({},c.block),r);m({grid:c.grid,block:e}),c.block=e},z=()=>{try{c.score+=1,d({y:c.block.y+1})}catch{try{const e=m({grid:c.grid,block:c.block}),{grid:t,removedLine:s}=V(e);c.score+=s*100,d(B()),c.grid=t}catch{c=f()}}};window.onload=()=>{var r,e;c=f(),(r=document.querySelector("#restart"))==null||r.addEventListener("change",t=>{t instanceof CustomEvent&&(c=f())}),(e=document.querySelector("#stop"))==null||e.addEventListener("change",t=>{if(t instanceof CustomEvent){const s=t.detail;c.stopped=s}})};document.addEventListener("keydown",r=>{try{switch(r.key){case"ArrowUp":{if(c.stopped)return;d({rotation:c.block.rotation+1>3?0:c.block.rotation+1});break}case"ArrowLeft":{if(c.stopped)return;d({x:c.block.x-1});break}case"ArrowRight":{if(c.stopped)return;d({x:c.block.x+1});break}case"ArrowDown":{if(c.stopped)return;d({y:c.block.y+1});break}case" ":{if(c.stopped)return;for(;;)d({y:c.block.y+1});break}}}catch{}});
