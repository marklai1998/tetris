const f=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}};f();const d=({row:r,col:o})=>new Array(r).fill(new Array(o).fill(0)),l={gridSize:{row:20,col:10},speed:1e3};d(l.gridSize);d(l.gridSize);let p=d(l.gridSize),a,s=!0;const m=()=>{console.log("tick")},u=()=>{var o;const r=(o=document.querySelector("#stop"))==null?void 0:o.classList;!r||(s?(clearInterval(a),r.add("active")):(a=setInterval(m,l.speed),r.remove("active")))};window.onload=()=>{const r=document.querySelector("#grid");!r||(p.forEach((o,c)=>{const n=document.createElement("div");n.className="grid-row",n.id="R"+c,o.forEach((e,t)=>{const i=document.createElement("cell");i.textContent=String(e),i.id="R"+c+"C"+t,i.className="grid-cell",n.appendChild(i)}),r.appendChild(n)}),u())};document.addEventListener("keyup",r=>{switch(r.key.toUpperCase()){case"S":s=!s,u();break}});
