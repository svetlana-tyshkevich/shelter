const navigation = document.querySelector('.navigation');
const header = document.querySelector('.header');


// Open burger menu
const openBurgerMenu = () => {
    navigation.classList.toggle('active');

    burger.classList.toggle('active');
    header.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('lock');

}
// Press on overlay
const closeByOverlay = () => {
    navigation.classList.remove('active');
    burger.classList.remove('active');
    header.classList.remove('active');
    overlay.classList.toggle('active');
    popup.innerHTML = '';
    document.body.classList.remove('lock');
}

burger.addEventListener('click', openBurgerMenu);
overlay.addEventListener('click', closeByOverlay);


// SLIDER
const petsCards = document.querySelector('.pets__cards');
const petsPages = document.querySelector('.pets_pages');
const petsButtons = document.querySelectorAll('.pets__gallery > button');

let itemsPerPage = 3;

// Set number of cards per page
const checkItemsPerPage = () => {
    if (petsCards.matches('.pets_pages')) {
        if (document.querySelector("body").offsetWidth >=1280 ) {
            itemsPerPage = 8;
            } else {
                if (document.querySelector("body").offsetWidth >= 768 && document.querySelector("body").offsetWidth < 1280) {
                    itemsPerPage = 6;
                    } else {
                        if (document.querySelector("body").offsetWidth <768 ) {
                            itemsPerPage = 3;
                        }
                    }
                }
    } else {
         if (document.querySelector("body").offsetWidth < 1280 && document.querySelector("body").offsetWidth >= 768) {
            itemsPerPage = 2;
            } else {
                if (document.querySelector("body").offsetWidth <768 ) {
                    itemsPerPage = 1;
                }
            }
        }
}


let pets = [];

fetch('../../assets/pets.json').then(res => res.json()).then(list => {
    pets = list;
    
    // Random cards
    let prevCards = [];
    const sliderRandom = () => {
        let currentCards = [];
        petsCards.innerHTML = '';
        checkItemsPerPage();

        while (currentCards.length < itemsPerPage) {
            let randomPet = pets[Math.floor(Math.random() * pets.length)];
            if (itemsPerPage <= 4) {
                if (!currentCards.includes(randomPet) && !prevCards.includes(randomPet)) {
                currentCards.push(randomPet);
                }
            } else {
                if (!currentCards.includes(randomPet)) {
                    currentCards.push(randomPet);
                    }
            }
            
        }

        currentCards.forEach( item => {petsCards.innerHTML += `<div class="card" id='${item.name}'>
                                    <img src='${item.img}' alt='${item.name}' class="card__photo">
                                    <span class="card__name">${item.name}</span>
                                    <button class="button button_bordered">Learn more</button>
                                </div>`;

                            })
        prevCards = currentCards;
        currentCards = [];
        
    }


    sliderRandom();


   // POPUP 
         
        const showPopup = (e) => {
        
            let popupPet ={};
            for (let i = 0; i <= pets.length - 1; i++) {
                if (pets[i].name === e.target.id || pets[i].name === e.target.parentNode.id) {
                    popupPet = pets[i];
                }
                
            }

            
            popup.innerHTML += `<div class="popup">
                                    <div id="popup__close"></div>
                                    <img src="${popupPet.img}" alt="popup-photo">
                                    <div class="popup__info">
                                        <p class="popup__name">${popupPet.name}</p>
                                        <span class="popup__breed">${popupPet.type} - ${popupPet.breed}</span>
                                        <p class="popup__desc">${popupPet.description}</p>
                                        <ul class="features-list">
                                            <li class="feature"><span>Age: </span>${popupPet.age}</li>
                                            <li class="feature"><span>Inoculations: </span>${popupPet.inoculations[0]}</li>
                                            <li class="feature"><span>Diseases: </span>${popupPet.diseases[0]}</li>
                                            <li class="feature"><span>Parasites: </span>${popupPet.parasites[0]}</li>
                                        </ul>
                                    </div>
                                    </div>`;
            
            overlay.classList.toggle('active');
            document.body.classList.add('lock');
            const closeButton = document.getElementById('popup__close');
            const closeByButton = () => {
                overlay.classList.remove('active');
                popup.innerHTML = '';
                document.body.classList.remove('lock');
            }
            closeButton.addEventListener('click', closeByButton);
        };
    

    petsButtons.forEach(item => item.addEventListener('click', sliderRandom));  
    petsCards.addEventListener('click', showPopup) ;  
    
        
        
    // PAGINATION
    const currentPage  = document.querySelector('.current-page');
    const prevPage  = document.querySelector('.pagination_prev');
    const nextPage  = document.querySelector('.pagination_next');
    const firstPage  = document.querySelector('.pagination_first');
    const lastPage  = document.querySelector('.pagination_last');

    
    let page = 1;
    let maxPage = 48 / itemsPerPage;
    currentPage.textContent = page;
    firstPage.disabled = true;
    prevPage.disabled = true;


    // Set page Number
    const setPageNumber = () => {
        if (page >= 1 && page <= maxPage) {
            currentPage.textContent = page;
        sliderRandom();
        };
        if (page === 1) {
            firstPage.disabled = true;
            prevPage.disabled = true;
        } else {
            firstPage.disabled = false;
            prevPage.disabled = false;
        };

        if (page === maxPage) {
            lastPage.disabled = true;
            nextPage.disabled = true;
        } else {
            lastPage.disabled = false;
            nextPage.disabled = false;
        }
        
    }

    prevPage.addEventListener('click', function() {
                page--;
                setPageNumber();
                
            });

    nextPage.addEventListener('click', function() {
                page++;
                setPageNumber();
            });

    lastPage.addEventListener('click', function() {
                page = maxPage;
                setPageNumber();
            });

    firstPage.addEventListener('click', function() {
                page = 1;
                setPageNumber();
            });
        


    // document.addEventListener('click', function(e) {
    //     console.log(e.target)})
    
});







