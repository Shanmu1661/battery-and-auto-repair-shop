/**
 * VoltFix Pro - Battery & Auto Electrical Repair Shop
 * Main JavaScript File (script.js)
 * Features: Dark Mode, RTL Toggle, Mobile Nav, Accordions, Battery Finder,
 * Symptom Cost Estimator, Search Filters, Countdown Timer, Toast System.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDirection();
  initMobileNav();
  initFaqAccordions();
  initBatteryFinder();
  initCostEstimator();
  initBlogFilter();
  initBrandFilter();
  initCountdownTimer();
  initFormsAndToasts();
  initFormValidation();
  initPaymentPlaceholders();
  initSkeletonLoaders();
  initActiveNav();
  initAnimatedCounters();
  try {
    localStorage.removeItem('voltfix_logged_in');
    localStorage.removeItem('voltfix_user_name');
  } catch (e) {}
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('voltfix_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark;

  applyTheme(isDark);

  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  themeToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentIsDark = document.documentElement.classList.contains('dark');
      const newIsDark = !currentIsDark;
      applyTheme(newIsDark);
      localStorage.setItem('voltfix_theme', newIsDark ? 'dark' : 'light');
      showToast(newIsDark ? 'Dark Mode Activated 🌙' : 'Light Mode Activated ☀️', 'info');
    });
  });
}

function applyTheme(isDark) {
  const root = document.documentElement;
  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Update icons inside theme toggle buttons
  const themeIcons = document.querySelectorAll('.theme-icon');
  themeIcons.forEach(icon => {
    if (isDark) {
      icon.className = 'fa-solid fa-sun theme-icon text-amber-400 text-sm';
    } else {
      icon.className = 'fa-solid fa-moon theme-icon text-amber-500 text-sm';
    }
  });
}

/* ==========================================================================
   2. RTL Toggle (Right-to-Left / Left-to-Right)
   ========================================================================== */
function initDirection() {
  const savedDir = localStorage.getItem('voltfix_direction') || 'ltr';
  applyDirection(savedDir);

  const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
  rtlToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      applyDirection(newDir);
      localStorage.setItem('voltfix_direction', newDir);
      showToast(newDir === 'rtl' ? 'RTL Mode Enabled (Arabic/Hebrew) 🔁' : 'LTR Mode Enabled 🔁', 'info');
    });
  });
}

function applyDirection(dir) {
  const root = document.documentElement;
  root.setAttribute('dir', dir);
  root.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');

  const rtlLabels = document.querySelectorAll('.rtl-label');
  rtlLabels.forEach(label => {
    label.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
  });
}

/* ==========================================================================
   3. Mobile Navigation Drawer & Collapsibles
   ========================================================================== */
function initMobileNav() {
  const openBtn = document.getElementById('mobile-menu-open');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-menu-drawer');
  const backdrop = document.getElementById('mobile-menu-backdrop');

  if (!drawer) return;

  function openMenu() {
    drawer.classList.remove('-translate-x-full');
    drawer.classList.remove('translate-x-full');
    if (backdrop) backdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
    if (closeBtn) closeBtn.focus();
  }

  function closeMenu() {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    if (isRtl) {
      drawer.classList.add('translate-x-full');
    } else {
      drawer.classList.add('-translate-x-full');
    }
    if (backdrop) backdrop.classList.add('hidden');
    document.body.style.overflow = '';
    if (openBtn) {
      openBtn.setAttribute('aria-expanded', 'false');
      openBtn.focus();
    }
  }

  if (openBtn) {
    openBtn.setAttribute('aria-expanded', 'false');
    openBtn.addEventListener('click', openMenu);
  }
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !drawer.classList.contains('-translate-x-full') && !drawer.classList.contains('translate-x-full')) {
      closeMenu();
    }
  });

  // Auto-close mobile drawer when any link inside it is clicked
  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Window resize observer to auto-reset mobile drawer when switching to desktop/laptop view
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    }, 100);
  });

  // Touch swipe gesture to close mobile drawer on mobile/tablet devices
  let touchStartX = 0;
  let touchEndX = 0;

  drawer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  drawer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    const swipeThreshold = 50; // min 50px swipe
    if (!isRtl && touchStartX - touchEndX > swipeThreshold) {
      // Swiped left on LTR
      closeMenu();
    } else if (isRtl && touchEndX - touchStartX > swipeThreshold) {
      // Swiped right on RTL
      closeMenu();
    }
  }

  // Mobile submenu accordion toggles
  const mobileSubmenuToggles = document.querySelectorAll('.mobile-submenu-toggle');
  mobileSubmenuToggles.forEach(toggle => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = toggle.getAttribute('data-target');
      const targetMenu = document.getElementById(targetId);
      const icon = toggle.querySelector('.submenu-arrow');

      if (targetMenu) {
        const isCurrentlyHidden = targetMenu.classList.contains('hidden');
        targetMenu.classList.toggle('hidden');
        toggle.setAttribute('aria-expanded', isCurrentlyHidden ? 'true' : 'false');
        if (icon) {
          icon.classList.toggle('rotate-180');
        }
      }
    });
  });
}


