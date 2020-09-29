const searchInput = document.querySelector('.header__search-input');
const searchBtn = document.querySelector('.header__search-btn');
const logo = document.querySelector('.header__logo');
const body = document.querySelector('.container');


// API
const url = 'https://gateway.marvel.com/v1/public/characters';


// EVENT LISTENERS
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

logo.addEventListener('click', clearAll);

function clearAll() {
    searchInput.value = '';
    searchInput.focus();
    body.innerHTML = '';
}

