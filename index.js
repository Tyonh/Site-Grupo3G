let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const totalSlides = slides.length;
let slideInterval;

// Função para mudar o slide
function showSlide(index) {
  // Remove classe ativa de todos
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // Garante que o índice é válido (loop infinito)
  if (index >= totalSlides) currentSlide = 0;
  else if (index < 0) currentSlide = totalSlides - 1;
  else currentSlide = index;

  // Adiciona classe ativa no atual
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

// Função para avançar automaticamente
function nextSlide() {
  showSlide(currentSlide + 1);
}

// Inicia o carrossel automático (muda a cada 5 segundos)
function startSlider() {
  slideInterval = setInterval(nextSlide, 5000);
}

// Pausa quando o mouse passa por cima (opcional, boa prática de UX)
function stopSlider() {
  clearInterval(slideInterval);
}

// Controle Manual (clicar nas bolinhas)
function goToSlide(index) {
  stopSlider(); // Para o automático temporariamente
  showSlide(index);
  startSlider(); // Reinicia o automático
}

// Inicialização
document
  .querySelector(".highlight-section")
  .addEventListener("mouseenter", stopSlider);
document
  .querySelector(".highlight-section")
  .addEventListener("mouseleave", startSlider);

startSlider(); // Começa ao carregar
