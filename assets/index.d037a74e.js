var V=Object.defineProperty;var y=Object.getOwnPropertySymbols;var _=Object.prototype.hasOwnProperty,H=Object.prototype.propertyIsEnumerable;var b=(t,e,r)=>e in t?V(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,p=(t,e)=>{for(var r in e||(e={}))_.call(e,r)&&b(t,r,e[r]);if(y)for(var r of y(e))H.call(e,r)&&b(t,r,e[r]);return t};const K=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function r(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerpolicy&&(n.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?n.credentials="include":i.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=r(i);fetch(i.href,n)}};K();const x={gridSize:{row:20,col:10},speed:1e3},S=(t,e)=>{if(e<=0)return t;const r=t[0].map((s,i)=>t.map(n=>n[i]).reverse());return S(r,e-1)},E={I:[[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]],J:[[1,1,0],[1,0,0],[1,0,0]],L:[[1,1,0],[0,1,0],[0,1,0]],O:[[1,1],[1,1]],S:[[1,0,0],[1,1,0],[0,1,0]],SR:[[0,1,0],[1,1,0],[1,0,0]],T:[[0,1,0],[1,1,1],[0,0,0]]},F=t=>t.map(e=>e.map(r=>r)),m=({grid:t,block:{x:e,y:r,blockCode:s,rotation:i}})=>{const n=E[s],c=F(t);return S(n,i).forEach((d,R)=>{const u=r-R;d.forEach(($,j)=>{var v,w;if(!$)return;const h=e-j,q=h<0,D=h>=((v=c==null?void 0:c[u])==null?void 0:v.length),G=u>=c.length;if(q||D||G)throw new Error("OUT_OF_BOUND");if((w=c==null?void 0:c[u])!=null&&w[h])throw new Error("OVERLAP_VALUE");u>=0&&(c[u][h]=s)})}),c},L=({row:t,col:e})=>new Array(t).fill(0).map(()=>new Array(e).fill(0)),z=()=>{const t=Object.keys(E);return t[Math.floor(Math.random()*t.length)]},J=t=>{const e=t.filter(s=>!s.every(Boolean)),r=t.length-e.length;return{removedLine:r,grid:[...L({row:r,col:t[0].length}),...e]}};class f extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),this.state={}}get props(){const e=this.getAttributeNames();return Object.fromEntries(e.map(r=>[r,this.getAttribute(r)]))}attributeChangedCallback(e,r,s){this.onPropsChange(e,r,s),this.rerender()}connectedCallback(){this.onMount(),this.rerender()}disconnectedCallback(){this.onUnmount()}rerender(){const e=this.render();this.shadow.innerHTML=e}setState(e){this.state=p(p({},this.state),e),this.rerender()}onPropsChange(e,r,s){}onMount(){}onUnmount(){}render(){return""}}var A={exports:{}};/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/(function(t){(function(){var e={}.hasOwnProperty;function r(){for(var s=[],i=0;i<arguments.length;i++){var n=arguments[i];if(!!n){var c=typeof n;if(c==="string"||c==="number")s.push(n);else if(Array.isArray(n)){if(n.length){var a=r.apply(null,n);a&&s.push(a)}}else if(c==="object")if(n.toString===Object.prototype.toString)for(var d in n)e.call(n,d)&&n[d]&&s.push(d);else s.push(n.toString())}}return s.join(" ")}t.exports?(r.default=r,t.exports=r):window.classNames=r})()})(A);var C=A.exports;class X extends f{constructor(){super(),this.state={isActive:this.props.active==="true"},this.handleKeyDown=e=>{var r;if(e.key===((r=this.props.key)==null?void 0:r.toLowerCase())){const s=!this.state.isActive;this.setState({isActive:s}),this.dispatchEvent(new CustomEvent("change",{detail:s}))}}}static get observedAttributes(){return["active","key","activeColor"]}onMount(){window.addEventListener("keydown",this.handleKeyDown)}onUmount(){window.removeEventListener("keydown",this.handleKeyDown)}onPropsChange(e,r,s){e==="active"&&this.setState({isActive:s==="true"})}render(){const{isActive:e}=this.state,{key:r}=this.props;return`
        <style>
            .active {
                color: #f44336;
            }
        </style>
        <div class="${C({active:e})}">[${r==null?void 0:r.toUpperCase()}] <slot></slot></div>
    `}}customElements.define("flip-switch",X);class B extends f{constructor(){super()}static get observedAttributes(){return["val"]}render(){const{val:e}=this.props;return`
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
      <div class="${C("cell",e==null?void 0:e.toUpperCase())}">${(e==null?void 0:e.toUpperCase())||0},</div>
    `}}customElements.define("tetris-cell",B);class O extends f{constructor(){super()}static get observedAttributes(){return["last"]}render(){const{last:e}=this.props;return`
      <style>
        .row {
          line-height: 25px;
          display: flex;
        }
      </style>
      <div class="row">[<slot></slot>] ${e==="true"?"]":","}</div>
    `}}customElements.define("tetris-row",O);class M extends f{constructor(e){super(),this.state={grid:[]},this.setState({grid:e})}set grid(e){this.setState({grid:e})}render(){const{grid:e}=this.state,r=document.createElement("div");return e.forEach((s,i)=>{const n=new O;n.setAttribute("last",i===e.length-1?"true":"false"),s.forEach(c=>{const a=new B;a.setAttribute("val",String(c)),n.appendChild(a)}),r.appendChild(n)}),`
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
          ${r.innerHTML}
        </div>
      </div>
    `}}customElements.define("tetris-grid",M);const T=()=>({x:6,y:0,rotation:0,blockCode:z()}),U=()=>({grid:L(x.gridSize),currentBlock:T(),clock:void 0,stopped:!0,score:0});let o=U();const k=new M(o.grid),l=t=>{const e=p(p({},o.currentBlock),t);m({grid:o.grid,block:e}),o.currentBlock=e,I()},I=()=>{const t=document.querySelector("#grid");if(!t)return;const e=m({grid:o.grid,block:o.currentBlock});t.innerHTML="",k.grid=e,t.appendChild(k)},N=()=>{const t=document.querySelector("#score");!t||(t.innerText=o.score.toString())},g=()=>{clearInterval(o.clock),o=U(),I(),N(),P()},Y=()=>{try{o.score+=1,l({y:o.currentBlock.y+1})}catch{const e=m({grid:o.grid,block:o.currentBlock}),{grid:r,removedLine:s}=J(e);o.score+=s*100,o.grid=r;try{l(T())}catch{g()}}finally{N()}},P=()=>{const t=document.querySelector("#stop");!t||(o.stopped?(clearInterval(o.clock),o.clock=void 0):o.clock=setInterval(Y,x.speed),t==null||t.setAttribute("active",o.stopped?"true":"false"))};window.onload=()=>{var t,e;g(),(t=document.querySelector("#restart"))==null||t.addEventListener("change",r=>{r instanceof CustomEvent&&g()}),(e=document.querySelector("#stop"))==null||e.addEventListener("change",r=>{if(r instanceof CustomEvent){const s=r.detail;o.stopped=s,P()}})};document.addEventListener("keydown",t=>{try{switch(t.key){case"ArrowUp":{if(o.stopped)return;l({rotation:o.currentBlock.rotation+1>3?0:o.currentBlock.rotation+1});break}case"ArrowLeft":{if(o.stopped)return;l({x:o.currentBlock.x-1});break}case"ArrowRight":{if(o.stopped)return;l({x:o.currentBlock.x+1});break}case"ArrowDown":{if(o.stopped)return;l({y:o.currentBlock.y+1});break}case" ":{if(o.stopped)return;for(;;)l({y:o.currentBlock.y+1});break}}}catch{}});
