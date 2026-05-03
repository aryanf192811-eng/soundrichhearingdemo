window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.transition = 'opacity 0.6s ease-out, visibility 0.6s';
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
    setTimeout(() => preloader.remove(), 600);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     MOBILE MENU
     ========================================================================== */
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });
  }

  /* ==========================================================================
     NAVBAR SCROLL
     ========================================================================== */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ==========================================================================
     SCROLL REVEAL ANIMATIONS
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');
  const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -40px 0px" };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     FAQ ACCORDION
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      if (isOpen) {
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ==========================================================================
     GLOBAL MODAL LOGIC
     ========================================================================== */
  const modalOverlay = document.getElementById('globalModal');
  const modalContent = document.getElementById('modalContent');

  window.openModal = function(title, subtitle, contentHtml) {
    if (!modalOverlay || !modalContent) return;
    modalContent.innerHTML = `<h3>${title}</h3><div class="modal-sub">${subtitle}</div>${contentHtml}`;
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function() {
    if (!modalOverlay) return;
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  /* ==========================================================================
     CLINIC DETAIL MODAL (2-panel: info left + Google Map right)
     ========================================================================== */
  const clinicModal = document.getElementById('clinicModal');
  const clinicModalLeft = document.getElementById('clinicModalLeft');
  const clinicMapFrame = document.getElementById('clinicMapFrame');

  window.openClinicModal = function(name, region, address, rating, mapSrc, imageSrc, hours) {
    if (!clinicModal) return;
    const stars = Math.round(parseFloat(rating));
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
      starsHtml += `<svg viewBox="0 0 24 24" style="fill:${i < stars ? '#f59e0b' : '#d1d5db'}"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
    }
    clinicModalLeft.innerHTML = `
      <div class="cml-img-pane" style="background-image: url('${imageSrc}'); height: 160px; background-size: cover; background-position: center; border-radius: 12px; margin-bottom: 20px;"></div>
      <div class="cml-tag">Soundrich Hearing</div>
      <h2 class="cml-name">${name}</h2>
      <p class="cml-region">${region}</p>
      <div class="cml-rating-row">
        <div class="cml-stars">${starsHtml}</div>
        <span class="cml-rating-num">${rating}</span>
        <span class="cml-rating-count">/ 5.0 rating</span>
      </div>
      <div class="cml-divider"></div>
      <div class="cml-info-row">
        <div class="cml-info-icon"><svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>
        <div><div class="cml-info-label">Address</div><div class="cml-info-val">${address}</div></div>
      </div>
      <div class="cml-info-row">
        <div class="cml-info-icon"><svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg></div>
        <div><div class="cml-info-label">Phone</div><div class="cml-info-val"><a href="tel:+919811224051">+91 98112 24051</a></div></div>
      </div>
      <div class="cml-info-row">
        <div class="cml-info-icon"><svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.3-12.5h-1.6v5l4 2.4 1-1.6-3.4-2V7.5z"/></svg></div>
        <div><div class="cml-info-label">Hours</div><div class="cml-info-val">${hours}</div></div>
      </div>
      <div class="cml-actions">
        <a href="tel:+919811224051" class="cml-btn-primary">
          <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          Call Clinic
        </a>
        <span class="cml-btn-secondary" onclick="closeClinicModal(); openConsultForm();">
          <svg viewBox="0 0 24 24"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
          Book Appointment
        </span>
      </div>
    `;

    if (clinicMapFrame) clinicMapFrame.src = mapSrc;
    clinicModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  window.closeClinicModal = function() {
    if (!clinicModal) return;
    clinicModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => { if (clinicMapFrame) clinicMapFrame.src = ''; }, 400);
  };

  if (clinicModal) {
    clinicModal.addEventListener('click', (e) => {
      if (e.target === clinicModal) closeClinicModal();
    });
  }

  /* ==========================================================================
     CONSULTATION FORM MODAL
     ========================================================================== */
  const consultModal = document.getElementById('consultModal');

  window.openConsultForm = function() {
    if (!consultModal) return;
    consultModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  window.closeConsultForm = function() {
    if (!consultModal) return;
    consultModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (consultModal) {
    consultModal.addEventListener('click', (e) => {
      if (e.target === consultModal) closeConsultForm();
    });
  }

  window.handleConsultSubmit = function(e) {
    e.preventDefault();
    const btn = document.querySelector('.cf-submit');
    btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Confirmed! We'll call you shortly.`;
    btn.style.background = 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)';
    btn.disabled = true;
    setTimeout(() => {
      closeConsultForm();
      btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg> Confirm Free Booking`;
      btn.style.background = '';
      btn.disabled = false;
      document.getElementById('consultForm').reset();
    }, 2800);
  };

  /* ==========================================================================
     TESTIMONIALS ROTATION
     ========================================================================== */
  /* ==========================================================================
     TESTIMONIALS ROTATION
     ========================================================================== */
  const testimonials = [
    { 
      rating: "5.0", 
      text: "The doctor was very patient, explained the audiometry report clearly, and helped me choose the right hearing aid within my budget. My quality of life has improved dramatically.", 
      name: "Neha D.", 
      role: "IT Consultant & Tech Enthusiast",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
    },
    { 
      rating: "4.9", 
      text: "Highly professional clinic. They gave me a free trial for different brands, and never pressured me into buying the most expensive one. Truly an ethical healthcare provider.", 
      name: "Ela Robert", 
      role: "Senior Librarian",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
    },
    { 
      rating: "5.0", 
      text: "My grandfather was struggling with hearing loss for years. The team at Soundrich made him feel comfortable and fitted him with a rechargeable device. He's smiling again!", 
      name: "Ramesh Singh", 
      role: "Senior HR",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
    },
    { 
      rating: "4.8", 
      text: "Best diagnostic setup in NCR. I went for a BERA test for my child. The audiologists were extremely gentle, and we got accurate reports very quickly.", 
      name: "Anjali D.", 
      role: "Educationist",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150"
    },
    { 
      rating: "5.0", 
      text: "It was tough to bring my mother to the clinic. Soundrich provided a prompt home visit for testing and trials. Very grateful for their service.", 
      name: "Vikram Singh", 
      role: "Business Owner",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
    }
  ];

  const testimonialGrid = document.getElementById('testimonialGrid');
  let currentTestimonialIndex = 0;

  function renderTestimonials() {
    if (!testimonialGrid) return;
    let html = '';
    for (let i = 0; i < 3; i++) {
      const idx = (currentTestimonialIndex + i) % testimonials.length;
      const t = testimonials[idx];
      const revealClass = i === 0 ? '' : (i === 1 ? 'reveal-d1' : 'reveal-d2');
      
      // Generate stars
      let starsHtml = '';
      const starCount = Math.floor(parseFloat(t.rating));
      for(let s=0; s<5; s++) {
        starsHtml += `<svg viewBox="0 0 24 24" style="fill: ${s < starCount ? '#f59e0b' : '#d1d5db'}"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
      }

      html += `
        <div class="test-card reveal revealed ${revealClass}">
          <div class="test-top">
            <span class="test-score">${t.rating}</span>
            <div class="test-stars">${starsHtml}</div>
          </div>
          <p class="test-text">"${t.text}"</p>
          <div class="test-divider"></div>
          <div class="test-profile">
            <img src="${t.img}" alt="${t.name}" class="test-avatar">
            <div class="test-meta">
              <div class="test-name">${t.name}</div>
              <div class="test-role">${t.role}</div>
            </div>
          </div>
        </div>
      `;
    }
    testimonialGrid.innerHTML = html;
  }

  // Render immediately on load
  renderTestimonials();

  // Auto-rotate every 6 seconds
  setInterval(() => {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    renderTestimonials();
  }, 6000);

  /* ==========================================================================
     KEYBOARD ACCESSIBILITY — ESC closes all modals
     ========================================================================== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeClinicModal();
      closeConsultForm();
    }
  });
});
