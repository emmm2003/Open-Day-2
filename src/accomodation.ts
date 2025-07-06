import './style.css'
import cuLogo from '/cu-logo.svg'

async function loadAccomodation() {
  const base = import.meta.env.BASE_URL || '/';
  const res = await fetch(`${base}api/Locations.json`);
  const data = await res.json();
  return data;
}

function renderAccomodation(data: any) {
    const base = document.querySelector<HTMLDivElement>('#base')!;
    if (!data.topics) {
      base.innerHTML = '<p class="text-red-600">No Accomodation data found.</p>';
      return;
    }

    base.innerHTML = `
        <nav class="bg-white shadow-sm"> 
            <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8"> 
                <div class="flex h-16 justify-between"> 
                    <div class="flex px-2 lg:px-0"> 
                        <div class="flex shrink-0 items-center"> 
                        <img class="h-8 w-auto" src="${cuLogo}" alt="Cardiff University" /> 
                        </div> 
                        <div class="hidden lg:ml-6 lg:flex lg:space-x-8"> 
                        <a href="#" class="inline-flex items-center border-b-2 border-cardiff-red px-1 pt-1 text-sm font-medium text-gray-900">Home</a> 
                        <a href="#" class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">University Accommodation</a> 
                        <a href="#" class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">Transportation</a> 
                        </div> 
                    </div> 
                    <div class="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                        <div class="grid w-full max-w-lg grid-cols-1 lg:max-w-xs"> 
                            <input type="search" id="search" name="search" class="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cardiff-red sm:text-sm/6" placeholder="Search..." /> 
                            <svg class="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon"> 
                                <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" /> 
                            </svg> 
                        </div> 
                        <button id="view-bookmarks" class="relative shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-cardiff-red focus:ring-offset-2 focus:outline-none ml-4">
                            <span class="sr-only">View bookmarks</span>
                            <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3a.75.75 0 0 0-.75.75v16.5a.25.25 0 0 0 .4.2L12 17.25l5.6 3.2a.25.25 0 0 0 .4-.2V3.75a.75.75 0 0 0-.75-.75H6.75z" />
                            </svg>
                        </button>
                    </div>
                </div> 
            </div> 
        </nav>
    `;
}

loadAccomodation().then(renderAccomodation);