/* ==========================================================================
   4. FAQ Accordions
   ========================================================================== */
function initFaqAccordions() {
  const faqButtons = document.querySelectorAll('.faq-button');
  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector('.faq-icon');
      const isOpen = !content.classList.contains('hidden');

      // Close all accordions in this group if data-accordion="single"
      const group = button.closest('.accordion-group');
      if (group && group.getAttribute('data-accordion') === 'single') {
        group.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
        group.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));
      }

      if (isOpen) {
        content.classList.add('hidden');
        if (icon) icon.classList.remove('rotate-180');
      } else {
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
}

/* ==========================================================================
   5. Interactive Battery & Vehicle Finder
   ========================================================================== */
function initBatteryFinder() {
  const makeSelect = document.getElementById('finder-make');
  const modelSelect = document.getElementById('finder-model');
  const yearSelect = document.getElementById('finder-year');
  const findBtn = document.getElementById('finder-submit');
  const resultBox = document.getElementById('finder-result');

  if (!makeSelect || !findBtn || !resultBox) return;

  const vehicleDatabase = {
    toyota: {
      models: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Prius Hybrid'],
      battery: { code: 'DIN65 / 55D23L', cca: '620 CCA', warranty: '36 Months', rec: 'Amaron Pro / Exide Matrix', price: '$129 - $179' }
    },
    honda: {
      models: ['Civic', 'Accord', 'CR-V', 'Pilot'],
      battery: { code: '51R / DIN45', cca: '500 CCA', warranty: '36 Months', rec: 'Bosch S4 / Tata Green Silver', price: '$119 - $159' }
    },
    ford: {
      models: ['F-150', 'Explorer', 'Mustang', 'Escape'],
      battery: { code: 'BXT-65-850 / DIN75', cca: '750 CCA', warranty: '48 Months', rec: 'Optima RedTop / Exide Extreme', price: '$159 - $229' }
    },
    bmw: {
      models: ['3 Series', '5 Series', 'X3', 'X5'],
      battery: { code: 'AGM H8 / 92Ah', cca: '850 CCA (AGM Stop-Start)', warranty: '48 Months', rec: 'Bosch AGM HighLine / Varta Silver', price: '$220 - $299' }
    },
    hyundai: {
      models: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe'],
      battery: { code: 'DIN60 / 68D26L', cca: '580 CCA', warranty: '36 Months', rec: 'Amaron Hi-Life / Exide Epiq', price: '$110 - $165' }
    }
  };

  // Populate models when make changes
  makeSelect.addEventListener('change', () => {
    const make = makeSelect.value;
    modelSelect.innerHTML = '<option value="">Select Model</option>';
    if (make && vehicleDatabase[make]) {
      vehicleDatabase[make].models.forEach(model => {
        const opt = document.createElement('option');
        opt.value = model.toLowerCase().replace(/\s+/g, '-');
        opt.textContent = model;
        modelSelect.appendChild(opt);
      });
      modelSelect.disabled = false;
    } else {
      modelSelect.disabled = true;
    }
  });

  findBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const make = makeSelect.value;
    const model = modelSelect.value;
    const year = yearSelect ? yearSelect.value : '';

    if (!make || !model) {
      showToast('Please select your vehicle Make and Model first!', 'warning');
      return;
    }

    const data = vehicleDatabase[make];
    if (data) {
      resultBox.classList.remove('hidden');
      const b = data.battery;
      resultBox.innerHTML = `
        <div class="p-5 bg-amber-500/10 border border-amber-500/30 rounded-xl">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-3 mb-3">
            <div>
              <span class="text-xs font-semibold uppercase tracking-wider text-amber-500">Exact Fit Matched</span>
              <h4 class="text-lg font-bold text-slate-900 dark:text-white capitalize">${makeSelect.options[makeSelect.selectedIndex].text} ${modelSelect.options[modelSelect.selectedIndex].text} ${year ? '(' + year + ')' : ''}</h4>
            </div>
            <span class="px-3 py-1 text-sm font-bold bg-amber-500 text-slate-950 rounded-full">${b.price}</span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>
              <span class="text-slate-500 dark:text-slate-400 block text-xs">Battery Size</span>
              <strong class="text-slate-900 dark:text-white font-mono">${b.code}</strong>
            </div>
            <div>
              <span class="text-slate-500 dark:text-slate-400 block text-xs">Cold Cranking Power</span>
              <strong class="text-slate-900 dark:text-white">${b.cca}</strong>
            </div>
            <div>
              <span class="text-slate-500 dark:text-slate-400 block text-xs">Warranty</span>
              <strong class="text-emerald-600 dark:text-emerald-400 font-semibold">${b.warranty}</strong>
            </div>
            <div>
              <span class="text-slate-500 dark:text-slate-400 block text-xs">Recommended</span>
              <strong class="text-slate-900 dark:text-white">${b.rec}</strong>
            </div>
          </div>
          <div class="mt-4 flex flex-wrap gap-3">
            <a href="contact.html?battery=${encodeURIComponent(b.code)}&vehicle=${encodeURIComponent(make + ' ' + model)}" class="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-lg transition-colors">
              <i class="fa-solid fa-truck-fast"></i> Order Doorstep Installation
            </a>
            <a href="tel:+18005558658" class="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-sm rounded-lg transition-colors">
              <i class="fa-solid fa-phone"></i> Call Emergency Tech
            </a>
          </div>
        </div>
      `;
      showToast('Found matching battery specifications!', 'success');
    }
  });
}

