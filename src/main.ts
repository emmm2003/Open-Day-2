import './style.css'
import cuLogo from '/cu-logo.svg'

async function loadOpenDay() {
  const base = import.meta.env.BASE_URL || '/';
  const res = await fetch(`${base}api/OpenDay.json`);
  const data = await res.json();
  return data;
}

const bookmarks: any[] = [];

function renderBookmarks() {
  const modalTitle = document.getElementById('modal-title')!;
  const modalPrograms = document.getElementById('modal-programs')!;
  modalTitle.textContent = 'Bookmarked Programs';
  modalPrograms.innerHTML = bookmarks.length > 0
    ? `
      <ul role="list" class="divide-y divide-gray-200">
        ${bookmarks.map((program: any) => `
          <li class="px-4 py-4 sm:px-0">
            <div class="flex flex-col gap-2">
              <h3 class="text-lg font-semibold text-cardiff-red">${program.title}</h3>
              <p class="text-sm text-gray-600">
                ${new Date(program.start_time).toLocaleTimeString('en-GB')} - ${new Date(program.end_time).toLocaleTimeString('en-GB')}
              </p>
              <p class="text-sm text-gray-600">Location: ${program.location_title}</p>
              <button class="text-red-600 text-sm font-medium" data-remove-bookmark="${program.title}" aria-label="Remove bookmark for ${program.title}">Remove Bookmark</button>
            </div>
          </li>
        `).join('')}
      </ul>
    `
    : '<p>No bookmarked programs.</p>';
  const modal = document.getElementById('modal')!;
  modal.classList.remove('hidden');
}

async function loadLocations() {
  const base = import.meta.env.BASE_URL || '/';
  const res = await fetch(`${base}api/Locations.json`);
  const data = await res.json();
  return data.university;
}

function getLocationTitleById(locationId: number, locations: any[]) {
  const location = locations.find((loc: any) => loc.id === locationId);
  return location ? location.title : 'Unknown Location';
}

