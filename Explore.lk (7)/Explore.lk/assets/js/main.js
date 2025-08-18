

// ================== Scroll to Top ==================
const scrollBtn = document.getElementById("scrollToTopBtn");
if (scrollBtn) {
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ================== Dark Mode Toggle ==================
const toggleBtn = document.getElementById("darkModeToggle");
const icon = document.getElementById("darkIcon");
const body = document.body;

if (toggleBtn && icon) {
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    icon.classList.replace("bi-moon-fill", "bi-sun-fill");
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const enabled = body.classList.contains("dark-mode");

    icon.classList.toggle("bi-moon-fill", !enabled);
    icon.classList.toggle("bi-sun-fill", enabled);
    localStorage.setItem("darkMode", enabled ? "enabled" : "disabled");

    // === Add this inside the same function ===
    const lightLogos = document.querySelectorAll(".light-logo");
    const darkLogos = document.querySelectorAll(".dark-logo");

    if (enabled) {
      lightLogos.forEach(el => el.style.display = "none");
      darkLogos.forEach(el => el.style.display = "inline");
    } else {
      lightLogos.forEach(el => el.style.display = "inline");
      darkLogos.forEach(el => el.style.display = "none");
    }
  });
} // <-- This closing brace was missing

// ================== AOS Init & Preloader ==================
if (typeof AOS !== "undefined") {
  AOS.init();
}

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => preloader.style.display = "none", 600);
  }
});

// ================== Bootstrap Carousel Progress ==================
const myCarousel = document.getElementById("carouselExampleIndicators");
if (myCarousel) {
  const carouselIndicators = myCarousel.querySelectorAll(".carousel-indicators button span");
  const carousel = new bootstrap.Carousel(myCarousel);
  let progressInterval;

  function resetIndicators() {
    carouselIndicators.forEach(indicator => {
      indicator.style.width = "0%";
    });
  }

  function animateActiveIndicator() {
    const activeSpan = myCarousel.querySelector(".carousel-indicators .active span");
    if (!activeSpan) return;
    let progress = 0;
    clearInterval(progressInterval);
    resetIndicators();

    progressInterval = setInterval(() => {
      if (progress >= 100) {
        clearInterval(progressInterval);
        carousel.next();
      } else {
        progress += 2;
        activeSpan.style.width = `${progress}%`;
      }
    }, 100);
  }

  window.addEventListener("load", animateActiveIndicator);
  myCarousel.addEventListener("slide.bs.carousel", () => clearInterval(progressInterval));
  myCarousel.addEventListener("slid.bs.carousel", animateActiveIndicator);
}

// ================== Contact Form (Optional for Contact Page) ==================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Sending...`;

    setTimeout(() => {
      alert("Message sent successfully! ✅");
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Send Message";
      contactForm.reset();
    }, 1500);
  });
}

// ================== Gallery Filtering ==================
const filterButtons = document.querySelectorAll('.gallery-filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove 'active' class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));

    // Add 'active' class to clicked button
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    galleryItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

FB.login(response => {
  if (response.authResponse) {
    console.log("Logged in!", response);
  }
});
AppleID.auth.init({
  clientId: "com.example.web",
  scope: "name email",
  redirectURI: "https://yourwebsite.com/callback",
  usePopup: true
});
// Login handling
document.getElementById("loginForm")?.addEventListener("submit", function(e){
    e.preventDefault();
    let email = document.getElementById("loginEmail").value;
    let pass = document.getElementById("loginPass").value;

    let storedEmail = localStorage.getItem("userEmail");
    let storedPass = localStorage.getItem("userPass");

    if(email === storedEmail && pass === storedPass){
        document.getElementById("pName").innerText = localStorage.getItem("userName");
        document.getElementById("pEmail").innerText = localStorage.getItem("userEmail");

        // Slide-in effect
        document.getElementById("profileSidebar").classList.add("active");
    } else {
        alert("Invalid email or password!");
    }
});

// Logout
function logout(){
    localStorage.clear();
    document.getElementById("profileSidebar").classList.remove("active");
}