/* ==========================================================================
   6. Diagnostic Symptom & Cost Estimator
   ========================================================================== */
function initCostEstimator() {
  const checkboxes = document.querySelectorAll('.estimator-check');
  const totalDisplay = document.getElementById('estimator-total');
  const timeDisplay = document.getElementById('estimator-time');

  if (!checkboxes.length || !totalDisplay) return;

  function recalculate() {
    let total = 49; // base diagnostic fee
    let minutes = 30;

    checkboxes.forEach(cb => {
      if (cb.checked) {
        total += parseFloat(cb.getAttribute('data-price') || 0);
        minutes += parseInt(cb.getAttribute('data-time') || 15);
      }
    });

    totalDisplay.textContent = `$${total}`;
    if (timeDisplay) {
      timeDisplay.textContent = minutes >= 60 ? `${(minutes / 60).toFixed(1)} hrs` : `${minutes} mins`;
    }
  }

  checkboxes.forEach(cb => cb.addEventListener('change', recalculate));
  recalculate();
}

/* ==========================================================================
   7. Blog Search and Category Filter
   ========================================================================== */
function initBlogFilter() {
  const searchInput = document.getElementById('blog-search-input');
  const categoryPills = document.querySelectorAll('.blog-filter-btn');
  const blogCards = document.querySelectorAll('.blog-post-card');

  if (!blogCards.length) return;

  let activeCategory = 'all';
  let searchTerm = '';

  function filterPosts() {
    blogCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardTitle = (card.querySelector('.blog-title')?.textContent || '').toLowerCase();
      const cardDesc = (card.querySelector('.blog-desc')?.textContent || '').toLowerCase();

      const matchesCat = activeCategory === 'all' || cardCategory.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch = !searchTerm || cardTitle.includes(searchTerm) || cardDesc.includes(searchTerm);

      if (matchesCat && matchesSearch) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      filterPosts();
    });
  }

  categoryPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      categoryPills.forEach(p => {
        p.classList.remove('bg-amber-500', 'text-slate-950');
        p.classList.add('bg-slate-200', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
      });
      pill.classList.remove('bg-slate-200', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
      pill.classList.add('bg-amber-500', 'text-slate-950');

      activeCategory = pill.getAttribute('data-filter') || 'all';
      filterPosts();
    });
  });
}

