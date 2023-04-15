export const windrag={create(e,t,i={position:"absolute"}){i.position=i.position||"absolute",i.css=i.css||"",i.idLength=i.idLength||5,i.limitMovement=i.limitMovement||!1;let s="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",a=n.length,o=0;for(;o<i.idLength;)s+=n.charAt(Math.floor(Math.random()*a)),o+=1;let d=s;e=document.querySelector(e),t=document.querySelector(t),e.classList.add(`windrag-element-${d}`),t.classList.add(`windrag-activator-${d}`);let l;try{document.createEvent("TouchEvent"),l=!0}catch(c){l=!1}i.css&&(e.style.cssText+=i.css);let r=0,h=0,u=!1,m={mouse:{down:"mousedown",move:"mousemove",up:"mouseup"},touch:{down:"touchstart",move:"touchmove",up:"touchend"}},g=l?"touch":"mouse",v=!!l;function f(){u=!1,e.classList.remove("windrag-active")}return t.addEventListener(m[g].down,t=>{var s;return s=t,void(e.style.position=i.position,s.preventDefault(),r=v?s.touches[0].clientX:s.clientX,h=v?s.touches[0].clientY:s.clientY,u=!0)}),i.limitMovement?t.addEventListener(m[g].move,t=>(function t(i){if(u){e.classList.add("windrag-active"),i.preventDefault();let s=v?i.touches[0].clientX:i.clientX,n=v?i.touches[0].clientY:i.clientY,a=e.offsetTop-(h-n),o=e.offsetLeft-(r-s),d=0===document.body.clientWidth?0:Math.abs(document.body.clientWidth-e.offsetWidth),l=0===document.body.clientHeight?0:Math.abs(document.body.clientHeight-e.offsetHeight);a>l?e.style.top=l+"px":a<0?e.style.top="0px":e.style.top=a+"px",o>d?e.style.left=d+"px":o<0?e.style.left="0px":e.style.left=o+"px",r=s,h=n}})(t)):t.addEventListener(m[g].move,t=>(function t(i){if(u){e.classList.add("windrag-active"),i.preventDefault();let s=v?i.touches[0].clientX:i.clientX,n=v?i.touches[0].clientY:i.clientY,a=e.offsetTop-(h-n),o=e.offsetLeft-(r-s);e.style.top=a+"px",e.style.left=o+"px",r=s,h=n}})(t)),t.addEventListener("mouseleave",f),t.addEventListener(m[g].up,f),{id:d,elementId:`windrag-element-${d}`,activatorId:`windrag-activator-${d}`}},maximize(e){let t=document.querySelector(`.windrag-element-${e}`);t.classList.contains("windrag-maximized")?(t.classList.remove("windrag-maximized"),t.style.width=t.dataset.windragWidth,t.style.height=t.dataset.windragHeight,delete t.dataset.windragWidth,delete t.dataset.windragHeight):(t.classList.add("windrag-maximized"),t.dataset.windragWidth=t.style.width,t.dataset.windragHeight=t.style.height,t.style.width="100vw",t.style.height="100vh")},hide(e){let t=document.querySelector(`.windrag-element-${e}`);t.style.display="none"}};export default windrag;