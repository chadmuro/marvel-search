const searchInput = document.querySelector('.header__search-input');
const searchBtn = document.querySelector('.header__search-button');
const logo = document.querySelector('.header__logo');
const body = document.querySelector('.container');
const overlay = document.querySelector('.overlay');



// API
const url = 'https://gateway.marvel.com/v1/public/characters';

// Clear body and rest page
function clearAll() {
	searchInput.value = '';
	searchInput.focus();
	body.innerHTML = '';
}




// EVENT LISTENERS
logo.addEventListener('click', clearAll);

searchInput.addEventListener('change', (e) => {
    body.innerHTML = '';

    if(e.target.value) {
        fetch(`${url}?nameStartsWith=${e.target.value}&limit=10&apikey=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                const returnedData = data.data.results;
                for (let i = 0; i < returnedData.length; i++) {
                    let dataset = returnedData[i];
                    let newDiv = document.createElement('div');
                    newDiv.classList.add('character');
                    newDiv.id = `${dataset.id}`;
                    newDiv.innerHTML = `
                        <div class="character__image">
                            <img src="${dataset.thumbnail.path}.jpg" alt="${dataset.name}" class="character__image-img">
                        </div>
                        <div class="character__text">
                            <h1 class="character__text-name">${dataset.name}</h1>
                            <p class="character__text-description">${dataset.description}</p>
                        </div>
                    `;
                body.appendChild(newDiv);
            }      
        });
    }
});

body.addEventListener('click', (e) => {
    fetch(`${url}/${e.target.id}?apikey=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            let dataset = data.data.results[0];
            console.log(dataset);
            let newDiv = document.createElement('div');
            newDiv.classList.add('selected');
            newDiv.innerHTML = `
                <div class="selected__top">
                    <button class="selected__top-button"><i class="fas fa-times selected__top-icon"></i></button>
                    <h1 class="selected__top-name">${dataset.name}</h1>
                    <div class="selected__top-image">
                        <img src="${dataset.thumbnail.path}.jpg" alt="${dataset.name}" class="selected__top-img">
                    </div>
                </div>
                <div class="selected__bottom">
                    <p class="selected__bottom-description">${dataset.description}</p>
                    <div class="selected__bottom-links">
                        <a href="${dataset.urls[0].url}" class="selected__bottom-link" target="_blank">${dataset.urls[0].type}</a>
                        <a href="${dataset.urls[1].url}" class="selected__bottom-link" target="_blank">${dataset.urls[1].type}</a>
                    </div>
                </div>
            `;
    overlay.appendChild(newDiv);
    overlay.classList.remove('hide');
    });
});

// Close selected box and return to search items
overlay.addEventListener('click', (e) => {
    if(!e.target.matches('.selected') && !e.target.matches('.selected__bottom-link') || e.target.matches(".selected__top-icon")) {
        overlay.innerHTML = '';
        overlay.classList.add('hide');
    }  
});