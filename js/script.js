// Global
let scrollY = window.pageYOffset;
// For Ipi
let firstSt = Math.random().toString(36).slice(2, 3);
console.log("firstSt: ", firstSt);
// Just Need One Letter
function justSt() {
  let ing = firstSt
    .split("")
    .map(function (ele) {
      return isNaN(parseInt(ele)) ? ele : "a";
    })
    .join("");
  return ing;
}
console.log("justSt(): ", justSt());

// Show Menu
const showMenu = (toggleId, NavId) => {
  const toggle = document.getElementById(toggleId);
  const nav = document.getElementById(NavId);
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

// Remove Menu When Click On Each Nav Link
const navLink = document.querySelectorAll(".nav-link");

function linkActive() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
navLink.forEach((h) => h.addEventListener("click", linkActive));

// Scroll Section Active
const sections = document.querySelectorAll("section[id");

function scrollActive() {
  sections.forEach((current) => {
    let sectionHeight = current.offsetHeight;
    let sectionTop = current.offsetTop - 50;
    let sectionId = current.getAttribute("id");
    if (
      this.scrollY > sectionTop &&
      this.scrollY <= sectionTop + sectionHeight
    ) {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// Change Background Header
function scrollHeader() {
  let header = document.getElementById("header");
  if (this.scrollY >= 200) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
}
window.addEventListener("scroll", scrollHeader);

// Show Button Scroll Top
function scrollTop() {
  let scrollTop = document.getElementById("scroll-top");
  if (this.scrollY >= 200) {
    scrollTop.classList.add("show-scroll-top");
  } else {
    scrollTop.classList.remove("show-scroll-top");
  }
}
window.addEventListener("scroll", scrollTop);

// Header
// Api Url
const APIURL = `https://themealdb.com/api/json/v1/1/search.php?s=${justSt()}`;

// Element
let HomeInner = document.getElementById("home-inner");

async function getFood(url) {
  let resp = await fetch(url);
  let respDate = await resp.json();
  console.log("respDate: ", respDate);
  showFood(respDate.meals);
}

getFood(APIURL);

function showFood(Foods) {
  HomeInner.innerHTML = "";
  Foods.forEach((food) => {
    const { strMeal, strMealThumb } = food;
    let foodEl = document.createElement("div");
    foodEl.classList.add("swiper-slide");
    foodEl.style.cssText = `
    display: flex;
    justify-content: center; 
    align-items: center;
    padding-top: 3rem;
    height: 100%;`;
    foodEl.innerHTML = `
    <div class="home-data">
        <h1 class="home-title">${strMeal}</h1>
        <h2 class="home-subtitle">Try The Best Food Of <br /> The Week</h2>
        <a href="" class="button">View More</a>
    </div>
    <img
        src="${strMealThumb}"
        alt=""
        class="home-img"
    />
    `;
    HomeInner.appendChild(foodEl);
  });
}

var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*  DARK LIGHT THEME  */
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*  SCROLL REVEAL ANIMATION  */
const sr = ScrollReveal({
  origin: "top",
  distance: "30px",
  duration: 2000,
  reset: true,
});

sr.reveal(
  `.home-data, 
  .home-img,
  .about-data, 
  .about-img,
  .services-content`,
  {
    interval: 200,
  }
);

// Menu
// Api Url
const APIURLMenu = `https://www.themealdb.com/api/json/v1/1/search.php?f=${justSt()}`;

// Element
let Menu = document.getElementById("Menu-inner");

async function getFoodMenu(url) {
  let resp = await fetch(url);
  let respDate = await resp.json();
  console.log("respDate: ", respDate);
  showFoodMenu(respDate.meals);
}

getFoodMenu(APIURLMenu);

function showFoodMenu(Foods) {
  Menu.innerHTML = "";
  function shuffle(start, end) {
    let randomNumber = Math.floor(Math.random() * 20);
    return randomNumber * start + end;
  }
  Foods.forEach((food) => {
    const { strIngredient1, strArea, strMealThumb } = food;
    let foodEl = document.createElement("div");
    foodEl.classList.add("menu-content");
    foodEl.innerHTML = `
    <img
    src="${strMealThumb}"
    alt=""
    class="menu-img"
  />
  <h3 class="menu-name">${strIngredient1}</h3>
  <span class="menu-detail">${strArea}</span>
  <span class="menu-preci">$${shuffle(3, 5)}.00</span>
  <a href="#" class="button menu-button"
    ><i class="bx bx-cart-alt"></i
  >
</a>
    `;
    Menu.appendChild(foodEl);
  });
}

// Copy Right Year
let CopyRightYear = document.getElementById("CopyRightYear");
let time = new Date();
let Year = time.getFullYear();
CopyRightYear.innerHTML = Year;