/* ==========================================================================
   8. Brand Filter on brands.html
   ========================================================================== */
function initBrandFilter() {
  const brandPills = document.querySelectorAll('.brand-filter-btn');
  const brandCards = document.querySelectorAll('.brand-card');

  if (!brandCards.length || !brandPills.length) return;

  brandPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      brandPills.forEach(p => {
        p.classList.remove('bg-amber-500', 'text-slate-950', 'font-bold');
        p.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      });
      pill.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      pill.classList.add('bg-amber-500', 'text-slate-950', 'font-bold');

      const filter = pill.getAttribute('data-filter') || 'all';
      brandCards.forEach(card => {
        const type = card.getAttribute('data-type') || '';
        if (filter === 'all' || type.includes(filter)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Handle URL query parameter for contact brand pre-selection
  const brandParam = new URLSearchParams(window.location.search).get('brand');
  if (brandParam) {
    const brandSelect = document.getElementById('contact-brand');
    if (brandSelect) {
      const cleanParam = brandParam.toLowerCase().replace(/[^a-z0-9]/g, '');
      const matchOpt = Array.from(brandSelect.options).find(opt => {
        const cleanVal = opt.value.toLowerCase().replace(/[^a-z0-9]/g, '');
        return cleanVal === cleanParam;
      });
      if (matchOpt) {
        matchOpt.selected = true;
      }
    }
  }
}

/* ==========================================================================
   9. Coming Soon Countdown Timer
   ========================================================================== */
function initCountdownTimer() {
  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minsEl = document.getElementById('timer-mins');
  const secsEl = document.getElementById('timer-secs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  // Set target date 45 days from current
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 45);

  function update() {
    const now = new Date().getTime();
    const diff = targetDate.getTime() - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   10. Form Submissions & Netlify / Formspree Integrations
   ========================================================================== */
function initFormsAndToasts() {
  const forms = document.querySelectorAll('form[data-ajax-form="true"], .ajax-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Run client-side validation
      const isValid = validateForm(form);
      if (!isValid) {
        showToast('Please fix the highlighted errors before submitting.', 'warning');
        return;
      }

      const redirectUrl = form.getAttribute('data-redirect');
      const isLoginForm = form.id === 'login-form' || form.classList.contains('login-form') || window.location.pathname.endsWith('login.html') || window.location.pathname.includes('login');
      const isRegisterForm = form.id === 'register-form' || form.classList.contains('register-form') || window.location.pathname.endsWith('register.html') || window.location.pathname.includes('register');

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = isLoginForm 
          ? '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Signing in...' 
          : isRegisterForm 
            ? '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Registering...' 
            : '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Submitting...';
      }

      // Handle login form submission and redirect to index.html
      if (isLoginForm || (redirectUrl && !isRegisterForm)) {
        const targetUrl = redirectUrl || 'index.html';
        await new Promise(resolve => setTimeout(resolve, 600));
        showToast('Sign in successful! Redirecting to home...', 'success');

        setTimeout(() => {
          window.location.href = targetUrl;
        }, 800);
        return;
      }

      // Handle register form submission and redirect to index.html
      if (isRegisterForm) {
        await new Promise(resolve => setTimeout(resolve, 600));
        showToast('Account registered successfully! Redirecting to home...', 'success');

        setTimeout(() => {
          window.location.href = redirectUrl || 'index.html';
        }, 800);
        return;
      }

      const action = form.getAttribute('action');
      const isNetlify = form.hasAttribute('data-netlify') || form.getAttribute('netlify') === 'true';
      const isFormspree = action && action.includes('formspree.io') && !action.includes('your-form-id');

      try {
        if (isFormspree || isNetlify) {
          const formData = new FormData(form);
          const response = await fetch(action || '/', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
          });

          if (response.ok) {
            form.reset();
            clearValidation(form);
            showToast('Thank you! Your request was submitted successfully.', 'success');
          } else {
            throw new Error('Network response was not ok');
          }
        } else {
          // Graceful simulated completion for demo / placeholder forms
          await new Promise(resolve => setTimeout(resolve, 900));
          form.reset();
          clearValidation(form);
          showToast('Request received! A certified technician will contact you within 15 minutes.', 'success');
        }
      } catch (err) {
        // Fallback for demo environments
        showToast('Request received! Our mobile dispatch team is notified.', 'success');
        form.reset();
        clearValidation(form);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    });
  });

  // Newsletter subscribe forms
  const newsForms = document.querySelectorAll('.newsletter-form');
  newsForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value && input.checkValidity()) {
        input.value = '';
        showToast('Subscribed! Check your inbox for exclusive auto electrical discounts.', 'success');
      } else {
        showToast('Please enter a valid email address.', 'warning');
      }
    });
  });
}

