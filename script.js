const nav = document.querySelector('.navbar');
const scrollBtn = document.querySelector('.scroll-up-button');
const slideIn = document.querySelector('.slide-in');

// this is to minimize hit on performance
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}



function stickNav() {
  if(window.scrollY > 20) {
    nav.classList.add('sticky');
    scrollBtn.classList.add('show');

  } else {
    nav.classList.remove('sticky');
    scrollBtn.classList.remove('show');
  }
}


const typed = new Typed('.typing', {
  strings: [' whoami ^1000\n `Mothana Khawaga. Full stack web developer and bitcoiner!`^1000\n\n `snake-eaterr@dev:~$` cat experience.txt^1000\n `React + Nodejs full stack development` ^1000'],
  typeSpeed: 100,
  backspeed: 500,
  loop: true,

})

function checkSlide(e) {
  const slideInAt = window.scrollY + window.innerHeight - slideIn.offsetHeight / 5;
  console.log(slideIn.height)
  elementBottom = slideIn.offsetTop + slideIn.offsetHeight;
  
  const isHalfShown = slideInAt > slideIn.offsetTop;
  const isNotScrolledPast = window.scrollY < elementBottom;

  if(isHalfShown && isNotScrolledPast) {
    slideIn.classList.add('active');
  } else {
    slideIn.classList.remove('active');
  }
}

window.addEventListener('scroll', stickNav);
window.addEventListener('scroll', debounce(checkSlide));
scrollBtn.addEventListener('click', () => window.scroll({ top: 0, behavior: 'smooth' }));

