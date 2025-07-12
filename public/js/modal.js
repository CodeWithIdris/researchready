function openModal(projectTitle) {
  document.getElementById("projectTitle").value = projectTitle;
  document.getElementById("requestModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("requestModal").classList.add("hidden");
}
window.addEventListener('DOMContentLoaded', () => {
  let currentSlide = 0;
  const heroSlides = document.querySelectorAll('.hero-slide');

  function showHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  setInterval(() => {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showHeroSlide(currentSlide);
  }, 5000);
});

let testimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
}
const fadeEls = document.querySelectorAll('.scroll-fade');

function revealOnScroll() {
  const trigger = window.innerHeight * 0.9;

  fadeEls.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

document.getElementById('prevTestimonial').addEventListener('click', () => {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(testimonialIndex);
});

document.getElementById('nextTestimonial').addEventListener('click', () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
});

// Auto rotate
setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
}, 7000);

document.getElementById("requestForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const project = document.getElementById("projectTitle").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    const response = await fetch("/request-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message, project })
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ " + data.message);
      this.reset();
      closeModal();
    } else {
      alert("❌ " + data.message);
    }
  } catch (error) {
    console.error("❌ Network error:", error);
    alert("❌ Network error. Please try again.");
  }
});


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll(".scroll-reveal").forEach(el => observer.observe(el));
const Contact = require("./models/contact");