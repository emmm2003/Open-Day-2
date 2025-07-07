(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const t of a.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&r(t)}).observe(document,{childList:!0,subtree:!0});function l(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=l(i);fetch(i.href,a)}})();const p="/Open-Day-2/cu-logo.svg";async function b(){return await(await fetch("/Open-Day-2/api/OpenDay.json")).json()}const u=[];function x(){const s=document.getElementById("modal-title"),e=document.getElementById("modal-programs");s.textContent="Bookmarked Programs",e.innerHTML=u.length>0?`
      <ul role="list" class="divide-y divide-gray-200">
        ${u.map(r=>`
          <li class="px-4 py-4 sm:px-0">
            <div class="flex flex-col gap-2">
              <h3 class="text-lg font-semibold text-cardiff-red">${r.title}</h3>
              <p class="text-sm text-gray-600">
                ${new Date(r.start_time).toLocaleTimeString("en-GB")} - ${new Date(r.end_time).toLocaleTimeString("en-GB")}
              </p>
              <p class="text-sm text-gray-600">Location: ${r.location_title}</p>
              <button class="text-red-600 text-sm font-medium" data-remove-bookmark="${r.title}">Remove Bookmark</button>
            </div>
          </li>
        `).join("")}
      </ul>
    `:"<p>No bookmarked programs.</p>",document.getElementById("modal").classList.remove("hidden")}async function v(){return(await(await fetch("/Open-Day-2/api/Locations.json")).json()).university}function h(s,e){const l=e.find(r=>r.id===s);return l?l.title:"Unknown Location"}function w(s){const e=document.querySelector("#base");if(!s.topics){e.innerHTML='<p class="text-red-600">No Open Day data found.</p>';return}const l=new Date(s.start_time).toLocaleString("en-GB",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"}),r=new Date(s.end_time).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"});e.innerHTML=`
    <nav class="bg-white shadow-sm sticky top-0 z-50"> 
      <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8"> 
        <div class="flex h-16 justify-between"> 
          <div class="flex px-2 lg:px-0"> 
            <div class="flex shrink-0 items-center"> 
              <img class="h-8 w-auto" src="${p}" alt="Cardiff University" /> 
            </div>  
          </div> 
          <div class="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div class="grid w-full max-w-lg grid-cols-1 lg:max-w-xs"> 
              <input type="search" id="search" name="search" class="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cardiff-red sm:text-sm/6" placeholder="Search..." /> 
              <svg class="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon"> 
                <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1-12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" /> 
              </svg> 
            </div> 
            <div id="view-bookmarks">
              <button class="relative shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-cardiff-red focus:ring-offset-2 focus:outline-none ml-4 z-10">
                <span class="sr-only">View bookmarks</span>
                <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3a.75.75 0 0 0-.75.75v16.5a.25.25 0 0 0 .4.2L12 17.25l5.6 3.2a.25.25 0 0 0 .4-.2V3.75a.75.75 0 0 0-.75-.75H6.75z" />
                </svg>
              </button>
            </div>
          </div>
        </div> 
      </div> 
    </nav>
    <div>
      <div>
        <img class="h-60 w-full object-cover lg:h-60" src="${s.cover_image}" alt="" />
      </div>
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div class="flex justify-center items-center w-full">
            <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer">
              <img class="size-24 ring-4 ring-white sm:size-32" src="${p}" alt="" />
            </a>
          </div>
        </div>
        <div class="bg-white px-4 py-8 sm:py-16 lg:px-6">
          <div class="mx-auto max-w-2xl text-center">
            <p class="text-base/7 font-semibold text-cardiff-red">${l} - ${r}</p>
            <h2 class="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Cardiff University Open Day</h2>
            <p class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Choose how you want to experience our campuses and explore your new city. We offer in-person events, webinars, and virtual tours so you can get to know Cardiff University in a way that works for you.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div id="topics-container" class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          ${y(s.topics)}
        </div>
      </div>
    </div>
    <div id="modal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden">
      <div class="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div id="modal-header" class="m-8 flex justify-between items-center mb-4"> <!-- Sticky header -->
          <h2 id="modal-title" class="text-xl font-bold text-center flex-1"></h2>
          <button id="close-modal" class="text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-cardiff-red focus:ring-offset-2 focus:outline-none">
            <span class="sr-only">Close modal</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div id="modal-programs" class="m-8 text-gray-700"></div>
      </div>
    </div>
  `,document.querySelector("#search").addEventListener("input",a=>{const t=a.target.value.toLowerCase(),n=s.topics.filter(c=>c.name.toLowerCase().includes(t)),o=document.querySelector("#topics-container");n.length>0?o.innerHTML=y(n):o.innerHTML='<p class="text-gray-600 text-center mt-4 mb-8">No topics match your search. Please try a different keyword.</p>'}),document.addEventListener("click",async a=>{const t=a.target;if(t.matches("button[data-topic-name]")){const n=t.getAttribute("data-topic-name"),o=document.getElementById("modal"),c=document.getElementById("modal-title"),f=document.getElementById("modal-programs"),g=await v(),m=s.topics.find(d=>d.name===n);c.textContent=`${n} Events`,f.innerHTML=m.programs&&m.programs.length>0?`
          <ul role="list" class="divide-y divide-gray-200">
            ${m.programs.map(d=>`
              <li class="px-4 py-4 sm:px-0">
                <div class="flex items-center gap-4">
                  <button class="text-cardiff-red text-lg font-bold hover:border-cardiff-red" data-toggle-details> + </button>
                  <div class="flex flex-col">
                    <p class="text-sm text-gray-600">
                      ${h(d.location_id,g)}, <i>${new Date(d.start_time).toLocaleTimeString("en-GB")} - ${new Date(d.end_time).toLocaleTimeString("en-GB")}</i>
                    </p>
                    <h3 class="text-lg font-semibold text-cardiff-red">${d.title}</h3>
                    <div class="mt-4 hidden text-sm text-gray-600 program-details">
                      <p>${d.description||"No description available."}</p>
                      <div class="bookmark-action mt-4 flex items-center gap-2">
                        <button class="bookmark-button text-cardiff-red text-sm font-medium hover:border-cardiff-red flex items-center gap-2" data-bookmark-program="${encodeURIComponent(JSON.stringify(d))}">
                          <svg class="h-5 w-5 text-cardiff-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v18l7-5 7 5V3z" />
                          </svg>
                          Bookmark
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            `).join("")}
          </ul>
        `:"<p>No programs available for this topic.</p>",o.classList.remove("hidden")}if(t.matches("button[data-toggle-details]")){const n=t.closest("li")?.querySelector(".program-details"),o=t.closest("li")?.querySelector(".bookmark-button");n&&(n.classList.toggle("hidden"),t.textContent=n.classList.contains("hidden")?"+":"-",o&&o.classList.toggle("hidden",n.classList.contains("hidden")),t.classList.toggle("active",!n.classList.contains("hidden")))}if(t.closest(".bookmark-action")){const n=t.closest("button[data-bookmark-program]");if(n){const o=JSON.parse(decodeURIComponent(n.getAttribute("data-bookmark-program"))),c=await v(),f=h(o.location_id,c),g={...o,location_title:f};u.some(m=>m.title===o.title&&m.start_time===o.start_time&&m.location_id===o.location_id)?alert(`Program "${o.title}" is already bookmarked.`):(u.push(g),alert(`Program "${o.title}" bookmarked!`))}}if(t.matches("button[data-remove-bookmark]")){const n=t.getAttribute("data-remove-bookmark"),o=u.findIndex(c=>c.title===n);o!==-1&&(u.splice(o,1),x())}t.closest("#view-bookmarks")&&x()}),document.getElementById("close-modal").addEventListener("click",()=>{document.getElementById("modal").classList.add("hidden")})}function y(s){return s.map(e=>e&&e.name?`
    <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col">
      <div class="relative w-full overflow-hidden rounded-lg">
        <img src="${e.cover_image||p}" alt="${e.name}" class="w-full h-40 object-cover" />
      </div>
      <h2 class="text-xl font-semibold text-cardiff-red mb-4 mt-4">
        ${e.name}
      </h2>
      <p class="text-sm text-gray-600 mb-8">${e.description||'Please click "Learn More" for additional details about this topic and the programs available.'}</p>
      <button class="mt-auto bg-cardiff-red text-white px-4 py-2 rounded hover:bg-cardiff-dark transition-colors duration-300" data-topic-name="${e.name}">
        Learn More
      </button>
    </div>
  `:"").join("")}b().then(w);