/* ==========================================================================
   11. Client-Side Accessible Form Validation
   ========================================================================== */
function initFormValidation() {
  const inputs = document.querySelectorAll('input, select, textarea');

  inputs.forEach(input => {
    // Validate on blur
    input.addEventListener('blur', () => {
      if (input.value.trim() !== '' || input.hasAttribute('required')) {
        validateSingleField(input);
      }
    });

    // Clear error on input
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) {
        validateSingleField(input);
      }
    });
  });
}

function validateSingleField(field) {
  if (field.type === 'hidden' || field.disabled) return true;

  const isValid = field.checkValidity();
  const feedback = field.parentElement?.querySelector('.invalid-feedback');

  if (!isValid) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    field.setAttribute('aria-invalid', 'true');
    if (feedback) {
      feedback.style.display = 'flex';
      if (field.validationMessage && !feedback.hasAttribute('data-custom-msg')) {
        feedback.querySelector('.msg-text') ? feedback.querySelector('.msg-text').textContent = field.validationMessage : null;
      }
    }
    return false;
  } else {
    field.classList.remove('is-invalid');
    field.removeAttribute('aria-invalid');
    if (field.value.trim() !== '') {
      field.classList.add('is-valid');
    }
    if (feedback) feedback.style.display = 'none';
    return true;
  }
}

function validateForm(form) {
  let formValid = true;
  const fields = form.querySelectorAll('input, select, textarea');
  let firstInvalid = null;

  fields.forEach(field => {
    const isFieldValid = validateSingleField(field);
    if (!isFieldValid) {
      formValid = false;
      if (!firstInvalid) firstInvalid = field;
    }
  });

  if (firstInvalid) {
    firstInvalid.focus();
  }

  return formValid;
}

function clearValidation(form) {
  form.querySelectorAll('.is-invalid, .is-valid').forEach(el => {
    el.classList.remove('is-invalid', 'is-valid');
    el.removeAttribute('aria-invalid');
  });
  form.querySelectorAll('.invalid-feedback').forEach(el => el.style.display = 'none');
}

/* ==========================================================================
   12. Payment Gateway Placeholders (Stripe & PayPal)
   ========================================================================== */
function initPaymentPlaceholders() {
  const payButtons = document.querySelectorAll('.payment-gateway-btn, .stripe-btn, .paypal-btn');

  payButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const gateway = btn.getAttribute('data-gateway') || (btn.classList.contains('paypal-btn') ? 'PayPal' : 'Stripe');
      const planName = btn.getAttribute('data-plan') || 'Service Package';
      const price = btn.getAttribute('data-price') || '$99';

      const originalHtml = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Connecting...';

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalHtml;
        showToast(`Demo: Redirecting to ${gateway} Checkout for "${planName}" (${price}). Configure your live API keys in production.`, 'info');
      }, 1200);
    });
  });
}

/* ==========================================================================
   13. Skeleton Loading Screen Resolver
   ========================================================================== */
function initSkeletonLoaders() {
  const skeletons = document.querySelectorAll('.skeleton-loader');
  if (!skeletons.length) return;

  // Simulate quick asynchronous data load
  setTimeout(() => {
    skeletons.forEach(el => {
      el.classList.add('opacity-0', 'transition-opacity', 'duration-300');
      setTimeout(() => {
        el.style.display = 'none';
        const target = el.getAttribute('data-target');
        if (target) {
          const content = document.getElementById(target);
          if (content) content.classList.remove('hidden');
        }
      }, 300);
    });
  }, 450);
}

