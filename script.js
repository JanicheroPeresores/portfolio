const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const modal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-img");
const modalClose = document.getElementById("modal-close");
const typewriterText = document.getElementById("typewriter-text");

const rotatingTexts = [
  "Student Developer",
  "UI Builder",
  "Athlete"
];

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function toggleMenu() {
  const isOpen = mobileMenu.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
}

function closeMenu() {
  mobileMenu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
}

function runTypewriter() {
  const currentText = rotatingTexts[textIndex];

  if (!deleting) {
    charIndex += 1;
    typewriterText.textContent = currentText.slice(0, charIndex);

    if (charIndex === currentText.length) {
      deleting = true;
      setTimeout(runTypewriter, 1400);
      return;
    }
  } else {
    charIndex -= 1;
    typewriterText.textContent = currentText.slice(0, charIndex);

    if (charIndex === 0) {
      deleting = false;
      textIndex = (textIndex + 1) % rotatingTexts.length;
    }
  }

  setTimeout(runTypewriter, deleting ? 60 : 100);
}

function openModal(imageSrc) {
  modalImage.src = imageSrc;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  modalImage.src = "";
}

menuToggle.addEventListener("click", toggleMenu);

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.querySelectorAll("[data-image]").forEach((card) => {
  card.addEventListener("click", () => {
    openModal(card.dataset.image);
  });
});

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeModal();
  }
});

runTypewriter();
