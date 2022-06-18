var R=Object.defineProperty;var E=Object.getOwnPropertySymbols;var D=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable;var S=(r,e,t)=>e in r?R(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,p=(r,e)=>{for(var t in e||(e={}))D.call(e,t)&&S(r,t,e[t]);if(E)for(var t of E(e))G.call(e,t)&&S(r,t,e[t]);return r};const H=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}};H();const L={I:[[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]],J:[[1,1,0],[1,0,0],[1,0,0]],L:[[1,1,0],[0,1,0],[0,1,0]],O:[[1,1],[1,1]],S:[[1,0,0],[1,1,0],[0,1,0]],SR:[[0,1,0],[1,1,0],[1,0,0]],T:[[0,1,0],[1,1,1],[0,0,0]]},K=(r,e)=>(Object.entries(r).forEach(([t,n])=>{e(t,r)}),new Proxy(r,{set:function(t,n,o){return t[n]=o,e(n,t),!0}}));const w={gridSize:{row:20,col:10},speed:1e3},A=(r,e)=>{if(e<=0)return r;const t=r[0].map((n,o)=>r.map(s=>s[o]).reverse());return A(t,e-1)},C=r=>r.map(e=>e.map(t=>t)),g=({grid:r,block:{x:e,y:t,blockCode:n,rotation:o}})=>{const s=L[n],i=C(r);return A(s,o).forEach((l,f)=>{const d=t-f;l.forEach((N,P)=>{var k,x;if(!N)return;const b=e-P,$=b<0,j=b>=((k=i==null?void 0:i[d])==null?void 0:k.length),q=d>=i.length;if($||j||q)throw new Error("OUT_OF_BOUND");if((x=i==null?void 0:i[d])!=null&&x[b])throw new Error("OVERLAP_VALUE");d>=0&&(i[d][b]=n)})}),i},V=({row:r,col:e})=>new Array(r).fill(0).map(()=>new Array(e).fill(0)),z=r=>{const e=C(r),t=e.filter(o=>!o.every(Boolean)),n=e.length-t.length;return{removedLine:n,grid:[...V({row:n,col:r[0].length}),...t]}};class v extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),this.state={}}get props(){const e=this.getAttributeNames();return Object.fromEntries(e.map(t=>[t,this.getAttribute(t)]))}attributeChangedCallback(e,t,n){this.onPropsChange(e,t,n),this.rerender()}connectedCallback(){this.onMount(),this.rerender()}disconnectedCallback(){this.onUnmount()}rerender(){const e=this.render();this.shadow.innerHTML=e}setState(e){this.state=p(p({},this.state),e),this.rerender()}onPropsChange(e,t,n){}onMount(){}onUnmount(){}render(){return""}}var O={exports:{}};/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/(function(r){(function(){var e={}.hasOwnProperty;function t(){for(var n=[],o=0;o<arguments.length;o++){var s=arguments[o];if(!!s){var i=typeof s;if(i==="string"||i==="number")n.push(s);else if(Array.isArray(s)){if(s.length){var a=t.apply(null,s);a&&n.push(a)}}else if(i==="object")if(s.toString===Object.prototype.toString)for(var l in s)e.call(s,l)&&s[l]&&n.push(l);else n.push(s.toString())}}return n.join(" ")}r.exports?(t.default=t,r.exports=t):window.classNames=t})()})(O);var M=O.exports;class F extends v{constructor(){super(),this.handleKeyDown=e=>{var t;if(e.key===((t=this.props.key)==null?void 0:t.toLowerCase())){const n=this.props.active!=="true";this.setState({isActive:n}),this.dispatchEvent(new CustomEvent("change",{detail:n}))}}}static get observedAttributes(){return["active","key","activeColor"]}onMount(){window.addEventListener("keydown",this.handleKeyDown)}onUmount(){window.removeEventListener("keydown",this.handleKeyDown)}render(){const{key:e,active:t}=this.props;return`
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
    `}}customElements.define("tetris-row",U);class B extends v{constructor(e){super(),this.state={grid:[]},this.setState({grid:e})}set grid(e){this.setState({grid:e})}render(){const{grid:e}=this.state,t=document.createElement("div");return e.forEach((n,o)=>{const s=new U;s.setAttribute("last",o===e.length-1?"true":"false"),n.forEach(i=>{const a=new T;a.setAttribute("val",String(i)),s.appendChild(a)}),t.appendChild(s)}),`
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
    `}}customElements.define("tetris-grid",B);const I=()=>{const r=Object.keys(L),e=r[Math.floor(Math.random()*r.length)];return{x:6,y:0,rotation:0,blockCode:e}},m=()=>{const r=new Array(w.gridSize.row).fill(0).map(()=>new Array(w.gridSize.col).fill(0)),e=I();return K({block:e,grid:r,stopped:!0,score:0},(t,{grid:n,block:o,score:s,stopped:i})=>{var a;switch(t){case"grid":case"block":{const l=document.querySelector("#grid");if(!l)return;const f=new B(n),d=g({grid:n,block:o});l.innerHTML="",f.grid=d,l.appendChild(f);break}case"score":{const l=document.querySelector("#score");if(!l)return;l.innerText=s.toString();break}case"stopped":{i?(clearInterval(h),h=void 0):h=setInterval(y,w.speed),(a=document.querySelector("#stop"))==null||a.setAttribute("active",i?"true":"false");break}}})};let h,c=m();const u=r=>{const e=p(p({},c.block),r);g({grid:c.grid,block:e}),c.block=e},_=()=>{clearInterval(h),h=void 0,h=setInterval(y,w.speed)},y=()=>{try{c.score+=1,u({y:c.block.y+1})}catch{try{const{grid:e,block:t}=c,{grid:n,removedLine:o}=z(g({grid:e,block:t}));u(I()),c.score+=o*100,c.grid=n}catch{c=m()}}};window.onload=()=>{var r,e;c=m(),(r=document.querySelector("#restart"))==null||r.addEventListener("change",t=>{t instanceof CustomEvent&&(c=m())}),(e=document.querySelector("#stop"))==null||e.addEventListener("change",t=>{t instanceof CustomEvent&&(c.stopped=t.detail)})};document.addEventListener("keydown",r=>{try{if(c.stopped)return;switch(r.key){case"ArrowUp":{const e=c.block.rotation>=3?0:c.block.rotation+1;u({rotation:e});break}case"ArrowLeft":{const e=c.block.x-1;u({x:e});break}case"ArrowRight":{const e=c.block.x+1;u({x:e});break}case"ArrowDown":{const e=c.block.y+1;u({y:e});break}case" ":{try{for(;;){const e=c.block.y+1;u({y:e})}}catch{}finally{y(),_()}break}}}catch{}});
