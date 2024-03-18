const nav = document.querySelector('.navbar');
const scrollBtn = document.querySelector('.scroll-up-button');
const slideInElements = document.querySelectorAll('.slide-in');
const trigger = document.querySelector('.trigger');
const menuButtons = document.querySelectorAll('.menu-btn');
const form = document.querySelector('.contact-form');
const success = document.querySelector('.success');



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
  strings: [' whoami ^1000\n `snake-eaterr. Full stack web developer and bitcoiner!`\n\n `<span class="prompt">&nbspsnake-eaterr@dev:~$&nbsp</span>` ^1000cat experience.txt^1000\n ` React + Nodejs full stack web development` ^1000'],
  typeSpeed: 100,
  fadeOut: true,
  loop: true,
  

})

/* const typedTwo = new Typed('.typing-2', {
  strings: ['React^1000', 'Next^1000', 'Nodejs^1000', 'Graphql^1000', 'Redux^1000', 'Typescript^1000', 'Javascript^1000'],
  typeSpeed: 100,
  backspeed: 400,
  loop: true
}) */

function checkSlide(e) {
  slideInElements.forEach(slideIn => {
    const slideInAt = window.scrollY + window.innerHeight - slideIn.offsetHeight / 5;
    elementBottom = slideIn.offsetTop + slideIn.offsetHeight;
    
    const isHalfShown = slideInAt > slideIn.offsetTop;
    const isNotScrolledPast = window.scrollY < elementBottom;

    if(isHalfShown && isNotScrolledPast) {
      slideIn.classList.add('active');
    } else {
      slideIn.classList.remove('active');
    }
  });
  
}


$('.carousel').owlCarousel({
  margin: 20,
  loop: true,
  autoplayTimeOut: 2000,
  autoplayHoverPause: true,
  responsive: {
      0:{
          items: 1,
          nav: false
      },
      600:{
          items: 1,
          nav: false
      },
      1000:{
          items: 2,
          nav: false
      }
  }
});


function handleSubmit(e) {
  e.preventDefault();
  let timeout;
  const body = {
    name: this.name.value,
    email: this.email.value,
    subject: this.subject.value,
    describeProject: this.description.value
  };
  fetch('https://snakeeater.info:3000/sendToIFTTT', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
    
  })
  .then(() => {
    this.reset();
    form.classList.add('show-success');
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      form.classList.remove('show-success');
    }, 3000);
  }).catch(error => console.log(error))
  
  
}

function toggleMobileMenu() {
  document.querySelector('.navbar .menu').classList.toggle('active');
  document.querySelector('.menu-btn i').classList.toggle('active');
}

window.addEventListener('scroll', stickNav);
window.addEventListener('scroll', debounce(checkSlide));
scrollBtn.addEventListener('click', () => window.scroll({ top: 0, behavior: 'smooth' }));


menuButtons.forEach(button => button.addEventListener('click', toggleMobileMenu));
form.addEventListener('submit', handleSubmit);
