(()=>{"use strict";document.querySelectorAll(".progress").forEach((e=>{e.addEventListener("input",(function(){const e=this.value;this.style.background=`linear-gradient(to right, #710707 0%, #710707 ${e}%, #C4C4C4 ${e}%, #C4C4C4 100%)`}))})),function(){const e=["./assets/img/galery/galery1.jpg","./assets/img/galery/galery2.jpg","./assets/img/galery/galery3.jpg","./assets/img/galery/galery4.jpg","./assets/img/galery/galery5.jpg","./assets/img/galery/galery6.jpg","./assets/img/galery/galery7.jpg","./assets/img/galery/galery8.jpg","./assets/img/galery/galery9.jpg","./assets/img/galery/galery10.jpg","./assets/img/galery/galery11.jpg","./assets/img/galery/galery12.jpg","./assets/img/galery/galery13.jpg","./assets/img/galery/galery14.jpg","./assets/img/galery/galery15.jpg"];e.sort((()=>Math.random()-.5));const s=document.querySelector(".picture-inner-container");e.forEach((e=>{const t=document.createElement("img");t.src=`${e}`,t.alt="galery image",s.append(t)}))}();const e=document.querySelector(".button-buy"),s=document.querySelector(".buy-ticket-close"),t=document.querySelector(".buy-tickets-container");e.addEventListener("click",(function(){t.classList.remove("buy-tickets-hidden")})),s.addEventListener("click",(function(){t.classList.add("buy-tickets-hidden")}))})();