function renderOpenDay(data: any) {
  const base = document.querySelector<HTMLDivElement>('#base')!;
  if (!data.topics) {
    base.innerHTML = '<p class="text-red-600">No Open Day data found.</p>';
    return;
  }

  const startTime = new Date(data.start_time).toLocaleString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const endTime = new Date(data.end_time).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  base.innerHTML = `
    <nav class="bg-white shadow-sm sticky top-0 z-50"> 
      <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8"> 
        <div class="flex h-16 justify-between"> 
          <div class="flex px-2 lg:px-0"> 
            <div class="flex shrink-0 items-center"> 
              <img class="h-8 w-auto" src="${cuLogo}" alt="Cardiff University" /> 
            </div>  
          </div> 
          <div class="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div class="grid w-full max-w-lg grid-cols-1 lg:max-w-xs"> 
              <label for="search" class="sr-only">Search</label>
              <input type="search" id="search" name="search" class="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-cardiff-red placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cardiff-red sm:text-sm/6" placeholder="Search..." /> 
              <svg class="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-cardiff-red" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon"> 
                <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1-12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" /> 
              </svg> 
            </div> 
            <div id="view-bookmarks">
              <button class="relative shrink-0 rounded-full bg-white p-1 text-cardiff-red hover:text-red-700 focus:ring-2 focus:ring-cardiff-red focus:ring-offset-2 focus:outline-none ml-4 z-10" aria-label="View bookmarks">
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
        <img class="h-60 w-full object-cover lg:h-60" src="${data.cover_image}" alt="" />
      </div>
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div class="flex justify-center items-center w-full">
            <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer">
              <img class="size-24 ring-4 ring-white sm:size-32" src="${cuLogo}" alt="" />
            </a>
          </div>
        </div>
        <div class="bg-white px-4 py-8 sm:py-16 lg:px-6">
          <div class="mx-auto max-w-2xl text-center">
            <p class="text-base/7 font-semibold text-cardiff-red">${startTime} - ${endTime}</p>
            <h2 class="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Cardiff University Open Day</h2>
            <p class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Choose how you want to experience our campuses and explore your new city. We offer in-person events, webinars, and virtual tours so you can get to know Cardiff University in a way that works for you.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div id="topics-container" class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          ${renderTopics(data.topics)}
        </div>
      </div>
    </div>
    <div id="modal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div id="modal-header" class="m-8 flex justify-between items-center mb-4"> <!-- Sticky header -->
          <h2 id="modal-title" class="text-xl font-bold text-center flex-1"></h2>
          <button id="close-modal" class="text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-cardiff-red focus:ring-offset-2 focus:outline-none" aria-label="Close modal">
            <span class="sr-only">Close modal</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div id="modal-programs" class="m-8 text-gray-700"></div>
      </div>
    </div>
  `;

  const searchInput = document.querySelector<HTMLInputElement>('#search')!;
  searchInput.addEventListener('input', (event) => {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredTopics = data.topics.filter((topic: any) => topic.name.toLowerCase().includes(query));
    const topicsContainer = document.querySelector<HTMLDivElement>('#topics-container')!;
    
    if (filteredTopics.length > 0) {
      topicsContainer.innerHTML = renderTopics(filteredTopics);
    } else {
      topicsContainer.innerHTML = '<p class="text-gray-600 text-center mt-4 mb-8">No topics match your search. Please try a different keyword.</p>';
    }
  });

  document.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;

    if (target.matches('button[data-topic-name]')) {
      const topicName = target.getAttribute('data-topic-name')!;
      const modal = document.getElementById('modal')!;
      const modalTitle = document.getElementById('modal-title')!;
      const modalPrograms = document.getElementById('modal-programs')!;
      
      const locations = await loadLocations(); 

      const selectedTopic = data.topics.find((topic: any) => topic.name === topicName);

      modalTitle.textContent = `${topicName} Events`;

      modalPrograms.innerHTML = selectedTopic.programs && selectedTopic.programs.length > 0
        ? `
          <ul role="list" class="divide-y divide-gray-200">
            ${selectedTopic.programs.map((program: any) => `
              <li class="px-4 py-4 sm:px-0">
                <div class="flex items-center gap-4">
                  <button class="text-cardiff-red text-lg font-bold hover:border-cardiff-red" data-toggle-details> + </button>
                  <div class="flex flex-col">
                    <p class="text-sm text-gray-600">
                      ${getLocationTitleById(program.location_id, locations)}, <i>${new Date(program.start_time).toLocaleTimeString('en-GB')} - ${new Date(program.end_time).toLocaleTimeString('en-GB')}</i>
                    </p>
                    <h3 class="text-lg font-semibold text-cardiff-red">${program.title}</h3>
                    <div class="mt-4 hidden text-sm text-gray-600 program-details">
                      <p>${program.description || 'No description available.'}</p>
                      <div class="bookmark-action mt-4 flex items-center gap-2">
                        <button class="bookmark-button text-cardiff-red text-sm font-medium hover:border-cardiff-red flex items-center gap-2" data-bookmark-program="${encodeURIComponent(JSON.stringify(program))}" aria-label="Bookmark this program">
                          <svg class="h-5 w-5 text-cardiff-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v18l7-5 7 5V3z" />
                          </svg>
                          Bookmark
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            `).join('')}
          </ul>
        `
        : '<p>No programs available for this topic.</p>';

      modal.classList.remove('hidden');
    }

    if (target.matches('button[data-toggle-details]')) {
      const details = target.closest('li')?.querySelector('.program-details') as HTMLElement; 
      const bookmarkButton = target.closest('li')?.querySelector('.bookmark-button') as HTMLElement; 

      if (details) {
        details.classList.toggle('hidden');
        target.textContent = details.classList.contains('hidden') ? '+' : '-'; 

        if (bookmarkButton) {
          bookmarkButton.classList.toggle('hidden', details.classList.contains('hidden'));
        }

        target.classList.toggle('active', !details.classList.contains('hidden'));
      }
    }

    if (target.closest('.bookmark-action')) {
      const button = target.closest('button[data-bookmark-program]');
      if (button) {
        const programData = JSON.parse(decodeURIComponent(button.getAttribute('data-bookmark-program')!));
        const locations = await loadLocations();
        const locationTitle = getLocationTitleById(programData.location_id, locations);

        const bookmark = {
          ...programData,
          location_title: locationTitle,
        };

        if (!bookmarks.some((b) =>
          b.title === programData.title &&
          b.start_time === programData.start_time &&
          b.location_id === programData.location_id
        )) {
          bookmarks.push(bookmark);
          alert(`Program "${programData.title}" bookmarked!`);
        } else {
          alert(`Program "${programData.title}" is already bookmarked.`);
        }
      }
    }

    if (target.matches('button[data-remove-bookmark]')) {
      const programTitle = target.getAttribute('data-remove-bookmark')!;
      const index = bookmarks.findIndex((bookmark) => bookmark.title === programTitle);
      if (index !== -1) {
        bookmarks.splice(index, 1);
        renderBookmarks();
      }
    }

    if (target.closest('#view-bookmarks')) {
      renderBookmarks();
    }
  });
  
  document.getElementById('close-modal')!.addEventListener('click', () => {
    const modal = document.getElementById('modal')!;
    modal.classList.add('hidden');
  });
}

function renderTopics(topics: any[]) {
  return topics.map((topic: any) => topic && topic.name ? `
    <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col">
      <div class="relative w-full overflow-hidden rounded-lg">
        <img src="${topic.cover_image || cuLogo}" alt="${topic.name}" class="w-full h-40 object-cover" />
      </div>
      <h2 class="text-xl font-semibold text-cardiff-red mb-4 mt-4">
        ${topic.name}
      </h2>
      <p class="text-sm text-gray-600 mb-8">${topic.description || 'Please click "Learn More" for additional details about this topic and the programs available.'}</p>
      <button class="mt-auto bg-cardiff-red text-white px-4 py-2 rounded hover:bg-cardiff-dark transition-colors duration-300" data-topic-name="${topic.name}">
        Learn More
      </button>
    </div>
  ` : '').join('');
}

loadOpenDay().then(renderOpenDay);