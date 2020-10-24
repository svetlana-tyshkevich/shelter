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