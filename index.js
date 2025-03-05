import{S as L,i as l,a as C}from"./assets/vendor-DEenWwFD.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const g of a.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&n(g)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();const P=document.querySelector(".search-form"),p=document.querySelector(".pictures-list"),v=document.querySelector(".loader"),s=document.querySelector(".button-load"),c=new L(".gallery-card a.gallary-card-link",{captionsData:"alt",captionDelay:250});let f=null,m=0,u=1;const h=15;function d(e,o=!1){o&&(s.style.display=e?"none":"flex"),v.style.display=e?"flex":"none"}function i(e){s.disabled=!e,s.style.display=e?"flex":"none",s.style.opacity=e?1:0,s.style.overflow=e?"visible":"hidden"}P.addEventListener("submit",async e=>{if(e.preventDefault(),f=e.target.elements.input.value.trim(),u=1,f===""){l.warning({message:"Please enter a search term.",position:"topRight",backgroundColor:"#add8e6",messageColor:"white"});return}d(!0),c&&(c.close(),p.innerHTML="");try{const t=await w();m=t.totalHits,b(t.hits),c.refresh(),t.hits.length===0?(l.error({message:"Sorry, no images match your search query. Please try again!",position:"topRight",backgroundColor:"red",messageColor:"white"}),i(!1)):y()}catch{l.error({message:"An error occurred while fetching images. Please try again later.",position:"topRight",backgroundColor:"red",messageColor:"white"}),i(!1)}finally{d(!1)}e.target.reset()});s.addEventListener("click",async()=>{u+=1,d(!0,!0);try{const e=await w();b(e.hits),c.refresh(),y(),document.querySelectorAll(".gallery-card").forEach(t=>{const n=t.getBoundingClientRect();window.scrollBy({top:n.height*1.36,behavior:"smooth"})})}catch{l.error({message:"An error occurred while fetching more images. Please try again later.",position:"topRight",backgroundColor:"red",messageColor:"white"}),i(!1)}finally{d(!1,!0)}});function y(){const e=Math.ceil(m/h);u>=e?(l.warning({message:"We're sorrry, but you've reached the end of search results.",position:"topRight",backgroundColor:"#add8e6",messageColor:"white"}),i(!1)):i(!0)}async function w(){const e="42193842-675e74ed987999787d4b57f5e",o=new URLSearchParams({key:e,per_page:h,page:u,q:f,image_type:"photo",orientation:"horizontal",safesearch:!0});try{return(await C.get(`https://pixabay.com/api/?${o}`)).data}catch{throw new Error("Error fetching data from API")}}function b(e){const o=e.map(t=>`<li class="gallery-card">
    <a class="gallary-card-link" href="${t.largeImageURL}">
        <img src="${t.webformatURL}" alt="${t.tags}" />
    <ul class="image-info">
            <li class="image-item-info">
            <p>Likes</p>
            <p>${t.likes}</p>
        </li>
        <li class="image-item-info">
            <p>Views</p>
            <p>${t.views}</p>
        </li>
        <li class="image-item-info">
            <p>Comments</p>
            <p>${t.comments}</p>
        </li>
        <li class="image-item-info">
            <p>Downloads</p>
            <p>${t.downloads}</p>
        </li>
    </ul>
    </a>
</li>`).join("");p.insertAdjacentHTML("beforeend",o)}i(!1);
//# sourceMappingURL=index.js.map
