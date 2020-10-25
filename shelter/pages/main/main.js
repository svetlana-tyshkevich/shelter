const navigation = document.querySelector('.navigation');
const header = document.querySelector('.header');

// Open burger menu
const openBurgerMenu = (e) => {
    navigation.classList.toggle('active');
    // navigation.classList.toggle('closed');

    burger.classList.toggle('active');
    header.classList.toggle('active');
    overlay.classList.toggle('active');
}

burger.addEventListener('click', openBurgerMenu);
overlay.addEventListener('click', openBurgerMenu);


// SLIDER
const petsCards = document.querySelector('.pets__cards');
const petsButtons = document.querySelectorAll('.pets__gallery > button');

let pets = [];

fetch('../../assets/pets.json').then(res => res.json()).then(list => {
    pets = list;
    
    
    let prevCards = [];
    const sliderRandom = () => {
        let currentCards = [];
        petsCards.innerHTML = '';
        let n = 3;

        while (currentCards.length < n) {
            let randomPet = pets[Math.floor(Math.random() * pets.length)];
            if (!currentCards.includes(randomPet) && !prevCards.includes(randomPet)) {
                currentCards.push(randomPet);
            }
        }

        currentCards.forEach( item => {petsCards.innerHTML += `<div class="card" id='${item.name}'>
                                    <img src='${item.img}' alt='${item.name}' class="card__photo">
                                    <span class="card__name">${item.name}</span>
                                    <button class="button button_bordered">Learn more</button>
                                </div>`})
        prevCards = currentCards;
        currentCards = [];
    }
    
   // POPUP 
   const cards = document.querySelectorAll('.card');
   
console.log(cards);
    const showPopup = (e) => {
        // pets.forEach(item => {
        //     if (item.name === e.target.id) {
        //         popup.innerHTML += `${pets.indexOf(item)}`
        //     }
        // })

        // let currentPetNum = 
    
}

    petsButtons.forEach(item => item.addEventListener('click', sliderRandom));
    cards.forEach(item => item.addEventListener('click', showPopup));


    sliderRandom();
    cards.forEach(item => item.addEventListener('click', function(e) {
        console.log(e.target);
    }));


    // document.addEventListener('click', function(e) {
    //     console.log(e.target)})
    
});







