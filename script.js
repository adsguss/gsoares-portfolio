const filterButtons = document.querySelectorAll(".filter-tabs button");
const projects = document.querySelectorAll(".project-card");

const track = document.querySelector(".projects-track");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let indexSlider = 0;
const visibleCards = 2;

function getVisibleCards() {
  return Array.from(projects).filter(card => card.style.display !== "none");
}

function updateSlider() {
  const cards = getVisibleCards();

  if (cards.length <= visibleCards) {
    nextBtn.style.display = "none";
    prevBtn.style.display = "none";
    track.style.transform = "translateX(0)";
    return;
  }

  nextBtn.style.display = "block";
  prevBtn.style.display = "block";

  const cardWidth = cards[0].offsetWidth + 40;
  track.style.transform = `translateX(-${indexSlider * cardWidth}px)`;
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const category = button.dataset.category;
    projects.forEach(project => {
      project.style.display =
        project.dataset.category === category ? "flex" : "none";
    });

    indexSlider = 0;
    updateSlider();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  filterButtons[0].click();
});

nextBtn.addEventListener("click", () => {
  const cards = getVisibleCards();
  if (indexSlider < cards.length - visibleCards) {
    indexSlider++;
    updateSlider();
  }
});

prevBtn.addEventListener("click", () => {
  if (indexSlider > 0) {
    indexSlider--;
    updateSlider();
  }
});





// Lightbox simples para o carrossel
const images = document.querySelectorAll(".carousel-track img");

const overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.background = "rgba(0,0,0,0.85)";
overlay.style.display = "flex";
overlay.style.alignItems = "center";
overlay.style.justifyContent = "center";
overlay.style.zIndex = "9999";
overlay.style.cursor = "pointer";
overlay.style.opacity = "0";
overlay.style.transition = "opacity 0.3s ease";

const overlayImg = document.createElement("img");
overlayImg.style.maxWidth = "90%";
overlayImg.style.maxHeight = "90%";
overlayImg.style.borderRadius = "12px";
overlay.appendChild(overlayImg);

images.forEach(img => {
  img.addEventListener("click", () => {
    overlayImg.src = img.src;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.style.opacity = "1");
  });
});

overlay.addEventListener("click", () => {
  overlay.style.opacity = "0";
  setTimeout(() => overlay.remove(), 300);
});




// ==========================
// AUTOPLAY DO HERO CAROUSEL
// ==========================

const carousel = document.querySelector(".carousel-track");
const carouselImages = carousel.querySelectorAll("img");

let currentIndex = 0;
const intervalTime = 1500; // 1.5 segundos

function autoScrollCarousel() {
  const imageWidth = carouselImages[0].offsetWidth + 16; // largura + gap
  currentIndex++;

  if (currentIndex >= carouselImages.length) {
    currentIndex = 0;
  }

  carousel.scrollTo({
    left: imageWidth * currentIndex,
    behavior: "smooth"
  });
}

let carouselInterval = setInterval(autoScrollCarousel, intervalTime);

// pausa autoplay quando o usuário interagir
carousel.addEventListener("mouseenter", () => {
  clearInterval(carouselInterval);
});

carousel.addEventListener("mouseleave", () => {
  carouselInterval = setInterval(autoScrollCarousel, intervalTime);
});




// ==========================
// FOTO DE PERFIL EXPANSÍVEL
// ==========================

const profilePhoto = document.querySelector(".profile-photo");

profilePhoto.addEventListener("click", () => {
  const overlay = document.createElement("div");
  overlay.classList.add("profile-overlay");
  document.body.appendChild(overlay);

  profilePhoto.classList.add("expanded");

  overlay.addEventListener("click", () => {
    profilePhoto.classList.remove("expanded");
    overlay.remove();
  });
});


