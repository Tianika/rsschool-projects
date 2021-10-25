(()=>{"use strict";(()=>{function e(e){const t=document.querySelector(".time"),n=document.querySelector(".date");let o=new Date,a=o.toLocaleTimeString(),r=o.toLocaleDateString(`${e}-${e}`,{weekday:"long",month:"long",day:"numeric"});t.textContent=`${a}`,n.textContent=`${r}`}function t(e){const t=document.querySelector(".greeting");let o=n();"ru"===e?("night"===o&&(t.innerText="Доброй ночи,"),"morning"===o&&(t.innerText="Доброе утро,"),"afternoon"===o&&(t.innerText="Добрый день,"),"evening"===o&&(t.innerText="Добрый вечер,")):t.innerText=`Good ${o},`}function n(){return["night","morning","afternoon","evening"][Math.floor((new Date).getHours()/6)]}const o=document.querySelector(".name");function a(e){let t=localStorage.nameForMomentum;o.value=t||"","en"===e&&(o.placeholder="enter name"),"ru"===e&&(o.placeholder="введите имя")}async function r(e,t){const n=document.querySelector("body"),o=document.querySelectorAll(".image-input");let a="github",r=`https://raw.githubusercontent.com/Tianika/stage1-tasks/assets/images/${e}/${t.toString().padStart(2,"0")}.jpg`;const c=new Image;o.forEach((e=>{e.checked&&(a=e.id)})),"github"===a&&(r=`https://raw.githubusercontent.com/Tianika/stage1-tasks/assets/images/${e}/${t.toString().padStart(2,"0")}.jpg`),"flickr"===a&&(r=await async function(e){const t=`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=19c7c0645a84f349b12219623e186297&tags=${e}&tags=${localStorage.imageKeyword}&extras=url_l&format=json&nojsoncallback=1&content_type=1&per_page=5`,n=await fetch(t);return(await n.json()).photos.photo[Math.round(5*Math.random())].url_l}(e)),"unsplash"===a&&(r=await async function(e){const t=`https://api.unsplash.com/photos/random?orientation=landscape&query=${localStorage.imageKeyword}&${e}&client_id=VgeZavA1Tb6SG4AWyyhuSVWUyqs5WWaN8fN1jcHyGY0`,n=await fetch(t);return(await n.json()).urls.regular}(e)),c.src=await r,c.addEventListener("load",(()=>n.style.backgroundImage=`url(${r})`))}const c=document.querySelector(".weather-icon"),l=document.querySelector(".temperature"),i=document.querySelector(".weather-description"),s=document.querySelector(".wind"),u=document.querySelector(".humidity"),d=document.querySelector(".city"),m=document.querySelector(".weather-error");async function g(e){localStorage.personalCity||(d.value="ru"===e?"Минск":"Minsk");const t=`https://api.openweathermap.org/data/2.5/weather?q=${localStorage.personalCity||"Minsk"}&lang=${e}&appid=3f51cef83569782eeec8097b9f7266fc&units=metric`,n=await fetch(t),o=await n.json();try{"ru"===e?(d.placeholder="Введите город",s.textContent=`Скорость ветра: ${Math.round(o.wind.speed)} м/с`,u.textContent=`Влажность: ${o.main.humidity}%`):(d.placeholder="Enter city",s.textContent=`Wind speed: ${Math.round(o.wind.speed)} m/s`,u.textContent=`Humidity: ${o.main.humidity}%`),m.textContent="",c.className="weather-icon owf",c.classList.add(`owf-${o.weather[0].id}`),l.textContent=`${Math.round(o.main.temp)}°C`,i.textContent=o.weather[0].description}catch(e){c.classList="",l.textContent="",i.textContent="",s.textContent="",u.textContent="",m.textContent=`${o.message}`}}async function p(e){const t=document.querySelector(".quote"),n=document.querySelector(".author"),o=`../momentum/assets/json/quotes-${e}.json`,a=await fetch(o),r=await a.json();let c=(l=r,Math.floor(Math.random()*l.length));var l;t.textContent=`${r[c].quote}`,n.textContent=`${r[c].author}`}d.value=localStorage.personalCity||"Minsk",d.addEventListener("change",(()=>{localStorage.personalCity=d.value,g(localStorage.appLanguage||"en")}));const S=[{title:"Aqua Caelestis",src:"../momentum/assets/sounds/Aqua Caelestis.mp3",duration:"00:39"},{title:"Ennio Morricone",src:"../momentum/assets/sounds/Ennio Morricone.mp3",duration:"01:37"},{title:"River Flows In You",src:"../momentum/assets/sounds/River Flows In You.mp3",duration:"01:37"},{title:"Summer Wind",src:"../momentum/assets/sounds/Summer Wind.mp3",duration:"01:50"}],y=document.querySelector(".links");let f=[{href:"https://learn.javascript.ru/",name:"Learn JS"},{href:"https://developer.mozilla.org/ru/docs/Web",name:"MDN Web Docs"},{href:"https://doka.guide/",name:"Doka"}];function h(){f.forEach((e=>{v(e)}))}function v(e){let t=document.createElement("p");t.classList.add("link-style");let n=document.createElement("a");n.innerHTML=`<a href=${e.href} target="_blank">${e.name}</a>`,t.append(n),y.append(t)}function L(e){!function(e){const t=document.querySelector(".settings-title"),n=document.querySelector(".label-keywords"),o=document.querySelector(".audio-on span"),a=document.querySelector(".weather-on span"),r=document.querySelector(".time-on span"),c=document.querySelector(".date-on span"),l=document.querySelector(".greeting-on span"),i=document.querySelector(".quotes-on span"),s=document.querySelector(".links-on span");"ru"===e&&(t.textContent="Настройки:",n.textContent="Ключевое слово для Flickr и Unsplash:",o.textContent="Аудио",a.textContent="Погода",r.textContent="Время",c.textContent="Дата",l.textContent="Приветствие",i.textContent="Цитаты",s.textContent="Ссылки"),"en"===e&&(t.textContent="Settings:",n.textContent="Keyword for Flickr and Unsplash:",o.textContent="Audio",a.textContent="Weather",r.textContent="Time",c.textContent="Date",l.textContent="Greeting",i.textContent="Quotes",s.textContent="Links")}(e),function(e){const t=document.querySelector(".link-title"),n=document.querySelector(".add-link"),o=document.querySelector(".remove-link"),a=document.querySelector(".link-name"),r=document.querySelector(".link-describe");"ru"===e&&(t.innerText="Ссылки:",n.innerText="Добавить",o.innerText="Удалить",a.innerText="Название:",r.innerText="Ссылка:"),"en"===e&&(t.innerText="Links:",n.innerText="Add",o.innerText="Remove",a.innerText="Title:",r.innerText="Link:")}(e)}localStorage.linksList&&(f=JSON.parse(localStorage.linksList));let q=Math.ceil(20*Math.random()),k=n();const x=document.querySelector(".change-quote");setTimeout((function n(){e(localStorage.appLanguage||"en"),t(localStorage.appLanguage||"en"),setTimeout(n,1e3)}),1e3-(new Date).getMilliseconds()),window.addEventListener("load",(()=>{a(localStorage.appLanguage||"en"),e(localStorage.appLanguage||"en"),t(localStorage.appLanguage||"en"),g(localStorage.appLanguage||"en"),L(localStorage.appLanguage||"en"),r(k,q),function(){const e=document.querySelectorAll(".view-input"),t=[!0,!0,!0,!0,!0,!0,!0]||0;e.forEach(((e,n,o)=>{t[n]?e.setAttribute("checked","checked"):e.removeAttribute("checked")}))}()})),window.addEventListener("beforeunload",(()=>{localStorage.nameForMomentum=o.value}));const w=document.querySelector(".slide-next"),E=document.querySelector(".slide-prev");w.addEventListener("click",(()=>{var e;20===(e=q)?e=1:e++,q=e,r(k,q)})),E.addEventListener("click",(()=>{var e;1===(e=q)?e=20:e--,q=e,r(k,q)}));const C=document.querySelectorAll(".image-input"),$=document.querySelector(".image-keywords");localStorage.imageKeyword="nature",$.value="nature",C.forEach((e=>{e.addEventListener("click",(()=>{r(k,q)}))})),$.addEventListener("change",(()=>{localStorage.imageKeyword=$.value,r(k,q)})),p(localStorage.appLanguage||"en"),x.addEventListener("click",(()=>{p(localStorage.appLanguage||"en")})),function(e){const t=document.querySelector(".play-list");e.forEach((e=>{const n=document.createElement("li"),o=document.createElement("p"),a=document.createElement("div");n.classList.add("play-item"),a.classList.add("play-time"),a.textContent=e.duration,o.textContent=`${e.title}`,n.append(o),n.append(a),t.append(n)}))}(S),function(e){const t=document.querySelectorAll(".play-item"),n=document.querySelector(".play"),o=document.querySelector(".play-prev"),a=document.querySelector(".play-next");let r=0;const c=new Audio;let l=!1;function i(){var o,a;t.forEach((e=>{e.classList.remove("item-active"),e.classList.remove("item-pause")})),n.classList.remove("pause"),l?(c.pause(),l=!1):(c.src=e[r].src,c.play(),t[r].classList.add("item-active"),t[r].classList.add("item-pause"),n.classList.add("pause"),l=!0,a=e[r].title,document.querySelector(".current-track-name").innerText=a,o=e[r].duration,document.querySelector(".duration-audio").innerText=o,u(e[r].duration))}function s(e){return e===t.length-1?e=0:e++,c.pause(),l=!1,e}function u(){const e=document.querySelector(".current-time-audio"),t=Math.floor(c.currentTime);e.innerText=`${Math.floor(t/60).toString().padStart(2,"0")}:${(t%60).toString().padStart(2,"0")}`}c.volume=.2,n.addEventListener("click",(()=>{i()})),o.addEventListener("click",(()=>{r=function(e){return 0===e?e=t.length-1:e--,c.pause(),l=!1,e}(r),i()})),a.addEventListener("click",(()=>{r=s(r),i()})),t.forEach(((e,t,n)=>{e.addEventListener("click",(()=>{r=t,i()}))})),c.addEventListener("ended",(()=>{r=s(r),i()}));const d=document.querySelector(".audio-input");d.addEventListener("change",(()=>{c.currentTime=d.value}));const m=document.querySelector(".volume-input"),g=document.querySelector(".audio-input"),p=document.querySelector(".volume-button");function S(e){return`linear-gradient(\n      90deg,\n      #ffffff 0%,\n      #ffffff ${100*e}%,\n      #ffffff7c ${100*e}%,\n      #ffffff7c 100%\n    )`}m.addEventListener("input",(()=>{c.volume=m.value;const e=c.volume;m.style.background=S(e),"0"===m.value?(p.classList.remove("volume"),p.classList.add("mute")):(p.classList.add("volume"),p.classList.remove("mute"))})),p.addEventListener("click",(()=>{!function(){let e=m.value;p.classList.toggle("volume"),p.classList.toggle("mute"),c.volume?(c.volume=0,S(0)):(c.volume=e,S(e))}()})),c.addEventListener("timeupdate",(()=>{const e=c.currentTime/c.duration;g.style.background=S(e),u()})),g.addEventListener("input",(()=>{c.currentTime=g.value}))}(S);const T=document.querySelector(".switch-en"),b=document.querySelectorAll(".lang");"ru"===localStorage.appLanguage&&(T.classList.toggle("switch-ru"),T.dataset.value="ru",b.forEach((e=>{e.classList.toggle("on"),e.classList.toggle("off")}))),T.addEventListener("click",(()=>{T.classList.toggle("switch-ru"),"en"===T.dataset.value?T.dataset.value="ru":T.dataset.value="en",b.forEach((e=>{e.classList.toggle("on"),e.classList.toggle("off")})),localStorage.appLanguage=T.dataset.value,t(localStorage.appLanguage||"en"),p(localStorage.appLanguage||"en"),g(localStorage.appLanguage||"en"),a(localStorage.appLanguage||"en"),L(localStorage.appLanguage||"en")}));const M=document.querySelector(".settings"),A=document.querySelector(".setting-icon"),j=document.querySelectorAll(".view-input");A.addEventListener("click",(()=>{M.classList.toggle("up")})),j.forEach((e=>{e.addEventListener("change",(()=>{!function(e){const t=document.querySelector(".player"),n=document.querySelector(".weather"),o=document.querySelector(".time"),a=document.querySelector(".date"),r=document.querySelector(".greeting-container"),c=document.querySelector(".quotes-content"),l=document.querySelector(".change-quote"),i=document.querySelector(".links-container"),s=document.querySelector(".links-icon");"audio"===e.id&&t.classList.toggle("invisible"),"weather"===e.id&&n.classList.toggle("invisible"),"time"===e.id&&o.classList.toggle("invisible"),"date"===e.id&&a.classList.toggle("invisible"),"greeting"===e.id&&r.classList.toggle("invisible"),"quotes"===e.id&&(c.classList.toggle("invisible"),l.classList.toggle("invisible")),"links"===e.id&&(i.classList.toggle("invisible"),s.classList.toggle("invisible"))}(e)}))}));const W=document.querySelector(".links-icon"),D=document.querySelector(".links-container"),F=document.querySelector(".add-link"),N=document.querySelector(".remove-link");h(),W.addEventListener("click",(()=>{D.classList.toggle("up")})),F.addEventListener("click",(function(){const e=document.querySelector("#link-name"),t=document.querySelector("#link-describe");let n={href:t.value,name:e.value};t.value&&e.value&&(f.push(n),localStorage.linksList=JSON.stringify(f),v(n),e.value="",t.value="")})),N.addEventListener("click",(()=>{!function(){const e=document.querySelector("#link-name");f.forEach(((t,n,o)=>{t.name===e.value&&f.splice(n,1)})),console.log(f),localStorage.linksList=JSON.stringify(f),y.innerHTML="",e.value="",console.log(y)}(),h()})),console.log(`\nGood ${k}!\n\nСамооценка 150 / 150\n\nНебольшие замечания по проекту:\n- в блоке настроек все работает, но при перезагрузке сохраняется только выбранный язык\n- изображения с Flickr грузятся очень медленно, иногда нужно перезагрузить страницу и попробовать снова\n- для удаления ссылки из списка нужно ввести ее название и нажать удалить\n`)})()})();