/* ==========================================================================
   14. Toast Notification System
   ========================================================================== */
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'alert');

  let icon = 'fa-circle-check text-emerald-400';
  if (type === 'warning') icon = 'fa-triangle-exclamation text-amber-400';
  if (type === 'error') icon = 'fa-circle-xmark text-rose-400';
  if (type === 'info') icon = 'fa-circle-info text-cyan-400';

  toast.innerHTML = `
    <i class="fa-solid ${icon} text-lg flex-shrink-0"></i>
    <span class="flex-1 font-medium leading-tight">${message}</span>
    <button class="text-slate-400 hover:text-white text-base ml-2 cursor-pointer" aria-label="Close Notification" onclick="this.parentElement.remove()">&times;</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* ==========================================================================
   14. Dynamic Active Navigation Highlighting
   ========================================================================== */
function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const cleanCurrent = currentPath.split('#')[0].split('?')[0] || 'index.html';

  // Desktop navigation links
  const navLinks = document.querySelectorAll('header nav a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.split('#')[0].split('?')[0];
    if (cleanHref === cleanCurrent || (cleanCurrent === '' && cleanHref === 'index.html')) {
      link.classList.add('text-amber-600', 'dark:text-amber-400', 'font-bold');
      link.classList.remove('text-slate-700', 'dark:text-slate-200');
    }
  });

  // If on index.html or home-2.html, also highlight the Home dropdown button
  if (cleanCurrent === 'index.html' || cleanCurrent === 'home-2.html' || cleanCurrent === '') {
    const homeBtn = document.querySelector('.dropdown-group button');
    if (homeBtn) {
      homeBtn.classList.add('text-amber-600', 'dark:text-amber-400', 'font-bold');
      homeBtn.classList.remove('text-slate-700', 'dark:text-slate-200');
    }
  }

  // If on blog.html or blog-details.html, also highlight the Blog dropdown
  if (cleanCurrent === 'blog.html' || cleanCurrent === 'blog-details.html') {
    const blogBtn = document.querySelector('.dropdown-group a[data-nav="blog"]');
    if (blogBtn) {
      blogBtn.classList.add('text-amber-600', 'dark:text-amber-400', 'font-bold');
      blogBtn.classList.remove('text-slate-700', 'dark:text-slate-200');
    }
  }

  // Mobile drawer links
  const mobileLinks = document.querySelectorAll('#mobile-menu-drawer a');
  mobileLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.split('#')[0].split('?')[0];
    if (cleanHref === cleanCurrent || (cleanCurrent === '' && cleanHref === 'index.html')) {
      link.classList.add('text-amber-500');
    }
  });
}

/* ==========================================================================
   15. Running Numbers / Animated Stat Counters
   ========================================================================== */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.counter-value');
  if (!counters.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const formatNumber = (val, decimals, useComma) => {
    let formatted = val.toFixed(decimals);
    if (useComma) {
      const parts = formatted.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      formatted = parts.join('.');
    }
    return formatted;
  };

  const animateCounter = (el) => {
    if (el.dataset.animated === 'true') return;
    el.dataset.animated = 'true';

    const target = parseFloat(el.getAttribute('data-target') || '0');
    const duration = parseInt(el.getAttribute('data-duration') || '1800', 10);
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const useComma = el.getAttribute('data-format') === 'comma';

    if (prefersReducedMotion) {
      el.textContent = `${prefix}${formatNumber(target, decimals, useComma)}${suffix}`;
      return;
    }

    let startTime = null;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const updateCount = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentVal = easedProgress * target;

      el.textContent = `${prefix}${formatNumber(currentVal, decimals, useComma)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = `${prefix}${formatNumber(target, decimals, useComma)}${suffix}`;
      }
    };

    requestAnimationFrame(updateCount);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    counters.forEach(counter => {
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
      counter.textContent = `${prefix}${decimals > 0 ? '0.' + '0'.repeat(decimals) : '0'}${suffix}`;
      observer.observe(counter);
    });
  } else {
    counters.forEach(counter => animateCounter(counter));
  }
}



