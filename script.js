/* =========================
   G-TECH PROFESSIONAL JS
========================= */

// MOBILE MENU
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
}

// STICKY HEADER
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// ACTIVE NAVIGATION
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// COUNTER ANIMATION
const counters = document.querySelectorAll(".stat h2");
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.innerText.replace(/\D/g, ''));
      let count = 0;
      const speed = target / 100;
      const update = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.floor(count) + "+";
          requestAnimationFrame(update);
        } else {
          counter.innerText = target + "+";
        }
      };
      update();
      counterObserver.unobserve(counter);
    }
  });
});

counters.forEach(counter => {
  counterObserver.observe(counter);
});

// SCROLL REVEAL
const reveals = document.querySelectorAll(".card,.project-card,.why-card,.testimonial");

function revealElements() {
  reveals.forEach(item => {
    const windowHeight = window.innerHeight;
    const revealTop = item.getBoundingClientRect().top;
    if (revealTop < windowHeight - 120) {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }
  });
}

reveals.forEach(item => {
  item.style.opacity = "0";
  item.style.transform = "translateY(40px)";
  item.style.transition = "all 0.8s ease";
});

window.addEventListener("scroll", revealElements);
revealElements();

// CONTACT FORM (GOOGLE SHEETS INTEGRATION)
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Your verified Web App Deployment URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbznzo30zYI6DMDa1NLSzU1z1P7DhGH2vTQz-NFeehb83vsS1VsjsPTlgoDW3nKujrD3/exec';

    // Find interactive form elements dynamically
    const nameField = contactForm.querySelector('input[name="name"]') || contactForm.querySelector('input[type="text"]');
    const emailField = contactForm.querySelector('input[name="email"]') || contactForm.querySelector('input[type="email"]');
    const submitButton = contactForm.querySelector('button[type="submit"]') || contactForm.querySelector('button');

    // Validation
    if (!nameField.value.trim() || !emailField.value.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    // Update UI button state to processing
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerText = "Sending...";
    }

    // POST the compiled FormData object to Google Apps Script
    fetch(scriptURL, { method: 'POST', body: new FormData(contactForm) })
      .then(response => {
        alert("Thank you! Your quotation request has been submitted successfully.");
        contactForm.reset();
      })
      .catch(error => {
        console.error('Submission Error!', error.message);
        alert("Something went wrong while sending your request. Please try again.");
      })
      .finally(() => {
        // Re-enable button structure completely
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerText = "Request Quotation";
        }
      });
  });
}

// BACK TO TOP BUTTON
const topBtn = document.createElement("button");
topBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
topBtn.classList.add("top-btn");
document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// BACK TO TOP STYLE
const style = document.createElement("style");
style.innerHTML = `
.top-btn{
position:fixed;
bottom:105px;
right:25px;
width:50px;
height:50px;
border:none;
border-radius:50%;
background:#0A3D62;
color:white;
cursor:pointer;
font-size:18px;
display:none;
z-index:999;
box-shadow:0 5px 15px rgba(0,0,0,.25);
}
.top-btn.show{
display:block;
}
nav a.active{
color:#00A8FF;
}
`;
document.head.appendChild(style);

// PROJECT IMAGE HOVER EFFECT
const projectImages = document.querySelectorAll(".project-card img");
projectImages.forEach(img => {
  img.addEventListener("mouseenter", () => {
    img.style.transform = "scale(1.08)";
  });
  img.addEventListener("mouseleave", () => {
    img.style.transform = "scale(1)";
  });
});

// CURRENT YEAR
const copyright = document.querySelector(".copyright p");
if (copyright) {
  copyright.innerHTML = `© ${new Date().getFullYear()} G-TECH. All Rights Reserved.`;
}

// PAGE LOADER
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// CONSOLE MESSAGE
console.log(
  "%cG-TECH Website Loaded Successfully",
  "color:#00A8FF;font-size:16px;font-weight:bold;"
);
